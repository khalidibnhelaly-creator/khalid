import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows CI/sandbox verification builds to target a separate dist
  // directory without touching the local .next. Defaults to ".next".
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
