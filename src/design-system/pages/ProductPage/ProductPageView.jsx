/**
 * @fileoverview Presentational component for product page layout and user interface with breadcrumb navigation
 * Handles the visual presentation of product details, image gallery, variants, related products, and navigation breadcrumbs
 * Provides responsive layout with product information, reviews, purchase options, and hierarchical navigation - Updated to match wireframe
 * Now uses unified image handling system with conditional optimization
 */

import PropTypes from "prop-types";

import Breadcrumbs from "@design-system/navigation/Breadcrumbs";
import { getImageUrl } from "@modules/core/utils";

/**
 * View component for rendering complete product page interface with breadcrumb navigation matching wireframe design
 * @component
 */
const ProductPageView = ({
  Button,
  Image,
  Link,
  availableSizes,
  averageRating,
  breadcrumbItems,
  canAddToCart,
  currentImageUrl,
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
  relatedProducts,
  renderStars,
  reviews,
  selectedSize,
  showSuccessMessage,
  styles,
  successMessage,
}) => {
  if (!product) return null;

  console.log("🛍️ DEBUG - relatedProducts in View:", relatedProducts);

  const mainImageUrl = getImageUrl(currentImageUrl);
  const isMainImagePlaceholder = mainImageUrl?.includes("placehold.co");

  return (
    <div className={styles["product-page"]}>
      <div className="px-4 pt-4 pb-2">
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

      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 items-start">
          <div className={styles["image-section"]}>
            <div className={styles["main-image"]}>
              <Image
                priority
                alt={product.name}
                className={styles["product-image"]}
                height={500}
                src={mainImageUrl}
                unoptimized={isMainImagePlaceholder}
                width={500}
              />
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
              {relatedProducts.map((relatedProduct, i) => {
                const relatedImageUrl = getImageUrl(relatedProduct);
                const isRelatedPlaceholder = relatedImageUrl?.includes("placehold.co");

                return (
                  <Link
                    key={`${relatedProduct.id}-${i}`}
                    className={styles["related-product"]}
                    href={`/shop/${relatedProduct.category}/${relatedProduct.slug}/${relatedProduct.id || relatedProduct._id}`}>
                    <div className={styles["related-image-wrapper"]}>
                      <Image
                        alt={relatedProduct.name}
                        className={styles["related-image"]}
                        height={200}
                        src={relatedImageUrl}
                        unoptimized={isRelatedPlaceholder}
                        width={200}
                      />
                    </div>
                    <div className={styles["related-info"]}>
                      <h3 className={styles["related-name"]}>{relatedProduct.name}</h3>
                      <p className={styles["related-price"]}>${relatedProduct.price}</p>
                    </div>
                  </Link>
                );
              })}
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
  currentImageUrl: PropTypes.string,
  currentPrice: PropTypes.number,
  discountPercentage: PropTypes.number,
  handleAddToCart: PropTypes.func.isRequired,
  handleCloseSuccessMessage: PropTypes.func.isRequired,
  handleColorSelect: PropTypes.func,
  handleQuantityChange: PropTypes.func,
  handleSizeSelect: PropTypes.func.isRequired,
  handleWishlistToggle: PropTypes.func.isRequired,
  isOnSale: PropTypes.bool,
  isWishlisted: PropTypes.bool,
  originalPrice: PropTypes.number,
  product: PropTypes.object,
  productImages: PropTypes.arrayOf(PropTypes.string),
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
