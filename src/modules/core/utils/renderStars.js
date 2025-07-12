/**
 * @fileoverview React utility function for rendering star rating displays with CSS styling
 * Provides consistent star rating visualization across product cards, reviews, and rating components
 * Generates dynamic star arrays based on rating values with filled/empty state management
 * Supports CSS Modules styling and customizable visual presentation for different contexts
 */

/**
 * Renders a star rating display as React elements with dynamic filled/empty states
 * @function renderStars
 * @param {number|null|undefined} rating - The rating value to display (0-5 scale)
 * @param {Object} styles - CSS Modules styles object containing star styling classes
 * @param {string} styles.star-filled - CSS class for filled stars (rating covered)
 * @param {string} styles.star-empty - CSS class for empty stars (rating not covered)
 * @returns {Array<JSX.Element>|null} Array of star span elements or null if no rating provided
 *
 * @description
 * Creates a visual star rating display:
 * - Generates 5 star elements total for consistent layout
 * - Fills stars based on Math.floor(rating) for whole number ratings
 * - Uses Unicode star character (★) for universal rendering
 * - Applies CSS classes for filled vs empty state styling
 * - Returns null for falsy ratings to prevent rendering errors
 *
 * @example
 * // In a product card component
 * const styles = {
 *   'star-filled': 'text-yellow-500',
 *   'star-empty': 'text-gray-300'
 * };
 *
 * {renderStars(4.2, styles)}
 * // Renders: 4 filled stars + 1 empty star (Math.floor(4.2) = 4)
 *
 * @example
 * // In a review component
 * {renderStars(5, styles)}
 * // Renders: 5 filled stars (perfect rating)
 *
 * @example
 * // Handling no rating
 * {renderStars(null, styles)}
 * // Returns: null (prevents rendering empty stars)
 */
export const renderStars = (rating, styles) => {
  if (!rating) return null;
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.floor(rating) ? styles["star-filled"] : styles["star-empty"]}>
      ★
    </span>
  ));
};
