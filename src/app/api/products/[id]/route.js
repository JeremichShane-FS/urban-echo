/**
 * @fileoverview Individual product details API endpoint for complete product information
 * Handles fetching comprehensive product information by ID or slug with full product details
 * Supports both ObjectId and slug-based lookups with variants, reviews, inventory, and SEO data
 */

import { API_REQUIRED_FIELDS, ERROR_TYPES } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/utils";
import {
  createCorsResponse,
  createErrorResponse,
  createNotFoundResponse,
  createSuccessResponse,
  isValidObjectId,
  transformProductForDetail,
  validateRequiredFields,
} from "@modules/core/utils/api";
const ERROR_SOURCE = "product-detail-api";
/**
 * GET /api/products/[id] - Retrieve complete product details by ID or slug
 * @param {Request} request - Next.js API request object
 * @param {Object} context - Route context with parameters
 * @param {Object} context.params - Route parameters
 * @param {string} context.params.id - Product identifier (ObjectId or slug)
 * @returns {Promise<Response>} JSON response with complete product details
 * @throws {ValidationError} When product ID parameter is missing
 * @throws {NotFoundError} When product is not found or inactive
 * @throws {DatabaseError} When MongoDB connection or query fails
 *
 * @typedef {Object} ProductDetailParams
 * @property {string} id - Product identifier (ObjectId or slug)
 *
 * @typedef {Object} ProductVariant
 * @property {string} id - Variant ID
 * @property {string} name - Variant name (size, color, etc.)
 * @property {string} value - Variant value (Small, Blue, etc.)
 * @property {number} priceModifier - Price adjustment for this variant
 * @property {number} stockQuantity - Stock for this specific variant
 * @property {string} sku - Stock keeping unit
 * @property {boolean} isDefault - Whether this is the default variant
 *
 * @typedef {Object} ProductImage
 * @property {string} id - Image ID
 * @property {string} url - Full image URL
 * @property {string} alt - Alt text for accessibility
 * @property {number} order - Display order
 * @property {boolean} isMain - Whether this is the main product image
 * @property {string[]} variants - Variant IDs this image applies to
 *
 * @typedef {Object} ProductReview
 * @property {string} id - Review ID
 * @property {string} title - Review title
 * @property {string} content - Review content
 * @property {number} rating - Rating (1-5)
 * @property {string} customerName - Customer name
 * @property {string} createdAt - Review creation date
 * @property {boolean} verified - Whether purchase is verified
 *
 * @typedef {Object} ProductSEO
 * @property {string} title - SEO title
 * @property {string} description - Meta description
 * @property {string[]} keywords - SEO keywords
 * @property {string} canonicalUrl - Canonical URL
 * @property {Object} openGraph - Open Graph metadata
 * @property {string} openGraph.title - OG title
 * @property {string} openGraph.description - OG description
 * @property {string} openGraph.image - OG image URL
 *
 * @typedef {Object} ProductDetailResponse
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {string} slug - URL-friendly identifier
 * @property {string} description - Full product description
 * @property {string} shortDescription - Brief product summary
 * @property {number} price - Base price
 * @property {number} [salePrice] - Sale price if on sale
 * @property {string} sku - Stock keeping unit
 * @property {ProductImage[]} images - Product images array
 * @property {ProductVariant[]} variants - Product variants (sizes, colors, etc.)
 * @property {Object} category - Category information
 * @property {string} category.id - Category ID
 * @property {string} category.name - Category display name
 * @property {string} category.slug - Category slug
 * @property {string[]} tags - Product tags
 * @property {Object} inventory - Inventory information
 * @property {boolean} inventory.inStock - Overall stock status
 * @property {number} inventory.totalStock - Total units in stock
 * @property {boolean} inventory.trackQuantity - Whether to track inventory
 * @property {number} inventory.lowStockThreshold - Low stock warning threshold
 * @property {Object} pricing - Pricing details
 * @property {string} pricing.currency - Price currency
 * @property {number} pricing.compareAtPrice - Original price for comparison
 * @property {boolean} pricing.taxable - Whether product is taxable
 * @property {Object} shipping - Shipping information
 * @property {number} shipping.weight - Product weight
 * @property {Object} shipping.dimensions - Product dimensions
 * @property {number} shipping.dimensions.length - Length in inches
 * @property {number} shipping.dimensions.width - Width in inches
 * @property {number} shipping.dimensions.height - Height in inches
 * @property {boolean} shipping.requiresShipping - Whether shipping is required
 * @property {Object} reviews - Review summary
 * @property {number} reviews.averageRating - Average rating (1-5)
 * @property {number} reviews.totalReviews - Total number of reviews
 * @property {ProductReview[]} reviews.recent - Recent reviews
 * @property {Object} status - Product status flags
 * @property {boolean} status.isActive - Whether product is active
 * @property {boolean} status.isFeatured - Featured product flag
 * @property {boolean} status.isOnSale - Sale status
 * @property {boolean} status.isNewArrival - New arrival flag
 * @property {boolean} status.isBestSeller - Best seller flag
 * @property {ProductSEO} seo - SEO metadata
 * @property {string} createdAt - Product creation date
 * @property {string} updatedAt - Last update date
 *
 * @typedef {Object} ProductDetailMeta
 * @property {string} endpoint - API endpoint used
 * @property {string} productId - Product identifier
 * @property {string} source - Data source
 * @property {string} lastUpdated - ISO timestamp
 *
 * @example
 * // Get product by MongoDB ObjectId
 * GET /api/products/507f1f77bcf86cd799439011
 * // Returns complete product details by database ID
 *
 * @example
 * // Get product by URL slug
 * GET /api/products/classic-denim-jacket
 * // Returns product details for SEO-friendly URL
 *
 * @example
 * // Successful response structure with complete product data
 * {
 *   "data": {
 *     "id": "507f1f77bcf86cd799439011",
 *     "name": "Classic Denim Jacket",
 *     "slug": "classic-denim-jacket",
 *     "description": "Timeless denim jacket crafted from premium cotton...",
 *     "shortDescription": "Classic denim jacket in premium cotton",
 *     "price": 89.99,
 *     "salePrice": 69.99,
 *     "sku": "DJ-001",
 *     "images": [
 *       {
 *         "id": "img1",
 *         "url": "https://example.com/jacket-front.jpg",
 *         "alt": "Classic denim jacket front view",
 *         "order": 1,
 *         "isMain": true,
 *         "variants": ["size-small", "size-medium"]
 *       }
 *     ],
 *     "variants": [
 *       {
 *         "id": "size-small",
 *         "name": "Size",
 *         "value": "Small",
 *         "priceModifier": 0,
 *         "stockQuantity": 5,
 *         "sku": "DJ-001-S",
 *         "isDefault": false
 *       }
 *     ],
 *     "category": {
 *       "id": "cat1",
 *       "name": "Outerwear",
 *       "slug": "outerwear"
 *     },
 *     "tags": ["denim", "casual", "classic"],
 *     "inventory": {
 *       "inStock": true,
 *       "totalStock": 15,
 *       "trackQuantity": true,
 *       "lowStockThreshold": 5
 *     },
 *     "pricing": {
 *       "currency": "USD",
 *       "compareAtPrice": 89.99,
 *       "taxable": true
 *     },
 *     "shipping": {
 *       "weight": 1.2,
 *       "dimensions": {
 *         "length": 12,
 *         "width": 10,
 *         "height": 2
 *       },
 *       "requiresShipping": true
 *     },
 *     "reviews": {
 *       "averageRating": 4.5,
 *       "totalReviews": 23,
 *       "recent": []
 *     },
 *     "status": {
 *       "isActive": true,
 *       "isFeatured": true,
 *       "isOnSale": true,
 *       "isNewArrival": false,
 *       "isBestSeller": false
 *     },
 *     "seo": {
 *       "title": "Classic Denim Jacket - Urban Echo",
 *       "description": "Shop our classic denim jacket...",
 *       "keywords": ["denim jacket", "outerwear", "casual wear"],
 *       "canonicalUrl": "/products/classic-denim-jacket"
 *     },
 *     "createdAt": "2024-01-01T00:00:00Z",
 *     "updatedAt": "2024-01-15T10:30:00Z"
 *   },
 *   "meta": {
 *     "endpoint": "/api/products/classic-denim-jacket",
 *     "productId": "classic-denim-jacket",
 *     "source": "mongodb",
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   }
 * }
 *
 * @example
 * // Error response when product is not found
 * {
 *   "error": "Not Found",
 *   "message": "Product not found",
 *   "details": {
 *     "resource": "Product",
 *     "identifier": "invalid-slug"
 *   },
 *   "meta": {
 *     "endpoint": "/api/products/invalid-slug",
 *     "timestamp": "2024-01-15T10:30:00Z"
 *   }
 * }
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const validation = validateRequiredFields(
      { id },
      API_REQUIRED_FIELDS.PRODUCT_DETAIL,
      `/api/products/[id]`
    );

    if (!validation.isValid) return validation.response;

    await dbConnect();
    const Product = (await import("@lib/mongodb/models/product")).default;
    let product;

    if (isValidObjectId(id)) {
      product = await Product.findById(id).lean();
    } else {
      product = await Product.findOne({
        slug: id,
        isActive: true,
      }).lean();
    }

    if (!product) {
      errorHandler.handleError(new Error(`Product not found: ${id}`), ERROR_TYPES.NOT_FOUND_ERROR, {
        productId: id,
        endpoint: `/api/products/${id}`,
      });

      return createNotFoundResponse("Product", id, {
        endpoint: `/api/products/${id}`,
      });
    }

    const transformedProduct = transformProductForDetail(product);

    return createSuccessResponse(transformedProduct, {
      endpoint: `/api/products/${id}`,
      productId: id,
      source: "mongodb",
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      endpoint: `/api/products/[id]`,
      method: "GET",
      params,
    });

    return createErrorResponse("Failed to fetch product", error.message, { source: "mongodb" });
  }
}

/**
 * OPTIONS /api/products/[id] - CORS preflight handler for individual product endpoint
 * @returns {Response} CORS headers configured for read-only operations
 *
 * @example
 * // Preflight request for product details
 * OPTIONS /api/products/507f1f77bcf86cd799439011
 * // Returns appropriate CORS headers for GET operations
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
