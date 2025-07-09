/**
 * @fileoverview Hero content API endpoint for fetching and transforming hero section content
 * Handles variant-specific content retrieval from Strapi CMS with image processing,
 * supports multiple content variants and batch operations for hero section management
 */

import { API_ENDPOINTS, API_FALLBACK_DATA, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/utils";
import {
  createCorsResponse,
  createErrorResponse,
  createSuccessResponse,
  fetchFromStrapi,
  handleStrapiNotFound,
  processImageUrl,
  transformContentWithFallbacks,
} from "@modules/core/utils/api";

// =================================================================
// CONFIGURATION CONSTANTS
// =================================================================

/**
 * Hero content API configuration
 * @constant {string} ERROR_SOURCE - Error tracking source identifier
 * @constant {Object} HERO_FALLBACKS - Fallback data for content failures
 */
const ERROR_SOURCE = "hero-content-api";
const HERO_FALLBACKS = API_FALLBACK_DATA.HERO;

// =================================================================
// UTILITY FUNCTIONS
// =================================================================

/**
 * Builds Strapi endpoint URL based on variant and request type
 * @param {string} variant - Content variant (default, holiday, sale, seasonal)
 * @param {string} endpoint - Request type ("variants" for all variants)
 * @returns {string} Formatted Strapi endpoint URL with appropriate filters
 *
 * @example
 * // Get all variants except default
 * const endpoint = buildStrapiEndpoint('default', 'variants');
 * // Returns: "hero-contents?populate=*&filters[variant][$ne]=default"
 *
 * @example
 * // Get specific variant
 * const endpoint = buildStrapiEndpoint('holiday', null);
 * // Returns: "hero-contents?populate=*&filters[variant][$eq]=holiday"
 */
function buildStrapiEndpoint(variant, endpoint) {
  if (endpoint === "variants") {
    return "hero-contents?populate=*&filters[variant][$ne]=default";
  } else if (variant !== "default") {
    return `hero-contents?populate=*&filters[variant][$eq]=${variant}`;
  }
  return "hero-contents?populate=*";
}

/**
 * Transforms hero content with image processing and fallback handling
 * @param {Object|Array} content - Raw content from Strapi (single item or array)
 * @param {string} strapiUrl - Base Strapi URL for image processing
 * @param {boolean} isArray - Whether content is an array of variants
 * @returns {Object|Array} Transformed content with processed image URLs
 *
 * @example
 * // Transform single hero content
 * const transformed = transformHeroContent(singleContent, strapiUrl, false);
 *
 * @example
 * // Transform array of variants
 * const transformed = transformHeroContent(variantArray, strapiUrl, true);
 */
function transformHeroContent(content, strapiUrl, isArray = false) {
  const STRAPI_URL = strapiUrl || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  if (isArray) {
    return content.map(item => transformSingleHeroContent(item, STRAPI_URL));
  }

  return transformSingleHeroContent(content, STRAPI_URL);
}

/**
 * Transforms a single hero content item with image processing
 * @param {Object} content - Single hero content item from Strapi
 * @param {string} strapiUrl - Base Strapi URL for image processing
 * @returns {Object} Transformed hero content with processed background image
 *
 * @example
 * // Transform single item with image processing
 * const item = transformSingleHeroContent(rawContent, 'https://cms.example.com');
 * // Returns content with processed backgroundImage URL
 */
function transformSingleHeroContent(content, strapiUrl) {
  const transformed = transformContentWithFallbacks(content, HERO_FALLBACKS);
  transformed.backgroundImage = processImageUrl(content.backgroundImage, strapiUrl);
  return transformed;
}

// =================================================================
// API ROUTE HANDLERS
// =================================================================

/**
 * GET /api/content/hero - Retrieve hero section content with variant support
 * @param {Request} request - Next.js API request object with URL search parameters
 * @returns {Promise<Response>} JSON response with hero content and metadata
 * @throws {ValidationError} When variant parameter is invalid
 * @throws {NotFoundError} When requested variant is not found
 * @throws {ServerError} When Strapi CMS is unavailable or returns error
 *
 * @typedef {Object} HeroSearchParams
 * @property {string} [variant=default] - Content variant (default, holiday, sale, seasonal)
 * @property {string} [endpoint] - Use "variants" to get all available variants
 *
 * @typedef {Object} HeroContent
 * @property {string} title - Hero section main title
 * @property {string} subtitle - Hero section subtitle text
 * @property {string} description - Hero section description content
 * @property {string} ctaText - Call-to-action button text
 * @property {string} ctaLink - Call-to-action button destination URL
 * @property {string} variant - Content variant identifier
 * @property {boolean} isActive - Whether content variant is currently active
 * @property {string|null} backgroundImage - Processed background image URL
 * @property {string} lastUpdated - ISO timestamp of last content update
 *
 * @typedef {Object} HeroResponse
 * @property {HeroContent|HeroContent[]} data - Hero content or array of variants
 * @property {Object} meta - Response metadata and context
 * @property {string} meta.endpoint - API endpoint that served the request
 * @property {string} meta.variant - Requested variant identifier
 * @property {string} meta.requestType - Type of request (single|variants)
 * @property {string} meta.lastUpdated - ISO timestamp of content update
 *
 * @example
 * // Get default hero content
 * GET /api/content/hero
 * // Returns default variant hero content
 *
 * @example
 * // Get specific seasonal variant
 * GET /api/content/hero?variant=holiday
 * // Returns holiday-themed hero content
 *
 * @example
 * // Get all available variants for management
 * GET /api/content/hero?endpoint=variants
 * // Returns array of all non-default variants
 *
 * @example
 * // Successful single variant response
 * {
 *   "data": {
 *     "title": "Welcome to Urban Echo",
 *     "subtitle": "Premium Fashion Collection 2024",
 *     "description": "Discover our latest trends and timeless pieces...",
 *     "ctaText": "Shop New Collection",
 *     "ctaLink": "/shop/new-arrivals",
 *     "variant": "default",
 *     "isActive": true,
 *     "backgroundImage": "https://strapi.example.com/uploads/hero_bg.jpg",
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   },
 *   "meta": {
 *     "endpoint": "/api/content/hero",
 *     "variant": "default",
 *     "requestType": "single",
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   }
 * }
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const variant = searchParams.get("variant") || "default";
    const endpoint = searchParams.get("endpoint");
    const strapiEndpoint = buildStrapiEndpoint(variant, endpoint);
    const response = await fetchFromStrapi(strapiEndpoint, ERROR_SOURCE);
    const data = await response.json();
    const content = endpoint === "variants" ? data.data : data.data?.[0];
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const transformedContent = transformHeroContent(content, STRAPI_URL, endpoint === "variants");
    const meta = {
      endpoint: `/api/${API_ENDPOINTS.content}/hero`,
      variant,
      requestType: endpoint || "single",
      lastUpdated: Array.isArray(transformedContent)
        ? new Date().toISOString()
        : transformedContent.lastUpdated,
    };

    if (!content || (Array.isArray(content) && content.length === 0))
      return handleStrapiNotFound("hero", variant, ERROR_SOURCE);

    return createSuccessResponse(transformedContent, meta);
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "fetch-hero-content",
      endpoint: `/api/${API_ENDPOINTS.content}/hero`,
    });

    return createErrorResponse("Failed to fetch hero content", error.message);
  }
}

/**
 * OPTIONS /api/content/hero - CORS preflight handler for hero content endpoint
 * @returns {Response} CORS headers configured for content management operations
 *
 * @example
 * // Preflight request for content management
 * OPTIONS /api/content/hero
 * // Returns appropriate CORS headers for CMS operations
 */
export async function OPTIONS() {
  return createCorsResponse("CONTENT_MANAGEMENT");
}
