/**
 * useGlassHighlight — React hook for pointer-responsive glass highlights (Level 2).
 *
 * Tracks mouse position over an element and sets CSS custom properties
 * for highlight position, enabling radial gradient overlays.
 */
import { useCallback, useRef, useEffect } from 'react';

interface UseGlassHighlightOptions {
  /** Whether to enable the effect */
  enabled?: boolean;
  /** Highlight radius in pixels */
  radius?: number;
}

export function useGlassHighlight<T extends HTMLElement>(
  options: UseGlassHighlightOptions = {}
) {
  const { enabled = true, radius = 300 } = options;
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty('--glass-highlight-x', `${x}px`);
      el.style.setProperty('--glass-highlight-y', `${y}px`);
      el.style.setProperty('--glass-highlight-radius', `${radius}px`);
      el.style.setProperty('--glass-highlight-opacity', '1');
    },
    [radius]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--glass-highlight-opacity', '0');
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, handleMouseMove, handleMouseLeave]);

  return ref;
}
