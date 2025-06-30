import { API_ENDPOINTS, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";
import { isValidEmail } from "@modules/core/utils/validators";

const ERROR_SOURCE = "newsletter-api";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      const validationError = new Error("Email is required");
      validationError.status = HTTP_STATUS.BAD_REQUEST;

      errorHandler.handleError(validationError, ERROR_TYPES.VALIDATION_ERROR, {
        source: ERROR_SOURCE,
        action: "subscribe",
        missingField: "email",
      });

      return Response.json(
        {
          success: false,
          error: "Email is required",
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    if (!isValidEmail(email)) {
      const validationError = new Error("Invalid email format");
      validationError.status = HTTP_STATUS.BAD_REQUEST;

      errorHandler.handleError(validationError, ERROR_TYPES.VALIDATION_ERROR, {
        source: ERROR_SOURCE,
        action: "subscribe",
        email: email,
        reason: "invalid-format",
      });

      return Response.json(
        {
          success: false,
          error: "Please enter a valid email address",
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    // TODO: [DATA] Replace with MongoDB integration (newsletter)
    // const Newsletter = await import('@lib/database/models/Newsletter');
    // const existingSubscriber = await Newsletter.findOne({ email });
    // if (existingSubscriber) {
    //   return Response.json({
    //     success: false,
    //     error: 'Email already subscribed'
    //   }, { status: HTTP_STATUS.CONFLICT });
    // }
    // await Newsletter.create({ email, subscribedAt: new Date() });

    // Simulate API delay and success for now
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`Newsletter subscription: ${email}`);

    return Response.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
      data: {
        email,
        subscribedAt: new Date().toISOString(),
      },
      meta: {
        endpoint: `/api/${API_ENDPOINTS.newsletter}/subscribe`,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "subscribe",
      endpoint: `/api/${API_ENDPOINTS.newsletter}/subscribe`,
    });

    console.error("Newsletter subscription error:", error.message);

    return Response.json(
      {
        success: false,
        error: "Failed to subscribe to newsletter",
        message: error.message,
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET() {
  try {
    // TODO: [DATA] Replace with MongoDB integration (newsletter)
    // const Newsletter = await import('@lib/database/models/Newsletter');
    // const subscribers = await Newsletter.find({}, { email: 1, subscribedAt: 1 });
    // return Response.json({
    //   success: true,
    //   data: subscribers,
    //   meta: {
    //     total: subscribers.length,
    //     endpoint: `/api/${API_ENDPOINTS.newsletter}`,
    //   }
    // });

    // For now, return not implemented with proper error handling
    const notImplementedError = new Error("Admin endpoint not yet implemented");
    notImplementedError.status = HTTP_STATUS.NOT_IMPLEMENTED;

    errorHandler.handleError(notImplementedError, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      action: "list-subscribers",
      endpoint: `/api/${API_ENDPOINTS.newsletter}`,
    });

    return Response.json(
      {
        success: false,
        error: "Admin endpoint not yet implemented",
        message:
          "This endpoint will list newsletter subscribers when database integration is complete",
      },
      { status: HTTP_STATUS.NOT_IMPLEMENTED }
    );
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "list-subscribers",
    });

    return Response.json(
      {
        success: false,
        error: "Internal server error",
        message: error.message,
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: HTTP_STATUS.OK,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
