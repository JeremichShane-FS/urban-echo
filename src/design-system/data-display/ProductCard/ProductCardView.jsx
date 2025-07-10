/**
 * @fileoverview Presentational component for displaying product cards in the Urban Echo design system
 * Provides flexible product display with image handling, status badges, and content configuration
 * Implements responsive design patterns and fallback handling for missing images
 * Supports various display options for different product listing contexts
 */

import PropTypes from "prop-types";

/**
 * Pure presentational component for rendering a product card with image, price, and details
 * @component
 * @param {Object} props - Component props
 * @param {React.ElementType} props.Image - Next.js Image component for optimized image rendering
 * @param {React.ElementType} props.Link - Next.js Link component for client-side navigation
 * @param {string} [props.className=""] - Additional CSS class for custom styling
 * @param {Function} [props.onClick] - Click handler for analytics tracking (renamed to handleClick internally)
 * @param {Object} props.product - Product data object
 * @param {string} [props.product.category] - Product category name
 * @param {string} [props.product.description] - Product description text
 * @param {string} props.product.id - Unique product identifier
 * @param {string} [props.product.image] - Product image URL
 * @param {boolean} props.product.inStock - Whether product is currently in stock
 * @param {boolean} [props.product.isNewArrival] - Whether product is flagged as new arrival
 * @param {string} props.product.name - Product display name
 * @param {number} props.product.price - Product price value
 * @param {string} props.product.slug - URL-friendly product identifier
 * @param {boolean} [props.showDescription] - Whether to display product description
 * @param {boolean} [props.showNewBadge=false] - Whether to display "New" badge for new arrivals
 * @param {Object} props.styles - CSS module styles object
 * @returns {JSX.Element} Rendered product card with appropriate styling and content
 */
const ProductCardView = ({
  Image,
  Link,
  className = "",
  onClick: handleClick,
  product,
  showDescription,
  showNewBadge = false,
  styles,
}) => {
  if (!product.image || product.image === "") {
    return (
      <div className={`${styles.card} ${className}`}>
        <Link className={styles.link} href={`/shop/product/${product.slug}`} onClick={handleClick}>
          <div className={styles.image}>
            <div className={styles.placeholder}>Image Coming Soon</div>

            {showNewBadge && product.isNewArrival && <div className={styles.badge}>New</div>}
            {!product.inStock && (
              <div className={`${styles.badge} ${styles["badge--out-of-stock"]}`}>Out of Stock</div>
            )}
          </div>
          <div className={styles.info}>
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.price}>${product.price}</p>
            {product.category && <p className={styles.category}>{product.category}</p>}
            {showDescription && product.description && (
              <p className={styles.description}>{product.description}</p>
            )}
          </div>
        </Link>
      </div>
    );
  }
  return (
    <div className={`${styles.card} ${className}`}>
      <Link className={styles.link} href={`/shop/product/${product.slug}`} onClick={handleClick}>
        <div className={styles.image}>
          <Image
            fill
            alt={product.name}
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            className={styles.img}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            src={product.image}
          />
          {showNewBadge && product.isNewArrival && <div className={styles.badge}>New</div>}
          {!product.inStock && (
            <div className={`${styles.badge} ${styles["badge--out-of-stock"]}`}>Out of Stock</div>
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>${product.price}</p>
          {product.category && <p className={styles.category}>{product.category}</p>}
          {showDescription && product.description && (
            <p className={styles.description}>{product.description}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCardView;

ProductCardView.displayName = "ProductCardView";
ProductCardView.propTypes = {
  Image: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  product: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    inStock: PropTypes.bool.isRequired,
    isNewArrival: PropTypes.bool,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  showDescription: PropTypes.bool,
  showNewBadge: PropTypes.bool,
  styles: PropTypes.object.isRequired,
};
