import PropTypes from "prop-types";

const FeaturedProductsView = ({
  ProductCard,
  error,
  featuredProducts,
  isLoading,
  onProductClick,
  styles,
}) => {
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
  ProductCard: PropTypes.elementType.isRequired,
  error: PropTypes.string,
  featuredProducts: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      id: PropTypes.string.isRequired,
      image: PropTypes.string,
      inStock: PropTypes.bool.isRequired,
      isNew: PropTypes.bool,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onProductClick: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};
