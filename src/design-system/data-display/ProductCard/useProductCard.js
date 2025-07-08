import { useCallback } from "react";

export const useProductCard = ({ onClick, product }) => {
  const handleProductClick = useCallback(() => {
    if (onClick) {
      onClick(product.id, product.name);
    }
  }, [onClick, product.id, product.name]);

  return {
    handleProductClick,
  };
};
