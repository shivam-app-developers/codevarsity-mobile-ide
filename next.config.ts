import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard build for Firebase App Hosting (SSR)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
