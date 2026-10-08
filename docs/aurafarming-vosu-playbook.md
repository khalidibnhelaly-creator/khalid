# Aurafarming × VOSU: tracking and ops playbook

Event: Friday, October 23, 2026, 9:00 PM Dhaka. ৳1,000, 2,000 seats.
One list only: every registration lands in `public.webinar_oct23_registrations`
(Supabase project `yuxdvspnxwltqchqluso`). If VOSU builds its own page, it must
link to `https://www.topzid.com/aurafarming` with its UTM below.

## 1. Links per traffic source

Use exactly these. The page stores the first tagged visit for 30 days, so a
person who clicks an ad on Monday and pays on Wednesday is still credited to
the ad.

| Source | Link |
|---|---|
| VOSU-funded Meta ads | `https://www.topzid.com/aurafarming?utm_source=vosu_ads&utm_medium=paid_social&utm_campaign=oct23_webinar&utm_content={{ad.name}}` |
| My Facebook (organic) | `https://www.topzid.com/aurafarming?utm_source=facebook&utm_medium=organic&utm_campaign=oct23_webinar` |
| My Instagram | `https://www.topzid.com/aurafarming?utm_source=instagram&utm_medium=organic&utm_campaign=oct23_webinar` |
| My LinkedIn | `https://www.topzid.com/aurafarming?utm_source=linkedin&utm_medium=organic&utm_campaign=oct23_webinar` |
| My YouTube | `https://www.topzid.com/aurafarming?utm_source=youtube&utm_medium=organic&utm_campaign=oct23_webinar` |
| WhatsApp broadcasts | `https://www.topzid.com/aurafarming?utm_source=whatsapp&utm_medium=broadcast&utm_campaign=oct23_webinar` |
| VOSU's own channels | `https://www.topzid.com/aurafarming?utm_source=vosu&utm_medium=partner&utm_campaign=oct23_webinar&utm_content=CHANNEL` (replace CHANNEL: newsletter, x, instagram, discord) |

For the Meta ads, put everything after `?` into the ad's **URL parameters**
field. `{{ad.name}}` is filled in by Meta, so each creative is tracked separately.
Only `utm_source=vosu_ads` counts toward VOSU's cost per registration.

## 2. Before the event

Update VOSU ad spend as it lands (USD), so cost per registration stays live:

```sql
update webinar_private.settings set value = '350' where key = 'vosu_ad_spend_usd';
```

Fill in `public/aurafarming/config.js` only once each item is confirmed in
writing by VOSU. Empty values do not render:
`partnerBadge`, `referralCode`, `whyLine`, `clips`, `grants`, `buyerBonus`,
`localPayment`.

## 3. During the session

Set the code word the moment you announce it. Until it is set, every submission
is stored as incorrect. The page never contains the word.

```sql
update webinar_private.settings set value = 'yourword' where key = 'code_word';
```

The submission window is 9:00 PM to 1:00 AM Dhaka. To change it:

```sql
update webinar_private.settings set value = '2026-10-24T00:30:00+06:00' where key = 'codeword_close_at';
```

Code word page: `https://www.topzid.com/aurafarming/code`

## 4. Picking grants

Verified attendees ranked by lead score:

```sql
select * from webinar_private.oct23_shortlist limit 150;
```

Mark starter grants (then send the challenge brief to these people):

```sql
update public.webinar_oct23_registrations set grant_tier = 'starter'
where lower(email) in ('a@example.com', 'b@example.com');
```

Challenge page: `https://www.topzid.com/aurafarming/challenge`
(open Oct 23, 9 PM to Oct 26, 11:59 PM Dhaka; max 3 entries per person)

```sql
select r.name, c.email, c.post_url, c.note, c.created_at
from public.webinar_oct23_challenge_entries c
left join public.webinar_oct23_registrations r on r.id = c.registration_id
where c.on_time order by c.created_at;
```

Mark the top entries `large` or `featured` the same way as `starter`.

## 5. The numbers for the VOSU conversation (mid November)

```sql
select * from webinar_private.oct23_funnel;     -- headline numbers
select * from webinar_private.oct23_by_source;  -- per source
```

| Metric you asked for | Where it comes from |
|---|---|
| Registrations by source | `oct23_by_source.registrations` |
| Cost per registration on VOSU spend | `oct23_funnel.cost_per_registration_usd` (needs ad spend set above) |
| Live show-up rate | `oct23_funnel.show_up_rate_pct` (correct, on-time code word ÷ paid registrations) |
| Code word submissions | `oct23_funnel.codeword_submissions` |
| New VOSU signups via my code | VOSU dashboard. `new_vosu_accounts_intended` is the intent signal from the form |
| Challenge entries | `oct23_funnel.challenge_entries` |
| Voucher sales via bKash | not live yet (waiting on VOSU approval) |
| Masterclass purchases within 48h | `oct23_funnel.masterclass_48h` (Season 1 / masterclass payments from the same email within 48h of start) |

Export for VOSU (only people who consented, which is everyone, since consent is required):

```sql
select name, email, whatsapp, role, portfolio_url, intent, vosu_account, segment, codeword_ok, grant_tier
from webinar_private.oct23_people where consent_vosu order by score desc;
```

## Lead score (computed by the database, max 9, priority at 6+)

| Signal | Points |
|---|---|
| Role: agency or brand/in-house marketer | 3 |
| Role: freelancer or business owner | 2 |
| Role: student or other | 1 |
| Portfolio link points to a specific page (has a path) | 2, bare domain 1 |
| Intent: 15+ words 2, 6+ words 1, names a concrete format (video, ad, reel, brand...) +1 | up to 3 |
| Already has a VOSU account | 1 |

The score is a shortlisting aid. Public selection stays as stated on the page:
work, attendance, challenge entry.
