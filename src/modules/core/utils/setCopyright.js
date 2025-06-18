/**
 * Set the copyright text with the current year and provided title.
 * @param {string} title - The title to include in the copyright text
 * @returns {string} Formatted copyright text
 */

export const setCopyright = (title, fallbackYear = "") => {
  const year = typeof window !== "undefined" ? new Date().getFullYear() : fallbackYear;
  return `\u00A9 ${year} ${title}`;
};
