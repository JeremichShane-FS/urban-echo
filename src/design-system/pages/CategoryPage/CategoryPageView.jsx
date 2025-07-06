import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

import { Button } from "@design-system/buttons";

import styles from "./CategoryPage.module.scss";

export default function CategoryPageView({
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
}) {
  const renderStars = rating => {
    if (!rating) return null;
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? styles["star-filled"] : styles["star-empty"]}>
        ★
      </span>
    ));
  };

  if (error) {
    return (
      <div className={styles.error}>
        <div className={styles["error-content"]}>
          <h2>Something went wrong</h2>
          <p>Error loading products: {error.message}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["category-page"]}>
      <section className={styles.header}>
        <div className={styles["header-content"]}>
          <div className={styles.breadcrumbs}>
            <Link href="/shop" className={styles["breadcrumb-link"]}>
              Shop
            </Link>
            <span className={styles["breadcrumb-separator"]}>›</span>
            <span className={styles["breadcrumb-current"]}>
              {category === "all"
                ? "All Products"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>
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
          <div className={styles["results-count"]}>{totalProducts} products found</div>
        </div>
      </section>

      <div className={styles["content-grid"]}>
        <aside className={styles.sidebar}>
          <div className={styles["filter-group"]}>
            <label htmlFor="product-search" className={styles["filter-label"]}>
              Search Products
            </label>
            <input
              id="product-search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              className={styles["search-input"]}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>

          <div className={styles["filter-group"]}>
            <h3 className={styles["filter-title"]}>Categories</h3>
            {categories.map(categoryItem => (
              <Button
                key={categoryItem.id}
                className={`${styles["category-button"]} ${
                  selectedCategory === categoryItem.id ? styles["category-button-active"] : ""
                }`}
                onClick={() => handleCategoryChange(categoryItem.id)}>
                <div className={styles["category-button-content"]}>
                  <span>{categoryItem.label}</span>
                  <span className={styles["category-count"]}>{categoryItem.count}</span>
                </div>
              </Button>
            ))}
          </div>

          <div className={styles["filter-group"]}>
            <h3 className={styles["filter-title"]}>Price Range</h3>
            <div className={styles["price-range-container"]}>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                className={styles["price-range"]}
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
                  type="checkbox"
                  checked={filters.onSale}
                  className={styles.checkbox}
                  onChange={e => handleFilterChange("onSale", e.target.checked)}
                />
                On Sale
              </label>
              <label className={styles["checkbox-label"]}>
                <input
                  type="checkbox"
                  checked={filters.newArrivals}
                  className={styles.checkbox}
                  onChange={e => handleFilterChange("newArrivals", e.target.checked)}
                />
                New Arrivals
              </label>
              <label className={styles["checkbox-label"]}>
                <input
                  type="checkbox"
                  checked={filters.freeShipping}
                  className={styles.checkbox}
                  onChange={e => handleFilterChange("freeShipping", e.target.checked)}
                />
                Free Shipping
              </label>
            </div>
          </div>
        </aside>

        <main className={styles["main-content"]}>
          <div className={styles["sort-controls"]}>
            <div className={styles["product-count"]}>{totalProducts} Products</div>
            <div className={styles["sort-container"]}>
              <label htmlFor="sort-select" className={styles["sort-label"]}>
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                className={styles["sort-select"]}
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

          {isLoading && (
            <div className={styles.loading}>
              <div className={styles["loading-spinner"]}></div>
              <p>Loading products...</p>
            </div>
          )}

          {!isLoading && (
            <div className={styles["products-grid"]}>
              {products.map(product => (
                <Link
                  key={product._id || product.id}
                  href={`/product/${product._id || product.id}`}
                  className={styles["product-link"]}>
                  <div className={styles["product-card"]}>
                    <div className={styles["product-image-container"]}>
                      <Image
                        src={
                          product.images?.[0] || product.image || "/images/placeholder-product.jpg"
                        }
                        alt={product.name}
                        className={styles["product-image"]}
                      />

                      <div className={styles.badges}>
                        {product.isNew && <span className={styles["badge-new"]}>NEW</span>}
                        {product.onSale && <span className={styles["badge-sale"]}>SALE</span>}
                      </div>

                      <div className={styles["quick-actions"]}>
                        <Button
                          className={styles["wishlist-button"]}
                          onClick={e => {
                            e.preventDefault();
                            // wishlist logic
                          }}>
                          ♡
                        </Button>
                      </div>
                    </div>

                    <div className={styles["product-info"]}>
                      <h3 className={styles["product-name"]}>{product.name}</h3>

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
                          <span className={styles["current-price"]}>${product.price}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className={styles["original-price"]}>
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>

                        <Button
                          variant="primary"
                          size="small"
                          onClick={e => {
                            e.preventDefault();
                            // cart logic
                          }}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && products.length === 0 && (
            <div className={styles["no-products"]}>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms.</p>
              <Button
                onClick={() => {
                  handleSearch("");
                  handleCategoryChange("all");
                  handlePriceRangeChange([0, 500]);
                }}>
                Clear Filters
              </Button>
            </div>
          )}

          {!isLoading && totalPages > 1 && (
            <div className={styles.pagination}>
              <Button
                disabled={currentPage === 1}
                className={styles["pagination-button"]}
                onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </Button>

              <div className={styles["page-numbers"]}>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      className={`${styles["page-button"]} ${
                        page === currentPage ? styles["page-button-active"] : ""
                      }`}
                      onClick={() => handlePageChange(page)}>
                      {page}
                    </Button>
                  );
                })}
              </div>

              <Button
                disabled={currentPage === totalPages}
                className={styles["pagination-button"]}
                onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

CategoryPageView.displayName = "CategoryPageView";

CategoryPageView.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      images: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.string,
      rating: PropTypes.number,
      reviewCount: PropTypes.number,
      isNew: PropTypes.bool,
      onSale: PropTypes.bool,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalProducts: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  searchTerm: PropTypes.string.isRequired,
  filters: PropTypes.shape({
    onSale: PropTypes.bool.isRequired,
    newArrivals: PropTypes.bool.isRequired,
    freeShipping: PropTypes.bool.isRequired,
  }).isRequired,
  category: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  handleCategoryChange: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  handlePriceRangeChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};
