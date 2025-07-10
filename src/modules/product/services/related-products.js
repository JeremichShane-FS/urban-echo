/**
 * @fileoverview Related products service for recommending similar or complementary products
 * Provides intelligent product recommendations based on product ID and category context
 * Implements customizable recommendation options for inventory filtering and quantity control
 * Includes comprehensive error handling with detailed context information for monitoring
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/utils";

/**
 * Service object for retrieving related products recommendations
 * @namespace relatedProductsService
 */
export const relatedProductsService = {
  /**
   * Fetches related products based on a given product ID with filtering options
   * @async
   * @function getRelatedProducts
   * @param {string} productId - Product ID to find recommendations for
   * @param {Object} [options={}] - Recommendation configuration options
   * @param {string} [options.category] - Restrict recommendations to specific category
   * @param {boolean} [options.excludeOutOfStock=false] - Filter out of stock products from recommendations
   * @param {number} [options.limit=4] - Maximum number of related products to return
   * @returns {Promise<Array>} Array of related product objects
   * @throws {Error} Standardized error with message on API failure
   *
   * @description
   * Provides intelligent product recommendations with flexible options:
   * - Uses product ID as primary recommendation seed
   * - Optional category restriction for relevant recommendations
   * - Inventory availability filtering for better user experience
   * - Configurable result limit for different UI layouts
   * - Comprehensive error handling with context information
   *
   * @example
   * // Basic related products with defaults
   * const relatedItems = await relatedProductsService.getRelatedProducts("prod_123");
   * // Returns 4 related products for the specified product
   *
   * @example
   * // Category-specific recommendations with stock filtering
   * const womensDresses = await relatedProductsService.getRelatedProducts("dress_001", {
   *   category: "women",
   *   excludeOutOfStock: true,
   *   limit: 6
   * });
   * // Returns 6 in-stock women's products related to dress_001
   *
   * @example
   * // With error handling
   * try {
   *   const related = await relatedProductsService.getRelatedProducts(productId);
   *   // Display related products carousel
   * } catch (error) {
   *   console.error("Could not load related products:", error.message);
   *   // Hide related products section or show fallback
   * }
   */
  async getRelatedProducts(productId, options = {}) {
    try {
      const { category, excludeOutOfStock = false, limit = 4 } = options;
      const queryParams = new URLSearchParams({
        productId,
        limit: limit.toString(),
      });

      if (category) queryParams.append("category", category);
      if (excludeOutOfStock) queryParams.append("excludeOutOfStock", "true");

      const response = await fetch(`/api/${API_ENDPOINTS.relatedProducts}?${queryParams}`);

      if (!response.ok) {
        const error = new Error(`Failed to fetch related products: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.relatedProducts,
          productId,
          options,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch related products");
      }

      return result.data || [];
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "relatedProductsService",
        method: "getRelatedProducts",
        endpoint: API_ENDPOINTS.relatedProducts,
        productId,
        options,
      });
      throw new Error("Failed to fetch related products");
    }
  },
};
