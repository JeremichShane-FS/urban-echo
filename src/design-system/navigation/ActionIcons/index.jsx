import ActionIconsView from "./ActionIconsView";
// import useActionIcons from "./useActionIcons";

const ActionIcons = ({ cartCount = 0, isSearchOpen, toggleSearch }) => {
  return (
    <ActionIconsView
      isSearchOpen={isSearchOpen}
      toggleSearch={toggleSearch}
      cartCount={cartCount}
    />
  );
};

export default ActionIcons;
