import { Header } from "./header";
import { Footer } from "./sections";

export type TocItem = { id: string; label: string };

/** Shared shell for About and the legal pages: header, hero, optional contents, footer. */
export function PageShell({
  eyebrow,
  title,
  lede,
  updated,
  toc,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  updated?: string;
  toc?: TocItem[];
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            {lede && <p className="lede">{lede}</p>}
            {updated && <p className="meta">Effective {updated}</p>}
          </div>
        </section>
        {toc ? (
          <div className="wrap legal-grid">
            <nav className="toc" aria-label="On this page">
              <h2>On this page</h2>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.label}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <article className="prose">{children}</article>
          </div>
        ) : (
          children
        )}
      </main>
      <Footer />
    </>
  );
}

/** One numbered legal section; id doubles as the contents anchor. */
export function Clause({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
