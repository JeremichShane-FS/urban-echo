import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

import styles from "./Footer.module.scss";

const FooterView = ({
  companyInfo,
  copyrightText,
  getNavigationSection,
  onLinkClick,
  socialLinks,
}) => {
  const shopSection = getNavigationSection("Shop");
  const aboutSection = getNavigationSection("About");
  const helpSection = getNavigationSection("Help");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.backtop}>
          <button
            className={styles.backtop__button}
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <svg
              className={styles.backtop__arrow}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span className={styles.backtop__text}>Back to Top</span>
          </button>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 ${styles.content}`}>
          <div className={`md:row-span-2 ${styles.company}`}>
            <Link href="/" className={styles.logo}>
              <Image
                fill
                src={companyInfo.logo}
                alt={`${companyInfo.name} Logo`}
                className={styles.logo__image}
                sizes="(max-width: 640px) 128px, 128px"
              />
            </Link>
            <div className={styles.company__info}>
              <p className={styles.address}>
                {companyInfo.address}
                <br />
                {companyInfo.city}
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.section__title}>Shop</h4>
            <ul className={styles.links}>
              {shopSection?.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className={styles.link}
                    onClick={() => onLinkClick(link.label, link.path)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.section__title}>About</h4>
            <ul className={styles.links}>
              {aboutSection?.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className={styles.link}
                    onClick={() => onLinkClick(link.label, link.path)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.section__title}>Help</h4>
            <ul className={styles.links}>
              {helpSection?.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className={styles.link}
                    onClick={() => onLinkClick(link.label, link.path)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.section__title}>Find Us On</h4>
            <ul className={styles.links}>
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onLinkClick(link.label, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterView;

FooterView.displayName = "FooterView";
FooterView.propTypes = {
  companyInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  copyrightText: PropTypes.string.isRequired,
  getNavigationSection: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};
