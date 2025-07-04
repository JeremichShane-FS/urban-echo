import { NextResponse } from "next/server";

import { HTTP_STATUS } from "@config/constants";

/**
 * Simple error logging endpoint for portfolio demonstration
 * In production, you'd typically use Sentry, LogRocket, or similar service
 */
export async function POST(request) {
  try {
    const errorData = await request.json();

    if (!errorData?.type || !errorData?.message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log("📊 Error API Called:", {
        type: errorData.type,
        message: errorData.message,
        source: errorData.context?.source,
        timestamp: errorData.timestamp,
      });
    }

    // In production, integrate with monitoring service
    // Sentry seems like a good option for error tracking
    // Add free plan integration for demonstration
    // https://sentry.io/pricing/?original_referrer=https%3A%2F%2Fwww.google.com%2F

    return NextResponse.json({
      success: true,
      message: "Error logged successfully",
      data: {
        errorId: `error_${Date.now()}`,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error API failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to log error" },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

// Simple health check endpoint
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Error logging API is active",
    timestamp: new Date().toISOString(),
  });
}
