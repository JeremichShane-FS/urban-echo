/**
 * @fileoverview Main products service for comprehensive product catalog operations
 * Provides primary API integration for product listing with advanced filtering and sorting
 * Implements paginated product retrieval with standardized response structure
 * Supports search, category filtering, price ranges, and multi-dimensional sorting
 */

import { API_ENDPOINTS, DEFAULT_PAGINATION, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/utils";

/**
 * Service object for core product catalog operations
 * @namespace productsService
 */
export const productsService = {
  /**
   * Fetches products with comprehensive filtering, sorting, and pagination options
   * @async
   * @function getProducts
   * @param {Object} [params={}] - Product query parameters and filters
   * @param {string} [params.category] - Category filter for products
   * @param {number} [params.limit=DEFAULT_PAGINATION.limit] - Number of products per page
   * @param {number} [params.maxPrice] - Maximum price filter for products
   * @param {number} [params.minPrice] - Minimum price filter for products
   * @param {number} [params.page=DEFAULT_PAGINATION.page] - Page number for pagination
   * @param {string} [params.search] - Text search query for product filtering
   * @param {string} [params.sortBy="newest"] - Sort field for ordering results
   * @returns {Promise<Object>} Products response with paginated products and metadata
   * @returns {Array} returns.products - Array of product objects matching filters
   * @returns {Object} returns.pagination - Pagination metadata for navigation
   * @returns {Object} returns.meta - Additional response metadata for analytics
   * @throws {Error} Standardized error with message on API failure
   *
   * @description
   * Primary product catalog access with comprehensive options:
   * - Multi-dimensional filtering by category, price range, and search terms
   * - Flexible sorting options (newest, price, relevance, etc.)
   * - Standard pagination with configurable limits
   * - Structured error handling with monitoring and reporting
   * - Consistent response structure with metadata for UI components
   *
   * @example
   * // Basic product listing with defaults
   * const { products, pagination } = await productsService.getProducts();
   * // Returns first page of products sorted by newest
   *
   * @example
   * // Advanced filtering with pagination and sorting
   * const result = await productsService.getProducts({
   *   category: 'men',
   *   minPrice: 25,
   *   maxPrice: 100,
   *   page: 2,
   *   limit: 24,
   *   sortBy: 'price-low',
   *   search: 'shirt'
   * });
   * // Returns men's shirts between $25-$100, sorted by price low to high, page 2
   *
   * @example
   * // Destructuring response for component rendering
   * const { products, pagination, meta } = await productsService.getProducts({
   *   category: 'accessories'
   * });
   *
   * return (
   *   <>
   *     <ProductGrid products={products} />
   *     <Pagination
   *       currentPage={pagination.page}
   *       totalPages={pagination.totalPages}
   *     />
   *   </>
   * );
   */
  async getProducts(params = {}) {
    try {
      const {
        category,
        limit = DEFAULT_PAGINATION.limit,
        maxPrice,
        minPrice,
        page = DEFAULT_PAGINATION.page,
        search,
        sortBy = "newest",
      } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
      });

      if (category) queryParams.append("category", category);
      if (search) queryParams.append("q", search);
      if (minPrice) queryParams.append("minPrice", minPrice.toString());
      if (maxPrice) queryParams.append("maxPrice", maxPrice.toString());

      const response = await fetch(`/api/${API_ENDPOINTS.products}?${queryParams}`);

      if (!response.ok) {
        const error = new Error(`Failed to fetch products: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.products,
          params,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch products");
      }

      return {
        products: result.data || [],
        pagination: result.pagination || {},
        meta: result.meta || {},
      };
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "productsService",
        method: "getProducts",
        endpoint: API_ENDPOINTS.products,
        params,
      });
      throw new Error("Failed to fetch products");
    }
  },
};
