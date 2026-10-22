/**
 * LiquidGlassTooltip — A tooltip with glass styling.
 */
import React, { forwardRef, useState, useRef } from 'react';
import type { LiquidGlassBaseProps } from './types.js';

export interface LiquidGlassTooltipProps extends LiquidGlassBaseProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const LiquidGlassTooltip = forwardRef<HTMLDivElement, LiquidGlassTooltipProps>(
  function LiquidGlassTooltip(
    { children, content, position = 'top', variant = 'dark', blur = 16, radius = 8, className = '', style, ...rest },
    ref
  ) {
    const [visible, setVisible] = useState(false);

    const positionStyles: Record<string, React.CSSProperties> = {
      top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' },
      bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' },
      left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' },
      right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' },
    };

    return (
      <div
        ref={ref}
        style={{ position: 'relative', display: 'inline-block', ...style }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className={className}
      >
        {children}
        {visible && (
          <div
            role="tooltip"
            style={{
              position: 'absolute',
              ...positionStyles[position],
              padding: '0.5rem 0.75rem',
              background: variant === 'dark' ? 'hsl(220 20% 10% / 0.8)' : 'hsl(0 0% 100% / 0.8)',
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              border: '1px solid hsl(0 0% 100% / 0.1)',
              borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
              color: variant === 'dark' ? 'hsl(0 0% 95%)' : 'hsl(222 20% 13%)',
              fontSize: '0.8125rem',
              whiteSpace: 'nowrap',
              zIndex: 1000,
              boxShadow: '0 4px 12px hsl(0 0% 0% / 0.15)',
              animation: 'fadeIn 150ms ease',
              pointerEvents: 'none',
            }}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);
