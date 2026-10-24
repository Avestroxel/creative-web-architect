/**
 * Visual Policy & Anti-Pattern Detection Engine
 *
 * Enforces the "Refined Lighting & Material Policy" (No-Glow Default).
 * Provides color palettes for refined dark/light modes and analyzes
 * design choices to eliminate cheap AI-generated aesthetics (neon, excessive glow, oversaturation).
 */

export interface VisualPolicyConfig {
  allowNeonGlow: boolean;
  maxDropShadowBlur: number;
  maxBackdropBlur: number;
  maxColorSaturation: number;
  enforceHairlineBorders: boolean;
}

export const REFINED_VISUAL_POLICY: VisualPolicyConfig = {
  allowNeonGlow: false,
  maxDropShadowBlur: 32, // No 80px-120px neon blobs
  maxBackdropBlur: 28,   // Crisp optical refraction, not muddy blur
  maxColorSaturation: 75, // Avoid 100% saturated electric hues by default
  enforceHairlineBorders: true, // 1px or 0.5px refined borders
};

/**
 * Premium Dark Mode Palette
 * Eliminates cheap neon-blue/purple backgrounds.
 * Uses charcoal, graphite, deep warm slate, and restrained off-white typography.
 */
export const PREMIUM_DARK_PALETTE = {
  bgBase: '#0C0D12',        // Deep obsidian charcoal
  bgSurface: '#14161F',     // Graphite matte surface
  bgElevated: '#1D202C',    // Elevated card surface
  borderSubtle: 'rgba(255, 255, 255, 0.07)',  // Hairline subtle boundary
  borderStrong: 'rgba(255, 255, 255, 0.14)',  // Clear definition without glow
  textPrimary: '#F3F4F6',   // High-legibility soft off-white
  textSecondary: '#9CA3AF', // Neutral mid-gray
  textMuted: '#6B7280',     // Subtle metadata text
  accentMuted: '#94A3B8',   // Restrained slate accent
  accentWarm: '#D4AF37',    // Refined champagne/gold
} as const;

/**
 * Premium Light Mode Palette
 * Natural alabaster, stone, and architectural contrast.
 */
export const PREMIUM_LIGHT_PALETTE = {
  bgBase: '#FBFBFB',        // Alabaster warm white
  bgSurface: '#FFFFFF',     // Clean surface
  bgElevated: '#F3F4F6',    // Soft warm gray
  borderSubtle: 'rgba(0, 0, 0, 0.06)',
  borderStrong: 'rgba(0, 0, 0, 0.12)',
  textPrimary: '#111827',   // Deep near-black
  textSecondary: '#4B5563', // Charcoal readable
  textMuted: '#9CA3AF',
  accentMuted: '#334155',
  accentWarm: '#B45309',
} as const;

export interface AntiPatternIssue {
  type: 'excessive-glow' | 'oversaturated-neon' | 'heavy-shadow' | 'blurry-glass';
  selectorOrProperty: string;
  reason: string;
  remedy: string;
}

/**
 * Analyzes CSS property strings or rules for cheap visual anti-patterns.
 */
export function auditCSSVisualQuality(cssCode: string): {
  passed: boolean;
  score: number; // 0 to 100
  issues: AntiPatternIssue[];
} {
  const issues: AntiPatternIssue[] = [];

  // Check 1: Excessive box-shadow glow (e.g. 0 0 40px #cyan, 0 0 80px rgb(...))
  const neonGlowRegex = /box-shadow:[^;]*0\s+0\s+(?:[4-9]\d|\d{3,})px/gi;
  let match: RegExpExecArray | null;
  while ((match = neonGlowRegex.exec(cssCode)) !== null) {
    issues.push({
      type: 'excessive-glow',
      selectorOrProperty: match[0],
      reason: 'Oversized box-shadow glow (>40px blur) creates cheap "neon gaming" aesthetics.',
      remedy: 'Replace with subtle directional shadow (e.g. 0 8px 24px rgba(0,0,0,0.12)) and crisp hairline border.',
    });
  }

  // Check 2: Pure saturated neon hex colors (e.g. #00FF00, #FF00FF, #00FFFF, #00F0FF) used as dominant borders/glows
  const neonColorRegex = /#(?:00ff00|ff00ff|00ffff|ff0055|00f0ff)\b/gi;
  while ((match = neonColorRegex.exec(cssCode)) !== null) {
    issues.push({
      type: 'oversaturated-neon',
      selectorOrProperty: match[0],
      reason: 'Oversaturated primary neon hue without tone dampening degrades editorial maturity.',
      remedy: 'Desaturate color or use as a pin-point accent with restrained opacity.',
    });
  }

  // Check 3: Over-frosted blur (>40px blur on backdrop-filter)
  const excessiveBlurRegex = /backdrop-filter:\s*blur\(\s*(?:[5-9]\d|\d{3,})px\)/gi;
  while ((match = excessiveBlurRegex.exec(cssCode)) !== null) {
    issues.push({
      type: 'blurry-glass',
      selectorOrProperty: match[0],
      reason: 'Excessive backdrop blur (>48px) causes severe GPU fill-rate drop and visual murkiness.',
      remedy: 'Keep backdrop-filter blur between 14px and 28px for optical clarity.',
    });
  }

  const score = Math.max(0, 100 - issues.length * 20);
  return {
    passed: issues.length === 0,
    score,
    issues,
  };
}
