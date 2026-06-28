import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ClientWall } from "@/components/client-wall";
import { Studio } from "@/components/studio";
import { Ventures } from "@/components/ventures";
import { About } from "@/components/about";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { site, socials } from "@/lib/content";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  sameAs: socials.map((s) => s.href),
  worksFor: {
    "@type": "Organization",
    name: "TOPZID",
    url: "https://topzid.com",
  },
  knowsAbout: [
    "Generative AI",
    "Commercial film production",
    "Brand strategy",
    "Marketing automation",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <noscript>
        <style>{`.reveal { opacity: 1; translate: none; }`}</style>
      </noscript>

      <SiteHeader />

      <main>
        <Hero />
        <ClientWall />
        <Studio />
        <Ventures />
        <About />
        <ContactSection />
      </main>

      <SiteFooter />
      <ScrollReveal />
    </>
  );
}
