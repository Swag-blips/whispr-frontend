import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/auth",
        destination: "http://localhost:3004/auth/",
      },
      {
        source: "/auth/:path*",
        destination: "http://localhost:3004/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
