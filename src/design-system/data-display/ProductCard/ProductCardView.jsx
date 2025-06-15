import Image from "next/image";
import Link from "next/link";

import styles from "./ProductCard.module.scss";

const ProductCardView = ({ className = "", onClick, product, showNewBadge = false }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product.id, product.name);
    }
  };

  // Safety check for valid image
  if (!product.image || product.image === "") {
    return (
      <div className={`${styles.productCard} ${className}`}>
        <Link
          href={`/shop/product/${product.slug}`}
          className={styles.productLink}
          onClick={handleClick}>
          <div className={styles.imageContainer}>
            <div className={styles.placeholderText}>Image Coming Soon</div>

            {showNewBadge && product.isNew && <div className={styles.newBadge}>New</div>}
            {!product.inStock && <div className={styles.outOfStockBadge}>Out of Stock</div>}
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>${product.price}</p>
            {product.category && <p className={styles.productCategory}>{product.category}</p>}
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.productCard} ${className}`}>
      <Link
        href={`/shop/product/${product.slug}`}
        className={styles.productLink}
        onClick={handleClick}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={styles.productImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />

          {showNewBadge && product.isNew && <div className={styles.newBadge}>New</div>}
          {!product.inStock && <div className={styles.outOfStockBadge}>Out of Stock</div>}
        </div>
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productPrice}>${product.price}</p>
          {product.category && <p className={styles.productCategory}>{product.category}</p>}
        </div>
      </Link>
    </div>
  );
};

export default ProductCardView;
