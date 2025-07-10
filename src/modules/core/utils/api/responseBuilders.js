/**
 * @fileoverview API response building utilities for consistent REST API responses and error handling
 * Provides standardized response formatters for success, error, pagination, and CORS scenarios
 * Ensures consistent API response structure across all endpoints with proper HTTP status codes
 * Includes specialized builders for product metadata, validation errors, and resource not found responses
 */

import { API_CORS_CONFIGS, API_META_TEMPLATES, HTTP_STATUS } from "@config/constants";

/**
 * Creates a successful API response with consistent structure and metadata
 * @function createSuccessResponse
 * @param {*} data - Response data (object, array, string, number, or boolean)
 * @param {Object} [meta={}] - Additional response metadata for tracking and debugging
 * @param {string} [meta.source] - Data source identifier (e.g., "mongodb", "strapi", "cache")
 * @param {string} [meta.version] - API version or data schema version
 * @param {Object} [meta.performance] - Performance metrics (query time, cache status)
 * @param {number} [status=200] - HTTP status code for successful responses
 * @returns {Response} JSON response object with standardized success structure
 *
 * @description
 * Creates consistent success responses with:
 * - Automatic timestamp inclusion for tracking
 * - Flexible metadata support for debugging and monitoring
 * - Standardized structure across all API endpoints
 * - Proper HTTP status code handling
 *
 * @example
 * const response = createSuccessResponse(
 *   { id: 1, name: "Product Name" },
 *   { source: "mongodb", cached: false },
 *   200
 * );
 * // Returns standardized success response with product data and metadata
 *
 * @example
 * const listResponse = createSuccessResponse(
 *   [product1, product2, product3],
 *   { source: "database", queryTime: "45ms" }
 * );
 * // Returns success response with product array and performance metadata
 */
export const createSuccessResponse = (data, meta = {}, status = HTTP_STATUS.OK) => {
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
};

/**
 * Creates a paginated success response with comprehensive pagination metadata
 * @function createPaginatedResponse
 * @param {Array} data - Response data array for the current page
 * @param {Object} pagination - Pagination configuration and totals
 * @param {number} pagination.page - Current page number (1-based)
 * @param {number} pagination.limit - Items per page limit
 * @param {number} pagination.total - Total number of items across all pages
 * @param {Object} [meta={}] - Additional response metadata
 * @param {number} [status=200] - HTTP status code for successful responses
 * @returns {Response} JSON response object with paginated data and navigation metadata
 *
 * @description
 * Creates paginated responses with comprehensive navigation information:
 * - Calculates total pages and navigation flags automatically
 * - Includes hasMore, hasPrevPage, hasNextPage for frontend navigation
 * - Provides all data needed for pagination UI components
 * - Maintains consistent structure across paginated endpoints
 *
 * @example
 * const paginatedResponse = createPaginatedResponse(
 *   [product1, product2, product3],
 *   { page: 2, limit: 10, total: 45 },
 *   { source: "mongodb", filters: { category: "men" } }
 * );
 * // Returns paginated response with navigation metadata (page 2 of 5)
 *
 * @example
 * const searchResults = createPaginatedResponse(
 *   searchData,
 *   { page: 1, limit: 20, total: 100 },
 *   { searchQuery: "blue shirt", resultTime: "120ms" }
 * );
 * // Returns first page of search results with pagination and search metadata
 */
export const createPaginatedResponse = (data, pagination, meta = {}, status = HTTP_STATUS.OK) => {
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
};

/**
 * Creates a standardized error response with consistent structure and debugging information
 * @function createErrorResponse
 * @param {string} error - High-level error category or type (e.g., "Validation Error", "Database Error")
 * @param {string} message - Detailed human-readable error message for developers and debugging
 * @param {Object} [meta={}] - Additional error metadata for debugging and tracking
 * @param {string} [meta.source] - Source component or service where error originated
 * @param {string} [meta.errorCode] - Application-specific error code for categorization
 * @param {Object} [meta.context] - Additional context about the error (request params, user info)
 * @param {number} [status=500] - HTTP status code appropriate for the error type
 * @returns {Response} JSON response object with standardized error structure
 *
 * @description
 * Creates consistent error responses with:
 * - Structured error information for debugging
 * - Automatic timestamp for error tracking
 * - Flexible metadata for error context and monitoring
 * - Proper HTTP status code mapping
 *
 * @example
 * const errorResponse = createErrorResponse(
 *   "Validation Error",
 *   "Invalid email format provided",
 *   { source: "user-service", field: "email", value: "invalid-email" },
 *   400
 * );
 * // Returns structured error response with validation details
 *
 * @example
 * const serverError = createErrorResponse(
 *   "Database Error",
 *   "Unable to connect to MongoDB",
 *   { source: "database-service", retryAttempt: 3 },
 *   500
 * );
 * // Returns server error response with connection details
 */
export const createErrorResponse = (
  error,
  message,
  meta = {},
  status = HTTP_STATUS.INTERNAL_SERVER_ERROR
) => {
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
};

/**
 * Creates a standardized not found response for missing resources
 * @function createNotFoundResponse
 * @param {string} resource - Type of resource that was not found (e.g., "Product", "User", "Content")
 * @param {string} identifier - Identifier used to search for the resource (ID, slug, email)
 * @param {Object} [meta={}] - Additional metadata for tracking and debugging
 * @param {string} [meta.searchCriteria] - Additional search criteria that were applied
 * @param {string} [meta.suggestion] - Suggested alternative or next steps
 * @returns {Response} JSON response object with 404 status and resource details
 *
 * @description
 * Creates consistent not found responses with:
 * - Clear indication of missing resource type
 * - Identifier information for debugging
 * - Standardized 404 status code
 * - Optional suggestions for resolution
 *
 * @example
 * const notFoundResponse = createNotFoundResponse(
 *   "Product",
 *   "abc123",
 *   { searchCriteria: "active products only", suggestion: "Check if product is archived" }
 * );
 * // Returns 404 response for missing product with helpful context
 *
 * @example
 * const userNotFound = createNotFoundResponse(
 *   "User",
 *   "user@example.com",
 *   { source: "authentication", action: "login" }
 * );
 * // Returns 404 response for authentication attempt with missing user
 */
export const createNotFoundResponse = (resource, identifier, meta = {}) => {
  return createErrorResponse(
    `${resource} not found`,
    `No ${resource.toLowerCase()} found with identifier: ${identifier}`,
    meta,
    HTTP_STATUS.NOT_FOUND
  );
};

/**
 * Creates a validation error response with detailed field-level error information
 * @function createValidationErrorResponse
 * @param {string} message - Primary validation error message
 * @param {Object} [details={}] - Detailed validation errors by field or rule
 * @param {Object} [details.fieldName] - Field-specific error messages
 * @param {Array} [details.fieldName] - Array of error messages for a field
 * @param {Object} [meta={}] - Additional metadata for validation context
 * @param {string} [meta.formName] - Form or endpoint where validation failed
 * @param {Object} [meta.submittedData] - Sanitized version of submitted data
 * @returns {Response} JSON response object with 400 status and validation details
 *
 * @description
 * Creates structured validation error responses with:
 * - Primary error message for general feedback
 * - Field-level details for form highlighting
 * - Consistent 400 Bad Request status
 * - Additional context for debugging
 *
 * @example
 * const validationError = createValidationErrorResponse(
 *   "Form validation failed",
 *   {
 *     email: "Invalid email format",
 *     password: ["Too short", "Must contain uppercase letter"],
 *     age: "Must be a positive number"
 *   },
 *   { formName: "user-registration", source: "signup-form" }
 * );
 * // Returns detailed validation error with field-specific messages
 *
 * @example
 * const productValidation = createValidationErrorResponse(
 *   "Product data validation failed",
 *   { price: "Price must be greater than 0", sku: "SKU format invalid" },
 *   { productId: "temp-123", action: "create-product" }
 * );
 * // Returns product-specific validation error response
 */
export const createValidationErrorResponse = (message, details = {}, meta = {}) => {
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
};

/**
 * Creates CORS preflight response with appropriate headers for cross-origin requests
 * @function createCorsResponse
 * @param {string} [configType="GET_ONLY"] - CORS configuration type from API_CORS_CONFIGS
 * @returns {Response} Empty response with CORS headers for preflight requests
 *
 * @description
 * Handles CORS preflight requests with:
 * - Configurable CORS policies based on endpoint requirements
 * - Proper Access-Control headers for cross-origin support
 * - Support for different HTTP methods and headers
 * - Empty response body for OPTIONS requests
 *
 * @example
 * const corsResponse = createCorsResponse("GET_ONLY");
 * // Returns CORS response allowing only GET requests
 *
 * @example
 * const fullCors = createCorsResponse("FULL_ACCESS");
 * // Returns CORS response allowing all configured methods and headers
 */
export const createCorsResponse = (configType = "GET_ONLY") => {
  const config = API_CORS_CONFIGS[configType] || API_CORS_CONFIGS.GET_ONLY;

  return new Response(null, {
    status: HTTP_STATUS.OK,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": config.methods.join(", "),
      "Access-Control-Allow-Headers": config.headers.join(", "),
    },
  });
};

/**
 * Creates response metadata specifically for product endpoints with filtering and source information
 * @function createProductMeta
 * @param {string} endpoint - API endpoint path (e.g., "/api/products", "/api/products/featured")
 * @param {Object} [filters={}] - Applied filters for tracking and debugging
 * @param {string} [filters.category] - Product category filter
 * @param {string} [filters.priceRange] - Price range filter
 * @param {string} [filters.searchQuery] - Search query applied
 * @param {string} [source="mongodb"] - Data source identifier for metadata
 * @returns {Object} Metadata object specifically for product API responses
 *
 * @description
 * Creates product-specific metadata including:
 * - Endpoint identification for analytics
 * - Applied filter tracking for debugging
 * - Data source information for monitoring
 * - Template-based metadata generation
 *
 * @example
 * const productMeta = createProductMeta(
 *   "/api/products",
 *   { category: "men", priceRange: "50-100", searchQuery: "shirt" },
 *   "mongodb"
 * );
 * // Returns product-specific metadata for filtered search results
 *
 * @example
 * const featuredMeta = createProductMeta("/api/products/featured", {}, "cache");
 * // Returns metadata for featured products from cache
 */
export const createProductMeta = (endpoint, filters = {}, source = "mongodb") => {
  return API_META_TEMPLATES.PRODUCT(endpoint, filters, source);
};

/**
 * Builds comprehensive pagination metadata for paginated API responses
 * @function buildPaginationMeta
 * @param {number} page - Current page number (1-based indexing)
 * @param {number} limit - Number of items per page
 * @param {number} total - Total number of items across all pages
 * @returns {Object} Complete pagination metadata object with navigation flags
 * @returns {number} returns.page - Current page number
 * @returns {number} returns.limit - Items per page
 * @returns {number} returns.total - Total number of items
 * @returns {number} returns.totalPages - Total number of pages
 * @returns {boolean} returns.hasMore - Whether there are more pages available
 * @returns {boolean} returns.hasPrevPage - Whether there is a previous page
 * @returns {boolean} returns.hasNextPage - Whether there is a next page
 *
 * @description
 * Calculates comprehensive pagination metadata including:
 * - Basic pagination information (page, limit, total)
 * - Calculated fields (totalPages)
 * - Navigation flags for frontend pagination components
 * - Consistent structure across all paginated responses
 *
 * @example
 * const paginationMeta = buildPaginationMeta(3, 20, 150);
 * // Returns: { page: 3, limit: 20, total: 150, totalPages: 8, hasMore: true, hasPrevPage: true, hasNextPage: true }
 *
 * @example
 * const lastPageMeta = buildPaginationMeta(5, 10, 45);
 * // Returns pagination metadata indicating last page (page 5 of 5)
 */
export const buildPaginationMeta = (page, limit, total) => {
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
};
