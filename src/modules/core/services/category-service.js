/**
 * @fileoverview Category API service
 * Handles category listing and product filtering by category
 */

import { API_ENDPOINTS } from "@config/constants";

import { get } from "./http-client";

/**
 * Get all categories
 * @returns {Promise<Object>} Categories data
 */
export const getCategories = async () => {
  return get(API_ENDPOINTS.categories);
};

/**
 * Get products by category
 * @param {string} categorySlug - Category slug
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Category products data
 */
export const getCategoryProducts = async (categorySlug, params = {}) => {
  return get(`${API_ENDPOINTS.categories}/${categorySlug}/products`, params);
};

const categoryService = {
  getCategories,
  getCategoryProducts,
};

export default categoryService;
