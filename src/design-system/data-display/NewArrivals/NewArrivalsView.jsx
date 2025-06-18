import Link from "next/link";

import styles from "./NewArrivals.module.scss";

const NewArrivalsView = ({ error, isLoading, newArrivals, onProductClick, onViewAllClick }) => {
  if (isLoading) {
    return (
      <section className={styles.section}>
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
      <section className={styles.section}>
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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>New Arrivals</h2>
          <p className={styles.subtitle}>
            Discover our latest collection of trendy and modern clothing pieces
          </p>
        </div>

        <div className={styles.grid}>
          {newArrivals.map(product => (
            <div key={product.id} className={styles.card}>
              <Link
                href={`/shop/product/${product.slug}`}
                className={styles.link}
                onClick={() => onProductClick(product.id, product.name)}>
                <div className={styles.image}>
                  <div className={styles.placeholder}>
                    <span>Image Placeholder</span>
                  </div>
                  {product.isNew && <div className={styles.badge}>New</div>}
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.price}>${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/shop" className={styles.button} onClick={onViewAllClick}>
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsView;
