/**
 * @fileoverview Presentational component for category page layout with product grid and filtering interface
 * Handles responsive layout with sidebar filters, product grid display, and pagination controls
 * Provides comprehensive e-commerce browsing experience with search, sorting, and filtering capabilities
 */

import PropTypes from "prop-types";

import Error from "@design-system/feedback/Error";
import Loading from "@design-system/feedback/Loading";
import Breadcrumbs from "@design-system/navigation/Breadcrumbs";

/**
 * View component for rendering category page with product grid, filters, and pagination
 * @component
 * @param {React.ComponentType} Button - Button component for interactive elements
 * @param {React.ComponentType} Image - Next.js Image component for optimized product images
 * @param {React.ComponentType} Link - Next.js Link component for product navigation
 * @param {Array<Object>} breadcrumbItems - Breadcrumb navigation items for page hierarchy
 * @param {Array<Object>} categories - Available product categories with counts
 * @param {string} category - Current active category slug
 * @param {number} currentPage - Current pagination page number
 * @param {Object|null} error - Error object if product loading fails
 * @param {Object} filters - Active filter states (onSale, newArrivals, freeShipping)
 * @param {Function} handleCategoryChange - Handler for category selection changes
 * @param {Function} handleFilterChange - Handler for filter state changes
 * @param {Function} handlePageChange - Handler for pagination navigation
 * @param {Function} handlePriceRangeChange - Handler for price range filter changes
 * @param {Function} handleSearch - Handler for search input changes
 * @param {Function} handleSortChange - Handler for sort option changes
 * @param {boolean} isLoading - Loading state indicator for product fetching
 * @param {Array<number>} priceRange - Current price range filter values
 * @param {Array<Object>} products - Product data array for grid display
 * @param {Function} renderStars - Utility function for rendering star ratings
 * @param {string} searchTerm - Current search query string
 * @param {string} selectedCategory - Currently selected category identifier
 * @param {string} sortBy - Current sort option selection
 * @param {Object} styles - CSS module styles object for component styling
 * @param {number} totalPages - Total number of pagination pages
 * @param {number} totalProducts - Total count of products matching current filters
 * @returns {JSX.Element} Rendered category page with comprehensive product browsing interface
 */
const CategoryPageView = ({
  Button,
  Image,
  Link,
  breadcrumbItems,
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
  renderStars,
  searchTerm,
  selectedCategory,
  sortBy,
  styles,
  totalPages,
  totalProducts,
}) => {
  const safeProducts = Array.isArray(products) ? products : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  if (error)
    return <Error showRetry message={error.message} onRetry={() => window.location.reload()} />;

  return (
    <div className={styles["category-page"]}>
      <section className={styles.header}>
        <div className={styles["header-content"]}>
          <Breadcrumbs className="breadcrumbs--dark" items={breadcrumbItems} />
          <div className={styles["header-group"]}>
            <h1 className={styles.title}>
              {category === "all"
                ? "All Products"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </h1>
            <p className={styles.subtitle}>
              {category === "all"
                ? "Discover our complete collection of premium fashion"
                : `Explore our ${category} collection`}
            </p>
            <div className={styles["results-count"]}>
              {isLoading ? "Loading..." : `${totalProducts} products found`}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 max-w-7xl mx-auto px-4">
        <aside className={styles.sidebar}>
          <div className={styles["filter-group"]}>
            <label className={styles["filter-label"]} htmlFor="product-search">
              Search Products
            </label>
            <input
              className={styles["search-input"]}
              id="product-search"
              placeholder="Search for products..."
              type="text"
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>

          <div className={styles["filter-group"]}>
            <h3 className={styles["filter-title"]}>Categories</h3>
            {safeCategories.map(categoryItem => (
              <button
                key={categoryItem.id}
                className={`${styles["category-button"]} ${
                  selectedCategory === categoryItem.id ? styles["category-button-active"] : ""
                }`}
                onClick={() => handleCategoryChange(categoryItem.id)}>
                <div className={styles["category-button-content"]}>
                  <span>{categoryItem.label}</span>
                  <span className={styles["category-count"]}>{categoryItem.count}</span>
                </div>
              </button>
            ))}
          </div>

          <div className={styles["filter-group"]}>
            <h3 className={styles["filter-title"]}>Price Range</h3>
            <div className={styles["price-range-container"]}>
              <input
                className={styles["price-range"]}
                max="500"
                min="0"
                type="range"
                value={priceRange[1]}
                onChange={e => handlePriceRangeChange([0, parseInt(e.target.value)])}
              />
              <div className={styles["price-labels"]}>
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className={styles["filter-group"]}>
            <h3 className={styles["filter-title"]}>Quick Filters</h3>
            <div className={styles["checkbox-group"]}>
              <label className={styles["checkbox-label"]}>
                <input
                  checked={filters.onSale}
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={e => handleFilterChange("onSale", e.target.checked)}
                />
                On Sale
              </label>
              <label className={styles["checkbox-label"]}>
                <input
                  checked={filters.newArrivals}
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={e => handleFilterChange("newArrivals", e.target.checked)}
                />
                New Arrivals
              </label>
              <label className={styles["checkbox-label"]}>
                <input
                  checked={filters.freeShipping}
                  className={styles.checkbox}
                  type="checkbox"
                  onChange={e => handleFilterChange("freeShipping", e.target.checked)}
                />
                Free Shipping
              </label>
            </div>
          </div>
        </aside>

        <div>
          <div className={styles["sort-controls"]}>
            <div className={styles["product-count"]}>
              {isLoading ? "Loading..." : `${totalProducts} Products`}
            </div>
            <div className={styles["sort-container"]}>
              <label className={styles["sort-label"]} htmlFor="sort-select">
                Sort by:
              </label>
              <select
                className={styles["sort-select"]}
                disabled={isLoading}
                id="sort-select"
                value={sortBy}
                onChange={e => handleSortChange(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {isLoading && <Loading message="Loading products..." />}

          {!isLoading && safeProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {safeProducts.map(product => {
                const productId = product._id || product.id;
                const productImage =
                  (Array.isArray(product.images) &&
                  typeof product.images[0] === "string" &&
                  product.images[0].trim()
                    ? product.images[0]
                    : null) ||
                  (typeof product.image === "string" && product.image.trim()
                    ? product.image
                    : null) ||
                  "/images/placeholder-product.jpg";
                const productName = product.name || "Unnamed Product";
                const productPrice = product.price || 0;
                const productOriginalPrice = product.originalPrice;

                return (
                  <Link
                    key={productId}
                    className={styles["product-link"]}
                    href={`/shop/${category}/${product.slug || "product"}/${productId}`}>
                    <article className={styles["product-card"]}>
                      <div className={styles["product-image-container"]}>
                        <Image
                          alt={productName}
                          className={styles["product-image"]}
                          height={240}
                          priority={false}
                          src={productImage}
                          width={300}
                        />

                        <div className={styles.badges}>
                          {product.isNewArrival && <span className={styles["badge-new"]}>NEW</span>}
                          {product.onSale && <span className={styles["badge-sale"]}>SALE</span>}
                        </div>

                        <div className={styles["quick-actions"]}>
                          <button
                            aria-label={`Add ${productName} to wishlist`}
                            className={styles["wishlist-button"]}
                            onClick={e => {
                              e.preventDefault();
                              // wishlist logic
                            }}>
                            ♡
                          </button>
                        </div>
                      </div>

                      <div className={styles["product-info"]}>
                        <h3 className={styles["product-name"]}>{productName}</h3>

                        {product.rating && (
                          <div className={styles["product-rating"]}>
                            <div className={styles.stars}>{renderStars(product.rating)}</div>
                            <span className={styles["review-count"]}>
                              ({product.reviewCount || 0} reviews)
                            </span>
                          </div>
                        )}

                        <div className={styles["product-footer"]}>
                          <div className={styles.pricing}>
                            <span className={styles["current-price"]}>
                              ${productPrice.toFixed(2)}
                            </span>
                            {productOriginalPrice && productOriginalPrice > productPrice && (
                              <span className={styles["original-price"]}>
                                ${productOriginalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <Button
                            size="xs"
                            variant="primary"
                            onClick={e => {
                              e.preventDefault();
                              // cart logic
                            }}>
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}

          {!isLoading && safeProducts.length === 0 && (
            <div className={styles["no-products"]}>
              <h3>No products found</h3>
              <p>
                Try adjusting your filters or search terms to find what you&apos;re looking for.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  handleSearch("");
                  handleCategoryChange("all");
                  handlePriceRangeChange([0, 500]);
                }}>
                Clear All Filters
              </Button>
            </div>
          )}

          {!isLoading && totalPages > 1 && (
            <nav aria-label="Product pagination" className={styles.pagination}>
              <button
                aria-label="Go to previous page"
                className={styles["pagination-button"]}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>

              <div className={styles["page-numbers"]}>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      aria-current={page === currentPage ? "page" : undefined}
                      aria-label={`Go to page ${page}`}
                      className={`${styles["page-button"]} ${
                        page === currentPage ? styles["page-button-active"] : ""
                      }`}
                      onClick={() => handlePageChange(page)}>
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                aria-label="Go to next page"
                className={styles["pagination-button"]}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPageView;

CategoryPageView.displayName = "CategoryPageView";
CategoryPageView.propTypes = {
  Button: PropTypes.elementType.isRequired,
  Image: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  category: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  error: PropTypes.object,
  filters: PropTypes.shape({
    freeShipping: PropTypes.bool.isRequired,
    newArrivals: PropTypes.bool.isRequired,
    onSale: PropTypes.bool.isRequired,
  }).isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handlePriceRangeChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      id: PropTypes.string,
      image: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      isNewArrival: PropTypes.bool,
      name: PropTypes.string.isRequired,
      onSale: PropTypes.bool,
      originalPrice: PropTypes.number,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number,
      reviewCount: PropTypes.number,
    })
  ).isRequired,
  renderStars: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalProducts: PropTypes.number.isRequired,
};
