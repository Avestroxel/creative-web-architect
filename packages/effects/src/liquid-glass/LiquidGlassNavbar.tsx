/**
 * LiquidGlassNavbar — A fixed, translucent navigation bar with frosted glass effect.
 */
import React, { forwardRef, useState, useEffect } from 'react';
import type { LiquidGlassBaseProps } from './types.js';

export interface LiquidGlassNavbarProps extends LiquidGlassBaseProps {
  children: React.ReactNode;
  /** Whether to increase blur on scroll */
  scrollAdaptive?: boolean;
  /** Accessible navigation label */
  'aria-label'?: string;
}

export const LiquidGlassNavbar = forwardRef<HTMLElement, LiquidGlassNavbarProps>(
  function LiquidGlassNavbar(
    {
      children,
      scrollAdaptive = true,
      variant = 'light',
      blur = 20,
      opacity,
      radius = 0,
      border = true,
      className = '',
      style,
      ...rest
    },
    ref
  ) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      if (!scrollAdaptive) return;

      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollAdaptive]);

    const currentOpacity = opacity ?? (scrolled ? 0.75 : 0.6);
    const currentBlur = scrolled ? blur * 1.5 : blur;

    const variantBg: Record<string, string> = {
      light: `hsl(0 0% 100% / ${currentOpacity})`,
      dark: `hsl(220 20% 8% / ${currentOpacity})`,
      adaptive: `hsl(0 0% 50% / ${currentOpacity * 0.6})`,
    };

    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0.75rem 1.5rem',
      background: variantBg[variant],
      backdropFilter: `blur(${currentBlur}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${currentBlur}px) saturate(180%)`,
      borderBottom: border ? `1px solid ${variant === 'dark' ? 'hsl(0 0% 100% / 0.06)' : 'hsl(0 0% 100% / 0.2)'}` : 'none',
      borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
      boxShadow: scrolled ? '0 1px 3px hsl(0 0% 0% / 0.06)' : 'none',
      transition: 'all 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...style,
    };

    return (
      <nav
        ref={ref}
        className={`lg-navbar ${className}`.trim()}
        style={baseStyle}
        aria-label={rest['aria-label'] || 'Main navigation'}
        {...rest}
      >
        {children}
      </nav>
    );
  }
);
