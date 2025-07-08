/**
 * @fileoverview Custom hook for tracking section visibility with Intersection Observer
 */
import { useEffect, useRef } from "react";

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
