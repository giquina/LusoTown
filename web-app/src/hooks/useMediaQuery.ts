import { useState, useEffect } from 'react';

/**
 * Hook to detect media query matches
 * @param query - CSS media query string
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    
    // Set initial state
    setMatches(mediaQuery.matches);

    // Define the event handler
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
    }

    // Cleanup function
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}

/**
 * Common breakpoint hooks for convenience
 */
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');
export const useIsLargeScreen = () => useMediaQuery('(min-width: 1440px)');

/**
 * Hook to get current screen size category
 */
export function useScreenSize(): 'mobile' | 'tablet' | 'desktop' | 'large' {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px) and (max-width: 1439px)');
  const isLarge = useMediaQuery('(min-width: 1440px)');

  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  if (isDesktop) return 'desktop';
  if (isLarge) return 'large';
  
  return 'desktop'; // fallback
}

/**
 * Hook to detect if user prefers reduced motion
 */
export const usePrefersReducedMotion = () => 
  useMediaQuery('(prefers-reduced-motion: reduce)');

/**
 * Hook to detect dark mode preference
 */
export const usePrefersDarkMode = () => 
  useMediaQuery('(prefers-color-scheme: dark)');

/**
 * Hook to detect touch capability
 */
export const useIsTouchDevice = () => 
  useMediaQuery('(hover: none) and (pointer: coarse)');