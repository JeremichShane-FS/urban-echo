export const getEnvironment = () => {
  return {
    // Environment type
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",

    // Core URLs
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || fallbackForEnvironment(),
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    assetUrl: process.env.NEXT_PUBLIC_ASSET_URL,
    cdnUrl: process.env.NEXT_PUBLIC_CDN_URL,

    // Strapi CMS
    strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
    strapiToken: process.env.STRAPI_TOKEN,

    // Feature flags
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    enableAuth: process.env.NEXT_PUBLIC_ENABLE_AUTH === "true",
  };
};

function fallbackForEnvironment() {
  switch (process.env.NODE_ENV) {
    case "production":
      return "https://shopurbanecho.com";
    case "test":
      return "http://localhost:3000";
    default:
      return "http://localhost:3000";
  }
}
