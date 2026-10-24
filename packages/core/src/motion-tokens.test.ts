import { describe, it, expect } from 'vitest';
import {
  MOTION_DURATIONS,
  REFINED_EASINGS,
  MOTION_PROFILES,
  calculateStaggerDelay,
  buildAccessibleTransition,
} from './motion-tokens.js';

describe('Premium Motion Tokens & Curves', () => {
  it('defines structured duration tiers within expected ranges', () => {
    expect(MOTION_DURATIONS.micro).toBeGreaterThanOrEqual(120);
    expect(MOTION_DURATIONS.micro).toBeLessThanOrEqual(220);
    expect(MOTION_DURATIONS.standard).toBeGreaterThanOrEqual(200);
    expect(MOTION_DURATIONS.standard).toBeLessThanOrEqual(350);
  });

  it('provides luxury deceleration easing without harsh bounce', () => {
    expect(REFINED_EASINGS.luxuryDecel).toBe('cubic-bezier(0.16, 1, 0.3, 1)');
    expect(REFINED_EASINGS.subtleSnap).toContain('cubic-bezier');
  });

  it('calculates stagger delays with a sensible ceiling', () => {
    expect(calculateStaggerDelay(0, 50, 300)).toBe(0);
    expect(calculateStaggerDelay(2, 50, 300)).toBe(100);
    // Plateaus at ceiling
    expect(calculateStaggerDelay(10, 50, 300)).toBe(300);
  });

  it('constructs multi-property CSS transition strings', () => {
    const transition = buildAccessibleTransition('transform, opacity', 240, REFINED_EASINGS.subtleSnap);
    expect(transition).toContain('transform 240ms cubic-bezier(0.2, 0.9, 0.3, 1)');
    expect(transition).toContain('opacity 240ms cubic-bezier(0.2, 0.9, 0.3, 1)');
  });

  it('provides industry-specific motion profiles', () => {
    expect(MOTION_PROFILES.luxury.enableParallax).toBe(true);
    expect(MOTION_PROFILES.minimal.enableParallax).toBe(false);
  });
});
