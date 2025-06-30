import { API_ENDPOINTS } from "@config/constants";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section") || "homepage";

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    const response = await fetch(`${STRAPI_URL}/api/about-contents?populate=*`, {
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const content = data.data?.[0];

    if (!content) {
      throw new Error("No content found");
    }

    const transformedContent = {
      title: content.title || "About Urban Echo",
      description: content.description || "Contemporary style and conscious living",
      mission: content.mission || "Provide high-quality, sustainable fashion",
      vision: content.vision || "A world where fashion is both beautiful and responsible",
      values: content.values || ["Quality", "Sustainability", "Style"],
      isActive: content.isActive ?? true,
      lastUpdated: content.updatedAt || new Date().toISOString(),
    };

    return Response.json({
      success: true,
      data: transformedContent,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.content}/about`,
        section: section,
        lastUpdated: transformedContent.lastUpdated,
      },
    });
  } catch (error) {
    console.error("About content API error:", error.message);

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
