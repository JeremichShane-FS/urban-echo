/**
 * @fileoverview product search API route handler for Next.js API routes
 * Provides full-featured product search with text matching, filtering, and pagination
 * Implements MongoDB integration with comprehensive error handling and response formatting
 * Updated to match main products API filter handling for consistency
 */

import { API_ENDPOINTS, API_VALIDATION_LIMITS, ERROR_TYPES } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/utils";
import {
  buildFieldSelection,
  buildPagination,
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
 * Builds MongoDB query object for text search with filters
 * @function buildSearchQuery
 * @param {Object} filters - Filter parameters from request
 * @returns {Object} MongoDB query object with text search
 */
const buildSearchQuery = filters => {
  const query = { isActive: true };

  // Text search - required for search endpoint
  if (filters.searchQuery && filters.searchQuery.trim()) {
    query.$text = { $search: filters.searchQuery.trim() };
  }

  // Category filtering
  if (filters.category && filters.category !== "all") {
    query.category = filters.category;
  }

  // Price range filtering
  if (filters.minPrice !== null || filters.maxPrice !== null) {
    query.price = {};
    if (filters.minPrice !== null) {
      query.price.$gte = filters.minPrice;
    }
    if (filters.maxPrice !== null) {
      query.price.$lte = filters.maxPrice;
    }
  }

  if (filters.onSale === true) {
    query.isOnSale = true;
  }

  if (filters.isNew === true) {
    query.isNewArrival = true;
  }

  if (filters.freeShipping === true) {
    query.freeShipping = true;
  }

  return query;
};

/**
 * Builds MongoDB sort object for search results
 * @function buildSearchSort
 * @param {string} sortBy - Sort option from request
 * @returns {Object} MongoDB sort object with text relevance
 */
const buildSearchSort = sortBy => {
  // Always include text relevance score for search
  const baseSort = { score: { $meta: "textScore" } };

  switch (sortBy) {
    case "relevance":
    default:
      return baseSort;

    case "featured":
      return { ...baseSort, isFeatured: -1, salesCount: -1, createdAt: -1 };

    case "newest":
      return { ...baseSort, createdAt: -1 };

    case "price-low":
      return { ...baseSort, price: 1 };

    case "price-high":
      return { ...baseSort, price: -1 };

    case "name":
      return { ...baseSort, name: 1 };

    case "rating":
      return { ...baseSort, averageRating: -1, reviewCount: -1 };
  }
};

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
 * - Boolean filters (onSale, isNew, freeShipping) - consistent with main API
 * - Multiple sorting options with relevance scoring
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
 * // Price range with boolean filters
 * GET /api/products/search?q=jacket&minPrice=50&maxPrice=200&onSale=true
 *
 * @example
 * // New arrivals search with free shipping
 * GET /api/products/search?q=shirt&isNew=true&freeShipping=true&sortBy=newest
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract search query and filters
    const searchQuery = searchParams.get("q") || searchParams.get("search") || "";
    const filters = {
      searchQuery: searchQuery.trim(),
      category: searchParams.get("category"),
      sortBy: searchParams.get("sortBy") || "relevance",
      minPrice: searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")) : null,
      maxPrice: searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")) : null,
      onSale: searchParams.get("onSale") === "true",
      isNew: searchParams.get("isNew") === "true",
      freeShipping: searchParams.get("freeShipping") === "true",
    };

    const rawLimit = parseInt(searchParams.get("limit")) || 12;
    const rawPage = parseInt(searchParams.get("page")) || 1;

    // Require search query for search endpoint
    if (!filters.searchQuery) {
      return createErrorResponse(
        "Search query required",
        "Parameter 'q' or 'search' is required for search endpoint",
        {
          source: "validation",
          endpoint: `/api/${API_ENDPOINTS.productSearch}`,
        }
      );
    }

    // Validation
    const paginationValidation = validatePagination({
      limit: rawLimit,
      page: rawPage,
      maxLimit: API_VALIDATION_LIMITS.MAX_SEARCH_RESULTS || 50,
      endpoint: `/api/${API_ENDPOINTS.productSearch}`,
    });

    if (!paginationValidation.isValid) return paginationValidation.response;

    const priceValidation = validatePriceRange(
      filters.minPrice,
      filters.maxPrice,
      `/api/${API_ENDPOINTS.productSearch}`
    );

    if (!priceValidation.isValid) return priceValidation.response;

    const sortValidation = validateSort(
      filters.sortBy,
      ["relevance", "featured", "newest", "price-low", "price-high", "name", "rating"],
      `/api/${API_ENDPOINTS.productSearch}`
    );

    if (!sortValidation.isValid) return sortValidation.response;

    // Connect to database
    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;

    // Build query and pagination
    const pagination = buildPagination({ page: rawPage, limit: rawLimit });
    const mongoQuery = buildSearchQuery(filters);
    const sortOptions = buildSearchSort(filters.sortBy);
    const fieldSelection = { ...buildFieldSelection("listing"), score: { $meta: "textScore" } };

    console.log("🔍 Search Query:", JSON.stringify(mongoQuery, null, 2));
    console.log("📊 Sort Options:", JSON.stringify(sortOptions, null, 2));
    console.log("🔍 All Filters Applied:", JSON.stringify(filters, null, 2));

    // Execute search query
    const [products, totalCount] = await Promise.all([
      Product.find(mongoQuery)
        .select(fieldSelection)
        .sort(sortOptions)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean(),
      Product.countDocuments(mongoQuery),
    ]);

    console.log(`🔍 Search found ${products.length} products, ${totalCount} total`);

    // Transform products for frontend
    const transformedProducts = transformProducts(products);

    // Create metadata
    const meta = createProductMeta(`/api/${API_ENDPOINTS.productSearch}`, filters, "mongodb");

    return createPaginatedResponse(
      transformedProducts,
      { page: pagination.page, limit: pagination.limit, total: totalCount },
      { ...meta, searchQuery: filters.searchQuery, filters: filters }
    );
  } catch (error) {
    console.error("❌ Search API Error:", error);

    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      endpoint: `/api/${API_ENDPOINTS.productSearch}`,
      method: "GET",
    });

    return createErrorResponse("Search failed", error.message, {
      source: "mongodb",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * CORS preflight handler for OPTIONS requests
 * @async
 * @function OPTIONS
 * @returns {Response} CORS headers response for preflight requests
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
