import PropTypes from "prop-types";

const MobileMenuView = ({ NavLinks, isOpen, styles }) => {
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
  NavLinks: PropTypes.elementType.isRequired,
  isOpen: PropTypes.bool.isRequired,
  styles: PropTypes.object.isRequired,
};
