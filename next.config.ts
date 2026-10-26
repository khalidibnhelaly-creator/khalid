import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows CI/sandbox verification builds to target a separate dist
  // directory without touching the local .next. Defaults to ".next".
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Static pages in /public. Production also has these in vercel.json;
  // mirrored here so `npm run dev` serves them locally.
  // Short link for the One Man Agency class; the old long URL keeps working.
  async redirects() {
    return [{ source: "/onemanagency", destination: "/oma", permanent: true }];
  },
  async rewrites() {
    return [
      { source: "/masterclass", destination: "/masterclass/index.html" },
      { source: "/masterclass/season1", destination: "/masterclass/season1/index.html" },
      { source: "/masterclass/season1/pay", destination: "/masterclass/season1/pay/index.html" },
      { source: "/aurafarming", destination: "/aurafarming/index.html" },
      { source: "/aurafarming/pay", destination: "/aurafarming/pay/index.html" },
      { source: "/aurafarming/code", destination: "/aurafarming/code/index.html" },
      { source: "/aurafarming/challenge", destination: "/aurafarming/challenge/index.html" },
      { source: "/unemployable", destination: "/unemployable/index.html" },
      { source: "/student", destination: "/student/index.html" },
      { source: "/masterclass-payment", destination: "/masterclass-payment/index.html" },
    ];
  },
};

export default nextConfig;
