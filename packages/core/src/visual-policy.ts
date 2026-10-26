/**
 * Visual Policy & Adaptive Aesthetic Architecture for Creative Web Architect 2.0 (Phase 4).
 *
 * Enforces the "Refined Lighting & Material Policy" as a sensible default while
 * flexibly supporting diverse, contextually appropriate aesthetic expressions:
 * - Minimalism (restrained whitespace, monochromatic elegance)
 * - Editorial Layouts (asymmetric rhythm, high typographic contrast, tight reading measure)
 * - Brutalism (exposed structural borders, high-contrast monospace metadata)
 * - Maximalism (rich sensory layering, expressive collage, curated palette complexity)
 * - Experimental Typography (kinetic type, fluid clamp scaling, character waves)
 * - Cinematic Design (deep widescreen aspect ratios, Chiaroscuro lighting, subtle filmic grain)
 * - Advanced Motion & Spatial 3D (camera orbits, GLSL shaders, spring-driven physics)
 * - Bright or Neon Aesthetics When Justified (cyberpunk, arcade, nocturnal nightlife)
 *
 * Non-negotiable constraint: Never sacrifice accessibility, legibility, or functional correctness
 * for visual experimentation.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

export type AestheticStyleId =
  | 'refined-default'
  | 'minimalism'
  | 'editorial'
  | 'brutalism'
  | 'maximalism'
  | 'experimental-typography'
  | 'cinematic'
  | 'advanced-motion'
  | 'spatial-3d'
  | 'justified-neon';

export interface VisualPolicyConfig {
  styleId: AestheticStyleId;
  name: string;
  allowNeonGlow: boolean;
  maxDropShadowBlur: number;
  maxBackdropBlur: number;
  maxColorSaturation: number;
  enforceHairlineBorders: boolean;
  minContrastRatio: number; // WCAG AA minimum 4.5:1
  readingMeasureMaxCh: number;
}

export const REFINED_VISUAL_POLICY: VisualPolicyConfig = {
  styleId: 'refined-default',
  name: 'Refined Contemporary Architectural (Default)',
  allowNeonGlow: false,
  maxDropShadowBlur: 32, // No 80px-120px neon blobs
  maxBackdropBlur: 28,   // Crisp optical refraction, not muddy blur
  maxColorSaturation: 75, // Avoid 100% saturated electric hues by default
  enforceHairlineBorders: true, // 1px or 0.5px refined borders
  minContrastRatio: 4.5,
  readingMeasureMaxCh: 75
};

export const CONTEXTUAL_AESTHETIC_POLICIES: Record<AestheticStyleId, VisualPolicyConfig> = {
  'refined-default': REFINED_VISUAL_POLICY,

  'minimalism': {
    styleId: 'minimalism',
    name: 'Pure Swiss Minimalism',
    allowNeonGlow: false,
    maxDropShadowBlur: 16,
    maxBackdropBlur: 20,
    maxColorSaturation: 60,
    enforceHairlineBorders: true,
    minContrastRatio: 7.0, // High AAA contrast
    readingMeasureMaxCh: 65
  },

  'editorial': {
    styleId: 'editorial',
    name: 'Archival Magazine & Editorial Layout',
    allowNeonGlow: false,
    maxDropShadowBlur: 24,
    maxBackdropBlur: 24,
    maxColorSaturation: 70,
    enforceHairlineBorders: true,
    minContrastRatio: 4.5,
    readingMeasureMaxCh: 60
  },

  'brutalism': {
    styleId: 'brutalism',
    name: 'Neo-Brutalism & Structural Rawness',
    allowNeonGlow: false,
    maxDropShadowBlur: 0, // Hard offset shadow, zero blur!
    maxBackdropBlur: 0,
    maxColorSaturation: 90,
    enforceHairlineBorders: false, // 2px-3px thick exposed structural borders
    minContrastRatio: 7.0,
    readingMeasureMaxCh: 70
  },

  'maximalism': {
    styleId: 'maximalism',
    name: 'Curated Layered Maximalism',
    allowNeonGlow: false,
    maxDropShadowBlur: 40,
    maxBackdropBlur: 32,
    maxColorSaturation: 85,
    enforceHairlineBorders: false,
    minContrastRatio: 4.5,
    readingMeasureMaxCh: 75
  },

  'experimental-typography': {
    styleId: 'experimental-typography',
    name: 'Kinetic & Experimental Typography',
    allowNeonGlow: false,
    maxDropShadowBlur: 30,
    maxBackdropBlur: 24,
    maxColorSaturation: 80,
    enforceHairlineBorders: true,
    minContrastRatio: 4.5,
    readingMeasureMaxCh: 65
  },

  'cinematic': {
    styleId: 'cinematic',
    name: 'Widescreen Chiaroscuro Cinematic',
    allowNeonGlow: false,
    maxDropShadowBlur: 36,
    maxBackdropBlur: 30,
    maxColorSaturation: 75,
    enforceHairlineBorders: true,
    minContrastRatio: 4.5,
    readingMeasureMaxCh: 70
  },

  'advanced-motion': {
    styleId: 'advanced-motion',
    name: 'High-Kinematic Interactive Motion',
    allowNeonGlow: false,
    maxDropShadowBlur: 32,
    maxBackdropBlur: 28,
    maxColorSaturation: 80,
    enforceHairlineBorders: true,
    minContrastRatio: 4.5,
    readingMeasureMaxCh: 70
  },

  'spatial-3d': {
    styleId: 'spatial-3d',
    name: 'Procedural 3D WebGL Spatial Experience',
    allowNeonGlow: false,
    maxDropShadowBlur: 36,
    maxBackdropBlur: 28,
    maxColorSaturation: 80,
    enforceHairlineBorders: true,
    minContrastRatio: 4.5,
    readingMeasureMaxCh: 70
  },

  'justified-neon': {
    styleId: 'justified-neon',
    name: 'Contextual High-Vibrancy Nightlife / Arcade / Cyberpunk',
    allowNeonGlow: true, // Calibrated multi-tier accents allowed when justified
    maxDropShadowBlur: 45,
    maxBackdropBlur: 32,
    maxColorSaturation: 95,
    enforceHairlineBorders: true,
    minContrastRatio: 4.5,
    readingMeasureMaxCh: 70
  }
};

/**
 * Premium Dark Mode Palette
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

export interface AuditCSSOptions {
  aestheticStyle?: AestheticStyleId;
  allowJustifiedVibrancy?: boolean;
}

/**
 * Analyzes CSS property strings or rules for cheap visual anti-patterns with contextual adaptation.
 */
export function auditCSSVisualQuality(
  cssCode: string,
  options: AuditCSSOptions = {}
): {
  passed: boolean;
  score: number; // 0 to 100
  issues: AntiPatternIssue[];
  activePolicy: VisualPolicyConfig;
} {
  const activePolicy = options.aestheticStyle
    ? CONTEXTUAL_AESTHETIC_POLICIES[options.aestheticStyle] || REFINED_VISUAL_POLICY
    : (options.allowJustifiedVibrancy ? CONTEXTUAL_AESTHETIC_POLICIES['justified-neon'] : REFINED_VISUAL_POLICY);

  const issues: AntiPatternIssue[] = [];

  // Check 1: Excessive box-shadow glow (e.g. 0 0 50px #cyan, 0 0 80px rgb(...))
  const neonGlowRegex = !activePolicy.allowNeonGlow
    ? /box-shadow:[^;]*0\s+0\s+(?:[4-9]\d|\d{3,})px/gi
    : /box-shadow:[^;]*0\s+0\s+(?:[5-9]\d|\d{3,})px/gi;

  let match: RegExpExecArray | null;
  while ((match = neonGlowRegex.exec(cssCode)) !== null) {
    issues.push({
      type: 'excessive-glow',
      selectorOrProperty: match[0],
      reason: activePolicy.allowNeonGlow
        ? 'Uncalibrated massive glow blur (>48px) degrades aesthetic control even in justified neon contexts.'
        : 'Oversized box-shadow glow (>40px blur) creates cheap "neon gaming" aesthetics.',
      remedy: 'Replace with subtle directional shadow (e.g. 0 8px 24px rgba(0,0,0,0.12)) or tightly calibrated accent glow (<= 16px blur).',
    });
  }

  // Check 2: Pure saturated neon hex colors (e.g. #00FF00, #FF00FF, #00FFFF, #00F0FF) used as dominant borders/glows
  if (!activePolicy.allowNeonGlow && !options.allowJustifiedVibrancy) {
    const neonColorRegex = /#(?:00ff00|ff00ff|00ffff|ff0055|00f0ff)\b/gi;
    let match: RegExpExecArray | null;
    while ((match = neonColorRegex.exec(cssCode)) !== null) {
      issues.push({
        type: 'oversaturated-neon',
        selectorOrProperty: match[0],
        reason: 'Oversaturated primary neon hue without tone dampening degrades editorial maturity.',
        remedy: 'Desaturate color or use as a pin-point accent with restrained opacity.',
      });
    }
  }

  // Check 3: Over-frosted blur (>40px blur on backdrop-filter)
  const excessiveBlurRegex = /backdrop-filter:\s*blur\(\s*(?:[5-9]\d|\d{3,})px\)/gi;
  let blurMatch: RegExpExecArray | null;
  while ((blurMatch = excessiveBlurRegex.exec(cssCode)) !== null) {
    issues.push({
      type: 'blurry-glass',
      selectorOrProperty: blurMatch[0],
      reason: 'Excessive backdrop blur (>48px) causes severe GPU fill-rate drop and visual murkiness.',
      remedy: 'Keep backdrop-filter blur between 14px and 28px for optical clarity.',
    });
  }

  const score = Math.max(0, 100 - issues.length * 20);
  return {
    passed: issues.length === 0,
    score,
    issues,
    activePolicy
  };
}
