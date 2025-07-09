/**
 * @fileoverview Featured products API endpoint for manually curated product showcase
 * Retrieves manually curated featured products sorted by ratings and review counts
 * Supports category filtering, stock status options, and configurable result limits for marketing displays
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
 * Featured products API configuration
 * @constant {string} ERROR_SOURCE - Error tracking source identifier
 */
const ERROR_SOURCE = "featured-products-api";

// =================================================================
// API ROUTE HANDLERS
// =================================================================

/**
 * GET /api/products/featured - Retrieve manually curated featured products
 * @param {Request} request - Next.js API request object with URL search parameters
 * @returns {Promise<Response>} JSON response with featured products and metadata
 * @throws {ValidationError} When pagination parameters exceed limits
 * @throws {DatabaseError} When MongoDB connection or query fails
 * @throws {ServerError} When product transformation fails
 *
 * @typedef {Object} FeaturedProductsParams
 * @property {number} [limit=8] - Number of products to return (max 50)
 * @property {string} [category] - Filter by category slug (clothing, electronics, etc.)
 * @property {boolean} [includeOutOfStock=false] - Include out-of-stock featured items
 * @property {string} [sortBy=rating] - Sort option (rating, newest, price, name)
 *
 * @typedef {Object} FeaturedProduct
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
 * @property {boolean} isFeatured - Featured product flag (always true)
 * @property {boolean} isOnSale - Sale status
 * @property {string} featuredReason - Why this product is featured
 * @property {number} featuredOrder - Display order for featured products
 *
 * @typedef {Object} FeaturedProductsResponse
 * @property {FeaturedProduct[]} products - Array of featured products
 * @property {number} total - Number of products returned
 * @property {Object} meta - Response metadata
 * @property {string} meta.endpoint - API endpoint used
 * @property {Object} meta.filters - Applied filters
 * @property {string} meta.source - Data source identifier
 * @property {string} meta.lastUpdated - ISO timestamp
 *
 * @example
 * // Get top 8 featured products with default sorting
 * GET /api/products/featured
 * // Returns 8 highest-rated featured products
 *
 * @example
 * // Get featured clothing items with custom limit
 * GET /api/products/featured?category=clothing&limit=12
 * // Returns 12 featured products from clothing category
 *
 * @example
 * // Get all featured products including out of stock items
 * GET /api/products/featured?includeOutOfStock=true&limit=20
 * // Returns 20 featured products regardless of stock status
 *
 * @example
 * // Get featured products sorted by newest additions
 * GET /api/products/featured?sortBy=newest&limit=15
 * // Returns 15 most recently added featured products
 *
 * @example
 * // Successful response structure
 * {
 *   "data": {
 *     "products": [
 *       {
 *         "id": "507f1f77bcf86cd799439011",
 *         "name": "Premium Leather Jacket",
 *         "slug": "premium-leather-jacket",
 *         "description": "Handcrafted genuine leather jacket...",
 *         "price": 299.99,
 *         "salePrice": 249.99,
 *         "images": ["https://example.com/leather-jacket.jpg"],
 *         "category": {
 *           "name": "Outerwear",
 *           "slug": "outerwear"
 *         },
 *         "inStock": true,
 *         "stockQuantity": 12,
 *         "averageRating": 4.9,
 *         "reviewCount": 87,
 *         "isFeatured": true,
 *         "isOnSale": true,
 *         "featuredReason": "Customer favorite",
 *         "featuredOrder": 1
 *       }
 *     ],
 *     "total": 1
 *   },
 *   "meta": {
 *     "endpoint": "/api/products/featured",
 *     "filters": {
 *       "category": "clothing",
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
      maxLimit: API_VALIDATION_LIMITS.MAX_FEATURED_PRODUCTS,
      endpoint: `/api/${API_ENDPOINTS.featuredProducts}`,
    });

    if (!validation.isValid) return validation.response;

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
      { products: transformedProducts, total: transformedProducts.length },
      meta
    );
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.DATABASE_ERROR, {
      source: ERROR_SOURCE,
      action: "getFeaturedProducts",
      endpoint: `/api/${API_ENDPOINTS.featuredProducts}`,
    });

    return createErrorResponse("Failed to fetch featured products", error.message, {
      source: "mongodb",
    });
  }
}

/**
 * OPTIONS /api/products/featured - CORS preflight handler for featured products endpoint
 * @returns {Response} CORS headers configured for read-only operations
 *
 * @example
 * // Preflight request for featured products
 * OPTIONS /api/products/featured
 * // Returns appropriate CORS headers for GET operations
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
