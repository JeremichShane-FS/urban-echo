/**
 * Track user interactions with Google Analytics
 * @param {string} action - The action being tracked (e.g., 'click', 'view')
 * @param {string} category - The category of the event
 * @param {string} label - The label for the event
 * @param {number|Object} [valueOrData] - Optional numeric value OR additional data object
 */
export const trackEvent = (action, category, label, valueOrData = undefined) => {
  if (typeof window !== "undefined" && window.gtag) {
    const baseEvent = {
      event_category: category,
      event_label: label,
    };

    if (valueOrData !== undefined) {
      if (typeof valueOrData === "number") {
        baseEvent.value = valueOrData;
      } else if (typeof valueOrData === "object") {
        Object.assign(baseEvent, valueOrData);
      }
    }

    window.gtag("event", action, baseEvent);
  }
};

/**
 * Track click events specifically
 * @param {string} category - The category of the click
 * @param {string} label - The label for the click
 */
export const trackClick = (category, label) => {
  trackEvent("click", category, label);
};

/**
 * Track page views
 * @param {string} page - The page being viewed
 */
export const trackPageView = page => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: page,
    });
  }
};
