/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { inlineCss: true },
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        source: "/gallery/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};
export default nextConfig;
