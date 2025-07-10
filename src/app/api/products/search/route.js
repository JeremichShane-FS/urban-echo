/**
 * @fileoverview Product search API route handler for Next.js API routes
 * Provides full-featured product search with text matching, filtering, and pagination
 * Implements MongoDB integration with comprehensive error handling and response formatting
 * Supports CORS with appropriate preflight response handling for cross-origin requests
 */

import {
  API_ENDPOINTS,
  API_SORT_OPTIONS,
  API_VALIDATION_LIMITS,
  ERROR_TYPES,
} from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/utils";
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
 * Product search API handler for GET requests
 * @async
 * @function GET
 * @param {Request} request - Next.js request object with URL and headers
 * @returns {Response} JSON response with search results or error message
 *
 * @description
 * Handles product search requests with comprehensive options:
 * - Full-text search across product fields (name, description, tags)
 * - Category-based filtering for narrowed results
 * - Price range filtering with min/max bounds
 * - Multiple sorting options (relevance, price, rating, date)
 * - Pagination with configurable limit and page number
 * - Comprehensive input validation and error handling
 * - Standardized response formatting with metadata
 *
 * @example
 * // Basic text search
 * GET /api/products/search?q=blue+shirt
 *
 * @example
 * // Category filtering with sorting
 * GET /api/products/search?q=dress&category=women&sortBy=price-low
 *
 * @example
 * // Price range with pagination
 * GET /api/products/search?minPrice=25&maxPrice=100&page=2&limit=24
 *
 * @example
 * // Complete search with all parameters
 * GET /api/products/search?q=jacket&category=men&sortBy=rating&minPrice=50&maxPrice=200&page=1&limit=20
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
 * CORS preflight handler for OPTIONS requests
 * @async
 * @function OPTIONS
 * @returns {Response} CORS headers response for preflight requests
 *
 * @description
 * Handles CORS preflight requests for the product search API:
 * - Sets appropriate Access-Control headers for cross-origin requests
 * - Configures allowed methods (GET only for search endpoints)
 * - Enables secure cross-origin access to the search API
 * - Returns empty response body with status 200 OK
 *
 * @example
 * // Browser automatically sends OPTIONS request before cross-origin search
 * OPTIONS /api/products/search
 *
 * @example
 * // Response headers will include:
 * // Access-Control-Allow-Origin: *
 * // Access-Control-Allow-Methods: GET
 * // Access-Control-Allow-Headers: Content-Type, Authorization
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
