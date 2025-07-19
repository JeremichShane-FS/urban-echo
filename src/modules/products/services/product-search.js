/**
 * @fileoverview  product search service for comprehensive product discovery
 * Provides advanced search with text matching, filtering, sorting, and pagination
 * Handles parameter mapping and query string construction for API compatibility
 */

import { API_ENDPOINTS } from "@config/constants";
import { get } from "@modules/core/services";

/**
 * Searches products using text query with comprehensive filtering capabilities
 * @async
 * @function searchProducts
 * @param {Object} [params={}] - Search parameters and filters
 * @param {string} [params.search] - Search query string for product name, description, or tags
 * @param {string} [params.q] - Alternative search query parameter (takes precedence over search)
 * @param {string} [params.category] - Category filter for narrowed results
 * @param {string} [params.sortBy="relevance"] - Sort option for search results
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=12] - Number of results per page
 * @param {number} [params.minPrice] - Minimum price filter
 * @param {number} [params.maxPrice] - Maximum price filter
 * @param {boolean} [params.onSale] - Filter for products on sale
 * @param {boolean} [params.newArrivals] - Filter for new arrival products
 * @param {boolean} [params.isNew] - Alternative parameter for new arrivals (API compatibility)
 * @param {boolean} [params.freeShipping] - Filter for products with free shipping
 * @returns {Promise<Object>} Search results with relevance scoring and metadata
 *
 * @example
 * // Basic text search
 * const results = await searchProducts({ search: "blue shirt" });
 *
 * @example
 * // Advanced search with filters
 * const results = await searchProducts({
 *   search: "jacket",
 *   category: "men",
 *   sortBy: "price-low",
 *   minPrice: 50,
 *   maxPrice: 200,
 *   onSale: true
 * });
 *
 * @example
 * // Search with pagination
 * const results = await searchProducts({
 *   search: "dress",
 *   page: 2,
 *   limit: 24,
 *   sortBy: "rating"
 * });
 */
export const searchProducts = async (params = {}) => {
  // Build query parameters for search API
  const queryParams = new URLSearchParams();

  // Search query - prioritize 'q' parameter, fallback to 'search'
  const searchQuery = params.q || params.search;
  if (searchQuery && searchQuery.trim()) {
    queryParams.append("q", searchQuery.trim());
  }

  // Category filter
  if (params.category && params.category !== "all") {
    queryParams.append("category", params.category);
  }

  // Sorting - default to relevance for search
  const sortBy = params.sortBy || "relevance";
  queryParams.append("sortBy", sortBy);

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 12;
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  // Price range filters
  if (params.minPrice !== null && params.minPrice !== undefined) {
    queryParams.append("minPrice", params.minPrice.toString());
  }

  if (params.maxPrice !== null && params.maxPrice !== undefined) {
    queryParams.append("maxPrice", params.maxPrice.toString());
  }

  // Boolean filters
  if (params.onSale === true) {
    queryParams.append("onSale", "true");
  }

  // Handle both newArrivals (from frontend) and isNew (API parameter)
  if (params.newArrivals === true || params.isNew === true) {
    queryParams.append("isNew", "true");
  }

  if (params.freeShipping === true) {
    queryParams.append("freeShipping", "true");
  }

  // Use search endpoint with constructed query string
  const endpoint = `${API_ENDPOINTS.productSearch}?${queryParams.toString()}`;

  return get(endpoint);
};

/**
 * Product search service object containing all search functions
 * @namespace productSearchService
 * @description Provides a centralized interface for all product search API operations
 */
const productSearchService = {
  searchProducts,
};

export default productSearchService;
