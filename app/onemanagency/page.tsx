import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Countdown, LocalTime } from "@/components/oma/client";
import { RegisterForm } from "@/components/oma/register-form";
import { OMA, omaTimes, vosuLink } from "@/lib/oma";
import { cleanCountry } from "@/lib/pricing";
import { brand, socials } from "@/lib/topzid";

export const metadata: Metadata = {
  title: { absolute: "One Man Agency | Free Live Class with Khalid Bin Helaly, with VOSU | 27 Nov, 8 PM" },
  description:
    "How one person with AI does the work of a whole agency: how clients find me, what I charge, and how the work gets made, live on screen. Free live class, Friday 27 November, 8 PM Dhaka. With VOSU.",
  alternates: { canonical: OMA.url },
  openGraph: {
    title: "ONE MAN AGENCY · Free live class · 27 Nov · 8 PM",
    description: "How one person with AI does the work of a whole agency, live on screen. Free. With VOSU.",
    url: OMA.url,
    siteName: "TOPZID",
    type: "website",
    images: [{ url: "/onemanagency/og.jpg", width: 1200, height: 630, alt: "One Man Agency, free live class, 27 Nov, 8 PM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONE MAN AGENCY · Free live class · 27 Nov · 8 PM",
    description: "How one person with AI does the work of a whole agency, live on screen. Free.",
    images: ["/onemanagency/og.jpg"],
  },
};

const MOMENTS = [
  {
    t: "A real client message and invoice",
    d: "In the first five minutes: a client who found me, not the other way round. Names and amounts blurred. Everything else real.",
    when: "0:00 · Cold open",
  },
  {
    t: "A real AI commercial, made in front of you",
    d: "You vote for a real local business. We brainstorm, storyboard, lock and render the ad live, with the studio pipeline I use for clients.",
    when: "0:45 · Live production",
  },
  {
    t: "An AI agent drafts a Meta ads campaign",
    d: "From a one-paragraph brief, the agent builds the campaign, ad set and targeting. The campaign stays paused and a human approves every taka.",
    when: "1:40 · AI marketing stack",
  },
];

const LOOP = [
  ["Portfolio that sells", "Public work does the prospecting. The three pieces that brought the most inquiries, and why."],
  ["Inbound", "They reach you. Real messages, next to the post that triggered each one."],
  ["Free sample", "One short piece on their own product. Fast, capped, never a full campaign for free."],
  ["Premium price", "Priced above the market once the sample has proved itself. My quote template, on screen."],
  ["Retainer", "The client stays. The monthly structure and what gets delivered each month."],
  ["The full system", "Once they trust you, they buy the whole production system, not single videos."],
] as const;

const PIPE = [
  ["5 min", "Pick the business", "Three real local businesses, you vote", "Live poll"],
  ["10 min", "Brainstorm", "Three story ideas, each with a hook in the first 2 seconds", "Claude"],
  ["5 min", "Pitch", "The one-page pitch the client would actually receive", "Claude"],
  ["10 min", "Storyboard", "Board frames and the beats, walked through", "GPT Image 2.5"],
  ["5 min", "Lock", "Character, location and props approved before anything renders", "VOSU"],
  ["15 min", "Produce", "Render the shots and cut a rough edit", "Seedance 2.5 on VOSU"],
] as const;

const AGENDA = [
  ["0:00", "Cold open", "A real inbound message and invoice, blurred", true],
  ["0:05", "Honest maths", "Who this is for, and what month one really looks like", false],
  ["0:15", "The client system", "The inbound loop, stage by stage, with real examples", false],
  ["0:45", "Live production", "You vote, we make a real AI ad from brainstorm to render", true],
  ["1:35", "Break", "The challenge prompt goes into the chat", false],
  ["1:40", "The AI marketing stack", "Search after AI, a Meta ads agent, ChatGPT ads", true],
  ["2:05", "Failures", "Pitches that got ignored, a client I lost, what I would change", false],
  ["2:15", "The 30-day challenge", "Rules, deadlines and the public results board", false],
  ["2:25", "Short offer and close", "Five minutes at most. You do not need it", false],
] as const;

const FAQ = [
  ["Is it really free?", "Yes. Registration is free and so is the class. There is a short offer in the last five minutes, and you get everything in the class without it."],
  ["Why do I need a VOSU account?", "The live production runs on VOSU, and so does the 30-day challenge. A free account means you can follow along on the night and take part afterwards. It takes about two minutes to create."],
  ["Where do I watch?", "Live on YouTube and Facebook. The joining links come to your WhatsApp the day before, 2 hours before and 10 minutes before. A small interactive Zoom room is offered to some registrants based on the work they share."],
  ["Do I need a company, a team or experience?", "No. This is for people working alone. If you are starting from zero, the class shows you how to build your first portfolio with free samples for real businesses."],
  ["Will you promise me an income?", "No. I show what happened to me, with proof, and I say plainly that it is not a forecast for you. Anyone who promises you a number is guessing."],
  ["Will there be a recording?", "Plan to join live. The vote, the live production and the challenge prompt only happen in the room."],
  ["I am outside Bangladesh. What time is it for me?", "The class starts at 8:00 PM Dhaka time (GMT+6) on Friday, 27 November. The time box near the top of this page shows it in your own time zone."],
] as const;

const BRANDS = ["Berger", "Marico", "Chaldal", "UPS", "Nutrition Depot", "Vision", "Khaas Food"];

export default async function OneManAgency() {
  const country = cleanCountry((await headers()).get("x-vercel-ip-country"));
  const { start, end } = omaTimes();
  const linkedin = socials.find((s) => s.key === "LinkedIn")!;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "One Man Agency: free live class",
    description: "How one person with AI does the work of a whole agency, live on screen.",
    startDate: start.toISOString(),
    endDate: end.toISOString(),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "VirtualLocation", url: OMA.url },
    image: [`${brand.url}/onemanagency/og.jpg`],
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "BDT", url: OMA.url, availability: "https://schema.org/InStock" },
    organizer: { "@type": "Organization", "@id": `${brand.url}/#org`, name: "TOPZID", url: brand.url },
    performer: { "@type": "Person", "@id": `${brand.url}/about#khalid`, name: "Khalid Bin Helaly" },
    sponsor: { "@type": "Organization", name: "VOSU", url: "https://vosu.ai" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <noscript>
        <style>{`.oma .reveal { opacity: 1; translate: none; }`}</style>
      </noscript>

      <header className="oma-top">
        <div className="wrap">
          <div className="oma-lock">
            <Link className="kbh" href="/">TOPZID</Link>
            <span className="x" aria-hidden="true">×</span>
            <a className="vosu-link" href={vosuLink("nav_logo")} target="_blank" rel="noopener sponsored" aria-label="VOSU website (opens in a new tab)">
              <picture>
                <source srcSet="/aurafarming/vosu-wordmark-sm.webp" type="image/webp" />
                <img src="/aurafarming/vosu-wordmark-sm.png" alt="VOSU" width={300} height={66} />
              </picture>
            </a>
          </div>
          <a className="cta" href="#register">Register free</a>
        </div>
      </header>

      <main>
        {/* ---------- hero: the campaign banner ---------- */}
        <section className="oma-hero" aria-label="One Man Agency">
          <picture>
            <source media="(max-width: 700px)" srcSet="/onemanagency/hero-mobile.webp" type="image/webp" />
            <source media="(max-width: 700px)" srcSet="/onemanagency/hero-mobile.jpg" />
            <source media="(max-width: 1280px)" srcSet="/onemanagency/hero-1200.webp" type="image/webp" />
            <source srcSet="/onemanagency/hero.webp" type="image/webp" />
            <img
              src="/onemanagency/hero.jpg"
              alt="One Man Agency. Khalid Bin Helaly in a black suit stands alone; the shadows of a full production crew fill the wall behind him. Free live class, 27 Nov, 8 PM."
              width={1920}
              height={1080}
              fetchPriority="high"
            />
          </picture>
        </section>

        <section className="oma-intro">
          <div className="wrap oma-intro-grid">
            <div>
              <h1 className="sr">One Man Agency: a free live class with Khalid Bin Helaly, with VOSU</h1>
              <div className="oma-chips">
                <span className="oma-chip"><span className="dot" />Free live class</span>
                <span className="oma-chip">
                  With
                  <picture>
                    <source srcSet="/aurafarming/vosu-wordmark-sm.webp" type="image/webp" />
                    <img src="/aurafarming/vosu-wordmark-sm.png" alt="VOSU" width={300} height={66} />
                  </picture>
                </span>
              </div>
              <p className="promise">
                How one person with AI does the work <span>of a whole agency.</span>
              </p>
              <p className="lede">
                How clients find me, what I charge, and how the work gets made, live on screen with the proof. For
                anyone working alone. No company or team needed.
              </p>
            </div>

            <div className="oma-card">
              <div className="oma-facts">
                <div><span className="lbl">Date</span><b>Fri, 27 Nov</b></div>
                <div><span className="lbl">Time</span><b>8:00 PM Dhaka</b><LocalTime /></div>
                <div><span className="lbl">Length</span><b>2.5 hours, live</b></div>
                <div><span className="lbl">Price</span><b>Free</b></div>
              </div>
              <a className="btn btn-fg" href="#register">Register free <span className="arr">→</span></a>
              <Countdown />
              <p className="note">Live on YouTube and Facebook · Links on WhatsApp</p>
            </div>
          </div>
        </section>

        {/* ---------- the line ---------- */}
        <section className="oma-sec oma-statement">
          <div className="wrap">
            <span className="lbl reveal">The whole class in one line</span>
            <h2 className="disp reveal" style={{ marginTop: 18 }}>
              They reach me.<br /><span className="soft">I don&apos;t reach them.</span>
            </h2>
            <p className="lede reveal" style={{ marginTop: 26 }}>
              Every segment proves one loop. Public work brings clients in, a free sample proves it, a premium price
              follows, and the client stays. I will show you my real version of it, with the messages, the quotes and
              the work on screen.
            </p>
            <figure className="oma-wide reveal">
              <picture>
                <source srcSet="/onemanagency/office.webp" type="image/webp" />
                <img src="/onemanagency/office.jpg" alt="Khalid at a desk in an empty agency office at night, every workstation running" width={1600} height={528} loading="lazy" />
              </picture>
              <figcaption className="lbl">A whole agency. One desk.</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- three moments ---------- */}
        <section className="oma-sec alt">
          <div className="wrap">
            <div className="oma-head">
              <span className="lbl">Three things you will see live</span>
              <h2 className="disp">Proof, <span className="soft">not slides.</span></h2>
            </div>
            <div className="oma-moments">
              {MOMENTS.map((m, i) => (
                <article className="oma-moment reveal" key={m.t}>
                  <span className="n">0{i + 1}</span>
                  <h3>{m.t}</h3>
                  <p>{m.d}</p>
                  <span className="lbl when">{m.when}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- the client loop ---------- */}
        <section className="oma-sec">
          <div className="wrap">
            <div className="oma-head">
              <span className="lbl">Segment A · The TOPZID client system</span>
              <h2 className="disp">Six stages. <span className="soft">Each one shown, not explained.</span></h2>
            </div>
            <ol className="oma-loop reveal">
              {LOOP.map(([t, d]) => (
                <li key={t}>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
            <div className="oma-bridge reveal">
              <span className="lbl" style={{ paddingTop: 3 }}>Starting from zero?</span>
              <p>
                Stages one and two do not exist yet for you, and that is fine. <b>Your first portfolio is free samples
                for real local businesses, posted in public.</b> The samples become the portfolio, and the portfolio
                starts the inbound. Month one is samples. Inbound comes after, not on day one.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- live production ---------- */}
        <section className="oma-sec alt" id="production">
          <div className="wrap">
            <div className="oma-head">
              <span className="lbl">Segment B · 50 minutes, live</span>
              <h2 className="disp">From a vote <span className="soft">to a finished AI ad.</span></h2>
              <p className="lede">A real Bangladeshi business, chosen by you, goes through the same studio pipeline I use for paying clients.</p>
            </div>
            <div className="oma-prod">
              <figure className="reveal">
                <picture>
                  <source srcSet="/onemanagency/screens.webp" type="image/webp" />
                  <img src="/onemanagency/screens.jpg" alt="Khalid surrounded by floating screens: storyboards, an edit timeline, colour grading and analytics" width={1600} height={664} loading="lazy" />
                </picture>
              </figure>
              <div className="reveal">
                <ol className="oma-steps">
                  {PIPE.map(([t, b, em, tool]) => (
                    <li key={b}>
                      <span className="t">{t}</span>
                      <div><b>{b}</b><em>{em}</em></div>
                      <span className="tool">{tool}</span>
                    </li>
                  ))}
                </ol>
                <p className="oma-rule"><b>The lock is where amateurs and studios split.</b> Nothing goes to render until the assets are approved. You will see why.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- AI marketing stack ---------- */}
        <section className="oma-sec">
          <div className="wrap">
            <div className="oma-head">
              <span className="lbl">Segment C · The AI marketing stack</span>
              <h2 className="disp">What changed in 2026, <span className="soft">shown live.</span></h2>
              <p className="lede">Three demos. Each one pairs a sourced fact with something done on screen, so you can judge it yourself.</p>
            </div>
            <div className="oma-stack">
              <article className="reveal">
                <span className="lbl">01 · Search after AI</span>
                <h3>Ranking for clicks is dying</h3>
                <p className="say">Being the source the AI quotes is the new SEO.</p>
                <p>Live: I ask ChatGPT and Google AI Mode about a real local category and show which pages get quoted, and why.</p>
                <span className="src">Source: SparkToro data via <a href="https://www.techwyse.com/news/reports-data/google-zero-click-searches-68-percent-2026" target="_blank" rel="noopener noreferrer">TechWyse</a></span>
              </article>
              <article className="reveal">
                <span className="lbl">02 · Meta ads, run by an agent</span>
                <h3>An agent drafts, a human approves</h3>
                <p className="say">Meta opened its ads system to AI agents in 2026.</p>
                <p>Live: the agent turns a one-paragraph brief into a campaign, ad set and targeting, on a test account, with the campaign paused.</p>
                <span className="src">Source: <a href="https://developers.facebook.com/blog/post/2026/07/16/meta-ads-mcp-server/" target="_blank" rel="noopener noreferrer">Meta for Developers</a></span>
              </article>
              <article className="reveal">
                <span className="lbl">03 · ChatGPT ads</span>
                <h3>Open for US advertisers</h3>
                <p className="say">One more reason your first clients should be foreign.</p>
                <p>Self-serve for US businesses since May 2026. It is not open for Bangladesh-only targeting yet, which is exactly the opening.</p>
                <span className="src">Source: <a href="https://segwise.ai/blog/chatgpt-ads-2026-guide.md" target="_blank" rel="noopener noreferrer">Segwise</a></span>
              </article>
            </div>
          </div>
        </section>

        {/* ---------- run of show ---------- */}
        <section className="oma-sec alt">
          <div className="wrap">
            <div className="oma-head">
              <span className="lbl">Run of show</span>
              <h2 className="disp">Two and a half hours. <span className="soft">Minute by minute.</span></h2>
            </div>
            <div className="oma-agenda reveal">
              {AGENDA.map(([t, b, s, hl]) => (
                <div key={t} className={hl ? "hl" : undefined}>
                  <span className="t">{t}</span>
                  <b>{b}</b>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- fit + honesty ---------- */}
        <section className="oma-sec">
          <div className="wrap">
            <div className="oma-head">
              <span className="lbl">Straight talk</span>
              <h2 className="disp">Who this is for. <span className="soft">And who it isn&apos;t.</span></h2>
            </div>
            <div className="oma-fit">
              <div className="yes reveal">
                <h3 className="lbl" style={{ color: "var(--fg)" }}>For you if</h3>
                <ul>
                  <li>You freelance in design, video, writing or marketing and want clients to come to you</li>
                  <li>You run a small business and do your own marketing</li>
                  <li>You work in an agency and want to see how one person can run the whole thing</li>
                  <li>You are a student or between jobs and want a skill clients pay for</li>
                </ul>
              </div>
              <div className="no reveal">
                <h3 className="lbl">Not for you if</h3>
                <ul>
                  <li>You want a get-rich-quick system</li>
                  <li>You will not make one free sample in the next seven days</li>
                  <li>You want someone else to do the work for you</li>
                </ul>
              </div>
            </div>
            <div className="oma-honest reveal">
              <span className="lbl" style={{ color: "var(--fg)", paddingTop: 3 }}>No income promise</span>
              <p>
                <b>I show what happened to me. It is not a forecast for you.</b> Client names, faces and amounts stay
                blurred unless the client has approved them in writing. There is a short offer in the last five
                minutes, and nobody needs it to get everything from this class.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- 30-day challenge ---------- */}
        <section className="oma-sec alt">
          <div className="wrap">
            <div className="oma-head">
              <span className="lbl">After the class</span>
              <h2 className="disp">The 30-day <span className="soft">One Man Agency challenge.</span></h2>
              <p className="lede">Real work, posted in public, with the results published for everyone, including the people who got nothing.</p>
            </div>
            <div className="oma-chal reveal">
              <div><span className="d">7<small>DAYS</small></span><p>Make one free sample for a real local business and post it publicly.</p></div>
              <div><span className="d">14<small>DAYS</small></span><p>Send it to that business, or get one inbound inquiry from it.</p></div>
              <div><span className="d">30<small>DAYS</small></span><p>Submit your proof: the sample, the post link, the reply or no reply.</p></div>
              <div><span className="d">90<small>DAYS</small></span><p>Results board published at 30 and 90 days. Honest numbers, good and bad.</p></div>
            </div>
            {OMA.prize && <p className="oma-prize reveal"><b>Live-only prize:</b> {OMA.prize}</p>}
          </div>
        </section>

        {/* ---------- host ---------- */}
        <section className="oma-sec">
          <div className="wrap oma-host">
            <figure className="reveal">
              <picture>
                <source type="image/webp" srcSet="/consult/khalid-640.webp 640w, /consult/khalid-1080.webp 1080w" sizes="(max-width: 860px) 90vw, 40vw" />
                <img className="portrait" src="/consult/khalid-1080.jpg" srcSet="/consult/khalid-640.jpg 640w, /consult/khalid-1080.jpg 1080w" sizes="(max-width: 860px) 90vw, 40vw" alt="Khalid Bin Helaly" width={1080} height={1350} loading="lazy" />
              </picture>
              <div className="room">
                <picture>
                  <source srcSet="/onemanagency/room.webp" type="image/webp" />
                  <img src="/onemanagency/room.jpg" alt="A full lecture hall during one of Khalid's live AI sessions" width={1400} height={792} loading="lazy" />
                </picture>
              </div>
            </figure>
            <div className="reveal">
              <span className="lbl">Your host</span>
              <h2 className="disp" style={{ marginTop: 14 }}>Khalid Bin Helaly</h2>
              <p className="lede" style={{ marginTop: 18 }}>
                Founder of TOPZID, the AI production studio behind 500+ commercials. Seven years at Chaldal PLC (Y
                Combinator S15), rising to Assistant Director of Marketing, before going out on his own.
              </p>
              <div className="oma-nums">
                <div><b>500+</b><span>AI commercials produced</span></div>
                <div><b>13</b><span>Years in marketing</span></div>
                <div><b>1,000+</b><span>People taught in live sessions</span></div>
                <div><b>41</b><span>Paid students in Season 1</span></div>
              </div>
              <p className="brands oma-brands">Work for {BRANDS.join(" · ")}</p>
              <a className="lbl" href={linkedin.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg)", textDecoration: "none", borderBottom: "1px solid var(--line-2)", paddingBottom: 3 }}>LinkedIn ↗</a>
            </div>
          </div>
        </section>

        {/* ---------- VOSU ---------- */}
        <section className="oma-sec alt" id="vosu">
          <div className="wrap oma-vosu">
            <div className="reveal">
              <span className="lbl">In collaboration with</span>
              <div style={{ marginTop: 22 }}>
                <a className="wm" href={vosuLink("vosu_section_logo")} target="_blank" rel="noopener sponsored" aria-label="VOSU website (opens in a new tab)">
                  <picture>
                    <source srcSet="/aurafarming/vosu-wordmark.webp" type="image/webp" />
                    <img src="/aurafarming/vosu-wordmark.png" alt="VOSU" width={720} height={159} loading="lazy" />
                  </picture>
                </a>
              </div>
              <p className="lede" style={{ marginTop: 22 }}>VOSU is the AI creative platform the live production runs on. It is where the storyboard is locked and the ad is rendered.</p>
            </div>
            <div className="reveal">
              <h2 className="disp" style={{ fontSize: "clamp(34px, 4.6vw, 56px)", marginBottom: 24 }}>A free VOSU account <span className="soft">is required.</span></h2>
              <ol>
                <li><b>Create a free account</b> on VOSU. It takes about two minutes.</li>
                <li><b>Register below</b> with the same email you used on VOSU.</li>
                <li><b>Follow along live</b> on the night, and use it for the 30-day challenge.</li>
              </ol>
              <a className="btn btn-line" href={vosuLink("vosu_section_cta")} target="_blank" rel="noopener sponsored">Create a VOSU account ↗</a>
            </div>
          </div>
        </section>

        {/* ---------- register ---------- */}
        <section className="oma-sec" id="register" style={{ scrollMarginTop: 12 }}>
          <div className="wrap oma-reg">
            <div>
              <span className="lbl">Register</span>
              <h2 className="disp" style={{ marginTop: 14 }}>Save your seat. <span className="soft">It&apos;s free.</span></h2>
              <ul className="oma-after">
                <li><b>Fri, 27 Nov · 8:00 PM Dhaka</b>2.5 hours, live on YouTube and Facebook</li>
                <li><b>Links on WhatsApp</b>The day before, 2 hours before and 10 minutes before</li>
                <li><b>Small Zoom room</b>Offered to registrants who share real work in their profiles</li>
                <li><b>Need help?</b><a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg)" }}>Message us on WhatsApp</a></li>
              </ul>
            </div>
            <div className="reveal">
              <RegisterForm country={country} />
            </div>
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className="oma-sec alt">
          <div className="wrap">
            <div className="oma-head">
              <span className="lbl">Questions</span>
              <h2 className="disp">Before you register.</h2>
            </div>
            <div className="oma-faq">
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="oma-final">
          <div className="wrap">
            <span className="lbl">Friday, 27 November · 8:00 PM Dhaka</span>
            <h2 className="disp" style={{ marginTop: 18 }}>One man.<br /><span className="soft">Whole agency.</span></h2>
            <p>Two and a half hours, live, with the proof on screen. Free, with VOSU.</p>
            <a className="btn btn-fg" href="#register">Register free <span className="arr">→</span></a>
          </div>
        </section>
      </main>

      <footer className="oma-foot">
        <div className="wrap">
          <p>ONE MAN AGENCY · FREE LIVE CLASS · TOPZID × VOSU</p>
          <p>VOSU is a partner of this class.</p>
          <p style={{ marginTop: 12 }}>
            <Link href="/">TOPZID</Link>
            <Link href="/masterclass/season1">Season 1 recordings</Link>
            <Link href="/about">About</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy-policy">Privacy</Link>
          </p>
        </div>
      </footer>

      <div className="oma-mbar">
        <div className="p">Free · 27 Nov<small>8:00 PM DHAKA · WITH VOSU</small></div>
        <a className="btn btn-fg" href="#register">Register →</a>
      </div>
      <ScrollReveal />
    </>
  );
}
