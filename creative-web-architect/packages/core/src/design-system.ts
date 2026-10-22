/**
 * Design System Generator & Token Pipeline
 *
 * Generates semantic design tokens, CSS variables, and fluid typography
 * formulas based on project styles and modes conforming to CWA types.
 */
import { DESIGN_STYLES } from './constants.js';
import type {
  DesignSystem,
  DesignToken,
  TypographyScale,
  ColorPalette,
  MotionConfig,
  LiquidGlassConfig,
  DesignStyle,
} from './types.js';

export interface FluidTypeOptions {
  minSize: number;
  maxSize: number;
  minViewport?: number;
  maxViewport?: number;
  unit?: string;
}

/**
 * Generates a CSS clamp() formula for fluid typography or spacing.
 */
export function generateFluidClamp({
  minSize,
  maxSize,
  minViewport = 375,
  maxViewport = 1440,
  unit = 'rem',
}: FluidTypeOptions): string {
  const minRem = minSize / 16;
  const maxRem = maxSize / 16;
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const yAxisIntersection = -minViewport * slope + minSize;
  const yAxisIntersectionRem = yAxisIntersection / 16;
  const slopeVw = (slope * 100).toFixed(4);

  return `clamp(${minRem.toFixed(4)}${unit}, ${yAxisIntersectionRem.toFixed(4)}${unit} + ${slopeVw}vw, ${maxRem.toFixed(4)}${unit})`;
}

/**
 * Default standard modular typography scale conforming to TypographyScale type.
 */
export function getDefaultTypographyScale(
  fontFamilyDisplay = 'Plus Jakarta Sans',
  fontFamilyBody = 'Plus Jakarta Sans'
): TypographyScale {
  return {
    fontFamilyDisplay,
    fontFamilyBody,
    fontFamilyMono: 'JetBrains Mono',
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': generateFluidClamp({ minSize: 22, maxSize: 26 }),
      '3xl': generateFluidClamp({ minSize: 26, maxSize: 32 }),
      '4xl': generateFluidClamp({ minSize: 32, maxSize: 44 }),
      '5xl': generateFluidClamp({ minSize: 40, maxSize: 60 }),
      '6xl': generateFluidClamp({ minSize: 48, maxSize: 72 }),
    },
    lineHeights: {
      tight: '1.15',
      base: '1.6',
      relaxed: '1.8',
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  };
}

/**
 * Builds a complete, compliant DesignSystem object for any style key.
 */
export function createDesignSystemForStyle(styleKey: string = 'contemporary-minimalism'): DesignSystem {
  const styleEntry = (DESIGN_STYLES as Record<string, { label: string; description: string }>)[styleKey];
  const styleName = styleEntry?.label || styleKey;

  const lightPalette: ColorPalette = {
    primary: '#0F172A',
    secondary: '#3B82F6',
    accent: '#06B6D4',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: 'rgba(0, 0, 0, 0.08)',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  };

  const darkPalette: ColorPalette = {
    primary: '#F8FAFC',
    secondary: '#60A5FA',
    accent: '#00F0FF',
    background: '#07090E',
    surface: 'rgba(18, 22, 36, 0.75)',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: 'rgba(255, 255, 255, 0.08)',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  };

  const motion: MotionConfig = {
    durationFast: 150,
    durationBase: 300,
    durationSlow: 500,
    easeDefault: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    enableScrollAnimations: true,
    enableParallax: true,
    useGSAP: false,
  };

  const liquidGlass: LiquidGlassConfig = {
    level: 2,
    blurIntensity: 20,
    surfaceOpacity: 0.65,
    tintColor: 'rgba(255, 255, 255, 0.05)',
    animatedHighlights: true,
    pointerResponsive: true,
    reducedTransparencyFallback: true,
  };

  const tokens: DesignToken[] = [
    { name: 'color-primary', value: darkPalette.primary, type: 'color', description: 'Primary action color' },
    { name: 'color-accent', value: darkPalette.accent, type: 'color', description: 'Highlight accent' },
    { name: 'color-bg', value: darkPalette.background, type: 'color', description: 'Main background' },
    { name: 'color-surface', value: darkPalette.surface, type: 'color', description: 'Surface glass panel' },
    { name: 'glass-blur', value: `${liquidGlass.blurIntensity}px`, type: 'radius', description: 'Backdrop blur' },
    { name: 'radius-base', value: '14px', type: 'radius', description: 'Default corner rounding' },
  ];

  return {
    name: `${styleName} System`,
    version: '0.1.0',
    colors: {
      light: lightPalette,
      dark: darkPalette,
    },
    typography: getDefaultTypographyScale(),
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
    },
    radii: {
      sm: '6px',
      md: '12px',
      lg: '18px',
      full: '9999px',
    },
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
      md: '0 10px 30px rgba(0, 0, 0, 0.3)',
      lg: '0 20px 60px rgba(0, 0, 0, 0.5)',
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    motion,
    liquidGlass,
    tokens,
  };
}

/**
 * Serializes a DesignSystem to ready-to-use CSS custom properties (:root {...}).
 */
export function exportToCSSVariables(designSystem: DesignSystem, theme: 'dark' | 'light' = 'dark'): string {
  const colors = designSystem.colors[theme];
  const lines: string[] = [
    `/* ${designSystem.name} (${theme}) — Generated by Creative Web Architect */`,
    ':root {',
    `  /* Typography */`,
    `  --cwa-font-display: '${designSystem.typography.fontFamilyDisplay}', system-ui, sans-serif;`,
    `  --cwa-font-body: '${designSystem.typography.fontFamilyBody}', system-ui, sans-serif;`,
    `  --cwa-text-base: ${designSystem.typography.sizes.base};`,
    `  --cwa-text-2xl: ${designSystem.typography.sizes['2xl']};`,
    `  --cwa-text-4xl: ${designSystem.typography.sizes['4xl']};`,
    `  --cwa-text-5xl: ${designSystem.typography.sizes['5xl']};`,
    '',
    `  /* Colors */`,
    `  --cwa-color-primary: ${colors.primary};`,
    `  --cwa-color-secondary: ${colors.secondary};`,
    `  --cwa-color-accent: ${colors.accent};`,
    `  --cwa-color-bg: ${colors.background};`,
    `  --cwa-color-surface: ${colors.surface};`,
    `  --cwa-color-text: ${colors.text};`,
    `  --cwa-color-muted: ${colors.textSecondary};`,
    `  --cwa-color-border: ${colors.border};`,
    '',
    `  /* Spacing */`,
    ...Object.entries(designSystem.spacing).map(([k, v]) => `  --cwa-space-${k}: ${v};`),
    '',
    `  /* Radii */`,
    ...Object.entries(designSystem.radii).map(([k, v]) => `  --cwa-radius-${k}: ${v};`),
    '',
    `  /* Shadows */`,
    ...Object.entries(designSystem.shadows).map(([k, v]) => `  --cwa-shadow-${k}: ${v};`),
    '',
    `  /* Tokens */`,
    ...designSystem.tokens.map((t) => `  --cwa-${t.name}: ${t.value};`),
    '}',
  ];

  return lines.join('\n');
}
