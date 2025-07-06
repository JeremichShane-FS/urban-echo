import Link from "next/link";
import PropTypes from "prop-types";

import { BUTTON_SIZES, BUTTON_VARIANTS, ROUTES } from "@config/constants";
import { Button } from "@design-system/buttons";
import ProductCard from "@design-system/data-display/ProductCard";

import styles from "./NewArrivals.module.scss";

const NewArrivalsView = ({ error, loading, newArrivals, onProductClick, onViewAllClick }) => {
  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>New Arrivals</h2>
            <p className={styles.subtitle}>
              Discover our latest collection of trendy and modern clothing pieces
            </p>
          </div>
          <div className={styles.loading}>Loading new arrivals...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>New Arrivals</h2>
            <p className={styles.subtitle}>
              Discover our latest collection of trendy and modern clothing pieces
            </p>
          </div>
          <div className={styles.error}>{error}</div>
        </div>
      </section>
    );
  }

  const products = Array.isArray(newArrivals) ? newArrivals : [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>New Arrivals</h2>
          <p className={styles.subtitle}>
            Discover our latest collection of trendy and modern clothing pieces
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 auto-rows-max gap-4 md:gap-6 lg:gap-8 mt-8">
          {products.slice(0, 8).map((product, index) => {
            if (!product || !product.id || !product.name || !product.price || !product.slug) {
              console.warn("Invalid product data:", product);
              return null;
            }

            if (index === 7) {
              return (
                <div key={product.id} className="lg:hidden">
                  <ProductCard
                    product={product}
                    showDescription={false}
                    showNewBadge={true}
                    onClick={onProductClick}
                  />
                </div>
              );
            }

            return (
              <div key={product.id} className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}>
                <ProductCard
                  product={product}
                  showDescription={index === 0}
                  showNewBadge={true}
                  onClick={onProductClick}
                />
              </div>
            );
          })}
        </div>

        <div className={styles.cta}>
          <Button
            variant={BUTTON_VARIANTS["outline-accent"]}
            size={BUTTON_SIZES.lg}
            as={Link}
            href={ROUTES.SHOP}
            onClick={onViewAllClick}>
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsView;

NewArrivalsView.displayName = "NewArrivalsView";
NewArrivalsView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  newArrivals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      isNew: PropTypes.bool,
    })
  ).isRequired,
  onProductClick: PropTypes.func.isRequired,
  onViewAllClick: PropTypes.func.isRequired,
};
