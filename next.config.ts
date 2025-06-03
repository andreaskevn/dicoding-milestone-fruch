// next.config.ts
import type { NextConfig } from "next";
import { NextConfig as NextConfigType } from "next";

const nextConfig: NextConfigType = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**vercel-storage.com", // Ini akan mencocokkan semua subdomain dari vercel-storage.com
      },
    ],
    // Atau jika Anda lebih suka menggunakan 'domains' secara eksplisit:
    // domains: [
    //   'your-specific-blob-id.public.blob.vercel-storage.com', // Ganti dengan domain Vercel Blob spesifik Anda
    //   'public.blob.vercel-storage.com', // Jika ada
    // ],
  },
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
