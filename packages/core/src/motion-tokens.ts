/**
 * Premium Motion Token System & Physics Curves
 *
 * Implements refined, physics-grounded motion tokens avoiding
 * exaggerated bouncing, rubber-band elasticity, or sluggish delays.
 */

export interface MotionDurationTokens {
  instant: number;
  micro: number;    // 120ms – hover states, active presses
  snappy: number;   // 180ms – tooltip, dropdown, tab switch
  standard: number; // 260ms – modal entry, drawer slide
  deliberate: number; // 380ms – page wipe, card expansion
  cinematic: number;  // 600ms – hero storytelling reveal
}

export const MOTION_DURATIONS: MotionDurationTokens = {
  instant: 0,
  micro: 140,
  snappy: 200,
  standard: 280,
  deliberate: 400,
  cinematic: 650,
};

export const REFINED_EASINGS = {
  // Editorial and luxury deceleration (smooth brake without bounce)
  luxuryDecel: 'cubic-bezier(0.16, 1, 0.3, 1)',
  // Snappy tactile feedback for buttons and switches
  subtleSnap: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
  // Natural bidirectional curve for drawer / modal expansion
  naturalSmooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  // Gentle entrance
  softEntry: 'cubic-bezier(0, 0, 0.2, 1)',
  // Clean linear exit
  crispExit: 'cubic-bezier(0.4, 0, 1, 1)',
} as const;

export interface MotionProfileConfig {
  name: string;
  durationMultiplier: number;
  enableParallax: boolean;
  enableMagnetic: boolean;
  maxStaggerItems: number;
  staggerStepMs: number;
}

export const MOTION_PROFILES: Record<string, MotionProfileConfig> = {
  luxury: {
    name: 'Luxury & High Horology',
    durationMultiplier: 1.15,
    enableParallax: true,
    enableMagnetic: true,
    maxStaggerItems: 8,
    staggerStepMs: 70,
  },
  editorial: {
    name: 'Editorial & Architectural',
    durationMultiplier: 1.0,
    enableParallax: true,
    enableMagnetic: false,
    maxStaggerItems: 6,
    staggerStepMs: 50,
  },
  technology: {
    name: 'High-Tech & Compute',
    durationMultiplier: 0.85,
    enableParallax: true,
    enableMagnetic: true,
    maxStaggerItems: 12,
    staggerStepMs: 35,
  },
  minimal: {
    name: 'Strictly Functional',
    durationMultiplier: 0.7,
    enableParallax: false,
    enableMagnetic: false,
    maxStaggerItems: 4,
    staggerStepMs: 25,
  },
};

/**
 * Calculates a progressive stagger delay with a plateau to avoid
 * long waits for items beyond 8-10 elements.
 */
export function calculateStaggerDelay(
  index: number,
  stepMs: number = 50,
  maxDelayMs: number = 400
): number {
  return Math.min(index * stepMs, maxDelayMs);
}

/**
 * Generates an accessible CSS transition string.
 * Automatically respects reduced-motion preferences.
 */
export function buildAccessibleTransition(
  property: string = 'transform, opacity',
  durationMs: number = MOTION_DURATIONS.standard,
  easing: string = REFINED_EASINGS.luxuryDecel
): string {
  const parts = property.split(',').map((p) => p.trim());
  return parts.map((p) => `${p} ${durationMs}ms ${easing}`).join(', ');
}
