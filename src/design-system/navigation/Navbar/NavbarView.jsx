/**
 * @fileoverview Presentational component for navbar layout with responsive design and accessibility features
 * Handles responsive navigation structure with logo, main navigation links, and action icons
 * Provides proper ARIA attributes and semantic HTML structure for optimal accessibility and SEO
 */

import { memo } from "react";
import PropTypes from "prop-types";

/**
 * View component for rendering navbar layout with responsive navigation elements and accessibility
 * @component
 * @param {React.ComponentType} ActionIcons - Action icons component for header utilities
 * @param {React.ComponentType} Container - Layout container component for responsive width
 * @param {React.ComponentType} Link - Next.js Link component for client-side navigation
 * @param {React.ComponentType} MenuToggle - Mobile menu toggle button component
 * @param {React.ComponentType} MobileMenu - Mobile navigation menu component
 * @param {React.ComponentType} NavLinks - Main navigation links component
 * @param {React.ComponentType} Searchbar - Search interface component
 * @param {React.ComponentType} UrbanEchoLogo - Brand logo component
 * @param {boolean} isMenuOpen - Whether the mobile menu is currently visible
 * @param {boolean} isSearchOpen - Whether the search panel is currently visible
 * @param {Object} navLink - Home navigation link data with path and aria-label
 * @param {React.RefObject} searchbarRef - Ref object for search component positioning
 * @param {Object} styles - CSS module styles object for component styling
 * @param {Function} toggleMenu - Function to toggle mobile menu visibility
 * @param {Function} toggleSearch - Function to toggle search panel visibility
 * @returns {JSX.Element} Rendered navbar with responsive layout and interactive elements
 */
const NavbarView = ({
  ActionIcons,
  Container,
  Link,
  MenuToggle,
  MobileMenu,
  NavLinks,
  Searchbar,
  UrbanEchoLogo,
  isMenuOpen,
  isSearchOpen,
  navLink,
  searchbarRef,
  styles,
  toggleMenu,
  toggleSearch,
}) => {
  return (
    <nav aria-label="Main navigation" className={styles.navbar}>
      <div className={styles.inner}>
        <Container>
          <div className={styles.content}>
            <div className={styles.brand}>
              <MenuToggle isOpen={isMenuOpen} setIsOpen={toggleMenu} />
              <Link aria-label={navLink["aria-label"]} className={styles.logo} href={navLink.path}>
                <UrbanEchoLogo />
              </Link>
            </div>

            <div aria-label="Main categories" className={styles.navigation} role="navigation">
              <NavLinks />
            </div>

            <div className={styles.actions}>
              <ActionIcons cartCount={2} isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} />
            </div>
          </div>
        </Container>
      </div>

      <MobileMenu isOpen={isMenuOpen} />
      <Searchbar ref={searchbarRef} isOpen={isSearchOpen} />
    </nav>
  );
};

export default memo(NavbarView);

NavbarView.displayName = "NavbarView";
NavbarView.propTypes = {
  ActionIcons: PropTypes.elementType.isRequired,
  Container: PropTypes.elementType.isRequired,
  Link: PropTypes.elementType.isRequired,
  MenuToggle: PropTypes.elementType.isRequired,
  MobileMenu: PropTypes.elementType.isRequired,
  NavLinks: PropTypes.elementType.isRequired,
  Searchbar: PropTypes.elementType.isRequired,
  UrbanEchoLogo: PropTypes.elementType.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  navLink: PropTypes.shape({
    "aria-label": PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  searchbarRef: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
};
