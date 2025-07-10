/**
 * @fileoverview Product search service for executing flexible search queries against product catalog
 * Provides advanced search capabilities with filtering, pagination, and relevance sorting
 * Implements secure API integration with comprehensive error handling for search operations
 * Returns structured search results with pagination metadata for UI rendering
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/utils";

/**
 * Service object for executing product search operations
 * @namespace productSearchService
 */
export const productSearchService = {
  /**
   * Searches products based on text query with filtering and pagination options
   * @async
   * @function searchProducts
   * @param {string} query - Search query text to find matching products
   * @param {Object} [params={}] - Search parameters and options
   * @param {string} [params.category] - Category filter to narrow search results
   * @param {number} [params.limit=20] - Maximum number of results per page
   * @param {number} [params.page=1] - Page number for paginated results (1-based)
   * @param {string} [params.sortBy="relevance"] - Sort order for results (relevance, price-low, price-high, newest)
   * @returns {Promise<Object>} Search results with products, pagination, and metadata
   * @returns {Array} returns.products - Array of product objects matching the search criteria
   * @returns {Object} returns.pagination - Pagination metadata (page, limit, total, totalPages)
   * @returns {Object} returns.meta - Additional search metadata (searchTime, resultCount)
   * @throws {Error} Standardized error with message on API failure
   *
   * @description
   * Executes product searches with comprehensive options:
   * - Full-text search across product fields
   * - Optional category filtering
   * - Configurable pagination and sorting
   * - Relevance-based sorting with fallback to newest
   * - Structured error handling with context information
   * - Detailed response structure with metadata
   *
   * @example
   * // Basic search for "blue shirt"
   * const results = await productSearchService.searchProducts("blue shirt");
   * // Returns first 20 products matching "blue shirt" with pagination
   *
   * @example
   * // Advanced search with filtering and sorting
   * const filteredResults = await productSearchService.searchProducts("dress", {
   *   category: "women",
   *   limit: 12,
   *   page: 2,
   *   sortBy: "price-low"
   * });
   * // Returns second page of women's dresses, sorted by price ascending
   *
   * @example
   * // Handle search errors
   * try {
   *   const results = await productSearchService.searchProducts("sneakers");
   *   // Process search results
   * } catch (error) {
   *   console.error("Search failed:", error.message);
   *   // Show error message or fallback UI
   * }
   */
  async searchProducts(query, params = {}) {
    try {
      const { category, limit = 20, page = 1, sortBy = "relevance" } = params;

      const queryParams = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: limit.toString(),
        sortBy: sortBy === "relevance" ? "newest" : sortBy,
      });

      if (category) queryParams.append("category", category);

      const response = await fetch(`/api/${API_ENDPOINTS.productSearch}?${queryParams}`);

      if (!response.ok) {
        const error = new Error(`Failed to search products: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.productSearch,
          query,
          params,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to search products");
      }

      return {
        products: result.data || [],
        pagination: result.pagination || {},
        meta: result.meta || {},
      };
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "productSearchService",
        method: "searchProducts",
        endpoint: API_ENDPOINTS.productSearch,
        query,
        params,
      });
      throw new Error("Failed to search products");
    }
  },
};
