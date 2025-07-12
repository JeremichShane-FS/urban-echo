/**
 * @fileoverview Utility functions for conditional CSS class name joining and manipulation
 * Provides lightweight alternatives to external libraries like 'clsx' with support for multiple input types
 * Handles strings, numbers, objects, arrays, and conditional expressions for flexible class composition
 * Includes both full-featured and simplified versions for different use cases and performance requirements
 *
 * @function classNames
 * @param {...(string|number|object|array|undefined|null|boolean)} args - Class names or conditions
 * @returns {string} - Joined class names as a single space-separated string
 *
 * @example
 * // Basic usage
 * classNames('foo', 'bar'); // 'foo bar'
 *
 * @example
 * // Conditional classes
 * classNames('foo', condition && 'bar'); // 'foo bar' if condition is true, 'foo' if false
 *
 * @example
 * // Object syntax
 * classNames({
 *   'foo': true,
 *   'bar': false,
 *   'baz': condition
 * }); // 'foo baz' (if condition is true)
 *
 * @example
 * // Mixed usage
 * classNames('foo', { 'bar': true }, condition && 'baz'); // 'foo bar baz'
 */

/**
 * Handles object argument by checking each key's truthiness and adding valid keys to classes array
 * @function handleObject
 * @param {Object} arg - Object with class names as keys and boolean values
 * @param {Array<string>} classes - Array to push valid class names into
 * @returns {void}
 */
function handleObject(arg, classes) {
  for (const key in arg) {
    if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
      classes.push(key);
    }
  }
}

/**
 * Handles array argument by recursively calling classNames and adding result to classes array
 * @function handleArray
 * @param {Array} arg - Array of class name arguments to process recursively
 * @param {Array<string>} classes - Array to push valid class names into
 * @returns {void}
 */
function handleArray(arg, classes) {
  const inner = classNames(...arg);
  if (inner) {
    classes.push(inner);
  }
}

/**
 * Main classNames function that processes multiple argument types and returns joined class string
 * @function classNames
 * @param {...(string|number|object|array|undefined|null|boolean)} args - Variable arguments of different types
 * @returns {string} Space-separated string of valid class names
 */
const classNames = (...args) => {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const argType = typeof arg;
    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (argType === "object") {
      if (Array.isArray(arg)) {
        handleArray(arg, classes);
      } else {
        handleObject(arg, classes);
      }
    }
  }

  return classes.join(" ");
};

/**
 * Simplified className utility function for basic use cases with better performance
 * @function cn
 * @param {...(string|number|undefined|null|boolean)} args - Variable arguments that are truthy strings/numbers
 * @returns {string} Space-separated string of valid class names
 * @description
 * Shorter version that filters out falsy values and joins remaining arguments.
 * Use this for simple cases where you don't need object/array support but want better performance.
 *
 * @example
 * cn('base-class', isActive && 'active', 'other-class'); // 'base-class active other-class'
 * cn('btn', size === 'large' && 'btn-lg'); // 'btn btn-lg' (if size is 'large')
 */
const cn = (...args) => {
  return args.filter(Boolean).join(" ");
};

export { classNames, cn };
