/**
 * useReducedMotion — Hook and helper to detect and respond to user motion preferences.
 */
import { useEffect, useState } from 'react';

/**
 * Returns true if the environment prefers reduced motion.
 * SSR safe: returns false if window is not available.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * React hook that dynamically tracks user's prefers-reduced-motion preference.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => prefersReducedMotion());

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    setReducedMotion(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    } else if (typeof (mediaQuery as any).addListener === 'function') {
      (mediaQuery as any).addListener(updatePreference);
      return () => (mediaQuery as any).removeListener(updatePreference);
    }
  }, []);

  return reducedMotion;
}
