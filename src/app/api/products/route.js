import { API_ENDPOINTS, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/services/errorHandler";

// eslint-disable-next-line
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit")) || 12;
    const page = parseInt(searchParams.get("page")) || 1;
    const category = searchParams.get("category");
    const sortBy = searchParams.get("sortBy") || "relevance";
    const minPrice = parseFloat(searchParams.get("minPrice")) || null;
    const maxPrice = parseFloat(searchParams.get("maxPrice")) || null;

    if (limit > 100) {
      errorHandler.handleError(
        new Error("Limit exceeds maximum allowed value"),
        ERROR_TYPES.VALIDATION_ERROR,
        { limit, endpoint: `/api/${API_ENDPOINTS.productSearch}` }
      );

      return Response.json(
        {
          success: false,
          error: "Invalid limit parameter",
          message: "Limit cannot exceed 100 items per request",
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    if (page < 1) {
      errorHandler.handleError(new Error("Invalid page parameter"), ERROR_TYPES.VALIDATION_ERROR, {
        page,
        endpoint: `/api/${API_ENDPOINTS.productSearch}`,
      });

      return Response.json(
        {
          success: false,
          error: "Invalid page parameter",
          message: "Page must be a positive integer",
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;
    const searchQuery = { isActive: true };

    if (query.trim()) {
      searchQuery.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } },
        { brand: { $regex: query, $options: "i" } },
      ];
    }

    if (category) searchQuery.category = category;
    if (minPrice !== null || maxPrice !== null) {
      searchQuery.price = {};
      if (minPrice !== null) searchQuery.price.$gte = minPrice;
      if (maxPrice !== null) searchQuery.price.$lte = maxPrice;
    }

    let sortOptions = {};
    switch (sortBy) {
      case "price-low":
        sortOptions = { price: 1 };
        break;
      case "price-high":
        sortOptions = { price: -1 };
        break;
      case "rating":
        sortOptions = { averageRating: -1, reviewCount: -1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "relevance":
      default:
        if (query.trim()) {
          sortOptions = { score: { $meta: "textScore" } };
        } else {
          sortOptions = { createdAt: -1 };
        }
        break;
    }

    const skip = (page - 1) * limit;

    let searchPipeline = Product.find(searchQuery);

    if (query.trim() && sortBy === "relevance") {
      searchPipeline = searchPipeline.sort({ $text: { $search: query } });
    } else {
      searchPipeline = searchPipeline.sort(sortOptions);
    }

    const [products, totalCount] = await Promise.all([
      searchPipeline.skip(skip).limit(limit).lean(),
      Product.countDocuments(searchQuery),
    ]);

    const transformedProducts = products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      images: product.images || [],
      tags: product.tags || [],
      isFeatured: product.isFeatured,
      isNewArrival: product.isNewArrival,
      averageRating: product.averageRating,
      reviewCount: product.reviewCount,
      inStock: product.variants?.some(v => v.inventory > 0) || false,
      colors: [...new Set(product.variants?.map(v => v.color) || [])],
      sizes: [...new Set(product.variants?.map(v => v.size) || [])],
    }));

    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = page < totalPages;

    return Response.json({
      success: true,
      data: transformedProducts,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages,
        hasMore,
      },
      filters: {
        query,
        category,
        sortBy,
        minPrice,
        maxPrice,
      },
      meta: {
        endpoint: `/api/${API_ENDPOINTS.productSearch}`,
        searchQuery: query,
        source: "mongodb",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      endpoint: `/api/${API_ENDPOINTS.productSearch}`,
      method: "GET",
    });

    console.error("Product search API error:", error.message);

    return Response.json(
      {
        success: false,
        error: "Search failed",
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
