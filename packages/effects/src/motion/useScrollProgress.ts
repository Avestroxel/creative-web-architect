/**
 * useScrollProgress — Track scroll progress (0 to 1) for the window or an element.
 */
import { useEffect, useState, type RefObject } from 'react';

export interface UseScrollProgressOptions {
  target?: RefObject<HTMLElement | null>;
  offset?: [number, number]; // [start, end] from 0 to 1
}

export function useScrollProgress(options: UseScrollProgressOptions = {}): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const updateProgress = () => {
      if (options.target && options.target.current) {
        const el = options.target.current;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;

        // Progress: 0 when element enters viewport bottom, 1 when it exits top
        const total = windowHeight + elementHeight;
        const current = windowHeight - elementTop;
        const raw = current / total;
        setProgress(Math.max(0, Math.min(1, raw)));
      } else {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const raw = docHeight > 0 ? scrollTop / docHeight : 0;
        setProgress(Math.max(0, Math.min(1, raw)));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [options.target]);

  return progress;
}
