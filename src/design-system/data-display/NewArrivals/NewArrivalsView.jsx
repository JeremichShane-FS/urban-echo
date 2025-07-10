/**
 * @fileoverview Presentational component for new arrivals grid layout with featured product display
 * Handles responsive grid rendering with special layout for featured items and new arrival badges
 * Provides loading states, error handling, and call-to-action integration for product discovery
 */

import PropTypes from "prop-types";

/**
 * View component for rendering new arrivals in a responsive grid with featured product layout
 * @component
 * @param {Object} BUTTON_SIZES - Button size constants for consistent styling
 * @param {Object} BUTTON_VARIANTS - Button variant constants for consistent styling
 * @param {React.ComponentType} Button - Button component for call-to-action elements
 * @param {React.ComponentType} Link - Link component for navigation
 * @param {React.ComponentType} ProductCard - Product card component for rendering individual products
 * @param {Object} ROUTES - Route constants for navigation paths
 * @param {string|null} error - Error message to display if product loading fails
 * @param {Object} filters - Product filtering options and current filter state
 * @param {boolean} loading - Loading state indicator for showing loading UI
 * @param {Array<Object>} newArrivals - Array of new arrival product objects to display
 * @param {Function} onProductClick - Click handler for product interactions
 * @param {Function} onViewAllClick - Click handler for view all products action
 * @param {Object} pagination - Pagination state and controls for product display
 * @param {Object} styles - CSS module styles object for component styling
 * @returns {JSX.Element} Rendered new arrivals section with responsive grid and featured layout
 */
const NewArrivalsView = ({
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  Button,
  Link,
  ProductCard,
  ROUTES,
  error,
  loading,
  newArrivals,
  onProductClick,
  onViewAllClick,
  styles,
}) => {
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
  BUTTON_SIZES: PropTypes.object.isRequired,
  BUTTON_VARIANTS: PropTypes.object.isRequired,
  Button: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  ProductCard: PropTypes.elementType.isRequired,
  ROUTES: PropTypes.object.isRequired,
  error: PropTypes.string,
  filters: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  newArrivals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      isNew: PropTypes.bool,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  onProductClick: PropTypes.func.isRequired,
  onViewAllClick: PropTypes.func.isRequired,
  pagination: PropTypes.object,
  styles: PropTypes.object.isRequired,
};
