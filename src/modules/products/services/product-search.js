/**
 * @fileoverview Product search service for text-based product discovery
 * Provides simple API integration for searching products with filtering options
 * Uses consistent HTTP client pattern with centralized error handling
 */

import { API_ENDPOINTS } from "@config/constants";
import { get } from "@modules/core/services";

/**
 * Searches products using text query with filtering capabilities
 * @async
 * @function searchProducts
 * @param {string} query - Search query string for product name, description, or tags
 * @param {Object} [filters={}] - Additional search filters and options
 * @returns {Promise<Object>} Search results with relevance scoring and metadata
 */
export const searchProducts = async (query, filters = {}) => {
  return get(`${API_ENDPOINTS.products}/search`, { q: query, ...filters });
};

/**
 * Product search service object containing all search functions
 * @namespace productSearchService
 * @description Provides a centralized interface for all product search API operations
 */
const productSearchService = {
  searchProducts,
};

export default productSearchService;
