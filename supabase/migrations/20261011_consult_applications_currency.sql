-- Regional pricing on /consult: record which price the applicant saw.
-- BDT for visitors from Bangladesh, USD for everyone else (amounts live in lib/pricing.ts).
alter table public.consult_applications
  add column if not exists currency text not null default 'BDT' check (currency in ('BDT','USD')),
  add column if not exists country text check (country is null or country ~ '^[A-Z]{2}$');
