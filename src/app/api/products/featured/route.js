import { API_ENDPOINTS, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/services/errorHandler";

const ERROR_SOURCE = "featured-products-api";

export async function GET(request) {
  try {
    await dbConnect();

    const Product = (await import("@lib/mongodb/models/product.js")).default;

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 8;
    const category = searchParams.get("category");

    // Build query for featured products
    const query = {
      isActive: true,
      isFeatured: true,
    };

    if (category) {
      query.category = category;
    }

    // Get featured products
    const featuredProducts = await Product.find(query)
      .sort({ averageRating: -1, reviewCount: -1 })
      .limit(limit)
      .lean();

    const transformedProducts = featuredProducts.map(product => ({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images?.[0]?.url || null,
      slug: product.slug,
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      description: product.description,
      colors: [...new Set(product.variants?.map(v => v.color) || [])],
      sizes: [...new Set(product.variants?.map(v => v.size) || [])],
      inStock: product.variants?.some(v => v.inventory > 0) || false,
      featured: product.isFeatured,
      isNew: product.isNewArrival,
      rating: product.averageRating,
      reviewCount: product.reviewCount,
      tags: product.tags,
    }));

    return Response.json({
      success: true,
      data: transformedProducts,
      meta: {
        total: transformedProducts.length,
        limit: limit,
        category: category,
        endpoint: `/api/${API_ENDPOINTS.products}/featured`,
        source: "mongodb",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
      source: ERROR_SOURCE,
      action: "getFeaturedProducts",
      endpoint: `/api/${API_ENDPOINTS.products}/featured`,
    });

    return Response.json(
      {
        success: false,
        error: "Failed to fetch featured products",
        message: error.message,
        source: "mongodb",
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
