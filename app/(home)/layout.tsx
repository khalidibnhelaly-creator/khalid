import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./home.css";

/**
 * TOPZID homepage. Uses the same editorial system as the static program
 * pages (/masterclass, /masterclass/season1, /aurafarming): white paper,
 * gold, Fraunces display, Public Sans body, IBM Plex Mono labels.
 * Fonts are self-hosted and scoped to this route group.
 */
const serif = localFont({
  src: [
    { path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2", style: "normal", weight: "100 900" },
    { path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--tz-serif",
  display: "swap",
});

const sans = localFont({
  src: "../../node_modules/@fontsource-variable/public-sans/files/public-sans-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--tz-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: "TOPZID | AI Commercials, Brand Films and Corporate AI Training" },
  description:
    "TOPZID is an AI production studio from Dhaka. 500+ AI commercials for brands like Berger, Marico and Chaldal, plus hands-on AI training for marketing teams.",
  alternates: { canonical: "https://www.topzid.com" },
  openGraph: {
    title: "TOPZID | AI commercials and brand films, made in days",
    description:
      "AI production studio behind 500+ commercials. Films, campaigns and corporate AI training for brands in Bangladesh and worldwide.",
    url: "https://www.topzid.com",
    siteName: "TOPZID",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`tz ${serif.variable} ${sans.variable}`}>{children}</div>;
}
