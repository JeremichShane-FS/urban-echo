"use client";

import ProductCard from "@/design-system/data-display/ProductCard/ProductCardView";

import styles from "./FeaturedProducts.module.scss";

const FeaturedProductsView = ({ error, featuredProducts, isLoading, onProductClick }) => {
  if (isLoading) {
    return (
      <section className={styles.featuredProducts}>
        <div className={styles.container}>
          <h2 className={styles.title}>Featured Products</h2>
          <div className={styles.loading}>Loading featured products...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.featuredProducts}>
        <div className={styles.container}>
          <h2 className={styles.title}>Featured Products</h2>
          <div className={styles.error}>{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.container}>
        <h2 className={styles.title}>Featured Products</h2>
        <div className={styles.productsGrid}>
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
              className={styles.featuredProductCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsView;
