import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Fonts are self-hosted from Fontsource packages and served from this
 * deployment. No request leaves the domain and builds are deterministic
 * (no network dependency on Google Fonts at build time).
 */
const sans = localFont({
  src: "../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
});

const mono = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://khalidbinhelaly.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Khalid Bin Helaly — AI Creative Entrepreneur",
    template: "%s — Khalid Bin Helaly",
  },
  description:
    "Founder of TOPZID, the AI production studio behind 500+ commercials for brands across Bangladesh. Building AI-native products on proven studio systems.",
  authors: [{ name: "Khalid Bin Helaly", url: SITE_URL }],
  openGraph: {
    title: "Khalid Bin Helaly — AI Creative Entrepreneur",
    description:
      "AI production studio behind 500+ commercials. AI-native products built on proven systems. Dhaka, worldwide.",
    url: SITE_URL,
    siteName: "Khalid Bin Helaly",
    locale: "en_US",
    type: "website",
    // images come from app/opengraph-image.png (file convention)
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalid Bin Helaly — AI Creative Entrepreneur",
    description:
      "AI production studio behind 500+ commercials. AI-native products built on proven systems.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbfbfd",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
