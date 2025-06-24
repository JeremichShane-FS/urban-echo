import { API_ENDPOINTS } from "@config/constants";
import { aboutContentService as data } from "@modules/content/services/about-content-service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    let content;
    if (section === "homepage") {
      content = await data.getAboutSectionContent();
    } else if (section === "full") {
      content = await data.getAboutPageContent();
    } else {
      // Default to homepage section
      content = await data.getAboutSectionContent();
    }

    return Response.json({
      success: true,
      data: content,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.content}/about`,
        section: section || "homepage",
        lastUpdated: content.lastUpdated || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("About content API error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch about content",
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
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
