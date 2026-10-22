/**
 * useTilt — Hook for smooth 3D perspective tilt on hover.
 */
import { useCallback, useRef, type CSSProperties } from 'react';
import type { TiltOptions } from './types.js';
import { prefersReducedMotion } from './useReducedMotion.js';

export function useTilt<T extends HTMLElement = HTMLDivElement>(options: TiltOptions = {}) {
  const {
    maxTilt = 12,
    perspective = 1000,
    scale = 1.02,
    speed = 300,
    reverse = false,
  } = options;

  const elementRef = useRef<T | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      if (prefersReducedMotion() || !elementRef.current) return;
      const el = elementRef.current;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const mult = reverse ? -1 : 1;
      const rotateX = mult * ((y - centerY) / centerY) * -maxTilt;
      const rotateY = mult * ((x - centerX) / centerX) * maxTilt;

      el.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`;
      el.style.transition = 'transform 80ms ease-out';
    },
    [maxTilt, perspective, scale, reverse]
  );

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return;
    const el = elementRef.current;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
    el.style.transition = `transform ${speed}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
  }, [perspective, speed]);

  const style: CSSProperties = {
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  };

  return {
    ref: elementRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style,
  };
}
