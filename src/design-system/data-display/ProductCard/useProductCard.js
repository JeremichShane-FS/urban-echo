import { useCallback } from "react";
import PropTypes from "prop-types";

export const useProductCard = ({ onClick, product }) => {
  const handleProductClick = useCallback(() => {
    if (onClick) {
      // Track product click for analytics
      onClick(product.id, product.name);
    }
  }, [onClick, product.id, product.name]);

  return {
    handleProductClick,
  };
};

useProductCard.propTypes = {
  onClick: PropTypes.func,
  product: PropTypes.object.isRequired,
};
