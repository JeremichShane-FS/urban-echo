/**
 * @fileoverview Featured products display component for showcasing highlighted merchandise
 * Integrates with product data hooks to fetch and display curated product selections on homepage and landing pages
 * Provides loading states, error handling, and responsive grid layout for optimal product presentation
 */

"use client";
import ProductCard from "@design-system/data-display/ProductCard";
import { useFeaturedProducts } from "@modules/product/hooks";

import FeaturedProductsView from "./FeaturedProductsView";

import styles from "./FeaturedProducts.module.scss";

/**
 * Container component for displaying featured products with data fetching and state management
 * @component
 * @returns {JSX.Element} Rendered featured products section with loading and error states
 */
const FeaturedProducts = () => {
  const { data, error, isLoading, onProductClick } = useFeaturedProducts();

  return (
    <FeaturedProductsView
      featuredProducts={data || []}
      isLoading={isLoading}
      error={error?.message || null}
      styles={styles}
      ProductCard={ProductCard}
      onProductClick={onProductClick}
    />
  );
};

export default FeaturedProducts;

FeaturedProducts.displayName = "FeaturedProducts";
FeaturedProducts.View = FeaturedProductsView;
FeaturedProducts.useFeaturedProducts = useFeaturedProducts;
