import type { Viewport } from "next";
import localFont from "next/font/local";
import "./studio.css";

/**
 * TOPZID Studio (/studio): private AI film studio engagements for
 * founder-led brands. Its own dark, cinematic system, separate from the
 * light editorial homepage: Archivo (variable width) for display and
 * credits, Fraunces italic for the occasional human line.
 */
const archivo = localFont({
  src: "../../node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--st-sans",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const serif = localFont({
  src: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2",
  weight: "100 900",
  style: "italic",
  variable: "--st-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  colorScheme: "dark",
};

export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`st ${archivo.variable} ${serif.variable}`}>{children}</div>;
}
