/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async rewrites() {
    return [{ source: "/portfolio", destination: "/portfolio/index.html" }];
  },
};

export default nextConfig;
