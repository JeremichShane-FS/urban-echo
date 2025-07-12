/**
 * @fileoverview Base HTTP client for comprehensive API request management with error handling and timeouts
 * Provides RESTful HTTP methods with automatic request/response processing, error categorization, and timeout management
 * Handles both client-side and server-side requests with environment-specific URL resolution
 * Integrates with error handling system for consistent error reporting and recovery strategies
 */

import { API_TIMEOUT, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { getEnvironment } from "@config/environment";
import { errorHandler } from "@modules/core/utils";

/**
 * Creates a status-specific error with HTTP status code for proper error categorization
 * @function createStatusError
 * @param {string} message - Descriptive error message
 * @param {number} status - HTTP status code for error categorization
 * @returns {Error} Enhanced error object with status property for error handling
 */
const createStatusError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * Base HTTP request function with comprehensive error handling, timeout management, and response processing
 * @async
 * @function request
 * @param {string} endpoint - API endpoint path or full URL
 * @param {Object} [options={}] - Fetch options including method, headers, body, etc.
 * @returns {Promise<any>} Parsed response data from successful API call
 * @throws {Error} Enhanced error with status code and error type for proper handling
 *
 * @description
 * This function handles:
 * - Automatic timeout management with AbortController
 * - Environment-specific URL resolution (client vs server-side)
 * - Standard JSON headers and response parsing
 * - Comprehensive error categorization and logging
 * - Rate limiting detection and handling
 * - Network error detection and retry strategies
 */
const request = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
  const { siteUrl } = getEnvironment();

  let baseUrl = "";
  if (typeof window === "undefined") baseUrl = siteUrl;

  const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}/api/${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const config = {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
    signal: controller.signal,
  };

  let response;

  try {
    response = await fetch(url, config);
    clearTimeout(timeoutId);

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
      source: "http-client",
      endpoint,
      options,
      url,
      status: error.status || response?.status,
    });

    throw error;
  }
};

/**
 * Performs HTTP GET request with query parameter support
 * @async
 * @function get
 * @param {string} endpoint - API endpoint path
 * @param {Object} [params={}] - URL query parameters to append to the request
 * @returns {Promise<any>} Parsed API response data
 *
 * @example
 * const products = await get('products', { category: 'men', limit: 10 });
 * // Makes request to: /api/products?category=men&limit=10
 */
export const get = async (endpoint, params = {}) => {
  const searchParams = new URLSearchParams(params);
  const url = searchParams.toString() ? `${endpoint}?${searchParams}` : endpoint;
  return request(url, { method: "GET" });
};

/**
 * Performs HTTP POST request with JSON body serialization
 * @async
 * @function post
 * @param {string} endpoint - API endpoint path
 * @param {Object} [data={}] - Request body data to be JSON serialized
 * @returns {Promise<any>} Parsed API response data
 *
 * @example
 * const newUser = await post('users', { name: 'John', email: 'john@example.com' });
 * // Makes POST request with JSON body to: /api/users
 */
export const post = async (endpoint, data = {}) => {
  return request(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Performs HTTP PUT request with JSON body serialization for resource updates
 * @async
 * @function put
 * @param {string} endpoint - API endpoint path
 * @param {Object} [data={}] - Request body data to be JSON serialized
 * @returns {Promise<any>} Parsed API response data
 *
 * @example
 * const updatedUser = await put('users/123', { name: 'John Updated' });
 * // Makes PUT request with JSON body to: /api/users/123
 */
export const put = async (endpoint, data = {}) => {
  return request(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/**
 * Performs HTTP DELETE request for resource removal
 * @async
 * @function del
 * @param {string} endpoint - API endpoint path
 * @returns {Promise<any>} Parsed API response data
 * @description Since delete is a reserved keyword in JavaScript, this function is exported as `del` to avoid conflicts.
 *
 * @example
 * await del('users/123');
 * // Makes DELETE request to: /api/users/123
 */
export const del = async endpoint => {
  return request(endpoint, { method: "DELETE" });
};
