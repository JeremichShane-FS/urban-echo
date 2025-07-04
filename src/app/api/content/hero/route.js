import { API_ENDPOINTS, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

const ERROR_SOURCE = "hero-content-api";

/**
 * Hero content endpoint with Strapi CMS integration and variant support
 * @description Retrieves hero section content from Strapi headless CMS with support
 * for multiple content variants and A/B testing. Handles both single variant retrieval
 * and bulk variant listing. Transforms Strapi data structure to frontend-compatible
 * format with fallback values and image URL processing.
 * @async
 * @function GET
 * @param {Request} request - Next.js API request object
 * @param {string} [request.searchParams.variant] - Content variant identifier (default: "default")
 * @param {string} [request.searchParams.endpoint] - Endpoint type ("variants" for listing all variants)
 * @returns {Promise<Response>} JSON response with hero content data
 * @returns {boolean} returns.success - Operation success status
 * @returns {Object|Array} returns.data - Hero content object or array of variants
 * @returns {string} returns.data.title - Hero title with fallback
 * @returns {string} returns.data.subtitle - Hero subtitle with fallback
 * @returns {string} returns.data.description - Hero description with fallback
 * @returns {string} returns.data.ctaText - Call-to-action text with fallback
 * @returns {string} returns.data.ctaLink - Call-to-action link with fallback
 * @returns {string} returns.data.variant - Content variant identifier
 * @returns {boolean} returns.data.isActive - Content active status
 * @returns {string} [returns.data.backgroundImage] - Full URL to background image
 * @returns {Object} returns.meta - Response metadata including endpoint and variant info
 * @throws {Error} When Strapi API is unreachable or returns invalid response
 * @example
 * Get default hero content
 * fetch('/api/content/hero')
 *
 * Get specific variant
 * fetch('/api/content/hero?variant=holiday')
 *
 * Get all variants
 * fetch('/api/content/hero?endpoint=variants')
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const variant = searchParams.get("variant") || "default";
    const endpoint = searchParams.get("endpoint");

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    let strapiEndpoint = "hero-contents?populate=*";
    if (endpoint === "variants") {
      strapiEndpoint = "hero-contents?populate=*&filters[variant][$ne]=default";
    } else if (variant !== "default") {
      strapiEndpoint = `hero-contents?populate=*&filters[variant][$eq]=${variant}`;
    }

    const response = await fetch(`${STRAPI_URL}/api/${strapiEndpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
    });

    if (!response.ok) {
      const strapiError = new Error(`Strapi API responded with status: ${response.status}`);
      strapiError.status = response.status;

      errorHandler.handleError(strapiError, ERROR_TYPES.API_ERROR, {
        source: ERROR_SOURCE,
        action: "fetch-hero-content",
        strapiUrl: STRAPI_URL,
        strapiEndpoint: strapiEndpoint,
        responseStatus: response.status,
        variant: variant,
        endpoint: endpoint,
      });

      return Response.json(
        {
          success: false,
          error: "Failed to fetch hero content from CMS",
          message: strapiError.message,
        },
        {
          status:
            response.status >= 500 ? HTTP_STATUS.INTERNAL_SERVER_ERROR : HTTP_STATUS.BAD_REQUEST,
        }
      );
    }

    const data = await response.json();
    const content = endpoint === "variants" ? data.data : data.data?.[0];

    if (!content || (Array.isArray(content) && content.length === 0)) {
      const noContentError = new Error("No content found in CMS");
      noContentError.status = HTTP_STATUS.NOT_FOUND;

      errorHandler.handleError(noContentError, ERROR_TYPES.API_ERROR, {
        source: ERROR_SOURCE,
        action: "fetch-hero-content",
        variant: variant,
        endpoint: endpoint,
        reason: "no-content-found",
      });

      return Response.json(
        {
          success: false,
          error: "No hero content found",
          message: `Content not available for variant: ${variant}`,
        },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }

    const transformedContent =
      endpoint === "variants"
        ? content.map(item => ({
            title: item.title?.trim() || "Discover Your Style",
            subtitle: item.subtitle?.trim() || "Premium fashion for the modern lifestyle",
            description: item.description?.trim() || "Explore our curated collection",
            ctaText: item.ctaText?.trim() || "Shop Now",
            ctaLink: item.ctaLink?.trim() || "/shop",
            variant: item.variant || "default",
            isActive: item.isActive ?? true,
            backgroundImage: item.backgroundImage?.url
              ? `${STRAPI_URL}${item.backgroundImage.url}`
              : null,
            lastUpdated: item.updatedAt || new Date().toISOString(),
          }))
        : {
            title: content.title?.trim() || "Discover Your Style",
            subtitle: content.subtitle?.trim() || "Premium fashion for the modern lifestyle",
            description: content.description?.trim() || "Explore our curated collection",
            ctaText: content.ctaText?.trim() || "Shop Now",
            ctaLink: content.ctaLink?.trim() || "/shop",
            variant: content.variant || "default",
            isActive: content.isActive ?? true,
            backgroundImage: content.backgroundImage?.url
              ? `${STRAPI_URL}${content.backgroundImage.url}`
              : null,
            lastUpdated: content.updatedAt || new Date().toISOString(),
          };

    return Response.json({
      success: true,
      data: transformedContent,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.content}/hero`,
        variant: variant,
        requestType: endpoint || "single",
        lastUpdated: Array.isArray(transformedContent)
          ? new Date().toISOString()
          : transformedContent.lastUpdated,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "fetch-hero-content",
      endpoint: `/api/${API_ENDPOINTS.content}/hero`,
    });

    console.error("Hero content API error:", error.message);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch hero content",
        message: error.message,
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * Hero content API CORS preflight handler
 * @description Handles CORS preflight requests for hero content API endpoints,
 * enabling cross-origin requests for content management integration. Supports
 * GET and PUT methods for content retrieval and updates with appropriate headers.
 * @async
 * @function OPTIONS
 * @param {Request} request - Next.js API request object
 * @returns {Promise<Response>} Empty response with CORS headers
 * @returns {Object} returns.headers - CORS headers for cross-origin access
 * @throws {Error} When CORS configuration fails
 * @example
 * Preflight request handled automatically by browsers
 * No direct usage required
 */
export async function OPTIONS() {
  return new Response(null, {
    status: HTTP_STATUS.OK,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
