import { API_ENDPOINTS } from "@config/constants";
import { productService } from "@modules/product/services/product-service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 8;
    const page = parseInt(searchParams.get("page")) || 1;
    const category = searchParams.get("category");

    const result = await productService.getNewArrivals({
      limit,
      page,
      category,
    });

    return Response.json({
      success: true,
      data: result.products,
      pagination: result.pagination,
      filters: result.filters,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.newArrivals}`,
      },
    });
  } catch (error) {
    console.error("New arrivals API error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch new arrivals",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
