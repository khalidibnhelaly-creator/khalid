-- ===================================================================
-- topzid.com/onemanagency: registrations for the free live class
-- "One Man Agency" (Fri 27 Nov 2026, 8 PM Dhaka), with VOSU.
-- RLS on; the public key can only INSERT. One registration per WhatsApp
-- number (a repeat insert returns 409, which the page treats as success).
-- lead_score is computed server-side and used to pick the Zoom room.
-- ===================================================================

create table if not exists public.oma_registrations (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),

  name           text not null check (char_length(name) between 2 and 120),
  whatsapp       text not null check (char_length(regexp_replace(whatsapp, '\D', '', 'g')) between 10 and 15),
  whatsapp_norm  text,
  occupation     text not null check (occupation in ('freelancer','agency','business_owner','marketer','creator','student','job_seeker','employee','other')),
  occupation_note text check (occupation_note is null or char_length(occupation_note) <= 120),

  instagram      text check (instagram is null or char_length(instagram) <= 200),
  tiktok         text check (tiktok    is null or char_length(tiktok)    <= 200),
  youtube        text check (youtube   is null or char_length(youtube)   <= 200),
  linkedin       text check (linkedin  is null or char_length(linkedin)  <= 200),
  facebook       text check (facebook  is null or char_length(facebook)  <= 200),

  vosu_status    text not null check (vosu_status in ('has_account','created_now')),
  vosu_email     text not null check (char_length(vosu_email) <= 254 and vosu_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  consent_vosu   boolean not null check (consent_vosu),

  country        text check (country is null or country ~ '^[A-Z]{2}$'),
  utm_source     text check (char_length(utm_source)   <= 120),
  utm_medium     text check (char_length(utm_medium)   <= 120),
  utm_campaign   text check (char_length(utm_campaign) <= 160),
  referrer       text check (char_length(referrer)     <= 500),

  -- server-side only (forced on insert)
  lead_score     integer not null default 0,
  status         text not null default 'registered' check (status in ('registered','zoom_invited','attended','no_show')),
  notes          text
);

create unique index if not exists oma_registrations_whatsapp_uq on public.oma_registrations (whatsapp_norm);
create index if not exists oma_registrations_score_idx on public.oma_registrations (lead_score desc, created_at);

create or replace function public.oma_registrations_before_insert()
returns trigger language plpgsql set search_path = '' as $$
declare
  socials int := 0;
  s int := 0;
begin
  new.created_at := now();
  new.name := trim(new.name);
  new.vosu_email := lower(trim(new.vosu_email));
  -- Bangladesh numbers: 01XXXXXXXXX -> 8801XXXXXXXXX so duplicates match
  new.whatsapp_norm := regexp_replace(new.whatsapp, '\D', '', 'g');
  if new.whatsapp_norm ~ '^01\d{9}$' then new.whatsapp_norm := '88' || new.whatsapp_norm; end if;
  new.status := 'registered';
  new.notes := null;

  socials := (case when coalesce(trim(new.instagram), '') <> '' then 1 else 0 end)
           + (case when coalesce(trim(new.tiktok),    '') <> '' then 1 else 0 end)
           + (case when coalesce(trim(new.youtube),   '') <> '' then 1 else 0 end)
           + (case when coalesce(trim(new.linkedin),  '') <> '' then 1 else 0 end)
           + (case when coalesce(trim(new.facebook),  '') <> '' then 1 else 0 end);

  s := case new.occupation
         when 'agency' then 30 when 'freelancer' then 30 when 'business_owner' then 25
         when 'marketer' then 20 when 'creator' then 20 when 'employee' then 12
         when 'student' then 10 when 'job_seeker' then 10 else 5 end;
  s := s + least(socials, 3) * 10;
  if new.vosu_status = 'has_account' then s := s + 15; else s := s + 10; end if;
  if new.country is not null and new.country <> 'BD' then s := s + 5; end if;
  new.lead_score := s;
  return new;
end $$;

drop trigger if exists oma_registrations_bi on public.oma_registrations;
create trigger oma_registrations_bi before insert on public.oma_registrations
  for each row execute function public.oma_registrations_before_insert();

alter table public.oma_registrations enable row level security;

drop policy if exists "public can register" on public.oma_registrations;
create policy "public can register" on public.oma_registrations
  for insert to anon, authenticated with check (true);

revoke select, update, delete, truncate on public.oma_registrations from anon, authenticated;
grant insert on public.oma_registrations to anon, authenticated;
