/**
 * LiquidGlassSwitch — A toggle switch with glass styling.
 */
import React, { forwardRef } from 'react';
import type { LiquidGlassBaseProps } from './types.js';

export interface LiquidGlassSwitchProps extends LiquidGlassBaseProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  'aria-label'?: string;
}

export const LiquidGlassSwitch = forwardRef<HTMLButtonElement, LiquidGlassSwitchProps>(
  function LiquidGlassSwitch(
    { checked = false, onChange, label, variant = 'light', disabled = false, className = '', style, ...rest },
    ref
  ) {
    const trackBg = checked
      ? 'hsl(142 71% 45% / 0.8)'
      : variant === 'dark'
        ? 'hsl(0 0% 100% / 0.15)'
        : 'hsl(0 0% 0% / 0.12)';

    return (
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: disabled ? 'not-allowed' : 'pointer' }}>
        <button
          ref={ref}
          role="switch"
          aria-checked={checked}
          aria-label={rest['aria-label'] || label}
          onClick={() => !disabled && onChange?.(!checked)}
          disabled={disabled}
          className={`lg-switch ${className}`.trim()}
          style={{
            position: 'relative',
            width: '44px',
            height: '24px',
            background: trackBg,
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            border: `1px solid ${variant === 'dark' ? 'hsl(0 0% 100% / 0.1)' : 'hsl(0 0% 0% / 0.08)'}`,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            transition: 'background 200ms ease',
            padding: 0,
            ...style,
          }}
        >
          <span style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            width: '18px',
            height: '18px',
            background: 'white',
            borderRadius: '50%',
            transition: 'left 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 1px 3px hsl(0 0% 0% / 0.2)',
          }} />
        </button>
        {label && <span style={{ fontSize: '0.9375rem', opacity: disabled ? 0.5 : 1 }}>{label}</span>}
      </label>
    );
  }
);
