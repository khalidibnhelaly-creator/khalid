-- One Man Agency: VOSU paused. VOSU fields become optional, email added
-- (joining links go out by email; registrants are added to WhatsApp groups).
alter table public.oma_registrations
  alter column vosu_status drop not null,
  alter column vosu_email drop not null,
  alter column consent_vosu drop not null,
  add column if not exists email text check (email is null or (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'));
create index if not exists oma_registrations_email_idx on public.oma_registrations (lower(email));
-- Trigger updated: email normalised; VOSU points only when a VOSU status is given.
