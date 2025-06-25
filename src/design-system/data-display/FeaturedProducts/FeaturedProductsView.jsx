"use client";

import PropTypes from "prop-types";

import ProductCard from "@design-system/data-display/ProductCard";

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
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className={`${styles.card} ${index === 3 ? "lg:col-start-2 xl:col-start-auto" : ""}`}
              onClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsView;

FeaturedProductsView.displayName = "FeaturedProductsView";
FeaturedProductsView.propTypes = {
  error: PropTypes.string,
  featuredProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      image: PropTypes.string,
      category: PropTypes.string,
      isNew: PropTypes.bool,
      inStock: PropTypes.bool.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onProductClick: PropTypes.func.isRequired,
};
