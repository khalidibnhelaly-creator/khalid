-- ===================================================================
-- Aurafarming webinar (Oct 23, 2026), co-hosted with VOSU
-- Registrations, code word submissions, challenge entries, metrics.
--
-- Security model
--   * public tables: RLS ON, anon/authenticated may INSERT only.
--     No SELECT/UPDATE/DELETE policies, so the publishable key in the
--     page source cannot read or change any row.
--   * Scores, code word correctness and timing are computed by BEFORE
--     INSERT triggers, so the browser cannot forge them.
--   * Secrets (code word, windows, ad spend) and all reporting views live
--     in schema "webinar_private", which PostgREST does not expose.
--     Query them from the Supabase SQL editor.
-- ===================================================================

create schema if not exists webinar_private;
revoke all on schema webinar_private from public, anon, authenticated;

-- ---------- settings (secrets + windows), editable from SQL editor ----------
create table if not exists webinar_private.settings (
  key   text primary key,
  value text not null
);
insert into webinar_private.settings (key, value) values
  ('code_word',           ''),                            -- set during the live session
  ('codeword_open_at',    '2026-10-23T21:00:00+06:00'),
  ('codeword_close_at',   '2026-10-24T01:00:00+06:00'),   -- 2h after a ~2h session; adjust live
  ('challenge_close_at',  '2026-10-26T23:59:00+06:00'),
  ('event_start_at',      '2026-10-23T21:00:00+06:00'),
  ('vosu_ad_spend_usd',   '0')                             -- update as VOSU spend lands
on conflict (key) do nothing;

create or replace function webinar_private.setting(k text)
returns text language sql stable security definer set search_path = '' as $$
  select value from webinar_private.settings where key = k
$$;
revoke all on function webinar_private.setting(text) from public, anon, authenticated;

-- ===================================================================
-- 1. Registrations (one row per checkout attempt, linked to payments
--    by ref_code; reporting dedupes by email)
-- ===================================================================
create table if not exists public.webinar_oct23_registrations (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  ref_code         text not null unique check (ref_code ~ '^AF-[A-Z0-9]{4}$'),

  name             text not null check (char_length(name) between 2 and 120),
  whatsapp         text not null check (char_length(regexp_replace(whatsapp, '\D', '', 'g')) between 10 and 15),
  email            text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  role             text not null check (role in ('student','freelancer','agency','brand_marketer','business_owner','other')),
  portfolio_url    text not null check (char_length(portfolio_url) <= 500 and portfolio_url ~* '^https?://[^\s/]+\.[^\s]+'),
  intent           text not null default '' check (char_length(intent) <= 600),
  vosu_account     text not null check (vosu_account in ('yes','will_create')),
  consent_vosu     boolean not null check (consent_vosu),

  utm_source       text check (char_length(utm_source)   <= 120),
  utm_medium       text check (char_length(utm_medium)   <= 120),
  utm_campaign     text check (char_length(utm_campaign) <= 160),
  utm_content      text check (char_length(utm_content)  <= 160),
  utm_term         text check (char_length(utm_term)     <= 160),
  referrer         text check (char_length(referrer)     <= 500),
  landing_path     text check (char_length(landing_path) <= 300),
  client_ts        timestamptz,

  -- computed by trigger
  score            smallint not null default 0,
  segment          text not null default 'standard' check (segment in ('priority','standard')),

  -- ops fields, filled by Khalid from the dashboard (forced null on insert)
  attended                 boolean,
  grant_tier               text check (grant_tier in ('starter','large','featured')),
  masterclass_purchased_at timestamptz,
  notes                    text
);
create index if not exists webinar_oct23_reg_email_idx  on public.webinar_oct23_registrations (lower(email));
create index if not exists webinar_oct23_reg_source_idx on public.webinar_oct23_registrations (utm_source, utm_campaign);

-- Lead scoring (max 9). Priority >= 6.
--   role:      agency / brand_marketer 3 · freelancer / business_owner 2 · student / other 1
--   portfolio: specific page (has a path) 2 · bare domain or profile root 1
--   intent:    15+ words 2 · 6+ words 1 · names a concrete format +1
--   vosu:      already has an account +1
create or replace function public.webinar_oct23_reg_before_insert()
returns trigger language plpgsql set search_path = '' as $$
declare
  s int := 0;
  words int;
  path text;
begin
  new.created_at := now();
  new.email := lower(trim(new.email));
  new.name := trim(new.name);
  new.portfolio_url := trim(new.portfolio_url);
  new.intent := trim(coalesce(new.intent, ''));
  new.attended := null; new.grant_tier := null; new.masterclass_purchased_at := null; new.notes := null;

  s := s + case new.role when 'agency' then 3 when 'brand_marketer' then 3
                         when 'freelancer' then 2 when 'business_owner' then 2 else 1 end;

  path := regexp_replace(new.portfolio_url, '^https?://[^/]+/?', '');
  s := s + case when char_length(regexp_replace(path, '[/?#].*$', '')) >= 2 then 2 else 1 end;

  words := coalesce(array_length(regexp_split_to_array(nullif(new.intent, ''), '\s+'), 1), 0);
  s := s + case when words >= 15 then 2 when words >= 6 then 1 else 0 end;
  if new.intent ~* '(video|ad|ads|commercial|reel|film|brand|client|campaign|product|influencer|music|animation|story|content|ugc)' then
    s := s + 1;
  end if;

  if new.vosu_account = 'yes' then s := s + 1; end if;

  new.score := s;
  new.segment := case when s >= 6 then 'priority' else 'standard' end;
  return new;
end $$;

drop trigger if exists webinar_oct23_reg_bi on public.webinar_oct23_registrations;
create trigger webinar_oct23_reg_bi before insert on public.webinar_oct23_registrations
  for each row execute function public.webinar_oct23_reg_before_insert();

-- ===================================================================
-- 2. Code word submissions (correctness + timing decided server-side)
-- ===================================================================
create table if not exists public.webinar_oct23_codeword_submissions (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  email           text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  vosu_email      text not null check (char_length(vosu_email) <= 254 and vosu_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  code_word       text not null check (char_length(code_word) between 1 and 60),
  is_correct      boolean not null default false,
  on_time         boolean not null default false,
  registration_id uuid references public.webinar_oct23_registrations(id) on delete set null
);
create index if not exists webinar_oct23_cw_email_idx on public.webinar_oct23_codeword_submissions (lower(email));

create or replace function public.webinar_oct23_cw_before_insert()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  secret text := lower(trim(webinar_private.setting('code_word')));
  attempts int;
begin
  new.created_at := now();
  new.email := lower(trim(new.email));
  new.vosu_email := lower(trim(new.vosu_email));

  select count(*) into attempts from public.webinar_oct23_codeword_submissions where email = new.email;
  if attempts >= 5 then
    raise exception 'too many attempts' using errcode = 'P0001';
  end if;

  new.is_correct := secret <> '' and lower(trim(new.code_word)) = secret;
  new.on_time := now() between webinar_private.setting('codeword_open_at')::timestamptz
                           and webinar_private.setting('codeword_close_at')::timestamptz;
  select r.id into new.registration_id
    from public.webinar_oct23_registrations r
   where r.email = new.email order by r.created_at desc limit 1;
  return new;
end $$;
revoke all on function public.webinar_oct23_cw_before_insert() from public, anon, authenticated;

drop trigger if exists webinar_oct23_cw_bi on public.webinar_oct23_codeword_submissions;
create trigger webinar_oct23_cw_bi before insert on public.webinar_oct23_codeword_submissions
  for each row execute function public.webinar_oct23_cw_before_insert();

-- ===================================================================
-- 3. Challenge entries (72-hour challenge for starter grant holders)
-- ===================================================================
create table if not exists public.webinar_oct23_challenge_entries (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  email           text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  vosu_email      text not null check (char_length(vosu_email) <= 254 and vosu_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  post_url        text not null check (char_length(post_url) <= 500 and post_url ~* '^https?://[^\s/]+\.[^\s]+'),
  note            text not null default '' check (char_length(note) <= 500),
  on_time         boolean not null default false,
  registration_id uuid references public.webinar_oct23_registrations(id) on delete set null
);
create index if not exists webinar_oct23_ch_email_idx on public.webinar_oct23_challenge_entries (lower(email));

create or replace function public.webinar_oct23_ch_before_insert()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  entries int;
begin
  new.created_at := now();
  new.email := lower(trim(new.email));
  new.vosu_email := lower(trim(new.vosu_email));
  select count(*) into entries from public.webinar_oct23_challenge_entries where email = new.email;
  if entries >= 3 then
    raise exception 'entry limit reached' using errcode = 'P0001';
  end if;
  new.on_time := now() <= webinar_private.setting('challenge_close_at')::timestamptz;
  select r.id into new.registration_id
    from public.webinar_oct23_registrations r
   where r.email = new.email order by r.created_at desc limit 1;
  return new;
end $$;
revoke all on function public.webinar_oct23_ch_before_insert() from public, anon, authenticated;

drop trigger if exists webinar_oct23_ch_bi on public.webinar_oct23_challenge_entries;
create trigger webinar_oct23_ch_bi before insert on public.webinar_oct23_challenge_entries
  for each row execute function public.webinar_oct23_ch_before_insert();

-- ===================================================================
-- RLS: insert-only for the public key
-- ===================================================================
alter table public.webinar_oct23_registrations        enable row level security;
alter table public.webinar_oct23_codeword_submissions enable row level security;
alter table public.webinar_oct23_challenge_entries    enable row level security;

drop policy if exists "public can register" on public.webinar_oct23_registrations;
create policy "public can register" on public.webinar_oct23_registrations
  for insert to anon, authenticated with check (true);

drop policy if exists "public can submit code word" on public.webinar_oct23_codeword_submissions;
create policy "public can submit code word" on public.webinar_oct23_codeword_submissions
  for insert to anon, authenticated with check (true);

drop policy if exists "public can submit challenge" on public.webinar_oct23_challenge_entries;
create policy "public can submit challenge" on public.webinar_oct23_challenge_entries
  for insert to anon, authenticated with check (true);

-- belt and braces: no read/write grants beyond insert for the public roles
revoke select, update, delete, truncate on
  public.webinar_oct23_registrations,
  public.webinar_oct23_codeword_submissions,
  public.webinar_oct23_challenge_entries
from anon, authenticated;
grant insert on
  public.webinar_oct23_registrations,
  public.webinar_oct23_codeword_submissions,
  public.webinar_oct23_challenge_entries
to anon, authenticated;

-- ===================================================================
-- Reporting (private schema; run in SQL editor)
-- ===================================================================

-- One row per person (latest registration), with payment + engagement
create or replace view webinar_private.oct23_people as
with latest as (
  select distinct on (email) *
  from public.webinar_oct23_registrations
  order by email, created_at desc
),
paid as (
  select lower(trim(email)) as email, max(created_at) filter (where status = 'submitted') as paid_submitted_at,
         bool_or(status = 'submitted') as payment_submitted
  from public.payments where tier = 'aurafarming' and email is not null group by 1
),
cw as (
  select email, bool_or(is_correct and on_time) as codeword_ok, min(created_at) as first_codeword_at
  from public.webinar_oct23_codeword_submissions group by 1
),
ch as (
  select email, count(*) filter (where on_time) as challenge_entries
  from public.webinar_oct23_challenge_entries group by 1
),
mc as (
  select lower(trim(email)) as email, min(created_at) as masterclass_paid_at
  from public.payments
  where tier in ('season1','operator','business') and status = 'submitted' and email is not null
    and created_at between webinar_private.setting('event_start_at')::timestamptz
                       and webinar_private.setting('event_start_at')::timestamptz + interval '48 hours'
  group by 1
)
select l.*,
       coalesce(p.payment_submitted, false)  as payment_submitted,
       coalesce(cw.codeword_ok, false)       as codeword_ok,
       coalesce(ch.challenge_entries, 0)     as challenge_entries,
       coalesce(l.masterclass_purchased_at, mc.masterclass_paid_at) as masterclass_bought_at
from latest l
left join paid p  on p.email  = l.email
left join cw      on cw.email = l.email
left join ch      on ch.email = l.email
left join mc      on mc.email = l.email;

-- Registrations by source
create or replace view webinar_private.oct23_by_source as
select coalesce(nullif(utm_source, ''), '(direct)')   as source,
       coalesce(nullif(utm_medium, ''), '-')          as medium,
       coalesce(nullif(utm_campaign, ''), '-')        as campaign,
       count(*)                                        as registrations,
       count(*) filter (where payment_submitted)       as paid,
       count(*) filter (where segment = 'priority')    as priority,
       count(*) filter (where codeword_ok)             as showed_up,
       count(*) filter (where masterclass_bought_at is not null) as masterclass_48h
from webinar_private.oct23_people
group by 1, 2, 3
order by registrations desc;

-- Headline funnel (the numbers for the VOSU conversation)
create or replace view webinar_private.oct23_funnel as
with p as (select * from webinar_private.oct23_people),
spend as (select webinar_private.setting('vosu_ad_spend_usd')::numeric as usd)
select
  (select count(*) from p)                                               as registrations,
  (select count(*) from p where payment_submitted)                       as paid_registrations,
  (select count(*) from p where segment = 'priority')                    as priority_leads,
  (select count(*) from p where utm_source = 'vosu_ads')                 as vosu_ad_registrations,
  (select usd from spend)                                                as vosu_ad_spend_usd,
  round((select usd from spend) / nullif((select count(*) from p where utm_source = 'vosu_ads'), 0), 2)
                                                                         as cost_per_registration_usd,
  (select count(*) from p where vosu_account = 'will_create')            as new_vosu_accounts_intended,
  (select count(*) from public.webinar_oct23_codeword_submissions)       as codeword_submissions,
  (select count(*) from p where codeword_ok)                             as showed_up_verified,
  round(100.0 * (select count(*) from p where codeword_ok)
        / nullif((select count(*) from p where payment_submitted), 0), 1) as show_up_rate_pct,
  (select count(*) from public.webinar_oct23_challenge_entries where on_time) as challenge_entries,
  (select count(*) from p where grant_tier is not null)                  as grants_awarded,
  (select count(*) from p where masterclass_bought_at is not null)       as masterclass_48h;

-- Shortlist helper: verified attendees ranked by lead score
create or replace view webinar_private.oct23_shortlist as
select name, email, whatsapp, role, portfolio_url, intent, score, segment,
       codeword_ok, challenge_entries, grant_tier
from webinar_private.oct23_people
where codeword_ok
order by score desc, challenge_entries desc, created_at asc;
