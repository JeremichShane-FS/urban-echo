/**
 * @fileoverview Simplified useProductPage hook for category/slug/id URL structure
 * No legacy format handling - designed specifically for new URL pattern
 */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { CACHE_DURATION, MAX_QUANTITY_PER_ITEM } from "@config/constants";
import { queryKeys } from "@modules/core/providers";
import { useCartActions } from "@modules/core/stores";
import { renderStars } from "@modules/core/utils";
import { generateProductBreadcrumbs } from "@modules/core/utils";
import { getProduct, getRelatedProducts } from "@modules/products/services";

/**
 * Hook for managing product page state with category/slug/id URL structure
 * @hook
 * @param {Object} params - Parameters from URL
 * @param {string} params.productId - Product ID for database lookup
 * @param {string} params.category - Category context from URL
 * @param {string} params.slug - Slug context from URL (reserved for future use)
 * @returns {Object} Product page state and handlers
 */
const useProductPage = params => {
  const router = useRouter();
  const { addItem: addToCart } = useCartActions();

  // Stabilize params to prevent re-renders (keep only what's necessary)
  const { category, productId } = params;

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    data: product,
    error: productError,
    isLoading: productLoading,
  } = useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: () => getProduct(productId),
    staleTime: CACHE_DURATION.medium,
    gcTime: CACHE_DURATION.long,
    enabled: !!productId,
    retry: 3,
  });

  const breadcrumbItems = useMemo(() => {
    if (!product) return [];
    return generateProductBreadcrumbs(product, category);
  }, [product, category]);

  // Related products - MINIMAL version to prevent infinite loop
  const { data: relatedProducts } = useQuery({
    queryKey: ["related-products-simple", productId], // Simple, stable key
    queryFn: () => getRelatedProducts(productId, { limit: 5 }),
    staleTime: Infinity, // Never refetch automatically
    gcTime: Infinity, // Keep in cache forever
    enabled: !!productId, // Only enable when productId exists
    retry: 0, // Never retry
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  // Computed values
  const isLoading = productLoading; // Don't block main loading on related products
  const error = productError?.message || null;

  const currentPrice = useMemo(() => {
    if (selectedVariant) return selectedVariant.price;
    return product?.price || 0;
  }, [selectedVariant, product]);

  const originalPrice = useMemo(() => {
    if (selectedVariant) return selectedVariant.originalPrice;
    return product?.originalPrice || 0;
  }, [selectedVariant, product]);

  const isOnSale = originalPrice > currentPrice;
  const discountPercentage = isOnSale
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const availableSizes = useMemo(() => {
    return product?.sizes || [];
  }, [product]);

  const availableColors = useMemo(() => {
    return product?.colors || [];
  }, [product]);

  const availableVariants = useMemo(() => {
    return product?.variants || [];
  }, [product]);

  const productImages = useMemo(() => {
    if (selectedVariant?.images) return selectedVariant.images;
    return product?.images || [];
  }, [selectedVariant, product]);

  const averageRating = useMemo(() => {
    if (!product?.reviewCount) return 0;
    const calculated = 3.5 + product.reviewCount / 200;
    return Math.min(5.0, Math.round(calculated * 10) / 10);
  }, [product]);

  const canAddToCart = selectedSize && selectedColor && quantity > 0 && product?.inStock;

  // Event handlers - Simplified without useCallback overuse
  const updateSelectedVariant = (size, color) => {
    if (!size || !color || !availableVariants.length) {
      setSelectedVariant(null);
      return;
    }
    const variant = availableVariants.find(v => v.size === size && v.color === color);
    setSelectedVariant(variant || null);
  };

  const handleSizeSelect = size => {
    setSelectedSize(size);
    updateSelectedVariant(size, selectedColor);
  };

  const handleColorSelect = color => {
    setSelectedColor(color);
    updateSelectedVariant(selectedSize, color);
  };

  const handleQuantityChange = newQuantity => {
    const maxQuantity = product?.stockQuantity || MAX_QUANTITY_PER_ITEM;
    setQuantity(Math.max(1, Math.min(newQuantity, maxQuantity)));
  };

  const handleImageSelect = index => {
    setActiveImageIndex(index);
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
    setSuccessMessage("");
  };

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      originalPrice: originalPrice,
      image: productImages[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      slug: product.slug,
      category: category,
    };

    addToCart(cartItem);
    setSuccessMessage(`${product.name} added to cart!`);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
      setSuccessMessage("");
    }, 3000);
  };

  const handleWishlistToggle = () => {
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);

    const message = newWishlistState
      ? `💖 ${product.name} added to wishlist!`
      : `${product.name} removed from wishlist`;

    setSuccessMessage(message);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
      setSuccessMessage("");
    }, 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  // Return object - Simple and clean
  return {
    // Data
    product,
    relatedProducts: relatedProducts || [],
    reviews: [],
    productImages,
    breadcrumbItems,

    // State
    selectedVariant,
    selectedSize,
    selectedColor,
    quantity,
    activeImageIndex,
    isWishlisted,
    showSuccessMessage,
    successMessage,

    // Computed
    currentPrice,
    originalPrice,
    isOnSale,
    discountPercentage,
    availableSizes,
    availableColors,
    canAddToCart,
    isLoading,
    error,
    averageRating,

    // Handlers
    handleSizeSelect,
    handleColorSelect,
    handleQuantityChange,
    handleImageSelect,
    handleAddToCart,
    handleWishlistToggle,
    handleBuyNow,
    handleCloseSuccessMessage,
    renderStars,
  };
};

export default useProductPage;
