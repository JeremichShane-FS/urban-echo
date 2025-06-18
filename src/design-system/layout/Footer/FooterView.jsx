import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.scss";

const FooterView = ({ copyrightText, footerData, onLinkClick }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.backtop}>
          <button
            className={styles.backtop__button}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top">
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
                src={footerData.company.logo}
                alt={`${footerData.company.name} Logo`}
                fill
                className={styles.logo__image}
                sizes="(max-width: 640px) 128px, 128px"
              />
            </Link>
            <div className={styles.company__info}>
              <p className={styles.address}>
                {footerData.company.address}
                <br />
                {footerData.company.city}
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.section__title}>Main Menu</h4>
            <ul className={styles.links}>
              {footerData.mainMenu.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={styles.link}
                    onClick={() => onLinkClick(link.label, link.href)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.section__title}>Company</h4>
            <ul className={styles.links}>
              {footerData.companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={styles.link}
                    onClick={() => onLinkClick(link.label, link.href)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.section__title}>Discover</h4>
            <ul className={styles.links}>
              {footerData.discover.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={styles.link}
                    onClick={() => onLinkClick(link.label, link.href)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.section__title}>Find Us On</h4>
            <ul className={styles.links}>
              {footerData.social.map((link, index) => (
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
