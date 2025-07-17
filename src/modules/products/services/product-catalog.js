/**
 * @fileoverview Product catalog service for general product listing and details
 * Handles main product operations including browsing, filtering, and individual product lookup
 * Uses consistent HTTP client pattern with centralized error handling
 */

import { API_ENDPOINTS } from "@config/constants";
import { get } from "@modules/core/services";

/**
 * Retrieves all products with filtering, sorting, and pagination support
 * @async
 * @function getProducts
 * @param {Object} [params={}] - Query parameters for filtering and pagination
 * @returns {Promise<Object>} Products data with pagination metadata
 */
export const getProducts = async (params = {}) => {
  return get(API_ENDPOINTS.products, params);
};

/**
 * Product catalog service object containing all catalog management functions
 * @namespace productCatalogService
 * @description Provides a centralized interface for all product catalog API operations
 */
const productCatalogService = {
  getProducts,
};

export default productCatalogService;
