import { capabilities, site } from "@/lib/content";

function Showreel() {
  if (site.showreelEmbedUrl) {
    return (
      <div className="reel reveal">
        <iframe
          src={site.showreelEmbedUrl}
          title="TOPZID showreel"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="reel reveal">
      <div className="reel-empty">
        <span className="reel-tag">Showreel · 2026</span>
        <a
          className="k-link"
          href={site.youtubeChannel}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch the work on YouTube <span className="arrow">↗</span>
        </a>
      </div>
    </div>
  );
}

export function Studio() {
  return (
    <section className="k-section" id="studio">
      <div className="k-container">
        <div className="k-label">
          <span>
            <span className="k-label-index">01</span> · The studio
          </span>
          <span>TOPZID</span>
        </div>

        <div className="split">
          <div className="split-head reveal">
            <h2 className="k-h2">Commercial production, rebuilt on AI.</h2>
            <p className="k-body" style={{ marginTop: "1.5rem" }}>
              TOPZID replaces the traditional production pipeline with a
              generative one. Concept, film, voice, music and edit, delivered
              in days.
            </p>
            <p className="k-body">
              The cost structure changes so much that brands stop asking what a
              campaign costs and start asking how many they can run.
            </p>
            <p style={{ marginTop: "2rem" }}>
              <a className="k-link" href="#contact">
                Start a project <span className="arrow">→</span>
              </a>
            </p>
          </div>

          <div>
            <Showreel />

            <div className="caps" data-stagger>
              {capabilities.map((cap) => (
                <div className="cap reveal" key={cap.index}>
                  <span className="cap-index">{cap.index}</span>
                  <h3>{cap.title}</h3>
                  <p>{cap.description}</p>
                  <span className="cap-tools">{cap.tools}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
