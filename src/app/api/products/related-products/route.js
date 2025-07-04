import {
  API_ENDPOINTS,
  API_REQUIRED_FIELDS,
  API_VALIDATION_LIMITS,
  ERROR_TYPES,
} from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";
import {
  createCorsResponse,
  createErrorResponse,
  createSuccessResponse,
  validatePagination,
  validateRequiredFields,
} from "@modules/core/utils/api";
import { relatedProductsService } from "@modules/product/services";

const ERROR_SOURCE = "related-products-api";

/**
 * GET /api/products/related-products
 * @description Get products related to a specific product
 * @param {Object} searchParams - Query parameters
 * @param {string} searchParams.productId - Source product ID (required)
 * @param {number} [searchParams.limit=4] - Number of related products (max 20)
 * @param {string} [searchParams.category] - Category filter
 * @param {boolean} [searchParams.excludeOutOfStock=false] - Exclude out of stock items
 * @returns {Object} Related products array
 * @example GET /api/products/related-products?productId=507f1f77bcf86cd799439011&limit=6
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const rawLimit = parseInt(searchParams.get("limit")) || 4;
    const category = searchParams.get("category");
    const excludeOutOfStock = searchParams.get("excludeOutOfStock") === "true";
    const requiredValidation = validateRequiredFields(
      { productId },
      API_REQUIRED_FIELDS.RELATED_PRODUCTS,
      `/api/${API_ENDPOINTS.relatedProducts}`
    );

    if (!requiredValidation.isValid) return requiredValidation.response;

    const limitValidation = validatePagination({
      limit: rawLimit,
      page: 1,
      maxLimit: API_VALIDATION_LIMITS.MAX_RELATED_PRODUCTS,
      endpoint: `/api/${API_ENDPOINTS.relatedProducts}`,
    });

    if (!limitValidation.isValid) return limitValidation.response;

    const relatedProducts = await relatedProductsService.getRelatedProducts(productId, {
      limit: rawLimit,
      category,
      excludeOutOfStock,
    });

    return createSuccessResponse(relatedProducts, {
      endpoint: `/api/${API_ENDPOINTS.relatedProducts}`,
      productId,
      count: relatedProducts.length,
      filters: { limit: rawLimit, category, excludeOutOfStock },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      endpoint: `/api/${API_ENDPOINTS.relatedProducts}`,
      method: "GET",
    });

    return createErrorResponse("Failed to fetch related products", error.message);
  }
}

/**
 * OPTIONS /api/products/related-products
 * @description CORS preflight handler
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
