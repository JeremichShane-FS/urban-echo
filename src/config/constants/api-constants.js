/**
 * @fileoverview This file contains constants related to API endpoints, versions, and configurations.
 * It serves as a centralized location for managing all API-related constants used in the application.
 */

// Base URLs
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const ASSET_BASE_URL = process.env.NEXT_PUBLIC_ASSET_URL;
export const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// API versions
export const API_VERSION = "v1";
export const LEGACY_API_VERSION = "v0";

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  login: "auth/login",
  register: "auth/register",
  logout: "auth/logout",
  refreshToken: "auth/refresh",
  forgotPassword: "auth/forgot-password",
  resetPassword: "auth/reset-password",
  verifyEmail: "auth/verify-email",

  // User
  me: "users/me",
  profile: "users/profile",
  addresses: "users/addresses",

  // Products
  products: "products",
  productsByCategory: "products/category",
  productsByCollection: "products/collection",
  productSearch: "products/search",
  featuredProducts: "products/featured",
  relatedProducts: "products/related",
  newArrivals: "products/new-arrivals",
  bestSellers: "products/best-sellers",

  // Categories
  categories: "categories",
  subCategories: "subcategories",

  // Collections
  collections: "collections",

  // Cart
  cart: "cart",
  cartItems: "cart/items",
  cartShipping: "cart/shipping",
  cartTaxes: "cart/taxes",
  cartPromo: "cart/promo",

  // Checkout
  checkout: "checkout",
  payment: "checkout/payment",
  paymentMethods: "checkout/payment-methods",
  shippingMethods: "checkout/shipping-methods",

  // Orders
  orders: "orders",
  orderStatus: "orders/status",
  orderTracking: "orders/tracking",

  // Reviews
  reviews: "reviews",
  productReviews: "reviews/product",

  // Wishlist
  wishlist: "wishlist",

  // Content management
  content: "content",
  aboutContent: "content/about",
  heroContent: "content/hero",
  blog: "content/blog",
  pages: "content/pages",
  faq: "content/faq",

  // Store
  stores: "stores",
  storeLocator: "stores/locator",

  // Newsletter
  newsletter: "newsletter/subscribe",

  // Contact
  contact: "contact",

  // Inventory
  inventory: "inventory",

  // Search
  search: "search",
};

// Request timeout (ms)
export const API_TIMEOUT = 30000; // 30 seconds

// Rate limits
export const RATE_LIMIT = {
  maxRequests: 100,
  timeWindow: 60 * 1000, // 1 minute
};

// Cache durations (ms)
export const CACHE_DURATION = {
  short: 5 * 60 * 1000, // 5 minutes
  medium: 30 * 60 * 1000, // 30 minutes
  long: 24 * 60 * 60 * 1000, // 24 hours
  veryLong: 7 * 24 * 60 * 60 * 1000, // 1 week
};

// Default cache strategy for different endpoints
export const CACHE_STRATEGIES = {
  products: CACHE_DURATION.medium,
  categories: CACHE_DURATION.long,
  search: CACHE_DURATION.short,
  cart: 0,
  user: 0,
  orders: CACHE_DURATION.short,
};

// HTTP status codes
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
  SERVICE_UNAVAILABLE: 503,
};

// Error types
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
};

// Headers
export const REQUEST_HEADERS = {
  contentType: "Content-Type",
  authorization: "Authorization",
  accept: "Accept",
  cacheControl: "Cache-Control",
  contentLanguage: "Content-Language",
};

export const API_CONTENT_TYPES = {
  json: "application/json",
  formData: "multipart/form-data",
  urlEncoded: "application/x-www-form-urlencoded",
  text: "text/plain",
};

// Default pagination
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
  totalPages: 1,
  totalItems: 0,
};

// Webhook events
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
