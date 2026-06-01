import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "lenis"],
  },
  images: {
    // Исходники уже webp — только webp-derivatives, без «двойного» AVIF-сжатия
    formats: ["image/webp"],
    qualities: [85, 90, 92],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 828],
  },
  async redirects() {
    return [
      {
        source: "/projects/:projectSlug",
        destination: "/project/:projectSlug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
