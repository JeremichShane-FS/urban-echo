import Image from "next/image";
import Link from "next/link";

import styles from "./HeroSection.module.scss";

const HeroSectionView = ({ heroData, isLoading, onCtaClick }) => {
  if (isLoading) {
    return (
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          {heroData.backgroundImage && (
            <div className={styles.imageContainer}>
              <Image
                src={heroData.backgroundImage}
                alt="Urban Echo Fashion"
                fill
                className={styles.heroImage}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          )}
          <div className={styles.textContent}>
            <h1 className={styles.title}>{heroData.title}</h1>
            <p className={styles.subtitle}>{heroData.subtitle}</p>
            <Link href={heroData.ctaLink} className={styles.shopButton} onClick={onCtaClick}>
              {heroData.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionView;
