import Link from "next/link";

import styles from "./NewArrivals.module.scss";

const NewArrivalsView = ({ error, isLoading, newArrivals, onProductClick, onViewAllClick }) => {
  if (isLoading) {
    return (
      <section className={styles.newArrivals}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>New Arrivals</h2>
            <p className={styles.subtitle}>
              Discover our latest collection of trendy and modern clothing pieces
            </p>
          </div>
          <div className={styles.loading}>Loading new arrivals...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.newArrivals}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>New Arrivals</h2>
            <p className={styles.subtitle}>
              Discover our latest collection of trendy and modern clothing pieces
            </p>
          </div>
          <div className={styles.error}>{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.newArrivals}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>New Arrivals</h2>
          <p className={styles.subtitle}>
            Discover our latest collection of trendy and modern clothing pieces
          </p>
        </div>

        <div className={styles.productsGrid}>
          {newArrivals.map(product => (
            <div key={product.id} className={styles.productCard}>
              <Link
                href={`/shop/product/${product.slug}`}
                className={styles.productLink}
                onClick={() => onProductClick(product.id, product.name)}>
                <div className={styles.imageContainer}>
                  <div className={styles.imagePlaceholder}>
                    <span>Image Placeholder</span>
                  </div>
                  {product.isNew && <div className={styles.newBadge}>New</div>}
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <Link href="/shop" className={styles.viewAllButton} onClick={onViewAllClick}>
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsView;
