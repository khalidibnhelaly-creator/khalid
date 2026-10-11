import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/topzid/header";
import { Footer } from "@/components/topzid/sections";
import { ConsultForm } from "@/components/topzid/consult-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { clients } from "@/lib/topzid";

export const metadata: Metadata = {
  title: { absolute: "Consulting with Khalid Bin Helaly | ৳50,000 strategy session | TOPZID" },
  description:
    "A private strategy session on your business, production, content, growth, marketing or brand. One flat fee of ৳50,000. Four clients a month, by application.",
  alternates: { canonical: "https://www.topzid.com/consult" },
  openGraph: {
    title: "Consulting with Khalid Bin Helaly",
    description: "One session. One written plan. ৳50,000 flat. Four clients a month, by application.",
    url: "https://www.topzid.com/consult",
    siteName: "TOPZID",
    type: "website",
  },
};

/* eslint-disable @next/next/no-img-element -- static brand assets */

const FEE = "৳50,000";
const CAPACITY = 4;

const INCLUDED = [
  { k: "01", title: "Pre-session brief", text: "A short questionnaire and any material you send: numbers, decks, ads, content. I review it before we meet, so the session starts at the real problem." },
  { k: "02", title: "One deep session", text: "Two to three hours, live and online, with me. No juniors, no account managers. We work through the problem until there is a decision." },
  { k: "03", title: "Written plan in 72 hours", text: "A clear plan of what to do, in what order, who should do it and what to measure. Specific to your business, not a template." },
  { k: "04", title: "14 days of follow-up", text: "Direct WhatsApp access for two weeks after the session, for questions while you put the plan to work." },
];

const AREAS = [
  { t: "Business", d: "Offers, pricing, positioning and the model behind them." },
  { t: "Production", d: "Building an AI production system for ads, films and content." },
  { t: "Content", d: "What to make, for whom, how often, and how to know it is working." },
  { t: "Growth", d: "Channels, funnels and the next lever worth pulling." },
  { t: "Marketing", d: "Messaging matched to how aware your audience already is." },
  { t: "Brand", d: "Building a brand people remember, for a company or for yourself." },
];

const STEPS = [
  { s: "01", t: "Apply", d: "Tell me about the business and the problem. It takes about five minutes." },
  { s: "02", t: "Review", d: "I read every application myself and reply within 48 hours." },
  { s: "03", t: "Pay and book", d: "If it is a fit, you get the payment details and available times." },
  { s: "04", t: "Session and plan", d: "We meet, and your written plan arrives within 72 hours." },
];

const FAQ = [
  {
    q: "Why do I have to apply?",
    a: "Because I only take four clients a month and I want each session to be worth the fee. If I cannot help with your problem, I will tell you, and you pay nothing.",
  },
  {
    q: "What happens after I pay?",
    a: "You get the pre-session brief, we fix a time, and we meet online. Your written plan arrives within 72 hours of the session, and the 14 days of follow-up start that day.",
  },
  {
    q: "Do you also do the work?",
    a: "Not as part of this. The session gives you the plan. If you want TOPZID to produce the films, content or systems, that is quoted separately, and nothing is pushed on you in the session.",
  },
  {
    q: "How do I pay?",
    a: "By bank transfer, bKash or Nagad, the same way as our other programs. Payment details are sent only after your application is accepted.",
  },
  {
    q: "What if I need to cancel?",
    a: "You can reschedule once, or cancel for a full refund, up to 48 hours before the session. After that, the fee is not refundable. The full rules are in the refund policy.",
  },
];

export default function Consult() {
  return (
    <>
      <noscript>
        <style>{`.tz .reveal { opacity: 1; translate: none; }`}</style>
      </noscript>
      <Header />
      <main className="consult">
        {/* ---------- hero ---------- */}
        <section className="c-hero">
          <div className="wrap c-hero-grid">
            <div>
              <span className="eyebrow">Consulting · By application</span>
              <h1>
                Bring me the problem. <span className="it">Leave with the plan.</span>
              </h1>
              <p className="lede">
                A private strategy session with Khalid Bin Helaly on your business, production, content, growth,
                marketing or brand. One flat fee. One clear plan. No retainers, no packages.
              </p>
              <div className="c-meta">
                <div><span>Fee</span><b>{FEE}</b></div>
                <div><span>Format</span><b>2 to 3 hours, online</b></div>
                <div><span>Availability</span><b>{CAPACITY} clients a month</b></div>
              </div>
              <div className="ctas">
                <a className="btn btn-solid" href="#apply">Apply for a session →</a>
                <a className="btn btn-ghost" href="#included">What you get</a>
              </div>
            </div>

            <figure className="c-portrait">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/consult/khalid-640.webp 640w, /consult/khalid-1000.webp 1000w, /consult/khalid-1400.webp 1400w"
                  sizes="(max-width: 960px) min(88vw, 460px), 420px"
                />
                <img
                  src="/consult/khalid-1000.jpg"
                  srcSet="/consult/khalid-640.jpg 640w, /consult/khalid-1000.jpg 1000w, /consult/khalid-1400.jpg 1400w"
                  sizes="(max-width: 960px) min(88vw, 460px), 420px"
                  alt="Khalid Bin Helaly, founder of TOPZID"
                  width={1000}
                  height={1250}
                  fetchPriority="high"
                />
              </picture>
              <figcaption>
                <b>Khalid Bin Helaly</b>
                <span>Founder, TOPZID · You work with me directly</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- fit ---------- */}
        <section className="pad">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Straight talk</span>
              <h2>This is for some people. <span className="it">Not everyone.</span></h2>
            </div>
            <div className="fit reveal">
              <div className="fit-col yes">
                <h3>A good fit if you</h3>
                <ul>
                  <li>Run a business or brand and have a specific problem worth solving</li>
                  <li>Want a decision and a plan, not more inspiration</li>
                  <li>Will act on the plan within the next 90 days</li>
                  <li>Want honest answers, including the ones you will not like</li>
                </ul>
              </div>
              <div className="fit-col no">
                <h3>Not a fit if you</h3>
                <ul>
                  <li>Want someone else to do the work for you</li>
                  <li>Are looking for a general chat about AI</li>
                  <li>Need a guaranteed result. Nobody honest can promise one</li>
                  <li>Are not ready to invest {FEE} in solving the problem</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- included ---------- */}
        <section className="pad" id="included" style={{ background: "var(--paper-2)" }}>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">What {FEE} gets you</span>
              <h2>Everything included. <span className="it">Nothing extra to buy.</span></h2>
            </div>
            <div className="process reveal">
              {INCLUDED.map((i) => (
                <div className="step" key={i.k}>
                  <span className="s">{i.k}</span>
                  <h3>{i.title}</h3>
                  <p>{i.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- areas ---------- */}
        <section className="pad">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">What we can work on</span>
              <h2>One session. Any of these.</h2>
              <p>Most problems sit across more than one. That is fine. We work on whatever is actually in the way.</p>
            </div>
            <div className="areas reveal">
              {AREAS.map((a) => (
                <div className="area" key={a.t}>
                  <h3>{a.t}</h3>
                  <p>{a.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- proof ---------- */}
        <section className="pad dark">
          <div className="wrap c-proof">
            <div>
              <span className="eyebrow">Who you are talking to</span>
              <h2>Thirteen years of doing this, not talking about it.</h2>
              <p>
                Seven years at Chaldal PLC (Y Combinator S15), rising to Assistant Director of Marketing. Founder of
                TOPZID, the AI production studio behind 500+ commercials. Generative AI Consultant to one of
                Bangladesh&apos;s largest marketing groups. More than 1,000 people taught live.
              </p>
              <Link className="link" href="/about">More about Khalid ↗</Link>
            </div>
            <ul className="c-logos" aria-label="Brands Khalid has worked with">
              {clients.slice(0, 8).map((c) => (
                <li key={c.name}><img src={c.src} alt={c.name} loading="lazy" /></li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- process ---------- */}
        <section className="pad">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">How it works</span>
              <h2>Four steps. No sales calls.</h2>
            </div>
            <div className="process reveal">
              {STEPS.map((s) => (
                <div className="step" key={s.s}>
                  <span className="s">{s.s}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- apply ---------- */}
        <section className="pad" id="apply" style={{ background: "var(--paper-2)" }}>
          <div className="wrap contact-grid">
            <div>
              <span className="eyebrow">Apply</span>
              <h2>{FEE}. <span className="it">One price.</span></h2>
              <p className="contact-note" style={{ fontSize: 17, color: "var(--ink-soft)" }}>
                {CAPACITY} sessions a month. You pay only if your application is accepted.
              </p>
              <ul className="c-price">
                <li>Pre-session brief and review</li>
                <li>2 to 3 hour live session with Khalid</li>
                <li>Written plan within 72 hours</li>
                <li>14 days of WhatsApp follow-up</li>
              </ul>
            </div>
            <div className="reveal">
              <ConsultForm />
            </div>
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className="pad">
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="sec-head">
              <span className="eyebrow">Questions</span>
              <h2>Before you apply.</h2>
            </div>
            <div className="c-faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
            <p className="said-note" style={{ marginTop: 22 }}>
              See the <Link href="/refund-policy">refund policy</Link> and <Link href="/terms">terms</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
