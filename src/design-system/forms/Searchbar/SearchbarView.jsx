import { Search } from "lucide-react";

import styles from "./Searchbar.module.scss";

const SearchbarView = ({ isOpen, onSubmit }) => {
  return (
    <div
      id="searchbar"
      className={isOpen ? styles["searchbar"] : `${styles["searchbar"]} ${styles.hidden}`}
      aria-hidden={!isOpen}>
      <form className={styles["searchbar__form"]} onSubmit={onSubmit}>
        <div className={styles["searchbar__input-container"]}>
          <input
            type="search"
            className={styles["searchbar__input"]}
            placeholder="Search for products..."
            aria-label="Search for products"
          />
          <button type="submit" className={styles["searchbar__button"]} aria-label="Submit search">
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchbarView;
