/**
 * @fileoverview Barrel export file for product service modules and API integration
 * Provides unified access to product data services across the Urban Echo application
 * Simplifies import statements across services with centralized exports
 * Includes services for product listings, details, search, filtering, and recommendations
 *
 * @example
 * Instead of multiple imports:
 * import { featuredProductsService } from './featured-products';
 * import { newArrivalsService } from './new-arrivals';
 * import { productSearchService } from './product-search';
 * import { categoriesService } from './categories';
 *
 * You can now import from a single location:
 * import { featuredProductsService, newArrivalsService, productSearchService, categoriesService } from '@modules/product/services';
 */

// Best Seller Services
export { default as bestSellersService, getBestSellers } from "./best-sellers";

// Category Services
export { default as categoriesService, getCategories, getCategoryProducts } from "./categories";

// Featured Products Services
export { default as featuredProductsService, getFeaturedProducts } from "./featured-products";

// New Arrivals Services
export { getNewArrivals, default as newArrivalsService } from "./new-arrivals";

// Product Catalog Services
export { getProducts, default as productCatalogService } from "./product-catalog";

// Product Details Services
export { getProduct, default as productDetailsService } from "./product-details";

// Related Products Services
export { getRelatedProducts, default as relatedProductsService } from "./product-related";

// Product Search Services
export { default as productSearchService, searchProducts } from "./product-search";
