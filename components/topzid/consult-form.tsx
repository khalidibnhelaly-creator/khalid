"use client";

import { useState } from "react";
import { brand } from "@/lib/topzid";
import { insertRow } from "@/lib/public-supabase";

const ROLES = [
  ["founder", "Founder or owner"],
  ["marketing_lead", "Marketing or brand lead"],
  ["creator", "Creator or personal brand"],
  ["agency", "Agency"],
  ["other", "Other"],
] as const;

const STAGES = [
  ["idea", "Idea or pre-launch"],
  ["early", "Early, first customers"],
  ["growing", "Growing, steady revenue"],
  ["established", "Established business"],
] as const;

const AREAS = [
  ["business", "Business"],
  ["production", "Production"],
  ["content", "Content"],
  ["growth", "Growth"],
  ["marketing", "Marketing"],
  ["brand", "Brand"],
] as const;

type Area = (typeof AREAS)[number][0];

function label<T extends readonly (readonly [string, string])[]>(list: T, v: string) {
  return list.find(([k]) => k === v)?.[1] ?? v;
}

function normalizeUrl(v: string) {
  v = v.trim();
  if (v && !/^https?:\/\//i.test(v)) v = "https://" + v.replace(/^\/+/, "");
  return v;
}

/**
 * Application for the ৳50,000 strategy session.
 * 1. Saved to Supabase (insert-only table) in the background.
 * 2. Opened on WhatsApp, pre-written to Khalid, so every application
 *    arrives instantly even if the database is unreachable.
 */
export function ConsultForm() {
  const [f, setF] = useState({ name: "", email: "", whatsapp: "", company: "", link: "", role: "", stage: "", problem: "", outcome: "" });
  const [areas, setAreas] = useState<Area[]>([]);
  const [feeAck, setFeeAck] = useState(false);
  const [areaError, setAreaError] = useState(false);
  const [waLink, setWaLink] = useState<string | null>(null);

  const bind = (k: keyof typeof f) => ({
    value: f[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setF((s) => ({ ...s, [k]: e.target.value })),
  });

  function toggleArea(a: Area) {
    setAreaError(false);
    setAreas((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]));
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!areas.length) {
      setAreaError(true);
      document.getElementById("cf-areas")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const link = normalizeUrl(f.link);
    const params = new URLSearchParams(window.location.search);

    const row = {
      name: f.name.trim(),
      email: f.email.trim(),
      whatsapp: f.whatsapp.trim(),
      company: f.company.trim(),
      link: link || null,
      role: f.role,
      stage: f.stage,
      areas,
      problem: f.problem.trim(),
      outcome: f.outcome.trim(),
      fee_ack: true,
      utm_source: params.get("utm_source")?.slice(0, 120) || null,
      utm_medium: params.get("utm_medium")?.slice(0, 120) || null,
      utm_campaign: params.get("utm_campaign")?.slice(0, 160) || null,
      referrer: document.referrer && !document.referrer.includes(window.location.host) ? document.referrer.slice(0, 500) : null,
    };

    const message = [
      "Consulting application (topzid.com/consult)",
      `Name: ${row.name}`,
      `Company: ${row.company}`,
      `Role: ${label(ROLES, row.role)} · Stage: ${label(STAGES, row.stage)}`,
      `Areas: ${areas.map((a) => label(AREAS, a)).join(", ")}`,
      `Email: ${row.email}`,
      `WhatsApp: ${row.whatsapp}`,
      link ? `Link: ${link}` : null,
      "",
      "The problem:",
      row.problem,
      "",
      "A good outcome:",
      row.outcome,
      "",
      "I understand the fee is ৳50,000.",
    ]
      .filter((l) => l !== null)
      .join("\n");
    const wa = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;

    // Background save (keepalive survives the tab switching to WhatsApp).
    insertRow("consult_applications", row, true).catch(() => {
      (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: "consult_save_error" });
    });
    window.open(wa, "_blank", "noopener,noreferrer");
    (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: "consult_application", stage: row.stage, role: row.role });
    setWaLink(wa);
  }

  if (waLink) {
    return (
      <div className="form-done" role="status">
        <h3>Application received.</h3>
        <p>
          WhatsApp has opened with your application. Press <b>send</b> so it reaches me directly. I review every
          application personally and reply within 48 hours. If it is a fit, you get the payment details and
          available times.
        </p>
        <div className="done-actions">
          <a className="btn btn-solid" href={waLink} target="_blank" rel="noopener noreferrer">
            Open WhatsApp again →
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="row2">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" autoComplete="name" required minLength={2} {...bind("name")} />
        </div>
        <div className="field">
          <label htmlFor="cf-company">Company or brand</label>
          <input id="cf-company" autoComplete="organization" required {...bind("company")} />
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" type="email" autoComplete="email" required {...bind("email")} />
        </div>
        <div className="field">
          <label htmlFor="cf-wa">WhatsApp</label>
          <input id="cf-wa" type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{10,20}" placeholder="01XXXXXXXXX" {...bind("whatsapp")} />
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label htmlFor="cf-role">Your role</label>
          <select id="cf-role" required {...bind("role")}>
            <option value="" disabled>Choose one</option>
            {ROLES.map(([v, t]) => (
              <option key={v} value={v}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="cf-stage">Where the business is</label>
          <select id="cf-stage" required {...bind("stage")}>
            <option value="" disabled>Choose one</option>
            {STAGES.map(([v, t]) => (
              <option key={v} value={v}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-link">Website or social link <span>(optional)</span></label>
        <input id="cf-link" type="text" inputMode="url" placeholder="yourbrand.com" {...bind("link")} />
      </div>

      <fieldset className="field" id="cf-areas" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 600, fontSize: 14, marginBottom: 7 }}>What should we work on? <span style={{ color: "var(--muted)", fontWeight: 400 }}>(choose any)</span></legend>
        <div className="seg">
          {AREAS.map(([v, t]) => (
            <label key={v}>
              <input type="checkbox" checked={areas.includes(v)} onChange={() => toggleArea(v)} />
              {t}
            </label>
          ))}
        </div>
        {areaError && <p className="form-error" style={{ marginTop: 8 }}>Choose at least one area.</p>}
      </fieldset>

      <div className="field">
        <label htmlFor="cf-problem">What is the problem, in your own words?</label>
        <textarea id="cf-problem" required minLength={20} maxLength={2000} rows={5} placeholder="What is happening, what you have tried, and what it is costing you." {...bind("problem")} />
      </div>

      <div className="field">
        <label htmlFor="cf-outcome">What would a good outcome look like in 90 days?</label>
        <textarea id="cf-outcome" required minLength={10} maxLength={1000} rows={3} {...bind("outcome")} />
      </div>

      <label className="ack">
        <input type="checkbox" required checked={feeAck} onChange={(e) => setFeeAck(e.target.checked)} />
        <span>I understand the fee is <b>৳50,000</b>, paid only if my application is accepted.</span>
      </label>

      <button type="submit" className="btn btn-solid">Submit application →</button>
      <p className="form-alt">Your application opens on WhatsApp so it reaches Khalid directly.</p>
    </form>
  );
}
