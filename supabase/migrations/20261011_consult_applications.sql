-- ===================================================================
-- topzid.com/consult: applications for the ৳50,000 strategy session.
-- RLS on; the public key can only INSERT. Review applications in the
-- Supabase table editor or SQL editor.
-- ===================================================================

create table if not exists public.consult_applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  name          text not null check (char_length(name) between 2 and 120),
  email         text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  whatsapp      text not null check (char_length(regexp_replace(whatsapp, '\D', '', 'g')) between 10 and 15),
  company       text not null check (char_length(company) between 1 and 160),
  link          text check (link is null or (char_length(link) <= 500 and link ~* '^https?://[^\s/]+\.[^\s]+')),
  role          text not null check (role in ('founder','marketing_lead','creator','agency','other')),
  stage         text not null check (stage in ('idea','early','growing','established')),
  areas         text[] not null check (cardinality(areas) between 1 and 6
                  and areas <@ array['business','production','content','growth','marketing','brand']::text[]),
  problem       text not null check (char_length(problem) between 20 and 2000),
  outcome       text not null check (char_length(outcome) between 10 and 1000),
  fee_ack       boolean not null check (fee_ack),

  utm_source    text check (char_length(utm_source)   <= 120),
  utm_medium    text check (char_length(utm_medium)   <= 120),
  utm_campaign  text check (char_length(utm_campaign) <= 160),
  referrer      text check (char_length(referrer)     <= 500),

  -- review fields, filled by Khalid (forced to defaults on insert)
  status        text not null default 'new' check (status in ('new','approved','declined','paid','done')),
  notes         text
);
create index if not exists consult_applications_created_idx on public.consult_applications (created_at desc);

create or replace function public.consult_applications_before_insert()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.created_at := now();
  new.email := lower(trim(new.email));
  new.name := trim(new.name);
  new.status := 'new';
  new.notes := null;
  return new;
end $$;

drop trigger if exists consult_applications_bi on public.consult_applications;
create trigger consult_applications_bi before insert on public.consult_applications
  for each row execute function public.consult_applications_before_insert();

alter table public.consult_applications enable row level security;

drop policy if exists "public can apply" on public.consult_applications;
create policy "public can apply" on public.consult_applications
  for insert to anon, authenticated with check (true);

revoke select, update, delete, truncate on public.consult_applications from anon, authenticated;
grant insert on public.consult_applications to anon, authenticated;
