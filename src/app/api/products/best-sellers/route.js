/**
 * @fileoverview Best-selling products API endpoint for sales performance showcase
 * Retrieves products sorted by sales performance and customer ratings with analytics support
 * Supports category filtering, stock options, and configurable limits for marketing and sales displays
 */

import { API_ENDPOINTS, API_VALIDATION_LIMITS, ERROR_TYPES } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/utils";
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

// =================================================================
// CONFIGURATION CONSTANTS
// =================================================================

/**
 * Best sellers API configuration
 * @constant {string} ERROR_SOURCE - Error tracking source identifier
 */
const ERROR_SOURCE = "best-sellers-api";

// =================================================================
// API ROUTE HANDLERS
// =================================================================

/**
 * GET /api/products/best-sellers - Retrieve best-selling products by sales performance
 * @param {Request} request - Next.js API request object with URL search parameters
 * @returns {Promise<Response>} JSON response with best-selling products and metadata
 * @throws {ValidationError} When pagination parameters exceed limits
 * @throws {DatabaseError} When MongoDB connection or query fails
 * @throws {ServerError} When product transformation fails
 *
 * @typedef {Object} BestSellersParams
 * @property {number} [limit=8] - Number of products to return (max 50)
 * @property {string} [category] - Filter by category slug (clothing, accessories, etc.)
 * @property {boolean} [includeOutOfStock=false] - Include out-of-stock items
 *
 * @typedef {Object} BestSellerProduct
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {string} slug - URL-friendly identifier
 * @property {string} description - Product description
 * @property {number} price - Current price
 * @property {number} [salePrice] - Sale price if on sale
 * @property {string[]} images - Product images array
 * @property {Object} category - Category details
 * @property {string} category.name - Category display name
 * @property {string} category.slug - Category identifier
 * @property {boolean} inStock - Stock availability
 * @property {number} stockQuantity - Available quantity
 * @property {number} averageRating - Average customer rating (1-5)
 * @property {number} reviewCount - Number of customer reviews
 * @property {number} salesCount - Total units sold
 * @property {boolean} isBestSeller - Best seller flag
 * @property {boolean} isOnSale - Sale status
 *
 * @typedef {Object} BestSellersResponse
 * @property {BestSellerProduct[]} products - Array of best-selling products
 * @property {number} total - Number of products returned
 * @property {Object} meta - Response metadata
 * @property {string} meta.endpoint - API endpoint used
 * @property {Object} meta.filters - Applied filters
 * @property {string} meta.source - Data source identifier
 * @property {string} meta.lastUpdated - ISO timestamp
 *
 * @example
 * // Get top 8 best-selling products across all categories
 * GET /api/products/best-sellers
 * // Returns products sorted by sales count and rating
 *
 * @example
 * // Get best sellers in electronics category
 * GET /api/products/best-sellers?category=electronics&limit=12
 * // Returns 12 best-selling electronics products
 *
 * @example
 * // Get all best sellers including out of stock items
 * GET /api/products/best-sellers?includeOutOfStock=true&limit=20
 * // Returns 20 best sellers regardless of stock status
 *
 * @example
 * // Successful response structure
 * {
 *   "data": {
 *     "products": [
 *       {
 *         "id": "507f1f77bcf86cd799439011",
 *         "name": "Wireless Headphones",
 *         "slug": "wireless-headphones",
 *         "description": "Premium noise-canceling headphones...",
 *         "price": 199.99,
 *         "salePrice": 149.99,
 *         "images": ["https://example.com/headphones.jpg"],
 *         "category": {
 *           "name": "Electronics",
 *           "slug": "electronics"
 *         },
 *         "inStock": true,
 *         "stockQuantity": 25,
 *         "averageRating": 4.8,
 *         "reviewCount": 342,
 *         "salesCount": 1250,
 *         "isBestSeller": true,
 *         "isOnSale": true
 *       }
 *     ],
 *     "total": 1
 *   },
 *   "meta": {
 *     "endpoint": "/api/products/best-sellers",
 *     "filters": {
 *       "category": "electronics",
 *       "limit": 12
 *     },
 *     "source": "mongodb",
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   }
 * }
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawLimit = parseInt(searchParams.get("limit")) || 8;
    const category = searchParams.get("category");
    const validation = validatePagination({
      limit: rawLimit,
      page: 1,
      maxLimit: API_VALIDATION_LIMITS.MAX_BEST_SELLERS,
      endpoint: `/api/${API_ENDPOINTS.bestSellers}`,
    });

    if (!validation.isValid) return validation.response;

    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;
    const query = buildProductQuery({
      category,
      isActive: true,
      isBestSeller: true,
    });

    const bestSellerProducts = await Product.find(query)
      .sort({ salesCount: -1, averageRating: -1, reviewCount: -1 })
      .limit(rawLimit)
      .select(buildFieldSelection("listing"))
      .lean();
    const transformedProducts = transformProducts(bestSellerProducts);
    const meta = createProductMeta(
      `/api/${API_ENDPOINTS.bestSellers}`,
      { category, limit: rawLimit },
      "mongodb"
    );

    return createSuccessResponse(
      { products: transformedProducts, total: transformedProducts.length },
      meta
    );
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
      source: ERROR_SOURCE,
      action: "getBestSellers",
      endpoint: `/api/${API_ENDPOINTS.bestSellers}`,
    });

    return createErrorResponse("Failed to fetch best sellers", error.message, {
      source: "mongodb",
    });
  }
}

/**
 * OPTIONS /api/products/best-sellers - CORS preflight handler for best sellers endpoint
 * @returns {Response} CORS headers configured for read-only operations
 *
 * @example
 * // Preflight request for best sellers
 * OPTIONS /api/products/best-sellers
 * // Returns appropriate CORS headers for GET operations
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
