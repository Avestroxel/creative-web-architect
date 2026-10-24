/**
 * MagneticButton — Subtle magnetic attraction to cursor for premium calls-to-action.
 */
import React, { useRef, useCallback, useState } from 'react';
import { prefersReducedMotion } from '../../motion/useReducedMotion.js';

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  magneticStrength?: number; // 0.1 to 0.4
  magneticRadius?: number;   // radius of influence in px
  variant?: 'matte' | 'glass' | 'solid';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  magneticStrength = 0.25,
  magneticRadius = 120,
  variant = 'matte',
  className = '',
  style,
  onMouseMove,
  onMouseLeave,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [transform, setTransform] = useState<string>('translate3d(0, 0, 0)');

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseMove?.(e);
      if (prefersReducedMotion() || !buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < magneticRadius) {
        const pullX = deltaX * magneticStrength;
        const pullY = deltaY * magneticStrength;
        setTransform(`translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0)`);
      }
    },
    [magneticStrength, magneticRadius, onMouseMove]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(e);
      setTransform('translate3d(0, 0, 0)');
    },
    [onMouseLeave]
  );

  const variantStyles: Record<string, React.CSSProperties> = {
    matte: {
      background: '#1A1D26',
      color: '#F3F4F6',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#FFFFFF',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.16)',
    },
    solid: {
      background: '#F3F4F6',
      color: '#0F172A',
      border: 'none',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <button
      ref={buttonRef}
      className={`lg-button cwa-magnetic-btn ${className}`.trim()}
      style={{
        padding: '0.65rem 1.4rem',
        borderRadius: '10px',
        fontWeight: 500,
        fontSize: '0.92rem',
        cursor: 'pointer',
        transform,
        transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        ...variantStyles[variant],
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </button>
  );
};
