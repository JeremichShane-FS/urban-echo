/**
 * @fileoverview Central barrel exports for data display components in Urban Echo design system
 * Provides unified access to product showcasing components and their associated views
 * Simplifies import statements across page components with centralized component access
 * Includes container components, view components, and custom hooks for data display needs
 *
 * @example - Instead of multiple imports:
 * import FeaturedProducts from '@design-system/data-display/FeaturedProducts';
 * import NewArrivals from '@design-system/data-display/NewArrivals';
 * import ProductCard from '@design-system/data-display/ProductCard';
 *
 * You can now import from a single location:
 * import { FeaturedProducts, NewArrivals, ProductCard } from '@design-system/data-display';
 *
 */

export { default as FeaturedProducts } from "./FeaturedProducts";
export { default as NewArrivals } from "./NewArrivals";
export { default as ProductCard } from "./ProductCard";
