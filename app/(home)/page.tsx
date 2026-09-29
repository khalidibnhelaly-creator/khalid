import { Header } from "@/components/topzid/header";
import {
  Clients,
  Contact,
  Footer,
  Founder,
  Hero,
  Learn,
  LiveBar,
  Process,
  Proof,
  Services,
  Work,
} from "@/components/topzid/sections";
import { ScrollReveal } from "@/components/scroll-reveal";
import { brand, socials } from "@/lib/topzid";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: brand.url,
  logo: `${brand.url}/Topzidlogo.png`,
  description: "AI production studio making commercials and brand films with generative AI, plus corporate AI training.",
  email: brand.email,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  founder: {
    "@type": "Person",
    name: "Khalid Bin Helaly",
    sameAs: socials.map((s) => s.href),
  },
  sameAs: socials.map((s) => s.href),
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI commercials and brand films" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate AI training" } },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <noscript>
        <style>{`.tz .reveal { opacity: 1; translate: none; }`}</style>
      </noscript>

      <LiveBar />
      <Header />
      <main>
        <Hero />
        <Proof />
        <Clients />
        <Services />
        <Process />
        <Work />
        <Learn />
        <Founder />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
