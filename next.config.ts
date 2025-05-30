import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://i.pravatar.cc/**")],
  },
};

export default nextConfig;
