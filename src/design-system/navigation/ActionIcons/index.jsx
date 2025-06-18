import ActionIconsView from "./ActionIconsView";

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
