/**
 * @fileoverview Responsive container component for consistent content width and spacing across layouts
 * Provides configurable container sizes, fluid width option, and responsive breakpoint handling
 * Serves as the foundation layout component for maintaining consistent content alignment and max-widths
 */

import PropTypes from "prop-types";

import styles from "./Container.module.scss";

/**
 * Flexible container component with responsive sizing and fluid width options
 * @component
 * @param {React.ReactNode} children - Content to be wrapped within the container
 * @param {string} [className=""] - Additional CSS classes for custom styling
 * @param {boolean} fluid - Whether container should span full width without max-width constraints
 * @param {string} size - Predefined container size variant (sm, md, lg, xl)
 * @returns {JSX.Element} Rendered container div with appropriate sizing classes
 */
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
