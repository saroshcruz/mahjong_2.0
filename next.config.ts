import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
