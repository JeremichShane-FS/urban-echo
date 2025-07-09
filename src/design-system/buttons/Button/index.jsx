/**
 * @fileoverview Flexible button component with multiple variants, sizes, and polymorphic rendering
 * Provides consistent button styling and behavior across the application with support for different HTML elements
 * Supports accessibility features, disabled states, and comprehensive styling options for design system consistency
 */

import PropTypes from "prop-types";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "@config/constants";

import styles from "./Button.module.scss";

/**
 * Versatile button component supporting different variants, sizes, and HTML elements
 * @component
 * @param {string} [as="button"] - HTML element or component to render as
 * @param {React.ReactNode} children - Button content
 * @param {string} [className=""] - Additional CSS classes
 * @param {boolean} [disabled=false] - Whether button is disabled
 * @param {Function} [onClick] - Click event handler
 * @param {string} [size="md"] - Button size variant
 * @param {string} [type="button"] - Button type (only applies when as="button")
 * @param {string} [variant="primary"] - Button style variant
 * @returns {JSX.Element} Rendered button component
 */
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
