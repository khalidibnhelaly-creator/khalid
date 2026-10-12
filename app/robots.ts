import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Transactional and single-use pages have no value in search results.
        disallow: [
          "/api/",
          "/aurafarming/pay",
          "/aurafarming/code",
          "/aurafarming/challenge",
          "/masterclass/season1/pay",
          "/masterclass-payment",
        ],
      },
    ],
    sitemap: "https://www.topzid.com/sitemap.xml",
    host: "https://www.topzid.com",
  };
}
