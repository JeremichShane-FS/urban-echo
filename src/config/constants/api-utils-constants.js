/* eslint-disable sonarjs/no-duplicate-string */
/**
 * @fileoverview API utility constants for validation, formatting, and data processing.
 * This file contains validation patterns, limits, sort options, templates, and helper constants.
 * For core API endpoints and configuration, see api-constants.js
 */

// Validation patterns for API data
export const API_VALIDATION_PATTERNS = {
  // MongoDB ObjectId pattern
  MONGODB_OBJECT_ID: /^[\dA-Fa-f]{24}$/,

  // Product slug pattern (lowercase, hyphens, numbers)
  PRODUCT_SLUG: /^[\da-z]+(?:-[\da-z]+)*$/,

  // Category slug pattern
  CATEGORY_SLUG: /^[\da-z]+(?:-[\da-z]+)*$/,

  // Basic email pattern (more thorough validation in validators.js)
  EMAIL_BASIC: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Price pattern (allows decimals)
  PRICE: /^\d+(\.\d{1,2})?$/,

  // Color hex code pattern
  HEX_COLOR: /^#([\dA-Fa-f]{6}|[\dA-Fa-f]{3})$/,

  // Size pattern (S, M, L, XL, XXL, numbers)
  SIZE: /^(xxs|xs|s|m|l|xl|xxl|xxxl|\d+)$/i,
};

// API request and response limits
export const API_VALIDATION_LIMITS = {
  // Product endpoints
  MAX_PRODUCTS_PER_REQUEST: 100,
  MAX_FEATURED_PRODUCTS: 50,
  MAX_NEW_ARRIVALS: 100,
  MAX_BEST_SELLERS: 50,
  MAX_RELATED_PRODUCTS: 20,
  MAX_SEARCH_RESULTS: 100,

  // Content limits
  MAX_SEARCH_QUERY_LENGTH: 200,
  MIN_SEARCH_QUERY_LENGTH: 1,
  MAX_CATEGORY_NAME_LENGTH: 50,
  MAX_BRAND_NAME_LENGTH: 50,

  // CMS content limits
  MAX_TITLE_LENGTH: 100,
  MAX_SUBTITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_CTA_TEXT_LENGTH: 50,
};

// Sorting options for different endpoints
export const API_SORT_OPTIONS = {
  PRODUCTS: [
    "relevance",
    "price-low",
    "price-high",
    "rating",
    "newest",
    "oldest",
    "popularity",
    "name-asc",
    "name-desc",
  ],
  SEARCH: ["relevance", "price-low", "price-high", "rating", "newest", "oldest"],
  FEATURED: ["rating", "newest", "popularity", "price-low", "price-high"],
  NEW_ARRIVALS: ["newest", "oldest", "price-low", "price-high", "rating"],
  BEST_SELLERS: ["popularity", "rating", "newest", "price-low", "price-high"],
};

// MongoDB field selection templates for optimized queries
export const FIELD_SELECTIONS = {
  MINIMAL: {
    name: 1,
    slug: 1,
    price: 1,
    images: 1,
  },
  LISTING: {
    name: 1,
    slug: 1,
    price: 1,
    compareAtPrice: 1,
    category: 1,
    subcategory: 1,
    brand: 1,
    images: 1,
    variants: 1,
    isFeatured: 1,
    isNewArrival: 1,
    isBestSeller: 1,
    averageRating: 1,
    reviewCount: 1,
    salesCount: 1,
    tags: 1,
    isActive: 1,
    description: 1,
    createdAt: 1,
    updatedAt: 1,
  },
  DETAIL: {
    // (empty object = include all fields)
  },
};

// Standard API response messages
export const API_RESPONSE_MESSAGES = {
  SUCCESS: {
    DATA_RETRIEVED: "Data retrieved successfully",
    NEWSLETTER_SUBSCRIBED: "Successfully subscribed to newsletter!",
    CONTENT_FETCHED: "Content retrieved successfully",
  },

  ERROR: {
    VALIDATION_FAILED: "Validation failed",
    PRODUCT_NOT_FOUND: "Product not found",
    CONTENT_NOT_FOUND: "Content not found",
    CMS_UNAVAILABLE: "Content management system is unavailable",
    NEWSLETTER_FAILED: "Failed to subscribe to newsletter",
    INVALID_EMAIL: "Please enter a valid email address",
    RATE_LIMIT_EXCEEDED: "Rate limit exceeded. Please try again later",
  },

  VALIDATION: {
    REQUIRED_FIELD: field => `${field} is required`,
    INVALID_FORMAT: field => `${field} has invalid format`,
    TOO_LONG: (field, max) => `${field} cannot exceed ${max} characters`,
    TOO_SHORT: (field, min) => `${field} must be at least ${min} characters`,
    LIMIT_EXCEEDED: max => `Limit cannot exceed ${max} items per request`,
    INVALID_PRICE_RANGE: "Minimum price cannot be greater than maximum price",
    INVALID_SORT: allowed => `Sort must be one of: ${allowed.join(", ")}`,
  },
};

// API response metadata templates
export const API_META_TEMPLATES = {
  BASIC: endpoint => ({
    endpoint,
    timestamp: new Date().toISOString(),
  }),

  PAGINATED: (endpoint, pagination) => ({
    endpoint,
    pagination,
    timestamp: new Date().toISOString(),
  }),

  PRODUCT: (endpoint, filters = {}, source = "mongodb") => ({
    endpoint,
    source,
    filters,
    timestamp: new Date().toISOString(),
  }),

  CONTENT: (endpoint, contentType, source = "strapi") => ({
    endpoint,
    contentType,
    source,
    timestamp: new Date().toISOString(),
  }),

  SEARCH: (endpoint, query, filters = {}, pagination = {}) => ({
    endpoint,
    searchQuery: query,
    filters,
    pagination,
    timestamp: new Date().toISOString(),
  }),

  ERROR: (endpoint, errorType, details = {}) => ({
    endpoint,
    errorType,
    details,
    timestamp: new Date().toISOString(),
  }),
};

// Fallback data for when external services are unavailable
export const API_FALLBACK_DATA = {
  HERO: {
    title: "Discover Your Style",
    subtitle: "Premium fashion for the modern lifestyle",
    description: "Explore our curated collection of contemporary fashion",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    variant: "default",
    isActive: true,
  },
  ABOUT: {
    title: "About Urban Echo",
    description: "Contemporary style and conscious living",
    mission: "Provide high-quality, sustainable fashion that empowers personal expression",
    vision: "A world where fashion is both beautiful and responsible",
    values: ["Quality", "Sustainability", "Style", "Innovation"],
    isActive: true,
  },
  PAGE_CONFIG: {
    seoTitle: "Urban Echo | Modern Fashion E-Commerce",
    seoDescription:
      "Discover trendy, high-quality clothing at Urban Echo. Shop our curated collection of contemporary fashion.",
    showFeaturedProducts: true,
    showNewArrivals: true,
    showNewsletter: true,
    showAboutSection: true,
    showTestimonials: true,
    showCategories: true,
    maxFeaturedProducts: 8,
    maxNewArrivals: 8,
  },
};

// Required fields for different API operations
export const API_REQUIRED_FIELDS = {
  NEWSLETTER_SUBSCRIBE: ["email"],
  PRODUCT_DETAIL: ["id"],
  RELATED_PRODUCTS: ["productId"],
  CONTENT_UPDATE: ["title"],
};

// Content variant types for CMS
export const API_CONTENT_VARIANTS = {
  HERO: ["default", "holiday", "sale", "seasonal", "featured"],
  ABOUT: ["homepage", "company", "mission", "team"],
  PAGE_CONFIG: ["homepage", "shop", "product", "category"],
};
