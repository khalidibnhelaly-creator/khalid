-- topzid.com/unemployable: Season 02 waitlist (launch April 2027).
-- RLS on; the public key can only INSERT. Export from the table editor at launch.
create table if not exists public.unemployable_waitlist (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null check (char_length(name) between 2 and 120),
  whatsapp     text not null check (char_length(regexp_replace(whatsapp, '\D', '', 'g')) between 10 and 15),
  email        text check (email is null or (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$')),
  season1      boolean not null default false,
  utm_source   text check (char_length(utm_source)   <= 120),
  utm_medium   text check (char_length(utm_medium)   <= 120),
  utm_campaign text check (char_length(utm_campaign) <= 160),
  referrer     text check (char_length(referrer)     <= 500)
);
create index if not exists unemployable_waitlist_created_idx on public.unemployable_waitlist (created_at desc);

create or replace function public.unemployable_waitlist_before_insert()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.created_at := now();
  new.name := trim(new.name);
  new.email := nullif(lower(trim(coalesce(new.email, ''))), '');
  return new;
end $$;
drop trigger if exists unemployable_waitlist_bi on public.unemployable_waitlist;
create trigger unemployable_waitlist_bi before insert on public.unemployable_waitlist
  for each row execute function public.unemployable_waitlist_before_insert();

alter table public.unemployable_waitlist enable row level security;
drop policy if exists "public can join waitlist" on public.unemployable_waitlist;
create policy "public can join waitlist" on public.unemployable_waitlist
  for insert to anon, authenticated with check (true);
revoke select, update, delete, truncate on public.unemployable_waitlist from anon, authenticated;
grant insert on public.unemployable_waitlist to anon, authenticated;
