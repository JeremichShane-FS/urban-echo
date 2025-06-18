/** @type {import('next').NextConfig} */
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [join(__dirname, "src/assets/styles/")],
    prependData: `@use "sass:math"; @use "@assets/styles/utilities" as *;`,
    additionalData: `
      @use "styles/abstracts" as *;
    `,
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
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    turbo: {
      resolveAlias: {
        "@": join(__dirname, "src"),
        "@/components": join(__dirname, "src/design-system"),
      },
    },
  },
};

export default nextConfig;
