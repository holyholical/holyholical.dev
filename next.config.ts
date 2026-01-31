import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/holyholical.dev',
  assetPrefix: '/holyholical.dev/',
};

export default nextConfig;
