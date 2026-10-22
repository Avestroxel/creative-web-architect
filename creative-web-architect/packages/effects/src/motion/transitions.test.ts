import { describe, it, expect } from 'vitest';
import { EASING, getStaggerDelay, createTransition } from './transitions.js';

describe('Transitions & Easing', () => {
  it('defines Apple-grade easing presets', () => {
    expect(EASING.snappy).toBe('cubic-bezier(0.2, 0.9, 0.3, 1)');
    expect(EASING.cinematic).toBe('cubic-bezier(0.16, 1, 0.3, 1)');
  });

  it('computes stagger delays linearly', () => {
    expect(getStaggerDelay(0, 50)).toBe(0);
    expect(getStaggerDelay(3, 50)).toBe(150);
  });

  it('generates multi-property CSS transition declarations', () => {
    const transition = createTransition(['opacity', 'transform'], 400, EASING.snappy);
    expect(transition).toContain('opacity 400ms cubic-bezier(0.2, 0.9, 0.3, 1)');
    expect(transition).toContain('transform 400ms cubic-bezier(0.2, 0.9, 0.3, 1)');
  });
});
