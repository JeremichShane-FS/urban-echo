// src/app/api/products/best-sellers/route.js
import { API_ENDPOINTS, ERROR_TYPES, HTTP_STATUS, REQUEST_HEADERS } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/services/errorHandler";

const ERROR_SOURCE = "best-sellers-api";

/**
 * Best sellers endpoint with MongoDB integration and category filtering
 * @description Retrieves products marked as best sellers from MongoDB with optional category
 * filtering and configurable limits. Sorts products by sales count and rating to showcase
 * the most popular items first. Optimizes database queries with field selection and
 * transforms product data structure for frontend consumption with variant processing.
 * @async
 * @function GET
 * @param {Request} request - Next.js API request object
 * @param {string} [request.searchParams.limit] - Maximum number of products to return (default: 8)
 * @param {string} [request.searchParams.category] - Filter products by specific category
 * @returns {Promise<Response>} JSON response with best seller products array and metadata
 * @returns {boolean} returns.success - Operation success status
 * @returns {Array} returns.products - Array of transformed best seller product objects
 * @returns {string} returns.products[].id - Product unique identifier
 * @returns {string} returns.products[].name - Product name
 * @returns {number} returns.products[].price - Product price
 * @returns {number} [returns.products[].compareAtPrice] - Original price for comparison
 * @returns {string} [returns.products[].image] - Primary product image URL
 * @returns {string} returns.products[].slug - URL-friendly product identifier
 * @returns {string} returns.products[].category - Product category
 * @returns {Array} returns.products[].colors - Available color variants
 * @returns {Array} returns.products[].sizes - Available size variants
 * @returns {boolean} returns.products[].inStock - Product availability status
 * @returns {number} [returns.products[].rating] - Average product rating
 * @returns {number} [returns.products[].reviewCount] - Number of product reviews
 * @returns {number} [returns.products[].salesCount] - Number of units sold
 * @returns {Object} returns.meta - Response metadata including total count and filters
 * @throws {Error} When database connection fails or product query execution errors occur
 * @example
 * Get best sellers with category filter
 * fetch('/api/products/best-sellers?category=clothing&limit=12')
 */
export async function GET(request) {
  try {
    await dbConnect();

    const Product = (await import("@lib/mongodb/models/product")).default;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 8;
    const category = searchParams.get("category");

    // Build query for best sellers
    const query = {
      isActive: true,
      isBestSeller: true,
    };

    if (category) {
      query.category = category;
    }

    // Get best sellers sorted by sales count and rating
    const bestSellerProducts = await Product.find(query)
      .sort({ salesCount: -1, averageRating: -1, reviewCount: -1 })
      .limit(limit)
      .lean()
      .select({
        name: 1,
        price: 1,
        compareAtPrice: 1,
        images: 1,
        slug: 1,
        category: 1,
        subcategory: 1,
        brand: 1,
        description: 1,
        variants: 1,
        isBestSeller: 1,
        isNewArrival: 1,
        isFeatured: 1,
        averageRating: 1,
        reviewCount: 1,
        salesCount: 1,
        tags: 1,
      });

    const transformedProducts = bestSellerProducts.map(product => ({
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
      isBestSeller: product.isBestSeller,
      rating: product.averageRating,
      reviewCount: product.reviewCount,
      salesCount: product.salesCount,
      tags: product.tags,
    }));

    return Response.json({
      success: true,
      products: transformedProducts,
      meta: {
        total: transformedProducts.length,
        limit: limit,
        category: category,
        endpoint: `/api/${API_ENDPOINTS.bestSellers}`,
        source: "mongodb",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
      source: ERROR_SOURCE,
      action: "getBestSellers",
      endpoint: `/api/${API_ENDPOINTS.bestSellers}`,
    });

    console.error("Best sellers API error:", error.message);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch best sellers",
        message: error.message,
        source: "mongodb",
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * Best sellers API CORS preflight handler
 * @description Handles CORS preflight requests for best sellers API endpoints,
 * enabling cross-origin requests for product catalog integration. Supports GET method
 * for public product browsing with appropriate content-type headers using centralized
 * REQUEST_HEADERS constants for consistency across the application.
 * @async
 * @function OPTIONS
 * @param {Request} request - Next.js API request object
 * @returns {Promise<Response>} Empty response with CORS headers
 * @returns {Object} returns.headers - CORS headers for cross-origin access
 * @throws {Error} When CORS configuration fails
 * @example
 * Preflight request handled automatically by browsers
 * No direct usage required
 */
export async function OPTIONS() {
  return new Response(null, {
    status: HTTP_STATUS.OK,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": REQUEST_HEADERS.contentType,
    },
  });
}
