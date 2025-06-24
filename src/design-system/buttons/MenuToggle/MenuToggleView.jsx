import { Menu, X } from "lucide-react";
import PropTypes from "prop-types";

import styles from "./MenuToggle.module.scss";

const MenuToggleView = ({ isOpen, onToggle }) => {
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={onToggle}>
      {isOpen ? (
        <X className="h-8 w-8" aria-hidden="true" />
      ) : (
        <Menu className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};

export default MenuToggleView;

MenuToggleView.displayName = "MenuToggleView";
MenuToggleView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
