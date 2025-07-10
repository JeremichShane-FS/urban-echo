/**
 * @fileoverview SEO configuration and metadata management for Next.js application
 * Provides default SEO settings and utilities for generating page-specific metadata.
 * Supports Open Graph, Twitter Cards, and structured data for social sharing optimization.
 */

// =================================================================
// DEFAULT METADATA CONFIGURATION
// =================================================================

/**
 * Default metadata configuration for the entire application
 * Provides comprehensive SEO, social sharing, and PWA metadata settings
 * @constant {Object} defaultMetadata
 *
 * @example
 * // Used automatically in Next.js layout
 * export const metadata = defaultMetadata;
 *
 * @example
 * // Override specific properties
 * export const metadata = {
 *   ...defaultMetadata,
 *   title: "Custom Page Title | Urban Echo"
 * };
 */
export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shopurbanecho.com"),
  title: "Urban Echo | Modern Fashion E-Commerce",
  description:
    "Discover trendy, high-quality clothing at Urban Echo. Shop our curated collection of contemporary fashion for the modern, fashion-conscious consumer. Secure checkout, fast shipping, and exceptional customer service.",
  keywords: "fashion, clothing, urban style, modern apparel, online shopping, e-commerce",
  authors: [{ name: "Shane Jeremich", url: "https://shanejeremich.com" }],
  creator: "Shane Jeremich",
  publisher: "Urban Echo",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Urban Echo",
  },
  openGraph: {
    type: "website",
    url: "https://shopurbanecho.com",
    title: "Urban Echo | Modern Fashion E-Commerce",
    description:
      "Discover trendy, high-quality clothing at Urban Echo. Shop our curated collection of contemporary fashion.",
    siteName: "Urban Echo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Urban Echo - Modern Fashion E-Commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopurbanecho",
    creator: "@shanejeremich",
    title: "Urban Echo | Modern Fashion E-Commerce",
    description: "Discover trendy, high-quality clothing at Urban Echo.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://shopurbanecho.com",
    languages: {
      "en-US": "https://shopurbanecho.com",
    },
  },
};

// =================================================================
// METADATA GENERATION UTILITIES
// =================================================================

/**
 * Generates page-specific metadata by merging defaults with custom overrides
 * Automatically handles deep merging for nested objects like openGraph and twitter
 * @param {Object} [overrides={}] - Custom metadata to override defaults
 * @param {string} [overrides.title] - Custom page title
 * @param {string} [overrides.description] - Custom page description
 * @param {string} [overrides.keywords] - Custom SEO keywords
 * @param {Object} [overrides.openGraph] - Custom Open Graph data
 * @param {Object} [overrides.twitter] - Custom Twitter Card data
 * @param {Object} [overrides.alternates] - Custom alternate URLs
 * @returns {Object} Complete metadata object for the page
 *
 * @example
 * // Product page metadata
 * const productMeta = generatePageMetadata({
 *   title: "Classic Denim Jacket | Urban Echo",
 *   description: "Premium denim jacket with modern urban styling. Available in multiple sizes.",
 *   keywords: "denim jacket, urban fashion, outerwear, men's clothing",
 *   openGraph: {
 *     type: "product",
 *     images: [{
 *       url: "/products/jacket-hero.jpg",
 *       width: 1200,
 *       height: 630,
 *       alt: "Classic Denim Jacket - Urban Echo"
 *     }]
 *   },
 *   alternates: {
 *     canonical: "https://shopurbanecho.com/products/classic-denim-jacket"
 *   }
 * });
 *
 * @example
 * // Category page with SEO optimization
 * const categoryMeta = generatePageMetadata({
 *   title: "Men's Clothing Collection | Urban Echo",
 *   description: "Shop our complete collection of men's fashion including shirts, pants, and accessories.",
 *   keywords: "men's clothing, fashion, urban style, menswear, shirts, pants",
 *   openGraph: {
 *     images: [{ url: "/categories/mens-collection.jpg" }]
 *   },
 *   alternates: {
 *     canonical: "https://shopurbanecho.com/shop/mens"
 *   }
 * });
 *
 * @example
 * // Blog post with article-specific metadata
 * const blogMeta = generatePageMetadata({
 *   title: "Fashion Trends 2024 | Urban Echo Blog",
 *   description: "Discover the latest fashion trends for 2024 and how to incorporate them into your wardrobe.",
 *   keywords: "fashion trends 2024, style guide, urban fashion, contemporary clothing",
 *   openGraph: {
 *     type: "article",
 *     images: [{
 *       url: "/blog/trends-2024.jpg",
 *       width: 1200,
 *       height: 630,
 *       alt: "Fashion Trends 2024 Guide"
 *     }]
 *   },
 *   twitter: {
 *     title: "Fashion Trends 2024: Complete Style Guide",
 *     description: "The hottest fashion trends coming this year and how to wear them",
 *     images: ["/blog/trends-2024-twitter.jpg"]
 *   }
 * });
 *
 * @example
 * // Simple page with basic overrides
 * const aboutMeta = generatePageMetadata({
 *   title: "About Us | Urban Echo",
 *   description: "Learn about Urban Echo's mission to provide contemporary fashion for the modern consumer.",
 *   alternates: {
 *     canonical: "https://shopurbanecho.com/about"
 *   }
 * });
 */
export const generatePageMetadata = (overrides = {}) => {
  const metadata = { ...defaultMetadata, ...overrides };

  // Deep merge openGraph if provided
  if (overrides.openGraph) {
    metadata.openGraph = {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
    };
  }

  // Deep merge twitter if provided
  if (overrides.twitter) {
    metadata.twitter = {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
    };
  }

  // Deep merge alternates if provided
  if (overrides.alternates) {
    metadata.alternates = {
      ...defaultMetadata.alternates,
      ...overrides.alternates,
    };
  }

  return metadata;
};
