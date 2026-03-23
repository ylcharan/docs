import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },

  reactStrictMode: true,

  experimental: {
    // keep empty or add features if needed
  },
};

export default nextConfig;
