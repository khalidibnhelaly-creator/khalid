import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./workshop.css";

/**
 * /ai shares the main design system. This layout adds the Bengali
 * typeface (Hind Siliguri, self-hosted) for the Bangla copy; Latin
 * glyphs fall through to Inter Tight from the root layout.
 */
const bangla = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-bengali-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bangla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI ওয়ার্কশপ — খালিদ বিন হিলালী",
  description:
    "হ্যান্ডস-অন AI ওয়ার্কশপ। AI দিয়ে কনটেন্ট তৈরি, ওয়ার্কফ্লো অটোমেশন এবং জেনারেটিভ AI ইন্টিগ্রেশন শিখুন।",
};

export const viewport: Viewport = {
  themeColor: "#fbfbfd",
  colorScheme: "light",
};

export default function WorkshopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${bangla.variable} ai-root`}>{children}</div>;
}
