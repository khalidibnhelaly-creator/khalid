"use client";

import { useState } from "react";

const TOPICS = ["AI commercial / film", "Corporate AI training", "Something else"] as const;
type Topic = (typeof TOPICS)[number];

type Status = "idle" | "loading" | "success" | "error";

/**
 * Posts to /api/contact (contract unchanged: name, email, phone?, message).
 * The selected topic is prefixed to the message so leads arrive pre-sorted.
 */
export function ContactForm() {
  const [topic, setTopic] = useState<Topic>(TOPICS[0]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const bind = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value })),
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const message = [
      `[${topic}]`,
      form.company ? `Company: ${form.company}` : null,
      "",
      form.message,
    ]
      .filter((l) => l !== null)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try WhatsApp instead.");
        setStatus("error");
        return;
      }
      (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: "tz_lead", topic });
      setStatus("success");
    } catch {
      setError("Network error. Please try again or message us on WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-done" role="status">
        <h3>Brief received.</h3>
        <p>Thank you. We reply to every brief within 48 hours, Dhaka time. If it is urgent, WhatsApp is fastest.</p>
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
          <label htmlFor="tz-company">Company <span>(optional)</span></label>
          <input id="tz-company" autoComplete="organization" {...bind("company")} />
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label htmlFor="tz-email">Work email</label>
          <input id="tz-email" type="email" autoComplete="email" required {...bind("email")} />
        </div>
        <div className="field">
          <label htmlFor="tz-phone">WhatsApp <span>(optional)</span></label>
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

      <div aria-live="polite">{status === "error" && <p className="form-error">{error}</p>}</div>

      <button type="submit" className="btn btn-solid" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send brief →"}
      </button>
    </form>
  );
}
