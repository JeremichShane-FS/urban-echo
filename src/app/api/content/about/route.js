/**
 * @fileoverview About content API endpoint for fetching and transforming about page content
 * Handles section-specific content retrieval from Strapi CMS with fallback data support,
 * content validation, and structured response formatting for about page sections
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
 * About content API configuration
 * @constant {string} ERROR_SOURCE - Error tracking source identifier
 * @constant {Object} ABOUT_FALLBACKS - Fallback data for content failures
 */
const ERROR_SOURCE = "about-content-api";
const ABOUT_FALLBACKS = API_FALLBACK_DATA.ABOUT;

// =================================================================
// UTILITY FUNCTIONS
// =================================================================

/**
 * Builds Strapi endpoint URL for about content retrieval
 * @param {string} section - Content section (mission, vision, team, history)
 * @returns {string} Formatted Strapi endpoint URL with filters
 *
 * @example
 * // Get specific section
 * const endpoint = buildStrapiEndpoint('mission');
 * // Returns: "about-contents?populate=*&filters[section][$eq]=mission"
 *
 * @example
 * // Get all sections
 * const endpoint = buildStrapiEndpoint('all');
 * // Returns: "about-contents?populate=*"
 */
function buildStrapiEndpoint(section) {
  if (section && section !== "all") {
    return `about-contents?populate=*&filters[section][$eq]=${section}`;
  }
  return "about-contents?populate=*";
}

/**
 * Transforms about content with validation and fallback handling
 * @param {Object} content - Raw content from Strapi CMS
 * @param {string} section - Requested section identifier
 * @returns {Object} Transformed and validated about content
 *
 * @example
 * // Transform content with values array filtering
 * const transformed = transformAboutContent(rawContent, 'mission');
 * // Returns sanitized content with filtered values array
 */
function transformAboutContent(content, section) {
  const transformed = transformContentWithFallbacks(content, ABOUT_FALLBACKS);

  // Add section-specific transformations
  if (transformed.values && Array.isArray(transformed.values)) {
    transformed.values = transformed.values.filter(value => value && value.trim());
  }

  return {
    ...transformed,
    section: section || "all",
    lastUpdated: transformed.updatedAt || new Date().toISOString(),
  };
}

// =================================================================
// API ROUTE HANDLERS
// =================================================================

/**
 * GET /api/content/about - Retrieve about page content with section filtering
 * @param {Request} request - Next.js API request object with URL search parameters
 * @returns {Promise<Response>} JSON response with about content and metadata
 * @throws {ValidationError} When section parameter is invalid
 * @throws {NotFoundError} When requested content is not found
 * @throws {ServerError} When Strapi CMS is unavailable or returns error
 *
 * @typedef {Object} AboutSearchParams
 * @property {string} [section] - Specific section (mission, vision, team, history)
 * @property {boolean} [populate] - Whether to include related content
 *
 * @typedef {Object} AboutContent
 * @property {string} title - About page main title
 * @property {string} subtitle - About page subtitle
 * @property {string} description - Main description content
 * @property {string} mission - Company mission statement
 * @property {string} vision - Company vision statement
 * @property {string[]} values - Array of company core values
 * @property {string} section - Content section identifier
 * @property {boolean} isActive - Whether content is currently active
 * @property {string} lastUpdated - ISO timestamp of last content update
 *
 * @typedef {Object} AboutResponse
 * @property {AboutContent} data - About page content object
 * @property {Object} meta - Response metadata and context
 * @property {string} meta.endpoint - API endpoint that served the request
 * @property {string} meta.section - Requested section identifier
 * @property {string} meta.lastUpdated - ISO timestamp of content update
 *
 * @example
 * // Get all about content sections
 * GET /api/content/about
 * // Returns complete about page content
 *
 * @example
 * // Get specific section content
 * GET /api/content/about?section=mission
 * // Returns only mission section content
 *
 * @example
 * // Get content with populated relations
 * GET /api/content/about?populate=true&section=team
 * // Returns team section with related data
 *
 * @example
 * // Successful response structure
 * {
 *   "data": {
 *     "title": "About Urban Echo",
 *     "subtitle": "Fashion with Purpose",
 *     "description": "Urban Echo represents modern fashion...",
 *     "mission": "To provide high-quality, sustainable fashion...",
 *     "vision": "A world where fashion meets responsibility...",
 *     "values": ["Quality", "Sustainability", "Innovation", "Inclusivity"],
 *     "section": "all",
 *     "isActive": true,
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   },
 *   "meta": {
 *     "endpoint": "/api/content/about",
 *     "section": "all",
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   }
 * }
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section") || "all";
    const strapiEndpoint = buildStrapiEndpoint(section);
    const response = await fetchFromStrapi(strapiEndpoint, ERROR_SOURCE);
    const data = await response.json();
    const content = data.data?.[0];
    const transformedContent = transformAboutContent(content, section);

    const meta = {
      endpoint: `/api/${API_ENDPOINTS.content}/about`,
      section: section,
      lastUpdated: transformedContent.lastUpdated,
    };

    if (!content) return handleStrapiNotFound("about", section, ERROR_SOURCE);

    return createSuccessResponse(transformedContent, meta);
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "fetch-about-content",
      endpoint: `/api/${API_ENDPOINTS.content}/about`,
    });

    return createErrorResponse("Failed to fetch about content", error.message);
  }
}

/**
 * OPTIONS /api/content/about - CORS preflight handler for about content endpoint
 * @returns {Response} CORS headers configured for content management operations
 *
 * @example
 * // Preflight request for content management
 * OPTIONS /api/content/about
 * // Returns appropriate CORS headers
 */
export async function OPTIONS() {
  return createCorsResponse("CONTENT_MANAGEMENT");
}
