import PropTypes from "prop-types";

const MenuToggleView = ({ CloseIcon, MenuIcon, isOpen, onToggle, styles }) => {
  return (
    <button
      aria-controls="mobile-menu"
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={styles.toggle}
      type="button"
      onClick={onToggle}>
      {isOpen ? (
        <CloseIcon aria-hidden="true" className="h-8 w-8" />
      ) : (
        <MenuIcon aria-hidden="true" className="h-6 w-6" />
      )}
    </button>
  );
};

export default MenuToggleView;

MenuToggleView.displayName = "MenuToggleView";
MenuToggleView.propTypes = {
  CloseIcon: PropTypes.elementType.isRequired,
  MenuIcon: PropTypes.elementType.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};
