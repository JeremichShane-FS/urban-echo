import { memo } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import UrbanEchoLogo from "@assets/images/logo/UrbanEchoLogo";
import { MAIN_NAV_ITEMS } from "@config/constants";
import MenuToggle from "@design-system/buttons/MenuToggle";
import Searchbar from "@design-system/forms/Searchbar";
import Container from "@design-system/layout/Container";
import ActionIcons from "@design-system/navigation/ActionIcons";
import MobileMenu from "@design-system/navigation/MobileMenu";
import NavLinks from "@design-system/navigation/NavLinks";
import { getNavItemById } from "@modules/core/utils/getNavItems";

import styles from "./Navbar.module.scss";

const NavbarView = ({ isMenuOpen, isSearchOpen, toggleMenu, toggleSearch }) => {
  const navLink = getNavItemById("home", MAIN_NAV_ITEMS);

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.inner}>
        <Container>
          <div className={styles.content}>
            <div className={styles.brand}>
              <MenuToggle isOpen={isMenuOpen} setIsOpen={toggleMenu} />
              <Link href={navLink.path} className={styles.logo} aria-label={navLink["aria-label"]}>
                <UrbanEchoLogo />
              </Link>
            </div>

            <div className={styles.navigation} role="navigation" aria-label="Main categories">
              <NavLinks />
            </div>

            <div className={styles.actions}>
              <ActionIcons isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} cartCount={2} />
            </div>
          </div>
        </Container>
      </div>

      <MobileMenu isOpen={isMenuOpen} />
      <Searchbar isOpen={isSearchOpen} />
    </nav>
  );
};

export default memo(NavbarView);

NavbarView.displayName = "NavbarView";
NavbarView.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  isSearchOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
};
