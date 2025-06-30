/** @type {import('next').NextConfig} */
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [join(__dirname, "src/assets/styles/"), join(__dirname, "src")],
    // Remove the problematic prependData that's causing the import error
    additionalData: `@use "sass:math";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shopurbanecho.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cms.gourbanecho.com", // Your future production CMS domain
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  turbopack: {
    resolveAlias: {
      "@": join(__dirname, "src"),
      "@/*": join(__dirname, "src/*"),
      "@/assets": join(__dirname, "src/assets"),
      "@/components": join(__dirname, "src/components"),
      "@/styles": join(__dirname, "src/assets/styles"),
    },
  },
};

export default nextConfig;
