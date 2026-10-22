/**
 * LiquidGlassButton — A translucent, frosted glass button with pointer-responsive highlights.
 */
import React, { forwardRef } from 'react';
import type { LiquidGlassBaseProps } from './types.js';
import { useGlassHighlight } from './useGlassHighlight.js';

export interface LiquidGlassButtonProps extends LiquidGlassBaseProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

export const LiquidGlassButton = forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  function LiquidGlassButton(
    {
      children,
      onClick,
      type = 'button',
      size = 'md',
      variant = 'light',
      level = 1,
      tint,
      opacity,
      blur = 16,
      radius = 12,
      border = true,
      highlightIntensity = 0.15,
      motionIntensity = 1,
      disabled = false,
      className = '',
      style,
      ...rest
    },
    forwardedRef
  ) {
    const highlightRef = useGlassHighlight<HTMLButtonElement>({
      enabled: level >= 2 && !disabled,
    });

    // Merge refs
    const ref = forwardedRef || highlightRef;

    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
      md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
      lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
    };

    const variantBg: Record<string, string> = {
      light: `hsl(0 0% 100% / ${opacity ?? 0.45})`,
      dark: `hsl(220 20% 10% / ${opacity ?? 0.5})`,
      adaptive: `hsl(0 0% 50% / ${opacity ?? 0.3})`,
    };

    const variantBorder: Record<string, string> = {
      light: 'hsl(0 0% 100% / 0.3)',
      dark: 'hsl(0 0% 100% / 0.08)',
      adaptive: 'hsl(0 0% 100% / 0.15)',
    };

    const baseStyle: React.CSSProperties = {
      ...sizeStyles[size],
      background: tint || variantBg[variant],
      backdropFilter: `blur(${blur}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
      border: border ? `1px solid ${variantBorder[variant]}` : 'none',
      borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
      color: variant === 'dark' ? 'hsl(0 0% 95%)' : 'hsl(222 20% 13%)',
      fontWeight: 500,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: motionIntensity > 0
        ? `all ${200 * motionIntensity}ms cubic-bezier(0.25, 0.1, 0.25, 1)`
        : 'none',
      boxShadow: [
        '0 2px 8px hsl(0 0% 0% / 0.06)',
        variant === 'light' ? 'inset 0 1px 0 hsl(0 0% 100% / 0.4)' : 'inset 0 1px 0 hsl(0 0% 100% / 0.1)',
      ].join(', '),
      position: 'relative' as const,
      overflow: 'hidden',
      // Level 2: Highlight support
      ...(level >= 2 ? {
        backgroundImage: `radial-gradient(var(--glass-highlight-radius, 300px) circle at var(--glass-highlight-x, 50%) var(--glass-highlight-y, 50%), hsl(0 0% 100% / var(--glass-highlight-opacity, ${highlightIntensity})), transparent)`,
      } : {}),
      ...style,
    };

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={`lg-button ${className}`.trim()}
        style={baseStyle}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
