/**
 * @fileoverview Product API service
 * Handles all product-related operations including CRUD, search, and filtering
 */

import { API_ENDPOINTS } from "@config/constants";

import { get } from "./http-client";

/**
 * Get all products with filtering and pagination
 * @param {Object} params - Query parameters (filters, pagination, etc.)
 * @returns {Promise<Object>} Products data
 */
export const getProducts = async (params = {}) => {
  return get(API_ENDPOINTS.products, params);
};

/**
 * Get single product by ID or slug
 * @param {string} id - Product ID or slug
 * @returns {Promise<Object>} Product data
 */
export const getProduct = async id => {
  return get(`${API_ENDPOINTS.products}/${id}`);
};

/**
 * Get featured products
 * @param {number} limit - Number of products to fetch
 * @returns {Promise<Object>} Featured products data
 */
export const getFeaturedProducts = async (limit = 8) => {
  return get(`${API_ENDPOINTS.products}/featured`, { limit });
};

/**
 * Get new arrivals
 * @param {number} limit - Number of products to fetch
 * @returns {Promise<Object>} New arrivals data
 */
export const getNewArrivals = async (limit = 8) => {
  return get(`${API_ENDPOINTS.products}/new-arrivals`, { limit });
};

/**
 * Search products
 * @param {string} query - Search query
 * @param {Object} filters - Additional filters
 * @returns {Promise<Object>} Search results
 */
export const searchProducts = async (query, filters = {}) => {
  return get(`${API_ENDPOINTS.products}/search`, { q: query, ...filters });
};

/**
 * Get related products
 * @param {string} productId - Product ID
 * @param {number} limit - Number of related products to fetch
 * @returns {Promise<Object>} Related products data
 */
export const getRelatedProducts = async (productId, limit = 4) => {
  return get(`${API_ENDPOINTS.products}/related-products`, { productId, limit });
};

const productService = {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getNewArrivals,
  searchProducts,
  getRelatedProducts,
};

export default productService;
