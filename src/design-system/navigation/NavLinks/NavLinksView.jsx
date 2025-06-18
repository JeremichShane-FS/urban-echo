import Link from "next/link";

import Button from "@/design-system/buttons/Button";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "@/config/constants";

import styles from "./NavLinks.module.scss";

const NavLinksView = ({ isMobile = false, navItems }) => {
  const baseClass = isMobile ? styles["item--mobile"] : styles.item;

  return (
    <>
      {navItems.slice(1).map(navItem => {
        const { highlight, id, label, path } = navItem;

        if (highlight) {
          return (
            <Link key={id} href={path} passHref legacyBehavior>
              <Button
                variant={BUTTON_VARIANTS.accent}
                size={BUTTON_SIZES.sm}
                className={styles.button}>
                {label}
              </Button>
            </Link>
          );
        }

        return (
          <Link key={id} href={path} className={baseClass}>
            {label}
          </Link>
        );
      })}
    </>
  );
};

export default NavLinksView;
