import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  alias: {
    "@/*": "./*",
  }
};

export default nextConfig;
