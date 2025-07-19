/**
 * @fileoverview Main products API route handler with comprehensive filtering, sorting, and pagination
 * Handles product listing with category filtering, price ranges, boolean filters, and sorting options
 * Implements MongoDB integration with comprehensive error handling and response formatting
 * Supports both regular product listing and filtered browsing functionality
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

const ERROR_SOURCE = "products-api";

/**
 * Builds MongoDB query object from filter parameters - FOR MAIN PRODUCTS API
 * @function buildProductFilterQuery
 * @param {Object} filters - Filter parameters from request
 * @returns {Object} MongoDB query object
 */
const buildProductFilterQuery = filters => {
  const query = { isActive: true }; // Only active products

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

  // Boolean filters
  if (filters.onSale === true) {
    query.isOnSale = true;
  }

  if (filters.isNew === true) {
    query.isNewArrival = true;
  }

  if (filters.freeShipping === true) {
    console.warn("freeShipping filter requested but field doesn't exist in Product schema");
    // Skip this filter since the field doesn't exist
  }

  // Text search (if provided)
  if (filters.search && filters.search.trim()) {
    query.$text = { $search: filters.search.trim() };
  }

  return query;
};

/**
 * Builds MongoDB sort object from sortBy parameter
 * @function buildProductSort
 * @param {string} sortBy - Sort option from request
 * @param {boolean} hasTextSearch - Whether query includes text search
 * @returns {Object} MongoDB sort object
 */
const buildProductSort = (sortBy, hasTextSearch = false) => {
  // For text search, include relevance score first
  const sort = hasTextSearch ? { score: { $meta: "textScore" } } : {};

  switch (sortBy) {
    case "featured":
      return { ...sort, isFeatured: -1, salesCount: -1, createdAt: -1 };

    case "newest":
      return { ...sort, createdAt: -1 };

    case "price-low":
      return { ...sort, price: 1 };

    case "price-high":
      return { ...sort, price: -1 };

    case "name":
      return { ...sort, name: 1 };

    case "rating":
      return { ...sort, averageRating: -1, reviewCount: -1 };

    case "popularity":
      return { ...sort, salesCount: -1, viewCount: -1 };

    case "relevance":
    default:
      // For text search, relevance is handled by textScore
      // For non-search, default to featured
      return hasTextSearch ? sort : { isFeatured: -1, salesCount: -1, createdAt: -1 };
  }
};

/**
 * Products API handler for GET requests with comprehensive filtering
 * @async
 * @function GET
 * @param {Request} request - Next.js request object with URL and headers
 * @returns {Response} JSON response with filtered products or error message
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract and validate parameters
    const filters = {
      category: searchParams.get("category"),
      search: searchParams.get("search") || searchParams.get("q"),
      sortBy: searchParams.get("sortBy") || "featured",
      minPrice: searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")) : null,
      maxPrice: searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")) : null,
      onSale: searchParams.get("onSale") === "true",
      isNew: searchParams.get("isNew") === "true",
      freeShipping: searchParams.get("freeShipping") === "true",
    };

    const rawLimit = parseInt(searchParams.get("limit")) || 12;
    const rawPage = parseInt(searchParams.get("page")) || 1;

    // Validation
    const paginationValidation = validatePagination({
      limit: rawLimit,
      page: rawPage,
      maxLimit: API_VALIDATION_LIMITS.MAX_PRODUCTS_PER_PAGE || 50,
      endpoint: `/api/${API_ENDPOINTS.products}`,
    });

    if (!paginationValidation.isValid) return paginationValidation.response;

    const priceValidation = validatePriceRange(
      filters.minPrice,
      filters.maxPrice,
      `/api/${API_ENDPOINTS.products}`
    );

    if (!priceValidation.isValid) return priceValidation.response;

    const sortValidation = validateSort(
      filters.sortBy,
      [
        "featured",
        "newest",
        "price-low",
        "price-high",
        "name",
        "rating",
        "relevance",
        "popularity",
      ],
      `/api/${API_ENDPOINTS.products}`
    );

    if (!sortValidation.isValid) return sortValidation.response;

    // Connect to database
    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;

    // Build query and pagination
    const pagination = buildPagination({ page: rawPage, limit: rawLimit });
    const mongoQuery = buildProductFilterQuery(filters);
    const sortOptions = buildProductSort(filters.sortBy, !!filters.search);
    const fieldSelection = buildFieldSelection("listing");

    console.log("🔍 MongoDB Query:", JSON.stringify(mongoQuery, null, 2));
    console.log("📊 Sort Options:", JSON.stringify(sortOptions, null, 2));

    // Execute query with proper text search projection if needed
    const queryBuilder = Product.find(mongoQuery);

    // Add text search projection if searching
    if (filters.search && filters.search.trim()) {
      queryBuilder.select({ ...fieldSelection, score: { $meta: "textScore" } });
    } else {
      queryBuilder.select(fieldSelection);
    }

    const [products, totalCount] = await Promise.all([
      queryBuilder.sort(sortOptions).skip(pagination.skip).limit(pagination.limit).lean(),
      Product.countDocuments(mongoQuery),
    ]);

    console.log(`📦 Found ${products.length} products, ${totalCount} total`);

    // Transform products for frontend
    const transformedProducts = transformProducts(products);

    // Create metadata
    const meta = createProductMeta(`/api/${API_ENDPOINTS.products}`, filters, "mongodb");

    return createPaginatedResponse(
      transformedProducts,
      { page: pagination.page, limit: pagination.limit, total: totalCount },
      { ...meta, filters: filters }
    );
  } catch (error) {
    console.error("❌ Products API Error:", error);

    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      endpoint: `/api/${API_ENDPOINTS.products}`,
      method: "GET",
    });

    return createErrorResponse("Failed to fetch products", error.message, {
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
