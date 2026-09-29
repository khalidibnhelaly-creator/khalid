import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows CI/sandbox verification builds to target a separate dist
  // directory without touching the local .next. Defaults to ".next".
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Static pages in /public. Production also has these in vercel.json;
  // mirrored here so `npm run dev` serves them locally.
  async rewrites() {
    return [
      { source: "/masterclass", destination: "/masterclass/index.html" },
      { source: "/masterclass/season1", destination: "/masterclass/season1/index.html" },
      { source: "/masterclass/season1/pay", destination: "/masterclass/season1/pay/index.html" },
      { source: "/aurafarming", destination: "/aurafarming/index.html" },
      { source: "/aurafarming/pay", destination: "/aurafarming/pay/index.html" },
      { source: "/student", destination: "/student/index.html" },
      { source: "/masterclass-payment", destination: "/masterclass-payment/index.html" },
      { source: "/refund-policy", destination: "/refund-policy/index.html" },
      { source: "/privacy-policy", destination: "/privacy-policy/index.html" },
    ];
  },
};

export default nextConfig;
