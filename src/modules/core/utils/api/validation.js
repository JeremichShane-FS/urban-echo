/**
 * @fileoverview API request validation utilities for parameter validation and error handling
 * Provides comprehensive validation functions for pagination, required fields, data formats, and business rules
 * Includes MongoDB ObjectId validation, price range validation, and sorting parameter validation
 * Returns structured validation results with appropriate HTTP responses for failed validations
 */

import {
  API_RESPONSE_MESSAGES,
  API_VALIDATION_LIMITS,
  API_VALIDATION_PATTERNS,
  ERROR_TYPES,
  HTTP_STATUS,
} from "@config/constants";
import { errorHandler } from "@modules/core/utils";

/**
 * Validates pagination parameters with comprehensive bounds checking and error handling
 * @function validatePagination
 * @param {Object} [params={}] - Pagination parameters to validate
 * @param {number} params.page - Current page number (must be >= 1)
 * @param {number} params.limit - Items per page (must be <= maxLimit)
 * @param {number} [params.maxLimit] - Maximum allowed limit override
 * @param {string} [params.endpoint="unknown"] - Endpoint name for error tracking and debugging
 * @returns {Object} Validation result with success status and optional error response
 * @returns {boolean} returns.isValid - Whether pagination parameters are valid
 * @returns {Response} [returns.response] - HTTP error response if validation fails
 *
 * @description
 * Comprehensive pagination validation including:
 * - Limit bounds checking against maximum allowed values
 * - Page number validation (must be positive integer)
 * - Error logging for monitoring and debugging
 * - Structured error responses for API consumers
 *
 * @example
 * const validation = validatePagination({
 *   page: 2,
 *   limit: 50,
 *   maxLimit: 100,
 *   endpoint: "products-api"
 * });
 * if (!validation.isValid) {
 *   return validation.response; // Returns 400 error response
 * }
 * // Continue with valid pagination parameters
 *
 * @example
 * const invalidLimit = validatePagination({
 *   page: 1,
 *   limit: 200,
 *   maxLimit: 100,
 *   endpoint: "search-api"
 * });
 * // Returns: { isValid: false, response: Response with limit exceeded error }
 */
export const validatePagination = (params = {}) => {
  const {
    endpoint = "unknown",
    limit,
    maxLimit = API_VALIDATION_LIMITS.MAX_PRODUCTS_PER_REQUEST,
    page,
  } = params;

  if (limit > maxLimit) {
    const error = new Error("Limit exceeds maximum allowed value");
    errorHandler.handleError(error, ERROR_TYPES.VALIDATION_ERROR, {
      limit,
      maxLimit,
      endpoint,
    });

    return {
      isValid: false,
      response: Response.json(
        {
          success: false,
          error: API_RESPONSE_MESSAGES.ERROR.VALIDATION_FAILED,
          message: API_RESPONSE_MESSAGES.VALIDATION.LIMIT_EXCEEDED(maxLimit),
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      ),
    };
  }

  if (page < 1) {
    const error = new Error("Invalid page parameter");
    errorHandler.handleError(error, ERROR_TYPES.VALIDATION_ERROR, {
      page,
      endpoint,
    });

    return {
      isValid: false,
      response: Response.json(
        {
          success: false,
          error: API_RESPONSE_MESSAGES.ERROR.VALIDATION_FAILED,
          message: API_RESPONSE_MESSAGES.VALIDATION.INVALID_FORMAT("page"),
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      ),
    };
  }

  return { isValid: true };
};

/**
 * Validates required fields presence and non-empty values with detailed error reporting
 * @function validateRequiredFields
 * @param {Object} params - Object containing parameters to validate
 * @param {Array<string>} requiredFields - Array of required field names to check
 * @param {string} [endpoint="unknown"] - Endpoint name for error tracking
 * @returns {Object} Validation result with detailed missing field information
 * @returns {boolean} returns.isValid - Whether all required fields are present and valid
 * @returns {Response} [returns.response] - HTTP error response listing missing fields
 *
 * @description
 * Comprehensive required field validation including:
 * - Null, undefined, and empty string checking
 * - Detailed missing field reporting for frontend error display
 * - Structured error responses with field-level details
 * - Error logging for API monitoring
 *
 * @example
 * const validation = validateRequiredFields(
 *   { name: "Product", price: null, category: "" },
 *   ["name", "price", "category"],
 *   "create-product"
 * );
 * // Returns: { isValid: false, response: Response with missing fields ["price", "category"] }
 *
 * @example
 * const userValidation = validateRequiredFields(
 *   { email: "user@example.com", password: "secret123" },
 *   ["email", "password"],
 *   "user-registration"
 * );
 * // Returns: { isValid: true } (all required fields present)
 */
export const validateRequiredFields = (params, requiredFields, endpoint = "unknown") => {
  const missingFields = requiredFields.filter(
    field => params[field] === undefined || params[field] === null || params[field] === ""
  );

  if (missingFields.length > 0) {
    const error = new Error(`Missing required fields: ${missingFields.join(", ")}`);
    errorHandler.handleError(error, ERROR_TYPES.VALIDATION_ERROR, {
      missingFields,
      endpoint,
    });

    return {
      isValid: false,
      response: Response.json(
        {
          success: false,
          error: API_RESPONSE_MESSAGES.ERROR.VALIDATION_FAILED,
          message: `The following fields are required: ${missingFields.join(", ")}`,
          missingFields,
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      ),
    };
  }

  return { isValid: true };
};

/**
 * Validates MongoDB ObjectId format using hexadecimal pattern matching
 * @function isValidObjectId
 * @param {string} id - MongoDB ObjectId string to validate
 * @returns {boolean} True if ID matches valid ObjectId format (24-character hexadecimal)
 *
 * @description
 * Validates MongoDB ObjectId format:
 * - Checks for 24-character hexadecimal string format
 * - Uses regex pattern for efficient validation
 * - Essential for preventing database query errors
 * - Lightweight validation without external dependencies
 *
 * @example
 * isValidObjectId("507f1f77bcf86cd799439011"); // true
 * isValidObjectId("invalid-id"); // false
 * isValidObjectId("507f1f77bcf86cd79943901"); // false (too short)
 * isValidObjectId("507f1f77bcf86cd799439011z"); // false (invalid character)
 */
export const isValidObjectId = id => {
  return API_VALIDATION_PATTERNS.MONGODB_OBJECT_ID.test(id);
};

/**
 * Validates price range parameters for product filtering with business rule enforcement
 * @function validatePriceRange
 * @param {number|null} minPrice - Minimum price value (null allowed for no minimum)
 * @param {number|null} maxPrice - Maximum price value (null allowed for no maximum)
 * @param {string} [endpoint="unknown"] - Endpoint name for error tracking
 * @returns {Object} Validation result with price range validity status
 * @returns {boolean} returns.isValid - Whether price range parameters are valid
 * @returns {Response} [returns.response] - HTTP error response for invalid price ranges
 *
 * @description
 * Comprehensive price range validation including:
 * - Negative price prevention for both minimum and maximum
 * - Logical range validation (minimum <= maximum)
 * - Null value handling for open-ended ranges
 * - Business rule enforcement for e-commerce pricing
 *
 * @example
 * const validation = validatePriceRange(25.99, 99.99, "product-search");
 * // Returns: { isValid: true } (valid price range)
 *
 * @example
 * const invalidRange = validatePriceRange(100, 50, "product-filter");
 * // Returns: { isValid: false, response: Response with price range error }
 *
 * @example
 * const openRange = validatePriceRange(null, 100, "price-filter");
 * // Returns: { isValid: true } (valid open-ended range)
 */
export const validatePriceRange = (minPrice, maxPrice, endpoint = "unknown") => {
  if (minPrice !== null && minPrice < 0) {
    const error = new Error("Minimum price cannot be negative");
    errorHandler.handleError(error, ERROR_TYPES.VALIDATION_ERROR, {
      minPrice,
      endpoint,
    });

    return {
      isValid: false,
      response: Response.json(
        {
          success: false,
          error: API_RESPONSE_MESSAGES.ERROR.VALIDATION_FAILED,
          message: API_RESPONSE_MESSAGES.VALIDATION.INVALID_PRICE_RANGE,
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      ),
    };
  }

  if (maxPrice !== null && maxPrice < 0) {
    const error = new Error("Maximum price cannot be negative");
    errorHandler.handleError(error, ERROR_TYPES.VALIDATION_ERROR, {
      maxPrice,
      endpoint,
    });

    return {
      isValid: false,
      response: Response.json(
        {
          success: false,
          error: API_RESPONSE_MESSAGES.ERROR.VALIDATION_FAILED,
          message: API_RESPONSE_MESSAGES.VALIDATION.INVALID_PRICE_RANGE,
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      ),
    };
  }

  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
    const error = new Error("Minimum price cannot be greater than maximum price");
    errorHandler.handleError(error, ERROR_TYPES.VALIDATION_ERROR, {
      minPrice,
      maxPrice,
      endpoint,
    });

    return {
      isValid: false,
      response: Response.json(
        {
          success: false,
          error: API_RESPONSE_MESSAGES.ERROR.VALIDATION_FAILED,
          message: API_RESPONSE_MESSAGES.VALIDATION.INVALID_PRICE_RANGE,
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      ),
    };
  }

  return { isValid: true };
};

/**
 * Validates sorting parameter against allowed values with detailed error feedback
 * @function validateSort
 * @param {string} sortBy - Sort parameter value to validate
 * @param {Array<string>} allowedSorts - Array of valid sorting options
 * @param {string} [endpoint="unknown"] - Endpoint name for error tracking
 * @returns {Object} Validation result with sort parameter validity
 * @returns {boolean} returns.isValid - Whether sort parameter is in allowed list
 * @returns {Response} [returns.response] - HTTP error response with allowed values
 *
 * @description
 * Sort parameter validation including:
 * - Whitelist-based validation against allowed values
 * - Detailed error responses listing valid options
 * - Case-sensitive validation for consistency
 * - Support for undefined/null sort parameters (optional sorting)
 *
 * @example
 * const validation = validateSort(
 *   "price-low",
 *   ["price-low", "price-high", "rating", "newest"],
 *   "product-search"
 * );
 * // Returns: { isValid: true } (valid sort parameter)
 *
 * @example
 * const invalidSort = validateSort(
 *   "invalid-sort",
 *   ["price-low", "price-high", "rating"],
 *   "product-filter"
 * );
 * // Returns: { isValid: false, response: Response with allowed sort values }
 *
 * @example
 * const noSort = validateSort(null, ["price-low", "rating"], "search");
 * // Returns: { isValid: true } (null/undefined sort is allowed)
 */
export const validateSort = (sortBy, allowedSorts, endpoint = "unknown") => {
  if (sortBy && !allowedSorts.includes(sortBy)) {
    const error = new Error(`Invalid sort parameter: ${sortBy}`);
    errorHandler.handleError(error, ERROR_TYPES.VALIDATION_ERROR, {
      sortBy,
      allowedSorts,
      endpoint,
    });

    return {
      isValid: false,
      response: Response.json(
        {
          success: false,
          error: API_RESPONSE_MESSAGES.ERROR.VALIDATION_FAILED,
          message: API_RESPONSE_MESSAGES.VALIDATION.INVALID_SORT(allowedSorts),
          allowedValues: allowedSorts,
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      ),
    };
  }

  return { isValid: true };
};
