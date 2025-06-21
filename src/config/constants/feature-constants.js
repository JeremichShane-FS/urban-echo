/**
 * @fileoverview This file contains constants related to feature flags, environment detection, and A/B testing configurations.
 * It serves as a centralized location for managing all feature-related constants used in the application.
 */

// Environment detection
export const ENVIRONMENTS = {
  DEVELOPMENT: "development",
  STAGING: "staging",
  PRODUCTION: "production",
  TEST: "test",
};

export const CURRENT_ENVIRONMENT = process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT;
export const IS_PRODUCTION = CURRENT_ENVIRONMENT === ENVIRONMENTS.PRODUCTION;
export const IS_DEVELOPMENT = CURRENT_ENVIRONMENT === ENVIRONMENTS.DEVELOPMENT;
export const IS_STAGING = CURRENT_ENVIRONMENT === ENVIRONMENTS.STAGING;
export const IS_TEST = CURRENT_ENVIRONMENT === ENVIRONMENTS.TEST;

// Feature flags
export const FEATURES = {
  // Core features
  WISHLIST: {
    enabled: true,
    maxItems: 50,
  },

  PRODUCT_REVIEWS: {
    enabled: true,
    requireVerifiedPurchase: false,
    moderateReviews: true,
  },

  SIZE_GUIDE: {
    enabled: true,
    showMeasurementUnit: true,
  },

  PRODUCT_RECOMMENDATIONS: {
    enabled: true,
    algorithmsEnabled: IS_PRODUCTION,
    count: 4,
  },

  SEARCH: {
    enabled: true,
    autocompleteEnabled: true,
    fuzzySearchEnabled: true,
    synonymsEnabled: true,
    maxSearchResults: 20,
  },

  // Advanced features
  GUEST_CHECKOUT: {
    enabled: true,
  },

  ACCOUNT_BENEFITS: {
    enabled: true,
    signupDiscount: true,
    signupDiscountAmount: 10,
  },

  MULTI_CURRENCY: {
    enabled: IS_PRODUCTION || IS_STAGING,
    dynamicRates: IS_PRODUCTION,
  },

  MULTI_LANGUAGE: {
    enabled: IS_PRODUCTION || IS_STAGING,
  },

  DARK_MODE: {
    enabled: true,
    respectSystemPreference: true,
  },

  // Payment features
  EXPRESS_CHECKOUT: {
    enabled: true,
    providers: ["paypal", "apple-pay", "google-pay"],
  },

  SAVED_PAYMENT_METHODS: {
    enabled: IS_PRODUCTION || IS_STAGING,
    maxSavedMethods: 3,
  },

  PROMO_CODES: {
    enabled: true,
    stackablePromosEnabled: false,
    maxPromosPerOrder: 1,
  },

  GIFT_CARDS: {
    enabled: true,
    sendableGiftCards: true,
  },

  // User experience features
  ADVANCED_FILTERS: {
    enabled: true,
    priceRangeFilter: true,
    colorFilter: true,
    sizeFilter: true,
    brandFilter: true,
    ratingFilter: true,
  },

  PRODUCT_ZOOM: {
    enabled: true,
    hoverZoom: true,
  },

  COLOR_SWATCHES: {
    enabled: true,
    showColorNames: true,
  },

  RECENTLY_VIEWED: {
    enabled: true,
    count: 6,
  },

  SIZE_OUT_OF_STOCK_BEHAVIOR: {
    enabled: true,
    showOutOfStockSizes: true,
    crossedOutStyle: true,
    notifyWhenAvailable: true,
  },

  NEWSLETTER_POPUP: {
    enabled: IS_PRODUCTION,
    delay: 5000,
    showOncePerVisit: true,
    showOnScrollPercentage: 30,
    dontShowToSubscribers: true,
  },

  // Marketing features
  SOCIAL_SHARING: {
    enabled: true,
    platforms: ["facebook", "twitter", "pinterest", "email"],
  },

  ANALYTICS: {
    googleAnalytics: IS_PRODUCTION || IS_STAGING,
    custmoreAnalytics: true,
    productImpressions: true,
    productClicks: true,
    addToCart: true,
    checkout: true,
    purchase: true,
  },

  // Performance features
  IMAGE_OPTIMIZATION: {
    enabled: true,
    lazyLoading: true,
    responsiveImages: true,
    webpSupport: true,
  },

  CACHING: {
    productCaching: true,
    categoryCaching: true,
    contentCaching: true,
  },

  // Region-specific features
  US_FEATURES: {
    enabled: true,
    zipCodeLookup: true,
    taxCalculation: true,
  },

  EU_FEATURES: {
    enabled: true,
    gdprCompliance: true,
    cookieConsent: true,
    vatCalculation: true,
  },

  // Beta features
  AR_PRODUCT_VIEW: {
    enabled: IS_DEVELOPMENT || IS_STAGING,
    supportedDevices: ["ios", "android-arcore"],
  },

  VIRTUAL_TRY_ON: {
    enabled: false, // Coming soon
    supportedCategories: ["sunglasses", "hats"],
  },

  LIVE_CHAT: {
    enabled: IS_PRODUCTION,
    hours: {
      start: 9, // 9 AM
      end: 17, // 5 PM
      timezone: "America/New_York",
    },
    offlineFormEnabled: true,
  },

  INVENTORY_DISPLAY: {
    enabled: true,
    showExactCount: false,
    lowStockThreshold: 5,
    lowStockMessage: "Only {count} left!",
  },
};

// Feature enabling overrides for specific user roles
export const ROLE_FEATURE_OVERRIDES = {
  admin: {
    VIRTUAL_TRY_ON: { enabled: true },
  },
  beta_tester: {
    AR_PRODUCT_VIEW: { enabled: true },
    VIRTUAL_TRY_ON: { enabled: true },
  },
};

// Feature detection
export const BROWSER_FEATURES = {
  WEBP_SUPPORT: "webp",
  AVIF_SUPPORT: "avif",
  INTERSECTION_OBSERVER: "intersection-observer",
  PAYMENT_REQUEST: "payment-request",
  LOCAL_STORAGE: "local-storage",
  SESSION_STORAGE: "session-storage",
  SERVICE_WORKER: "service-worker",
  WEBGL: "webgl",
  TOUCH: "touch",
  POINTER_EVENTS: "pointer-events",
};

// A/B testing
export const AB_TEST_VARIANTS = {
  PRODUCT_PAGE_LAYOUT: {
    name: "product_page_layout",
    variants: ["default", "variant_a", "variant_b"],
    defaultVariant: "default",
    enabled: IS_PRODUCTION && !IS_TEST,
  },
  CHECKOUT_FLOW: {
    name: "checkout_flow",
    variants: ["single_page", "multi_step"],
    defaultVariant: "multi_step",
    enabled: IS_STAGING,
  },
  HOMEPAGE_HERO: {
    name: "homepage_hero",
    variants: ["video", "carousel", "static"],
    defaultVariant: "carousel",
    enabled: IS_PRODUCTION && !IS_TEST,
  },
};

// Third party integrations
export const THIRD_PARTY_FEATURES = {
  GOOGLE_ANALYTICS: {
    enabled: IS_PRODUCTION || IS_STAGING,
    trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    anonymizeIp: true,
    enhancedEcommerce: true,
  },
};
