import PropTypes from "prop-types";

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

ActionIcons.displayName = "ActionIcons";
ActionIcons.View = ActionIconsView;
ActionIcons.propTypes = {
  cartCount: PropTypes.number,
  isSearchOpen: PropTypes.bool,
  toggleSearch: PropTypes.func.isRequired,
};
