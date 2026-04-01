import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/personal-workspace",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
