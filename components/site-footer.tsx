import { socials } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="kf">
      <div className="k-container kf-inner">
        <span className="kf-copy">© 2026 Khalid Bin Helaly</span>

        <ul className="kf-links">
          {socials.map((s) => (
            <li key={s.key}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.key}
              </a>
            </li>
          ))}
          <li>
            <a href="/ai">AI Workshop</a>
          </li>
        </ul>

        <a
          className="kf-venture"
          href="https://topzid.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          A TOPZID venture ↗
        </a>
      </div>
    </footer>
  );
}
