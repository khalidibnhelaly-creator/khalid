import { site, socials } from "@/lib/content";
import { ContactForm } from "./contact-form";

const CHANNELS = [
  { key: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    key: "WhatsApp",
    value: "+880 1681 096975",
    href: "https://wa.me/8801681096975",
  },
  ...socials.map((s) => ({
    key: s.key,
    value: s.href.replace("https://www.", "").replace("https://", ""),
    href: s.href,
  })),
] as const;

export function ContactSection() {
  return (
    <section className="k-section" id="contact">
      <div className="k-container">
        <div className="k-label">
          <span>
            <span className="k-label-index">04</span> · Contact
          </span>
          <span>
            {site.location.split(",")[0]} · {site.timezone}
          </span>
        </div>

        <div className="split">
          <div className="split-head reveal">
            <h2 className="k-h2">Tell me what you&apos;re building.</h2>
            <p className="contact-note">
              Client projects and investor conversations land in the same
              inbox. Replies within 48 hours, Dhaka time.
            </p>

            <ul className="chan-list">
              {CHANNELS.map((c) => (
                <li key={c.key}>
                  <span className="chan-key">{c.key}</span>
                  <a
                    className="chan-val"
                    href={c.href}
                    {...(c.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
