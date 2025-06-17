import styles from "./Container.module.scss";

export default function Container({ children, className = "", fluid, size }) {
  const sizeClass = size ? `${styles[`container--${size}`]}` : "";
  const fluidClass = fluid ? `${styles["container--fluid"]}` : "";
  const containerClass = !size && !fluid ? `${styles.container}` : "";

  return (
    <div className={`${containerClass} ${sizeClass} ${fluidClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
