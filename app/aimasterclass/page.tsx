import Image from "next/image";
import Link from "next/link";
import { MasterclassForm } from "@/components/masterclass-form";
import { ScrollReveal } from "@/components/scroll-reveal";

const WA_BASE = "https://wa.me/8801681096975";

const BRAND_LOGOS = [
  { src: "/brands/Asiatic MCL.png", alt: "Asiatic MCL" },
  { src: "/brands/Chaldal.png", alt: "Chaldal" },
  { src: "/brands/Berger.png", alt: "Berger" },
  { src: "/brands/Marico.png", alt: "Marico" },
  { src: "/brands/UPS.png", alt: "UPS" },
  { src: "/brands/Khaas Food.png", alt: "Khaas Food" },
  { src: "/brands/Vision Electronics.png", alt: "Vision Electronics" },
  { src: "/brands/Finesse.png", alt: "Finesse" },
  { src: "/brands/BIW.jpg", alt: "BIW" },
  { src: "/brands/Wattteh Greens.png", alt: "Wattteh Greens" },
  { src: "/brands/Plush Down BD.png", alt: "Plush Down BD" },
  { src: "/brands/Nutrition Depot.png", alt: "Nutrition Depot" },
  { src: "/brands/Subaitaas Heaven.png", alt: "Subaitaa's Heaven" },
  { src: "/brands/LearnOZ.png", alt: "LearnOZ" },
  { src: "/brands/Releva.png", alt: "Releva" },
];

const SHOTSTRIP = [
  { src: "/khalidworkshop.jpeg", alt: "Khalid running an AI workshop" },
  { src: "/khalidworkshop0.png", alt: "Workshop attendees" },
  { src: "/khalid_workshop2.jpg", alt: "Hands on AI training" },
  { src: "/khalidworkshop3.JPG", alt: "Workshop presentation" },
  { src: "/khalidworkshop6.JPG", alt: "AI tools demonstration" },
  { src: "/bdjobs-ai-conference-1.jpg", alt: "Speaking at the Bdjobs AI Conference" },
  { src: "/bdjobs-ai-conference-2.jpg", alt: "Bdjobs AI Conference panel" },
  { src: "/bdjobs-ai-conference-3.jpg", alt: "Bdjobs AI Conference audience" },
];

/* Google Calendar links, precomputed (the three session dates are fixed,
   so there's nothing to compute at request time). */
const SESSIONS = [
  {
    id: "d1",
    dn: "01",
    dayname: "Tuesday",
    date: "June 30, 2026",
    tag: "Inside The Studio",
    h3: "What I'm actually building right now, with nothing held back.",
    bullets: [
      "The real projects sitting on my desk right now, shown live on screen",
      "Exactly how many credits I burn on each platform and what it actually costs",
      "How I run my projects through Claude",
      "How I plan and research with NotebookLM",
      "A live preview of what's coming in sessions two and three",
    ],
    gcal: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+One+Man+AI+OS%2C+Session+01%3A+Inside+The+Studio&dates=20260630T150000Z%2F20260630T170000Z&details=Live+session+with+Khalid+Bin+Helaly.+The+link+will+be+shared+in+the+WhatsApp+group.&location=Online%2C+link+shared+in+the+WhatsApp+group",
  },
  {
    id: "d2",
    dn: "02",
    dayname: "Thursday",
    date: "July 2, 2026",
    tag: "The Viral Build",
    h3: "Building one piece of content live, made to go viral.",
    bullets: [
      "Starting from nothing, I build a piece of content built to go viral, live, start to finish",
      "Hooks and the viral formula: why some content spreads and most of it dies",
      "Personal, product, and business branding built around that content",
      "The target for this session is simple: one piece of content that actually goes viral",
    ],
    gcal: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+One+Man+AI+OS%2C+Session+02%3A+The+Viral+Build&dates=20260702T150000Z%2F20260702T170000Z&details=Live+build+of+one+piece+of+content+made+to+go+viral%2C+start+to+finish.+Link+shared+in+the+WhatsApp+group.&location=Online%2C+link+shared+in+the+WhatsApp+group",
  },
  {
    id: "d3",
    dn: "03",
    dayname: "Saturday",
    date: "July 4, 2026",
    tag: "For Corporate Professionals",
    h3: "AI for your everyday work, built for people with a job to do.",
    bullets: [
      "Using LLMs like ChatGPT and Claude to move faster through daily work",
      "Basic AI design skills, so you can make your own visuals when you need them",
      "Business and data planning, plus MCP connections that link AI to your tools",
      "Auditing your portfolio site and your LinkedIn or online presence",
      "Personal branding: how to attract opportunities instead of chasing them",
      "The mindset: you don't need to code to multitask, move faster, plan better, and research smarter with AI",
      "How I actually run brand work end to end: marketing, planning, design, growth, and social media",
    ],
    gcal: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+One+Man+AI+OS%2C+Session+03%3A+AI+For+Corporate+Professionals&dates=20260704T150000Z%2F20260704T170000Z&details=AI+for+corporate+professionals%3A+daily+work%2C+planning%2C+and+personal+branding.+Link+shared+in+the+WhatsApp+group.&location=Online%2C+link+shared+in+the+WhatsApp+group",
  },
];

const AUDIENCE = [
  { which: "Sessions 01 and 02", text: "Creators and freelancers. Build an income from content and watch a real AI workflow up close." },
  { which: "Sessions 01 and 02", text: "Business owners. Build your own brand and content without paying an agency." },
  { which: "Session 03, especially", text: "Corporate professionals. Use AI to make your daily work, planning, and branding easier." },
  { which: "All three sessions", text: "Everyone else. You're tired of AI hype and want to see a working system instead." },
];

const FAQ = [
  {
    q: "Is this actually free? No catch?",
    a: "Yes, actually free. All three sessions, zero cost, no card required. 1,500+ people are interested and the first batch is 1,000 seats. That's the only catch there is.",
  },
  {
    q: "What if I don't answer the application questions well?",
    a: "Submitting the form gets you into the WhatsApp group either way. These questions aren't a wall to keep anyone out. A real, specific answer just helps me understand who's actually in the room, so I can make these sessions worth your time.",
  },
  {
    q: "What if I miss one of the three sessions?",
    a: "I'll try to share a recap in the WhatsApp group, but being live is the best option. The real value happens live: questions, feedback, and the build itself.",
  },
  {
    q: "I'm not a corporate professional. Is session three still useful for me?",
    a: "Yes. The mindset and the tools are universal. Creators, students, and business owners get just as much out of it.",
  },
  {
    q: "Do I need an expensive laptop or a big budget?",
    a: "No. I'll show you exactly what you need in the first session. The skill lives in the method, not the machine.",
  },
];

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.488-.917z" />
    </svg>
  );
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "The One Man AI OS by Khalid Bin Helaly",
  description:
    "Three live sessions. Free, application based. The first batch is 1,000 seats.",
  organizer: { "@type": "Person", name: "Khalid Bin Helaly" },
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  startDate: "2026-06-30T21:00:00+06:00",
  endDate: "2026-07-04T23:00:00+06:00",
};

export default function AIMasterclass() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <noscript>
        <style>{`.reveal { opacity: 1; translate: none; }`}</style>
      </noscript>

      <nav>
        <div className="wrap">
          <a className="brand" href="https://www.topzid.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/Topzidlogo.png" alt="TOPZID" width={26} height={26} />
            <span>Khalid Bin Helaly</span>
          </a>
          <div className="navlinks">
            <a href="#about">Background</a>
            <a href="#program">The Program</a>
            <a href="#apply">Apply</a>
          </div>
          <a className="nav-cta" href="#apply">Apply Now</a>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <header className="hero">
        <div className="wrap">
          <span className="eyebrow">Free. Live. Application Based.</span>
          <h1>The One Man AI OS.</h1>
          <p className="byline">by Khalid</p>
          <p className="sub">
            Every paid AI course in Bangladesh combined still won&apos;t match
            what&apos;s coming. I do this work every day, for real clients.{" "}
            <b>Apply below and judge it yourself, for free.</b>
          </p>

          <div className="datestrip">
            <div className="datechip">Session 01 &middot; <b>Tuesday, June 30</b></div>
            <div className="datechip">Session 02 &middot; <b>Thursday, July 2</b></div>
            <div className="datechip">Session 03 &middot; <b>Saturday, July 4</b></div>
          </div>
          <div className="timeline-note">
            Each session runs <b>9:00 PM to 11:00 PM</b>, Dhaka time.
          </div>

          <div className="cta-row">
            <a href="#apply" className="btn btn-solid">Apply Now &rarr;</a>
            <a
              href={`${WA_BASE}?text=I%20want%20to%20know%20more%20about%20The%20AI%20System`}
              className="btn btn-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WaIcon />
              Message me on WhatsApp
            </a>
          </div>
          <p className="freenote">
            <b>1,500+</b> people have already shown interest. The first batch is{" "}
            <b>1,000 seats.</b> No price tag, because value comes first.
          </p>
        </div>
      </header>

      <div className="stats">
        <div className="wrap">
          <div className="stat"><b>500+</b><span>AI commercials produced</span></div>
          <div className="stat"><b>13+</b><span>Years in marketing</span></div>
          <div className="stat"><b>15+</b><span>National brands</span></div>
          <div className="stat"><b>3</b><span>Live sessions, free</span></div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="track">
          Viral Content <span>&middot;</span> <b>Project Management</b> <span>&middot;</span> Claude Workflows <span>&middot;</span> NotebookLM Planning <span>&middot;</span> MCP Connections <span>&middot;</span> <b>Personal Branding</b> <span>&middot;</span> Corporate AI <span>&middot;</span> Brand Growth <span>&middot;</span>{" "}
          Viral Content <span>&middot;</span> <b>Project Management</b> <span>&middot;</span> Claude Workflows <span>&middot;</span> NotebookLM Planning <span>&middot;</span> MCP Connections <span>&middot;</span> <b>Personal Branding</b> <span>&middot;</span> Corporate AI <span>&middot;</span> Brand Growth <span>&middot;</span>{" "}
        </div>
      </div>

      {/* ================= ABOUT / CAREER ================= */}
      <section className="about reveal" id="about">
        <div className="wrap">
          <div className="photo">
            <Image src="/khalid.jpg" alt="Khalid Bin Helaly" width={1023} height={1537} sizes="(max-width: 55rem) 100vw, 36vw" />
          </div>
          <div>
            <span className="eyebrow">Career and Background</span>
            <h2>
              Thirteen years in marketing. Now I build brands and content with
              AI, fully independent.
            </h2>
            <div style={{ height: 18 }} />
            <p>
              I spent seven years at Chaldal PLC and rose to Assistant Director
              of Marketing. Today I run my own studio, <b>TOPZID</b>, work as a
              Generative AI Consultant at Asiatic MCL, and build directly with
              brands like Berger, Marico, and Nutrition Depot.
            </p>
            <p>
              Every day I run fifteen plus AI tools. <b>Claude</b> manages my
              projects. Higgsfield and Seedance handle video production.{" "}
              <b>NotebookLM</b> handles research and planning. MCP connections
              tie my tools together, so I can multitask across five projects
              at once without losing my mind.
            </p>
            <p>Across three sessions, I&apos;m opening the whole system. Nothing held back.</p>

            <div className="brandwall">
              <div className="lbl">Brands I&apos;ve worked with</div>
              <div className="logos">
                {BRAND_LOGOS.map((b) => (
                  <Image key={b.alt} src={b.src} alt={b.alt} width={120} height={40} sizes="120px" />
                ))}
              </div>
            </div>

            <div className="shotstrip">
              {SHOTSTRIP.map((s) => (
                <Image key={s.src} src={s.src} alt={s.alt} width={640} height={480} sizes="(max-width: 42rem) 50vw, 25vw" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROGRAM ================= */}
      <section className="reveal" id="program">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">The Program</span>
            <h2>Three sessions. One system. Each one stands on its own.</h2>
          </div>

          {SESSIONS.map((s) => (
            <div className="daycard" key={s.id}>
              <div className="head">
                <div className="when">
                  <div className="dn">{s.dn}</div>
                  <div className="dayname">{s.dayname}</div>
                  <div className="date">{s.date}</div>
                  <div className="time">9:00 PM to 11:00 PM</div>
                </div>
                <div>
                  <span className="tag">{s.tag}</span>
                  <h3>{s.h3}</h3>
                  <ul className="daybullets">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <a className="caladd" href={s.gcal} target="_blank" rel="noopener noreferrer">
                    + Add to calendar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHO FOR ================= */}
      <section className="reveal">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Who This Is For</span>
            <h2>Three sessions, built for a few different rooms.</h2>
          </div>
          <div className="audience">
            {AUDIENCE.map((item) => (
              <div className="aitem" key={item.which + item.text}>
                <span className="which">{item.which}</span>
                <p><b>{item.text.split(".")[0]}.</b>{item.text.slice(item.text.indexOf(".") + 1)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HONESTY ================= */}
      <div className="honesty">
        <div className="wrap reveal">
          <div><span className="eyebrow">Straight Talk</span></div>
          <div>
            <p>
              Most things sold as AI courses in Bangladesh are recycled
              YouTube videos with a price tag attached. People pay, get
              nothing real, and call it a scam. Fair enough.
            </p>
            <p>
              So I&apos;m not asking you to trust me. I&apos;m asking you to
              watch. Three full sessions, free, where I open my real work, my
              real numbers, and my real system. If you don&apos;t get value,
              walk away. You lose nothing.
            </p>
            <p className="punch">
              Value first. Money later. <span className="it">That&apos;s the whole promise.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ================= APPLY ================= */}
      <section className="apply reveal" id="apply">
        <div className="wrap">
          <div className="apply-intro">
            <span className="eyebrow">Applications Are Open</span>
            <h2>
              1,500+ people are already interested. The first batch is{" "}
              <span className="em">1,000 seats.</span>
            </h2>
            <p>
              This isn&apos;t a normal signup. It&apos;s a short application.
              Answer the questions below for real. Once you submit,
              you&apos;re straight into the WhatsApp group. These questions
              aren&apos;t here to keep anyone out. They&apos;re here so I know
              who&apos;s actually in the room, and can build sessions worth
              their time.
            </p>
            <div className="seatpair">
              <div><b>1,500+</b><span>Interested</span></div>
              <div><b>1,000</b><span>Seats, batch 01</span></div>
              <div><b>03</b><span>Live sessions</span></div>
            </div>
          </div>

          <MasterclassForm />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="reveal">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Frequently Asked</span>
            <h2>What a smart skeptic <span className="em">actually asks.</span></h2>
          </div>
          <div className="faq">
            {FAQ.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <div className="faq-a"><p>{item.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL ================= */}
      <section className="final reveal">
        <div className="wrap">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Last Call</span>
          <h2>Stop paying for hype. Come see a real system instead.</h2>
          <p>Three sessions. Free. Not a promise, proof. Apply now and I&apos;ll see you Tuesday at 9.</p>
          <a href="#apply" className="btn btn-solid">Apply Now &rarr;</a>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="l">&copy; 2026 Khalid Bin Helaly. Dhaka, Bangladesh.</div>
          <div className="links">
            <Link href="/">Main site</Link>
            <a href="https://www.linkedin.com/in/khalid-bin-helaly/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://youtube.com/@khalidbinhelaly" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://www.facebook.com/khalidibnhelaly" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
          <a className="venture" href="https://topzid.com" target="_blank" rel="noopener noreferrer">
            <Image src="/Topzidlogo.png" alt="TOPZID" width={22} height={22} /> A TOPZID Venture
          </a>
        </div>
      </footer>

      <ScrollReveal />
    </>
  );
}
