# khalidbinhelaly — personal landing

Next.js 16 (App Router, Turbopack). Two independent surfaces:

- `/` — main landing. Light editorial design system (Apple-school palette),
  dual-track positioning (Studio / Ventures), aimed at high-value clients
  and investors.
- `/ai` — Bangla AI workshop funnel. Shares the design system; route-level
  layout adds Hind Siliguri for Bengali glyphs (Latin falls through to
  Inter Tight) and `app/ai/workshop.css` carries funnel-specific styles
  (gallery, FAQ, WhatsApp CTA, Bengali type tuning).

## Structure

```
app/
  layout.tsx           fonts (self-hosted via Fontsource + next/font/local), metadata, viewport
  page.tsx             composition + Person JSON-LD
  globals.css          design system (tokens prefixed --k-)
  icon.svg             favicon (KBH monogram), plus favicon.ico fallback
  opengraph-image.png  1200x630 OG card (file convention)
  ai/                  workshop funnel (own layout, fonts, styles)
  api/contact          Supabase form endpoint  {name, email, phone?, message}
  api/register         workshop registration endpoint
components/            server components + three client islands
                       (site-header, contact-form, scroll-reveal)
lib/content.ts         all homepage copy and data in one place
lib/supabase.ts        lazy Supabase client
```

## Editing content

Copy, stats, ventures, clients and links live in `lib/content.ts`, not in
markup.

**Showreel:** set `site.showreelEmbedUrl` in `lib/content.ts` to a YouTube
embed URL (`https://www.youtube.com/embed/VIDEO_ID`) and the placeholder
frame becomes the player. No other change needed.

## Develop

```bash
npm install
npm run dev
```

Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
(see `.env.example`).
