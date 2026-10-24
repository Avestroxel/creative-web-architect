/**
 * SlidingTextButton — Editorial split-label sliding text button with icon morph.
 */
import React, { useState } from 'react';
import { prefersReducedMotion } from '../../motion/useReducedMotion.js';

export interface SlidingTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  defaultText: string;
  hoverText: string;
  icon?: string;
}

export const SlidingTextButton: React.FC<SlidingTextButtonProps> = ({
  defaultText,
  hoverText,
  icon = '→',
  className = '',
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`lg-button cwa-sliding-text-btn ${className}`.trim()}
      style={{
        height: '2.5rem',
        padding: '0 1.25rem',
        overflow: 'hidden',
        background: '#181B24',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '10px',
        color: '#F3F4F6',
        fontSize: '0.9rem',
        fontWeight: 500,
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        onMouseLeave?.(e);
      }}
      {...rest}
    >
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          transform: isHovered && !prefersReducedMotion() ? 'translateY(-50%)' : 'translateY(0)',
          transition: prefersReducedMotion()
            ? 'none'
            : 'transform 200ms cubic-bezier(0.2, 0.9, 0.3, 1)',
        }}
      >
        <span
          style={{
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          {defaultText}
          <span style={{ fontSize: '0.9rem' }}>{icon}</span>
        </span>
        <span
          style={{
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#FFFFFF',
          }}
        >
          {hoverText}
          <span
            style={{
              fontSize: '0.9rem',
              transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
              transition: 'transform 180ms ease',
            }}
          >
            {icon}
          </span>
        </span>
      </span>
    </button>
  );
};
