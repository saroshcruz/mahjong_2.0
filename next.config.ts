import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server to be accessed from this LAN host for HMR/dev resources
  // Add any other local hosts you use (e.g. a different device IP) as needed.
  allowedDevOrigins: [
    'http://172.16.44.124',
  ],
};

export default nextConfig;
