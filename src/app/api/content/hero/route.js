import { API_ENDPOINTS } from "@config/constants";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const variant = searchParams.get("variant") || "default";
    const endpoint = searchParams.get("endpoint");

    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    let strapiEndpoint = "hero-contents?populate=*";
    if (endpoint === "variants") {
      strapiEndpoint = "hero-contents?populate=*&filters[variant][$ne]=default";
    } else if (variant !== "default") {
      strapiEndpoint = `hero-contents?populate=*&filters[variant][$eq]=${variant}`;
    }

    const response = await fetch(`${STRAPI_URL}/api/${strapiEndpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const content = endpoint === "variants" ? data.data : data.data?.[0];

    if (!content) {
      throw new Error("No content found");
    }

    const transformedContent =
      endpoint === "variants"
        ? content.map(item => ({
            title: item.title?.trim() || "Discover Your Style",
            subtitle: item.subtitle?.trim() || "Premium fashion for the modern lifestyle",
            description: item.description?.trim() || "Explore our curated collection",
            ctaText: item.ctaText?.trim() || "Shop Now",
            ctaLink: item.ctaLink?.trim() || "/shop",
            variant: item.variant || "default",
            isActive: item.isActive ?? true,
            backgroundImage: item.backgroundImage?.url
              ? `${STRAPI_URL}${item.backgroundImage.url}`
              : null,
          }))
        : {
            title: content.title?.trim() || "Discover Your Style",
            subtitle: content.subtitle?.trim() || "Premium fashion for the modern lifestyle",
            description: content.description?.trim() || "Explore our curated collection",
            ctaText: content.ctaText?.trim() || "Shop Now",
            ctaLink: content.ctaLink?.trim() || "/shop",
            variant: content.variant || "default",
            isActive: content.isActive ?? true,
            backgroundImage: content.backgroundImage?.url
              ? `${STRAPI_URL}${content.backgroundImage.url}`
              : null,
            lastUpdated: content.updatedAt || new Date().toISOString(),
          };

    return Response.json({
      success: true,
      data: transformedContent,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.content}/hero`,
        variant: variant,
        lastUpdated: transformedContent.lastUpdated || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Hero content API error:", error.message);

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
