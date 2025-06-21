/**
 * @fileoverview This file contains constants related to product display, sorting, filtering, and other product-related configurations.
 * It serves as a centralized location for managing all product-related constants used in the application.
 */

import { DEFAULT_IMAGES } from "./media-constants";

// Product display
export const PRODUCTS_PER_PAGE = 12;
export const RELATED_PRODUCTS_COUNT = 4;
export const FEATURED_PRODUCTS_COUNT = 8;

// Items per row in grid view
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

// Product sorting options
export const PRODUCT_SORT_OPTIONS = [
  { id: "newest", label: "Newest Arrivals" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "bestselling", label: "Best Selling" },
  { id: "rating", label: "Customer Rating" },
];

// Product filter types
export const FILTER_TYPES = {
  PRICE_RANGE: "price-range",
  COLOR: "color",
  SIZE: "size",
  BRAND: "brand",
  CATEGORY: "category",
  TAG: "tag",
  RATING: "rating",
};

// Available colors with hex codes
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

// Size guides
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

// Product statuses
export const PRODUCT_STATUS = {
  IN_STOCK: "in_stock",
  LOW_STOCK: "low_stock",
  OUT_OF_STOCK: "out_of_stock",
  BACK_ORDER: "back_order",
  DISCONTINUED: "discontinued",
  COMING_SOON: "coming_soon",
};

// Inventory thresholds
export const LOW_STOCK_THRESHOLD = 5;

// Product reviews
export const RATING_SCALE = 5; // 5-star rating system
export const REVIEW_CHAR_LIMIT = 1000;
export const MIN_REVIEW_LENGTH = 10;

// Default product image (placeholder)
export const DEFAULT_PRODUCT_IMAGE = DEFAULT_IMAGES.productPlaceholder;

// Wishlist
export const MAX_WISHLIST_ITEMS = 50;
