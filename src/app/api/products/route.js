import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/services/errorHandler";
import {
  buildFieldSelection,
  buildProductQuery,
  createCorsResponse,
  createErrorResponse,
  createProductMeta,
  createSuccessResponse,
  transformProducts,
  validatePagination,
} from "@modules/core/utils/api";

const ERROR_SOURCE = "featured-products-api";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawLimit = parseInt(searchParams.get("limit")) || 8;
    const category = searchParams.get("category");

    const validation = validatePagination({
      limit: rawLimit,
      maxLimit: 50,
      endpoint: `/api/${API_ENDPOINTS.featuredProducts}`,
    });
    if (!validation.isValid) {
      return validation.response;
    }

    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;

    const query = buildProductQuery({
      category,
      isActive: true,
      isFeatured: true,
    });

    const featuredProducts = await Product.find(query)
      .sort({ averageRating: -1, reviewCount: -1 })
      .limit(rawLimit)
      .select(buildFieldSelection("listing"))
      .lean();

    const transformedProducts = transformProducts(featuredProducts);

    const meta = createProductMeta(
      `/api/${API_ENDPOINTS.featuredProducts}`,
      { category, limit: rawLimit },
      "mongodb"
    );

    return createSuccessResponse(
      {
        products: transformedProducts,
        total: transformedProducts.length,
      },
      meta
    );
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
      source: ERROR_SOURCE,
      action: "getFeaturedProducts",
      endpoint: `/api/${API_ENDPOINTS.featuredProducts}`,
    });

    console.error("Featured products API error:", error.message);

    return createErrorResponse("Failed to fetch featured products", error.message, {
      source: "mongodb",
    });
  }
}

export async function OPTIONS() {
  return createCorsResponse(["GET", "OPTIONS"]);
}
