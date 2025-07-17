/**
 * @fileoverview Product details service for retrieving complete product information
 * Provides secure API integration for single product data fetching with ID-based lookup
 * Implements comprehensive error handling with structured error reporting
 * Passes through detailed product data for product detail pages and modals
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/utils";

/**
 * Fetches complete product details by product ID
 * @async
 * @function getProduct
 * @param {string} productId - MongoDB ObjectId or unique product identifier
 * @returns {Promise<Object>} Complete product object with all details and metadata
 * @throws {Error} API error with status code and message when product fetch fails
 *
 * @description
 * Retrieves comprehensive product data for detail views:
 * - Uses unique product IDs for fast, reliable database lookup
 * - Returns complete product data including variants, images, specifications
 * - Provides structured error handling with HTTP status preservation
 * - Passes through original API errors for detailed client-side handling
 * - Tracks API errors with context for monitoring and debugging
 *
 * @example
 * // Fetch product details using the product ID
 * const product = await productDetailsService.getProduct('6871817f6f3e94d4980860bd');
 *
 * @example
 * // With error handling for product not found
 * try {
 *   const product = await productDetailsService.getProduct('invalid-product-id');
 *   // Display product details
 * } catch (error) {
 *   if (error.status === 404) {
 *     // Show product not found message
 *   } else {
 *     // Show general error message
 *   }
 * }
 */
export const getProduct = async productId => {
  try {
    const response = await fetch(`/api/${API_ENDPOINTS.products}/${productId}`);

    if (!response.ok) {
      const error = new Error(`Failed to fetch product: ${response.statusText}`);
      error.status = response.status;
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        endpoint: `${API_ENDPOINTS.products}/${productId}`,
        productId,
      });
      throw error;
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || result.error || "Failed to fetch product");
    }

    return result.data;
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      service: "productDetailsService",
      method: "getProduct",
      endpoint: `${API_ENDPOINTS.products}/${productId}`,
      productId,
    });
    throw error;
  }
};

/**
 * Service object for retrieving detailed product information
 * @namespace productDetailsService
 * @description Centralized interface for product details API operations
 */
const productDetailsService = {
  getProduct,
};

export default productDetailsService;
