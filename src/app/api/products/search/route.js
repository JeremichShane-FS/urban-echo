import {
  API_ENDPOINTS,
  API_SORT_OPTIONS,
  API_VALIDATION_LIMITS,
  ERROR_TYPES,
} from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/services/errorHandler";
import {
  buildFieldSelection,
  buildPagination,
  buildProductQuery,
  buildSortOptions,
  createCorsResponse,
  createErrorResponse,
  createPaginatedResponse,
  createProductMeta,
  transformProducts,
  validatePagination,
  validatePriceRange,
  validateSort,
} from "@modules/core/utils/api";

const ERROR_SOURCE = "product-search-api";

/**
 * GET /api/products/search
 * @description Search products with text query, filters, and pagination
 * @param {Object} searchParams - Query parameters
 * @param {string} [searchParams.q] - Search text
 * @param {string} [searchParams.category] - Category filter
 * @param {string} [searchParams.sortBy] - Sort option (relevance, price-low, price-high, rating, newest, oldest)
 * @param {number} [searchParams.minPrice] - Minimum price
 * @param {number} [searchParams.maxPrice] - Maximum price
 * @param {number} [searchParams.limit=12] - Results per page (max 100)
 * @param {number} [searchParams.page=1] - Page number
 * @returns {Object} Paginated search results with products array
 * @example GET /api/products/search?q=shirt&category=men&sortBy=price-low&limit=20
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("q") || "";
    const category = searchParams.get("category");
    const sortBy = searchParams.get("sortBy") || "relevance";
    const minPrice = parseFloat(searchParams.get("minPrice")) || null;
    const maxPrice = parseFloat(searchParams.get("maxPrice")) || null;
    const rawLimit = parseInt(searchParams.get("limit")) || 12;
    const rawPage = parseInt(searchParams.get("page")) || 1;
    const paginationValidation = validatePagination({
      limit: rawLimit,
      page: rawPage,
      maxLimit: API_VALIDATION_LIMITS.MAX_SEARCH_RESULTS,
      endpoint: `/api/${API_ENDPOINTS.productSearch}`,
    });

    if (!paginationValidation.isValid) return paginationValidation.response;

    const priceValidation = validatePriceRange(
      minPrice,
      maxPrice,
      `/api/${API_ENDPOINTS.productSearch}`
    );

    if (!priceValidation.isValid) return priceValidation.response;

    const sortValidation = validateSort(
      sortBy,
      API_SORT_OPTIONS.SEARCH,
      `/api/${API_ENDPOINTS.productSearch}`
    );

    if (!sortValidation.isValid) return sortValidation.response;

    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;
    const pagination = buildPagination({ page: rawPage, limit: rawLimit });
    const sortOptions = buildSortOptions(sortBy, searchQuery);
    const fieldSelection = buildFieldSelection("listing");
    const mongoQuery = buildProductQuery({
      query: searchQuery,
      category,
      minPrice,
      maxPrice,
      isActive: true,
    });

    const [products, totalCount] = await Promise.all([
      Product.find(mongoQuery)
        .sort(sortOptions)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .select(fieldSelection)
        .lean(),
      Product.countDocuments(mongoQuery),
    ]);

    const transformedProducts = transformProducts(products);
    const filters = { query: searchQuery, category, sortBy, minPrice, maxPrice };
    const meta = createProductMeta(`/api/${API_ENDPOINTS.productSearch}`, filters, "mongodb");

    return createPaginatedResponse(
      transformedProducts,
      { page: pagination.page, limit: pagination.limit, total: totalCount },
      { ...meta, searchQuery: searchQuery }
    );
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      endpoint: `/api/${API_ENDPOINTS.productSearch}`,
      method: "GET",
    });

    return createErrorResponse("Search failed", error.message, { source: "mongodb" });
  }
}

/**
 * OPTIONS /api/products/search
 * @description CORS preflight handler
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
