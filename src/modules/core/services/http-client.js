/**
 * @fileoverview Base HTTP client for API requests
 * Handles error management, timeouts, and request/response processing
 */

import { API_TIMEOUT, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { errorHandler } from "@modules/core/utils";

/**
 * Creates a status-specific error
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @returns {Error} Error with status property
 */
const createStatusError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * Base HTTP request function with comprehensive error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
const request = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  let baseUrl = "";
  if (typeof window === "undefined") {
    // Server-side: use localhost for development or site URL for production
    baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SITE_URL || "https://shopurbanecho.com"
        : "http://localhost:3000";
  }

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
 * GET request
 * @param {string} endpoint - API endpoint
 * @param {Object} params - URL parameters
 * @returns {Promise<any>} API response data
 */
export const get = async (endpoint, params = {}) => {
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
export const post = async (endpoint, data = {}) => {
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
export const put = async (endpoint, data = {}) => {
  return request(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} API response data
 * @description  Since delete is a reserved keyword in JavaScript, I'm exporting it as `del` to avoid conflicts.
 */
export const del = async endpoint => {
  return request(endpoint, { method: "DELETE" });
};

export { del as delete };
