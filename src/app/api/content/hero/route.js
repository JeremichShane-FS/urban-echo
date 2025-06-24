import { API_ENDPOINTS } from "@config/constants/api-constants";
import { heroContentService } from "@modules/content/services/hero-content-service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const variant = searchParams.get("variant") || "default";

    // 'variants' for A/B test variants
    const endpoint = searchParams.get("endpoint");

    let data;
    if (endpoint === "variants") {
      data = await heroContentService.getHeroVariants();
    } else {
      data = await heroContentService.getHeroContent({ variant });
    }

    return Response.json({
      success: true,
      data: data,
      meta: {
        endpoint: `/api${API_ENDPOINTS.content}/hero`,
        variant: variant,
        lastUpdated: data.lastUpdated || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Hero content API error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch hero content",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const content = await request.json();

    // Basic validation
    if (!content.title || !content.subtitle || !content.ctaText || !content.ctaLink) {
      return Response.json(
        {
          success: false,
          error: "Missing required fields: title, subtitle, ctaText, ctaLink",
        },
        { status: 400 }
      );
    }

    const updatedContent = await heroContentService.updateHeroContent(content);

    return Response.json({
      success: true,
      data: updatedContent,
      message: "Hero content updated successfully",
    });
  } catch (error) {
    console.error("Hero content update error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to update hero content",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
