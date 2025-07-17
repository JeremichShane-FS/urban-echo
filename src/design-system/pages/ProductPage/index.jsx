/**
 * @fileoverview Container component for product page that manages data fetching, state, and breadcrumb navigation
 * Connects the useProductPage hook with the ProductPageView presentation component
 * Handles loading states, error handling, data transformation, and breadcrumb generation
 */
"use client";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

import { Button } from "@design-system/buttons";
import Error from "@design-system/feedback/Error";
import Loading from "@design-system/feedback/Loading";

import ProductPageView from "./ProductPageView";
import useProductPage from "./useProductPage";

import styles from "./ProductPage.module.scss";

/**
 * Container component that manages product page state, breadcrumb navigation, and renders the view
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.params - Parameters passed from the route
 * @param {string} props.params.productId - Product ID for database lookup
 * @param {string} props.params.category - Category context from URL
 * @param {string} props.params.slug - Slug context from URL
 * @returns {JSX.Element} Product page container with data, breadcrumb navigation, and presentation logic
 */
const ProductPage = ({ params }) => {
  const productPageState = useProductPage(params);

  if (productPageState.isLoading) return <Loading message="Loading product..." variant="page" />;

  if (productPageState.error)
    return (
      <Error
        showRetry
        message={productPageState.error}
        retryText="Return to Shop"
        title="Product not found"
        variant="page"
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <ProductPageView
      {...productPageState}
      Button={Button}
      Image={Image}
      Link={Link}
      styles={styles}
    />
  );
};

export default ProductPage;

ProductPage.displayName = "ProductPage";
ProductPage.View = ProductPageView;
ProductPage.useProductPage = useProductPage;
ProductPage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};
