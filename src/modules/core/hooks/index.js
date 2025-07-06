/**
 * @fileoverview Barrel export file for custom hooks
 * This file centralizes exports for all custom hooks in the project
 * making imports cleaner and more organized across components.
 *
 * @example - Instead of multiple imports:
 * import { useDebounce } from '@modules/core/hooks/useDebounce';
 * import { useLocalStorage } from '@modules/core/hooks/useLocalStorage';
 * import useToggle from '@modules/core/hooks/useToggle';
 *
 * You can now import from a single location:
 * import { useDebounce, useLocalStorage, useToggle } from '@modules/core/hooks';
 */

// Content Management Hooks
export {
  DEFAULT_ABOUT_CONTENT,
  DEFAULT_HERO_CONTENT,
  DEFAULT_PAGE_CONFIG,
  useAboutContent,
  useHeroContent,
  usePageConfig,
} from "./useContent";

// Utility Hooks
export { useDebounce } from "./useDebounce";
export { useLocalStorage } from "./useLocalStorage";
export { useOutsideClick } from "./useOutsideClick";
export { default as useToggle } from "./useToggle";
