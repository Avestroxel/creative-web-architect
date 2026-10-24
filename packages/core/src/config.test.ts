import { describe, it, expect } from 'vitest';
import { getDefaultConfig, createConfig, mergeConfigs } from './config.js';

describe('Config Management', () => {
  it('returns valid default configuration', () => {
    const config = getDefaultConfig();
    expect(config.version).toBe('0.1.0');
    expect(config.mode).toBe('auto');
    expect(config.performance.lcpTarget).toBe(2500);
    expect(config.performance.targetFPS).toBe(60);
    expect(config.accessibility.contrastRatio).toBe(4.5);
    expect(config.accessibility.reducedMotionFallback).toBe(true);
  });

  it('creates configuration with partial overrides', () => {
    const config = createConfig({
      mode: 'experimental',
      performance: {
        lcpTarget: 1800,
        inpTarget: 100,
        clsTarget: 0.05,
        targetFPS: 120,
      },
    });

    expect(config.mode).toBe('experimental');
    expect(config.performance.lcpTarget).toBe(1800);
    expect(config.performance.targetFPS).toBe(120);
    // Preserves non-overridden fields
    expect(config.accessibility.contrastRatio).toBe(4.5);
    expect(config.accessibility.keyboardNavigation).toBe(true);
  });

  it('merges nested configurations properly', () => {
    const base = getDefaultConfig();
    const merged = mergeConfigs(base, {
      accessibility: {
        contrastRatio: 7.0, // AAA
        reducedMotionFallback: true,
        keyboardNavigation: true,
        screenReaderSupport: true,
        minTouchTarget: 48,
      },
    });

    expect(merged.accessibility.contrastRatio).toBe(7.0);
    expect(merged.accessibility.minTouchTarget).toBe(48);
    expect(merged.performance.lcpTarget).toBe(2500);
  });
});
