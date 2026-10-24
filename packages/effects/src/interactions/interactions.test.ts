import { describe, it, expect } from 'vitest';
import * as interactions from './index.js';

describe('Premium Interactions & Micro-Components', () => {
  it('exports all button components', () => {
    expect(interactions.MagneticButton).toBeDefined();
    expect(interactions.DirectionalHoverButton).toBeDefined();
    expect(interactions.SlidingTextButton).toBeDefined();
    expect(interactions.MorphingStateButton).toBeDefined();
  });

  it('exports refined micro-interaction controls', () => {
    expect(interactions.RefinedSwitch).toBeDefined();
    expect(interactions.SegmentedControl).toBeDefined();
    expect(interactions.RefinedAccordion).toBeDefined();
  });

  it('exports scroll and storytelling components', () => {
    expect(interactions.ScrollReveal).toBeDefined();
    expect(interactions.PinnedStorySection).toBeDefined();
  });
});
