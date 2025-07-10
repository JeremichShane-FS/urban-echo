/**
 * @fileoverview Centralized barrel export file for custom React hooks in the core module
 * Provides unified access to content management hooks, utility hooks, and common constants
 * Simplifies import statements across components and maintains clean project architecture
 * Exports both named exports and default exports with consistent API patterns
 *
 * @example
 * // Instead of multiple imports:
 * import { useDebounce } from '@modules/core/hooks/useDebounce';
 * import { useLocalStorage } from '@modules/core/hooks/useLocalStorage';
 * import { useToggle } from '@modules/core/hooks/useToggle';
 *
 * // You can now import from a single location:
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
export { useToggle } from "./useToggle";
