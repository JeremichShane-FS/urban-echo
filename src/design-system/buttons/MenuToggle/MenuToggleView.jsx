import { Menu, X } from "lucide-react";

import styles from "./MenuToggle.module.scss";

const MenuToggleView = ({ isOpen, onToggle }) => {
  return (
    <button
      type="button"
      className={styles["menu-toggle"]}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close menu" : "Open menu"}>
      {isOpen ? (
        <X className="h-6 w-6" aria-hidden="true" />
      ) : (
        <Menu className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};

export default MenuToggleView;
