import { API_ENDPOINTS, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

const ERROR_SOURCE = "page-config-api";

/**
 * Retrieves page configuration from Strapi CMS with fallback handling
 * @description Fetches dynamic page configuration settings from Strapi CMS based on page name.
 * Supports customizable SEO metadata, feature toggles, and content limits per page.
 * Automatically falls back to default configuration if Strapi is unavailable or returns no data.
 * @async
 * @function GET
 * @param {Request} request - Next.js API request object containing URL with query parameters
 * @param {string} [request.searchParams.page="homepage"] - Page name to fetch configuration for
 * @returns {Promise<Response>} JSON response containing page configuration object
 * @returns {boolean} returns.success - Operation success status
 * @returns {Object} returns.data - Page configuration object with SEO and feature settings
 * @returns {string} returns.data.pageName - Name of the configured page
 * @returns {string} returns.data.seoTitle - SEO title for the page
 * @returns {string} returns.data.seoDescription - SEO meta description
 * @returns {boolean} returns.data.showFeaturedProducts - Whether to display featured products
 * @returns {boolean} returns.data.showNewArrivals - Whether to display new arrivals
 * @returns {number} returns.data.maxFeaturedProducts - Maximum number of featured products to show
 * @returns {Object} returns.meta - Response metadata including endpoint and timestamp
 * @throws {Error} When Strapi API is unreachable or returns invalid data
 * @example
 *  GET /api/content/page-config?page=homepage
 *  Returns: { success: true, data: { pageName: "homepage", seoTitle: "...", ... } }
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get("page") || "homepage";

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    const response = await fetch(
      `${STRAPI_URL}/api/page-configs?filters[pageName][$eq]=${pageName}&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
        },
      }
    );

    if (!response.ok) {
      const strapiError = new Error(`Strapi API responded with status: ${response.status}`);
      strapiError.status = response.status;

      errorHandler.handleError(strapiError, ERROR_TYPES.API_ERROR, {
        source: ERROR_SOURCE,
        action: "fetch-page-config",
        strapiUrl: STRAPI_URL,
        responseStatus: response.status,
        pageName: pageName,
      });

      return returnFallbackConfig(pageName, strapiError.message);
    }

    const data = await response.json();
    const config = data.data?.[0];

    if (!config) {
      const noConfigError = new Error("No config found in CMS");
      noConfigError.status = HTTP_STATUS.NOT_FOUND;

      errorHandler.handleError(noConfigError, ERROR_TYPES.API_ERROR, {
        source: ERROR_SOURCE,
        action: "fetch-page-config",
        pageName: pageName,
        reason: "no-config-found",
      });

      return returnFallbackConfig(pageName, "No configuration found in CMS");
    }

    const transformedConfig = {
      pageName: config.pageName || "homepage",
      seoTitle: config.seoTitle || "Urban Echo | Modern Fashion",
      seoDescription: config.seoDescription || "Discover trendy, high-quality clothing",
      showFeaturedProducts: config.showFeaturedProducts ?? true,
      showNewArrivals: config.showNewArrivals ?? true,
      showNewsletter: config.showNewsletter ?? true,
      showAboutSection: config.showAboutSection ?? true,
      showTestimonials: config.showTestimonials ?? true,
      showCategories: config.showCategories ?? true,
      maxFeaturedProducts: config.maxFeaturedProducts || 8,
      maxNewArrivals: config.maxNewArrivals || 8,
    };

    return Response.json({
      success: true,
      data: transformedConfig,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
        pageName: pageName,
        lastUpdated: config.updatedAt || new Date().toISOString(),
        source: "strapi",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "fetch-page-config",
      endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
    });

    console.error("Page config API error:", error.message);

    return returnFallbackConfig(
      new URL(request.url).searchParams.get("page") || "homepage",
      error.message
    );
  }
}

/**
 * Page configuration API CORS preflight handler
 * @description Handles CORS preflight requests for page configuration API endpoints,
 * enabling cross-origin requests for content management integration. Supports
 * GET method for public configuration access with appropriate content-type headers.
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

function returnFallbackConfig(pageName, errorMessage) {
  const fallbackConfig = {
    pageName: pageName,
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
  };

  console.warn("Using fallback page config due to error:", errorMessage);

  return Response.json(
    {
      success: true,
      data: fallbackConfig,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
        pageName: fallbackConfig.pageName,
        lastUpdated: new Date().toISOString(),
        source: "fallback",
        fallback: true,
        fallbackReason: errorMessage,
        timestamp: new Date().toISOString(),
      },
    },
    { status: HTTP_STATUS.OK }
  );
}
