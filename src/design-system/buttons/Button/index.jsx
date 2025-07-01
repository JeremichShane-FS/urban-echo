import PropTypes from "prop-types";

<<<<<<< HEAD
import { BUTTON_SIZES, BUTTON_VARIANTS } from "@config/constants";
=======
import { BUTTON_SIZES, BUTTON_VARIANTS } from "@config/constants/ui-constants";
>>>>>>> origin/main

import styles from "./Button.module.scss";

const Button = ({
  as = "button",
  children,
  className = "",
  disabled = false,
  onClick,
  size = BUTTON_SIZES.md,
  type = "button",
  variant = BUTTON_VARIANTS.primary,
  ...props
}) => {
  const Component = as;

  return (
    <Component
      type={as === "button" ? type : undefined}
      className={`${styles["button"]} ${styles[`button-${variant}`]} ${
        styles[`button-${size}`]
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}>
      {children}
    </Component>
  );
};

export default Button;

Button.displayName = "Button";
Button.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  type: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
};
