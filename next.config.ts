import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    qualities: [75, 80],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
