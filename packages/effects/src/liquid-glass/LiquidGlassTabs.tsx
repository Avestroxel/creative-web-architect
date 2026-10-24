/**
 * LiquidGlassTabs — Glass tab navigation with smooth indicator transitions.
 */
import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import type { LiquidGlassBaseProps } from './types.js';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface LiquidGlassTabsProps extends LiquidGlassBaseProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const LiquidGlassTabs = forwardRef<HTMLDivElement, LiquidGlassTabsProps>(
  function LiquidGlassTabs(
    {
      tabs,
      activeTab: controlledActive,
      onTabChange,
      variant = 'light',
      blur = 16,
      opacity,
      radius = 14,
      border = true,
      className = '',
      style,
      ...rest
    },
    ref
  ) {
    const [internalActive, setInternalActive] = useState(tabs[0]?.id || '');
    const activeId = controlledActive ?? internalActive;
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
    const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

    const updateIndicator = useCallback(() => {
      const activeEl = tabRefs.current.get(activeId);
      if (!activeEl) return;
      const parentEl = activeEl.parentElement;
      if (!parentEl) return;

      const parentRect = parentEl.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      setIndicatorStyle({
        left: activeRect.left - parentRect.left,
        width: activeRect.width,
        height: activeRect.height,
      });
    }, [activeId]);

    useEffect(() => {
      updateIndicator();
      window.addEventListener('resize', updateIndicator);
      return () => window.removeEventListener('resize', updateIndicator);
    }, [updateIndicator]);

    const handleTabClick = (tabId: string) => {
      setInternalActive(tabId);
      onTabChange?.(tabId);
    };

    const variantBg: Record<string, string> = {
      light: `hsl(0 0% 100% / ${opacity ?? 0.35})`,
      dark: `hsl(220 20% 10% / ${opacity ?? 0.4})`,
      adaptive: `hsl(0 0% 50% / ${opacity ?? 0.25})`,
    };

    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      position: 'relative',
      gap: '2px',
      padding: '4px',
      background: variantBg[variant],
      backdropFilter: `blur(${blur}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
      border: border ? `1px solid ${variant === 'dark' ? 'hsl(0 0% 100% / 0.06)' : 'hsl(0 0% 100% / 0.2)'}` : 'none',
      borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
      ...style,
    };

    return (
      <div ref={ref} className={`lg-tabs ${className}`.trim()} style={baseStyle} role="tablist" {...rest}>
        {/* Sliding indicator */}
        <div
          style={{
            position: 'absolute',
            top: 4,
            left: indicatorStyle.left || 0,
            width: indicatorStyle.width || 0,
            height: indicatorStyle.height || 0,
            background: variant === 'dark' ? 'hsl(0 0% 100% / 0.12)' : 'hsl(0 0% 100% / 0.6)',
            borderRadius: typeof radius === 'number' ? `${radius - 2}px` : radius,
            transition: 'all 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
            boxShadow: '0 1px 3px hsl(0 0% 0% / 0.05)',
            zIndex: 0,
          }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
            role="tab"
            aria-selected={activeId === tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              position: 'relative',
              zIndex: 1,
              padding: '0.5rem 1rem',
              background: 'none',
              border: 'none',
              borderRadius: typeof radius === 'number' ? `${radius - 2}px` : radius,
              cursor: 'pointer',
              fontWeight: activeId === tab.id ? 600 : 400,
              color: variant === 'dark' ? 'hsl(0 0% 95%)' : 'hsl(222 20% 13%)',
              opacity: activeId === tab.id ? 1 : 0.7,
              transition: 'all 200ms ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }
);
