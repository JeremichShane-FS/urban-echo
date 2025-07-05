import { API_ENDPOINTS, API_VALIDATION_LIMITS, ERROR_TYPES } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/services/errorHandler";
import {
  buildFieldSelection,
  buildProductQuery,
  createCorsResponse,
  createErrorResponse,
  createProductMeta,
  createSuccessResponse,
  transformProducts,
  validatePagination,
} from "@modules/core/utils/api";

const ERROR_SOURCE = "best-sellers-api";

/**
 * GET /api/products/best-sellers
 * @description Get best selling products sorted by sales count
 * @param {Object} searchParams - Query parameters
 * @param {number} [searchParams.limit=8] - Number of products (max 50)
 * @param {string} [searchParams.category] - Category filter
 * @returns {Object} Best seller products array with metadata
 * @example GET /api/products/best-sellers?category=electronics&limit=12
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawLimit = parseInt(searchParams.get("limit")) || 8;
    const category = searchParams.get("category");
    const validation = validatePagination({
      limit: rawLimit,
      page: 1,
      maxLimit: API_VALIDATION_LIMITS.MAX_BEST_SELLERS,
      endpoint: `/api/${API_ENDPOINTS.bestSellers}`,
    });

    if (!validation.isValid) return validation.response;

    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;
    const query = buildProductQuery({
      category,
      isActive: true,
      isBestSeller: true,
    });

    const bestSellerProducts = await Product.find(query)
      .sort({ salesCount: -1, averageRating: -1, reviewCount: -1 })
      .limit(rawLimit)
      .select(buildFieldSelection("listing"))
      .lean();
    const transformedProducts = transformProducts(bestSellerProducts);
    const meta = createProductMeta(
      `/api/${API_ENDPOINTS.bestSellers}`,
      { category, limit: rawLimit },
      "mongodb"
    );

    return createSuccessResponse(
      { products: transformedProducts, total: transformedProducts.length },
      meta
    );
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
      source: ERROR_SOURCE,
      action: "getBestSellers",
      endpoint: `/api/${API_ENDPOINTS.bestSellers}`,
    });

    return createErrorResponse("Failed to fetch best sellers", error.message, {
      source: "mongodb",
    });
  }
}

/**
 * OPTIONS /api/products/best-sellers
 * @description CORS preflight handler
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
