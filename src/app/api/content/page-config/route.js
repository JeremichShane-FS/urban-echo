import { API_ENDPOINTS } from "@config/constants/api-constants";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageName = searchParams.get("page") || "homepage";

  try {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    // Fetch from Strapi with filters
    const response = await fetch(
      `${STRAPI_URL}/api/page-configs?filters[pageName][$eq]=${pageName}&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Strapi API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const config = data.data?.[0];

    if (!config) {
      throw new Error("No config found");
    }

    // Transform Strapi data to my expected format
    const transformedConfig = {
      pageName: config.pageName || "homepage",
      seoTitle: config.seoTitle || "Urban Echo | Modern Fashion",
      seoDescription: config.seoDescription || "Discover trendy, high-quality clothing",
      showFeaturedProducts: config.showFeaturedProducts ?? true,
      showNewArrivals: config.showNewArrivals ?? true,
      showNewsletter: config.showNewsletter ?? true,
      showAboutSection: config.showAboutSection ?? true,
      showTestimonials: config.showTestimonials ?? true,
      showCategories: config.showCategories ?? true,
      maxFeaturedProducts: config.maxFeaturedProducts || 8,
      maxNewArrivals: config.maxNewArrivals || 8,
    };

    return Response.json({
      success: true,
      data: transformedConfig,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
        pageName: pageName,
        lastUpdated: config.updatedAt || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Page config API error:", error.message);

    const fallbackConfig = {
      pageName: pageName,
      seoTitle: "Urban Echo | Modern Fashion E-Commerce",
      seoDescription:
        "Discover trendy, high-quality clothing at Urban Echo. Shop our curated collection of contemporary fashion.",
      showFeaturedProducts: true,
      showNewArrivals: true,
      showNewsletter: true,
      showAboutSection: true,
      showTestimonials: true,
      showCategories: true,
      maxFeaturedProducts: 8,
      maxNewArrivals: 8,
    };

    console.warn("Using fallback page config due to error:", error.message);
    return Response.json({
      success: true,
      data: fallbackConfig,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
        pageName: fallbackConfig.pageName,
        lastUpdated: new Date().toISOString(),
        fallback: true,
      },
    });
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
import { API_ENDPOINTS } from "@config/constants";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageName = searchParams.get("page") || "homepage";

  try {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    // Fetch from Strapi with filters
    const response = await fetch(
      `${STRAPI_URL}/api/page-configs?filters[pageName][$eq]=${pageName}&populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Strapi API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const config = data.data?.[0];

    if (!config) {
      throw new Error("No config found");
    }

    // Transform Strapi data to my expected format
    const transformedConfig = {
      pageName: config.pageName || "homepage",
      seoTitle: config.seoTitle || "Urban Echo | Modern Fashion",
      seoDescription: config.seoDescription || "Discover trendy, high-quality clothing",
      showFeaturedProducts: config.showFeaturedProducts ?? true,
      showNewArrivals: config.showNewArrivals ?? true,
      showNewsletter: config.showNewsletter ?? true,
      showAboutSection: config.showAboutSection ?? true,
      showTestimonials: config.showTestimonials ?? true,
      showCategories: config.showCategories ?? true,
      maxFeaturedProducts: config.maxFeaturedProducts || 8,
      maxNewArrivals: config.maxNewArrivals || 8,
    };

    return Response.json({
      success: true,
      data: transformedConfig,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
        pageName: pageName,
        lastUpdated: config.updatedAt || new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Page config API error:", error.message);

    const fallbackConfig = {
      pageName: pageName,
      seoTitle: "Urban Echo | Modern Fashion E-Commerce",
      seoDescription:
        "Discover trendy, high-quality clothing at Urban Echo. Shop our curated collection of contemporary fashion.",
      showFeaturedProducts: true,
      showNewArrivals: true,
      showNewsletter: true,
      showAboutSection: true,
      showTestimonials: true,
      showCategories: true,
      maxFeaturedProducts: 8,
      maxNewArrivals: 8,
    };

    console.warn("Using fallback page config due to error:", error.message);
    return Response.json({
      success: true,
      data: fallbackConfig,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.content}/page-config`,
        pageName: fallbackConfig.pageName,
        lastUpdated: new Date().toISOString(),
        fallback: true,
      },
    });
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
