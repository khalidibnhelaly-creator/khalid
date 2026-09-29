"use client";

import { useState } from "react";
import { brand } from "@/lib/topzid";

const TOPICS = ["AI commercial / film", "Corporate AI training", "Something else"] as const;
type Topic = (typeof TOPICS)[number];

/**
 * No backend: the brief is handed straight to WhatsApp (primary) with an
 * email fallback, so a submission can never fail silently on our side.
 * WhatsApp opens synchronously inside the submit handler, which browsers
 * treat as a user gesture and do not block.
 */
export function ContactForm() {
  const [topic, setTopic] = useState<Topic>(TOPICS[0]);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState<{ wa: string; mail: string } | null>(null);

  const bind = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value })),
  });

  function buildLinks() {
    const header = [
      "New brief from topzid.com",
      `Service: ${topic}`,
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      `Email: ${form.email}`,
      form.phone ? `WhatsApp: ${form.phone}` : null,
    ].filter(Boolean);
    const body = `${header.join("\n")}\n\n${form.message}`;

    const subject = `Brief: ${topic}${form.company ? ` · ${form.company}` : ""}`;
    return {
      wa: `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(body)}`,
      mail: `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    };
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === "email" ? "email" : "whatsapp";
    const links = buildLinks();
    if (via === "email") window.location.href = links.mail;
    else window.open(links.wa, "_blank", "noopener,noreferrer");
    (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: "tz_lead", topic, channel: via });
    setSent(links);
  }

  if (sent) {
    return (
      <div className="form-done" role="status">
        <h3>One tap left.</h3>
        <p>
          Your brief is ready in WhatsApp or your email app. Just press <b>send</b> and it reaches Khalid directly.
        </p>
        <div className="done-actions">
          <a className="btn btn-solid" href={sent.wa} target="_blank" rel="noopener noreferrer">
            Open WhatsApp again →
          </a>
          <a className="btn btn-ghost" href={sent.mail}>
            Send by email instead
          </a>
        </div>
        <button type="button" className="link done-edit" onClick={() => setSent(null)}>
          Edit brief
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 600, fontSize: 14, marginBottom: 7 }}>What do you need?</legend>
        <div className="seg">
          {TOPICS.map((t) => (
            <label key={t}>
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="row2">
        <div className="field">
          <label htmlFor="tz-name">Name</label>
          <input id="tz-name" autoComplete="name" required {...bind("name")} />
        </div>
        <div className="field">
          <label htmlFor="tz-company">
            Company <span>(optional)</span>
          </label>
          <input id="tz-company" autoComplete="organization" {...bind("company")} />
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label htmlFor="tz-email">Work email</label>
          <input id="tz-email" type="email" autoComplete="email" required {...bind("email")} />
        </div>
        <div className="field">
          <label htmlFor="tz-phone">
            WhatsApp <span>(optional)</span>
          </label>
          <input id="tz-phone" type="tel" autoComplete="tel" {...bind("phone")} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="tz-msg">Tell us about the project</label>
        <textarea
          id="tz-msg"
          required
          rows={5}
          placeholder="What are you making, where will it run, and when do you need it?"
          {...bind("message")}
        />
      </div>

      <button type="submit" name="via" value="whatsapp" className="btn btn-solid">
        Send brief on WhatsApp →
      </button>
      <p className="form-alt">
        Prefer email?{" "}
        <button type="submit" name="via" value="email" className="link">
          Send it to {brand.email}
        </button>
      </p>
    </form>
  );
}
