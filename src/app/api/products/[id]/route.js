import { ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/services/errorHandler";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      errorHandler.handleError(new Error("Product ID is required"), ERROR_TYPES.VALIDATION_ERROR, {
        endpoint: `/api/products/[id]`,
        method: "GET",
      });

      return Response.json(
        {
          success: false,
          error: "Product ID is required",
          message: "Missing required parameter: id",
        },
        { status: HTTP_STATUS.BAD_REQUEST }
      );
    }

    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;

    // Try to find by MongoDB _id first, then by slug as fallback
    let product;

    // Check if it's a valid MongoDB ObjectId
    const isValidObjectId = /^[\dA-Fa-f]{24}$/.test(id);

    if (isValidObjectId) {
      // Search by MongoDB _id
      product = await Product.findById(id).lean();
    } else {
      // Search by slug
      product = await Product.findOne({ slug: id, isActive: true }).lean();
    }

    if (!product) {
      errorHandler.handleError(new Error(`Product not found: ${id}`), ERROR_TYPES.NOT_FOUND_ERROR, {
        productId: id,
        endpoint: `/api/products/${id}`,
      });

      return Response.json(
        {
          success: false,
          error: "Product not found",
          message: `No product found with ID or slug: ${id}`,
        },
        { status: HTTP_STATUS.NOT_FOUND }
      );
    }

    const transformedProduct = {
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
      variants: product.variants || [],
      tags: product.tags || [],
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      isNewArrival: product.isNewArrival,
      averageRating: product.averageRating,
      reviewCount: product.reviewCount,
      seo: product.seo || {},
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      inStock: product.variants?.some(v => v.inventory > 0) || false,
      totalInventory: product.variants?.reduce((sum, v) => sum + v.inventory, 0) || 0,
      colors: [...new Set(product.variants?.map(v => v.color) || [])],
      sizes: [...new Set(product.variants?.map(v => v.size) || [])],
    };

    return Response.json({
      success: true,
      data: transformedProduct,
      meta: {
        endpoint: `/api/products/${id}`,
        productId: id,
        source: "mongodb",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      endpoint: `/api/products/[id]`,
      method: "GET",
      params,
    });

    console.error("Individual product API error:", error.message);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch product",
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
