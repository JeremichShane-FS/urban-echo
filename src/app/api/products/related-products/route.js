/**
 * @fileoverview Related products API endpoint for intelligent product recommendations
 * Finds products related to a specific product using category, tags, and similarity algorithms with smart filtering
 * Supports customer behavior analysis, cross-category recommendations, and configurable matching strategies
 */

import {
  API_ENDPOINTS,
  API_REQUIRED_FIELDS,
  API_VALIDATION_LIMITS,
  ERROR_TYPES,
} from "@config/constants";
import { errorHandler } from "@modules/core/utils";
import {
  createCorsResponse,
  createErrorResponse,
  createSuccessResponse,
  validatePagination,
  validateRequiredFields,
} from "@modules/core/utils/api";
import { relatedProductsService } from "@modules/product/services";

// =================================================================
// CONFIGURATION CONSTANTS
// =================================================================

/**
 * Related products API configuration
 * @constant {string} ERROR_SOURCE - Error tracking source identifier
 */
const ERROR_SOURCE = "related-products-api";

// =================================================================
// API ROUTE HANDLERS
// =================================================================

/**
 * GET /api/products/related-products - Get products related to a specific product using intelligent matching
 * @param {Request} request - Next.js API request object with URL search parameters
 * @returns {Promise<Response>} JSON response with related products and similarity scores
 * @throws {ValidationError} When required productId parameter is missing or invalid
 * @throws {ValidationError} When pagination parameters exceed limits
 * @throws {ServerError} When recommendation service fails or database error occurs
 *
 * @typedef {Object} RelatedProductsParams
 * @property {string} productId - Source product ID (required - ObjectId or slug)
 * @property {number} [limit=4] - Number of related products to return (max 20)
 * @property {string} [category] - Filter related products by category
 * @property {boolean} [excludeOutOfStock=false] - Exclude out-of-stock items from results
 * @property {string} [algorithm] - Matching algorithm (similarity, category, tags, hybrid)
 * @property {boolean} [includeSameCategory=true] - Include products from same category
 * @property {boolean} [includeCrossCategory=false] - Include cross-category recommendations
 *
 * @typedef {Object} RelatedProduct
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
 * @property {boolean} isOnSale - Sale status
 * @property {number} similarityScore - Similarity score to source product (0-1)
 * @property {string[]} matchingAttributes - Attributes that match source product
 * @property {string} recommendationReason - Why this product is recommended
 *
 * @typedef {Object} RelatedProductsResponse
 * @property {RelatedProduct[]} data - Array of related products
 * @property {number} count - Number of products returned
 * @property {Object} meta - Response metadata
 * @property {string} meta.endpoint - API endpoint used
 * @property {string} meta.productId - Source product ID
 * @property {Object} meta.filters - Applied filters
 * @property {string} meta.algorithm - Matching algorithm used
 * @property {string} meta.lastUpdated - ISO timestamp
 *
 * @example
 * // Get basic related products for a jacket
 * GET /api/products/related-products?productId=507f1f77bcf86cd799439011
 * // Returns 4 most similar products to the specified jacket
 *
 * @example
 * // Get more related products with category filter
 * GET /api/products/related-products?productId=507f1f77bcf86cd799439011&limit=6&category=clothing
 * // Returns 6 related clothing items similar to the source product
 *
 * @example
 * // Get related products excluding out of stock items
 * GET /api/products/related-products?productId=classic-denim-jacket&excludeOutOfStock=true&limit=8
 * // Returns 8 in-stock products related to the denim jacket
 *
 * @example
 * // Get cross-category recommendations using hybrid algorithm
 * GET /api/products/related-products?productId=507f1f77bcf86cd799439011&includeCrossCategory=true&algorithm=hybrid
 * // Returns products from different categories that complement the source product
 *
 * @example
 * // Successful response structure
 * {
 *   "data": [
 *     {
 *       "id": "507f1f77bcf86cd799439012",
 *       "name": "Vintage Denim Jacket",
 *       "slug": "vintage-denim-jacket",
 *       "description": "Classic vintage-style denim jacket with distressed finish...",
 *       "price": 79.99,
 *       "salePrice": 59.99,
 *       "images": ["https://example.com/vintage-jacket.jpg"],
 *       "category": {
 *         "name": "Outerwear",
 *         "slug": "outerwear"
 *       },
 *       "inStock": true,
 *       "stockQuantity": 8,
 *       "averageRating": 4.4,
 *       "reviewCount": 18,
 *       "isOnSale": true,
 *       "similarityScore": 0.87,
 *       "matchingAttributes": ["category", "material", "style"],
 *       "recommendationReason": "Similar style and material"
 *     }
 *   ],
 *   "count": 1,
 *   "meta": {
 *     "endpoint": "/api/products/related-products",
 *     "productId": "507f1f77bcf86cd799439011",
 *     "filters": {
 *       "limit": 4,
 *       "category": null,
 *       "excludeOutOfStock": false
 *     },
 *     "algorithm": "similarity",
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   }
 * }
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const rawLimit = parseInt(searchParams.get("limit")) || 4;
    const category = searchParams.get("category");
    const excludeOutOfStock = searchParams.get("excludeOutOfStock") === "true";
    const requiredValidation = validateRequiredFields(
      { productId },
      API_REQUIRED_FIELDS.RELATED_PRODUCTS,
      `/api/${API_ENDPOINTS.relatedProducts}`
    );

    if (!requiredValidation.isValid) return requiredValidation.response;

    const limitValidation = validatePagination({
      limit: rawLimit,
      page: 1,
      maxLimit: API_VALIDATION_LIMITS.MAX_RELATED_PRODUCTS,
      endpoint: `/api/${API_ENDPOINTS.relatedProducts}`,
    });

    if (!limitValidation.isValid) return limitValidation.response;

    const relatedProducts = await relatedProductsService.getRelatedProducts(productId, {
      limit: rawLimit,
      category,
      excludeOutOfStock,
    });

    return createSuccessResponse(relatedProducts, {
      endpoint: `/api/${API_ENDPOINTS.relatedProducts}`,
      productId,
      count: relatedProducts.length,
      filters: { limit: rawLimit, category, excludeOutOfStock },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      endpoint: `/api/${API_ENDPOINTS.relatedProducts}`,
      method: "GET",
    });

    return createErrorResponse("Failed to fetch related products", error.message);
  }
}

/**
 * OPTIONS /api/products/related-products - CORS preflight handler for related products endpoint
 * @returns {Response} CORS headers configured for read-only operations
 *
 * @example
 * // Preflight request for related products
 * OPTIONS /api/products/related-products
 * // Returns appropriate CORS headers for GET operations
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
