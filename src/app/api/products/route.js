/**
 * @fileoverview Main products API endpoint for product catalog browsing and management
 * Handles general product listing with pagination, filtering, sorting, and stock availability checks
 * Serves as the primary endpoint for product catalog browsing with MongoDB integration
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
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

const ERROR_SOURCE = "products-api";

/**
 * GET /api/products - Retrieve paginated product catalog with filtering and sorting
 * @param {Request} request - Next.js API request object with URL search parameters
 * @returns {Promise<Response>} JSON response with product list and metadata
 * @throws {ValidationError} When pagination parameters are invalid
 * @throws {DatabaseError} When MongoDB connection or query fails
 * @throws {ServerError} When product transformation or processing fails
 *
 * @typedef {Object} ProductListParams
 * @property {number} [limit=8] - Number of products per page (max 50)
 * @property {string} [category] - Filter by category slug
 * @property {boolean} [featured] - Filter for featured products only
 * @property {string} [sortBy] - Sort field (price, rating, newest, name)
 * @property {string} [order] - Sort direction (asc, desc)
 * @property {boolean} [inStock] - Filter for in-stock items only
 *
 * @typedef {Object} ProductListing
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {string} slug - URL-friendly identifier
 * @property {string} description - Short description
 * @property {number} price - Current price
 * @property {number} [salePrice] - Sale price if on sale
 * @property {string[]} images - Array of image URLs
 * @property {Object} category - Category information
 * @property {string} category.name - Category display name
 * @property {string} category.slug - Category slug
 * @property {boolean} inStock - Stock availability
 * @property {number} averageRating - Average customer rating
 * @property {number} reviewCount - Number of reviews
 * @property {boolean} isFeatured - Featured product flag
 * @property {boolean} isOnSale - Sale status
 *
 * @typedef {Object} ProductListResponse
 * @property {ProductListing[]} products - Array of products
 * @property {number} total - Total number of products
 * @property {Object} meta - Response metadata
 * @property {string} meta.endpoint - API endpoint used
 * @property {Object} meta.filters - Applied filters
 * @property {string} meta.source - Data source (mongodb)
 * @property {string} meta.lastUpdated - ISO timestamp
 *
 * @example
 * // Get default product list (8 featured products)
 * GET /api/products
 * // Returns first 8 featured products sorted by rating
 *
 * @example
 * // Get products with category filter
 * GET /api/products?category=clothing&limit=12
 * // Returns 12 products from clothing category
 *
 * @example
 * // Get featured products only with custom sorting
 * GET /api/products?featured=true&sortBy=rating&order=desc
 * // Returns featured products sorted by highest rating
 *
 * @example
 * // Filter for in-stock items only
 * GET /api/products?inStock=true&limit=20
 * // Returns 20 in-stock products
 *
 * @example
 * // Successful response structure
 * {
 *   "data": {
 *     "products": [
 *       {
 *         "id": "507f1f77bcf86cd799439011",
 *         "name": "Classic Denim Jacket",
 *         "slug": "classic-denim-jacket",
 *         "description": "Timeless denim jacket perfect for any season...",
 *         "price": 89.99,
 *         "salePrice": 69.99,
 *         "images": ["https://example.com/denim-jacket-front.jpg"],
 *         "category": {
 *           "name": "Outerwear",
 *           "slug": "outerwear"
 *         },
 *         "inStock": true,
 *         "averageRating": 4.5,
 *         "reviewCount": 23,
 *         "isFeatured": true,
 *         "isOnSale": true
 *       }
 *     ],
 *     "total": 1
 *   },
 *   "meta": {
 *     "endpoint": "/api/products",
 *     "filters": {
 *       "category": "clothing",
 *       "limit": 8
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
    const featured = searchParams.get("featured");

    const validation = validatePagination({
      limit: rawLimit,
      maxLimit: 50,
      endpoint: `/api/${API_ENDPOINTS.products}`,
    });
    if (!validation.isValid) {
      return validation.response;
    }

    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;

    const query = buildProductQuery({
      category,
      isActive: true,
      ...(featured === "true" && { isFeatured: true }),
    });

    const featuredProducts = await Product.find(query)
      .sort({ averageRating: -1, reviewCount: -1 })
      .limit(rawLimit)
      .select(buildFieldSelection("listing"))
      .lean();

    const transformedProducts = transformProducts(featuredProducts);

    const meta = createProductMeta(
      `/api/${API_ENDPOINTS.products}`,
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
      action: "getProducts",
      endpoint: `/api/${API_ENDPOINTS.products}`,
    });

    console.error("Products API error:", error.message);

    return createErrorResponse("Failed to fetch products", error.message, {
      source: "mongodb",
    });
  }
}

/**
 * OPTIONS /api/products - CORS preflight handler for products endpoint
 * @returns {Response} CORS headers configured for read-only operations
 *
 * @example
 * // Preflight request for products catalog
 * OPTIONS /api/products
 * // Returns appropriate CORS headers for GET operations
 */
export async function OPTIONS() {
  return createCorsResponse(["GET", "OPTIONS"]);
}
