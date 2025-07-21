/**
 * @fileoverview Presentational component for shop landing page layout with category grid and product sections
 * Handles responsive layout with category cards, promotional banners, inspiration grid, and product recommendations
 * Provides comprehensive shopping experience with visual category navigation and curated product discovery
 * Integrates branded placeholder generation for consistent visual identity when images are unavailable
 */

import PropTypes from "prop-types";

import Error from "@design-system/feedback/Error";
import Loading from "@design-system/feedback/Loading";

/**
 * View component for rendering shop landing page with category navigation and product sections
 * @component
 * @param {React.ComponentType} Button - Button component for call-to-action elements
 * @param {React.ComponentType} Link - Next.js Link component for navigation
 * @param {Array<Object>} categories - Product categories with images and descriptions for navigation
 * @param {string|null} error - Error message if data loading fails
 * @param {Array<Object>} featuredProducts - Featured products for recommendations section
 * @param {boolean} isLoading - Loading state indicator for data fetching
 * @param {Array<Object>} newArrivals - New arrival products for inspiration section
 * @param {Object} styles - CSS module styles object for component styling
 * @returns {JSX.Element} Rendered shop landing page with comprehensive e-commerce layout
 */
const ShopLandingView = ({
  Button,
  Link,
  categories,
  error,
  featuredProducts,
  getImageUrl,
  isLoading,
  newArrivals,
  styles,
}) => {
  if (isLoading) return <Loading message="Loading your shopping experience" title="Shop" />;
  if (error) return <Error message={error} title="Shop" variant="section" />;

  return (
    <div className={styles["shop-landing"]}>
      <section className={styles.header}>
        <div className={styles["header-content"]}>
          <h1 className={styles.title}>Shop Urban Echo</h1>
          <p className={styles.subtitle}>
            Discover our complete collection of premium fashion. Find your style across our
            carefully curated categories.
          </p>
        </div>
      </section>

      <section className={styles["categories-section"]}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] gap-4 sm:grid-cols-[repeat(auto-fit,minmax(9.375rem,1fr))] sm:gap-4">
          {categories.slice(1).map(category => (
            <Link
              key={category._id || category.id}
              className={styles["category-link"]}
              href={`/shop/${category.slug || category.id}`}>
              <div className={styles["category-card"]}>
                <div
                  className={styles["category-image"]}
                  style={{
                    backgroundImage: `url(${getImageUrl(category, "category", 500, 300)})`,
                  }}
                />
                <div className={styles["category-content"]}>
                  <h3 className={styles["category-name"]}>{category.name}</h3>
                  <p className={styles["category-description"]}>{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles["sales-section"]}>
        <div className="grid grid-cols-1 gap-4">
          <div className={styles["main-sale-banner"]}>
            <div className={styles["banner-content"]}>
              <h2 className={styles["banner-title"]}>Ongoing SALE. Up to 50% OFF.</h2>
              <p className={styles["banner-subtitle"]}>
                Limited time offer on selected items. Don&lsquo;t miss out!
              </p>
              <Link href="/shop/sale">
                <Button size="lg" variant="secondary">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col-1 gap-4 sm:flex-col">
            <div className={styles["secondary-offer"]}>
              <h3 className={styles["offer-title"]}>Other Offer</h3>
              <p className={styles["offer-text"]}>Free shipping on orders over $75</p>
              <Link href="/shop/all">
                <Button size="md" variant="primary">
                  Shop Now
                </Button>
              </Link>
            </div>

            <div className={styles["bestsellers-offer"]}>
              <h3 className={styles["offer-title"]}>Bestselling Products</h3>
              <p className={styles["offer-text"]}>Customer favorites flying off the shelves</p>
              <Link href="/shop/bestsellers">
                <Button size="md" variant="primary">
                  Explore
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles["inspiration-section"]}>
        <div className={styles["section-header"]}>
          <h2 className={styles["section-title"]}>Inspiration</h2>
          <p className={styles["section-description"]}>
            Get inspired by our curated style guides and outfit ideas. Discover new ways to express
            your unique personality through fashion.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(15.625rem,1fr))] gap-4 sm:grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] sm:gap-4">
          {newArrivals.slice(0, 6).map(item => (
            <div key={item._id || item.id} className={styles["inspiration-card"]}>
              <div
                className={styles["inspiration-image"]}
                style={{
                  backgroundImage: `url(${getImageUrl(item, "product", 400, 300)})`,
                }}
              />
              <div className={styles["inspiration-content"]}>
                <h3 className={styles["inspiration-title"]}>{item.name}</h3>
                <p className={styles["inspiration-description"]}>
                  {item.description || "Discover this amazing piece"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles["recommended-section"]}>
        <div className={styles["section-header"]}>
          <h2 className={styles["section-title"]}>Recommended Products</h2>
          <p className={styles["section-description"]}>
            Hand-picked selections based on current trends and customer favorites. These pieces are
            perfect for building a versatile wardrobe.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(12.5rem,1fr))] gap-4 sm:grid-cols-[repeat(auto-fit,minmax(9.375rem,1fr))] sm:gap-4">
          {featuredProducts.map(product => (
            <Link
              key={product._id || product.id}
              className={styles["product-link"]}
              href={`/shop/${product.category}/${product.slug}/${product._id || product.id}`}>
              <div className={styles["product-card"]}>
                <div
                  className={styles["product-image"]}
                  style={{
                    backgroundImage: `url(${getImageUrl(product, "product", 300, 300)})`,
                  }}
                />
                <div className={styles["product-content"]}>
                  <h3 className={styles["product-name"]}>{product.name}</h3>
                  <div className={styles["product-pricing"]}>
                    <span className={styles["current-price"]}>${product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className={styles["original-price"]}>${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles["view-all-container"]}>
          <Link href="/shop/all">
            <Button size="lg" variant="outline">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ShopLandingView;

ShopLandingView.displayName = "ShopLandingView";
ShopLandingView.propTypes = {
  Button: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
      image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          alt: PropTypes.string,
          url: PropTypes.string.isRequired,
        }),
      ]),
      imageUrl: PropTypes.string,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.string,
  featuredProducts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
      image: PropTypes.string,
      images: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            alt: PropTypes.string,
            url: PropTypes.string.isRequired,
          }),
        ])
      ),
      name: PropTypes.string.isRequired,
      originalPrice: PropTypes.number,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  getImageUrl: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  newArrivals: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
      image: PropTypes.string,
      images: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            alt: PropTypes.string,
            url: PropTypes.string.isRequired,
          }),
        ])
      ),
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  styles: PropTypes.objectOf(PropTypes.string).isRequired,
};
