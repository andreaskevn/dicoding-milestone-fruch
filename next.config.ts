// next.config.ts
import type { NextConfig } from "next";
import { NextConfig as NextConfigType } from "next";

const nextConfig: NextConfigType = {
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        "**/node_modules",
        "**/.next",
        "**/out",
        "**/C:/Users/Asus/**", // 👈 Ini yang penting
      ],
    };
    return config;
  },
};

export default nextConfig;
