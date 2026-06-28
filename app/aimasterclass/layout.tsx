import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./masterclass.css";

/**
 * /aimasterclass is a standalone visual system (antique paper + gold,
 * Fraunces/Public Sans) ported from a one-off TOPZID landing page. It
 * does not share the --k- design tokens used elsewhere on the site —
 * everything is scoped under .amc-root in masterclass.css so it can't
 * leak into (or be overridden by) the global stylesheet. Mono falls
 * through to --font-mono, already self-hosted by the root layout.
 */
const serif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-italic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-amc-serif",
  display: "swap",
});

const sans = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/public-sans/files/public-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/public-sans/files/public-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/public-sans/files/public-sans-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/public-sans/files/public-sans-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/public-sans/files/public-sans-latin-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-amc-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The One Man AI OS — Khalid Bin Helaly",
  description:
    "Three live sessions. Free, application based. The first batch is 1,000 seats. The real system behind viral content, brand work, and everyday AI productivity.",
  openGraph: {
    title: "The One Man AI OS by Khalid Bin Helaly",
    description:
      "Every paid AI course in Bangladesh combined still won't match what's coming. Free, live, three sessions.",
    images: ["https://www.topzid.com/Topzidlogo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e6",
  colorScheme: "light",
};

export default function MasterclassLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${serif.variable} ${sans.variable} amc-root`}>
      {children}
    </div>
  );
}
