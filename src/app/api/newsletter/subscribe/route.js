import { API_ENDPOINTS } from "@config/constants/api-constants";

export async function POST(request) {
  try {
    console.log("API END_POINTS", API_ENDPOINTS);

    const { email } = await request.json();

    if (!email) {
      return Response.json(
        {
          success: false,
          error: "Email is required",
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        {
          success: false,
          error: "Please enter a valid email address",
        },
        { status: 400 }
      );
    }

    // TODO: [DATA] Replace with MongoDB integration (newsletter)
    // const Newsletter = await import('@lib/database/models/Newsletter');
    // const existingSubscriber = await Newsletter.findOne({ email });
    // if (existingSubscriber) {
    //   return Response.json({ success: false, error: 'Email already subscribed' }, { status: 409 });
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
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error.message);

    return Response.json(
      {
        success: false,
        error: "Failed to subscribe to newsletter",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Admin endpoint to list subscribers
  return Response.json(
    {
      success: false,
      error: "Method not implemented",
    },
    { status: 501 }
  );
}
