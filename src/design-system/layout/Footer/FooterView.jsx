/**
 * @fileoverview Presentational component for footer layout with responsive grid and navigation sections
 * Handles company branding, navigation links, social media links, and back-to-top functionality
 * Provides accessibility features with proper ARIA labels and semantic HTML structure
 */

import PropTypes from "prop-types";

/**
 * View component for rendering footer layout with responsive navigation grid and company information
 * @component
 * @param {React.ComponentType} Image - Next.js Image component for optimized logo rendering
 * @param {React.ComponentType} Link - Next.js Link component for client-side navigation
 * @param {Object} companyInfo - Company information including name, address, and logo
 * @param {string} copyrightText - Dynamic copyright text with current year
 * @param {Function} onLinkClick - Handler for link click analytics tracking
 * @param {Object} sections - Pre-organized navigation sections (shop, about, help)
 * @param {Array<Object>} socialLinks - Social media platform links and labels
 * @param {Object} styles - CSS module styles object for component styling
 * @returns {JSX.Element} Rendered footer with responsive grid layout and interactive elements
 */
const FooterView = ({
  Image,
  Link,
  companyInfo,
  copyrightText,
  onLinkClick,
  sections,
  socialLinks,
  styles,
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.backtop}>
          <button
            aria-label="Back to top"
            className={styles.backtop__button}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <svg
              aria-hidden="true"
              className={styles.backtop__arrow}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M5 10l7-7m0 0l7 7m-7-7v18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <span className={styles.backtop__text}>Back to Top</span>
          </button>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 ${styles.content}`}>
          <div className={`md:row-span-2 ${styles.company}`}>
            <Link className={styles.logo} href="/">
              <Image
                fill
                alt={`${companyInfo.name} Logo`}
                className={styles.logo__image}
                sizes="(max-width: 640px) 128px, 128px"
                src={companyInfo.logo}
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
              {sections.shopSection?.links.map((link, index) => (
                <li key={index}>
                  <Link
                    className={styles.link}
                    href={link.path}
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
              {sections.aboutSection?.links.map((link, index) => (
                <li key={index}>
                  <Link
                    className={styles.link}
                    href={link.path}
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
              {sections.helpSection?.links.map((link, index) => (
                <li key={index}>
                  <Link
                    className={styles.link}
                    href={link.path}
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
                    className={styles.link}
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
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
  Image: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  companyInfo: PropTypes.shape({
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  copyrightText: PropTypes.string.isRequired,
  getNavigationSection: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  sections: PropTypes.shape({
    aboutSection: PropTypes.shape({
      links: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
    helpSection: PropTypes.shape({
      links: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
    shopSection: PropTypes.shape({
      links: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
  }).isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  styles: PropTypes.object.isRequired,
};
