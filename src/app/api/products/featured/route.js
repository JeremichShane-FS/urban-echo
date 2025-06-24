import { API_ENDPOINTS } from "@config/constants";
import { productService as data } from "@modules/product/services/product-service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 4;

    const products = await data.getFeaturedProducts();

    return Response.json({
      success: true,
      data: products.slice(0, limit),
      meta: {
        total: products.length,
        limit: limit,
        endpoint: `/api/${API_ENDPOINTS.featuredProducts}`,
      },
    });
  } catch (error) {
    console.error("Featured products API error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch featured products",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
