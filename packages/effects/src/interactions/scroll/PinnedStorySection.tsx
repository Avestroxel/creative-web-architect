/**
 * PinnedStorySection — Pinned chapter storytelling without scroll hijacking.
 */
import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../motion/useReducedMotion.js';

export interface StoryChapter {
  id: string;
  step: string;
  title: string;
  description: string;
  metric?: {
    value: string;
    label: string;
  };
}

export interface PinnedStorySectionProps {
  chapters: StoryChapter[];
  tag?: string;
  headline?: string;
}

export const PinnedStorySection: React.FC<PinnedStorySectionProps> = ({
  chapters,
  tag = 'CHOREOGRAPHY',
  headline = 'Engineered in Chapters',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!containerRef.current || prefersReducedMotion()) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress through container
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const stepIndex = Math.min(
        chapters.length - 1,
        Math.floor(progress * chapters.length)
      );
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters.length]);

  const currentChapter = chapters[activeStep] || chapters[0];

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: `${chapters.length * 80}vh`,
        background: '#0B0D13',
        color: '#F3F4F6',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            width: '100%',
            background: 'rgba(18, 21, 30, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '3rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: '#94A3B8',
                letterSpacing: '0.15em',
              }}
            >
              {tag} // CHAPTER {activeStep + 1} OF {chapters.length}
            </span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {chapters.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: '28px',
                    height: '3px',
                    borderRadius: '2px',
                    background: i === activeStep ? '#3B82F6' : 'rgba(255, 255, 255, 0.15)',
                    transition: 'background-color 200ms ease',
                  }}
                />
              ))}
            </div>
          </div>

          <h3
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '1rem',
              transition: 'opacity 200ms ease',
            }}
          >
            {currentChapter.title}
          </h3>

          <p
            style={{
              color: '#9CA3AF',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            {currentChapter.description}
          </p>

          {currentChapter.metric && (
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '1.5rem',
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.75rem',
              }}
            >
              <span
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  fontFamily: 'monospace',
                }}
              >
                {currentChapter.metric.value}
              </span>
              <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>
                {currentChapter.metric.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
