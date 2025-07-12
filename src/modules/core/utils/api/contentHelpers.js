/**
 * @fileoverview Content management system (CMS) integration utilities for Strapi headless CMS
 * Provides comprehensive Strapi API integration with authentication, error handling, and fallback strategies
 * Handles content fetching, transformation, and error recovery for headless CMS architecture
 * Includes image processing, content validation, and production-ready error management
 */

import { API_RESPONSE_MESSAGES, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { getEnvironment } from "@config/environment";
import { errorHandler } from "@modules/core/utils";

/**
 * Makes authenticated requests to Strapi CMS with comprehensive error handling
 * @async
 * @function fetchFromStrapi
 * @param {string} endpoint - Strapi endpoint path (without base URL, e.g., "hero-contents")
 * @param {string} source - Error source identifier for debugging and logging
 * @returns {Promise<Response>} Fetch response object for further processing
 * @throws {Error} Enhanced error with status code when Strapi request fails
 *
 * @description
 * Handles Strapi CMS integration with:
 * - Environment-based URL configuration (local dev vs production)
 * - Bearer token authentication for protected content
 * - Comprehensive error handling and logging
 * - Status code preservation for proper error categorization
 *
 * @example
 * const response = await fetchFromStrapi("hero-contents", "hero-content-service");
 * const data = await response.json();
 * // Returns Strapi response with authentication headers
 *
 * @example
 * try {
 *   const response = await fetchFromStrapi("about-contents", "about-service");
 * } catch (error) {
 *   // Error includes status code and detailed context for fallback handling
 * }
 */
export const fetchFromStrapi = async (endpoint, source) => {
  const env = getEnvironment();
  const strapiUrl = env.strapiUrl || "http://localhost:1337";
  const strapiToken = env.strapiToken;

  const response = await fetch(`${strapiUrl}/api/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(strapiToken && { Authorization: `Bearer ${strapiToken}` }),
    },
  });

  if (!response.ok) {
    const strapiError = new Error(`Strapi API responded with status: ${response.status}`);
    strapiError.status = response.status;

    errorHandler.handleError(strapiError, ERROR_TYPES.API_ERROR, {
      source,
      action: "fetch-strapi-content",
      strapiUrl: strapiUrl,
      endpoint,
      responseStatus: response.status,
    });

    throw strapiError;
  }

  return response;
};

/**
 * Creates standardized fallback responses when Strapi CMS is unavailable
 * @function createFallbackResponse
 * @param {Object} fallbackData - Default/static data to return when CMS is unavailable
 * @param {Object} meta - Response metadata for tracking and debugging
 * @param {string} errorMessage - Original error message that triggered fallback
 * @returns {Response} JSON response with fallback data and metadata
 *
 * @description
 * Provides graceful degradation when CMS is unavailable:
 * - Returns structured fallback content with consistent API format
 * - Includes metadata indicating fallback status and reason
 * - Maintains successful HTTP status for frontend compatibility
 * - Logs fallback usage for monitoring and debugging
 *
 * @example
 * const fallbackResponse = createFallbackResponse(
 *   { title: "Default Hero Title", subtitle: "Default subtitle" },
 *   { contentType: "hero", version: "1.0" },
 *   "Strapi server timeout"
 * );
 * // Returns Response with fallback data and metadata
 *
 * @example
 * const aboutFallback = createFallbackResponse(
 *   STATIC_ABOUT_CONTENT,
 *   { contentType: "about" },
 *   "Authentication failed"
 * );
 * // Provides static content when CMS authentication fails
 */
export const createFallbackResponse = (fallbackData, meta, errorMessage) => {
  console.warn("Using fallback content due to error:", errorMessage);

  return Response.json(
    {
      success: true,
      data: fallbackData,
      meta: {
        ...meta,
        source: "fallback",
        fallback: true,
        fallbackReason: errorMessage,
        timestamp: new Date().toISOString(),
      },
    },
    { status: HTTP_STATUS.OK }
  );
};

/**
 * Handles Strapi content not found scenarios with proper error responses
 * @function handleStrapiNotFound
 * @param {string} contentType - Type of content that was not found (hero, about, etc.)
 * @param {string} identifier - Content identifier or slug that was requested
 * @param {string} source - Error source for logging and debugging
 * @returns {Response} Standardized 404 response for missing content
 *
 * @description
 * Handles missing content scenarios with:
 * - Structured error logging for monitoring
 * - Consistent 404 response format
 * - Detailed error context for debugging
 * - User-friendly error messages
 *
 * @example
 * const notFoundResponse = handleStrapiNotFound("hero", "homepage-hero", "hero-service");
 * // Returns 404 response with detailed error information
 *
 * @example
 * const pageNotFound = handleStrapiNotFound("page-config", "checkout-page", "config-service");
 * // Handles missing page configuration with proper error response
 */
export const handleStrapiNotFound = (contentType, identifier, source) => {
  const noContentError = new Error(`No ${contentType} content found in CMS`);
  noContentError.status = HTTP_STATUS.NOT_FOUND;

  errorHandler.handleError(noContentError, ERROR_TYPES.API_ERROR, {
    source,
    action: `fetch-${contentType}-content`,
    identifier,
    reason: "no-content-found",
  });

  return Response.json(
    {
      success: false,
      error: API_RESPONSE_MESSAGES.ERROR.CONTENT_NOT_FOUND,
      message: `Content not available for: ${identifier}`,
    },
    { status: HTTP_STATUS.NOT_FOUND }
  );
};

/**
 * Transforms raw CMS content with intelligent fallbacks for missing or empty fields
 * @function transformContentWithFallbacks
 * @param {Object} content - Raw content object from Strapi CMS
 * @param {Object} fallbacks - Default values for missing or empty fields
 * @param {string} [fallbacks.fieldName] - Default string value for text fields
 * @param {boolean} [fallbacks.fieldName] - Default boolean value for flag fields
 * @param {Array} [fallbacks.fieldName] - Default array value for list fields
 * @returns {Object} Transformed content with fallbacks applied and standard fields
 *
 * @description
 * Provides robust content transformation with:
 * - Type-aware fallback application (string, boolean, array)
 * - String trimming and empty string handling
 * - Boolean null coalescing for proper flag handling
 * - Array fallbacks for missing list content
 * - Standard metadata fields (isActive, lastUpdated)
 *
 * @example
 * const transformedContent = transformContentWithFallbacks(
 *   { title: "", description: "Content here", isActive: null },
 *   { title: "Default Title", description: "Default description", isActive: true }
 * );
 * // Returns: { title: "Default Title", description: "Content here", isActive: true, ... }
 *
 * @example
 * const heroContent = transformContentWithFallbacks(rawHeroData, {
 *   title: "Urban Echo Fashion",
 *   subtitle: "Discover Your Style",
 *   ctaText: "Shop Now",
 *   features: []
 * });
 * // Applies fallbacks for missing hero content fields
 */
export const transformContentWithFallbacks = (content, fallbacks) => {
  const transformed = {};

  for (const [key, fallbackValue] of Object.entries(fallbacks)) {
    if (typeof fallbackValue === "string") {
      transformed[key] = content[key]?.trim() || fallbackValue;
    } else if (typeof fallbackValue === "boolean") {
      transformed[key] = content[key] ?? fallbackValue;
    } else if (Array.isArray(fallbackValue)) {
      transformed[key] = content[key] || fallbackValue;
    } else {
      transformed[key] = content[key] || fallbackValue;
    }
  }

  // Always include these fields
  transformed.isActive = content.isActive ?? true;
  transformed.lastUpdated = content.updatedAt || new Date().toISOString();

  return transformed;
};

/**
 * Processes and normalizes image URLs from Strapi CMS with proper URL handling
 * @function processImageUrl
 * @param {Object} image - Strapi image object with nested structure or direct URL
 * @param {Object} [image.data] - Strapi v4 image data container
 * @param {Object} [image.data.attributes] - Strapi v4 image attributes
 * @param {string} [image.data.attributes.url] - Strapi v4 image URL
 * @param {string} [image.url] - Direct image URL (legacy or external)
 * @param {string} strapiUrl - Base Strapi URL for resolving relative paths
 * @returns {string|null} Complete image URL or null if image unavailable
 *
 * @description
 * Handles Strapi image URL processing with support for:
 * - Strapi v4 nested structure (image.data.attributes.url)
 * - Legacy direct URL structure (image.url)
 * - Absolute URL detection for external images
 * - Relative URL resolution with Strapi base URL
 * - Graceful null handling for missing images
 *
 * @example
 * // Strapi v4 structure
 * const imageUrl = processImageUrl(
 *   { data: { attributes: { url: "/uploads/hero-image.jpg" } } },
 *   "https://cms.urbanecho.com"
 * );
 * // Returns: "https://cms.urbanecho.com/uploads/hero-image.jpg"
 *
 * @example
 * // Legacy or external image
 * const externalImage = processImageUrl(
 *   { url: "https://cdn.example.com/image.jpg" },
 *   "https://cms.urbanecho.com"
 * );
 * // Returns: "https://cdn.example.com/image.jpg" (absolute URL unchanged)
 *
 * @example
 * // Missing image handling
 * const missingImage = processImageUrl(null, "https://cms.urbanecho.com");
 * // Returns: null (graceful handling of missing images)
 */
export function processImageUrl(image, strapiUrl) {
  const imageUrl = image?.data?.attributes?.url || image?.url;

  if (!imageUrl) return null;
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${strapiUrl}${imageUrl}`;
}
