import Image from "next/image";
import Link from "next/link";

import styles from "./ProductCard.module.scss";

const ProductCardView = ({ className = "", onClick, product, showNewBadge = false }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product.id, product.name);
    }
  };

  if (!product.image || product.image === "") {
    return (
      <div className={`${styles.card} ${className}`}>
        <Link href={`/shop/product/${product.slug}`} className={styles.link} onClick={handleClick}>
          <div className={styles.image}>
            <div className={styles.placeholder}>Image Coming Soon</div>

            {showNewBadge && product.isNew && <div className={styles.badge}>New</div>}
            {!product.inStock && (
              <div className={`${styles.badge} ${styles["badge--out-of-stock"]}`}>Out of Stock</div>
            )}
          </div>
          <div className={styles.info}>
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.price}>${product.price}</p>
            {product.category && <p className={styles.category}>{product.category}</p>}
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className={`${styles.card} ${className}`}>
      <Link href={`/shop/product/${product.slug}`} className={styles.link} onClick={handleClick}>
        <div className={styles.image}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={styles.img}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />

          {showNewBadge && product.isNew && <div className={styles.badge}>New</div>}
          {!product.inStock && (
            <div className={`${styles.badge} ${styles["badge--out-of-stock"]}`}>Out of Stock</div>
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>${product.price}</p>
          {product.category && <p className={styles.category}>{product.category}</p>}
        </div>
      </Link>
    </div>
  );
};

export default ProductCardView;
