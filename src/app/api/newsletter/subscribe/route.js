<<<<<<< HEAD
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

=======
import { API_ENDPOINTS } from "@config/constants/api-constants";

export async function POST(request) {
  try {
    console.log("API END_POINTS", API_ENDPOINTS);

    const { email } = await request.json();

    if (!email) {
>>>>>>> origin/main
      return Response.json(
        {
          success: false,
          error: "Email is required",
        },
<<<<<<< HEAD
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

=======
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
>>>>>>> origin/main
      return Response.json(
        {
          success: false,
          error: "Please enter a valid email address",
        },
<<<<<<< HEAD
        { status: HTTP_STATUS.BAD_REQUEST }
=======
        { status: 400 }
>>>>>>> origin/main
      );
    }

    // TODO: [DATA] Replace with MongoDB integration (newsletter)
    // const Newsletter = await import('@lib/database/models/Newsletter');
    // const existingSubscriber = await Newsletter.findOne({ email });
    // if (existingSubscriber) {
<<<<<<< HEAD
    //   return Response.json({
    //     success: false,
    //     error: 'Email already subscribed'
    //   }, { status: HTTP_STATUS.CONFLICT });
=======
    //   return Response.json({ success: false, error: 'Email already subscribed' }, { status: 409 });
>>>>>>> origin/main
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
<<<<<<< HEAD
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
=======
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
>>>>>>> origin/main

    return Response.json(
      {
        success: false,
        error: "Failed to subscribe to newsletter",
        message: error.message,
      },
<<<<<<< HEAD
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
=======
      { status: 500 }
>>>>>>> origin/main
    );
  }
}

export async function GET() {
<<<<<<< HEAD
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
=======
  // Admin endpoint to list subscribers
  return Response.json(
    {
      success: false,
      error: "Method not implemented",
    },
    { status: 501 }
  );
>>>>>>> origin/main
}
