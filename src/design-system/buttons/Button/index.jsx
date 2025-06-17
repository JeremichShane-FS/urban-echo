import { BUTTON_SIZES, BUTTON_VARIANTS } from "@/config/constants/ui-constants";

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
      onClick={onClick}
      disabled={disabled}
      {...props}>
      {children}
    </Component>
  );
};

export default Button;
