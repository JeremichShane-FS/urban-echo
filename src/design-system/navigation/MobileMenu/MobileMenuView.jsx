import PropTypes from "prop-types";

import NavLinks from "@design-system/navigation/NavLinks";

import styles from "./MobileMenu.module.scss";

const MobileMenuView = ({ isOpen }) => {
  return (
    <div
      id="mobile-menu"
      className={isOpen ? styles.menu : `${styles.menu} ${styles["menu--hidden"]}`}
      aria-hidden={!isOpen}>
      <div className={styles.inner}>
        <NavLinks isMobile />
      </div>
    </div>
  );
};

export default MobileMenuView;

MobileMenuView.displayName = "MobileMenuView";
MobileMenuView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
