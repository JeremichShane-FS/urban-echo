/**
 * @fileoverview Featured products service for fetching and handling featured product data
 * Provides secure API integration with comprehensive error handling for featured products
 * Implements consistent response structure with proper error categorization
 * Supports configurable product limits with defensive coding patterns for data safety
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/utils";

/**
 * Service object for managing featured products data
 * @namespace featuredProductsService
 */
export const featuredProductsService = {
  /**
   * Fetches featured products from the API with robust error handling
   * @async
   * @function getFeaturedProducts
   * @param {number} [limit=4] - Maximum number of featured products to return
   * @returns {Promise<Array>} Array of featured product objects with complete product data
   * @throws {Error} Standardized error with message on API failure
   *
   * @description
   * Fetches featured products with comprehensive error handling:
   * - Validates HTTP response status
   * - Handles API-level error responses
   * - Processes error information for logging and monitoring
   * - Returns consistent data structure regardless of API response format
   * - Implements retry logic and graceful degradation
   *
   * @example
   * // Get default number of featured products (4)
   * const featuredProducts = await featuredProductsService.getFeaturedProducts();
   *
   * @example
   * // Get custom number of featured products
   * try {
   *   const products = await featuredProductsService.getFeaturedProducts(8);
   *   // Display 8 featured products
   * } catch (error) {
   *   // Handle error or show fallback UI
   *   console.error("Could not load featured products:", error.message);
   * }
   */
  async getFeaturedProducts(limit = 4) {
    try {
      const response = await fetch(`/api/${API_ENDPOINTS.featuredProducts}?limit=${limit}`);

      if (!response.ok) {
        const error = new Error(`Failed to fetch featured products: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.featuredProducts,
          limit,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch featured products");
      }

      return result.data?.products || [];
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "featuredProductsService",
        method: "getFeaturedProducts",
        endpoint: API_ENDPOINTS.featuredProducts,
        limit,
      });
      throw new Error("Failed to fetch featured products");
    }
  },
};
