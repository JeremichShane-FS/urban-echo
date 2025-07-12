/**
 * @fileoverview Best sellers service for fetching top-selling product data
 * Provides secure API integration with comprehensive error handling for bestselling products
 * Implements consistent response structure with proper error categorization
 * Supports configurable product limits with defensive coding patterns for data safety
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/utils";

/**
 * Fetches best-selling products from the API with robust error handling
 * @async
 * @function getBestSellers
 * @param {number} [limit=8] - Maximum number of best-selling products to return
 * @returns {Promise<Array>} Array of best-selling product objects with complete product data
 * @throws {Error} Standardized error with message on API failure
 *
 * @description
 * Fetches best-selling products with comprehensive error handling:
 * - Validates HTTP response status
 * - Handles API-level error responses
 * - Processes error information for logging and monitoring
 * - Returns consistent data structure regardless of API response format
 * - Implements graceful degradation with standardized error messages
 *
 * @example
 * // Get default number of best sellers (8)
 * const bestSellerProducts = await bestSellersService.getBestSellers();
 *
 * @example
 * // Get custom number of best sellers
 * try {
 *   const products = await bestSellersService.getBestSellers(12);
 *   // Display 12 best-selling products
 * } catch (error) {
 *   // Handle error or show fallback UI
 *   console.error("Could not load best sellers:", error.message);
 * }
 */
export const getBestSellers = async (limit = 8) => {
  try {
    const response = await fetch(`/api/${API_ENDPOINTS.bestSellers}?limit=${limit}`);

    if (!response.ok) {
      const error = new Error(`Failed to fetch best sellers: ${response.statusText}`);
      error.status = response.status;
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        endpoint: API_ENDPOINTS.bestSellers,
        limit,
      });
      throw error;
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || result.error || "Failed to fetch best sellers");
    }

    return result.data?.products || [];
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      service: "bestSellersService",
      method: "getBestSellers",
      endpoint: API_ENDPOINTS.bestSellers,
      limit,
    });
    throw new Error("Failed to fetch best sellers");
  }
};

/**
 * Service object for managing best-selling products data
 * @namespace bestSellersService
 * @description Provides a centralized interface for all best seller API operations
 */
const bestSellersService = {
  getBestSellers,
};

export default bestSellersService;
