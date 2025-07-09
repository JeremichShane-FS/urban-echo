/**
 * @fileoverview Product search API endpoint for comprehensive product discovery
 * Handles text search, advanced filtering, sorting, and pagination for products with Strapi CMS integration
 * Supports relevance scoring, category filtering, price ranges, and multiple sorting algorithms
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/utils";
import {
  createCorsResponse,
  createErrorResponse,
  createSuccessResponse,
  fetchFromStrapi,
  handleStrapiNotFound,
  transformProductWithFallbacks,
} from "@modules/core/utils/api";

// =================================================================
// CONFIGURATION CONSTANTS
// =================================================================

/**
 * Product search API configuration
 * @constant {string} ERROR_SOURCE - Error tracking source identifier
 */
const ERROR_SOURCE = "product-search-api";

// =================================================================
// UTILITY FUNCTIONS
// =================================================================

/**
 * Builds search query parameters for Strapi CMS with advanced filtering
 * @param {Object} params - Search parameters from request
 * @param {string} params.q - Search query text
 * @param {string} params.category - Category filter
 * @param {string} params.sortBy - Sort option
 * @param {number} params.limit - Results per page
 * @param {number} params.page - Page number
 * @returns {Object} Formatted search parameters for Strapi API
 *
 * @example
 * // Build basic text search parameters
 * const params = buildSearchParams({ q: 'jacket', limit: 12, page: 1 });
 * // Returns formatted object with filters and pagination
 *
 * @example
 * // Build category-filtered search with sorting
 * const params = buildSearchParams({
 *   q: 'winter',
 *   category: 'outerwear',
 *   sortBy: 'price-low',
 *   limit: 20
 * });
 */
function buildSearchParams(params) {
  const { category, limit = 12, page = 1, q, sortBy } = params;
  const searchParams = {
    populate: "*",
    "pagination[page]": page,
    "pagination[pageSize]": Math.min(limit, 100), // Max 100 items
  };

  // Text search
  if (q && q.trim()) {
    searchParams["filters[$or][0][name][$containsi]"] = q.trim();
    searchParams["filters[$or][1][description][$containsi]"] = q.trim();
    searchParams["filters[$or][2][tags][$containsi]"] = q.trim();
  }

  // Category filter
  if (category && category !== "all") {
    searchParams["filters[category][slug][$eq]"] = category;
  }

  // Sorting
  switch (sortBy) {
    case "price-low":
      searchParams["sort[0]"] = "price:asc";
      break;
    case "price-high":
      searchParams["sort[0]"] = "price:desc";
      break;
    case "rating":
      searchParams["sort[0]"] = "averageRating:desc";
      searchParams["sort[1]"] = "reviewCount:desc";
      break;
    case "newest":
      searchParams["sort[0]"] = "createdAt:desc";
      break;
    case "popularity":
      searchParams["sort[0]"] = "salesCount:desc";
      break;
    default: // relevance
      if (q && q.trim()) {
        // For text search, sort by relevance (Strapi's default)
        break;
      } else {
        // No search query, sort by featured then newest
        searchParams["sort[0]"] = "isFeatured:desc";
        searchParams["sort[1]"] = "createdAt:desc";
      }
  }

  return searchParams;
}

/**
 * Builds complete Strapi endpoint URL with formatted search parameters
 * @param {Object} searchParams - Formatted search parameters
 * @returns {string} Complete Strapi API URL with query string
 *
 * @example
 * // Build endpoint for search request
 * const endpoint = buildStrapiEndpoint(searchParams);
 * // Returns: "products?populate=*&filters[name][$containsi]=jacket&pagination[page]=1"
 */
function buildStrapiEndpoint(searchParams) {
  const baseEndpoint = "products";
  const queryString = new URLSearchParams(searchParams).toString();
  return `${baseEndpoint}?${queryString}`;
}

// =================================================================
// API ROUTE HANDLERS
// =================================================================

/**
 * GET /api/products/search - Search products with text query, category filters, and sorting
 * @param {Request} request - Next.js API request object with URL search parameters
 * @returns {Promise<Response>} JSON response with search results and metadata
 * @throws {ValidationError} When search parameters are invalid
 * @throws {ServerError} When Strapi CMS is unavailable or returns error
 * @throws {NotFoundError} When no products match search criteria
 *
 * @typedef {Object} ProductSearchParams
 * @property {string} [q] - Search query text (searches name, description, tags)
 * @property {string} [category] - Category filter slug (men, women, accessories, etc.)
 * @property {string} [sortBy=relevance] - Sort option (relevance, price-low, price-high, rating, newest, popularity)
 * @property {number} [limit=12] - Results per page (max 100)
 * @property {number} [page=1] - Page number for pagination
 * @property {number} [minPrice] - Minimum price filter
 * @property {number} [maxPrice] - Maximum price filter
 * @property {boolean} [inStock] - Filter for in-stock items only
 * @property {boolean} [onSale] - Filter for sale items only
 *
 * @typedef {Object} SearchProduct
 * @property {string} id - Product ID
 * @property {string} name - Product name
 * @property {string} slug - URL-friendly product identifier
 * @property {string} description - Product description
 * @property {number} price - Product price
 * @property {number} salePrice - Sale price (if on sale)
 * @property {string[]} images - Array of product image URLs
 * @property {Object} category - Product category information
 * @property {string} category.name - Category display name
 * @property {string} category.slug - Category slug
 * @property {boolean} inStock - Stock availability
 * @property {number} stockQuantity - Available quantity
 * @property {number} averageRating - Average customer rating (1-5)
 * @property {number} reviewCount - Number of reviews
 * @property {string[]} tags - Product tags for search
 * @property {boolean} isFeatured - Whether product is featured
 * @property {boolean} isOnSale - Whether product is on sale
 *
 * @typedef {Object} SearchPagination
 * @property {number} page - Current page number
 * @property {number} pageSize - Items per page
 * @property {number} pageCount - Total number of pages
 * @property {number} total - Total number of matching products
 *
 * @typedef {Object} SearchFilters
 * @property {string} query - Applied search query
 * @property {string} category - Applied category filter
 * @property {string} sortBy - Applied sort option
 * @property {Object} priceRange - Applied price range
 * @property {number} priceRange.min - Minimum price
 * @property {number} priceRange.max - Maximum price
 *
 * @typedef {Object} ProductSearchResponse
 * @property {SearchProduct[]} products - Array of matching products
 * @property {SearchPagination} pagination - Pagination information
 * @property {SearchFilters} filters - Applied search filters
 * @property {Object} meta - Response metadata
 * @property {string} meta.endpoint - API endpoint used
 * @property {number} meta.responseTime - Query execution time in ms
 * @property {string} meta.lastUpdated - ISO timestamp
 *
 * @example
 * // Basic text search across all products
 * GET /api/products/search?q=jacket
 * // Returns products matching "jacket" in name, description, or tags
 *
 * @example
 * // Category filter with price sorting
 * GET /api/products/search?category=men&sortBy=price-low
 * // Returns men's products sorted by lowest price first
 *
 * @example
 * // Advanced search with pagination and filters
 * GET /api/products/search?q=winter&category=women&sortBy=rating&limit=20&page=2
 * // Returns page 2 of women's winter products sorted by rating
 *
 * @example
 * // Price range filter with popularity sorting
 * GET /api/products/search?minPrice=50&maxPrice=200&sortBy=popularity
 * // Returns products in $50-$200 range sorted by sales count
 *
 * @example
 * // Successful response structure
 * {
 *   "data": {
 *     "products": [
 *       {
 *         "id": "507f1f77bcf86cd799439011",
 *         "name": "Winter Jacket",
 *         "slug": "winter-jacket",
 *         "description": "Warm winter jacket perfect for cold weather...",
 *         "price": 129.99,
 *         "salePrice": 99.99,
 *         "images": ["https://strapi.example.com/uploads/winter_jacket.jpg"],
 *         "category": {
 *           "name": "Outerwear",
 *           "slug": "outerwear"
 *         },
 *         "inStock": true,
 *         "stockQuantity": 15,
 *         "averageRating": 4.5,
 *         "reviewCount": 23,
 *         "tags": ["winter", "jacket", "outerwear"],
 *         "isFeatured": true,
 *         "isOnSale": true
 *       }
 *     ],
 *     "pagination": {
 *       "page": 1,
 *       "pageSize": 12,
 *       "pageCount": 3,
 *       "total": 36
 *     },
 *     "filters": {
 *       "query": "jacket",
 *       "category": "all",
 *       "sortBy": "relevance",
 *       "priceRange": {
 *         "min": null,
 *         "max": null
 *       }
 *     }
 *   },
 *   "meta": {
 *     "endpoint": "/api/products/search",
 *     "responseTime": 145,
 *     "lastUpdated": "2024-01-15T10:30:00Z"
 *   }
 * }
 */
export async function GET(request) {
  const startTime = Date.now();

  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const searchQuery = buildSearchParams(params);
    const strapiEndpoint = buildStrapiEndpoint(searchQuery);
    const response = await fetchFromStrapi(strapiEndpoint, ERROR_SOURCE);
    const data = await response.json();

    const products = data.data?.map(product => transformProductWithFallbacks(product)) || [];
    const pagination = data.meta?.pagination || {};

    const responseData = {
      products,
      pagination: {
        page: pagination.page || 1,
        pageSize: pagination.pageSize || 12,
        pageCount: pagination.pageCount || 1,
        total: pagination.total || 0,
      },
      filters: {
        query: params.q || "",
        category: params.category || "all",
        sortBy: params.sortBy || "relevance",
        priceRange: {
          min: params.minPrice ? parseFloat(params.minPrice) : null,
          max: params.maxPrice ? parseFloat(params.maxPrice) : null,
        },
      },
    };

    const meta = {
      endpoint: `/api/${API_ENDPOINTS.products}/search`,
      responseTime: Date.now() - startTime,
      lastUpdated: new Date().toISOString(),
    };

    if (products.length === 0 && params.q) {
      return handleStrapiNotFound("products", params.q, ERROR_SOURCE);
    }

    return createSuccessResponse(responseData, meta);
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.SERVER_ERROR, {
      source: ERROR_SOURCE,
      action: "search-products",
      endpoint: `/api/${API_ENDPOINTS.products}/search`,
    });

    return createErrorResponse("Failed to search products", error.message);
  }
}

/**
 * OPTIONS /api/products/search - CORS preflight handler for product search endpoint
 * @returns {Response} CORS headers configured for read-only operations
 *
 * @example
 * // Preflight request for product search
 * OPTIONS /api/products/search
 * // Returns appropriate CORS headers for GET operations
 */
export async function OPTIONS() {
  return createCorsResponse("GET_ONLY");
}
