import { API_VALIDATION_LIMITS, DEFAULT_PAGINATION, FIELD_SELECTIONS } from "@config/constants";

/**
 * Builds a MongoDB query for product searches
 * @param {Object} params - Search parameters
 * @param {string} params.query - Text search query
 * @param {string} params.category - Category filter
 * @param {number} params.minPrice - Minimum price filter
 * @param {number} params.maxPrice - Maximum price filter
 * @param {boolean} params.isActive - Filter for active products (default: true)
 * @param {boolean} params.isFeatured - Filter for featured products
 * @param {boolean} params.isNewArrival - Filter for new arrivals
 * @param {boolean} params.isBestSeller - Filter for best sellers
 * @returns {Object} MongoDB query object
 */
export function buildProductQuery(params = {}) {
  const {
    category,
    isActive = true,
    isBestSeller,
    isFeatured,
    isNewArrival,
    maxPrice,
    minPrice,
    query,
  } = params;

  const mongoQuery = { isActive };

  // Text search across multiple fields
  if (query?.trim()) {
    mongoQuery.$or = [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { tags: { $in: [new RegExp(query, "i")] } },
      { brand: { $regex: query, $options: "i" } },
    ];
  }

  // Category filter
  if (category) mongoQuery.category = category;

  // Price range filter
  if (
    (minPrice !== null && minPrice !== undefined) ||
    (maxPrice !== null && maxPrice !== undefined)
  ) {
    mongoQuery.price = {};
    if (minPrice !== null && minPrice !== undefined) mongoQuery.price.$gte = minPrice;
    if (maxPrice !== null && maxPrice !== undefined) mongoQuery.price.$lte = maxPrice;
  }

  // Boolean filters
  if (isFeatured !== undefined) mongoQuery.isFeatured = isFeatured;
  if (isNewArrival !== undefined) mongoQuery.isNewArrival = isNewArrival;
  if (isBestSeller !== undefined) mongoQuery.isBestSeller = isBestSeller;

  return mongoQuery;
}

/**
 * Builds sort options for product queries
 * @param {string} sortBy - Sort field (price-low, price-high, rating, newest, oldest, relevance)
 * @param {string} query - Text query (affects relevance sorting)
 * @returns {Object} MongoDB sort object
 */
export function buildSortOptions(sortBy = "newest", query = "") {
  const sortOptionsMap = {
    "price-low": { price: 1 },
    "price-high": { price: -1 },
    rating: { averageRating: -1, reviewCount: -1 },
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    popularity: { salesCount: -1, averageRating: -1 },
  };

  if (sortOptionsMap[sortBy]) {
    return sortOptionsMap[sortBy];
  }

  // Handle relevance and default cases
  if (sortBy === "relevance" && query.trim()) {
    return { score: { $meta: "textScore" } };
  }

  // Default to newest
  return sortOptionsMap.newest;
}

/**
 * Builds pagination parameters
 * @param {Object} params - Pagination parameters
 * @param {number} params.page - Current page number
 * @param {number} params.limit - Items per page
 * @param {number} params.maxLimit - Maximum allowed limit (default: 100)
 * @returns {Object} Pagination object with skip, limit, page
 */
export function buildPagination(params = {}) {
  const {
    limit = DEFAULT_PAGINATION.limit,
    maxLimit = API_VALIDATION_LIMITS.MAX_PRODUCTS_PER_REQUEST,
    page = DEFAULT_PAGINATION.page,
  } = params;

  const sanitizedPage = Math.max(1, parseInt(page));
  const sanitizedLimit = Math.min(maxLimit, Math.max(1, parseInt(limit)));
  const skip = (sanitizedPage - 1) * sanitizedLimit;

  return {
    page: sanitizedPage,
    limit: sanitizedLimit,
    skip,
  };
}

/**
 * Builds field selection for MongoDB queries
 * @param {string} type - Query type (listing, detail, minimal)
 * @returns {Object} MongoDB field selection object
 */
export function buildFieldSelection(type = "listing") {
  return FIELD_SELECTIONS[type.toUpperCase()] || FIELD_SELECTIONS.LISTING;
}
