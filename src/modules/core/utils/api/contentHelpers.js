import { API_RESPONSE_MESSAGES, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

/**
 * Makes a request to Strapi CMS with authentication
 * @param {string} endpoint - Strapi endpoint (without base URL)
 * @param {string} source - Error source identifier
 * @returns {Promise<Response>} Fetch response object
 */
export async function fetchFromStrapi(endpoint, source) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
  });

  if (!response.ok) {
    const strapiError = new Error(`Strapi API responded with status: ${response.status}`);
    strapiError.status = response.status;

    errorHandler.handleError(strapiError, ERROR_TYPES.API_ERROR, {
      source,
      action: "fetch-strapi-content",
      strapiUrl: STRAPI_URL,
      endpoint,
      responseStatus: response.status,
    });

    throw strapiError;
  }

  return response;
}

/**
 * Creates a fallback response when Strapi is unavailable
 * @param {Object} fallbackData - Default data to return
 * @param {Object} meta - Response metadata
 * @param {string} errorMessage - Error message that caused fallback
 * @returns {Response} JSON response with fallback data
 */
export function createFallbackResponse(fallbackData, meta, errorMessage) {
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
}

/**
 * Handles Strapi content not found scenarios
 * @param {string} contentType - Type of content (hero, about, etc.)
 * @param {string} identifier - Content identifier
 * @param {string} source - Error source
 * @returns {Response} Not found response
 */
export function handleStrapiNotFound(contentType, identifier, source) {
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
}

/**
 * Common transformations for content with fallbacks
 * @param {Object} content - Raw content from Strapi
 * @param {Object} fallbacks - Default values for missing fields
 * @returns {Object} Transformed content with fallbacks applied
 */
export function transformContentWithFallbacks(content, fallbacks) {
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
}

/**
 * Processes image URLs from Strapi
 * @param {Object} image - Strapi image object
 * @param {string} strapiUrl - Base Strapi URL
 * @returns {string|null} Full image URL or null
 */
export function processImageUrl(image, strapiUrl) {
  if (!image?.url) return null;
  if (image.url.startsWith("http")) return image.url;
  return `${strapiUrl}${image.url}`;
}
