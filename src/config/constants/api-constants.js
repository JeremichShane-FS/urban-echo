/**
 * @fileoverview API endpoints, versions, and core configurations for the application with comprehensive service mapping
 * Centralizes all API endpoint definitions, HTTP configurations, caching strategies, and service configurations
 * Provides consistent API routing, error handling, and performance optimization across all application services
 */

/* eslint-disable sonarjs/no-duplicate-string */

// =================================================================
// BASE CONFIGURATION
// =================================================================

/**
 * Base URLs and API versioning configuration
 * @constant {string} API_BASE_URL - Primary API base URL
 * @constant {string} ASSET_BASE_URL - Static asset base URL
 * @constant {string} CDN_BASE_URL - CDN base URL for optimized content delivery
 * @constant {string} SITE_URL - Application site URL
 * @constant {string} API_VERSION - Current API version
 * @constant {string} LEGACY_API_VERSION - Legacy API version for backward compatibility
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const ASSET_BASE_URL = process.env.NEXT_PUBLIC_ASSET_URL;
export const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL;

export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SITE_URL || "https://shopurbanecho.com"
    : "http://localhost:3000";
export const API_VERSION = "v1";
export const LEGACY_API_VERSION = "v0";

// =================================================================
// API ENDPOINTS
// =================================================================

/**
 * Comprehensive API endpoints organized by functional area for consistent routing
 * @constant {Object} API_ENDPOINTS - Complete collection of API endpoint paths
 *
 * @example
 * // Product API calls using endpoints
 * const fetchProducts = async () => {
 *   const response = await fetch(`/api/${API_ENDPOINTS.products}`);
 *   return response.json();
 * };
 *
 * @example
 * // Dynamic endpoint building for categories
 * const getCategoryProducts = (categoryId) => {
 *   return `/api/${API_ENDPOINTS.productsByCategory}/${categoryId}`;
 * };
 *
 * @example
 * // User authentication flow
 * const authUrls = {
 *   login: `/api/${API_ENDPOINTS.login}`,
 *   register: `/api/${API_ENDPOINTS.register}`,
 *   logout: `/api/${API_ENDPOINTS.logout}`
 * };
 *
 * @example
 * // E-commerce cart operations
 * const cartOperations = {
 *   getCart: () => fetch(`/api/${API_ENDPOINTS.cart}`),
 *   addItem: (item) => fetch(`/api/${API_ENDPOINTS.cartItems}`, {
 *     method: 'POST',
 *     body: JSON.stringify(item)
 *   }),
 *   updateShipping: (data) => fetch(`/api/${API_ENDPOINTS.cartShipping}`, {
 *     method: 'PUT',
 *     body: JSON.stringify(data)
 *   })
 * };
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  login: "auth/login",
  register: "auth/register",
  logout: "auth/logout",
  refreshToken: "auth/refresh",
  forgotPassword: "auth/forgot-password",
  resetPassword: "auth/reset-password",
  verifyEmail: "auth/verify-email",

  // User endpoints
  me: "users/me",
  profile: "users/profile",
  addresses: "users/addresses",

  // Product endpoints
  products: "products",
  productsByCategory: "products/category",
  productsByCollection: "products/collection",
  productSearch: "products/search",
  featuredProducts: "products/featured",
  relatedProducts: "products/related",
  newArrivals: "products/new-arrivals",
  bestSellers: "products/best-sellers",

  // Category endpoints
  categories: "products/categories",
  subCategories: "products/categories/subcategories",

  // Collection endpoints
  collections: "products/collections",

  // Cart endpoints
  cart: "cart",
  cartItems: "cart/items",
  cartShipping: "cart/shipping",
  cartTaxes: "cart/taxes",
  cartPromo: "cart/promo",

  // Checkout endpoints
  checkout: "checkout",
  payment: "checkout/payment",
  paymentMethods: "checkout/payment-methods",
  shippingMethods: "checkout/shipping-methods",

  // Order endpoints
  orders: "orders",
  orderStatus: "orders/status",
  orderTracking: "orders/tracking",

  // Review endpoints
  reviews: "reviews",
  productReviews: "reviews/product",

  // Wishlist endpoints
  wishlist: "wishlist",

  // Content management endpoints
  content: "content",
  aboutContent: "content/about",
  heroContent: "content/hero",
  blog: "content/blog",
  pages: "content/pages",
  faq: "content/faq",

  // Store endpoints
  stores: "stores",
  storeLocator: "stores/locator",

  // Newsletter endpoints
  newsletter: "newsletter/subscribe",

  // Contact endpoints
  contact: "contact",

  // Inventory endpoints
  inventory: "inventory",

  // Search endpoints
  search: "search",
};

// =================================================================
// PERFORMANCE AND SECURITY CONFIGURATION
// =================================================================

/** @constant {number} API request timeout in milliseconds */
export const API_TIMEOUT = 30000; // 30 seconds

/**
 * Rate limiting configuration for API protection
 * @constant {Object} RATE_LIMIT
 * @property {number} maxRequests - Maximum requests allowed per time window
 * @property {number} timeWindow - Time window duration in milliseconds
 *
 * @example
 * // Check rate limit configuration
 * console.log(`Max ${RATE_LIMIT.maxRequests} requests per ${RATE_LIMIT.timeWindow}ms`);
 *
 * @example
 * // Apply rate limiting in middleware
 * if (requestCount > RATE_LIMIT.maxRequests) {
 *   return new Response('Rate limit exceeded', { status: 429 });
 * }
 */
export const RATE_LIMIT = {
  maxRequests: 100,
  timeWindow: 60 * 1000, // 1 minute
};

/**
 * Cache duration constants in milliseconds for performance optimization
 * @constant {Object} CACHE_DURATION
 * @property {number} short - Short-term cache (5 minutes)
 * @property {number} medium - Medium-term cache (30 minutes)
 * @property {number} long - Long-term cache (24 hours)
 * @property {number} veryLong - Extended cache (1 week)
 *
 * @example
 * // Set cache headers
 * res.setHeader('Cache-Control', `max-age=${CACHE_DURATION.medium / 1000}`);
 *
 * @example
 * // Cache configuration for API responses
 * const cacheConfig = {
 *   ttl: CACHE_DURATION.short,
 *   staleWhileRevalidate: CACHE_DURATION.medium
 * };
 */
export const CACHE_DURATION = {
  short: 5 * 60 * 1000, // 5 minutes
  medium: 30 * 60 * 1000, // 30 minutes
  long: 24 * 60 * 60 * 1000, // 24 hours
  veryLong: 7 * 24 * 60 * 60 * 1000, // 1 week
};

/**
 * Cache strategies for different endpoint types based on data volatility
 * @constant {Object} CACHE_STRATEGIES - Endpoint-specific caching durations
 *
 * @example
 * // Apply caching strategy to API call
 * const getCachedProducts = async () => {
 *   const cacheKey = 'products-list';
 *   const cached = cache.get(cacheKey);
 *
 *   if (cached) return cached;
 *
 *   const products = await fetchProducts();
 *   cache.set(cacheKey, products, CACHE_STRATEGIES.products);
 *   return products;
 * };
 */
export const CACHE_STRATEGIES = {
  products: CACHE_DURATION.medium,
  categories: CACHE_DURATION.long,
  search: CACHE_DURATION.short,
  cart: 0,
  user: 0,
  orders: CACHE_DURATION.short,
};

// =================================================================
// HTTP STANDARDS AND ERROR HANDLING
// =================================================================

/**
 * HTTP status codes for consistent response handling
 * @constant {Object} HTTP_STATUS - Standard HTTP status code definitions
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * Error type classifications for consistent error handling
 * @constant {Object} ERROR_TYPES - Categorized error types for proper handling
 *
 * @example
 * // Handle different error types appropriately
 * const handleApiError = (error, type) => {
 *   switch (type) {
 *     case ERROR_TYPES.AUTHENTICATION_ERROR:
 *       redirectToLogin();
 *       break;
 *     case ERROR_TYPES.VALIDATION_ERROR:
 *       showValidationErrors(error.details);
 *       break;
 *     case ERROR_TYPES.NOT_FOUND_ERROR:
 *       showNotFoundMessage();
 *       break;
 *     default:
 *       showGenericError();
 *   }
 * };
 */
export const ERROR_TYPES = {
  NETWORK_ERROR: "NETWORK_ERROR",
  API_ERROR: "API_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR",
  PAYMENT_ERROR: "PAYMENT_ERROR",
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
  RATE_LIMIT_ERROR: "RATE_LIMIT_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  CMS_ERROR: "CMS_ERROR",
};

/**
 * HTTP headers for API requests
 * @constant {Object} REQUEST_HEADERS - Standard HTTP headers
 */
export const REQUEST_HEADERS = {
  contentType: "Content-Type",
  authorization: "Authorization",
  accept: "Accept",
  cacheControl: "Cache-Control",
  contentLanguage: "Content-Language",
};

/**
 * Content type definitions for request/response formatting
 * @constant {Object} API_CONTENT_TYPES - MIME type definitions
 */
export const API_CONTENT_TYPES = {
  json: "application/json",
  formData: "multipart/form-data",
  urlEncoded: "application/x-www-form-urlencoded",
  text: "text/plain",
};

/**
 * Default pagination settings for consistent API responses
 * @constant {Object} DEFAULT_PAGINATION - Standard pagination configuration
 */
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
  totalPages: 1,
  totalItems: 0,
};

// =================================================================
// WEBHOOKS AND CORS CONFIGURATION
// =================================================================

/**
 * Webhook event types for system integration
 * @constant {Object} WEBHOOK_EVENTS - Available webhook event types
 *
 * @example
 * // Register webhook handler
 * const handleOrderCreated = (orderData) => {
 *   console.log(`Order created: ${orderData.id}`);
 *   sendNotification(WEBHOOK_EVENTS.ORDER_CREATED, orderData);
 * };
 */
export const WEBHOOK_EVENTS = {
  ORDER_CREATED: "order.created",
  ORDER_UPDATED: "order.updated",
  ORDER_CANCELLED: "order.cancelled",
  PAYMENT_SUCCEEDED: "payment.succeeded",
  PAYMENT_FAILED: "payment.failed",
  PRODUCT_CREATED: "product.created",
  PRODUCT_UPDATED: "product.updated",
  PRODUCT_DELETED: "product.deleted",
  INVENTORY_LOW: "inventory.low",
  USER_REGISTERED: "user.registered",
};

/**
 * CORS configuration templates for different API access patterns
 * @constant {Object} API_CORS_CONFIGS - CORS configuration presets
 *
 * @example
 * // Apply CORS config to API route
 * export async function OPTIONS() {
 *   return createCorsResponse(API_CORS_CONFIGS.GET_ONLY);
 * }
 *
 * @example
 * // Public API with limited access
 * const corsHeaders = getCorsHeaders(API_CORS_CONFIGS.PUBLIC_API);
 */
export const API_CORS_CONFIGS = {
  GET_ONLY: {
    methods: ["GET", "OPTIONS"],
    headers: ["Content-Type"],
  },
  READ_WRITE: {
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    headers: ["Content-Type", "Authorization"],
  },
  CONTENT_MANAGEMENT: {
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    headers: ["Content-Type", "Authorization"],
  },
  PUBLIC_API: {
    methods: ["GET", "POST", "OPTIONS"],
    headers: ["Content-Type"],
  },
  ERROR_REPORTING: {
    methods: ["POST", "OPTIONS"],
    headers: ["Content-Type"],
  },
};
