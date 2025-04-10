import { useCallback, useMemo } from "react";
import {
  ACCOUNT_NAV_ITEMS,
  FOOTER_NAV_SECTIONS,
  MAIN_NAV_ITEMS,
} from "@config/constants/navigation-constants";

export function useNavigation() {
  // Build indexes for fast lookups - only computed once per component instance
  const { itemsById, pathsMap } = useMemo(() => {
    const pathsMap = new Map();
    const itemsById = new Map();

    // Index main navigation
    MAIN_NAV_ITEMS.forEach(item => {
      if (item.id) {
        pathsMap.set(item.id, item.path);
        itemsById.set(item.id, item);
      }
    });

    // Index account navigation
    ACCOUNT_NAV_ITEMS.forEach(item => {
      if (item.id) {
        // Don't overwrite existing paths unless it's a special case
        if (!pathsMap.has(item.id) || item.id === "cart" || item.id === "account") {
          pathsMap.set(item.id, item.path);
        }
        itemsById.set(`account_${item.id}`, item);
      }
    });

    // Index footer navigation
    FOOTER_NAV_SECTIONS.forEach(section => {
      section.links.forEach(link => {
        const path = link.path;
        if (path) {
          // Extract ID from path (e.g., "/shop/men" -> "men")
          const pathSegments = path.split("/").filter(Boolean);
          const lastSegment = pathSegments[pathSegments.length - 1];

          if (lastSegment && !pathsMap.has(lastSegment)) {
            pathsMap.set(lastSegment, path);
          }

          // Also map by label for convenience
          const normalizedLabel = link.label.toLowerCase().replace(/\s+/g, "-");
          if (!pathsMap.has(normalizedLabel)) {
            pathsMap.set(normalizedLabel, path);
          }
        }
      });
    });

    return { pathsMap, itemsById };
  }, []);

  // Fast path lookup by ID - wrapped in useCallback to stabilize reference
  const getPathById = useCallback(
    (id, defaultPath = "/") => {
      if (!id) return defaultPath;

      const normalizedId = id.toLowerCase();
      if (pathsMap.has(normalizedId)) {
        return pathsMap.get(normalizedId);
      }

      // Convert camelCase to kebab-case as fallback
      const kebabId = normalizedId.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      if (pathsMap.has(kebabId)) {
        return pathsMap.get(kebabId);
      }

      return defaultPath;
    },
    [pathsMap]
  );

  // Fast nav item lookup
  const getNavItemById = useCallback(
    (id, section = null) => {
      if (!id) return null;

      if (section === "account") {
        return itemsById.get(`account_${id}`) || null;
      }

      if (section === "main") {
        return itemsById.get(id) || null;
      }

      // Try both if section not specified
      return itemsById.get(id) || itemsById.get(`account_${id}`) || null;
    },
    [itemsById]
  );

  // Common paths object
  const paths = useMemo(() => {
    // Pre-calculated common paths for instant access
    return {
      home: getPathById("home", "/"),
      shop: getPathById("shop", "/shop"),
      account: getPathById("profile", "/account"),
      cart: getPathById("cart", "/cart"),
      wishlist: getPathById("wishlist", "/account/wishlist"),
      // Dynamic getter for any other path
      get: getPathById,
    };
  }, [getPathById]);

  return {
    getPathById,
    getNavItemById,
    paths,
    MAIN_NAV_ITEMS,
    ACCOUNT_NAV_ITEMS,
    FOOTER_NAV_SECTIONS,
  };
}
