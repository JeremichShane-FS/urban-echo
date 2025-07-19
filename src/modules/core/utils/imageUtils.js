/**
 * @fileoverview Unified image utility functions for consistent image handling across the application
 * Provides comprehensive image URL management with fallback strategies for all content types
 * Integrates with placehold.co service for consistent placeholder generation with brand colors
 * Enhanced with intelligent multi-format image detection for various API data structures
 * Centralized solution replacing duplicate image handling logic across components and services
 */

/**
 * Generate a placeholder image URL using placehold.co service with customizable styling
 * @function getPlaceholderUrl
 * @param {number} [width=400] - Image width in pixels for responsive design
 * @param {number} [height=400] - Image height in pixels for aspect ratio control
 * @param {string} [text="Product"] - Text to display on placeholder for content identification
 * @param {string} [bgColor="e2e8f0"] - Background color as hex code without # symbol
 * @param {string} [textColor="718096"] - Text color as hex code without # symbol for contrast
 * @returns {string} Complete placeholder image URL with encoded parameters
 */
export const getPlaceholderUrl = (
  width = 400,
  height = 400,
  text = "Product",
  bgColor = "e2e8f0",
  textColor = "718096"
) => {
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${text}`;
};

/**
 * Brand-specific placeholder configurations for consistent visual identity
 */
export const PLACEHOLDER_CONFIGS = {
  product: {
    bgColor: "e2e8f0",
    textColor: "718096",
    defaultText: "Product",
  },
  hero: {
    bgColor: "4A90A7",
    textColor: "F7F7F7",
    defaultText: "Urban Fashion",
  },
  category: {
    bgColor: "333333",
    textColor: "E67E22",
    defaultText: "Category",
  },
};

/**
 * Get a branded placeholder for different content types with predefined styling configurations
 * @function getBrandedPlaceholder
 * @param {string} [type="product"] - Type of placeholder (product, hero, category)
 * @param {number} [width=400] - Image width in pixels
 * @param {number} [height=400] - Image height in pixels
 * @param {string|null} [text=null] - Custom text override
 * @returns {string} Branded placeholder URL
 */
export const getBrandedPlaceholder = (type = "product", width = 400, height = 400, text = null) => {
  const config = PLACEHOLDER_CONFIGS[type] || PLACEHOLDER_CONFIGS.product;
  const displayText = text || config.defaultText;
  return getPlaceholderUrl(width, height, displayText, config.bgColor, config.textColor);
};

/**
 * UNIVERSAL image URL resolver - handles all image formats across the entire application
 * This replaces all other image handling functions
 * @function getImageUrl
 * @param {Object|string} source - Source data (product, category, etc.) or direct URL string
 * @param {Object} [options={}] - Configuration options
 * @param {string} [options.type="product"] - Content type for placeholder styling
 * @param {number} [options.width=400] - Desired image width
 * @param {number} [options.height=400] - Desired image height
 * @param {string} [options.fallbackText] - Custom fallback text for placeholder
 * @returns {string} Valid image URL or branded placeholder URL
 *
 * @example
 * // Product with images array
 * const productUrl = getImageUrl(product);
 *
 * @example
 * // Related product with options
 * const relatedUrl = getImageUrl(relatedProduct, { width: 200, height: 200 });
 *
 * @example
 * // Category with custom placeholder
 * const categoryUrl = getImageUrl(category, { type: 'category', fallbackText: 'Fashion Category' });
 *
 * @example
 * // Direct URL string
 * const directUrl = getImageUrl("https://example.com/image.jpg");
 */
export const getImageUrl = (source, options = {}) => {
  const { fallbackText = null, height = 400, type = "product", width = 400 } = options;

  // Handle direct URL strings
  if (typeof source === "string") {
    return source.trim() || getBrandedPlaceholder(type, width, height, fallbackText);
  }

  // Handle null/undefined source
  if (!source || typeof source !== "object") {
    return getBrandedPlaceholder(type, width, height, fallbackText);
  }

  // Define image extraction strategies in order of priority
  const imageStrategies = [
    // 1. Enhanced service format: primaryImage
    () => source.primaryImage?.trim(),

    // 2. Images array with objects: images: [{ url: "..." }]
    () => source.images?.[0]?.url?.trim(),

    // 3. Images array with strings: images: ["url1", "url2"]
    () =>
      Array.isArray(source.images) && typeof source.images[0] === "string"
        ? source.images[0]?.trim()
        : null,

    // 4. Category structure: image: { url: "...", alt: "..." }
    () => source.image?.url?.trim(),

    // 5. Direct image string: image: "url"
    () => (typeof source.image === "string" ? source.image.trim() : null),

    // 6. Alternative field: imageUrl: "url"
    () => (typeof source.imageUrl === "string" ? source.imageUrl.trim() : null),

    // 7. Legacy field: src: "url"
    () => (typeof source.src === "string" ? source.src.trim() : null),
  ];

  // Try each strategy until we find a valid image URL
  for (const strategy of imageStrategies) {
    const imageUrl = strategy();
    if (imageUrl) {
      return imageUrl;
    }
  }

  // Return branded placeholder if no image found
  const displayText =
    fallbackText || source.name || source.title || PLACEHOLDER_CONFIGS[type].defaultText;
  return getBrandedPlaceholder(type, width, height, displayText);
};

/**
 * Normalizes an array of images to consistent string format
 * @function normalizeImageArray
 * @param {Array} images - Raw image array from API
 * @returns {Array<string>} Array of normalized image URL strings
 */
export const normalizeImageArray = images => {
  if (!Array.isArray(images) || images.length === 0) {
    return [getBrandedPlaceholder("product")];
  }

  const normalizedImages = images
    .map(image => {
      if (typeof image === "string" && image.trim()) {
        return image.trim();
      }
      if (image && typeof image === "object" && image.url && image.url.trim()) {
        return image.url.trim();
      }
      return null;
    })
    .filter(Boolean);

  return normalizedImages.length > 0 ? normalizedImages : [getBrandedPlaceholder("product")];
};

/**
 * Enhanced product data transformer with unified image handling
 * @function transformProductData
 * @param {Object} rawProduct - Raw product data from API
 * @returns {Object} Transformed product with normalized image structure
 */
export const transformProductData = rawProduct => {
  if (!rawProduct) return null;

  const normalizedImages = normalizeImageArray(rawProduct.images);

  return {
    ...rawProduct,
    images: normalizedImages,
    primaryImage: normalizedImages[0],
    hasMultipleImages: normalizedImages.length > 1,
  };
};

// =================================================================
// CONVENIENCE FUNCTIONS FOR SPECIFIC USE CASES
// =================================================================

/**
 * Get product image URL - convenience function for products
 * @function getProductImageUrl
 * @param {Object} product - Product object
 * @param {Object} [options] - Additional options
 * @returns {string} Product image URL
 */
export const getProductImageUrl = (product, options = {}) => {
  return getImageUrl(product, { type: "product", ...options });
};

/**
 * Get related product image URL - convenience function for related products
 * @function getRelatedProductImageUrl
 * @param {Object} relatedProduct - Related product object
 * @returns {string} Related product image URL
 */
export const getRelatedProductImageUrl = relatedProduct => {
  return getImageUrl(relatedProduct, {
    type: "product",
    width: 200,
    height: 200,
  });
};

/**
 * Get category image URL - convenience function for categories
 * @function getCategoryImageUrl
 * @param {Object} category - Category object
 * @returns {string} Category image URL
 */
export const getCategoryImageUrl = category => {
  return getImageUrl(category, {
    type: "category",
    fallbackText: category.name || "Category",
  });
};

/**
 * Get hero image URL - convenience function for hero sections
 * @function getHeroImageUrl
 * @param {string|Object} source - Hero image source
 * @param {number} [width=1200] - Hero image width
 * @param {number} [height=600] - Hero image height
 * @returns {string} Hero image URL
 */
export const getHeroImageUrl = (source, width = 1200, height = 600) => {
  return getImageUrl(source, {
    type: "hero",
    width,
    height,
    fallbackText: "Urban Fashion",
  });
};
