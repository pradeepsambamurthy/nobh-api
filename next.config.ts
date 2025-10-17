import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname }, // quiet the “inferred workspace root” warning
};

export default nextConfig;