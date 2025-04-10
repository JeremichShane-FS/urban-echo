import SearchbarView from "./SearchbarView";
import useSearchbar from "./useSearchbar";

const Searchbar = ({ isOpen }) => {
  const { handleSubmit } = useSearchbar();

  return <SearchbarView isOpen={isOpen} onSubmit={handleSubmit} />;
};

export default Searchbar;
