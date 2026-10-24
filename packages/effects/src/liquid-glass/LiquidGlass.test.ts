import { describe, it, expect } from 'vitest';
import * as effects from '../index.js';

describe('Liquid Glass Component Library', () => {
  it('exports all core Liquid Glass components', () => {
    expect(effects.LiquidGlassButton).toBeDefined();
    expect(effects.LiquidGlassCard).toBeDefined();
    expect(effects.LiquidGlassNavbar).toBeDefined();
    expect(effects.LiquidGlassDock).toBeDefined();
    expect(effects.LiquidGlassModal).toBeDefined();
    expect(effects.LiquidGlassTabs).toBeDefined();
    expect(effects.LiquidGlassSearch).toBeDefined();
    expect(effects.LiquidGlassSwitch).toBeDefined();
    expect(effects.LiquidGlassTooltip).toBeDefined();
  });

  it('exports motion utilities', () => {
    expect(effects.useReducedMotion).toBeDefined();
    expect(effects.prefersReducedMotion).toBeDefined();
    expect(effects.useScrollProgress).toBeDefined();
    expect(effects.useTilt).toBeDefined();
    expect(effects.useMagnetic).toBeDefined();
    expect(effects.calculateSpringPosition).toBeDefined();
    expect(effects.SPRING_PRESETS).toBeDefined();
    expect(effects.EASING).toBeDefined();
  });

  it('provides safe SSR reduced motion fallback in node test environment', () => {
    const isReduced = effects.prefersReducedMotion();
    expect(typeof isReduced).toBe('boolean');
    expect(isReduced).toBe(false);
  });
});
