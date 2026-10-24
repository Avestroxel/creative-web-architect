/**
 * LiquidGlassModal — A modal dialog with frosted glass backdrop.
 */
import React, { forwardRef, useEffect, useCallback } from 'react';
import type { LiquidGlassBaseProps } from './types.js';

export interface LiquidGlassModalProps extends LiquidGlassBaseProps {
  children: React.ReactNode;
  /** Whether the modal is open */
  open: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Modal title for accessibility */
  title?: string;
  /** Whether clicking backdrop closes the modal */
  closeOnBackdrop?: boolean;
}

export const LiquidGlassModal = forwardRef<HTMLDivElement, LiquidGlassModalProps>(
  function LiquidGlassModal(
    {
      children,
      open,
      onClose,
      title,
      closeOnBackdrop = true,
      variant = 'light',
      blur = 24,
      opacity,
      radius = 24,
      border = true,
      className = '',
      style,
      ...rest
    },
    ref
  ) {
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
      if (open) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }, [open, handleKeyDown]);

    if (!open) return null;

    const variantBg: Record<string, string> = {
      light: `hsl(0 0% 100% / ${opacity ?? 0.7})`,
      dark: `hsl(220 20% 10% / ${opacity ?? 0.75})`,
      adaptive: `hsl(0 0% 50% / ${opacity ?? 0.5})`,
    };

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'hsl(0 0% 0% / 0.4)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 200ms ease',
        }}
        onClick={closeOnBackdrop ? onClose : undefined}
        role="presentation"
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={`lg-modal ${className}`.trim()}
          style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '2rem',
            background: variantBg[variant],
            backdropFilter: `blur(${blur}px) saturate(180%)`,
            WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
            border: border ? `1px solid ${variant === 'dark' ? 'hsl(0 0% 100% / 0.08)' : 'hsl(0 0% 100% / 0.25)'}` : 'none',
            borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
            boxShadow: '0 25px 80px hsl(0 0% 0% / 0.15), 0 0 0 0.5px hsl(0 0% 100% / 0.1)',
            animation: 'slideUp 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            ...style,
          }}
          onClick={(e) => e.stopPropagation()}
          {...rest}
        >
          {children}
        </div>
      </div>
    );
  }
);
