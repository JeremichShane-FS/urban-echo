/**
 * @fileoverview Searchbar component for product search functionality with toggle visibility
 * Provides form submission handling, analytics tracking, and responsive search interface
 * Integrates with Lucide React icons and forwards refs for positioning and animation control
 */

import { forwardRef } from "react";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

import SearchbarView from "./SearchbarView";
import useSearchbar from "./useSearchbar";

import styles from "./Searchbar.module.scss";

/**
 * Container component for searchbar with form handling and analytics integration
 * @component
 * @param {boolean} isOpen - Whether the searchbar is visible/expanded
 * @param {React.Ref} ref - Forwarded ref for component positioning and animations
 * @returns {JSX.Element} Rendered searchbar component with form submission handling
 */
const Searchbar = forwardRef(({ isOpen }, ref) => {
  const { handleInputFocus, handleSubmit } = useSearchbar();

  return (
    <SearchbarView
      ref={ref}
      SearchIcon={Search}
      isOpen={isOpen}
      styles={styles}
      onInputFocus={handleInputFocus}
      onSubmit={handleSubmit}
    />
  );
});

export default Searchbar;

Searchbar.displayName = "Searchbar";
Searchbar.View = SearchbarView;
Searchbar.useSearchbar = useSearchbar;
Searchbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
