/**
 * @fileoverview Product categories API endpoint for hierarchical category management
 * Retrieves product category hierarchy with optional metadata including product counts and subcategories
 * Supports filtering, navigation structure building, and SEO metadata for category pages
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import dbConnect from "@lib/mongodb/client";
import { errorHandler } from "@modules/core/utils";
import {
  createCorsResponse,
  createErrorResponse,
  createSuccessResponse,
} from "@modules/core/utils/api";

const ERROR_SOURCE = "categories-api";

/**
 * GET /api/products/categories - Retrieve product categories with hierarchy and metadata
 * @param {Request} request - Next.js API request object with URL search parameters
 * @returns {Promise<Response>} JSON response with categories array and metadata
 * @throws {DatabaseError} When MongoDB connection or query fails
 * @throws {ServerError} When category processing or product counting fails
 *
 * @typedef {Object} CategoriesParams
 * @property {boolean} [includeProductCount=false] - Include product count for each category
 * @property {boolean} [includeSubCategories=false] - Include subcategory hierarchy
 * @property {string} [status=active] - Filter by category status (active, inactive, all)
 * @property {boolean} [includeEmpty=false] - Include categories with zero products
 * @property {string} [level] - Filter by category level (0 for top-level only)
 *
 * @typedef {Object} ProductCategory
 * @property {string} id - Category ID
 * @property {string} name - Category display name
 * @property {string} slug - URL-friendly identifier
 * @property {string} [description] - Category description
 * @property {string} [image] - Category image URL
 * @property {number} navigationOrder - Display order in navigation
 * @property {number} level - Category hierarchy level (0 = top-level)
 * @property {string} [parentId] - Parent category ID (for subcategories)
 * @property {boolean} isActive - Category active status
 * @property {boolean} isVisible - Category visibility in navigation
 * @property {number} [productCount] - Number of products (if requested)
 * @property {ProductCategory[]} [subcategories] - Child categories (if requested)
 * @property {Object} seo - SEO metadata
 * @property {string} seo.title - SEO title
 * @property {string} seo.description - SEO description
 * @property {string[]} seo.keywords - SEO keywords
 *
 * @typedef {Object} CategoriesResponse
 * @property {ProductCategory[]} data - Array of categories
 * @property {Object} meta - Response metadata
 * @property {string} meta.endpoint - API endpoint used
 * @property {number} meta.count - Number of categories returned
 * @property {string} meta.source - Data source identifier
 * @property {Object} meta.filters - Applied filters
 * @property {string} meta.lastUpdated - ISO timestamp
 *
 * @example
 * // Get basic category list for navigation
 * GET /api/products/categories
 * // Returns active top-level categories
 *
 * @example
 * // Get categories with product counts for analytics
 * GET /api/products/categories?includeProductCount=true
 * // Returns categories with product count for each
 *
 * @example
 * // Get full category hierarchy with subcategories
 * GET /api/products/categories?includeSubCategories=true&includeProductCount=true
 * // Returns complete category tree with counts
 *
 * @example
 * // Get only top-level active categories for main navigation
 * GET /api/products/categories?level=0&status=active
 * // Returns main navigation categories only
 *
 * @example
 * // Successful response structure
 * {
 *   "data": [
 *     {
 *       "id": "507f1f77bcf86cd799439011",
 *       "name": "Clothing",
 *       "slug": "clothing",
 *       "description": "Fashion and apparel for all occasions",
 *       "image": "https://example.com/clothing-category.jpg",
 *       "navigationOrder": 1,
 *       "level": 0,
 *       "isActive": true,
 *       "isVisible": true,
 *       "productCount": 245,
 *       "subcategories": [
 *         {
 *           "id": "507f1f77bcf86cd799439012",
 *           "name": "T-Shirts",
 *           "slug": "t-shirts",
 *           "level": 1,
 *           "parentId": "507f1f77bcf86cd799439011",
 *           "productCount": 45
 *         }
 *       ],
 *       "seo": {
 *         "title": "Clothing - Urban Echo",
 *         "description": "Shop our clothing collection...",
 *         "keywords": ["clothing", "fashion", "apparel"]
 *       }
 *     }
 *   ],
 *   "meta": {
 *     "endpoint": "/api/products/categories",
 *     "count": 1,
 *     "source": "mongodb",
 *     "filters": {
 *       "includeProductCount": true,
 *       "includeSubCategories": true,
 *       "status": "active"
 *     },
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   }
 * }
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeProductCount = searchParams.get("includeProductCount") === "true";
    const includeSubCategories = searchParams.get("includeSubCategories") === "true";
    const status = searchParams.get("status") || "active";

    await dbConnect();

    const Category = (await import("@lib/mongodb/utils/models/category")).default;
    const query = {};
    if (status === "active") {
      query.isActive = true;
      query.isVisible = true;
    }
    let categoriesQuery = Category.find(query).sort({ navigationOrder: 1, name: 1 });

    if (!includeSubCategories) {
      categoriesQuery = categoriesQuery.where({ level: 0 });
    }

    const categories = await categoriesQuery.lean();

    if (includeProductCount && categories.length > 0) {
      const Product = (await import("@lib/mongodb/utils/models/product")).default;

      for (const category of categories) {
        const productCount = await Product.countDocuments({
          category: category.slug,
          isActive: true,
        });
        category.productCount = productCount;
      }
    }

    if (!categories || categories.length === 0) {
      return createSuccessResponse([], {
        endpoint: `/api/${API_ENDPOINTS.categories}`,
        count: 0,
        message: "No categories found",
        source: "mongodb",
      });
    }

    return createSuccessResponse(categories, {
      endpoint: `/api/${API_ENDPOINTS.categories}`,
      count: categories.length,
      source: "mongodb",
      filters: {
        includeProductCount,
        includeSubCategories,
        status,
      },
    });
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      source: ERROR_SOURCE,
      endpoint: `/api/${API_ENDPOINTS.categories}`,
      method: "GET",
    });

    return createErrorResponse("Failed to fetch categories", error.message, {
      source: "mongodb",
      debug: process.env.NODE_ENV === "development" ? { stack: error.stack } : undefined,
    });
  }
}

/**
 * OPTIONS /api/products/categories - CORS preflight handler for categories endpoint
 * @returns {Response} CORS headers configured for read-only operations
 *
 * @example
 * // Preflight request for categories
 * OPTIONS /api/products/categories
 * // Returns appropriate CORS headers for GET operations
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
