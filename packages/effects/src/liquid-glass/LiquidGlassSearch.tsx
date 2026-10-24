/**
 * LiquidGlassSearch — A search input with frosted glass styling.
 */
import React, { forwardRef } from 'react';
import type { LiquidGlassBaseProps } from './types.js';

export interface LiquidGlassSearchProps extends LiquidGlassBaseProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  'aria-label'?: string;
}

export const LiquidGlassSearch = forwardRef<HTMLInputElement, LiquidGlassSearchProps>(
  function LiquidGlassSearch(
    { value, onChange, placeholder = 'Search...', variant = 'light', blur = 16, opacity, radius = 12, border = true, className = '', style, ...rest },
    ref
  ) {
    const bg = variant === 'dark' ? `hsl(220 20% 10% / ${opacity ?? 0.4})` : `hsl(0 0% 100% / ${opacity ?? 0.4})`;
    const borderColor = variant === 'dark' ? 'hsl(0 0% 100% / 0.06)' : 'hsl(0 0% 100% / 0.25)';

    return (
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        <svg style={{ position: 'absolute', left: '0.75rem', width: '1rem', height: '1rem', opacity: 0.5 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          aria-label={rest['aria-label'] || placeholder}
          className={`lg-search ${className}`.trim()}
          style={{
            width: '100%',
            minWidth: '200px',
            padding: '0.625rem 1rem 0.625rem 2.25rem',
            background: bg,
            backdropFilter: `blur(${blur}px) saturate(180%)`,
            WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
            border: border ? `1px solid ${borderColor}` : 'none',
            borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
            color: variant === 'dark' ? 'hsl(0 0% 95%)' : 'hsl(222 20% 13%)',
            fontSize: '0.9375rem',
            outline: 'none',
            transition: 'all 200ms ease',
            ...style,
          }}
        />
      </div>
    );
  }
);
