import { Search } from "lucide-react";
import PropTypes from "prop-types";

import styles from "./Searchbar.module.scss";

const SearchbarView = ({ isOpen, onInputFocus, onSubmit }) => {
  return (
    <div
      id="searchbar"
      className={isOpen ? styles.searchbar : `${styles.searchbar} ${styles["searchbar--hidden"]}`}
      aria-hidden={!isOpen}>
      <form id="search-form" className={styles.form} onSubmit={onSubmit}>
        <div className={styles.container}>
          <input
            id="search-input"
            type="search"
            name="search"
            className={styles.input}
            placeholder="Search for products..."
            aria-label="Search for products"
            onFocus={onInputFocus}
          />
          <button type="submit" className={styles.button} aria-label="Submit search">
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchbarView;

SearchbarView.displayName = "SearchbarView";
SearchbarView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
};
