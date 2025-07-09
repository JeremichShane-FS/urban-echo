/**
 * @fileoverview Client-side error logging API endpoint for monitoring and debugging
 * Handles error reporting from frontend applications with context preservation and monitoring
 * Integrates with external monitoring services and provides health check capabilities
 */

import { HTTP_STATUS } from "@config/constants";
import {
  createErrorResponse,
  createSuccessResponse,
  validateRequiredFields,
} from "@modules/core/utils/api";

// =================================================================
// API ROUTE HANDLERS
// =================================================================

/**
 * POST /api/errors - Log client-side errors for monitoring and debugging
 * @param {Request} request - Next.js API request object with error data
 * @returns {Promise<Response>} JSON response with error logging confirmation
 * @throws {ValidationError} When required error fields are missing
 * @throws {ServerError} When error logging service fails
 *
 * @typedef {Object} ErrorLogData
 * @property {string} type - Error type (javascript, network, validation, ui, etc.)
 * @property {string} message - Error message or description
 * @property {Object} [context] - Additional error context and metadata
 * @property {string} [context.source] - Source component or file where error occurred
 * @property {string} [context.stack] - Error stack trace for debugging
 * @property {string} [context.userAgent] - Browser user agent information
 * @property {string} [context.url] - URL where error occurred
 * @property {Object} [context.user] - User context if authenticated
 * @property {string} [context.endpoint] - API endpoint if network error
 * @property {number} [context.status] - HTTP status code if network error
 * @property {string} [timestamp] - ISO timestamp when error occurred
 *
 * @typedef {Object} ErrorLogResponse
 * @property {string} errorId - Unique identifier for the logged error
 * @property {string} timestamp - ISO timestamp when error was logged
 *
 * @example
 * // Log a JavaScript runtime error
 * POST /api/errors
 * {
 *   "type": "javascript",
 *   "message": "Uncaught TypeError: Cannot read property 'map' of undefined",
 *   "context": {
 *     "source": "ProductGrid.jsx",
 *     "stack": "TypeError: Cannot read property...",
 *     "url": "/shop",
 *     "userAgent": "Mozilla/5.0..."
 *   },
 *   "timestamp": "2024-01-15T10:30:00Z"
 * }
 *
 * @example
 * // Log a network/API error
 * POST /api/errors
 * {
 *   "type": "network",
 *   "message": "Failed to fetch products",
 *   "context": {
 *     "source": "useProducts.js",
 *     "endpoint": "/api/products",
 *     "status": 500,
 *     "url": "/shop"
 *   }
 * }
 *
 * @example
 * // Log a validation error
 * POST /api/errors
 * {
 *   "type": "validation",
 *   "message": "Invalid form data submitted",
 *   "context": {
 *     "source": "CheckoutForm.jsx",
 *     "fields": ["email", "phoneNumber"],
 *     "url": "/checkout"
 *   }
 * }
 *
 * @example
 * // Successful response structure
 * {
 *   "data": {
 *     "errorId": "error_1705312200000",
 *     "timestamp": "2024-01-15T10:30:00Z"
 *   },
 *   "meta": {
 *     "endpoint": "/api/errors",
 *     "message": "Error logged successfully"
 *   }
 * }
 */
export async function POST(request) {
  try {
    const errorData = await request.json();

    const validation = validateRequiredFields(errorData, ["type", "message"], "/api/errors");
    if (!validation.isValid) return validation.response;

    if (process.env.NODE_ENV === "development") {
      console.log("📊 Error API Called:", {
        type: errorData.type,
        message: errorData.message,
        source: errorData.context?.source,
        timestamp: errorData.timestamp,
      });
    }

    // In production, integrate with monitoring service (Sentry)
    // https://sentry.io/pricing/?original_referrer=https%3A%2F%2Fwww.google.com%2F
    // Developer is a free plan

    return createSuccessResponse(
      {
        errorId: `error_${Date.now()}`,
        timestamp: new Date().toISOString(),
      },
      {
        endpoint: "/api/errors",
        message: "Error logged successfully",
      }
    );
  } catch (error) {
    console.error("Error API failed:", error);
    return createErrorResponse(
      "Failed to log error",
      error.message,
      {},
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

/**
 * GET /api/errors - Health check and status information for error logging endpoint
 * @returns {Promise<Response>} JSON response with API status information
 *
 * @typedef {Object} ErrorApiStatus
 * @property {string} status - API status (active, maintenance, error)
 * @property {string} timestamp - Current server timestamp
 * @property {string} [version] - API version information
 * @property {Object} [config] - Configuration status details
 *
 * @example
 * // Check error logging API status
 * GET /api/errors
 *
 * @example
 * // Successful response structure
 * {
 *   "data": {
 *     "status": "active",
 *     "timestamp": "2024-01-15T10:30:00Z"
 *   },
 *   "meta": {
 *     "endpoint": "/api/errors",
 *     "message": "Error logging API is active"
 *   }
 * }
 */
export async function GET() {
  return createSuccessResponse(
    {
      status: "active",
      timestamp: new Date().toISOString(),
    },
    {
      endpoint: "/api/errors",
      message: "Error logging API is active",
    }
  );
}
