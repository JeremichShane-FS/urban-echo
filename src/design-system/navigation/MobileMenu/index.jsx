import PropTypes from "prop-types";

import NavLinks from "@design-system/navigation/NavLinks";

import MobileMenuView from "./MobileMenuView";

import styles from "./MobileMenu.module.scss";

const MobileMenu = ({ isOpen }) => {
  return <MobileMenuView isOpen={isOpen} styles={styles} NavLinks={NavLinks} />;
};

export default MobileMenu;

MobileMenu.displayName = "MobileMenu";
MobileMenu.View = MobileMenuView;
MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
