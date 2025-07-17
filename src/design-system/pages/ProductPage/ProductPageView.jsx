/**
 * @fileoverview Presentational component for product page layout and user interface with breadcrumb navigation
 * Handles the visual presentation of product details, image gallery, variants, related products, and navigation breadcrumbs
 * Provides responsive layout with product information, reviews, purchase options, and hierarchical navigation - Updated to match wireframe
 */

import PropTypes from "prop-types";

import Breadcrumbs from "@design-system/navigation/Breadcrumbs";

/**
 * View component for rendering complete product page interface with breadcrumb navigation matching wireframe design
 * @component
 * @param {React.ComponentType} Button - Button component for interactive elements
 * @param {React.ComponentType} Image - Next.js Image component for optimized product images
 * @param {React.ComponentType} Link - Next.js Link component for navigation
 * @param {number} activeImageIndex - Currently displayed image index in gallery
 * @param {Array<string>} availableSizes - Available size options for product selection
 * @param {number} averageRating - Calculated average rating from product reviews
 * @param {Array<Object>} breadcrumbItems - Breadcrumb navigation items for page hierarchy
 * @param {boolean} canAddToCart - Whether product can be added to cart based on selections
 * @param {number} currentPrice - Current product price including variant pricing
 * @param {number} discountPercentage - Percentage discount amount for sale display
 * @param {Function} handleAddToCart - Handler for add to cart button interactions
 * @param {Function} handleCloseSuccessMessage - Handler for closing success notification overlay
 * @param {Function} handleSizeSelect - Handler for size selection dropdown changes
 * @param {Function} handleWishlistToggle - Handler for wishlist heart button interactions
 * @param {boolean} isOnSale - Whether product has active discount pricing
 * @param {boolean} isWishlisted - Whether product is currently in user's wishlist
 * @param {number} originalPrice - Original product price before discounts
 * @param {Object} product - Complete product data object with details and specifications
 * @param {Array<string>} productImages - Product image URLs for gallery display
 * @param {Array<Object>} relatedProducts - Related/similar products for recommendations section
 * @param {Function} renderStars - Utility function for rendering star rating components
 * @param {Array<Object>} reviews - Product reviews data for reviews section
 * @param {string} selectedSize - Currently selected size option value
 * @param {boolean} showSuccessMessage - Whether success notification overlay is visible
 * @param {Object} styles - CSS module styles object for component styling
 * @param {string} successMessage - Success notification message content for display
 * @returns {JSX.Element} Rendered product page with comprehensive interface and breadcrumb navigation
 */
const ProductPageView = ({
  Button,
  Image,
  Link,
  activeImageIndex,
  availableSizes,
  averageRating,
  breadcrumbItems,
  canAddToCart,
  currentPrice,
  discountPercentage,
  handleAddToCart,
  handleCloseSuccessMessage,
  handleSizeSelect,
  handleWishlistToggle,
  isOnSale,
  isWishlisted,
  originalPrice,
  product,
  productImages,
  relatedProducts,
  renderStars,
  reviews,
  selectedSize,
  showSuccessMessage,
  styles,
  successMessage,
}) => {
  if (!product) return null;

  return (
    <div className={styles["product-page"]}>
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {showSuccessMessage && (
        <div className={styles["success-toast"]}>
          <div className={styles["toast-content"]}>
            <span>{successMessage}</span>
            <button
              aria-label="Close notification"
              className={styles["toast-close"]}
              onClick={handleCloseSuccessMessage}>
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 items-start">
          <div className={styles["image-section"]}>
            <div className={styles["main-image"]}>
              {productImages[activeImageIndex] && (
                <Image
                  priority
                  alt={product.name}
                  className={styles["product-image"]}
                  height={500}
                  src={
                    typeof productImages[activeImageIndex] === "string"
                      ? productImages[activeImageIndex]
                      : productImages[activeImageIndex]?.url || "/placeholder-image.jpg"
                  }
                  style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
                  width={500}
                />
              )}
            </div>
          </div>

          <div className={styles["product-details"]}>
            <h1 className={styles["product-title"]}>{product.name}</h1>

            <div className={styles["rating"]}>
              <div className={styles["stars"]}>
                {renderStars(averageRating).map((star, index) => (
                  <span
                    key={index}
                    className={`${styles["star"]} ${
                      star.isFilled ? styles["filled"] : star.isHalf ? styles["half"] : ""
                    }`}>
                    ★
                  </span>
                ))}
              </div>
              <span className={styles["review-count"]}>
                {product.reviewCount || 0} Review{(product.reviewCount || 0) !== 1 ? "s" : ""}
              </span>
            </div>

            <div className={styles["price-section"]}>
              <span className={styles["current-price"]}>${currentPrice.toFixed(2)}</span>
              {isOnSale && (
                <>
                  <span className={styles["original-price"]}>${originalPrice.toFixed(2)}</span>
                  <span className={styles["discount"]}>-{discountPercentage}%</span>
                </>
              )}
            </div>

            <div className={styles["description"]}>
              <p>{product.description}</p>
            </div>

            <div className={styles["model-selection"]}>
              <select
                className={styles["model-dropdown"]}
                value={selectedSize || ""}
                onChange={e => handleSizeSelect(e.target.value)}>
                <option value="">Select Model</option>
                {availableSizes.map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles["actions"]}>
              <Button
                className={styles["add-to-cart-button"]}
                disabled={!canAddToCart}
                variant="primary"
                onClick={handleAddToCart}>
                Add To Cart
              </Button>

              <button
                className={`${styles["wishlist-button"]} ${isWishlisted ? styles["wishlisted"] : ""}`}
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                onClick={handleWishlistToggle}>
                ♡
              </button>
            </div>

            {!product.inStock && <p className={styles["out-of-stock"]}>Out of Stock</p>}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className={styles["similar-products"]}>
            <h2 className={styles["section-title"]}>Similar Products</h2>
            <div className={styles["related-grid"]}>
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  className={styles["related-product"]}
                  href={`/product/${relatedProduct.id}`}>
                  <div className={styles["related-image-wrapper"]}>
                    <Image
                      alt={relatedProduct.name}
                      className={styles["related-image"]}
                      height={200}
                      src={relatedProduct.images?.[0] || "/placeholder-image.jpg"}
                      style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
                      width={200}
                    />
                  </div>
                  <div className={styles["related-info"]}>
                    <h3 className={styles["related-name"]}>{relatedProduct.name}</h3>
                    <p className={styles["related-price"]}>${relatedProduct.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {reviews.length > 0 && (
          <section className={styles["reviews-section"]}>
            <h2 className={styles["section-title"]}>Reviews</h2>
            <div className={styles["reviews-list"]}>
              {reviews.map((review, index) => (
                <div key={index} className={styles.review}>
                  <div className={styles["review-header"]}>
                    <div className={styles.reviewer}>
                      <div className={styles.avatar}>
                        {review.author?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div className={styles["reviewer-info"]}>
                        <span className={styles["reviewer-name"]}>
                          {review.author || "Anonymous"}
                        </span>
                        <span className={styles["reviewer-date"]}>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className={styles["review-rating"]}>
                      {renderStars(review.rating || 0).map((star, starIndex) => (
                        <span
                          key={starIndex}
                          className={`${styles.star} ${star.isFilled ? styles.filled : ""}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className={styles["review-text"]}>{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

ProductPageView.propTypes = {
  Button: PropTypes.elementType.isRequired,
  Image: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  activeImageIndex: PropTypes.number,
  availableColors: PropTypes.array,
  availableSizes: PropTypes.array,
  averageRating: PropTypes.number,
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  canAddToCart: PropTypes.bool,
  currentPrice: PropTypes.number,
  discountPercentage: PropTypes.number,
  handleAddToCart: PropTypes.func.isRequired,
  handleCloseSuccessMessage: PropTypes.func.isRequired,
  handleColorSelect: PropTypes.func.isRequired,
  handleImageSelect: PropTypes.func.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  handleSizeSelect: PropTypes.func.isRequired,
  handleWishlistToggle: PropTypes.func.isRequired,
  isOnSale: PropTypes.bool,
  isWishlisted: PropTypes.bool,
  originalPrice: PropTypes.number,
  product: PropTypes.object,
  productImages: PropTypes.array,
  quantity: PropTypes.number,
  relatedProducts: PropTypes.array,
  renderStars: PropTypes.func.isRequired,
  reviews: PropTypes.array,
  selectedColor: PropTypes.string,
  selectedSize: PropTypes.string,
  showSuccessMessage: PropTypes.bool,
  styles: PropTypes.object.isRequired,
  successMessage: PropTypes.string,
};

export default ProductPageView;
