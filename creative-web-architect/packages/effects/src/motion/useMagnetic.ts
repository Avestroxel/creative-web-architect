/**
 * useMagnetic — Magnetic hover attraction for interactive elements.
 */
import { useCallback, useRef } from 'react';
import type { MagneticOptions } from './types.js';
import { prefersReducedMotion } from './useReducedMotion.js';

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(options: MagneticOptions = {}) {
  const { radius = 100, strength = 0.35, ease = 0.2 } = options;
  const elementRef = useRef<T | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (prefersReducedMotion() || !elementRef.current) return;
      const el = elementRef.current;
      const rect = el.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < radius) {
        const pullX = deltaX * strength;
        const pullY = deltaY * strength;
        el.style.transform = `translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0)`;
        el.style.transition = 'transform 100ms ease-out';
      }
    },
    [radius, strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return;
    const el = elementRef.current;
    el.style.transform = 'translate3d(0, 0, 0)';
    el.style.transition = 'transform 350ms cubic-bezier(0.2, 0.9, 0.3, 1)';
  }, []);

  return {
    ref: elementRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
