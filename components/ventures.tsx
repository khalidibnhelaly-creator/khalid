import { ventures } from "@/lib/content";

export function Ventures() {
  return (
    <section className="k-section k-band" id="ventures">
      <div className="k-container">
        <div className="k-label">
          <span>
            <span className="k-label-index">02</span> · The ventures
          </span>
          <span>Operated portfolio</span>
        </div>

        <div className="split">
          <div className="split-head reveal">
            <h2 className="k-h2">Products built on proven systems.</h2>
            <p className="k-body" style={{ marginTop: "1.5rem" }}>
              Each venture productizes work the studio already sells. The
              studio funds the build; the products are designed to scale
              without headcount.
            </p>
            <div className="v-note">
              <p>Investor conversations are open.</p>
              <a className="k-link" href="#contact">
                Get in touch <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <div className="vrows" data-stagger>
            {ventures.map((v) => (
              <div className="vrow reveal" key={v.name}>
                <span className="vrow-index">{v.index}</span>
                <span className="vrow-name">{v.name}</span>
                <span className="vrow-desc">{v.description}</span>
                <span className="vrow-tag">{v.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
