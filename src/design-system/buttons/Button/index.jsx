import styles from "./Button.module.scss";

const Button = ({
  children,
  className = "",
  disabled = false,
  onClick,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${styles["button"]} ${styles[`button-${variant}`]} ${
        styles[`button-${size}`]
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
