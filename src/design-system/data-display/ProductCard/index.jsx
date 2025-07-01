import PropTypes from "prop-types";

import ProductCardView from "./ProductCardView";
import { useProductCard } from "./useProductCard";

<<<<<<< HEAD
const ProductCard = ({
  className = "",
  onClick,
  product,
  showDescription,
  showNewBadge = false,
}) => {
=======
const ProductCard = ({ className = "", onClick, product, showNewBadge = false }) => {
>>>>>>> origin/main
  const { handleProductClick } = useProductCard({ onClick, product });

  return (
    <ProductCardView
      className={className}
      product={product}
      showNewBadge={showNewBadge}
<<<<<<< HEAD
      showDescription={showDescription}
=======
>>>>>>> origin/main
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
<<<<<<< HEAD
  showDescription: PropTypes.bool,
=======
>>>>>>> origin/main
  showNewBadge: PropTypes.bool,
};
