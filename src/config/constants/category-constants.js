/**
 * Product category and taxonomy constants
 */

// Main product categories
export const PRODUCT_CATEGORIES = [
  { id: "men", name: "Men", path: "/shop/men" },
  { id: "women", name: "Women", path: "/shop/women" },
  { id: "accessories", name: "Accessories", path: "/shop/accessories" },
  { id: "sale", name: "Sale", path: "/shop/sale", highlight: true },
];

// Subcategories
export const MEN_SUBCATEGORIES = [
  { id: "tshirts", name: "T-Shirts", path: "/shop/men/tshirts" },
  { id: "shirts", name: "Shirts", path: "/shop/men/shirts" },
  { id: "jeans", name: "Jeans", path: "/shop/men/jeans" },
  { id: "pants", name: "Pants", path: "/shop/men/pants" },
  { id: "shorts", name: "Shorts", path: "/shop/men/shorts" },
  { id: "jackets", name: "Jackets & Coats", path: "/shop/men/jackets" },
  { id: "hoodies", name: "Hoodies & Sweatshirts", path: "/shop/men/hoodies" },
  { id: "sneakers", name: "Sneakers", path: "/shop/men/sneakers" },
  { id: "footwear", name: "Footwear", path: "/shop/men/footwear" },
];

export const WOMEN_SUBCATEGORIES = [
  { id: "tops", name: "Tops", path: "/shop/women/tops" },
  { id: "tshirts", name: "T-Shirts", path: "/shop/women/tshirts" },
  { id: "blouses", name: "Blouses & Shirts", path: "/shop/women/blouses" },
  { id: "dresses", name: "Dresses", path: "/shop/women/dresses" },
  { id: "jeans", name: "Jeans", path: "/shop/women/jeans" },
  { id: "pants", name: "Pants", path: "/shop/women/pants" },
  { id: "skirts", name: "Skirts", path: "/shop/women/skirts" },
  { id: "jackets", name: "Jackets & Coats", path: "/shop/women/jackets" },
  { id: "hoodies", name: "Hoodies & Sweatshirts", path: "/shop/women/hoodies" },
  { id: "shoes", name: "Shoes", path: "/shop/women/shoes" },
];

export const ACCESSORIES_SUBCATEGORIES = [
  { id: "bags", name: "Bags", path: "/shop/accessories/bags" },
  { id: "hats", name: "Hats & Caps", path: "/shop/accessories/hats" },
  { id: "belts", name: "Belts", path: "/shop/accessories/belts" },
  { id: "jewelry", name: "Jewelry", path: "/shop/accessories/jewelry" },
  { id: "sunglasses", name: "Sunglasses", path: "/shop/accessories/sunglasses" },
  { id: "watches", name: "Watches", path: "/shop/accessories/watches" },
  { id: "scarves", name: "Scarves", path: "/shop/accessories/scarves" },
  { id: "socks", name: "Socks", path: "/shop/accessories/socks" },
];

// Collection types
export const COLLECTION_TYPES = [
  { id: "new-arrivals", name: "New Arrivals", path: "/shop/new" },
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
