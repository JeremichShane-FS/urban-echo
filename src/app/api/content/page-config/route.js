import { API_ENDPOINTS, API_FALLBACK_DATA, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";
import {
  createCorsResponse,
  createFallbackResponse,
  createSuccessResponse,
  fetchFromStrapi,
  transformContentWithFallbacks,
} from "@modules/core/utils/api";

const ERROR_SOURCE = "page-config-api";
const PAGE_CONFIG_FALLBACKS = API_FALLBACK_DATA.PAGE_CONFIG;

/**
 * GET /api/content/page-config
 * @description Get page configuration settings with fallback support
 * @param {Object} searchParams - Query parameters
 * @param {string} [searchParams.page=homepage] - Page name
 * @returns {Object} Page configuration with feature flags and SEO settings
 * @example GET /api/content/page-config?page=shop
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get("page") || "homepage";

    try {
      const response = await fetchFromStrapi(
        `page-configs?filters[pageName][$eq]=${pageName}&populate=*`,
        ERROR_SOURCE
      );
      const data = await response.json();
      const config = data.data?.[0];

      if (!config) {
        return createFallbackResponse(
          { ...PAGE_CONFIG_FALLBACKS, pageName },
          {
            endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
            pageName,
          },
          "No configuration found in CMS"
        );
      }

      const transformedConfig = transformContentWithFallbacks(config, PAGE_CONFIG_FALLBACKS);
      transformedConfig.pageName = config.pageName || pageName;

      return createSuccessResponse(transformedConfig, {
        endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
        pageName,
        lastUpdated: transformedConfig.lastUpdated,
        source: "strapi",
      });
    } catch (strapiError) {
      return createFallbackResponse(
        { ...PAGE_CONFIG_FALLBACKS, pageName },
        {
          endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
          pageName,
        },
        strapiError.message
      );
    }
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "fetch-page-config",
      endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
    });

    const pageName = new URL(request.url).searchParams.get("page") || "homepage";
    return createFallbackResponse(
      { ...PAGE_CONFIG_FALLBACKS, pageName },
      {
        endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
        pageName,
      },
      error.message
    );
  }
}

/**
 * OPTIONS /api/content/page-config
 * @description CORS preflight handler
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
