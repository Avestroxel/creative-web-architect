/**
 * SegmentedControl — Fluid segmented tab pill with keyboard navigation.
 */
import React, { useRef, useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../motion/useReducedMotion.js';

export interface SegmentOption {
  id: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  activeId,
  onChange,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!containerRef.current) return;
    const activeButton = containerRef.current.querySelector<HTMLButtonElement>(`[data-id="${activeId}"]`);
    if (activeButton) {
      setIndicatorStyle({
        width: `${activeButton.offsetWidth}px`,
        transform: `translateX(${activeButton.offsetLeft}px)`,
      });
    }
  }, [activeId, options]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      const nextIndex = (index + 1) % options.length;
      onChange(options[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (index - 1 + options.length) % options.length;
      onChange(options[prevIndex].id);
    }
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      className={`lg-segmented-control ${className}`.trim()}
      style={{
        position: 'relative',
        display: 'inline-flex',
        padding: '3px',
        background: 'rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '10px',
      }}
    >
      {/* Sliding indicator pill */}
      <span
        className="lg-segment-pill"
        style={{
          position: 'absolute',
          top: '3px',
          bottom: '3px',
          left: 0,
          background: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '7px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
          transition: prefersReducedMotion()
            ? 'none'
            : 'transform 220ms cubic-bezier(0.2, 0.9, 0.3, 1), width 220ms ease',
          pointerEvents: 'none',
          ...indicatorStyle,
        }}
      />

      {options.map((opt, i) => {
        const isActive = opt.id === activeId;
        return (
          <button
            key={opt.id}
            data-id={opt.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(opt.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`lg-segment-item ${isActive ? 'active' : ''}`}
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '0.4rem 0.9rem',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: isActive ? '#FFFFFF' : '#9CA3AF',
              background: 'none',
              border: 'none',
              borderRadius: '7px',
              cursor: 'pointer',
              outline: 'none',
              transition: 'color 160ms ease',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
