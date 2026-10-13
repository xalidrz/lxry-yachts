import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    qualities: [75, 80],
    minimumCacheTTL: 31536000,
  },
  // The site is one page now: old section pages land on their section.
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/work", destination: "/#gallery", permanent: true },
      { source: "/reviews", destination: "/#hours", permanent: true },
      { source: "/location", destination: "/#location", permanent: true },
    ];
  },
};

export default nextConfig;
