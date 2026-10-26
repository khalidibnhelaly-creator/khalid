import type { Viewport } from "next";
import localFont from "next/font/local";
import "./oma.css";

/**
 * One Man Agency (/oma). Monochrome, poster-style system that
 * matches the campaign banners: heavy condensed Archivo for display,
 * regular Archivo for reading. Scoped under .oma.
 */
const archivo = localFont({
  src: "../../node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--oma-sans",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function OmaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`oma ${archivo.variable}`}>{children}</div>;
}
