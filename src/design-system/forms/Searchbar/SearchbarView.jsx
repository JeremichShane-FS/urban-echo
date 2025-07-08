import { forwardRef } from "react";
import PropTypes from "prop-types";

const SearchbarView = forwardRef(({ SearchIcon, isOpen, onInputFocus, onSubmit, styles }, ref) => {
  return (
    <div
      ref={ref}
      id="searchbar"
      className={styles.searchbar}
      data-open={isOpen}
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
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
});

SearchbarView.displayName = "SearchbarView";
SearchbarView.propTypes = {
  SearchIcon: PropTypes.elementType.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  styles: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default SearchbarView;
