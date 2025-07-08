import { HTTP_STATUS } from "@config/constants";
import {
  createErrorResponse,
  createSuccessResponse,
  validateRequiredFields,
} from "@modules/core/utils/api";

/**
 * POST /api/errors
 * @description Log client-side errors for monitoring
 * @param {Object} body - Request body
 * @param {string} body.type - Error type (required)
 * @param {string} body.message - Error message (required)
 * @param {Object} [body.context] - Additional error context
 * @param {string} [body.timestamp] - Error timestamp
 * @returns {Object} Error logging confirmation with error ID
 * @example POST /api/errors { "type": "javascript", "message": "Uncaught TypeError" }
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
 * GET /api/errors
 * @description Health check for error logging endpoint
 * @returns {Object} API status confirmation
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
