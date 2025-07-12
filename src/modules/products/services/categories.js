/**
 * @fileoverview Categories service for product categorization and filtering
 * Provides simple API integration for category management and product filtering
 * Uses consistent HTTP client pattern with centralized error handling
 */

import { API_ENDPOINTS } from "@config/constants";
import { get } from "@modules/core/services";

/**
 * Retrieves all categories with optional metadata
 * @async
 * @function getCategories
 * @param {Object} [params={}] - Query parameters for category filtering
 * @returns {Promise<Object>} Categories data with optional metadata
 */
export const getCategories = async (params = {}) => {
  return get(API_ENDPOINTS.categories, params);
};

/**
 * Retrieves products filtered by category
 * @async
 * @function getCategoryProducts
 * @param {string} categorySlug - Category slug identifier
 * @param {Object} [params={}] - Query parameters for filtering and pagination
 * @returns {Promise<Object>} Category products data with pagination
 */
export const getCategoryProducts = async (categorySlug, params = {}) => {
  return get(`${API_ENDPOINTS.categories}/${categorySlug}/products`, params);
};

/**
 * Categories service object containing all category management functions
 * @namespace categoriesService
 * @description Provides a centralized interface for all category API operations
 */
const categoriesService = {
  getCategories,
  getCategoryProducts,
};

export default categoriesService;
