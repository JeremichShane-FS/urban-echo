import Link from "next/link";
import PropTypes from "prop-types";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "@config/constants";
import Button from "@design-system/buttons/Button";

import NavLinksView from "./NavLinksView";
import useNavLinks from "./useNavLinks";

import styles from "./NavLinks.module.scss";

const NavLinks = ({ isMobile = false }) => {
  const { navItems } = useNavLinks();

  return (
    <NavLinksView
      navItems={navItems}
      styles={styles}
      Link={Link}
      BUTTON_SIZES={BUTTON_SIZES}
      BUTTON_VARIANTS={BUTTON_VARIANTS}
      Button={Button}
      baseClass={isMobile ? styles["item--mobile"] : styles.item}
    />
  );
};

export default NavLinks;

NavLinks.displayName = "NavLinks";
NavLinks.View = NavLinksView;
NavLinks.useNavLinks = useNavLinks;
NavLinks.propTypes = {
  isMobile: PropTypes.bool,
};
