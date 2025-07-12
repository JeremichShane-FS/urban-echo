/**
 * @fileoverview Product management constants for display, filtering, sorting, and inventory configurations
 * Defines comprehensive product catalog settings including pagination, grid layouts, color systems, and sizing
 * Supports product status management, review systems, and wishlist functionality across the e-commerce platform
 */

import { DEFAULT_IMAGES } from "./media-constants";

// =================================================================
// PRODUCT DISPLAY CONFIGURATION
// =================================================================

/**
 * Product listing and pagination configuration
 * @constant {number} PRODUCTS_PER_PAGE - Default products shown per page in listings
 * @constant {number} RELATED_PRODUCTS_COUNT - Number of related products to display
 * @constant {number} FEATURED_PRODUCTS_COUNT - Number of featured products on homepage
 */
export const PRODUCTS_PER_PAGE = 12;
export const RELATED_PRODUCTS_COUNT = 4;
export const FEATURED_PRODUCTS_COUNT = 8;

/**
 * Product grid layout configuration for responsive design
 * @constant {Object} GRID_VIEW_BREAKPOINTS - Products per row at different screen sizes
 * @constant {Object} PRODUCT_LIST_VIEWS - Available product display modes
 * @constant {string} DEFAULT_PRODUCT_VIEW - Default product listing view mode
 *
 * @example
 * // Responsive product grid component
 * const ProductGrid = ({ products, viewMode = DEFAULT_PRODUCT_VIEW }) => {
 *   const getGridClasses = () => {
 *     if (viewMode === PRODUCT_LIST_VIEWS.GRID) {
 *       return `grid grid-cols-${GRID_VIEW_BREAKPOINTS.sm} md:grid-cols-${GRID_VIEW_BREAKPOINTS.md} lg:grid-cols-${GRID_VIEW_BREAKPOINTS.lg}`;
 *     }
 *     return 'flex flex-col space-y-4';
 *   };
 *
 *   return (
 *     <div className={getGridClasses()}>
 *       {products.map(product => (
 *         <ProductCard key={product.id} product={product} viewMode={viewMode} />
 *       ))}
 *     </div>
 *   );
 * };
 */
export const GRID_VIEW_BREAKPOINTS = {
  sm: 2,
  md: 3,
  lg: 4,
};

export const PRODUCT_LIST_VIEWS = {
  GRID: "grid",
  LIST: "list",
};

export const DEFAULT_PRODUCT_VIEW = PRODUCT_LIST_VIEWS.GRID;

// =================================================================
// PRODUCT SORTING AND FILTERING
// =================================================================

/**
 * Product sorting options for catalog organization
 * @constant {Array<Object>} PRODUCT_SORT_OPTIONS - Available sorting methods
 *
 * @example
 * // Sort dropdown component
 * const SortDropdown = ({ currentSort, onSortChange }) => (
 *   <select value={currentSort} onChange={(e) => onSortChange(e.target.value)}>
 *     {PRODUCT_SORT_OPTIONS.map(option => (
 *       <option key={option.id} value={option.id}>
 *         {option.label}
 *       </option>
 *     ))}
 *   </select>
 * );
 *
 * @example
 * // Apply sorting to product list
 * const sortProducts = (products, sortBy) => {
 *   const sortOption = PRODUCT_SORT_OPTIONS.find(opt => opt.id === sortBy);
 *   if (!sortOption) return products;
 *
 *   return [...products].sort((a, b) => {
 *     switch (sortBy) {
 *       case 'price-asc':
 *         return a.price - b.price;
 *       case 'price-desc':
 *         return b.price - a.price;
 *       case 'newest':
 *         return new Date(b.createdAt) - new Date(a.createdAt);
 *       default:
 *         return 0;
 *     }
 *   });
 * };
 */
export const PRODUCT_SORT_OPTIONS = [
  { id: "newest", label: "Newest Arrivals" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "bestselling", label: "Best Selling" },
  { id: "rating", label: "Customer Rating" },
];

/**
 * Product filter type identifiers for advanced filtering
 * @constant {Object} FILTER_TYPES - Available product filter categories
 *
 * @example
 * // Build filter UI dynamically
 * const ProductFilters = ({ filters, onFilterChange }) => (
 *   <div className="filters">
 *     {Object.values(FILTER_TYPES).map(filterType => (
 *       <FilterSection
 *         key={filterType}
 *         type={filterType}
 *         values={filters[filterType]}
 *         onChange={(values) => onFilterChange(filterType, values)}
 *       />
 *     ))}
 *   </div>
 * );
 */
export const FILTER_TYPES = {
  PRICE_RANGE: "price-range",
  COLOR: "color",
  SIZE: "size",
  BRAND: "brand",
  CATEGORY: "category",
  TAG: "tag",
  RATING: "rating",
};

// =================================================================
// PRODUCT COLOR SYSTEM
// =================================================================

/**
 * Product color palette with hex codes for consistent color representation
 * @constant {Array<Object>} PRODUCT_COLORS - Available product color options
 *
 * @example
 * // Color swatch component
 * const ColorSwatch = ({ colorId, isSelected, onSelect }) => {
 *   const color = PRODUCT_COLORS.find(c => c.id === colorId);
 *   if (!color) return null;
 *
 *   return (
 *     <button
 *       className={`color-swatch ${isSelected ? 'selected' : ''}`}
 *       style={{ backgroundColor: color.hex }}
 *       onClick={() => onSelect(colorId)}
 *       aria-label={`Select ${color.name} color`}
 *       title={color.name}
 *     />
 *   );
 * };
 *
 * @example
 * // Color filter component
 * const ColorFilter = ({ selectedColors, onColorToggle }) => (
 *   <div className="color-filter">
 *     <h4>Color</h4>
 *     <div className="color-grid">
 *       {PRODUCT_COLORS.map(color => (
 *         <ColorSwatch
 *           key={color.id}
 *           colorId={color.id}
 *           isSelected={selectedColors.includes(color.id)}
 *           onSelect={onColorToggle}
 *         />
 *       ))}
 *     </div>
 *   </div>
 * );
 */
export const PRODUCT_COLORS = [
  { id: "black", name: "Black", hex: "#000000" },
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "gray", name: "Gray", hex: "#808080" },
  { id: "navy", name: "Navy", hex: "#000080" },
  { id: "blue", name: "Blue", hex: "#0000FF" },
  { id: "red", name: "Red", hex: "#FF0000" },
  { id: "green", name: "Green", hex: "#008000" },
  { id: "yellow", name: "Yellow", hex: "#FFFF00" },
  { id: "orange", name: "Orange", hex: "#FFA500" },
  { id: "purple", name: "Purple", hex: "#800080" },
  { id: "pink", name: "Pink", hex: "#FFC0CB" },
  { id: "brown", name: "Brown", hex: "#A52A2A" },
  { id: "beige", name: "Beige", hex: "#F5F5DC" },
  { id: "olive", name: "Olive", hex: "#808000" },
  { id: "teal", name: "Teal", hex: "#008080" },
];

// =================================================================
// SIZE GUIDE CONFIGURATION
// =================================================================

/**
 * Product sizing systems for clothing and footwear
 * @constant {Array<string>} CLOTHING_SIZES - Standard clothing size options
 * @constant {Array<string>} SHOE_SIZES_US - US shoe size system
 * @constant {Array<string>} SHOE_SIZES_EU - European shoe size system
 *
 * @example
 * // Size selector component
 * const SizeSelector = ({ productType, selectedSize, onSizeChange }) => {
 *   const getSizeOptions = () => {
 *     switch (productType) {
 *       case 'clothing':
 *         return CLOTHING_SIZES;
 *       case 'shoes-us':
 *         return SHOE_SIZES_US;
 *       case 'shoes-eu':
 *         return SHOE_SIZES_EU;
 *       default:
 *         return [];
 *     }
 *   };
 *
 *   return (
 *     <div className="size-selector">
 *       <h4>Size</h4>
 *       <div className="size-options">
 *         {getSizeOptions().map(size => (
 *           <button
 *             key={size}
 *             className={`size-option ${selectedSize === size ? 'selected' : ''}`}
 *             onClick={() => onSizeChange(size)}
 *           >
 *             {size}
 *           </button>
 *         ))}
 *       </div>
 *     </div>
 *   );
 * };
 */
export const CLOTHING_SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL"];
export const SHOE_SIZES_US = [
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "13",
];
export const SHOE_SIZES_EU = [
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
];

// =================================================================
// PRODUCT STATUS AND INVENTORY
// =================================================================

/**
 * Product availability and inventory status definitions
 * @constant {Object} PRODUCT_STATUS - Available product status options
 * @constant {number} LOW_STOCK_THRESHOLD - Inventory threshold for low stock warnings
 *
 * @example
 * // Product status badge component
 * const ProductStatusBadge = ({ status, stockLevel }) => {
 *   const getStatusInfo = () => {
 *     switch (status) {
 *       case PRODUCT_STATUS.IN_STOCK:
 *         return { text: 'In Stock', className: 'status-in-stock' };
 *       case PRODUCT_STATUS.LOW_STOCK:
 *         return { text: `Only ${stockLevel} left!`, className: 'status-low-stock' };
 *       case PRODUCT_STATUS.OUT_OF_STOCK:
 *         return { text: 'Out of Stock', className: 'status-out-of-stock' };
 *       case PRODUCT_STATUS.COMING_SOON:
 *         return { text: 'Coming Soon', className: 'status-coming-soon' };
 *       default:
 *         return { text: '', className: '' };
 *     }
 *   };
 *
 *   const statusInfo = getStatusInfo();
 *   return <span className={`status-badge ${statusInfo.className}`}>{statusInfo.text}</span>;
 * };
 */
export const PRODUCT_STATUS = {
  IN_STOCK: "in_stock",
  LOW_STOCK: "low_stock",
  OUT_OF_STOCK: "out_of_stock",
  BACK_ORDER: "back_order",
  DISCONTINUED: "discontinued",
  COMING_SOON: "coming_soon",
};

export const LOW_STOCK_THRESHOLD = 5;

// =================================================================
// REVIEW AND RATING SYSTEM
// =================================================================

/**
 * Product review and rating system configuration
 * @constant {number} RATING_SCALE - Maximum rating value (5-star system)
 * @constant {number} REVIEW_CHAR_LIMIT - Maximum characters allowed in reviews
 * @constant {number} MIN_REVIEW_LENGTH - Minimum characters required for reviews
 *
 * @example
 * // Star rating component
 * const StarRating = ({ rating, onRatingChange, readonly = false }) => {
 *   return (
 *     <div className="star-rating">
 *       {[...Array(RATING_SCALE)].map((_, index) => {
 *         const starValue = index + 1;
 *         return (
 *           <button
 *             key={index}
 *             type="button"
 *             className={`star ${starValue <= rating ? 'filled' : 'empty'}`}
 *             onClick={() => !readonly && onRatingChange(starValue)}
 *             disabled={readonly}
 *           >
 *             ★
 *           </button>
 *         );
 *       })}
 *     </div>
 *   );
 * };
 */
export const RATING_SCALE = 5; // 5-star rating system
export const REVIEW_CHAR_LIMIT = 1000;
export const MIN_REVIEW_LENGTH = 10;

// =================================================================
// PRODUCT ASSETS AND WISHLIST
// =================================================================

/**
 * Default product image and wishlist configuration
 * @constant {string} DEFAULT_PRODUCT_IMAGE - Fallback image for products without images
 * @constant {number} MAX_WISHLIST_ITEMS - Maximum items allowed in user wishlist
 */
export const DEFAULT_PRODUCT_IMAGE = DEFAULT_IMAGES.productPlaceholder;
export const MAX_WISHLIST_ITEMS = 50;
