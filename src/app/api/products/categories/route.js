import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";
import {
  createCorsResponse,
  createErrorResponse,
  createSuccessResponse,
} from "@modules/core/utils/api";
import { categoriesService } from "@modules/product/services";

const ERROR_SOURCE = "categories-api";

/**
 * GET /api/products/categories
 * @description Get product categories with optional metadata
 * @param {Object} searchParams - Query parameters
 * @param {boolean} [searchParams.includeProductCount=false] - Include product counts
 * @param {boolean} [searchParams.includeSubCategories=false] - Include subcategories
 * @param {string} [searchParams.status=active] - Filter by status
 * @returns {Object} Categories array with optional metadata
 * @example GET /api/products/categories?includeProductCount=true
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeProductCount = searchParams.get("includeProductCount") === "true";
    const includeSubCategories = searchParams.get("includeSubCategories") === "true";
    const status = searchParams.get("status") || "active";
    const categories = await categoriesService.getCategories({
      includeProductCount,
      includeSubCategories,
      status,
    });

    if (!categories || categories.length === 0) {
      return createSuccessResponse([], {
        endpoint: `/api/${API_ENDPOINTS.categories}`,
        count: 0,
        message: "No categories found",
      });
    }

    return createSuccessResponse(categories, {
      endpoint: `/api/${API_ENDPOINTS.categories}`,
      count: categories.length,
      filters: {
        includeProductCount,
        includeSubCategories,
        status,
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      endpoint: `/api/${API_ENDPOINTS.categories}`,
      method: "GET",
    });

    return createErrorResponse("Failed to fetch categories", error.message);
  }
}

/**
 * OPTIONS /api/products/categories
 * @description CORS preflight handler
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
