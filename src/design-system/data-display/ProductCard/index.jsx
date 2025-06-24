import PropTypes from "prop-types";

import ProductCardView from "./ProductCardView";
import { useProductCard } from "./useProductCard";

const ProductCard = ({ className = "", onClick, product, showNewBadge = false }) => {
  const { handleProductClick } = useProductCard({ onClick, product });

  return (
    <ProductCardView
      className={className}
      product={product}
      showNewBadge={showNewBadge}
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
  showNewBadge: PropTypes.bool,
};
