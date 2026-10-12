import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/topzid/legal";
import { brand, proof, socials, teaching } from "@/lib/topzid";

export const metadata: Metadata = {
  title: { absolute: "Khalid Bin Helaly | AI Consultant and AI Trainer in Bangladesh | TOPZID" },
  description:
    "Khalid Bin Helaly is an AI consultant, AI trainer and creative director in Dhaka, Bangladesh, and founder of TOPZID, the AI production studio behind 500+ commercials. 1,000+ people trained live.",
  alternates: { canonical: "https://www.topzid.com/about" },
};

/* eslint-disable @next/next/no-img-element -- static brand asset */

const BUILT_ON_CLAUDE = [
  {
    k: "01",
    title: "The studio's operating system",
    text: "Claude runs our production pipeline: briefs, research, scripts, storyboards and shot prompts start in Claude, then move to the image, video and voice tools that render them. One person can run a full commercial production this way.",
  },
  {
    k: "02",
    title: "Agent systems for teams",
    text: "We build agent workflows on the Claude API and n8n for marketing, HR and finance teams: copywriting, document processing and brand intelligence agents that sit inside a company's daily work.",
  },
  {
    k: "03",
    title: "HookMe",
    text: "Our hook and copy generation product, built on the Claude API. It writes hooks, captions and calls to action matched to how aware an audience already is of the problem and the product.",
  },
];

/* Structured identity for search engines and AI answers: one person, every name variant, every profile. */
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.topzid.com/about#khalid",
  name: "Khalid Bin Helaly",
  alternateName: ["Khalid Ibn Helaly", "খালিদ বিন হিলালী", "The Khalid Way", "thekhalidway"],
  jobTitle: "AI Consultant, AI Trainer and Creative Director",
  description:
    "AI consultant and AI trainer based in Dhaka, Bangladesh. Founder of TOPZID, an AI production studio behind 500+ commercials. Former Assistant Director of Marketing at Chaldal PLC (Y Combinator S15).",
  url: "https://www.topzid.com/about",
  image: "https://www.topzid.com/consult/khalid-1080.jpg",
  email: "mailto:khalid@topzid.com",
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  nationality: { "@type": "Country", name: "Bangladesh" },
  worksFor: { "@type": "Organization", "@id": "https://www.topzid.com/#org", name: "TOPZID", url: "https://www.topzid.com" },
  knowsAbout: [
    "Artificial intelligence consulting",
    "AI training",
    "Generative AI",
    "AI video production",
    "AI commercials",
    "Prompt engineering",
    "AI agents",
    "Marketing strategy",
    "Brand building",
  ],
  knowsLanguage: ["en", "bn"],
  sameAs: socials.map((s) => s.href),
};

export default function About() {
  const linkedin = socials.find((s) => s.key === "LinkedIn")!;
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }} />
    <PageShell
      eyebrow="About"
      title={
        <>
          An AI production studio, <span className="it">run like a software company.</span>
        </>
      }
      lede="TOPZID makes commercials and brand films with generative AI, and teaches teams to do the same. We are based in Dhaka and work with brands in Bangladesh and abroad."
    >
      <section className="proof" aria-label="Track record">
        <div className="wrap">
          {proof.map((p) => (
            <div className="cell" key={p.label}>
              <b>{p.value}</b>
              <span>{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pad">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Why we exist</span>
            <h2>Production used to need a crew. <span className="it">Now it needs a system.</span></h2>
            <p>
              A traditional commercial takes weeks, a crew, locations and a large budget. We rebuilt that process
              around generative AI, so brands get campaign-grade films in days and can afford to test far more ideas.
              The same system is what we teach in our masterclass and corporate training.
            </p>
          </div>
        </div>
      </section>

      <section className="pad" style={{ background: "var(--paper-2)" }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Built on Claude</span>
            <h2>What we build with Claude.</h2>
            <p>Claude is the core of how TOPZID works, from the first line of a brief to the products we ship.</p>
          </div>
          <div className="process three">
            {BUILT_ON_CLAUDE.map((b) => (
              <div className="step" key={b.k}>
                <span className="s">{b.k}</span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wrap founder">
          <img className="photo" src="/khalid.jpg" alt="Khalid Bin Helaly, founder of TOPZID" width={1023} height={1537} loading="lazy" />
          <div>
            <span className="eyebrow">Founder · AI consultant and trainer · Dhaka</span>
            <h2>Khalid Bin Helaly</h2>
            <p style={{ marginTop: 18 }}>
              Thirteen years in marketing, seven of them at <b>Chaldal PLC (Y Combinator S15)</b>, where he rose to
              Assistant Director of Marketing. He founded TOPZID to rebuild commercial production around generative AI,
              and works as a <b>Generative AI Consultant</b> to one of Bangladesh&apos;s largest marketing groups.
            </p>
            <p>
              He has produced more than 500 AI commercials, taught more than 1,000 people in live sessions, and ran
              Season 1 of the One Man AI OS Masterclass with 41 paid students.
            </p>
            <div className="rooms">
              {teaching.map((t) => (
                <div className="room" key={t.name}>
                  <b>{t.name}</b>
                  <span>{t.detail}</span>
                </div>
              ))}
            </div>
            <a className="link" href={linkedin.href} target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      <section className="pad" style={{ background: "var(--paper-2)" }}>
        <div className="wrap" style={{ maxWidth: 780 }}>
          <span className="eyebrow">Company details</span>
          <h2 style={{ marginBottom: 22 }}>Get in touch.</h2>
          <dl className="dl">
            <dt>Company</dt>
            <dd>TOPZID</dd>
            <dt>Operated by</dt>
            <dd>Khalid Bin Helaly</dd>
            <dt>Location</dt>
            <dd>{brand.location}</dd>
            <dt>Email</dt>
            <dd><a href={`mailto:${brand.email}`}>{brand.email}</a></dd>
            <dt>WhatsApp</dt>
            <dd><a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer">{brand.whatsappDisplay}</a></dd>
            <dt>Social</dt>
            <dd>@thekhalidway on Instagram, YouTube, TikTok, Facebook and LinkedIn</dd>
          </dl>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
            <Link className="btn btn-solid" href="/#contact">Start a project →</Link>
            <Link className="btn btn-ghost" href="/#learn">Learn with TOPZID</Link>
          </div>
        </div>
      </section>
    </PageShell>
    </>
  );
}
