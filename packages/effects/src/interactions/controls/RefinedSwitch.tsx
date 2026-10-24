/**
 * RefinedSwitch — Micro-interaction toggle switch with spring physics and track deformation.
 */
import React from 'react';
import { prefersReducedMotion } from '../../motion/useReducedMotion.js';

export interface RefinedSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const RefinedSwitch: React.FC<RefinedSwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange(!checked);
    }
  };

  const isReduced = prefersReducedMotion();

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
      }}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={handleKeyDown}
        className="lg-switch-track"
        data-checked={checked}
        style={{
          width: '42px',
          height: '24px',
          padding: '2px',
          borderRadius: '999px',
          background: checked ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          transition: isReduced ? 'none' : 'background-color 180ms ease, border-color 180ms ease',
        }}
      >
        <span
          className="lg-switch-thumb"
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.25)',
            transform: checked ? 'translateX(18px)' : 'translateX(0)',
            transition: isReduced
              ? 'none'
              : 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'block',
          }}
        />
      </button>
      {label && <span style={{ fontSize: '0.88rem', color: '#E5E7EB' }}>{label}</span>}
    </label>
  );
};
