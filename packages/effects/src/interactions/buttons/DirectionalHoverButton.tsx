/**
 * DirectionalHoverButton — Direction-aware hover reveal overlay.
 */
import React, { useRef, useState, useCallback } from 'react';
import { prefersReducedMotion } from '../../motion/useReducedMotion.js';

export interface DirectionalHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fillColor?: string;
}

export const DirectionalHoverButton: React.FC<DirectionalHoverButtonProps> = ({
  children,
  fillColor = 'rgba(255, 255, 255, 0.1)',
  className = '',
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [origin, setOrigin] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
  const [isHovered, setIsHovered] = useState(false);

  const getDirection = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return 'bottom';
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Angle in degrees (-180 to 180)
    const angle = (Math.atan2(y, x) * 180) / Math.PI;

    if (angle >= -45 && angle <= 45) return 'right';
    if (angle > 45 && angle < 135) return 'bottom';
    if (angle >= 135 || angle <= -135) return 'left';
    return 'top';
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseEnter?.(e);
      if (prefersReducedMotion()) {
        setIsHovered(true);
        return;
      }
      setOrigin(getDirection(e));
      setIsHovered(true);
    },
    [getDirection, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(e);
      if (prefersReducedMotion()) {
        setIsHovered(false);
        return;
      }
      setOrigin(getDirection(e));
      setIsHovered(false);
    },
    [getDirection, onMouseLeave]
  );

  const getTransform = () => {
    if (isHovered) return 'translate3d(0, 0, 0)';
    switch (origin) {
      case 'top':
        return 'translate3d(0, -100%, 0)';
      case 'bottom':
        return 'translate3d(0, 100%, 0)';
      case 'left':
        return 'translate3d(-100%, 0, 0)';
      case 'right':
        return 'translate3d(100%, 0, 0)';
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`lg-button cwa-directional-btn ${className}`.trim()}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '0.65rem 1.4rem',
        borderRadius: '10px',
        background: '#14161F',
        color: '#F3F4F6',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        fontWeight: 500,
        fontSize: '0.92rem',
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: fillColor,
          transform: getTransform(),
          transition: prefersReducedMotion()
            ? 'opacity 150ms ease'
            : 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          borderRadius: 'inherit',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
};
