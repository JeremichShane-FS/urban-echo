import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "@config/constants";
import { Button } from "@design-system/buttons";

import styles from "./HeroSection.module.scss";

const HeroSectionView = ({ heroData, isLoading, onCtaClick }) => {
  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          {heroData.backgroundImage && (
            <div className={styles.image}>
              <Image
                fill
                priority
                src={heroData.backgroundImage}
                alt="Urban Echo Fashion"
                className={styles.img}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          )}
          <div className={styles.text}>
            <h1 className={styles.title}>{heroData.title}</h1>
            <p className={styles.subtitle}>{heroData.subtitle}</p>

            <Link href={heroData.ctaLink} className={styles.cta} onClick={onCtaClick}>
              <Button variant={BUTTON_VARIANTS.accent} size={BUTTON_SIZES.lg} as="span">
                {heroData.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionView;

HeroSectionView.displayName = "HeroSectionView";
HeroSectionView.propTypes = {
  heroData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    ctaText: PropTypes.string.isRequired,
    ctaLink: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onCtaClick: PropTypes.func.isRequired,
};
