import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

import styles from "./ProductCard.module.scss";

const ProductCardView = ({
  className = "",
  onClick,
  product,
  showDescription,
  showNewBadge = false,
}) => {
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
            {showDescription && product.description && (
              <p className={styles.description}>{product.description}</p>
            )}
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
            fill
            src={product.image}
            alt={product.name}
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
          {showDescription && product.description && (
            <p className={styles.description}>{product.description}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCardView;

ProductCardView.displayName = "ProductCardView";
ProductCardView.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    isNew: PropTypes.bool,
    inStock: PropTypes.bool.isRequired,
    description: PropTypes.string,
  }).isRequired,
  showDescription: PropTypes.bool,
  showNewBadge: PropTypes.bool,
};
