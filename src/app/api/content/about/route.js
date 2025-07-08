import { API_ENDPOINTS, API_FALLBACK_DATA, ERROR_TYPES } from "@config/constants";
import {
  createCorsResponse,
  createErrorResponse,
  createSuccessResponse,
  fetchFromStrapi,
  handleStrapiNotFound,
  transformContentWithFallbacks,
} from "@modules/core/utils/api";
import { errorHandler } from "@utils/errorHandler";

const ERROR_SOURCE = "about-content-api";
const ABOUT_FALLBACKS = API_FALLBACK_DATA.ABOUT;

/**
 * GET /api/content/about
 * @description Get about page content
 * @param {Object} searchParams - Query parameters
 * @param {string} [searchParams.section=homepage] - Content section
 * @returns {Object} About content with mission, vision, values
 * @example GET /api/content/about?section=company
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section") || "homepage";
    const response = await fetchFromStrapi("about-contents?populate=*", ERROR_SOURCE);
    const data = await response.json();
    const content = data.data?.[0];
    const transformedContent = transformContentWithFallbacks(content, ABOUT_FALLBACKS);
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
 * OPTIONS /api/content/about
 * @description CORS preflight handler
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
