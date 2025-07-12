/**
 * @fileoverview Featured products service for homepage promotional displays
 * Provides simple API integration for fetching manually curated featured products
 * Uses consistent HTTP client pattern with centralized error handling
 */

import { API_ENDPOINTS } from "@config/constants";
import { get } from "@modules/core/services";

/**
 * Retrieves featured products for homepage and promotional displays
 * @async
 * @function getFeaturedProducts
 * @param {number} [limit=8] - Maximum number of featured products to retrieve
 * @returns {Promise<Object>} Featured products data sorted by relevance
 */
export const getFeaturedProducts = async (limit = 8) => {
  return get(`${API_ENDPOINTS.products}/featured`, { limit });
};

/**
 * Featured products service object containing all featured product functions
 * @namespace featuredProductsService
 * @description Provides a centralized interface for all featured product API operations
 */
const featuredProductsService = {
  getFeaturedProducts,
};

export default featuredProductsService;
