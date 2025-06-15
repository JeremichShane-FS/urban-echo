/**
 * Generate a placeholder image URL using placehold.co
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Text to display on placeholder
 * @param {string} bgColor - Background color (hex without #)
 * @param {string} textColor - Text color (hex without #)
 * @returns {string} Placeholder image URL
 */
export const getPlaceholderUrl = (
  width = 400,
  height = 400,
  text = "Product",
  bgColor = "e2e8f0",
  textColor = "718096"
) => {
  const encodedText = encodeURIComponent(text);
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodedText}`;
};

/**
 * Get product image URL with fallback to placeholder
 * @param {Object} product - Product object
 * @param {number} width - Desired image width
 * @param {number} height - Desired image height
 * @returns {string} Image URL
 */
export const getProductImageUrl = (product, width = 400, height = 400) => {
  // If product has actual image, use it
  if (product.image && product.image !== null && product.image !== "") {
    return product.image;
  }

  // Otherwise, generate a placeholder
  return getPlaceholderUrl(
    width,
    height,
    product.name || "Product",
    "e2e8f0", // Light gray background
    "718096" // Gray text
  );
};

/**
 * Get hero image URL with fallback to placeholder
 * @param {string} imageUrl - Hero image URL
 * @param {number} width - Desired image width
 * @param {number} height - Desired image height
 * @returns {string} Image URL
 */
export const getHeroImageUrl = (imageUrl, width = 600, height = 400) => {
  if (imageUrl && imageUrl !== null && imageUrl !== "") {
    return imageUrl;
  }

  return getPlaceholderUrl(
    width,
    height,
    "Urban Fashion",
    "4A90A7", // Urban Echo blue
    "F7F7F7" // Light text
  );
};

/**
 * Brand-specific placeholder configurations
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
 * Get a branded placeholder for different content types
 * @param {string} type - Type of placeholder (product, hero, category)
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Custom text
 * @returns {string} Placeholder URL
 */
export const getBrandedPlaceholder = (type = "product", width = 400, height = 400, text = null) => {
  const config = PLACEHOLDER_CONFIGS[type] || PLACEHOLDER_CONFIGS.product;
  const displayText = text || config.defaultText;

  return getPlaceholderUrl(width, height, displayText, config.bgColor, config.textColor);
};
