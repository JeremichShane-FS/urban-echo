import { useNavigation } from "@modules/core/hooks/useNavigation";
import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

import styles from "./ActionIcons.module.scss";

const ActionIconsView = ({ cartCount = 0, isSearchOpen, toggleSearch }) => {
  const { paths } = useNavigation();
  return (
    <>
      <button
        type="button"
        className={`${styles["action-icons__button"]} ${styles["action-icons__button--search"]}`}
        onClick={toggleSearch}
        aria-expanded={isSearchOpen}
        aria-controls="search-panel"
        aria-label="Search">
        <Search className="h-6 w-6" aria-hidden="true" />
      </button>

      <Link href={paths.account} className={styles["action-icons__button"]} aria-label="My account">
        <User className="h-6 w-6" aria-hidden="true" />
      </Link>

      <Link
        href={paths.cart}
        className={`${styles["action-icons__button"]} ${styles["action-icons__button--cart"]}`}
        aria-label={`Shopping cart with ${cartCount} items`}>
        <ShoppingBag className="h-6 w-6" aria-hidden="true" />
        {cartCount > 0 && <span className={styles["action-icons__cart-count"]}>{cartCount}</span>}
      </Link>
    </>
  );
};

export default ActionIconsView;
