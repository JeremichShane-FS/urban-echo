/**
 * @fileoverview API utility constants for validation, formatting, and data processing with comprehensive patterns
 * Contains validation patterns, limits, sort options, templates, and helper constants for API operations
 * Supports input validation, response formatting, and data processing across all API endpoints
 */

/* eslint-disable sonarjs/no-duplicate-string */

// =================================================================
// VALIDATION PATTERNS
// =================================================================

/**
 * Regular expression patterns for API data validation
 * @constant {Object} API_VALIDATION_PATTERNS - Validation regex patterns
 *
 * @example
 * // Validate MongoDB ObjectId
 * const isValidObjectId = (id) =>
 *   API_VALIDATION_PATTERNS.MONGODB_OBJECT_ID.test(id);
 *
 * @example
 * // Validate product slug format
 * const isValidSlug = (slug) =>
 *   API_VALIDATION_PATTERNS.PRODUCT_SLUG.test(slug);
 *
 * @example
 * // Price validation in form submission
 * const validatePrice = (price) => {
 *   if (!API_VALIDATION_PATTERNS.PRICE.test(price)) {
 *     return 'Invalid price format';
 *   }
 *   return null;
 * };
 */
export const API_VALIDATION_PATTERNS = {
  MONGODB_OBJECT_ID: /^[\dA-Fa-f]{24}$/,
  PRODUCT_SLUG: /^[\da-z]+(?:-[\da-z]+)*$/,
  CATEGORY_SLUG: /^[\da-z]+(?:-[\da-z]+)*$/,
  EMAIL_BASIC: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PRICE: /^\d+(\.\d{1,2})?$/,
  HEX_COLOR: /^#([\dA-Fa-f]{6}|[\dA-Fa-f]{3})$/,
  SIZE: /^(xxs|xs|s|m|l|xl|xxl|xxxl|\d+)$/i,
};

// =================================================================
// REQUEST LIMITS AND VALIDATION
// =================================================================

/**
 * API request and response limits for performance and security
 * @constant {Object} API_VALIDATION_LIMITS - Maximum limits for API operations
 *
 * @example
 * // Validate pagination limit
 * const validateLimit = (limit) => {
 *   if (limit > API_VALIDATION_LIMITS.MAX_PRODUCTS_PER_REQUEST) {
 *     throw new Error(`Limit cannot exceed ${API_VALIDATION_LIMITS.MAX_PRODUCTS_PER_REQUEST}`);
 *   }
 * };
 *
 * @example
 * // Search query validation
 * const validateSearchQuery = (query) => {
 *   if (query.length > API_VALIDATION_LIMITS.MAX_SEARCH_QUERY_LENGTH) {
 *     return 'Search query too long';
 *   }
 *   if (query.length < API_VALIDATION_LIMITS.MIN_SEARCH_QUERY_LENGTH) {
 *     return 'Search query too short';
 *   }
 *   return null;
 * };
 */
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

// =================================================================
// SORTING CONFIGURATIONS
// =================================================================

/**
 * Sorting options for different API endpoints with endpoint-specific configurations
 * @constant {Object} API_SORT_OPTIONS - Available sort options by endpoint type
 *
 * @example
 * // Validate sort option for products endpoint
 * const validateProductSort = (sortBy) => {
 *   if (!API_SORT_OPTIONS.PRODUCTS.includes(sortBy)) {
 *     throw new Error(`Invalid sort option: ${sortBy}`);
 *   }
 * };
 *
 * @example
 * // Generate sort dropdown for search
 * const SearchSortDropdown = () => (
 *   <select>
 *     {API_SORT_OPTIONS.SEARCH.map(option => (
 *       <option key={option} value={option}>
 *         {option.replace('-', ' ').toUpperCase()}
 *       </option>
 *     ))}
 *   </select>
 * );
 */
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

// =================================================================
// DATABASE FIELD SELECTIONS
// =================================================================

/**
 * MongoDB field selection templates for optimized database queries
 * @constant {Object} FIELD_SELECTIONS - Field selection configurations for different use cases
 *
 * @example
 * // Use minimal fields for search results
 * const products = await Product.find(query)
 *   .select(FIELD_SELECTIONS.MINIMAL)
 *   .limit(20);
 *
 * @example
 * // Use listing fields for product catalog
 * const catalogProducts = await Product.find({ isActive: true })
 *   .select(FIELD_SELECTIONS.LISTING)
 *   .sort({ createdAt: -1 });
 */
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

// =================================================================
// API RESPONSE MESSAGES AND TEMPLATES
// =================================================================

/**
 * Standard API response messages for consistent user communication
 * @constant {Object} API_RESPONSE_MESSAGES - Standardized response messages
 *
 * @example
 * // Success response with standard message
 * return createSuccessResponse(data, {
 *   message: API_RESPONSE_MESSAGES.SUCCESS.DATA_RETRIEVED
 * });
 *
 * @example
 * // Validation error with dynamic field
 * const fieldError = API_RESPONSE_MESSAGES.VALIDATION.REQUIRED_FIELD('email');
 * return createErrorResponse(fieldError);
 */
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

/**
 * API response metadata templates for consistent response formatting
 * @constant {Object} API_META_TEMPLATES - Response metadata generators
 *
 * @example
 * // Basic endpoint metadata
 * const meta = API_META_TEMPLATES.BASIC('/api/products');
 *
 * @example
 * // Paginated response metadata
 * const meta = API_META_TEMPLATES.PAGINATED('/api/products', {
 *   page: 1, limit: 20, total: 100
 * });
 *
 * @example
 * // Search result metadata
 * const meta = API_META_TEMPLATES.SEARCH('/api/search', 'jacket', {
 *   category: 'men'
 * }, { page: 1, limit: 12 });
 */
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

// =================================================================
// FALLBACK DATA AND CONFIGURATIONS
// =================================================================

/**
 * Fallback data for when external services are unavailable
 * @constant {Object} API_FALLBACK_DATA - Default content when services fail
 *
 * @example
 * // Use fallback when CMS is down
 * const getHeroContent = async () => {
 *   try {
 *     return await fetchFromCMS('hero-content');
 *   } catch (error) {
 *     return API_FALLBACK_DATA.HERO;
 *   }
 * };
 */
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

// =================================================================
// CONFIGURATION CONSTANTS
// =================================================================

/**
 * Required fields for different API operations
 * @constant {Object} API_REQUIRED_FIELDS - Required field configurations
 */
export const API_REQUIRED_FIELDS = {
  NEWSLETTER_SUBSCRIBE: ["email"],
  PRODUCT_DETAIL: ["id"],
  RELATED_PRODUCTS: ["productId"],
  CONTENT_UPDATE: ["title"],
};

/**
 * Content variant types for CMS flexibility
 * @constant {Object} API_CONTENT_VARIANTS - Available content variants
 */
export const API_CONTENT_VARIANTS = {
  HERO: ["default", "holiday", "sale", "seasonal", "featured"],
  ABOUT: ["homepage", "company", "mission", "team"],
  PAGE_CONFIG: ["homepage", "shop", "product", "category"],
};
