/**
 * @fileoverview New arrivals display component for showcasing latest product additions
 * Integrates with product data hooks to fetch and display recently added merchandise with filtering capabilities
 * Provides responsive grid layout with featured product highlighting and call-to-action for full collection
 */

"use client";
import Link from "next/link";

import { BUTTON_SIZES, BUTTON_VARIANTS, ROUTES } from "@config/constants";
import { Button } from "@design-system/buttons";
import { ProductCard } from "@design-system/data-display";
import { useNewArrivals } from "@modules/product/hooks";

import NewArrivalsView from "./NewArrivalsView";

import styles from "./NewArrivals.module.scss";

/**
 * Container component for displaying new arrivals with data fetching and state management
 * @component
 * @returns {JSX.Element} Rendered new arrivals section with loading and error states
 */
const NewArrivals = () => {
  const { error, filters, handleProductClick, handleViewAllClick, loading, pagination, products } =
    useNewArrivals();

  return (
    <NewArrivalsView
      BUTTON_SIZES={BUTTON_SIZES}
      BUTTON_VARIANTS={BUTTON_VARIANTS}
      Button={Button}
      Link={Link}
      ProductCard={ProductCard}
      ROUTES={ROUTES}
      error={error?.message || null}
      filters={filters}
      loading={loading}
      newArrivals={products}
      pagination={pagination}
      styles={styles}
      onProductClick={handleProductClick}
      onViewAllClick={handleViewAllClick}
    />
  );
};

export default NewArrivals;

NewArrivals.displayName = "NewArrivals";
NewArrivals.View = NewArrivalsView;
