import Link from "next/link";
import { brand, clients, films, HANDLE, process, programs, proof, reviews, services, socials, teaching } from "@/lib/topzid";
import { ContactForm } from "./contact-form";
import { FilmPlayer, ReelCard } from "./film-player";
import { TimeStatus, Until } from "./time-aware";

/* eslint-disable @next/next/no-img-element -- static brand assets; next/image adds nothing for these sizes */

const AURA = programs.find((p) => p.id === "aurafarming")!;
const aurafarmingUntil = AURA.status.kind === "until" ? AURA.status.until : "1970-01-01";

export function LiveBar() {
  return (
    <Until until={aurafarmingUntil}>
      <div className="livebar">
        <a href="/aurafarming">
          <span className="rec">LIVE</span>
          <span>
            Fri, Oct 23 · 9 PM: <b>Become an AI Influencer Today: Aurafarming!</b> · ৳1,000 · 500 seats
          </span>
          <span className="go">Reserve →</span>
        </a>
      </div>
    </Until>
  );
}

export function Hero() {
  const reel = films.find((f) => "featured" in f && f.featured) ?? films[0];
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">{brand.tagline} · Dhaka and worldwide</span>
          <h1>
            AI commercials and brand films, <span className="it">made in days.</span>
          </h1>
          <p className="lede">
            TOPZID is an AI production studio. We have produced <b>500+ commercials</b> for brands like Berger, Marico
            and Chaldal with generative AI instead of crews and sets. We also train marketing teams to run it
            themselves.
          </p>
          <div className="ctas">
            <a className="btn btn-solid" href="#contact">Start a project →</a>
            <a className="btn btn-ghost" href="#work">See the work</a>
          </div>
          <p className="note">Brands in Bangladesh and abroad · Quotes in BDT or USD</p>
        </div>
        <ReelCard id={reel.id} title={reel.title} tag={reel.tag} />
      </div>
    </section>
  );
}

export function Proof() {
  return (
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
  );
}

export function Clients() {
  return (
    <section className="clients">
      <div className="wrap">
        <p className="lbl">Trusted by teams at</p>
        <ul className="logo-grid reveal">
          {clients.map((c) => (
            <li key={c.name}>
              <img src={c.src} alt={c.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="pad" id="services">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">What we do</span>
          <h2>Two services. <span className="it">Both proven.</span></h2>
          <p>We make the films. Or we teach your team to make them. Most clients start with one and end up with both.</p>
        </div>
        <div className="services">
          {services.map((s, i) => (
            <article className={`svc reveal${i === 0 ? " lead" : ""}`} key={s.id} id={s.id}>
              <div className="top">
                <span className="n">{s.index}</span>
                <span className="k">{s.kicker}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.lede}</p>
              <ul>
                {s.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className="for">
                <b>Best for:</b> {s.bestFor}
              </p>
              <div className="actions">
                <a className="btn btn-solid" href={s.cta.href}>{s.cta.label} →</a>
                {s.secondary && (
                  <Link className="link" href={s.secondary.href}>{s.secondary.label} ↗</Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="pad" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">How a film gets made</span>
          <h2>Brief to final cut, <span className="it">without a single shoot day.</span></h2>
        </div>
        <div className="process reveal">
          {process.map((p) => (
            <div className="step" key={p.step}>
              <span className="s">{p.step}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>

        <div className="table-scroll reveal">
          <table className="compare">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Traditional production</th>
                <th scope="col" className="us">TOPZID</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Timeline</td><td>Weeks to months</td><td className="us">Days</td></tr>
              <tr><td>Crew, sets, locations</td><td>Required</td><td className="us">None</td></tr>
              <tr><td>Changes after the shoot</td><td>Reshoot or compromise</td><td className="us">Regenerate the scene</td></tr>
              <tr><td>Versions for every platform</td><td>Extra budget</td><td className="us">Built in</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section className="pad dark" id="work">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">The craft, on screen</span>
          <h2>Cinema-grade, made with AI.</h2>
          <p>
            Original films from our creative director&apos;s channel, The Khalid Way. Same tools, same pipeline, same
            team behind every client commercial.
          </p>
        </div>
        <div className="films">
          {films.map((f) => {
            const featured = "featured" in f && f.featured;
            return (
              <div className={`film${featured ? " featured" : ""}`} key={f.id}>
                <div className="frame">
                  <FilmPlayer id={f.id} title={f.title} hires={featured} />
                </div>
                <div className="cap">
                  <b>{f.title}</b>
                  <span>{f.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="films-foot">
          <a className="link" href={`https://www.youtube.com/@${HANDLE}`} target="_blank" rel="noopener noreferrer">
            More on YouTube @{HANDLE} ↗
          </a>
          <a className="link" href="#contact">Want one for your brand? →</a>
        </div>
      </div>
    </section>
  );
}

export function Learn() {
  const [feature, ...rest] = programs;
  return (
    <section className="pad learn" id="learn">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Learn with TOPZID</span>
          <h2>The studio&apos;s system, <span className="it">taught.</span></h2>
          <p>
            Everything we use to make films, taught live and on demand by Khalid Bin Helaly. Over 1,000 people have
            attended the live sessions.
          </p>
        </div>

        <div className="programs">
          <ProgramCard p={feature} feature />
          {rest.map((p) => (
            <ProgramCard key={p.id} p={p} />
          ))}
        </div>

        <div className="said reveal">
          {reviews.map((src) => (
            <img key={src} src={src} alt="Public LinkedIn post from a session attendee" loading="lazy" />
          ))}
        </div>
        <p className="said-note">Public LinkedIn posts from people who attended the free sessions.</p>
      </div>
    </section>
  );
}

function ProgramCard({ p, feature = false }: { p: (typeof programs)[number]; feature?: boolean }) {
  const title =
    feature && p.id === "aurafarming" ? (
      <>
        Become an AI Influencer Today: <em>Aurafarming!</em>
      </>
    ) : (
      p.title
    );
  return (
    <a href={p.href} className={`prog reveal${feature ? " feature" : ""}`}>
      {feature && p.image && (
        <div className="media">
          <img src={p.image} alt="" loading="lazy" />
        </div>
      )}
      <div className="body">
        <span className="k">{p.kicker}</span>
        <h3 lang={p.id === "workshop" ? "bn" : undefined}>{title}</h3>
        <p>{p.text}</p>
        <div className="foot">
          {p.status.kind === "until" ? (
            <TimeStatus before={p.status.label} after={p.status.after} until={p.status.until} />
          ) : (
            <span className="status">{p.status.label}</span>
          )}
          <span className="go">
            {p.cta} <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

export function Founder() {
  const linkedin = socials.find((s) => s.key === "LinkedIn")!;
  return (
    <section className="pad" id="about">
      <div className="wrap founder">
        <img className="photo reveal" src="/khalid.jpg" alt="Khalid Bin Helaly, founder of TOPZID" loading="lazy" width={1023} height={1537} />
        <div className="reveal">
          <span className="eyebrow">Founder and creative director</span>
          <h2>Khalid Bin Helaly</h2>
          <p style={{ marginTop: 18 }}>
            Thirteen years in marketing, seven of them at <b>Chaldal PLC (Y Combinator S15)</b>, where he rose to
            Assistant Director of Marketing. He started TOPZID to rebuild commercial production around generative AI,
            and also works as a <b>Generative AI Consultant</b> to one of Bangladesh&apos;s largest marketing groups.
          </p>
          <p>
            Every day he runs fifteen-plus AI tools as one connected system: Claude for projects, Higgsfield and
            Seedance for video, NotebookLM for research. That system is what TOPZID sells, and what it teaches.
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
  );
}

export function Contact() {
  return (
    <section className="pad" id="contact" style={{ background: "var(--paper-2)" }}>
      <div className="wrap contact-grid">
        <div>
          <span className="eyebrow">Start a project</span>
          <h2>Tell us what you are <span className="it">making.</span></h2>
          <p className="contact-note" style={{ fontSize: 17, color: "var(--ink-soft)" }}>
            Films, campaigns or a training for your team. Send a short brief and we reply within 48 hours, Dhaka time.
          </p>
          <ul className="chan">
            <li>
              <span>WhatsApp</span>
              <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer">{brand.whatsappDisplay}</a>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
            <li>
              <span>Based in</span>
              <b>{brand.location}</b>
            </li>
          </ul>
        </div>
        <div className="reveal">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="logo">
              <img src="/Topzidlogo.png" alt="" width={28} height={28} />
              TOPZID
            </Link>
            <p>AI commercials, brand films and corporate AI training. Dhaka, working worldwide.</p>
            <p className="handle">@{HANDLE} everywhere</p>
          </div>
          <div>
            <h4>Studio</h4>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Start a project</a></li>
            </ul>
          </div>
          <div>
            <h4>Learn</h4>
            <ul>
              {programs.map((p) => (
                <li key={p.id}>
                  <a href={p.href}>{p.short}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Follow</h4>
            <ul>
              {socials.map((s) => (
                <li key={s.key}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">{s.key}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="base">
          <span>© 2026 TOPZID · Dhaka, Bangladesh</span>
          <span>
            <Link href="/privacy-policy">Privacy policy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
