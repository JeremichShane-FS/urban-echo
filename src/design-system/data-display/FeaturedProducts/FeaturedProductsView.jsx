"use client";

import ProductCard from "@/design-system/data-display/ProductCard/ProductCardView";

import styles from "./FeaturedProducts.module.scss";

const FeaturedProductsView = ({ error, featuredProducts, isLoading, onProductClick }) => {
  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Featured Products</h2>
          <div className={styles.loading}>Loading featured products...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Featured Products</h2>
          <div className={styles.error}>{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
              className={styles.card}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsView;
