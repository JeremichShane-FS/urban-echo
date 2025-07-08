import { forwardRef } from "react";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

import SearchbarView from "./SearchbarView";
import useSearchbar from "./useSearchbar";

import styles from "./Searchbar.module.scss";

const Searchbar = forwardRef(({ isOpen }, ref) => {
  const { handleInputFocus, handleSubmit } = useSearchbar();

  return (
    <SearchbarView
      ref={ref}
      isOpen={isOpen}
      SearchIcon={Search}
      styles={styles}
      onSubmit={handleSubmit}
      onInputFocus={handleInputFocus}
    />
  );
});

Searchbar.displayName = "Searchbar";
Searchbar.View = SearchbarView;
Searchbar.useSearchbar = useSearchbar;
Searchbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Searchbar;
