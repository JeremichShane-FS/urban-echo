import PropTypes from "prop-types";

const ProductCardView = ({
  Image,
  Link,
  className = "",
  onClick: handleClick,
  product,
  showDescription,
  showNewBadge = false,
  styles,
}) => {
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
  Image: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  product: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    inStock: PropTypes.bool.isRequired,
    isNew: PropTypes.bool,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  showDescription: PropTypes.bool,
  showNewBadge: PropTypes.bool,
  styles: PropTypes.object.isRequired,
};
