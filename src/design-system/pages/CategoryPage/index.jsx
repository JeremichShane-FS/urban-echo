/**
 * @fileoverview Category page component for e-commerce product browsing with filtering and pagination
 * Provides comprehensive product discovery interface with search, filtering, sorting, and pagination capabilities
 * Integrates with Next.js Image optimization and Link routing for performance and enhanced user experience
 */

"use client";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

import { Button } from "@design-system/buttons";
import { renderStars } from "@modules/core/utils/renderStars";

import CategoryPageView from "./CategoryPageView";
import useCategoryPage from "./useCategoryPage";

import styles from "./CategoryPage.module.scss";

/**
 * Container component for category page with product filtering, search, and pagination functionality
 * @component
 * @param {Object} params - URL parameters object containing category information
 * @param {string} params.categorySlug - Category slug from URL for product filtering
 * @returns {JSX.Element} Rendered category page with product grid, filters, and pagination
 */
const CategoryPage = ({ params }) => {
  const {
    categories,
    category,
    currentPage,
    error,
    filters,
    handleCategoryChange,
    handleFilterChange,
    handlePageChange,
    handlePriceRangeChange,
    handleSearch,
    handleSortChange,
    isLoading,
    priceRange,
    products,
    searchTerm,
    selectedCategory,
    sortBy,
    totalPages,
    totalProducts,
  } = useCategoryPage(params);

  console.log("📍 CategoryPage container - products:", products);
  console.log("📍 CategoryPage container - totalProducts:", totalProducts);
  console.log("📍 CategoryPage container - isLoading:", isLoading);

  return (
    <CategoryPageView
      Button={Button}
      Image={Image}
      Link={Link}
      categories={categories}
      category={category}
      currentPage={currentPage}
      error={error}
      filters={filters}
      handleCategoryChange={handleCategoryChange}
      handleFilterChange={handleFilterChange}
      handlePageChange={handlePageChange}
      handlePriceRangeChange={handlePriceRangeChange}
      handleSearch={handleSearch}
      handleSortChange={handleSortChange}
      isLoading={isLoading}
      priceRange={priceRange}
      products={products}
      renderStars={renderStars}
      searchTerm={searchTerm}
      selectedCategory={selectedCategory}
      sortBy={sortBy}
      styles={styles}
      totalPages={totalPages}
      totalProducts={totalProducts}
    />
  );
};

export default CategoryPage;

CategoryPage.displayName = "CategoryPage";
CategoryPage.View = CategoryPageView;
CategoryPage.useCategoryPage = useCategoryPage;
CategoryPage.propTypes = {
  params: PropTypes.shape({
    categorySlug: PropTypes.string.isRequired,
  }).isRequired,
};
