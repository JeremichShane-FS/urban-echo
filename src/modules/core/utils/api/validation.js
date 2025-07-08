import {
  API_RESPONSE_MESSAGES,
  API_VALIDATION_LIMITS,
  API_VALIDATION_PATTERNS,
  ERROR_TYPES,
  HTTP_STATUS,
} from "@config/constants";
import { errorHandler } from "@utils/errorHandler";

/**
 * Validates pagination parameters
 * @param {Object} params - Pagination parameters
 * @param {number} params.limit - Items per page
 * @param {number} params.page - Page number
 * @param {number} params.maxLimit - Maximum allowed limit (default: 100)
 * @param {string} params.endpoint - Endpoint name for error tracking
 * @returns {Object} Validation result with isValid boolean and optional response
 */
export function validatePagination(params = {}) {
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
}

/**
 * Validates required parameters
 * @param {Object} params - Parameters to validate
 * @param {Array} requiredFields - Array of required field names
 * @param {string} endpoint - Endpoint name for error tracking
 * @returns {Object} Validation result with isValid boolean and optional response
 */
export function validateRequiredFields(params, requiredFields, endpoint = "unknown") {
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
}

/**
 * Validates MongoDB ObjectId format
 * @param {string} id - ID to validate
 * @returns {boolean} True if valid ObjectId format
 */
export function isValidObjectId(id) {
  return API_VALIDATION_PATTERNS.MONGODB_OBJECT_ID.test(id);
}

/**
 * Validates price range parameters
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @param {string} endpoint - Endpoint name for error tracking
 * @returns {Object} Validation result with isValid boolean and optional response
 */
export function validatePriceRange(minPrice, maxPrice, endpoint = "unknown") {
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
}

/**
 * Validates sort parameter
 * @param {string} sortBy - Sort parameter to validate
 * @param {Array} allowedSorts - Array of allowed sort values
 * @param {string} endpoint - Endpoint name for error tracking
 * @returns {Object} Validation result with isValid boolean and optional response
 */
export function validateSort(sortBy, allowedSorts, endpoint = "unknown") {
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
}
