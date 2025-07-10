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

  return (
    <CategoryPageView
      products={products}
      categories={categories}
      totalProducts={totalProducts}
      totalPages={totalPages}
      currentPage={currentPage}
      selectedCategory={selectedCategory}
      sortBy={sortBy}
      priceRange={priceRange}
      searchTerm={searchTerm}
      filters={filters}
      category={category}
      isLoading={isLoading}
      error={error}
      handleCategoryChange={handleCategoryChange}
      handleFilterChange={handleFilterChange}
      handleSearch={handleSearch}
      handleSortChange={handleSortChange}
      handlePriceRangeChange={handlePriceRangeChange}
      handlePageChange={handlePageChange}
      styles={styles}
      Button={Button}
      Image={Image}
      Link={Link}
      renderStars={renderStars}
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
