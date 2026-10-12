import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StudioFilm, Timecode } from "@/components/studio/client";
import { StudioForm } from "@/components/studio/studio-form";
import { cleanCountry } from "@/lib/pricing";
import { brand, socials } from "@/lib/topzid";

const PAGE_URL = `${brand.url}/studio`;

export const metadata: Metadata = {
  title: { absolute: "TOPZID Studio | Private AI Film Studios for Founder-Led Brands" },
  description:
    "TOPZID builds a private AI film studio inside your company, so your brand produces cinema-grade advertising every week without a production house. Led by Khalid Bin Helaly. By application.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Most brands rent their creativity. A few own it.",
    description: "Private AI film studios for founder-led brands. By application, limited engagements each quarter.",
    url: PAGE_URL,
    siteName: "TOPZID",
    type: "website",
    images: [{ url: "/studio/og.jpg", width: 1200, height: 630, alt: "TOPZID Studio: private AI film studios for founder-led brands" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOPZID Studio",
    description: "Private AI film studios for founder-led brands. By application.",
    images: ["/studio/og.jpg"],
  },
};

const CREDITS = ["Berger", "Marico", "Chaldal", "UPS", "Nutrition Depot", "Vision", "Khaas Food", "Finesse", "BIW"];

const SHORTS = [
  { id: "hI9jnC2IwOs", title: "BIR18: The Story of Bir Sreshtho Hamidur Rahman", tag: "Short film · 1971" },
  { id: "Q8BOHYW79RM", title: "The Khalid Way, Episode 02", tag: "Series" },
  { id: "wCkB-Y2SU7k", title: "Bail Card", tag: "Concept commercial" },
];

const CONVICTIONS = [
  {
    t: "Strategy before pixels",
    d: "Every piece starts with where your buyer stands, from unaware of the problem to ready to buy. A film without a job is decoration.",
  },
  {
    t: "Story before motion",
    d: "You approve the story on a photoreal storyboard before a second of video exists. Nothing reaches your feed by accident.",
  },
  {
    t: "System over shoots",
    d: "We don't hand you a folder of videos. We leave behind the people, the method and the taste to keep making them.",
  },
];

const TIERS = [
  {
    key: "engine",
    rn: "I",
    name: "The Engine",
    term: "Six weeks",
    img: "lens",
    alt: "A cinema lens on black slate under a single warm light",
    desc: "Our production system, installed inside your marketing team and tuned to your brand. Your people leave trained, equipped and shipping.",
    items: [
      "Brand world: your visual rules, product references and voice, codified",
      "Private workflow and prompt library",
      "Hands-on training for your team",
      "A launch campaign of 20 films, made together",
      "90 days of review and system updates",
    ],
    price: "$20,000",
  },
  {
    key: "studio",
    rn: "II",
    name: "The Studio",
    term: "Four months",
    img: "slate",
    alt: "A worn film clapperboard on a walnut desk beside a laptop",
    desc: "A complete in-house AI film studio, staffed and running. For brands that want creative to become a permanent advantage, not a line item.",
    inherits: "Everything in The Engine",
    items: [
      "A dedicated AI creative operator, recruited and trained for you",
      "A flagship brand film, directed by our founder",
      "Creative testing tied to your ad performance data",
      "Monthly strategy sessions and six months of updates",
    ],
    price: "$50,000",
  },
  {
    key: "house",
    rn: "III",
    name: "The House",
    term: "Twelve months · Three per year",
    img: "key",
    alt: "A brass key resting on a closed film canister",
    desc: "Our founder as your creative director in residence for a year. Your brand, and your own name, built into something people remember.",
    inherits: "Everything in The Studio",
    items: [
      "A slate of three cinematic brand films across the year",
      "A content system for the founder's personal brand",
      "Direct line to our founder, with priority turnaround",
      "Category exclusivity: we work with no direct competitor",
    ],
    price: "$100,000",
  },
];

const STEPS = ["You apply below", "A private 45-minute consultation", "A written proposal within five days", "We begin"];

const LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private AI film studio engagements",
  serviceType: "AI commercial and brand film production system",
  url: PAGE_URL,
  provider: { "@type": "Organization", "@id": `${brand.url}/#org`, name: "TOPZID", url: brand.url },
  areaServed: "Worldwide",
  offers: TIERS.map((t) => ({
    "@type": "Offer",
    name: t.name,
    price: t.price.replace(/[$,]/g, ""),
    priceCurrency: "USD",
    description: t.desc,
  })),
};

function Slate({ reel, title }: { reel: string; title: string }) {
  return (
    <div className="st-slate cred">
      <span className="st-reel">Reel {reel}</span>
      <span>{title}</span>
      <span className="rule" />
      <span className="tc">TOPZID / {reel}</span>
    </div>
  );
}

export default async function Studio() {
  const country = cleanCountry((await headers()).get("x-vercel-ip-country"));
  const linkedin = socials.find((s) => s.key === "LinkedIn")!;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
      <noscript>
        <style>{`.st .reveal { opacity: 1; translate: none; }`}</style>
      </noscript>

      <header className="st-hdr">
        <div className="wrap">
          <Link href="/" className="st-mark" aria-label="TOPZID home">
            TOPZID <small>Studio</small>
          </Link>
          <nav className="st-nav" aria-label="Studio">
            <a href="#work">Work</a>
            <a href="#approach">Approach</a>
            <a href="#engagements">Engagements</a>
            <a className="st-nav-cta" href="#apply">Apply</a>
          </nav>
        </div>
      </header>

      <main>
        {/* ---------- opening ---------- */}
        <section className="st-hero">
          <div className="st-hero-bg" aria-hidden="true">
            <picture>
              <source media="(max-width: 700px)" srcSet="/studio/boardroom-768.webp" type="image/webp" />
              <source srcSet="/studio/boardroom.webp" type="image/webp" />
              <img src="/studio/boardroom.jpg" alt="" width={1280} height={720} fetchPriority="high" />
            </picture>
          </div>
          <div className="st-vf" aria-hidden="true">
            <i /><i /><i /><i />
            <span className="fmt">Reel 00 · Opening</span>
            <span className="tally"><b />REC <Timecode /></span>
            <span className="ratio">2.39 : 1 · Dhaka / Worldwide</span>
          </div>

          <div className="wrap">
            <div className="st-hero-copy">
              <p className="kicker cred">Private AI film studios for founder-led brands</p>
              <h1 className="disp">
                Most brands rent their creativity.
                <span className="it">A few own it.</span>
              </h1>
              <p className="lede">
                TOPZID builds a private AI film studio inside your company. Your brand produces cinema-grade
                advertising every week, on your terms, without a production house and without the wait.
              </p>
              <div className="ctas">
                <a className="btn btn-solid" href="#apply">
                  Request a private consultation <span className="arr">→</span>
                </a>
                <span className="cred">By application. Limited engagements each quarter.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- numbers and credits ---------- */}
        <section className="st-band" aria-label="Track record">
          <div className="wrap">
            <div className="st-stat"><b>500+</b><span className="cred">AI commercials produced</span></div>
            <div className="st-stat"><b>13</b><span className="cred">Years building brands</span></div>
            <div className="st-stat"><b>1</b><span className="cred">Founder on every engagement</span></div>
            <div className="st-credits">
              <span className="cred">Films and campaigns for</span>
              <p>
                {CREDITS.map((c, i) => (
                  <span key={c} style={{ color: "inherit", padding: 0 }}>
                    {c}
                    {i < CREDITS.length - 1 && <span>·</span>}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>

        {/* ---------- reel 01: the shift ---------- */}
        <section className="st-sec">
          <div className="wrap">
            <Slate reel="01" title="The shift" />
            <h2 className="disp reveal">
              Advertising used to be a shoot.
              <span className="it">Now it is a system.</span>
            </h2>
            <div className="st-shift-grid">
              <figure className="reveal" style={{ margin: 0 }}>
                <div className="st-scope">
                  <picture>
                    <source media="(max-width: 700px)" srcSet="/studio/wrap-768.webp" type="image/webp" />
                    <source srcSet="/studio/wrap.webp" type="image/webp" />
                    <img src="/studio/wrap.jpg" alt="An empty film set after wrap, lit by a single bulb" width={1280} height={720} loading="lazy" />
                  </picture>
                </div>
                <figcaption className="st-figcap cred">
                  <span>The old way, after wrap</span>
                  <span>Still 01</span>
                </figcaption>
              </figure>
              <div className="body reveal">
                <p>
                  The platforms your customers live on reward one thing above all: fresh creative, constantly. The
                  brands winning today are not the ones with the biggest single campaign. They are the ones that can
                  tell their story fifty different ways and learn which one sells.
                </p>
                <p>
                  Most founders are still buying advertising the old way. A brief, a quote, a shoot, a wait. A handful
                  of finished pieces, and a bill that resets every time.
                </p>
                <p>
                  We replace that cycle with something you own: a studio, inside your company, that turns ideas into
                  film in days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- reel 02: selected work ---------- */}
        <section className="st-sec alt" id="work">
          <div className="wrap">
            <Slate reel="02" title="Selected work" />
            <div className="st-work-head">
              <h2 className="disp reveal">
                Made with AI.
                <span className="it">Directed like cinema.</span>
              </h2>
              <p className="reveal">
                Every frame on this page came out of the same system we install for clients. Press play on any of
                them.
              </p>
            </div>

            <div className="reveal">
              <StudioFilm id="elyPXhzQ9Pg" title="Darahkebab" label="Feature presentation · Commercial" featured />
              <div className="st-film-credits">
                <p>
                  Planned, generated and edited entirely by AI. From the first idea to the final cut, no camera, no
                  crew and no human hand in the timeline. It shows what the system can do on its own.
                </p>
                <dl><dt className="cred">Format</dt><dd>Commercial</dd></dl>
                <dl><dt className="cred">Camera</dt><dd>None</dd></dl>
                <dl><dt className="cred">Crew</dt><dd>None</dd></dl>
                <dl><dt className="cred">System</dt><dd>TOPZID</dd></dl>
              </div>
            </div>

            <div className="st-shorts">
              {SHORTS.map((s) => (
                <article className="st-short reveal" key={s.id}>
                  <StudioFilm id={s.id} title={s.title} label={s.tag} />
                  <h3>{s.title}</h3>
                  <span className="cred">{s.tag}</span>
                </article>
              ))}
            </div>

            <div className="st-more">
              <span className="cred">More films on YouTube</span>
              <a href={socials.find((s) => s.key === "YouTube")!.href} target="_blank" rel="noopener noreferrer">
                @thekhalidway ↗
              </a>
            </div>
          </div>
        </section>

        {/* ---------- reel 03: approach ---------- */}
        <section className="st-sec" id="approach">
          <div className="wrap">
            <Slate reel="03" title="Approach" />
            <h2 className="disp reveal">
              Three convictions
              <span className="it">behind every film.</span>
            </h2>
            <div className="st-convictions">
              {CONVICTIONS.map((c, i) => (
                <div className="st-conv reveal" key={c.t}>
                  <span className="n">0{i + 1}</span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- reel 04: engagements ---------- */}
        <section className="st-sec alt" id="engagements">
          <div className="wrap">
            <Slate reel="04" title="Engagements" />
            <div className="st-eng-head">
              <h2 className="disp reveal">
                Three ways
                <span className="it">to work with us.</span>
              </h2>
              <p className="reveal">
                Each engagement is led personally by our founder. We accept a small number each quarter so that
                remains true.
              </p>
            </div>

            <div className="st-tiers">
              {TIERS.map((t) => (
                <article className={`st-tier reveal${t.key === "house" ? " house" : ""}`} key={t.key}>
                  <div className="st-tier-img">
                    <picture>
                      <source srcSet={`/studio/${t.img}.webp`} type="image/webp" />
                      <img src={`/studio/${t.img}.jpg`} alt={t.alt} width={1024} height={768} loading="lazy" />
                    </picture>
                  </div>
                  <div className="st-tier-body">
                    <div className="st-tier-top">
                      <span className="rn">{t.rn}</span>
                      <span className="cred">{t.term}</span>
                    </div>
                    <h3 className="disp">{t.name}</h3>
                    <p className="desc">{t.desc}</p>
                    <ul>
                      {t.inherits && <li className="inh">{t.inherits}</li>}
                      {t.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                    <div className="st-tier-foot">
                      <div className="st-price">
                        <b>{t.price}</b>
                        <span className="cred">USD</span>
                      </div>
                      <a className={`btn ${t.key === "house" ? "btn-solid" : "btn-line"}`} href="#apply" data-engagement={t.key}>
                        Apply for {t.name} <span className="arr">→</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="st-terms reveal">
              <span className="cred" style={{ paddingTop: 4 }}>Terms</span>
              <p>
                Engagements are invoiced in USD. Half to begin, the balance on agreed milestones. Every engagement
                starts under NDA, and everything we create for you is yours.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- reel 05: founder ---------- */}
        <section className="st-sec">
          <div className="wrap">
            <Slate reel="05" title="A note from the founder" />
            <div className="st-founder">
              <figure className="st-portrait reveal">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/consult/khalid-640.webp 640w, /consult/khalid-1080.webp 1080w"
                    sizes="(max-width: 860px) min(90vw, 440px), 40vw"
                  />
                  <img
                    src="/consult/khalid-1080.jpg"
                    srcSet="/consult/khalid-640.jpg 640w, /consult/khalid-1080.jpg 1080w"
                    sizes="(max-width: 860px) min(90vw, 440px), 40vw"
                    alt="Khalid Bin Helaly, founder of TOPZID"
                    width={1080}
                    height={1350}
                    loading="lazy"
                  />
                </picture>
                <figcaption className="cred">Khalid Bin Helaly · Dhaka</figcaption>
              </figure>

              <div className="st-letter reveal">
                <p className="q">
                  I spent thirteen years watching good brands lose to louder ones, not because their product was
                  worse, but because they couldn&apos;t tell their story often enough.
                </p>
                <p>
                  AI changed that. Not the tools on their own, which anyone can download, but what happens when a
                  director&apos;s taste meets a system that never sleeps. Over 500 commercials later, I know what that
                  system looks like.
                </p>
                <p>
                  I take on a few founders at a time and build it inside their company. When we&apos;re done, the
                  studio stays with you. So does the advantage.
                </p>
                <div className="st-sign">
                  <span className="cred">Directed by</span>
                  <span className="disp name">Khalid Bin Helaly</span>
                  <span className="cred">
                    Founder, TOPZID ·{" "}
                    <a href={linkedin.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brass-2)", textDecoration: "none" }}>
                      LinkedIn ↗
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- reel 06: fit ---------- */}
        <section className="st-sec alt">
          <div className="wrap">
            <Slate reel="06" title="Fit" />
            <h2 className="disp reveal">
              We work with a particular
              <span className="it">kind of founder.</span>
            </h2>
            <div className="st-fit">
              <div className="st-fit-col yes reveal">
                <h3 className="cred">Usually</h3>
                <ul>
                  <li>Your brand does $1M or more a year</li>
                  <li>You invest in paid social every month and want more from it</li>
                  <li>You sell something worth filming beautifully</li>
                  <li>You&apos;d rather own a capability than rent one</li>
                </ul>
              </div>
              <div className="st-fit-col no reveal">
                <h3 className="cred">Rarely</h3>
                <ul>
                  <li>You&apos;re looking for the cheapest way to make videos</li>
                  <li>Decisions go through a committee we&apos;ll never meet</li>
                  <li>You want a one-click app, not a studio</li>
                </ul>
              </div>
            </div>

            <div className="st-steps">
              {STEPS.map((s, i) => (
                <div className="st-step reveal" key={s}>
                  <span className="cred">Step 0{i + 1}</span>
                  <b>{s}</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- reel 07: apply ---------- */}
        <section className="st-sec" id="apply" style={{ scrollMarginTop: 24 }}>
          <div className="wrap">
            <Slate reel="07" title="Apply" />
            <div className="st-apply">
              <div className="st-apply-side">
                <h2 className="disp">
                  Request a private
                  <span className="it">consultation.</span>
                </h2>
                <p className="lede">
                  Tell us about your brand. If there&apos;s a fit, you&apos;ll speak with our founder directly. If
                  there isn&apos;t, we&apos;ll say so, and point you somewhere better.
                </p>
                <div className="st-direct">
                  <span className="cred">Or write directly</span>
                  <a href={`mailto:${brand.email}?subject=${encodeURIComponent("TOPZID Studio enquiry")}`}>{brand.email}</a>
                </div>
              </div>
              <div className="reveal">
                <StudioForm country={country} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="st-foot">
        <div className="wrap">
          <div className="st-foot-top">
            <div>
              <span className="cred">TOPZID Studio</span>
              <p style={{ marginTop: 12, fontSize: 20, color: "var(--paper)" }}>Dhaka. Working worldwide.</p>
            </div>
            <a className="cred" href={`mailto:${brand.email}`} style={{ color: "var(--paper)" }}>{brand.email}</a>
          </div>
          <p className="st-foot-word disp" aria-hidden="true">TOPZID</p>
          <div className="st-foot-base cred">
            <span>© 2026 TOPZID</span>
            <nav aria-label="Footer">
              <Link href="/">topzid.com</Link>
              <Link href="/consult">Consulting</Link>
              <Link href="/about">About</Link>
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </nav>
          </div>
        </div>
      </footer>
      <ScrollReveal />
    </>
  );
}
