import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/todd-zhu-portfolio',
  assetPrefix: '/todd-zhu-portfolio',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
