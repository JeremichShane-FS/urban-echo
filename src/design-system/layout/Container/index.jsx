import PropTypes from "prop-types";

import styles from "./Container.module.scss";

const Container = ({ children, className = "", fluid, size }) => {
  const sizeClass = size ? `${styles[`container--${size}`]}` : "";
  const fluidClass = fluid ? `${styles["container--fluid"]}` : "";
  const containerClass = !size && !fluid ? `${styles.container}` : "";

  return (
    <div className={`${containerClass} ${sizeClass} ${fluidClass} ${className}`.trim()}>
      {children}
    </div>
  );
};

export default Container;

Container.displayName = "Container";
Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fluid: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
};
