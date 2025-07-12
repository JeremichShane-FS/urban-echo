/**
 * @fileoverview Feature flags, environment detection, and A/B testing configurations for dynamic application behavior
 * Centralizes feature toggles, environment-specific settings, and experimental features for controlled rollouts
 * Supports role-based feature access, browser capability detection, and third-party integration management
 */

// =================================================================
// ENVIRONMENT CONFIGURATION
// =================================================================

/**
 * Environment identifiers and current environment detection
 * @constant {Object} ENVIRONMENTS - Available deployment environments
 * @constant {string} CURRENT_ENVIRONMENT - Currently active environment
 * @constant {boolean} IS_PRODUCTION - Production environment flag
 * @constant {boolean} IS_DEVELOPMENT - Development environment flag
 * @constant {boolean} IS_STAGING - Staging environment flag
 * @constant {boolean} IS_TEST - Test environment flag
 */
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

// =================================================================
// FEATURE FLAGS CONFIGURATION
// =================================================================

/**
 * Comprehensive feature flags with environment-based enablement for controlled feature rollouts
 * @constant {Object} FEATURES - Complete feature flag configuration
 *
 * @example
 * // Check if wishlist feature is enabled
 * if (FEATURES.WISHLIST.enabled) {
 *   renderWishlistButton();
 * }
 *
 * @example
 * // Get maximum items for wishlist
 * const maxItems = FEATURES.WISHLIST.maxItems;
 * if (wishlistItems.length >= maxItems) {
 *   showMaxItemsMessage();
 * }
 *
 * @example
 * // Environment-specific feature access
 * const showAnalytics = FEATURES.ANALYTICS.googleAnalytics;
 * if (showAnalytics) {
 *   initializeGoogleAnalytics();
 * }
 *
 * @example
 * // Payment provider configuration
 * const enabledProviders = FEATURES.EXPRESS_CHECKOUT.providers;
 * const paymentButtons = enabledProviders.map(provider => (
 *   <PaymentButton key={provider} provider={provider} />
 * ));
 *
 * @example
 * // Newsletter popup with conditional display
 * const shouldShowNewsletter = FEATURES.NEWSLETTER_POPUP.enabled &&
 *   !user.isSubscribed &&
 *   scrollPercentage > FEATURES.NEWSLETTER_POPUP.showOnScrollPercentage;
 */
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

// =================================================================
// ROLE-BASED ACCESS CONFIGURATION
// =================================================================

/**
 * Feature enabling overrides for specific user roles to provide early access and testing capabilities
 * @constant {Object} ROLE_FEATURE_OVERRIDES - Role-specific feature access overrides
 *
 * @example
 * // Apply role-based feature overrides
 * const getUserFeatures = (userRole, baseFeatures) => {
 *   const overrides = ROLE_FEATURE_OVERRIDES[userRole] || {};
 *   return { ...baseFeatures, ...overrides };
 * };
 *
 * @example
 * // Check if user has access to beta features
 * const userFeatures = getUserFeatures(user.role, FEATURES);
 * if (userFeatures.VIRTUAL_TRY_ON?.enabled) {
 *   showVirtualTryOnButton();
 * }
 */
export const ROLE_FEATURE_OVERRIDES = {
  admin: {
    VIRTUAL_TRY_ON: { enabled: true },
  },
  beta_tester: {
    AR_PRODUCT_VIEW: { enabled: true },
    VIRTUAL_TRY_ON: { enabled: true },
  },
};

// =================================================================
// BROWSER CAPABILITY DETECTION
// =================================================================

/**
 * Browser feature detection constants for progressive enhancement
 * @constant {Object} BROWSER_FEATURES - Available browser capabilities for feature detection
 *
 * @example
 * // Check for browser support before enabling features
 * const supportsWebP = checkBrowserSupport(BROWSER_FEATURES.WEBP_SUPPORT);
 * if (supportsWebP) {
 *   useWebPImages();
 * }
 *
 * @example
 * // Payment Request API feature detection
 * if (window.PaymentRequest && BROWSER_FEATURES.PAYMENT_REQUEST) {
 *   enableExpressCheckout();
 * }
 */
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

// =================================================================
// A/B TESTING CONFIGURATION
// =================================================================

/**
 * A/B testing variant configurations for experimental features and UI optimization
 * @constant {Object} AB_TEST_VARIANTS - A/B test configurations with variants and targeting
 *
 * @example
 * // Get user's assigned variant for product page layout
 * const variant = getABTestVariant(
 *   AB_TEST_VARIANTS.PRODUCT_PAGE_LAYOUT.name,
 *   AB_TEST_VARIANTS.PRODUCT_PAGE_LAYOUT.variants
 * );
 * renderProductPage(variant);
 *
 * @example
 * // Checkout flow A/B test implementation
 * const checkoutVariant = AB_TEST_VARIANTS.CHECKOUT_FLOW.defaultVariant;
 * if (AB_TEST_VARIANTS.CHECKOUT_FLOW.enabled) {
 *   checkoutVariant = getUserVariant(user.id, 'checkout_flow');
 * }
 * renderCheckoutFlow(checkoutVariant);
 */
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

// =================================================================
// THIRD-PARTY INTEGRATIONS
// =================================================================

/**
 * Third-party service integration configurations with environment-specific settings
 * @constant {Object} THIRD_PARTY_FEATURES - External service integration settings
 *
 * @example
 * // Initialize Google Analytics if enabled
 * if (THIRD_PARTY_FEATURES.GOOGLE_ANALYTICS.enabled) {
 *   initGA(THIRD_PARTY_FEATURES.GOOGLE_ANALYTICS.trackingId, {
 *     anonymizeIp: THIRD_PARTY_FEATURES.GOOGLE_ANALYTICS.anonymizeIp,
 *     enhancedEcommerce: THIRD_PARTY_FEATURES.GOOGLE_ANALYTICS.enhancedEcommerce
 *   });
 * }
 */
export const THIRD_PARTY_FEATURES = {
  GOOGLE_ANALYTICS: {
    enabled: IS_PRODUCTION || IS_STAGING,
    trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    anonymizeIp: true,
    enhancedEcommerce: true,
  },
};
