/**
 * @fileoverview Next.js configuration for Urban Echo e-commerce platform
 * Configures image optimization, SASS compilation, path aliases, and performance settings
 * Optimized for e-commerce with product images, responsive design, and development experience
 */

/** @type {import('next').NextConfig} */
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// =================================================================
// PATH CONFIGURATION
// =================================================================
// ES module compatibility for __dirname in Node.js modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Next.js configuration object for Urban Echo e-commerce platform
 * @type {import('next').NextConfig}
 *
 * @description Comprehensive configuration covering:
 * - React strict mode for development quality
 * - SASS compilation with design system imports
 * - Image optimization for product photos and marketing assets
 * - Path aliases for clean imports and better developer experience
 * - Turbopack optimization for faster development builds
 *
 * @example
 * // Usage in components with configured path aliases:
 * import Button from '@/components/Button';
 * import styles from '@/styles/components/ProductCard.module.scss';
 */
const nextConfig = {
  // =================================================================
  // REACT CONFIGURATION
  // =================================================================
  /**
   * Enable React Strict Mode for enhanced development experience
   * Helps identify unsafe lifecycles, legacy API usage, and potential issues
   * @see https://react.dev/reference/react/StrictMode
   */
  reactStrictMode: true,

  // =================================================================
  // SASS CONFIGURATION
  // =================================================================
  /**
   * SASS compilation settings for design system integration
   * @description Configures SASS to work with our design system architecture
   */
  sassOptions: {
    /**
     * Include paths for SASS imports
     * Allows importing design system files from any component
     * @example @import 'variables'; // Resolves to src/assets/styles/variables.scss
     */
    includePaths: [
      join(__dirname, "src/assets/styles/"), // Design system styles
      join(__dirname, "src"), // Component-level styles
    ],

    /**
     * Global SASS imports available in all .scss files
     * Provides math functions for responsive calculations
     * @example .container { width: math.div(100%, 3); }
     */
    additionalData: `@use "sass:math";`,
  },

  // =================================================================
  // IMAGE OPTIMIZATION CONFIGURATION
  // =================================================================
  /**
   * Advanced image optimization for e-commerce product photos
   * @description Configures Next.js Image component for optimal performance
   * Supports multiple CDNs and formats for different use cases
   */
  images: {
    /**
     * Remote image patterns for external CDNs and services
     * Each pattern defines trusted sources for product images and assets
     */
    remotePatterns: [
      {
        // Unsplash for high-quality stock photography and hero images
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        // Placeholder service for development and testing
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        // Production CDN for optimized product images
        protocol: "https",
        hostname: "shopurbanecho.com",
        port: "",
        pathname: "/**",
      },
      {
        // Local development CMS (Strapi) for content management
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        // Production CMS for content and product image management
        protocol: "https",
        hostname: "cms.gourbanecho.com",
        pathname: "/uploads/**",
      },
    ],

    /**
     * Modern image formats for optimal performance and quality
     * AVIF provides better compression, WebP is widely supported fallback
     * @see https://nextjs.org/docs/api-reference/next/image#formats
     */
    formats: ["image/avif", "image/webp"],

    /**
     * Device-specific image sizes for responsive design
     * Optimized for common e-commerce device breakpoints
     * @description Covers mobile (640px), tablets (828px, 1080px),
     * desktops (1200px, 1920px), and high-DPI displays (2048px, 3840px)
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    /**
     * Icon and thumbnail sizes for UI components
     * Used for product thumbnails, avatars, and small imagery
     * @example Small product thumbnails (64px), cart items (96px), hero thumbnails (256px)
     */
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // =================================================================
  // TURBOPACK CONFIGURATION (DEVELOPMENT OPTIMIZATION)
  // =================================================================
  /**
   * Turbopack resolver aliases for clean imports and better DX
   * @description Enables absolute imports and consistent path resolution
   * Improves build performance and maintains clean import statements
   */
  turbopack: {
    /**
     * Path aliases for absolute imports throughout the application
     * @description Maps import aliases to actual file system paths
     * Uses specific aliases for better IDE support and explicit imports
     *
     * @example
     * // Specific aliases for organized imports:
     * import { Button } from '@design-system/buttons';
     * import { API_ENDPOINTS } from '@config/constants';
     * import { dbConnect } from '@lib/mongodb/client';
     * import logo from '@assets/images/logo.png';
     * import styles from '@styles/main.scss';
     */
    resolveAlias: {
      "@": join(__dirname, "src"),
      "@assets": join(__dirname, "src/assets"),
      "@config": join(__dirname, "src/config"),
      "@design-system": join(__dirname, "src/design-system"),
      "@lib": join(__dirname, "src/lib"),
      "@modules": join(__dirname, "src/modules"),
      "@styles": join(__dirname, "src/assets/styles"),
      "@utils": join(__dirname, "src/modules/core/utils"),
    },
  },
};

export default nextConfig;
