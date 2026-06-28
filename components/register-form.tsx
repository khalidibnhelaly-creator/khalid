"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL = { name: "", email: "", phone: "", company: "" };

/** Workshop registration. Bangla UI, posts to /api/register (contract unchanged). */
export function RegisterForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set =
    (key: keyof typeof INITIAL) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "ai-workshop" }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "কিছু ভুল হয়েছে");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(INITIAL);
    } catch {
      setError("নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>রেজিস্ট্রেশন সফল</h3>
        <p>আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো ওয়ার্কশপের ডিটেইলস নিয়ে।</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="rf-name">পুরো নাম</label>
          <input
            id="rf-name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={set("name")}
          />
        </div>
        <div className="field">
          <label htmlFor="rf-email">ইমেইল অ্যাড্রেস</label>
          <input
            id="rf-email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={set("email")}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="rf-phone">ফোন নম্বর</label>
          <input
            id="rf-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={set("phone")}
          />
        </div>
        <div className="field">
          <label htmlFor="rf-company">কোম্পানি / প্রতিষ্ঠান</label>
          <input
            id="rf-company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={set("company")}
          />
        </div>
      </div>

      <div aria-live="polite">
        {status === "error" && <p className="form-status is-error">{error}</p>}
      </div>

      <button type="submit" className="btn" disabled={status === "loading"}>
        {status === "loading" ? "রেজিস্টার হচ্ছে..." : "ওয়ার্কশপে রেজিস্টার করুন"}
      </button>
    </form>
  );
}
