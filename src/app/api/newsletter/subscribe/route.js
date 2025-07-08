import {
  API_ENDPOINTS,
  API_REQUIRED_FIELDS,
  API_RESPONSE_MESSAGES,
  ERROR_TYPES,
  HTTP_STATUS,
} from "@config/constants";
import {
  createCorsResponse,
  createErrorResponse,
  createSuccessResponse,
  validateRequiredFields,
} from "@modules/core/utils/api";
import { isValidEmail } from "@modules/core/utils/validators";
import { errorHandler } from "@utils/errorHandler";

const ERROR_SOURCE = "newsletter-api";

/**
 * POST /api/newsletter/subscribe
 * @description Subscribe email to newsletter
 * @param {Object} body - Request body
 * @param {string} body.email - Email address (required)
 * @returns {Object} Subscription confirmation with timestamp
 * @example POST /api/newsletter/subscribe { "email": "user@example.com" }
 */
export async function POST(request) {
  try {
    const { email } = await request.json();
    const validation = validateRequiredFields(
      { email },
      API_REQUIRED_FIELDS.NEWSLETTER_SUBSCRIBE,
      `/api/${API_ENDPOINTS.newsletter}`
    );

    if (!validation.isValid) return validation.response;
    if (!isValidEmail(email)) {
      const validationError = new Error("Invalid email format");
      validationError.status = HTTP_STATUS.BAD_REQUEST;
      errorHandler.handleError(validationError, ERROR_TYPES.VALIDATION_ERROR, {
        source: ERROR_SOURCE,
        action: "subscribe",
        email: email,
        reason: "invalid-format",
      });

      return createErrorResponse(
        API_RESPONSE_MESSAGES.ERROR.VALIDATION_FAILED,
        API_RESPONSE_MESSAGES.ERROR.INVALID_EMAIL,
        {},
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // TODO: [DATA] Replace with MongoDB integration (newsletter)
    await new Promise(resolve => setTimeout(resolve, 1000));

    return createSuccessResponse(
      {
        email,
        subscribedAt: new Date().toISOString(),
      },
      {
        endpoint: `/api/${API_ENDPOINTS.newsletter}`,
        message: API_RESPONSE_MESSAGES.SUCCESS.NEWSLETTER_SUBSCRIBED,
      }
    );
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "subscribe",
      endpoint: `/api/${API_ENDPOINTS.newsletter}`,
    });

    return createErrorResponse(API_RESPONSE_MESSAGES.ERROR.NEWSLETTER_FAILED, error.message);
  }
}

/**
 * GET /api/newsletter/subscribe
 * @description Get newsletter subscribers (admin only - not yet implemented)
 * @returns {Object} Error response indicating endpoint not implemented
 */
export async function GET() {
  try {
    const notImplementedError = new Error("Admin endpoint not yet implemented");
    notImplementedError.status = HTTP_STATUS.NOT_IMPLEMENTED;
    errorHandler.handleError(notImplementedError, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      action: "list-subscribers",
      endpoint: `/api/${API_ENDPOINTS.newsletter}`,
    });

    return createErrorResponse(
      "Admin endpoint not yet implemented",
      "This endpoint will list newsletter subscribers when database integration is complete",
      {},
      HTTP_STATUS.NOT_IMPLEMENTED
    );
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "list-subscribers",
    });

    return createErrorResponse("Internal server error", error.message);
  }
}

/**
 * OPTIONS /api/newsletter/subscribe
 * @description CORS preflight handler
 */
export async function OPTIONS() {
  return createCorsResponse("PUBLIC_API");
}
