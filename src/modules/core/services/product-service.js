/**
 * @fileoverview Product API service for comprehensive e-commerce product management and discovery
 * Handles all product-related operations including CRUD, search, filtering, and product relationships
 * Provides optimized endpoints for featured products, new arrivals, search functionality, and related product recommendations
 * Supports advanced filtering, pagination, and sorting capabilities for enhanced product browsing experience
 */

import { API_ENDPOINTS } from "@config/constants";

import { get } from "./http-client";

/**
 * Retrieves all products with comprehensive filtering, sorting, and pagination support
 * @async
 * @function getProducts
 * @param {Object} [params={}] - Query parameters for filtering, pagination, and sorting
 * @param {string} [params.category] - Product category filter (men, women, accessories)
 * @param {string} [params.subcategory] - Product subcategory filter
 * @param {number} [params.page=1] - Page number for pagination
 * @param {number} [params.limit=20] - Number of products per page
 * @param {string} [params.sort] - Sort criteria (price, name, date, popularity)
 * @param {string} [params.order] - Sort order (asc, desc)
 * @param {number} [params.minPrice] - Minimum price filter
 * @param {number} [params.maxPrice] - Maximum price filter
 * @param {Array<string>} [params.tags] - Product tags filter
 * @param {boolean} [params.inStock] - Filter for products in stock
 * @returns {Promise<Object>} Products data with pagination metadata and filter information
 *
 * @example
 * const products = await getProducts({
 *   category: 'men',
 *   minPrice: 50,
 *   maxPrice: 200,
 *   sort: 'price',
 *   order: 'asc',
 *   limit: 12
 * });
 * // Returns paginated men's products filtered by price range
 */
export const getProducts = async (params = {}) => {
  return get(API_ENDPOINTS.products, params);
};

/**
 * Retrieves detailed information for a single product by ID or slug
 * @async
 * @function getProduct
 * @param {string} id - Product ID or URL-friendly slug identifier
 * @returns {Promise<Object>} Complete product data including variants, images, and related information
 * @returns {string} returns.id - Product unique identifier
 * @returns {string} returns.name - Product name
 * @returns {string} returns.description - Product description
 * @returns {number} returns.price - Product price
 * @returns {Array} returns.variants - Product variants with size, color, and inventory
 * @returns {Array} returns.images - Product images with URLs and alt text
 * @returns {Object} returns.seo - SEO metadata for product page
 *
 * @example
 * const product = await getProduct('urban-classic-tee');
 * // Returns complete product details for the specified slug
 *
 * @example
 * const product = await getProduct('60d5ecb8b392e8f4b8c9e123');
 * // Returns complete product details for the specified ID
 */
export const getProduct = async id => {
  return get(`${API_ENDPOINTS.products}/${id}`);
};

/**
 * Retrieves featured products with optional limit for homepage and promotional displays
 * @async
 * @function getFeaturedProducts
 * @param {number} [limit=8] - Maximum number of featured products to retrieve
 * @returns {Promise<Object>} Featured products data sorted by relevance and sales performance
 *
 * @example
 * const featuredProducts = await getFeaturedProducts(6);
 * // Returns 6 featured products for homepage hero section
 */
export const getFeaturedProducts = async (limit = 8) => {
  return get(`${API_ENDPOINTS.products}/featured`, { limit });
};

/**
 * Retrieves newest product arrivals with optional limit for showcasing latest inventory
 * @async
 * @function getNewArrivals
 * @param {number} [limit=8] - Maximum number of new arrival products to retrieve
 * @returns {Promise<Object>} New arrival products data sorted by creation date (newest first)
 *
 * @example
 * const newArrivals = await getNewArrivals(12);
 * // Returns 12 newest products for new arrivals section
 */
export const getNewArrivals = async (limit = 8) => {
  return get(`${API_ENDPOINTS.products}/new-arrivals`, { limit });
};

/**
 * Searches products using text query with additional filtering capabilities
 * @async
 * @function searchProducts
 * @param {string} query - Search query string for product name, description, or tags
 * @param {Object} [filters={}] - Additional search filters and options
 * @param {string} [filters.category] - Limit search to specific category
 * @param {number} [filters.minPrice] - Minimum price filter for search results
 * @param {number} [filters.maxPrice] - Maximum price filter for search results
 * @param {string} [filters.sort] - Sort order for search results (relevance, price, date)
 * @param {number} [filters.limit] - Maximum number of search results
 * @returns {Promise<Object>} Search results with relevance scoring and metadata
 *
 * @example
 * const searchResults = await searchProducts('blue shirt', {
 *   category: 'men',
 *   maxPrice: 100,
 *   sort: 'relevance'
 * });
 * // Returns men's shirts matching "blue shirt" under $100
 */
export const searchProducts = async (query, filters = {}) => {
  return get(`${API_ENDPOINTS.products}/search`, { q: query, ...filters });
};

/**
 * Retrieves products related to a specific product for cross-selling and recommendations
 * @async
 * @function getRelatedProducts
 * @param {string} productId - Product ID to find related products for
 * @param {number} [limit=4] - Maximum number of related products to retrieve
 * @returns {Promise<Object>} Related products data based on category, tags, and purchase patterns
 *
 * @example
 * const relatedProducts = await getRelatedProducts('60d5ecb8b392e8f4b8c9e123', 6);
 * // Returns 6 products related to the specified product for recommendation display
 */
export const getRelatedProducts = async (productId, limit = 4) => {
  return get(`${API_ENDPOINTS.products}/related-products`, { productId, limit });
};

/**
 * Product service object containing all product management functions
 * @namespace productService
 * @description Provides a centralized interface for all product-related API operations
 */
const productService = {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getNewArrivals,
  searchProducts,
  getRelatedProducts,
};

export default productService;
