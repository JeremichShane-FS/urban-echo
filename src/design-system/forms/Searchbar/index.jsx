import PropTypes from "prop-types";

import SearchbarView from "./SearchbarView";
import useSearchbar from "./useSearchbar";

const Searchbar = ({ isOpen }) => {
  const { handleInputFocus, handleSubmit } = useSearchbar();

  return <SearchbarView isOpen={isOpen} onSubmit={handleSubmit} onInputFocus={handleInputFocus} />;
};

export default Searchbar;

Searchbar.displayName = "Searchbar";
Searchbar.View = SearchbarView;
Searchbar.useSearchbar = useSearchbar;
Searchbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
