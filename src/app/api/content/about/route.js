import { API_ENDPOINTS, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

const ERROR_SOURCE = "about-content-api";

/**
 * About content endpoint with Strapi CMS integration
 * @description Retrieves company about content from Strapi headless CMS including
 * mission, vision, values, and company information. Supports sectional content
 * filtering and provides fallback values for missing content. Integrates with
 * Strapi API using authentication tokens for secure content management.
 * @async
 * @function GET
 * @param {Request} request - Next.js API request object
 * @param {string} [request.searchParams.section] - Content section filter (default: "homepage")
 * @returns {Promise<Response>} JSON response with transformed about content
 * @returns {boolean} returns.success - Operation success status
 * @returns {Object} returns.data - Transformed about content object
 * @returns {string} returns.data.title - Company title with fallback
 * @returns {string} returns.data.description - Company description with fallback
 * @returns {string} returns.data.mission - Company mission statement with fallback
 * @returns {string} returns.data.vision - Company vision statement with fallback
 * @returns {Array} returns.data.values - Array of company values with fallback
 * @returns {boolean} returns.data.isActive - Content active status
 * @returns {string} returns.data.lastUpdated - ISO timestamp of last content update
 * @returns {Object} returns.meta - Response metadata including endpoint and section
 * @throws {Error} When Strapi API is unreachable or returns invalid response
 * @example
 * Get about content for homepage section
 * fetch('/api/content/about?section=homepage')
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section") || "homepage";

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    const response = await fetch(`${STRAPI_URL}/api/about-contents?populate=*`, {
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
        action: "fetch-about-content",
        strapiUrl: STRAPI_URL,
        responseStatus: response.status,
        section: section,
      });

      return Response.json(
        {
          success: false,
          error: "Failed to fetch about content from CMS",
          message: strapiError.message,
        },
        {
          status:
            response.status >= 500 ? HTTP_STATUS.INTERNAL_SERVER_ERROR : HTTP_STATUS.BAD_REQUEST,
        }
      );
    }

    const data = await response.json();
    const content = data.data?.[0];

    if (!content) {
      const noContentError = new Error("No content found in CMS");
      noContentError.status = HTTP_STATUS.NOT_FOUND;

      errorHandler.handleError(noContentError, ERROR_TYPES.API_ERROR, {
        source: ERROR_SOURCE,
        action: "fetch-about-content",
        section: section,
        reason: "no-content-found",
      });

      return Response.json(
        {
          success: false,
          error: "No about content found",
          message: "Content not available in CMS",
        },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }

    const transformedContent = {
      title: content.title || "About Urban Echo",
      description: content.description || "Contemporary style and conscious living",
      mission: content.mission || "Provide high-quality, sustainable fashion",
      vision: content.vision || "A world where fashion is both beautiful and responsible",
      values: content.values || ["Quality", "Sustainability", "Style"],
      isActive: content.isActive ?? true,
      lastUpdated: content.updatedAt || new Date().toISOString(),
    };

    return Response.json({
      success: true,
      data: transformedContent,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.content}/about`,
        section: section,
        lastUpdated: transformedContent.lastUpdated,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "fetch-about-content",
      endpoint: `/api/${API_ENDPOINTS.content}/about`,
    });

    console.error("About content API error:", error.message);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch about content",
        message: error.message,
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * About content API CORS preflight handler
 * @description Handles CORS preflight requests for about content API endpoints,
 * enabling cross-origin requests for content management integration. Supports
 * GET method for public content access with appropriate content-type headers.
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
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
