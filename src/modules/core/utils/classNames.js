/**
 * A utility function to conditionally join class names together.
 * Similar to the popular 'clsx' library but lightweight and custom.
 *
 * @param {...(string|number|object|array|undefined|null|boolean)} args - Class names or conditions
 * @returns {string} - Joined class names
 *
 * @example
//  * // Basic usage
 * classNames('foo', 'bar'); // 'foo bar'
 *
 * @example
//  * // Conditional classes
 * classNames('foo', condition && 'bar'); // 'foo bar' if condition is true, 'foo' if false
 *
 * @example
//  * // Object syntax
 * classNames({
 *   'foo': true,
 *   'bar': false,
 *   'baz': condition
 * }); // 'foo baz' (if condition is true)
 *
 * @example
//  * // Mixed usage
 * classNames('foo', { 'bar': true }, condition && 'baz'); // 'foo bar baz'
 */
export function classNames(...args) {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    // Skip falsy values
    if (!arg) continue;

    const argType = typeof arg;

    // Handle strings and numbers
    if (argType === "string" || argType === "number") {
      classes.push(arg);
    }
    // Handle objects
    else if (argType === "object") {
      // Handle arrays
      if (Array.isArray(arg)) {
        // Recursively handle array items
        const inner = classNames(...arg);
        if (inner) {
          classes.push(inner);
        }
      }
      // Handle plain objects
      else {
        for (const key in arg) {
          // Only add class if the value is truthy and key exists
          if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(" ");
}

// shorter version
export function cn(...args) {
  return args.filter(Boolean).join(" ");
}

export default classNames;
