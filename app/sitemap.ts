import type { MetadataRoute } from "next";

const SITE = "https://www.topzid.com";

/**
 * Public, indexable pages only. Checkout, code word, challenge and old
 * campaign pages are left out on purpose (see robots.ts).
 */
const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/onemanagency", priority: 0.9, changeFrequency: "weekly" },
  { path: "/studio", priority: 0.9, changeFrequency: "monthly" },
  { path: "/consult", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/aurafarming", priority: 0.8, changeFrequency: "weekly" },
  { path: "/masterclass/season1", priority: 0.8, changeFrequency: "monthly" },
  { path: "/unemployable", priority: 0.8, changeFrequency: "monthly" },
  { path: "/masterclass", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map((p) => ({
    url: `${SITE}${p.path === "/" ? "" : p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
