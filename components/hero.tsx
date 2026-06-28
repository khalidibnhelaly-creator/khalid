import { site, stats, tracks } from "@/lib/content";

export function Hero() {
  return (
    <section className="mast k-container" id="top">
      <p className="mast-kicker k-rise" data-rise="1">
        {site.location} · Generative AI studio and ventures
      </p>

      <h1 className="mast-name k-rise" data-rise="2">
        Khalid
        <br />
        Bin Helaly
      </h1>

      <div className="mast-row">
        <p className="mast-role k-rise" data-rise="3">
          I run <strong>TOPZID</strong>, an AI production studio behind 500+
          commercials for national brands, and build AI-native products on the
          systems it proves. Thirteen years in marketing, three of them spent
          rebuilding the production pipeline with generative AI.
        </p>
        <div className="mast-aside k-rise" data-rise="4">
          <span>Founder · TOPZID</span>
          <span>Working worldwide from Dhaka</span>
        </div>
      </div>

      <div className="stats k-rise" data-rise="5" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat-num">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <nav className="router k-rise" data-rise="6" aria-label="Choose a track">
        {tracks.map((t) => (
          <a className="router-panel" href={t.href} key={t.index}>
            <span className="router-index">{t.index}</span>
            <span className="router-title">{t.title}</span>
            <span className="router-desc">{t.description}</span>
            <span className="router-foot">
              <span className="router-meta">{t.meta}</span>
              <span className="router-arrow" aria-hidden="true">
                →
              </span>
            </span>
          </a>
        ))}
      </nav>
    </section>
  );
}
