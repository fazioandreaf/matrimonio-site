import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-images.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
