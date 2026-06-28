import Image from "next/image";
import { principles } from "@/lib/content";

export function About() {
  return (
    <section className="k-section" id="about">
      <div className="k-container">
        <div className="k-label">
          <span>
            <span className="k-label-index">03</span> · About
          </span>
          <span>Dhaka, worldwide</span>
        </div>

        <div className="split">
          <figure className="about-figure reveal">
            <Image
              src="/khalid.jpg"
              alt="Khalid Bin Helaly"
              width={1023}
              height={1537}
              sizes="(max-width: 64rem) 26rem, 36vw"
            />
          </figure>

          <div className="reveal">
            <h2 className="k-h2">
              Thirteen years in marketing. The last three spent rebuilding it
              with AI.
            </h2>
            <p className="k-body" style={{ marginTop: "1.5rem" }}>
              I started in digital marketing in 2013 and crossed into
              generative production the moment the tools crossed the quality
              line. Since then: five hundred commercials, national brands, and
              a studio that operates more like a software company than an
              agency.
            </p>
            <p className="k-body">
              Based in Dhaka, working worldwide. The mandate is simple: build
              creative systems that compound.
            </p>

            <ul className="principles">
              {principles.map((p, i) => (
                <li key={i}>
                  <span className="p-index">0{i + 1}</span>
                  <span className="p-text">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
