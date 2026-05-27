import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 92],
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
