import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/auth",
        destination: "http://localhost:3007/auth",
      },
      {
        source: "/auth/:path*",
        destination: "http://localhost:3007/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
