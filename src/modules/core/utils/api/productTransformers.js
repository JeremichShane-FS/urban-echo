/**
 * @fileoverview Product data transformation utilities for MongoDB to frontend format conversion
 * Provides comprehensive product data transformers with flexible options for different use cases
 * Handles variant data aggregation, image processing, and SEO metadata transformation
 * Optimizes data structure for frontend consumption with computed fields and consistent formatting
 */

/**
 * Transforms a raw MongoDB product document to frontend-compatible format with flexible options
 * @function transformProduct
 * @param {Object} product - Raw product document from MongoDB with complete product data
 * @param {Object} [options={}] - Transform options for controlling output data
 * @param {boolean} [options.includeVariants=false] - Include full variant data (size, color, inventory)
 * @param {boolean} [options.includeImages=true] - Include image URLs and metadata
 * @param {boolean} [options.includeSEO=false] - Include SEO metadata for detail pages
 * @returns {Object|null} Transformed product object with frontend-friendly structure or null if input invalid
 *
 * @description
 * Transforms MongoDB product documents to consistent frontend format:
 * - Converts MongoDB _id to string id for frontend compatibility
 * - Aggregates variant data to compute available colors, sizes, and inventory
 * - Processes image arrays and selects primary image
 * - Calculates stock status and total inventory from variants
 * - Includes computed fields for better UX (inStock, totalInventory)
 * - Conditionally includes expensive data (variants, SEO) based on options
 *
 * @example
 * const listingProduct = transformProduct(mongoProduct, {
 *   includeVariants: false,
 *   includeImages: true,
 *   includeSEO: false
 * });
 * // Returns optimized product for listing pages
 *
 * @example
 * const detailProduct = transformProduct(mongoProduct, {
 *   includeVariants: true,
 *   includeImages: true,
 *   includeSEO: true
 * });
 * // Returns complete product data for detail pages
 */
export const transformProduct = (product, options = {}) => {
  const { includeImages = true, includeSEO = false, includeVariants = false } = options;

  if (!product) return null;

  const transformed = {
    id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    category: product.category,
    subcategory: product.subcategory,
    brand: product.brand,
    tags: product.tags || [],
    isFeatured: product.isFeatured,
    isNewArrival: product.isNewArrival,
    isBestSeller: product.isBestSeller,
    averageRating: product.averageRating,
    reviewCount: product.reviewCount,
    salesCount: product.salesCount,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };

  // Add computed fields from variants
  if (product.variants) {
    transformed.colors = [...new Set(product.variants.map(v => v.color).filter(Boolean))];
    transformed.sizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))];
    transformed.inStock = product.variants.some(v => v.inventory > 0);
    transformed.totalInventory = product.variants.reduce((sum, v) => sum + (v.inventory || 0), 0);

    if (includeVariants) {
      transformed.variants = product.variants;
    }
  } else {
    transformed.colors = [];
    transformed.sizes = [];
    transformed.inStock = false;
    transformed.totalInventory = 0;
  }

  // Add images
  if (includeImages && product.images) {
    transformed.images = product.images;
    transformed.image = product.images[0]?.url || null;
  }

  // Add SEO data
  if (includeSEO && product.seo) {
    transformed.seo = product.seo;
  }

  return transformed;
};

/**
 * Transforms multiple products with consistent formatting and error handling
 * @function transformProducts
 * @param {Array} products - Array of raw product documents from MongoDB
 * @param {Object} [options={}] - Transform options (same as transformProduct)
 * @param {boolean} [options.includeVariants=false] - Include full variant data for all products
 * @param {boolean} [options.includeImages=true] - Include image URLs for all products
 * @param {boolean} [options.includeSEO=false] - Include SEO metadata for all products
 * @returns {Array} Array of transformed product objects (filters out invalid products)
 *
 * @description
 * Batch transforms multiple products with consistent options:
 * - Handles array validation and empty arrays gracefully
 * - Filters out null/invalid products from transformation
 * - Applies same transform options to all products
 * - Maintains array order from input
 *
 * @example
 * const transformedProducts = transformProducts(mongoProducts, {
 *   includeVariants: false,
 *   includeImages: true
 * });
 * // Returns array of listing-optimized products
 *
 * @example
 * const detailProducts = transformProducts([singleProduct], {
 *   includeVariants: true,
 *   includeSEO: true
 * });
 * // Returns array with single fully-detailed product
 */
export const transformProducts = (products, options = {}) => {
  if (!Array.isArray(products)) return [];

  return products.map(product => transformProduct(product, options));
};

/**
 * Transforms product for listing views with optimized minimal data structure
 * @function transformProductForListing
 * @param {Object} product - Raw product document from MongoDB
 * @returns {Object} Minimal transformed product optimized for product listings and cards
 *
 * @description
 * Optimized transformer for product listing contexts:
 * - Excludes heavy data (variants, SEO) for performance
 * - Includes essential display data (images, pricing, status)
 * - Provides computed fields needed for list display
 * - Optimizes for fast rendering in product grids
 *
 * @example
 * const listingProduct = transformProductForListing(mongoProduct);
 * // Returns: { id, name, price, image, inStock, colors, sizes, ... }
 * // Excludes: variants array, SEO metadata
 */
export const transformProductForListing = product => {
  return transformProduct(product, {
    includeVariants: false,
    includeImages: true,
    includeSEO: false,
  });
};

/**
 * Transforms product for detail views with complete data structure
 * @function transformProductForDetail
 * @param {Object} product - Raw product document from MongoDB
 * @returns {Object} Fully transformed product with all available data for detail pages
 *
 * @description
 * Complete transformer for product detail contexts:
 * - Includes all available data (variants, images, SEO)
 * - Provides full variant information for size/color selection
 * - Includes SEO metadata for page optimization
 * - Optimized for complete product detail display
 *
 * @example
 * const detailProduct = transformProductForDetail(mongoProduct);
 * // Returns: Complete product with variants[], seo{}, full images[], etc.
 * // Includes: All variant data, SEO metadata, complete image arrays
 */
export const transformProductForDetail = product => {
  return transformProduct(product, {
    includeVariants: true,
    includeImages: true,
    includeSEO: true,
  });
};
