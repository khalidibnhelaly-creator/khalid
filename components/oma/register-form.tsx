"use client";

import { useState } from "react";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/public-supabase";
import { brand } from "@/lib/topzid";
import { OMA, omaTimes, vosuLink } from "@/lib/oma";

const OCCUPATIONS = [
  ["freelancer", "Freelancer"],
  ["agency", "Agency owner or agency team"],
  ["business_owner", "Business owner"],
  ["marketer", "Marketer (in a company)"],
  ["creator", "Content creator"],
  ["employee", "Employee, other field"],
  ["student", "Student"],
  ["job_seeker", "Looking for work"],
  ["other", "Other"],
] as const;

const SOCIALS = [
  ["instagram", "Instagram", "@yourname"],
  ["tiktok", "TikTok", "@yourname"],
  ["youtube", "YouTube", "@channel"],
  ["linkedin", "LinkedIn", "linkedin.com/in/you"],
  ["facebook", "Facebook", "facebook.com/you"],
] as const;

type SocialKey = (typeof SOCIALS)[number][0];
type Occ = (typeof OCCUPATIONS)[number][0] | "";

const push = (o: object) => (window as unknown as { dataLayer?: object[] }).dataLayer?.push(o);

function calendarLinks() {
  const { startUtc, endUtc } = omaTimes();
  const title = "One Man Agency: free live class with Khalid Bin Helaly";
  const details = `Free live class with Khalid Bin Helaly, with VOSU. Joining links come on WhatsApp. ${OMA.url}`;
  const google =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}&dates=${startUtc}/${endUtc}` +
    `&details=${encodeURIComponent(details)}&location=${encodeURIComponent(OMA.url)}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TOPZID//One Man Agency//EN",
    "BEGIN:VEVENT",
    `UID:oma-20261127@topzid.com`,
    `DTSTAMP:${startUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${details}`,
    `URL:${OMA.url}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:One Man Agency starts in 30 minutes",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return { google, icsHref: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}` };
}

/**
 * Registration. Saves to Supabase public.oma_registrations (insert-only for
 * the public key, one row per WhatsApp number). A repeat registration comes
 * back as 409 and is treated as success.
 */
export function RegisterForm({ country }: { country: string | null }) {
  const [f, setF] = useState({ name: "", whatsapp: "", note: "", vosuEmail: "", hp: "" });
  const [occ, setOcc] = useState<Occ>("");
  const [soc, setSoc] = useState<Record<SocialKey, string>>({ instagram: "", tiktok: "", youtube: "", linkedin: "", facebook: "" });
  const [vosu, setVosu] = useState<"" | "has_account" | "created_now">("");
  const [consent, setConsent] = useState(false);
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<{ first: string; repeat: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  const [closed] = useState(() => OMA.closed || Date.now() >= new Date(OMA.startsAt).getTime());

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    if (f.hp) return; // honeypot

    const waDigits = f.whatsapp.replace(/\D/g, "");
    const anySocial = Object.values(soc).some((v) => v.trim());
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.vosuEmail.trim());
    const b: Record<string, boolean> = {
      name: f.name.trim().length < 2,
      whatsapp: waDigits.length < 10 || waDigits.length > 15,
      occ: !occ,
      socials: !anySocial,
      vosu: !vosu,
      vosuEmail: !emailOk,
      consent: !consent,
    };
    setBad(b);
    const firstBad = Object.keys(b).find((k) => b[k]);
    if (firstBad) {
      document.getElementById(`oma-f-${firstBad}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const clean = (v: string) => v.trim().slice(0, 200) || null;
    const row = {
      name: f.name.trim(),
      whatsapp: f.whatsapp.trim(),
      occupation: occ,
      occupation_note: occ === "other" ? f.note.trim().slice(0, 120) || null : null,
      instagram: clean(soc.instagram),
      tiktok: clean(soc.tiktok),
      youtube: clean(soc.youtube),
      linkedin: clean(soc.linkedin),
      facebook: clean(soc.facebook),
      vosu_status: vosu,
      vosu_email: f.vosuEmail.trim(),
      consent_vosu: true,
      country,
      utm_source: params.get("utm_source")?.slice(0, 120) || null,
      utm_medium: params.get("utm_medium")?.slice(0, 120) || null,
      utm_campaign: params.get("utm_campaign")?.slice(0, 160) || null,
      referrer: document.referrer && !document.referrer.includes(window.location.host) ? document.referrer.slice(0, 500) : null,
    };

    setBusy(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/oma_registrations`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(row),
      });
      const repeat = res.status === 409;
      if (!res.ok && !repeat) throw new Error(await res.text());
      push({ event: "oma_registered", occupation: occ, vosu: vosu, repeat });
      setDone({ first: row.name.split(/\s+/)[0], repeat });
      requestAnimationFrame(() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch {
      push({ event: "oma_register_error" });
      setErr("We could not save your registration. Check your connection and try again, or message us on WhatsApp.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    const { google, icsHref } = calendarLinks();
    const shareText = `I'm joining ONE MAN AGENCY, a free live class by Khalid Bin Helaly with VOSU. Fri 27 Nov, 8 PM. Register free: ${OMA.url}`;
    return (
      <div className="oma-done" role="status">
        <span className="lbl" style={{ color: "var(--ok)" }}>{done.repeat ? "Already registered" : "Registered"}</span>
        <h3 className="disp">You&apos;re in, {done.first}.</h3>
        <p>
          {done.repeat
            ? "This WhatsApp number is already on the list, so you are all set. "
            : "Your seat is confirmed. "}
          The joining links come on WhatsApp: the day before, 2 hours before and 10 minutes before we go live on
          Friday, 27 November at 8:00 PM Dhaka.
        </p>
        <div className="acts">
          <a className="btn btn-fg" href={google} target="_blank" rel="noopener noreferrer">Add to Google Calendar</a>
          <a className="btn btn-line" href={icsHref} download="one-man-agency.ics">Apple / Outlook calendar</a>
          <a className="btn btn-line" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              navigator.clipboard?.writeText(OMA.url).then(() => setCopied(true), () => setCopied(false));
              push({ event: "oma_share_copy" });
            }}
          >
            {copied ? "Link copied" : "Copy the link"}
          </button>
        </div>
        <p className="tip">
          <b>Save {brand.whatsappDisplay} in your contacts.</b> WhatsApp only delivers our reminders reliably to
          people who have the number saved.
        </p>
      </div>
    );
  }

  if (closed) {
    return (
      <div className="oma-done" role="status">
        <span className="lbl">Registration closed</span>
        <h3 className="disp">See you next time.</h3>
        <p>Registration for this class is closed. Follow @thekhalidway to hear about the next one first.</p>
      </div>
    );
  }

  const cls = (k: string) => `oma-f${bad[k] ? " bad" : ""}`;

  return (
    <form className="oma-form" onSubmit={submit} noValidate>
      <div className="row2">
        <div className={cls("name")} id="oma-f-name">
          <label htmlFor="oma-name">Full name</label>
          <input id="oma-name" type="text" autoComplete="name" maxLength={120} placeholder="e.g. Rakib Hasan" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <span className="err">Please enter your name.</span>
        </div>
        <div className={cls("whatsapp")} id="oma-f-whatsapp">
          <label htmlFor="oma-wa">WhatsApp number</label>
          <input id="oma-wa" type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} />
          <span className="err">Enter a valid WhatsApp number. Your joining link is sent here.</span>
        </div>
      </div>

      <div className={cls("occ")} id="oma-f-occ">
        <label htmlFor="oma-occ">What do you do?</label>
        <select id="oma-occ" value={occ} onChange={(e) => setOcc(e.target.value as Occ)}>
          <option value="" disabled>Choose one</option>
          {OCCUPATIONS.map(([v, t]) => (
            <option key={v} value={v}>{t}</option>
          ))}
        </select>
        {occ === "other" && (
          <input type="text" maxLength={120} placeholder="Tell us in a few words" aria-label="Your occupation" value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} />
        )}
        <span className="err">Choose the closest option.</span>
      </div>

      <fieldset className={cls("socials")} id="oma-f-socials">
        <legend>Your social profiles <span>(at least one)</span></legend>
        <div className="oma-socials">
          {SOCIALS.map(([k, label, ph]) => (
            <div className="s" key={k}>
              <span>{label}</span>
              <input type="text" aria-label={label} placeholder={ph} maxLength={200} value={soc[k]} onChange={(e) => setSoc({ ...soc, [k]: e.target.value })} />
            </div>
          ))}
        </div>
        <span className="hint">We look at real work to pick the people for the small interactive Zoom room.</span>
        <span className="err">Add at least one profile, a handle or a link.</span>
      </fieldset>

      <fieldset className={cls("vosu")} id="oma-f-vosu">
        <legend>VOSU account <span>(required, free)</span></legend>
        <div className="oma-radios">
          <label>
            <input type="radio" name="oma-vosu" checked={vosu === "has_account"} onChange={() => setVosu("has_account")} />
            <span>Yes, I have a VOSU account</span>
          </label>
          <label>
            <input type="radio" name="oma-vosu" checked={vosu === "created_now"} onChange={() => setVosu("created_now")} />
            <span>
              Not yet, I will create one now
              <small>It is free and takes about two minutes.</small>
            </span>
          </label>
        </div>
        {vosu === "created_now" && (
          <div className="oma-vosu-cta">
            <p>Create your account in a new tab, then come back and enter the email you used.</p>
            <a className="btn btn-fg" href={vosuLink("register_form")} target="_blank" rel="noopener sponsored" onClick={() => push({ event: "oma_vosu_signup_click" })}>
              Create VOSU account ↗
            </a>
          </div>
        )}
        <span className="err">Choose one. A free VOSU account is required to register.</span>
      </fieldset>

      <div className={cls("vosuEmail")} id="oma-f-vosuEmail">
        <label htmlFor="oma-vemail">Email on your VOSU account</label>
        <input id="oma-vemail" type="email" autoComplete="email" placeholder="you@example.com" value={f.vosuEmail} onChange={(e) => setF({ ...f, vosuEmail: e.target.value })} />
        <span className="hint">The same email you signed up to VOSU with.</span>
        <span className="err">Enter the email address on your VOSU account.</span>
      </div>

      <div className={cls("consent")} id="oma-f-consent">
        <label className="oma-check">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>I agree that my registration details can be shared with VOSU, the partner of this class.</span>
        </label>
        <span className="err">Please agree to continue. VOSU partners this class.</span>
      </div>

      <div className="oma-hp" aria-hidden="true">
        <label htmlFor="oma-company">Company</label>
        <input id="oma-company" type="text" tabIndex={-1} autoComplete="off" value={f.hp} onChange={(e) => setF({ ...f, hp: e.target.value })} />
      </div>

      {err && <p className="ferr" role="alert">{err}</p>}

      <button type="submit" className="btn btn-fg" disabled={busy}>
        {busy ? "Registering" : "Register free"} <span className="arr">→</span>
      </button>
      <p className="fine">
        Free. No payment. By registering you agree to the <a href="/terms">terms</a> and <a href="/privacy-policy">privacy policy</a>.
      </p>
    </form>
  );
}
