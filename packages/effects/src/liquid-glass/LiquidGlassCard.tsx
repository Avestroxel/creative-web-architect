/**
 * LiquidGlassCard — A translucent card container with frosted glass effect.
 */
import React, { forwardRef } from 'react';
import type { LiquidGlassBaseProps } from './types.js';
import { useGlassHighlight } from './useGlassHighlight.js';

export interface LiquidGlassCardProps extends LiquidGlassBaseProps {
  children: React.ReactNode;
  /** Whether the card is interactive (adds hover effects) */
  interactive?: boolean;
  /** Card padding */
  padding?: string | number;
  /** Click handler for interactive cards */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Accessible role */
  role?: string;
}

export const LiquidGlassCard = forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  function LiquidGlassCard(
    {
      children,
      interactive = false,
      padding = '1.5rem',
      onClick,
      role,
      variant = 'light',
      level = 1,
      tint,
      opacity,
      blur = 24,
      radius = 20,
      border = true,
      highlightIntensity = 0.12,
      motionIntensity = 1,
      disabled = false,
      className = '',
      style,
      ...rest
    },
    forwardedRef
  ) {
    const highlightRef = useGlassHighlight<HTMLDivElement>({
      enabled: level >= 2 && !disabled,
    });

    const ref = forwardedRef || highlightRef;

    const variantBg: Record<string, string> = {
      light: `hsl(0 0% 100% / ${opacity ?? 0.5})`,
      dark: `hsl(220 20% 10% / ${opacity ?? 0.55})`,
      adaptive: `hsl(0 0% 50% / ${opacity ?? 0.3})`,
    };

    const variantBorder: Record<string, string> = {
      light: 'hsl(0 0% 100% / 0.25)',
      dark: 'hsl(0 0% 100% / 0.08)',
      adaptive: 'hsl(0 0% 100% / 0.15)',
    };

    const baseStyle: React.CSSProperties = {
      padding: typeof padding === 'number' ? `${padding}px` : padding,
      background: tint || variantBg[variant],
      backdropFilter: `blur(${blur}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
      border: border ? `1px solid ${variantBorder[variant]}` : 'none',
      borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
      boxShadow: [
        `0 0 0 0.5px ${variant === 'light' ? 'hsl(0 0% 100% / 0.15)' : 'hsl(0 0% 100% / 0.05)'}`,
        '0 12px 40px hsl(0 0% 0% / 0.08)',
      ].join(', '),
      transition: interactive && motionIntensity > 0
        ? `transform ${300 * motionIntensity}ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow ${300 * motionIntensity}ms cubic-bezier(0.25, 0.1, 0.25, 1)`
        : undefined,
      cursor: interactive ? 'pointer' : 'default',
      position: 'relative' as const,
      overflow: 'hidden',
      ...style,
    };

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={`lg-card ${className}`.trim()}
        style={baseStyle}
        onClick={interactive ? onClick : undefined}
        role={role || (interactive ? 'button' : undefined)}
        tabIndex={interactive ? 0 : undefined}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
