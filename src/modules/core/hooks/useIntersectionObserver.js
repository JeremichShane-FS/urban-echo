/**
 * @fileoverview Custom hook for tracking section visibility with Intersection Observer API
 * Provides viewport visibility detection for homepage sections with configurable threshold
 * Enables analytics tracking, navigation highlighting, and progressive content loading
 */

import { useEffect, useRef } from "react";

/**
 * Hook for observing section visibility using Intersection Observer API
 * @param {Function} onSectionView - Callback function triggered when a section becomes visible
 * @returns {Object} Object containing refs for each observable section
 * @returns {React.RefObject} returns.heroRef - Ref for hero section element
 * @returns {React.RefObject} returns.featuredRef - Ref for featured products section element
 * @returns {React.RefObject} returns.newsletterRef - Ref for newsletter signup section element
 * @returns {React.RefObject} returns.newArrivalsRef - Ref for new arrivals section element
 * @returns {React.RefObject} returns.aboutRef - Ref for about section element
 */
export const useIntersectionObserver = onSectionView => {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const newsletterRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.dataset.section;
            if (sectionName) {
              onSectionView(sectionName);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = [heroRef, featuredRef, newsletterRef, newArrivalsRef, aboutRef];
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [onSectionView]);

  return {
    heroRef,
    featuredRef,
    newsletterRef,
    newArrivalsRef,
    aboutRef,
  };
};
