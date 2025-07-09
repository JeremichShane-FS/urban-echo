/**
 * @fileoverview Page configuration API endpoint for dynamic page settings and feature toggles
 * Handles SEO metadata, feature flags, and A/B testing configurations with environment-specific
 * content retrieval and per-page customization support for comprehensive page management
 */

import { API_ENDPOINTS, API_FALLBACK_DATA, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/utils";
import {
  createCorsResponse,
  createErrorResponse,
  createSuccessResponse,
  fetchFromStrapi,
  handleStrapiNotFound,
  transformContentWithFallbacks,
} from "@modules/core/utils/api";

// =================================================================
// CONFIGURATION CONSTANTS
// =================================================================

/**
 * Page configuration API settings
 * @constant {string} ERROR_SOURCE - Error tracking source identifier
 * @constant {Object} PAGE_CONFIG_FALLBACKS - Fallback data for content failures
 */
const ERROR_SOURCE = "page-config-api";
const PAGE_CONFIG_FALLBACKS = API_FALLBACK_DATA.PAGE_CONFIG;

// =================================================================
// UTILITY FUNCTIONS
// =================================================================

/**
 * Builds Strapi endpoint URL for page configuration retrieval
 * @param {string} pageName - Page identifier (homepage, shop, about, contact)
 * @param {string} environment - Environment context (production, staging, development)
 * @returns {string} Formatted Strapi endpoint URL with page and environment filters
 *
 * @example
 * // Get homepage config for production
 * const endpoint = buildStrapiEndpoint('homepage', 'production');
 * // Returns: "page-configs?populate=*&filters[pageName][$eq]=homepage"
 *
 * @example
 * // Get shop config for staging environment
 * const endpoint = buildStrapiEndpoint('shop', 'staging');
 * // Returns filtered endpoint for staging shop configuration
 */
function buildStrapiEndpoint(pageName, environment) {
  return `page-configs?populate=*&filters[pageName][$eq]=${pageName}`;
}

/**
 * Transforms page configuration with feature flag validation and SEO optimization
 * @param {Object} config - Raw configuration object from Strapi CMS
 * @param {string} pageName - Page identifier for context
 * @returns {Object} Transformed configuration with validated feature flags and limits
 *
 * @example
 * // Transform with boolean feature flag validation
 * const config = transformPageConfig(rawConfig, 'homepage');
 * // Returns config with validated boolean flags and numeric limits
 */
function transformPageConfig(config, pageName) {
  const transformed = transformContentWithFallbacks(config, PAGE_CONFIG_FALLBACKS);

  return {
    ...transformed,
    pageName,
    // Ensure boolean feature flags
    showFeaturedProducts: Boolean(transformed.showFeaturedProducts),
    showNewArrivals: Boolean(transformed.showNewArrivals),
    showNewsletter: Boolean(transformed.showNewsletter),
    showAboutSection: Boolean(transformed.showAboutSection),
    showTestimonials: Boolean(transformed.showTestimonials),
    showCategories: Boolean(transformed.showCategories),
    // Ensure numeric limits
    maxFeaturedProducts: Math.max(1, parseInt(transformed.maxFeaturedProducts) || 8),
    maxNewArrivals: Math.max(1, parseInt(transformed.maxNewArrivals) || 8),
    lastUpdated: transformed.updatedAt || new Date().toISOString(),
  };
}

// =================================================================
// API ROUTE HANDLERS
// =================================================================

/**
 * GET /api/content/page-config - Retrieve page configuration with SEO and feature toggles
 * @param {Request} request - Next.js API request object with URL search parameters
 * @returns {Promise<Response>} JSON response with page configuration and metadata
 * @throws {ValidationError} When page parameter is invalid or missing
 * @throws {NotFoundError} When requested page configuration is not found
 * @throws {ServerError} When Strapi CMS is unavailable or returns error
 *
 * @typedef {Object} PageConfigSearchParams
 * @property {string} [page=homepage] - Page identifier (homepage, shop, about, contact)
 * @property {string} [environment] - Environment filter (production, staging, development)
 * @property {boolean} [includeFeatureFlags] - Include A/B testing feature flags in response
 *
 * @typedef {Object} PageConfiguration
 * @property {string} pageName - Page identifier used for routing
 * @property {string} seoTitle - SEO optimized page title for meta tags
 * @property {string} seoDescription - SEO meta description for search engines
 * @property {string[]} seoKeywords - SEO keywords array for meta tags
 * @property {boolean} showFeaturedProducts - Toggle featured products section visibility
 * @property {boolean} showNewArrivals - Toggle new arrivals section visibility
 * @property {boolean} showNewsletter - Toggle newsletter signup form visibility
 * @property {boolean} showAboutSection - Toggle about section visibility
 * @property {boolean} showTestimonials - Toggle testimonials section visibility
 * @property {boolean} showCategories - Toggle categories section visibility
 * @property {number} maxFeaturedProducts - Maximum featured products to display (min: 1)
 * @property {number} maxNewArrivals - Maximum new arrivals to display (min: 1)
 * @property {string} currency - Default currency code for the page
 * @property {string} locale - Default locale identifier for the page
 * @property {Object} featureFlags - A/B testing and experimental features configuration
 * @property {string} lastUpdated - ISO timestamp of last configuration update
 *
 * @typedef {Object} PageConfigResponse
 * @property {PageConfiguration} data - Complete page configuration object
 * @property {Object} meta - Response metadata and context information
 * @property {string} meta.endpoint - API endpoint that served the request
 * @property {string} meta.pageName - Requested page identifier
 * @property {string} meta.environment - Environment context for the request
 * @property {string} meta.lastUpdated - ISO timestamp of configuration update
 *
 * @example
 * // Get homepage configuration with defaults
 * GET /api/content/page-config?page=homepage
 * // Returns complete homepage configuration
 *
 * @example
 * // Get shop page config for staging environment
 * GET /api/content/page-config?page=shop&environment=staging
 * // Returns staging-specific shop page configuration
 *
 * @example
 * // Get config with feature flags for A/B testing
 * GET /api/content/page-config?page=homepage&includeFeatureFlags=true
 * // Returns configuration with feature flags included
 *
 * @example
 * // Successful response structure
 * {
 *   "data": {
 *     "pageName": "homepage",
 *     "seoTitle": "Urban Echo | Modern Fashion E-Commerce Platform",
 *     "seoDescription": "Discover trendy, high-quality clothing and accessories...",
 *     "seoKeywords": ["fashion", "clothing", "e-commerce", "urban", "style"],
 *     "showFeaturedProducts": true,
 *     "showNewArrivals": true,
 *     "showNewsletter": true,
 *     "showAboutSection": false,
 *     "showTestimonials": true,
 *     "showCategories": true,
 *     "maxFeaturedProducts": 8,
 *     "maxNewArrivals": 12,
 *     "currency": "USD",
 *     "locale": "en-US",
 *     "featureFlags": {
 *       "enableWishlist": true,
 *       "showRecommendations": false,
 *       "enableQuickView": true
 *     },
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   },
 *   "meta": {
 *     "endpoint": "/api/content/page-config",
 *     "pageName": "homepage",
 *     "environment": "production",
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   }
 * }
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get("page") || "homepage";
    const environment = searchParams.get("environment") || process.env.NODE_ENV;
    const strapiEndpoint = buildStrapiEndpoint(pageName, environment);
    const response = await fetchFromStrapi(strapiEndpoint, ERROR_SOURCE);
    const data = await response.json();
    const config = data.data?.[0];
    const transformedConfig = transformPageConfig(config, pageName);

    const meta = {
      endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
      pageName,
      environment,
      lastUpdated: transformedConfig.lastUpdated,
    };

    if (!config) return handleStrapiNotFound("page-config", pageName, ERROR_SOURCE);

    return createSuccessResponse(transformedConfig, meta);
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "fetch-page-config",
      endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
    });

    return createErrorResponse("Failed to fetch page configuration", error.message);
  }
}

/**
 * OPTIONS /api/content/page-config - CORS preflight handler for page configuration endpoint
 * @returns {Response} CORS headers configured for content management operations
 *
 * @example
 * // Preflight request for page configuration management
 * OPTIONS /api/content/page-config
 * // Returns appropriate CORS headers for CMS operations
 */
export async function OPTIONS() {
  return createCorsResponse("CONTENT_MANAGEMENT");
}
