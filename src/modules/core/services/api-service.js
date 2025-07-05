/**
 * @fileoverview Centralized API service for all frontend API calls
 * Handles authentication, error handling, and request/response formatting
 */

import {
  API_ENDPOINTS,
  API_TIMEOUT,
  AUTH_TOKEN_KEY,
  ERROR_TYPES,
  HTTP_STATUS,
} from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

/**
 * Generic API request function
 * @param {string} endpoint - API endpoint (without leading slash)
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} API response data
 */
const request = async (endpoint, options = {}) => {
  let baseUrl = "";

  if (typeof window === "undefined") {
    if (process.env.NODE_ENV === "production") {
      baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopurbanecho.com";
    } else {
      baseUrl = "http://localhost:3000";
    }
  }

  const url = `${baseUrl}/api/${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  let response;

  try {
    // Get auth token if available (for future auth implementation)
    const token = typeof window !== "undefined" ? localStorage.getItem(AUTH_TOKEN_KEY) : null;

    response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    // Create error with status
    const createStatusError = (message, status) => {
      const error = new Error(message);
      error.status = status;
      return error;
    };

    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
      throw createStatusError("Authentication required", response.status);
    }

    if (response.status === HTTP_STATUS.FORBIDDEN) {
      throw createStatusError("Access forbidden", response.status);
    }

    if (response.status === HTTP_STATUS.NOT_FOUND) {
      throw createStatusError("Resource not found", response.status);
    }

    if (response.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
      throw createStatusError("Too many requests. Please try again later.", response.status);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw createStatusError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status
      );
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "API request failed");
    }

    return result.data;
  } catch (error) {
    clearTimeout(timeoutId);

    const getErrorType = err => {
      if (err.name === "AbortError") return ERROR_TYPES.TIMEOUT_ERROR;
      if (err.message?.includes("network") || err.message?.includes("fetch"))
        return ERROR_TYPES.NETWORK_ERROR;
      if (err.status === HTTP_STATUS.UNAUTHORIZED) return ERROR_TYPES.AUTHENTICATION_ERROR;
      if (err.status === HTTP_STATUS.FORBIDDEN) return ERROR_TYPES.AUTHORIZATION_ERROR;
      if (err.status === HTTP_STATUS.NOT_FOUND) return ERROR_TYPES.NOT_FOUND_ERROR;
      if (err.status === HTTP_STATUS.TOO_MANY_REQUESTS) return ERROR_TYPES.RATE_LIMIT_ERROR;
      if (err.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) return ERROR_TYPES.SERVER_ERROR;
      return ERROR_TYPES.API_ERROR;
    };

    const errorType = getErrorType(error);

    errorHandler.handleError(error, errorType, {
      source: "api-service",
      endpoint,
      options,
      url,
      status: error.status || response?.status,
    });

    throw error;
  }
};

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @param {Object} params - URL parameters
 * @returns {Promise<any>} API response data
 */
const get = async (endpoint, params = {}) => {
  const searchParams = new URLSearchParams(params);
  const url = searchParams.toString() ? `${endpoint}?${searchParams}` : endpoint;

  return request(url, { method: "GET" });
};

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @returns {Promise<any>} API response data
 */
const post = async (endpoint, data = {}) => {
  return request(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @returns {Promise<any>} API response data
 */
const put = async (endpoint, data = {}) => {
  return request(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} API response data
 */
const del = async endpoint => {
  return request(endpoint, { method: "DELETE" });
};

// ==========================================
// CONTENT API METHODS
// ==========================================

/**
 * Get hero content
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Hero content data
 */
export const getHeroContent = async (params = {}) => {
  return get(`${API_ENDPOINTS.content}/hero`, params);
};

/**
 * Get about content
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} About content data
 */
export const getAboutContent = async (params = {}) => {
  return get(`${API_ENDPOINTS.content}/about`, params);
};

/**
 * Get page configuration
 * @param {string} pageName - Page name
 * @returns {Promise<Object>} Page config data
 */
export const getPageConfig = async (pageName = "homepage") => {
  return get(`${API_ENDPOINTS.content}/page-config`, { page: pageName });
};

// ==========================================
// PRODUCT API METHODS
// ==========================================

/**
 * Get all products
 * @param {Object} params - Query parameters (filters, pagination, etc.)
 * @returns {Promise<Object>} Products data
 */
export const getProducts = async (params = {}) => {
  return get(API_ENDPOINTS.products, params);
};

/**
 * Get single product
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

// ==========================================
// CATEGORY API METHODS
// ==========================================

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

// ==========================================
// USER API METHODS (for future auth implementation)
// ==========================================

/**
 * User login
 * @param {Object} credentials - Login credentials
 * @returns {Promise<Object>} User data and token
 */
export const login = async credentials => {
  return post(`${API_ENDPOINTS.auth}/login`, credentials);
};

/**
 * User registration
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} User data and token
 */
export const register = async userData => {
  return post(`${API_ENDPOINTS.auth}/register`, userData);
};

/**
 * Get user profile
 * @returns {Promise<Object>} User profile data
 */
export const getUserProfile = async () => {
  return get(`${API_ENDPOINTS.user}/profile`);
};

// ==========================================
// NEWSLETTER API METHODS
// ==========================================

/**
 * Subscribe to newsletter
 * @param {string} email - Email address
 * @returns {Promise<Object>} Subscription result
 */
export const subscribeNewsletter = async email => {
  return post(`${API_ENDPOINTS.newsletter}/subscribe`, { email });
};

/**
 * Unsubscribe from newsletter
 * @param {string} email - Email address
 * @returns {Promise<Object>} Unsubscribe result
 */
export const unsubscribeNewsletter = async email => {
  return post(`${API_ENDPOINTS.newsletter}/unsubscribe`, { email });
};

// Export HTTP methods for direct use if needed
export { del as delete, get, post, put };

// Default export object for convenience
const apiService = {
  get,
  post,
  put,
  delete: del,
  getHeroContent,
  getAboutContent,
  getPageConfig,
  getProducts,
  getProduct,
  getFeaturedProducts,
  getNewArrivals,
  searchProducts,
  getCategories,
  getCategoryProducts,
  login,
  register,
  getUserProfile,
  subscribeNewsletter,
  unsubscribeNewsletter,
};

export default apiService;
