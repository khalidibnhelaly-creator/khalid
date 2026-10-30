"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/topzid";
import { insertRow } from "@/lib/public-supabase";

export const REVENUE = [
  ["1m_5m", "$1M to $5M"],
  ["5m_20m", "$5M to $20M"],
  ["20m_100m", "$20M to $100M"],
  ["100m_plus", "Over $100M"],
] as const;

export const ENGAGEMENT = [
  ["engine", "The Engine"],
  ["studio", "The Studio"],
  ["house", "The House"],
  ["unsure", "Not sure yet"],
] as const;

type Revenue = (typeof REVENUE)[number][0];
type Engagement = (typeof ENGAGEMENT)[number][0];

const label = (list: readonly (readonly [string, string])[], v: string) => list.find(([k]) => k === v)?.[1] ?? v;

function normalizeUrl(v: string) {
  v = v.trim();
  if (v && !/^https?:\/\//i.test(v)) v = "https://" + v.replace(/^\/+/, "");
  return v;
}

const push = (o: object) => (window as unknown as { dataLayer?: object[] }).dataLayer?.push(o);

/**
 * Studio application.
 * 1. Saved to Supabase (public.studio_applications, insert-only for the public key).
 * 2. The confirmation offers a pre-written email and WhatsApp copy, so the
 *    application also reaches Khalid's inbox directly.
 * Buttons anywhere on the page with data-engagement="engine|studio|house"
 * pre-select the engagement.
 */
export function StudioForm({ country }: { country: string | null }) {
  const [f, setF] = useState({ name: "", email: "", phone: "", brand: "", website: "", vision: "" });
  const [revenue, setRevenue] = useState<Revenue | "">("");
  const [engagement, setEngagement] = useState<Engagement | "">("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ mail: string; wa: string; saved: boolean } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-engagement]");
      const v = el?.dataset.engagement as Engagement | undefined;
      if (v && ENGAGEMENT.some(([k]) => k === v)) setEngagement(v);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const bind = (k: keyof typeof f) => ({
    value: f[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((s) => ({ ...s, [k]: e.target.value })),
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!revenue || !engagement) {
      setError(!revenue ? "Choose your annual revenue." : "Choose the engagement you are interested in.");
      return;
    }

    const website = normalizeUrl(f.website);
    const params = new URLSearchParams(window.location.search);
    const row = {
      name: f.name.trim(),
      email: f.email.trim(),
      phone: f.phone.trim() || null,
      brand: f.brand.trim(),
      website: website || null,
      revenue,
      engagement,
      vision: f.vision.trim(),
      country,
      utm_source: params.get("utm_source")?.slice(0, 120) || null,
      utm_medium: params.get("utm_medium")?.slice(0, 120) || null,
      utm_campaign: params.get("utm_campaign")?.slice(0, 160) || null,
      referrer: document.referrer && !document.referrer.includes(window.location.host) ? document.referrer.slice(0, 500) : null,
    };

    const lines = [
      `Studio application (topzid.com/studio)`,
      ``,
      `Name: ${row.name}`,
      `Brand: ${row.brand}${website ? ` (${website})` : ""}`,
      `Annual revenue: ${label(REVENUE, revenue)}`,
      `Engagement: ${label(ENGAGEMENT, engagement)}`,
      `Email: ${row.email}`,
      row.phone ? `Phone / WhatsApp: ${row.phone}` : null,
      country ? `Country: ${country}` : null,
      ``,
      `What would change if our brand could make film every week?`,
      row.vision.length > 1200 ? row.vision.slice(0, 1200) + "..." : row.vision,
    ].filter((l) => l !== null) as string[];
    const body = lines.join("\n");
    const mail = `mailto:${brand.email}?subject=${encodeURIComponent(`Studio application: ${row.brand}`)}&body=${encodeURIComponent(body)}`;
    const wa = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(body)}`;

    setBusy(true);
    let saved = true;
    try {
      await insertRow("studio_applications", row);
    } catch {
      saved = false;
      push({ event: "studio_save_error" });
    }
    setBusy(false);
    push({ event: "studio_application", engagement, revenue });
    setDone({ mail, wa, saved });
    requestAnimationFrame(() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  if (done) {
    return (
      <div className="st-done" role="status">
        <span className="cred" style={{ color: "var(--brass-2)" }}>{done.saved ? "Application received" : "One more step"}</span>
        <h3 className="disp" style={{ marginTop: 14 }}>{done.saved ? "Thank you." : "Almost there."}</h3>
        {done.saved ? (
          <p>
            Your application is with us. Khalid reads every one personally. If there is a fit, you will hear back within
            two working days to arrange a private consultation. If there is not, we will tell you, and point you
            somewhere better.
          </p>
        ) : (
          <p>
            Your application could not be saved from this browser. Please send it by email or WhatsApp below. It is
            already written for you.
          </p>
        )}
        <p style={{ marginBottom: 0 }}>
          {done.saved ? "To reach Khalid's inbox directly as well, send the pre-written copy:" : ""}
        </p>
        <div className="acts">
          <a className="btn btn-solid" href={done.mail}>
            Send by email <span className="arr">→</span>
          </a>
          <a className="btn btn-line" href={done.wa} target="_blank" rel="noopener noreferrer">
            Send on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="st-form" onSubmit={submit}>
      <div className="row2">
        <div className="st-field">
          <label className="cred" htmlFor="sf-name">Name</label>
          <input id="sf-name" type="text" autoComplete="name" required minLength={2} maxLength={120} {...bind("name")} />
        </div>
        <div className="st-field">
          <label className="cred" htmlFor="sf-email">Email</label>
          <input id="sf-email" type="email" autoComplete="email" required maxLength={254} {...bind("email")} />
        </div>
      </div>

      <div className="row2">
        <div className="st-field">
          <label className="cred" htmlFor="sf-brand">Brand</label>
          <input id="sf-brand" type="text" autoComplete="organization" required maxLength={160} {...bind("brand")} />
        </div>
        <div className="st-field">
          <label className="cred" htmlFor="sf-web">Website <span>(optional)</span></label>
          <input id="sf-web" type="text" inputMode="url" placeholder="yourbrand.com" maxLength={480} {...bind("website")} />
        </div>
      </div>

      <div className="st-field">
        <label className="cred" htmlFor="sf-phone">Phone or WhatsApp <span>(optional)</span></label>
        <input id="sf-phone" type="tel" autoComplete="tel" pattern="[+0-9 ()\-]{7,20}" placeholder="+1 555 000 0000" {...bind("phone")} />
      </div>

      <fieldset className="st-field">
        <legend className="cred" style={{ marginBottom: 12 }}>Annual revenue</legend>
        <div className="st-chips">
          {REVENUE.map(([v, t]) => (
            <label key={v}>
              <input type="radio" name="revenue" value={v} checked={revenue === v} onChange={() => { setRevenue(v); setError(null); }} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="st-field">
        <legend className="cred" style={{ marginBottom: 12 }}>Engagement of interest</legend>
        <div className="st-chips">
          {ENGAGEMENT.map(([v, t]) => (
            <label key={v}>
              <input type="radio" name="engagement" value={v} checked={engagement === v} onChange={() => { setEngagement(v); setError(null); }} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="st-field">
        <label className="cred" htmlFor="sf-vision">What would change if your brand could make film every week?</label>
        <textarea id="sf-vision" required minLength={20} maxLength={2000} rows={5} {...bind("vision")} />
      </div>


      {error && <p className="st-form-err" role="alert">{error}</p>}

      <button type="submit" className="btn btn-solid" disabled={busy}>
        {busy ? "Sending" : "Submit application"} <span className="arr">→</span>
      </button>
      <p className="st-form-note">Read personally by Khalid. Everything you share stays confidential.</p>
    </form>
  );
}
