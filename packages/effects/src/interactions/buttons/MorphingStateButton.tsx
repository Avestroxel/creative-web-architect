/**
 * MorphingStateButton — State transitions (idle -> loading -> success).
 */
import React from 'react';

export type ButtonActionState = 'idle' | 'loading' | 'success';

export interface MorphingStateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state: ButtonActionState;
  idleText?: string;
  loadingText?: string;
  successText?: string;
}

export const MorphingStateButton: React.FC<MorphingStateButtonProps> = ({
  state,
  idleText = 'Submit Order',
  loadingText = 'Processing...',
  successText = 'Confirmed',
  className = '',
  disabled,
  style,
  ...rest
}) => {
  const isActionDisabled = disabled || state === 'loading';

  return (
    <button
      className={`lg-button cwa-morphing-btn ${className}`.trim()}
      disabled={isActionDisabled}
      aria-live="polite"
      style={{
        height: '2.5rem',
        padding: state === 'loading' ? '0 1rem' : '0 1.4rem',
        borderRadius: state === 'loading' ? '999px' : '10px',
        background: state === 'success' ? '#10B981' : '#1E2230',
        color: '#FFFFFF',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontWeight: 500,
        fontSize: '0.9rem',
        cursor: isActionDisabled ? 'default' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      {...rest}
    >
      {state === 'idle' && <span>{idleText}</span>}

      {state === 'loading' && (
        <>
          <span
            style={{
              width: '14px',
              height: '14px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderTopColor: '#FFFFFF',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'spin 0.6s linear infinite',
            }}
          />
          <span>{loadingText}</span>
        </>
      )}

      {state === 'success' && (
        <>
          <span>✓</span>
          <span>{successText}</span>
        </>
      )}
    </button>
  );
};
