"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set =
    (key: keyof typeof INITIAL) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(INITIAL);
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>Message received.</h3>
        <p>
          Thanks for reaching out. I read everything that lands here and will
          reply within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={set("name")}
          />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={set("email")}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-phone">Phone / WhatsApp (optional)</label>
        <input
          id="cf-phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={set("phone")}
        />
      </div>

      <div className="field">
        <label htmlFor="cf-message">What are you building?</label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
        />
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p className="form-status is-error">{error}</p>
        )}
      </div>

      <button type="submit" className="btn" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
