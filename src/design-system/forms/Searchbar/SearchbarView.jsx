/**
 * @fileoverview Presentational component for searchbar form layout and accessibility features
 * Handles search input field, submit button, and proper ARIA attributes for screen readers
 * Provides responsive design with icon integration and form submission handling
 */

import { forwardRef } from "react";
import PropTypes from "prop-types";

/**
 * View component for rendering searchbar form with accessibility and responsive design
 * @component
 * @param {React.ComponentType} SearchIcon - Lucide React search icon component
 * @param {boolean} isOpen - Whether the searchbar is visible/expanded
 * @param {Function} onInputFocus - Handler for search input focus events
 * @param {Function} onSubmit - Handler for form submission
 * @param {Object} styles - CSS module styles object for component styling
 * @param {React.Ref} ref - Forwarded ref for component positioning and animations
 * @returns {JSX.Element} Rendered searchbar form with input field and submit button
 */
const SearchbarView = forwardRef(({ SearchIcon, isOpen, onInputFocus, onSubmit, styles }, ref) => {
  return (
    <div
      ref={ref}
      aria-hidden={!isOpen}
      className={styles.searchbar}
      data-open={isOpen}
      id="searchbar">
      <form className={styles.form} id="search-form" onSubmit={onSubmit}>
        <div className={styles.container}>
          <input
            aria-label="Search for products"
            className={styles.input}
            id="search-input"
            name="search"
            placeholder="Search for products..."
            type="search"
            onFocus={onInputFocus}
          />
          <button aria-label="Submit search" className={styles.button} type="submit">
            <SearchIcon aria-hidden="true" className="h-5 w-5" />
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
