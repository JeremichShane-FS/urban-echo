/** @type {import('next').NextConfig} */
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [join(__dirname, "src/sass")],
    prependData: `@use "sass:math"; @use "@/sass/utilities" as *;`,
  },
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },

  experimental: {
    turbo: {
      resolveAlias: {
        "@": join(__dirname, "src"),
        "@components": join(__dirname, "src/components"),
        "@styles": join(__dirname, "src/sass"),
        "@utils": join(__dirname, "src/utils"),
        "@lib": join(__dirname, "src/lib"),
        "@public": join(__dirname, "public"),
      },
    },
  },
};

export default nextConfig;
