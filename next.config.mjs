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
  },
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },

  experimental: {
    turbo: {
      resolveAlias: {
        "@": join(__dirname, "src"),
        "@public": join(__dirname, "public"),
      },
    },
  },
};

export default nextConfig;
