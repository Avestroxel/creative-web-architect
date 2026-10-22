/**
 * LiquidGlassDock — A macOS-style dock with magnification effect.
 */
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import type { LiquidGlassBaseProps } from './types.js';

export interface LiquidGlassDockProps extends LiquidGlassBaseProps {
  children: React.ReactNode;
  /** Position of the dock */
  position?: 'bottom' | 'left' | 'right';
  /** Enable magnification on hover */
  magnify?: boolean;
  /** Magnification factor */
  magnifyScale?: number;
}

export const LiquidGlassDock = forwardRef<HTMLDivElement, LiquidGlassDockProps>(
  function LiquidGlassDock(
    {
      children,
      position = 'bottom',
      magnify = true,
      magnifyScale = 1.4,
      variant = 'light',
      blur = 24,
      opacity,
      radius = 18,
      border = true,
      className = '',
      style,
      ...rest
    },
    ref
  ) {
    const variantBg: Record<string, string> = {
      light: `hsl(0 0% 100% / ${opacity ?? 0.4})`,
      dark: `hsl(220 20% 10% / ${opacity ?? 0.5})`,
      adaptive: `hsl(0 0% 50% / ${opacity ?? 0.3})`,
    };

    const positionStyles: Record<string, React.CSSProperties> = {
      bottom: {
        position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
        flexDirection: 'row',
      },
      left: {
        position: 'fixed', left: '1rem', top: '50%', transform: 'translateY(-50%)',
        flexDirection: 'column',
      },
      right: {
        position: 'fixed', right: '1rem', top: '50%', transform: 'translateY(-50%)',
        flexDirection: 'column',
      },
    };

    const baseStyle: React.CSSProperties = {
      ...positionStyles[position],
      display: 'flex',
      gap: '0.5rem',
      padding: '0.5rem 0.75rem',
      background: variantBg[variant],
      backdropFilter: `blur(${blur}px) saturate(200%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(200%)`,
      border: border ? `1px solid ${variant === 'dark' ? 'hsl(0 0% 100% / 0.08)' : 'hsl(0 0% 100% / 0.3)'}` : 'none',
      borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
      boxShadow: '0 8px 32px hsl(0 0% 0% / 0.1), inset 0 1px 0 hsl(0 0% 100% / 0.4)',
      zIndex: 90,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={`lg-dock ${className}`.trim()}
        style={baseStyle}
        role="toolbar"
        {...rest}
      >
        {children}
      </div>
    );
  }
);
