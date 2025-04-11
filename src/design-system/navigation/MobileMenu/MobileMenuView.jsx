import NavLinks from "../NavLinks";

import styles from "./MobileMenu.module.scss";

const MobileMenuView = ({ isOpen }) => {
  return (
    <div
      id="mobile-menu"
      className={isOpen ? styles["mobile-menu"] : `${styles["mobile-menu"]} ${styles["hidden"]}`}
      aria-hidden={!isOpen}>
      <div className={styles.mobileMenuInner}>
        <NavLinks isMobile={true} />
      </div>
    </div>
  );
};

export default MobileMenuView;
