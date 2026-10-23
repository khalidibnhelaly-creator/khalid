-- Checkout codes on Season 1 recordings (applied in the browser, recorded here
-- so every discounted payment can be matched by hand).
alter table public.payments add column if not exists promo_code text check (promo_code is null or char_length(promo_code) <= 40);
comment on column public.payments.promo_code is 'Checkout code used (e.g. the Oct 23 webinar code, Season 1 at 7,000). Null = no code.';
