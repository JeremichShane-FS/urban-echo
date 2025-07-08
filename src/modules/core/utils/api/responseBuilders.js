import { API_CORS_CONFIGS, API_META_TEMPLATES, HTTP_STATUS } from "@config/constants";

/**
 * Creates a successful response with consistent structure
 * @param {Object} data - Response data
 * @param {Object} meta - Response metadata
 * @param {number} status - HTTP status code (default: 200)
 * @returns {Response} JSON response object
 */
export function createSuccessResponse(data, meta = {}, status = HTTP_STATUS.OK) {
  return Response.json(
    {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    },
    { status }
  );
}

/**
 * Creates a paginated success response
 * @param {Array} data - Response data array
 * @param {Object} pagination - Pagination metadata
 * @param {Object} meta - Additional metadata
 * @param {number} status - HTTP status code (default: 200)
 * @returns {Response} JSON response object
 */
export function createPaginatedResponse(data, pagination, meta = {}, status = HTTP_STATUS.OK) {
  const { limit, page, total } = pagination;
  const totalPages = Math.ceil(total / limit);

  return Response.json(
    {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
      },
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    },
    { status }
  );
}

/**
 * Creates an error response with consistent structure
 * @param {string} error - Error message
 * @param {string} message - Detailed error message
 * @param {Object} meta - Additional metadata
 * @param {number} status - HTTP status code
 * @returns {Response} JSON response object
 */
export function createErrorResponse(
  error,
  message,
  meta = {},
  status = HTTP_STATUS.INTERNAL_SERVER_ERROR
) {
  return Response.json(
    {
      success: false,
      error,
      message,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    },
    { status }
  );
}

/**
 * Creates a not found response
 * @param {string} resource - Resource that was not found
 * @param {string} identifier - Identifier used in search
 * @param {Object} meta - Additional metadata
 * @returns {Response} JSON response object
 */
export function createNotFoundResponse(resource, identifier, meta = {}) {
  return createErrorResponse(
    `${resource} not found`,
    `No ${resource.toLowerCase()} found with identifier: ${identifier}`,
    meta,
    HTTP_STATUS.NOT_FOUND
  );
}

/**
 * Creates a validation error response
 * @param {string} message - Validation error message
 * @param {Object} details - Validation error details
 * @param {Object} meta - Additional metadata
 * @returns {Response} JSON response object
 */
export function createValidationErrorResponse(message, details = {}, meta = {}) {
  return Response.json(
    {
      success: false,
      error: "Validation error",
      message,
      details,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta,
      },
    },
    { status: HTTP_STATUS.BAD_REQUEST }
  );
}

/**
 * Creates CORS preflight response
 * @param {string} configType - CORS config type from API_CORS_CONFIGS
 * @returns {Response} CORS response object
 */
export function createCorsResponse(configType = "GET_ONLY") {
  const config = API_CORS_CONFIGS[configType] || API_CORS_CONFIGS.GET_ONLY;

  return new Response(null, {
    status: HTTP_STATUS.OK,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": config.methods.join(", "),
      "Access-Control-Allow-Headers": config.headers.join(", "),
    },
  });
}

/**
 * Creates response metadata for product endpoints
 * @param {string} endpoint - Endpoint path
 * @param {Object} filters - Applied filters
 * @param {string} source - Data source (e.g., "mongodb", "strapi")
 * @returns {Object} Metadata object
 */
export function createProductMeta(endpoint, filters = {}, source = "mongodb") {
  return API_META_TEMPLATES.PRODUCT(endpoint, filters, source);
}

/**
 * Builds pagination metadata
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} Pagination metadata
 */
export function buildPaginationMeta(page, limit, total) {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasMore: page < totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
  };
}
