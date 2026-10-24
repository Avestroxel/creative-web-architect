/**
 * ScrollReveal — Viewport-triggered masked reveals and staggered elements.
 */
import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../motion/useReducedMotion.js';

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'mask-slide' | 'scale-in';
  delayMs?: number;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delayMs = 0,
  threshold = 0.15,
  className = '',
  style,
}) => {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getAnimationStyles = (): React.CSSProperties => {
    if (prefersReducedMotion() || isVisible) {
      return {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      };
    }

    switch (animation) {
      case 'fade-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 20px, 0)',
        };
      case 'mask-slide':
        return {
          opacity: 0.2,
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        };
      case 'scale-in':
        return {
          opacity: 0,
          transform: 'scale(0.96)',
        };
    }
  };

  return (
    <div
      ref={domRef}
      className={`cwa-scroll-reveal ${className}`.trim()}
      style={{
        transition: `all 450ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
        willChange: 'transform, opacity',
        ...getAnimationStyles(),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
