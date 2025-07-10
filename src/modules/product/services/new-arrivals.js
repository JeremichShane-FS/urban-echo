/**
 * @fileoverview New arrivals service for retrieving the latest products added to the catalog
 * Provides API integration for fetching new arrival products with optional category filtering
 * Implements comprehensive pagination support with structured response formatting
 * Includes error handling with detailed context information for monitoring
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/utils";

/**
 * Service object for retrieving new arrival products
 * @namespace newArrivalsService
 */
export const newArrivalsService = {
  /**
   * Fetches new arrivals with optional filtering and pagination
   * @async
   * @function getNewArrivals
   * @param {Object} [params={}] - Request parameters and filters
   * @param {string} [params.category=null] - Category filter for new arrivals
   * @param {number} [params.limit=8] - Maximum number of products per page
   * @param {number} [params.page=1] - Page number for paginated results (1-based)
   * @returns {Promise<Object>} Structured response with products, pagination, and filters
   * @returns {Array} returns.products - Array of new arrival product objects
   * @returns {Object} returns.pagination - Pagination metadata (page, limit, total)
   * @returns {Object} returns.filters - Applied filters information for UI state
   * @throws {Error} Standardized error with message on API failure
   *
   * @description
   * Fetches new arrival products with flexible options:
   * - Optional category filtering for targeted browsing
   * - Configurable pagination with defaults
   * - Comprehensive error handling and reporting
   * - Consistent response structure with fallbacks
   * - Filter tracking for UI state management
   *
   * @example
   * // Get default new arrivals (first 8 products)
   * const { products, pagination } = await newArrivalsService.getNewArrivals();
   *
   * @example
   * // Get category-specific new arrivals with pagination
   * const result = await newArrivalsService.getNewArrivals({
   *   category: 'women',
   *   limit: 12,
   *   page: 2
   * });
   * // Returns second page of women's new arrivals, 12 per page
   *
   * @example
   * // Access pagination and filter data
   * const { products, pagination, filters } = await newArrivalsService.getNewArrivals();
   * // Use pagination.hasMore to show/hide "Load More" button
   * // Use filters.category for UI state of category filters
   */
  async getNewArrivals(params = {}) {
    try {
      const { category = null, limit = 8, page = 1 } = params;
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });

      if (category) queryParams.append("category", category);

      const url = `/api/${API_ENDPOINTS.newArrivals}?${queryParams}`;
      const response = await fetch(url);

      if (!response.ok) {
        const error = new Error(`Failed to fetch new arrivals: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.newArrivals,
          params,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch new arrivals");
      }

      return {
        products: result.data || [],
        pagination: result.pagination || {
          page,
          limit,
          total: 0,
          hasMore: false,
          totalPages: 0,
        },
        filters: {
          category: category || "all",
        },
      };
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "newArrivalsService",
        method: "getNewArrivals",
        endpoint: API_ENDPOINTS.newArrivals,
        params,
      });
      throw new Error("Failed to fetch new arrivals");
    }
  },
};
