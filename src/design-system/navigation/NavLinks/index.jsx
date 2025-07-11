/**
 * @fileoverview Navigation links component providing main site navigation with responsive mobile/desktop variants
 * Renders navigation items with conditional styling for highlighted items and mobile-specific layouts
 * Integrates with button components for special promotional links and maintains consistent navigation structure
 */

import Link from "next/link";
import PropTypes from "prop-types";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "@config/constants";
import Button from "@design-system/buttons/Button";

import NavLinksView from "./NavLinksView";
import useNavLinks from "./useNavLinks";

import styles from "./NavLinks.module.scss";

/**
 * Container component for navigation links with responsive mobile/desktop rendering
 * @component
 * @param {boolean} [isMobile=false] - Whether to render with mobile-specific styling and layout
 * @returns {JSX.Element} Rendered navigation links with conditional styling and button integration
 */
const NavLinks = ({ isMobile = false }) => {
  const { navItems } = useNavLinks();

  return (
    <NavLinksView
      BUTTON_SIZES={BUTTON_SIZES}
      BUTTON_VARIANTS={BUTTON_VARIANTS}
      Button={Button}
      Link={Link}
      baseClass={isMobile ? styles["item--mobile"] : styles.item}
      navItems={navItems}
      styles={styles}
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
