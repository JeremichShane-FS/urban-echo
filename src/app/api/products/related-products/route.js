import { API_ENDPOINTS, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";
import { relatedProductsService } from "@modules/product/services";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const limit = parseInt(searchParams.get("limit")) || 4;
    const category = searchParams.get("category");
    const excludeOutOfStock = searchParams.get("excludeOutOfStock") === "true";

    if (!productId) {
      errorHandler.handleError(
        new Error("Product ID is required for related products"),
        ERROR_TYPES.VALIDATION_ERROR,
        { endpoint: `/api/${API_ENDPOINTS.relatedProducts}`, method: "GET" }
      );

      return Response.json(
        {
          success: false,
          error: "Product ID is required",
          message: "Missing required parameter: productId",
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    if (limit > 20) {
      errorHandler.handleError(
        new Error("Limit exceeds maximum allowed value for related products"),
        ERROR_TYPES.VALIDATION_ERROR,
        { limit, productId, endpoint: `/api/${API_ENDPOINTS.relatedProducts}` }
      );

      return Response.json(
        {
          success: false,
          error: "Invalid limit parameter",
          message: "Limit cannot exceed 20 items for related products",
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    const relatedProducts = await relatedProductsService.getRelatedProducts(productId, {
      limit,
      category,
      excludeOutOfStock,
    });

    return Response.json({
      success: true,
      data: relatedProducts,
      meta: {
        endpoint: `/api/${API_ENDPOINTS.relatedProducts}`,
        productId,
        count: relatedProducts.length,
        filters: {
          limit,
          category,
          excludeOutOfStock,
        },
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      endpoint: `/api/${API_ENDPOINTS.relatedProducts}`,
      method: "GET",
      // productId: searchParams?.get("productId"),
    });

    console.error("Related products API error:", error.message);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch related products",
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
