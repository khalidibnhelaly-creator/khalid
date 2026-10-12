-- ===================================================================
-- topzid.com/studio: applications for private AI film studio engagements
-- (The Engine / The Studio / The House). RLS on; the public key can only
-- INSERT. Review in the Supabase table editor or SQL editor.
-- ===================================================================

create table if not exists public.studio_applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  name          text not null check (char_length(name) between 2 and 120),
  email         text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  phone         text check (phone is null or char_length(regexp_replace(phone, '\D', '', 'g')) between 7 and 15),
  brand         text not null check (char_length(brand) between 1 and 160),
  website       text check (website is null or (char_length(website) <= 500 and website ~* '^https?://[^\s/]+\.[^\s]+')),
  revenue       text not null check (revenue in ('1m_5m','5m_20m','20m_100m','100m_plus')),
  engagement    text not null check (engagement in ('engine','studio','house','unsure')),
  vision        text not null check (char_length(vision) between 20 and 2000),
  country       text check (country is null or country ~ '^[A-Z]{2}$'),

  utm_source    text check (char_length(utm_source)   <= 120),
  utm_medium    text check (char_length(utm_medium)   <= 120),
  utm_campaign  text check (char_length(utm_campaign) <= 160),
  referrer      text check (char_length(referrer)     <= 500),

  -- review fields, filled by Khalid (forced to defaults on insert)
  status        text not null default 'new' check (status in ('new','call_booked','proposal_sent','won','declined')),
  notes         text
);
create index if not exists studio_applications_created_idx on public.studio_applications (created_at desc);

create or replace function public.studio_applications_before_insert()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.created_at := now();
  new.email := lower(trim(new.email));
  new.name := trim(new.name);
  new.status := 'new';
  new.notes := null;
  return new;
end $$;

drop trigger if exists studio_applications_bi on public.studio_applications;
create trigger studio_applications_bi before insert on public.studio_applications
  for each row execute function public.studio_applications_before_insert();

alter table public.studio_applications enable row level security;

drop policy if exists "public can apply" on public.studio_applications;
create policy "public can apply" on public.studio_applications
  for insert to anon, authenticated with check (true);

revoke select, update, delete, truncate on public.studio_applications from anon, authenticated;
grant insert on public.studio_applications to anon, authenticated;
