/**
 * @fileoverview Categories service for product categories and category-based filtering
 * Handles category listing and product filtering by category with comprehensive options
 * Provides hierarchical category data with subcategories and product count statistics
 * Implements secure API integration with error handling and contextual logging
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/utils";

/**
 * Service object for managing product categories data
 * @namespace categoriesService
 */
export const categoriesService = {
  /**
   * Get all categories with optional metadata and structure options
   * @async
   * @function getCategories
   * @param {Object} [params={}] - Query parameters and options
   * @param {boolean} [params.includeProductCount=false] - Include product count statistics for each category
   * @param {boolean} [params.includeSubCategories=false] - Include nested subcategories with hierarchical structure
   * @param {string} [params.status='active'] - Filter categories by status ('active', 'archived', 'all')
   * @returns {Promise<Array>} Array of category objects with requested metadata
   * @throws {Error} Standardized error with message on API failure
   *
   * @description
   * Fetches product categories with configurable options:
   * - Optional product count statistics for inventory insights
   * - Hierarchical structure with nested subcategories
   * - Status filtering for administrative interfaces
   * - Consistent error handling with context tracking
   *
   * @example
   * // Get basic categories (active only)
   * const categories = await categoriesService.getCategories();
   *
   * @example
   * // Get complete category hierarchy with product counts
   * const detailedCategories = await categoriesService.getCategories({
   *   includeProductCount: true,
   *   includeSubCategories: true
   * });
   *
   * @example
   * // Get all categories including inactive ones
   * const allCategories = await categoriesService.getCategories({
   *   status: 'all'
   * });
   */
  async getCategories(params = {}) {
    try {
      const {
        includeProductCount = false,
        includeSubCategories = false,
        status = "active",
      } = params;

      const queryParams = new URLSearchParams();
      if (includeProductCount) queryParams.append("includeProductCount", "true");
      if (includeSubCategories) queryParams.append("includeSubCategories", "true");
      if (status !== "active") queryParams.append("status", status);

      const url = `/api/${API_ENDPOINTS.categories}${queryParams.toString() ? `?${queryParams}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        const error = new Error(`Failed to fetch categories: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.categories,
          params,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch categories");
      }

      return result.data || [];
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "categoriesService",
        method: "getCategories",
        endpoint: API_ENDPOINTS.categories,
        params,
      });
      throw new Error("Failed to fetch categories");
    }
  },

  /**
   * Get products filtered by category with pagination and sorting
   * @async
   * @function getCategoryProducts
   * @param {string} categorySlug - Category slug identifier for URL-friendly lookup
   * @param {Object} [params={}] - Query parameters for filtering and pagination
   * @param {number} [params.page] - Page number for pagination (1-based)
   * @param {number} [params.limit] - Number of products per page
   * @param {string} [params.sortBy] - Field to sort results by (e.g., 'price', 'name', 'newest')
   * @param {string} [params.sortOrder] - Sort direction ('asc' or 'desc')
   * @param {number} [params.minPrice] - Minimum price filter
   * @param {number} [params.maxPrice] - Maximum price filter
   * @param {Array<string>} [params.attributes] - Filter by product attributes/options
   * @returns {Promise<Object>} Product listing with pagination metadata
   * @throws {Error} Standardized error with message on API failure
   *
   * @description
   * Fetches products within a specific category:
   * - Supports URL-friendly category slugs
   * - Includes pagination and sorting options
   * - Provides price range filtering
   * - Supports attribute-based filtering
   * - Returns standardized response with products and pagination info
   *
   * @example
   * // Get first page of men's clothing products
   * const mensProducts = await categoriesService.getCategoryProducts('men', {
   *   page: 1,
   *   limit: 20
   * });
   *
   * @example
   * // Get women's products sorted by price with filtering
   * const filteredProducts = await categoriesService.getCategoryProducts('women', {
   *   sortBy: 'price',
   *   sortOrder: 'asc',
   *   minPrice: 25,
   *   maxPrice: 100,
   *   attributes: ['color-blue', 'size-m']
   * });
   */
  async getCategoryProducts(categorySlug, params = {}) {
    try {
      const queryParams = new URLSearchParams(params);
      const url = `/api/${API_ENDPOINTS.categories}/${categorySlug}/products${queryParams.toString() ? `?${queryParams}` : ""}`;

      const response = await fetch(url);

      if (!response.ok) {
        const error = new Error(`Failed to fetch category products: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: `${API_ENDPOINTS.categories}/${categorySlug}/products`,
          categorySlug,
          params,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch category products");
      }

      return result.data || [];
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "categoriesService",
        method: "getCategoryProducts",
        endpoint: `${API_ENDPOINTS.categories}/${categorySlug}/products`,
        categorySlug,
        params,
      });
      throw new Error("Failed to fetch category products");
    }
  },
};
