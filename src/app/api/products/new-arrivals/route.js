import { API_ENDPOINTS, DEFAULT_PAGINATION, ERROR_TYPES, HTTP_STATUS } from "@config/constants";
import dbConnect from "@lib/mongodb/client.js";
import { errorHandler } from "@modules/core/services/errorHandler";

const ERROR_SOURCE = "new-arrivals-api";

/**
 * New arrivals product endpoint with category filtering and pagination
 * @description Retrieves latest products marked as new arrivals from MongoDB with optional
 * category filtering and pagination support. Specifically queries products with isNewArrival
 * flag set to true, providing sorting options optimized for showcasing newest items first.
 * Includes comprehensive logging for debugging and error tracking in production environment.
 * @async
 * @function GET
 * @param {Request} request - Next.js API request object
 * @param {string} [request.searchParams.category] - Filter by specific product category
 * @param {string} [request.searchParams.limit] - Number of products per page (default: 8)
 * @param {string} [request.searchParams.page] - Page number for pagination (default: 1)
 * @param {string} [request.searchParams.sort] - Sort field (newest, oldest, price-low, price-high, rating)
 * @param {string} [request.searchParams.order] - Sort order (asc/desc, defaults to newest first)
 * @returns {Promise<Response>} JSON response with new arrivals products and pagination metadata
 * @returns {boolean} returns.success - Operation success status
 * @returns {Array} returns.products - Array of transformed new arrival product objects
 * @returns {Object} returns.pagination - Pagination information with page, limit, total, hasMore
 * @returns {Object} returns.meta - Request metadata including endpoint, source, query parameters
 * @returns {Object} [returns.debug] - Debug information including error stack trace on failure
 * @throws {Error} When database connection fails or new arrivals query execution errors occur
 * @example
 * Get new arrivals with category filter
 * fetch('/api/products/new-arrivals?category=clothing&limit=12&sort=newest')
 */
export async function GET(request) {
  try {
    await dbConnect();

    const Product = (await import("@lib/mongodb/models/product.js")).default;
    const searchParams = new URL(request.url, "http://localhost:3000").searchParams;
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit")) || 8;
    const page = parseInt(searchParams.get("page")) || DEFAULT_PAGINATION.page;
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") === "asc" ? 1 : -1;
    const query = {
      isActive: true,
      isNewArrival: true,
    };

    if (category) query.category = category;

    const skip = (page - 1) * limit;
    const sortObj = {};
    switch (sort) {
      case "price-low":
        sortObj.price = 1;
        break;
      case "price-high":
        sortObj.price = -1;
        break;
      case "rating":
        sortObj.averageRating = -1;
        break;
      case "newest":
      case "createdAt":
        sortObj.createdAt = -1;
        break;
      case "oldest":
        sortObj.createdAt = 1;
        break;
      default:
        sortObj.createdAt = -1;
    }

    const [products, totalCount] = await Promise.all([
      Product.find(query).sort(sortObj).skip(skip).limit(limit).lean().select({
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
        isFeatured: 1,
        isNewArrival: 1,
        averageRating: 1,
        reviewCount: 1,
        tags: 1,
        createdAt: 1,
        updatedAt: 1,
      }),
      Product.countDocuments(query),
    ]);

    const transformedProducts = products.map(product => ({
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
      variants: product.variants,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return Response.json({
      success: true,
      products: transformedProducts,
      pagination: {
        page: page,
        limit: limit,
        total: totalCount,
        totalPages: totalPages,
        hasMore: hasNextPage,
        hasPrevPage: hasPrevPage,
      },
      meta: {
        endpoint: `/api/${API_ENDPOINTS.newArrivals}`,
        source: "mongodb",
        query: {
          category,
          sort,
          order: order === 1 ? "asc" : "desc",
        },
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
      source: ERROR_SOURCE,
      action: "getNewArrivals",
      endpoint: `/api/${API_ENDPOINTS.newArrivals}`,
    });

    return Response.json(
      {
        success: false,
        error: "Failed to fetch new arrivals",
        message: error.message,
        source: "mongodb",
        debug: {
          stack: error.stack,
          name: error.name,
        },
      },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * New arrivals API CORS preflight handler
 * @description Handles CORS preflight requests for new arrivals API endpoints,
 * enabling cross-origin requests for product catalog integration. Supports GET method
 * for public product browsing with appropriate content-type headers.
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
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
