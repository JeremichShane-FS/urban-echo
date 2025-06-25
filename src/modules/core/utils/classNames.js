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
function handleObject(arg, classes) {
  for (const key in arg) {
    if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
      classes.push(key);
    }
  }
}

function handleArray(arg, classes) {
  const inner = classNames(...arg);
  if (inner) {
    classes.push(inner);
  }
}

export function classNames(...args) {
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
}

// shorter version
export function cn(...args) {
  return args.filter(Boolean).join(" ");
}

export default classNames;
