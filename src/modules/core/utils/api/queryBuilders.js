/**
 * @fileoverview MongoDB query building utilities for product search and filtering operations
 * Provides comprehensive query construction for product searches, sorting, pagination, and field selection
 * Handles complex search criteria including text search, price ranges, category filters, and boolean flags
 * Includes validation and sanitization for pagination parameters and MongoDB-specific query optimization
 */

import { API_VALIDATION_LIMITS, DEFAULT_PAGINATION, FIELD_SELECTIONS } from "@config/constants";

/**
 * Builds a comprehensive MongoDB query for product searches with multiple filter criteria
 * @function buildProductQuery
 * @param {Object} [params={}] - Search parameters for filtering products
 * @param {string} [params.query] - Text search query for name, description, tags, and brand
 * @param {string} [params.category] - Category filter for product categorization
 * @param {number} [params.minPrice] - Minimum price filter for price range queries
 * @param {number} [params.maxPrice] - Maximum price filter for price range queries
 * @param {boolean} [params.isActive=true] - Filter for active products (default: true)
 * @param {boolean} [params.isFeatured] - Filter for featured products
 * @param {boolean} [params.isNewArrival] - Filter for new arrival products
 * @param {boolean} [params.isBestSeller] - Filter for best-selling products
 * @returns {Object} MongoDB query object with structured filter conditions
 *
 * @description
 * Creates complex MongoDB queries supporting:
 * - Full-text search across multiple fields with case-insensitive regex
 * - Price range filtering with flexible min/max bounds
 * - Category-based filtering for product organization
 * - Boolean flag filtering for featured, new arrivals, and best sellers
 * - Active/inactive product state management
 *
 * @example
 * const query = buildProductQuery({
 *   query: "blue shirt",
 *   category: "men",
 *   minPrice: 25,
 *   maxPrice: 100,
 *   isFeatured: true
 * });
 * // Returns MongoDB query for featured men's products containing "blue shirt" between $25-$100
 *
 * @example
 * const simpleQuery = buildProductQuery({ category: "women" });
 * // Returns query for all active women's products
 */
export const buildProductQuery = (params = {}) => {
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
};

/**
 * Builds MongoDB sort options for product queries with comprehensive sorting strategies
 * @function buildSortOptions
 * @param {string} [sortBy="newest"] - Sort field identifier (price-low, price-high, rating, newest, oldest, relevance, popularity)
 * @param {string} [query=""] - Text query string (affects relevance sorting with text score)
 * @returns {Object} MongoDB sort object with appropriate field ordering
 *
 * @description
 * Provides multiple sorting strategies:
 * - Price sorting (ascending/descending)
 * - Rating-based sorting with review count secondary sort
 * - Date-based sorting (newest/oldest)
 * - Popularity sorting based on sales and ratings
 * - Relevance sorting using MongoDB text search scores
 *
 * @example
 * const sortOptions = buildSortOptions("price-low");
 * // Returns: { price: 1 } (ascending price sort)
 *
 * @example
 * const relevanceSort = buildSortOptions("relevance", "blue shirt");
 * // Returns: { score: { $meta: "textScore" } } (text search relevance)
 *
 * @example
 * const popularitySort = buildSortOptions("popularity");
 * // Returns: { salesCount: -1, averageRating: -1 } (multi-field popularity sort)
 */
export const buildSortOptions = (sortBy = "newest", query = "") => {
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
};

/**
 * Builds validated pagination parameters with safety limits and sanitization
 * @function buildPagination
 * @param {Object} [params={}] - Pagination parameters from request
 * @param {number} [params.page] - Current page number (1-based indexing)
 * @param {number} [params.limit] - Items per page requested
 * @param {number} [params.maxLimit] - Maximum allowed limit override (default from constants)
 * @returns {Object} Sanitized pagination object with skip, limit, and page values
 * @returns {number} returns.page - Validated page number (minimum 1)
 * @returns {number} returns.limit - Validated limit (within allowed bounds)
 * @returns {number} returns.skip - Calculated skip value for MongoDB
 *
 * @description
 * Provides secure pagination with:
 * - Input sanitization and validation
 * - Maximum limit enforcement for performance
 * - Minimum value constraints (page >= 1, limit >= 1)
 * - Skip calculation for MongoDB offset-based pagination
 *
 * @example
 * const pagination = buildPagination({ page: 2, limit: 20 });
 * // Returns: { page: 2, limit: 20, skip: 20 }
 *
 * @example
 * const safePagination = buildPagination({ page: -1, limit: 1000 });
 * // Returns: { page: 1, limit: 100, skip: 0 } (sanitized to safe values)
 *
 * @example
 * const defaultPagination = buildPagination({});
 * // Returns default pagination from constants
 */
export const buildPagination = (params = {}) => {
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
};

/**
 * Builds MongoDB field selection objects for optimized query performance
 * @function buildFieldSelection
 * @param {string} [type="listing"] - Query type for field selection (listing, detail, minimal)
 * @returns {Object} MongoDB field selection object for projection
 *
 * @description
 * Optimizes database queries by selecting only required fields:
 * - "listing": Fields needed for product lists and cards
 * - "detail": Full product data for detail pages
 * - "minimal": Minimal fields for search suggestions and autocomplete
 * - Falls back to listing selection for unknown types
 *
 * @example
 * const listingFields = buildFieldSelection("listing");
 * // Returns optimized field selection for product listing pages
 *
 * @example
 * const detailFields = buildFieldSelection("detail");
 * // Returns full field selection for product detail pages
 *
 * @example
 * const minimalFields = buildFieldSelection("minimal");
 * // Returns minimal field selection for search autocomplete
 */
export const buildFieldSelection = (type = "listing") => {
  return FIELD_SELECTIONS[type.toUpperCase()] || FIELD_SELECTIONS.LISTING;
};
