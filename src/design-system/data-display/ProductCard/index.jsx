import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

import ProductCardView from "./ProductCardView";
import { useProductCard } from "./useProductCard";

import styles from "./ProductCard.module.scss";

const ProductCard = ({
  className = "",
  onClick,
  product,
  showDescription,
  showNewBadge = false,
}) => {
  const { handleProductClick } = useProductCard({ onClick, product });

  return (
    <ProductCardView
      className={className}
      product={product}
      showNewBadge={showNewBadge}
      showDescription={showDescription}
      styles={styles}
      Image={Image}
      Link={Link}
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
