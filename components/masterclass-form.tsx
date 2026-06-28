"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type FormState = {
  name: string;
  whatsapp: string;
  role: string;
  exp: string;
  goal: string;
  content: string;
  company: string;
  commit: boolean;
};

const INITIAL: FormState = {
  name: "",
  whatsapp: "",
  role: "",
  exp: "",
  goal: "",
  content: "",
  company: "",
  commit: false,
};

const WA_GROUP_LINK = "https://chat.whatsapp.com/IZd3DEaJFTVDQd4LcxHXTo?s=cl&p=i&mlu=0";

/** Precomputed (server can't, and doesn't need to, build these at request
 *  time — the three session dates are fixed) Google Calendar links. */
const RECAP = [
  {
    id: "d1",
    label: "Session 01",
    when: "Tue, June 30",
    href: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+One+Man+AI+OS%2C+Session+01%3A+Inside+The+Studio&dates=20260630T150000Z%2F20260630T170000Z&details=Live+session+with+Khalid+Bin+Helaly.+The+link+will+be+shared+in+the+WhatsApp+group.&location=Online%2C+link+shared+in+the+WhatsApp+group",
  },
  {
    id: "d2",
    label: "Session 02",
    when: "Thu, July 2",
    href: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+One+Man+AI+OS%2C+Session+02%3A+The+Viral+Build&dates=20260702T150000Z%2F20260702T170000Z&details=Live+build+of+one+piece+of+content+made+to+go+viral%2C+start+to+finish.+Link+shared+in+the+WhatsApp+group.&location=Online%2C+link+shared+in+the+WhatsApp+group",
  },
  {
    id: "d3",
    label: "Session 03",
    when: "Sat, July 4",
    href: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+One+Man+AI+OS%2C+Session+03%3A+AI+For+Corporate+Professionals&dates=20260704T150000Z%2F20260704T170000Z&details=AI+for+corporate+professionals%3A+daily+work%2C+planning%2C+and+personal+branding.+Link+shared+in+the+WhatsApp+group.&location=Online%2C+link+shared+in+the+WhatsApp+group",
  },
];

export function MasterclassForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set =
    <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;
      setForm((f) => ({ ...f, [key]: value }) as FormState);
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const waOk = form.whatsapp.replace(/\D/g, "").length >= 11;
    const nextErrors: Record<string, boolean> = {
      name: !form.name.trim(),
      whatsapp: !waOk,
      role: !form.role,
      exp: !form.exp,
      goal: form.goal.trim().length < 15,
      content: form.content.trim().length < 15,
      commit: !form.commit,
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/aimasterclass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          whatsapp: form.whatsapp.trim(),
          role: form.role,
          experience_level: form.exp,
          goal_text: form.goal.trim(),
          content_answer: form.content.trim(),
          company: form.company.trim() || null,
          commit_confirmed: form.commit,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="done show" aria-live="polite">
        <div className="form">
          <div className="ok">&#10003;</div>
          <h3>You&apos;re in.</h3>
          <p>
            Tap below to join the WhatsApp group. Every update, link, and
            reminder lands there.
          </p>
          <a
            className="btn btn-solid"
            href={WA_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the WhatsApp Group &rarr;
          </a>

          <div className="recap">
            <div className="lbl">Save these three dates</div>
            {RECAP.map((s) => (
              <div className="recaprow" key={s.id}>
                <span className="d">
                  {s.label} &middot; <b>{s.when}</b> &middot; 9 to 11 PM
                </span>
                <a className="caladd" href={s.href} target="_blank" rel="noopener noreferrer">
                  + Calendar
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="form">
        {status === "error" && <p className="form-error">{error}</p>}

        <div className="grid2">
          <div className={`field${errors.name ? " bad" : ""}`}>
            <label htmlFor="mc-name">Your name</label>
            <input
              id="mc-name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Rakib Hasan"
              value={form.name}
              onChange={set("name")}
            />
            <span className="err">Please add your name.</span>
          </div>
          <div className={`field${errors.whatsapp ? " bad" : ""}`}>
            <label htmlFor="mc-whatsapp">WhatsApp number</label>
            <input
              id="mc-whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="01XXXXXXXXX"
              value={form.whatsapp}
              onChange={set("whatsapp")}
            />
            <span className="err">Add a valid WhatsApp number. The group link goes here.</span>
          </div>
        </div>

        <div className="grid2">
          <div className={`field${errors.role ? " bad" : ""}`}>
            <label htmlFor="mc-role">Which best describes you?</label>
            <select id="mc-role" value={form.role} onChange={set("role")}>
              <option value="">Choose one&hellip;</option>
              <option value="creator">Creator / Freelancer</option>
              <option value="owner">Business owner</option>
              <option value="corporate">Corporate professional</option>
              <option value="student">Student</option>
              <option value="other">Something else</option>
            </select>
            <span className="err">Please choose one.</span>
          </div>
          <div className={`field${errors.exp ? " bad" : ""}`}>
            <label htmlFor="mc-exp">How much AI experience do you have?</label>
            <select id="mc-exp" value={form.exp} onChange={set("exp")}>
              <option value="">Choose one&hellip;</option>
              <option value="none">Never used an AI tool</option>
              <option value="casual">Use ChatGPT or Claude casually</option>
              <option value="regular">Use AI tools regularly</option>
              <option value="builder">Build AI workflows and connect my own tools</option>
            </select>
            <span className="err">Please choose one.</span>
          </div>
        </div>

        <div className={`field${errors.goal ? " bad" : ""}`}>
          <label htmlFor="mc-goal">
            What do you want to walk away with from these three sessions?
          </label>
          <textarea
            id="mc-goal"
            placeholder="Be specific. Instead of I want to learn AI content, tell me what you actually want to make."
            value={form.goal}
            onChange={set("goal")}
          />
          <span className="err">Write more than a few words. A real answer helps.</span>
        </div>

        <div className={`field${errors.content ? " bad" : ""}`}>
          <label htmlFor="mc-content">
            Name one piece of content, yours or someone else&apos;s, that actually
            worked. Why?
          </label>
          <textarea
            id="mc-content"
            placeholder="A real example. The more specific, the better."
            value={form.content}
            onChange={set("content")}
          />
          <span className="err">Give a real example.</span>
        </div>

        <div className="field">
          <label htmlFor="mc-company">
            Company or organization <span style={{ opacity: 0.6 }}>(optional)</span>
          </label>
          <input
            id="mc-company"
            type="text"
            placeholder="e.g. ABC Limited"
            value={form.company}
            onChange={set("company")}
          />
        </div>

        <div className={`checkrow${errors.commit ? " bad" : ""}`}>
          <input
            type="checkbox"
            id="mc-commit"
            checked={form.commit}
            onChange={set("commit")}
          />
          <label htmlFor="mc-commit">
            I can attend live on <b>Tuesday June 30, Thursday July 2, and Saturday
            July 4</b>, from 9 to 11 PM.
          </label>
        </div>

        <button type="submit" className="btn btn-solid" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Submit Application →"}
        </button>
        <p className="formnote">
          No card needed. No catch. <b>Free means free.</b>
          <br />
          Submit and you&apos;ll get the WhatsApp group link right away.
        </p>
      </div>
    </form>
  );
}
