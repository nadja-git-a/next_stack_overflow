import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.example.com" },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://codelang.vercel.app/api/:path*",
      },
    ];
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
