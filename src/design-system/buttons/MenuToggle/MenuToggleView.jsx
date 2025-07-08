import PropTypes from "prop-types";

const MenuToggleView = ({ CloseIcon, MenuIcon, isOpen, onToggle, styles }) => {
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onToggle}>
      {isOpen ? (
        <CloseIcon className="h-8 w-8" aria-hidden="true" />
      ) : (
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
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
