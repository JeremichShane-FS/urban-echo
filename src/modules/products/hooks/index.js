/**
 * @fileoverview Barrel export file for product-related custom hooks
 * Provides unified access to product data hooks for listings, details, filtering, and user interactions
 * Simplifies import statements across components and maintains clean project architecture
 * Centralizes advanced React hooks for product data management across the Urban Echo application
 *
 * @example - Instead of multiple imports:
 * import { useFeaturedProducts } from '@modules/product/hooks/useFeaturedProducts';
 * import { useNewArrivals } from '@modules/product/hooks/useNewArrivals';
 *
 * You can now import from a single location:
 * import { useFeaturedProducts, useNewArrivals } from '@modules/product/hooks';
 */

// Product Data Management Hooks
export { useFeaturedProducts } from "./useFeaturedProducts";
export { useNewArrivals } from "./useNewArrivals";
