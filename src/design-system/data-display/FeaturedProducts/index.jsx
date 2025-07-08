"use client";
import ProductCard from "@design-system/data-display/ProductCard";
import { useFeaturedProducts } from "@modules/product/hooks";

import FeaturedProductsView from "./FeaturedProductsView";

import styles from "./FeaturedProducts.module.scss";

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
