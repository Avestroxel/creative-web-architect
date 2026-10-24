/**
 * RefinedAccordion — Smooth height expansion with accessible keyboard control.
 */
import React, { useState } from 'react';
import { prefersReducedMotion } from '../../motion/useReducedMotion.js';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface RefinedAccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export const RefinedAccordion: React.FC<RefinedAccordionProps> = ({
  items,
  allowMultiple = false,
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([items[0]?.id || '']));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isReduced = prefersReducedMotion();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            style={{
              background: '#13151D',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'border-color 180ms ease',
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                color: '#F3F4F6',
                fontSize: '0.95rem',
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span>{item.title}</span>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: '#9CA3AF',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: isReduced ? 'none' : 'transform 200ms cubic-bezier(0.2, 0.9, 0.3, 1)',
                  display: 'inline-block',
                }}
              >
                ▼
              </span>
            </button>

            <div
              style={{
                maxHeight: isOpen ? '500px' : '0px',
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: isReduced
                  ? 'none'
                  : 'max-height 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease',
              }}
            >
              <div
                style={{
                  padding: '0 1.25rem 1.25rem',
                  color: '#9CA3AF',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                }}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
