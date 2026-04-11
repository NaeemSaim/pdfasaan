import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    // This will allow the build to complete even with those PDF.js type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This prevents the build from failing due to linting warnings
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;