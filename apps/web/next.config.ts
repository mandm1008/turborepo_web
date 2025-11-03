import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: ["*.fakebook.dominhman.id.vn", "fakebook.dominhman.id.vn"],
};

export default nextConfig;
