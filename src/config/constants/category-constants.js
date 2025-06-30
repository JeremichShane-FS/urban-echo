/**
 * Product category and taxonomy constants
 * src/config/constants/category-constants.js
 */

import ROUTES from "@config/routes";

// Main product categories
export const PRODUCT_CATEGORIES = [
  { id: "men", name: "Men", path: ROUTES.MEN },
  { id: "women", name: "Women", path: ROUTES.WOMEN },
  { id: "accessories", name: "Accessories", path: ROUTES.ACCESSORIES },
  { id: "sale", name: "Sale", path: ROUTES.SALE, highlight: true },
];

// Subcategories
export const MEN_SUBCATEGORIES = [
  { id: "tshirts", name: "T-Shirts", path: `${ROUTES.MEN}/tshirts` },
  { id: "shirts", name: "Shirts", path: `${ROUTES.MEN}/shirts` },
  { id: "jeans", name: "Jeans", path: `${ROUTES.MEN}/jeans` },
  { id: "pants", name: "Pants", path: `${ROUTES.MEN}/pants` },
  { id: "shorts", name: "Shorts", path: `${ROUTES.MEN}/shorts` },
  { id: "jackets", name: "Jackets & Coats", path: `${ROUTES.MEN}/jackets` },
  { id: "hoodies", name: "Hoodies & Sweatshirts", path: `${ROUTES.MEN}/hoodies` },
  { id: "sneakers", name: "Sneakers", path: `${ROUTES.MEN}/sneakers` },
  { id: "footwear", name: "Footwear", path: `${ROUTES.MEN}/footwear` },
];

export const WOMEN_SUBCATEGORIES = [
  { id: "tops", name: "Tops", path: `${ROUTES.WOMEN}/tops` },
  { id: "tshirts", name: "T-Shirts", path: `${ROUTES.WOMEN}/tshirts` },
  { id: "blouses", name: "Blouses & Shirts", path: `${ROUTES.WOMEN}/blouses` },
  { id: "dresses", name: "Dresses", path: `${ROUTES.WOMEN}/dresses` },
  { id: "jeans", name: "Jeans", path: `${ROUTES.WOMEN}/jeans` },
  { id: "pants", name: "Pants", path: `${ROUTES.WOMEN}/pants` },
  { id: "skirts", name: "Skirts", path: `${ROUTES.WOMEN}/skirts` },
  { id: "jackets", name: "Jackets & Coats", path: `${ROUTES.WOMEN}/jackets` },
  { id: "hoodies", name: "Hoodies & Sweatshirts", path: `${ROUTES.WOMEN}/hoodies` },
  { id: "shoes", name: "Shoes", path: `${ROUTES.WOMEN}/shoes` },
];

export const ACCESSORIES_SUBCATEGORIES = [
  { id: "bags", name: "Bags", path: `${ROUTES.ACCESSORIES}/bags` },
  { id: "hats", name: "Hats & Caps", path: `${ROUTES.ACCESSORIES}/hats` },
  { id: "belts", name: "Belts", path: `${ROUTES.ACCESSORIES}/belts` },
  { id: "jewelry", name: "Jewelry", path: `${ROUTES.ACCESSORIES}/jewelry` },
  { id: "sunglasses", name: "Sunglasses", path: `${ROUTES.ACCESSORIES}/sunglasses` },
  { id: "watches", name: "Watches", path: `${ROUTES.ACCESSORIES}/watches` },
  { id: "scarves", name: "Scarves", path: `${ROUTES.ACCESSORIES}/scarves` },
  { id: "socks", name: "Socks", path: `${ROUTES.ACCESSORIES}/socks` },
];

// Collection types
export const COLLECTION_TYPES = [
  { id: "new-arrivals", name: "New Arrivals", path: ROUTES.NEW_ARRIVALS },
  { id: "best-sellers", name: "Best Sellers", path: "/shop/best-sellers" },
  { id: "trending", name: "Trending Now", path: "/shop/trending" },
  { id: "limited-edition", name: "Limited Edition", path: "/shop/limited-edition" },
  { id: "sustainable", name: "Eco-Friendly", path: "/shop/sustainable" },
];

// Product tags
export const PRODUCT_TAGS = [
  "new",
  "sale",
  "bestseller",
  "trending",
  "limited",
  "sustainable",
  "organic",
  "vegan",
  "exclusive",
  "recycled",
  "handmade",
];

// Seasonal collections
export const SEASONAL_COLLECTIONS = [
  { id: "spring", name: "Spring Collection", path: "/collections/spring" },
  { id: "summer", name: "Summer Essentials", path: "/collections/summer" },
  { id: "fall", name: "Fall Fashion", path: "/collections/fall" },
  { id: "winter", name: "Winter Wardrobe", path: "/collections/winter" },
  { id: "holiday", name: "Holiday Edit", path: "/collections/holiday" },
];

// Category to subcategory mapping
export const CATEGORY_SUBCATEGORY_MAP = {
  men: MEN_SUBCATEGORIES,
  women: WOMEN_SUBCATEGORIES,
  accessories: ACCESSORIES_SUBCATEGORIES,
};
