import { API_ENDPOINTS, API_FALLBACK_DATA, ERROR_TYPES } from "@config/constants";
import {
  createCorsResponse,
  createErrorResponse,
  createSuccessResponse,
  fetchFromStrapi,
  handleStrapiNotFound,
  processImageUrl,
  transformContentWithFallbacks,
} from "@modules/core/utils/api";
import { errorHandler } from "@utils/errorHandler";

const ERROR_SOURCE = "hero-content-api";
const HERO_FALLBACKS = API_FALLBACK_DATA.HERO;

function buildStrapiEndpoint(variant, endpoint) {
  if (endpoint === "variants") {
    return "hero-contents?populate=*&filters[variant][$ne]=default";
  } else if (variant !== "default") {
    return `hero-contents?populate=*&filters[variant][$eq]=${variant}`;
  }
  return "hero-contents?populate=*";
}

function transformHeroContent(content, strapiUrl, isArray = false) {
  const STRAPI_URL = strapiUrl || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  if (isArray) {
    return content.map(item => transformSingleHeroContent(item, STRAPI_URL));
  }

  return transformSingleHeroContent(content, STRAPI_URL);
}

function transformSingleHeroContent(content, strapiUrl) {
  const transformed = transformContentWithFallbacks(content, HERO_FALLBACKS);
  transformed.backgroundImage = processImageUrl(content.backgroundImage, strapiUrl);
  return transformed;
}

/**
 * GET /api/content/hero
 * @description Get hero section content with variant support
 * @param {Object} searchParams - Query parameters
 * @param {string} [searchParams.variant=default] - Content variant
 * @param {string} [searchParams.endpoint] - Use "variants" to get all variants
 * @returns {Object} Hero content or variants array
 * @example GET /api/content/hero?variant=holiday
 * @example GET /api/content/hero?endpoint=variants
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
 * OPTIONS /api/content/hero
 * @description CORS preflight handler
 */
export async function OPTIONS() {
  return createCorsResponse("CONTENT_MANAGEMENT");
}
