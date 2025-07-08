import { Menu, X } from "lucide-react";
import PropTypes from "prop-types";

import MenuToggleView from "./MenuToggleView";
import useMenuToggle from "./useMenuToggle";

import styles from "./MenuToggle.module.scss";

const MenuToggle = ({ isOpen, setIsOpen }) => {
  const { handleToggle } = useMenuToggle(isOpen, setIsOpen);

  return (
    <MenuToggleView
      isOpen={isOpen}
      styles={styles}
      MenuIcon={Menu}
      CloseIcon={X}
      onToggle={handleToggle}
    />
  );
};

export default MenuToggle;

MenuToggle.displayName = "MenuToggle";
MenuToggle.View = MenuToggleView;
MenuToggle.useMenuToggle = useMenuToggle;
MenuToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
