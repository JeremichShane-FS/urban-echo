// src/components/ProductPage/ProductPage.js
import { useEffect, useState } from "react";

import { getProductById } from "@/api/products";
import { addToCart } from "@/utils/cart";

const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const productData = await getProductById(productId);
      setProduct(productData);
      setIsLoading(false);
    };
    fetchProduct();
  }, [productId]);

  // TODO: [COMPONENT] Add image zoom functionality for product gallery
  // Users should be able to click and zoom into product images
  // Include magnifying glass cursor and overlay zoom view
  const ProductImageGallery = ({ images }) => {
    return (
      <div className="product-gallery">
        {images.map((image, index) => (
          <img key={index} src={image.url} alt={`Product view ${index + 1}`} />
        ))}
      </div>
    );
  };

  const handleSizeChange = size => {
    setSelectedSize(size);
  };

  const handleQuantityChange = newQuantity => {
    setQuantity(newQuantity);
  };

  // FIX: [SECURITY] Validate product availability before allowing cart addition
  // Currently users can add out-of-stock items to cart
  // Need to check inventory levels and show appropriate error messages
  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    // This code needs the security fix above
    await addToCart({
      productId,
      size: selectedSize,
      quantity,
    });
  };

  if (isLoading) {
    return <div>Loading product...</div>;
  }

  // FIX: Product reviews section shows incorrect average rating calculation
  // The average rating is calculated incorrectly when there are no reviews
  // Should show "No reviews yet" instead of NaN or undefined
  const ProductReviews = ({ reviews }) => {
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0; // This calculation needs fixing

    return (
      <div className="product-reviews">
        <h3>Customer Reviews</h3>
        <div className="average-rating">Average: {averageRating || "No reviews yet"}</div>
        {reviews.map(review => (
          <div key={review.id} className="review">
            <p>{review.comment}</p>
            <span>Rating: {review.rating}/5</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="product-page">
      <h1>{product?.name}</h1>
      <ProductImageGallery images={product?.images || []} />

      <div className="product-details">
        <p>Price: ${product?.price}</p>

        <div className="size-selector">
          <label>Size:</label>
          {product?.sizes?.map(size => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={selectedSize === size ? "selected" : ""}>
              {size}
            </button>
          ))}
        </div>

        <div className="quantity-selector">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={e => handleQuantityChange(parseInt(e.target.value))}
            min="1"
          />
        </div>

        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <ProductReviews reviews={product?.reviews || []} />
    </div>
  );
};

export default ProductPage;
