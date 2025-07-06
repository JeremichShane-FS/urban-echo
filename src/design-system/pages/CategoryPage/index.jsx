"use client";

import PropTypes from "prop-types";

import CategoryPageView from "./CategoryPageView";
import { useCategoryPage } from "./useCategoryPage";

export default function CategoryPage({ params }) {
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
    />
  );
}

CategoryPage.displayName = "CategoryPage";
CategoryPage.View = CategoryPageView;
CategoryPage.useCategoryPage = useCategoryPage;
CategoryPage.propTypes = {
  params: PropTypes.shape({
    categorySlug: PropTypes.string.isRequired,
  }).isRequired,
};
