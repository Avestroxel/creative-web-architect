import { describe, it, expect } from 'vitest';
import {
  generateFluidClamp,
  createDesignSystemForStyle,
  exportToCSSVariables,
  getDefaultTypographyScale,
} from './design-system.js';

describe('Design System Engine', () => {
  it('generates mathematical CSS clamp() formula for fluid typography', () => {
    const clamp = generateFluidClamp({ minSize: 16, maxSize: 32 });
    expect(clamp).toContain('clamp(');
    expect(clamp).toContain('rem');
    expect(clamp).toContain('vw');
  });

  it('generates standard typography scale with fluid clamp values', () => {
    const scale = getDefaultTypographyScale('Space Grotesk', 'Plus Jakarta Sans');
    expect(scale.fontFamilyDisplay).toBe('Space Grotesk');
    expect(scale.fontFamilyBody).toBe('Plus Jakarta Sans');
    expect(scale.sizes.base).toBe('1rem');
    expect(scale.sizes['5xl']).toContain('clamp(');
  });

  it('builds a complete design system conforming to CWA types', () => {
    const system = createDesignSystemForStyle('cyberpunk');
    expect(system.name).toContain('Cyberpunk');
    expect(system.colors.dark.accent).toBe('#00F0FF');
    expect(system.colors.light.primary).toBe('#0F172A');
    expect(system.motion.durationBase).toBe(300);
    expect(system.liquidGlass?.level).toBe(2);
    expect(system.tokens.length).toBeGreaterThan(4);
  });

  it('serializes design system to ready-to-use CSS variables', () => {
    const system = createDesignSystemForStyle('contemporary-minimalism');
    const css = exportToCSSVariables(system, 'dark');
    expect(css).toContain(':root {');
    expect(css).toContain('--cwa-font-display:');
    expect(css).toContain('--cwa-color-primary:');
    expect(css).toContain('--cwa-color-accent:');
    expect(css).toContain('--cwa-glass-blur:');
    expect(css).toContain('}');
  });
});
