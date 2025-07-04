import { API_ENDPOINTS, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";
import { categoriesService } from "@modules/product/services";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeProductCount = searchParams.get("includeProductCount") === "true";
    const includeSubCategories = searchParams.get("includeSubCategories") === "true";
    const status = searchParams.get("status") || "active";

    const categories = await categoriesService.getCategories({
      includeProductCount,
      includeSubCategories,
      status,
    });

    if (!categories || categories.length === 0) {
      return Response.json({
        success: true,
        data: [],
        message: "No categories found",
        meta: {
          endpoint: `/api/${API_ENDPOINTS.categories}`,
          count: 0,
        },
      });
    }

    return Response.json({
      success: true,
      data: categories,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.categories}`,
        count: categories.length,
        filters: {
          includeProductCount,
          includeSubCategories,
          status,
        },
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      endpoint: `/api/${API_ENDPOINTS.categories}`,
      method: "GET",
    });

    console.error("Categories API error:", error.message);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch categories",
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
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
