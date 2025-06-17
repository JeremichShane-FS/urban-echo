import NavLinks from "../NavLinks";

import styles from "./MobileMenu.module.scss";

const MobileMenuView = ({ isOpen }) => {
  return (
    <div
      id="mobile-menu"
      className={isOpen ? styles.menu : `${styles.menu} ${styles["menu--hidden"]}`}
      aria-hidden={!isOpen}>
      <div className={styles.inner}>
        <NavLinks isMobile={true} />
      </div>
    </div>
  );
};

export default MobileMenuView;
