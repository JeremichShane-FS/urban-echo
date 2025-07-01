/* eslint-disable unicorn/no-empty-file */
/**
 * SEO
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

export const generatePageMetadata = (overrides = {}) => ({
  ...defaultMetadata,
  ...overrides,
});
