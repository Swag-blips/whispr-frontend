import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/auth",
        destination: "http://localhost:3004/auth",
      },
      {
        source: "/auth/:path*",
        destination: "http://localhost:3004/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
