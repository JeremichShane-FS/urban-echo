/**
 * @fileoverview Enhanced product catalog service with comprehensive filtering and sorting
 * Handles main product operations including browsing, filtering, and individual product lookup
 * Now supports search, category filtering, price ranges, and advanced filtering options
 */

import { API_ENDPOINTS } from "@config/constants";
import { get } from "@modules/core/services";

/**
 * Retrieves all products with comprehensive filtering, sorting, and pagination support
 * @async
 * @function getProducts
 * @param {Object} [params={}] - Query parameters for filtering and pagination
 * @param {string} [params.category] - Category filter (e.g., "men", "women", "accessories")
 * @param {string} [params.search] - Text search query for product names/descriptions
 * @param {string} [params.sortBy] - Sort option ("featured", "newest", "price-low", "price-high", "name", "rating")
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=12] - Number of products per page
 * @param {number} [params.minPrice] - Minimum price filter
 * @param {number} [params.maxPrice] - Maximum price filter
 * @param {boolean} [params.onSale] - Filter for products on sale
 * @param {boolean} [params.newArrivals] - Filter for new arrival products (maps to isNew internally)
 * @param {boolean} [params.freeShipping] - Filter for products with free shipping
 * @returns {Promise<Object>} Products data with pagination metadata and filtering results
 *
 * @example
 * // Basic product listing
 * const products = await getProducts({ page: 1, limit: 12 });
 *
 * @example
 * // Category filtering with sorting
 * const products = await getProducts({
 *   category: "men",
 *   sortBy: "price-low",
 *   page: 1,
 *   limit: 20
 * });
 *
 * @example
 * // Advanced filtering
 * const products = await getProducts({
 *   category: "women",
 *   minPrice: 25,
 *   maxPrice: 100,
 *   onSale: true,
 *   newArrivals: true,
 *   sortBy: "rating"
 * });
 */
export const getProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();
  const appendIfPresent = (key, value, transform = v => v) => {
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !(typeof value === "string" && value.trim() === "")
    ) {
      queryParams.append(key, transform(value));
    }
  };

  // Basic parameters
  if (params.category && params.category !== "all") {
    queryParams.append("category", params.category);
  }

  appendIfPresent("q", params.search, v => v.trim());
  appendIfPresent("sortBy", params.sortBy);
  appendIfPresent("page", params.page, v => v.toString());
  appendIfPresent("limit", params.limit, v => v.toString());
  appendIfPresent("minPrice", params.minPrice, v => v.toString());
  appendIfPresent("maxPrice", params.maxPrice, v => v.toString());

  // Boolean filters
  if (params.onSale === true) queryParams.append("onSale", "true");
  if (params.newArrivals === true) queryParams.append("isNew", "true");
  if (params.freeShipping === true) queryParams.append("freeShipping", "true");

  const endpoint =
    params.search && params.search.trim()
      ? `${API_ENDPOINTS.productSearch}?${queryParams.toString()}`
      : `${API_ENDPOINTS.products}?${queryParams.toString()}`;

  return get(endpoint);
};

/**
 * Retrieves detailed information for a single product by ID or slug
 * @async
 * @function getProduct
 * @param {string} id - Product ID or URL-friendly slug identifier
 * @returns {Promise<Object>} Complete product data including variants and images
 */
export const getProduct = async id => {
  return get(`${API_ENDPOINTS.products}/${id}`);
};

/**
 * Product catalog service object containing all catalog management functions
 * @namespace productCatalogService
 * @description Provides a centralized interface for all product catalog API operations
 */
const productCatalogService = {
  getProducts,
  getProduct,
};

export default productCatalogService;
