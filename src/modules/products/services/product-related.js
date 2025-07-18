/**
 * @fileoverview Related products service for product recommendations
 * Provides simple API integration for fetching products related to a given product
 * Uses consistent HTTP client pattern with centralized error handling
 */

import { API_ENDPOINTS } from "@config/constants";
import { get } from "@modules/core/services";

/**
 * Retrieves products related to a specific product for recommendations
 * @async
 * @function getRelatedProducts
 * @param {string} productId - Product ID to find related products for
 * @param {Object} [options={}] - Options object for the query
 * @param {number} [options.limit=4] - Maximum number of related products to retrieve
 * @param {string} [options.category] - Category filter for related products
 * @param {boolean} [options.excludeOutOfStock=false] - Exclude out-of-stock items
 * @returns {Promise<Object>} Related products data for cross-selling
 */
export const getRelatedProducts = async (productId, options = {}) => {
  const { category, excludeOutOfStock = false, limit = 4 } = options;

  return get(`${API_ENDPOINTS.products}/related-products`, {
    productId,
    limit,
    category,
    excludeOutOfStock,
  });
};

/**
 * Related products service object containing all recommendation functions
 * @namespace relatedProductService
 * @description Provides a centralized interface for all related product API operations
 */
const relatedProductService = {
  getRelatedProducts,
};

export default relatedProductService;
