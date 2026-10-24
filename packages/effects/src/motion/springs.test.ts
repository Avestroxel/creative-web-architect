import { describe, it, expect } from 'vitest';
import { SPRING_PRESETS, calculateSpringPosition, springToCubicBezier } from './springs.js';

describe('Spring Physics Solvers', () => {
  it('contains standard spring presets', () => {
    expect(SPRING_PRESETS.gentle).toBeDefined();
    expect(SPRING_PRESETS.snappy).toBeDefined();
    expect(SPRING_PRESETS.bouncy).toBeDefined();
    expect(SPRING_PRESETS.cinematic).toBeDefined();
    expect(SPRING_PRESETS.stiff).toBeDefined();

    expect(SPRING_PRESETS.snappy.stiffness).toBeGreaterThan(SPRING_PRESETS.gentle.stiffness);
  });

  it('calculates harmonic oscillation progression accurately', () => {
    const start = 0;
    const target = 100;
    const posAt0 = calculateSpringPosition(0, start, target, SPRING_PRESETS.gentle);
    expect(posAt0).toBeCloseTo(0, 1);

    const posAt1s = calculateSpringPosition(1.0, start, target, SPRING_PRESETS.snappy);
    expect(posAt1s).toBeGreaterThan(85);

    const posAt5s = calculateSpringPosition(5.0, start, target, SPRING_PRESETS.snappy);
    expect(posAt5s).toBeCloseTo(100, 1);
  });

  it('maps spring preset names to cubic-bezier curves', () => {
    expect(springToCubicBezier('bouncy')).toContain('cubic-bezier');
    expect(springToCubicBezier('snappy')).toContain('cubic-bezier');
    expect(springToCubicBezier('cinematic')).toContain('cubic-bezier');
  });
});
