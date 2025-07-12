/**
 * @fileoverview Product card component for displaying individual product information in grid layouts
 * Provides standardized product presentation with configurable options for badges, descriptions, and interactions
 * Integrates with Next.js Image optimization and Link routing for performance and navigation
 */

import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

import ProductCardView from "./ProductCardView";
import useProductCard from "./useProductCard";

import styles from "./ProductCard.module.scss";

/**
 * Container component for product card with click handling and data management
 * @component
 * @param {string} [className=""] - Additional CSS classes for styling
 * @param {Function} onClick - Click handler for product interactions
 * @param {Object} product - Product data object containing all product information
 * @param {boolean} showDescription - Whether to display product description
 * @param {boolean} [showNewBadge=false] - Whether to show "New" badge for new products
 * @returns {JSX.Element} Rendered product card component
 */
const ProductCard = ({
  className = "",
  onClick,
  product,
  showDescription,
  showNewBadge = true,
}) => {
  const { handleProductClick } = useProductCard({ onClick, product });

  return (
    <ProductCardView
      Image={Image}
      Link={Link}
      className={className}
      product={product}
      showDescription={showDescription}
      showNewBadge={showNewBadge}
      styles={styles}
      onClick={handleProductClick}
    />
  );
};

export default ProductCard;

ProductCard.displayName = "ProductCard";
ProductCard.View = ProductCardView;
ProductCard.useProductCard = useProductCard;
ProductCard.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  product: PropTypes.object.isRequired,
  showDescription: PropTypes.bool,
  showNewBadge: PropTypes.bool,
};
