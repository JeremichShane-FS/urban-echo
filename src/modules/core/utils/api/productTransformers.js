/**
 * Transforms a raw MongoDB product document to frontend-compatible format
 * @param {Object} product - Raw product document from MongoDB
 * @param {Object} options - Transform options
 * @param {boolean} options.includeVariants - Include full variant data
 * @param {boolean} options.includeImages - Include image URLs
 * @param {boolean} options.includeSEO - Include SEO metadata
 * @returns {Object} Transformed product object
 */
export function transformProduct(product, options = {}) {
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
}

/**
 * Transforms multiple products with consistent formatting
 * @param {Array} products - Array of raw product documents
 * @param {Object} options - Transform options (same as transformProduct)
 * @returns {Array} Array of transformed product objects
 */
export function transformProducts(products, options = {}) {
  if (!Array.isArray(products)) return [];

  return products.map(product => transformProduct(product, options));
}

/**
 * Transforms product for listing views (minimal data)
 * @param {Object} product - Raw product document
 * @returns {Object} Minimal transformed product for listings
 */
export function transformProductForListing(product) {
  return transformProduct(product, {
    includeVariants: false,
    includeImages: true,
    includeSEO: false,
  });
}

/**
 * Transforms product for detail views (full data)
 * @param {Object} product - Raw product document
 * @returns {Object} Fully transformed product for detail views
 */
export function transformProductForDetail(product) {
  return transformProduct(product, {
    includeVariants: true,
    includeImages: true,
    includeSEO: true,
  });
}
