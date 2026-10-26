/**
 * Motion Intelligence Engine for Creative Web Architect 2.0.
 *
 * Categorizes motion into 5 purposeful tiers (Narrative, Structural, Interactive, Micro, Ambient),
 * enforces hardware frame budgets, detects and resolves runtime conflicts (competing scroll controllers,
 * layout thrashing, unthrottled rAF loops), selects motion libraries based on genuine technical needs,
 * and guarantees accessible reduced-motion fallbacks.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { StructuredIntent } from '../intelligence/intent-engine.js';
import { CreativeConcept } from './concept-generator.js';

export type MotionTier = 'narrative' | 'structural' | 'interactive' | 'micro' | 'ambient';

export type TechnicalImplementationType =
  | 'css-transitions'
  | 'css-keyframes'
  | 'web-animations-api'
  | 'spring-physics'
  | 'canvas-2d'
  | 'webgl-shader';

export type LibraryRecommendation =
  | 'pure-css-waapi'
  | 'spring-solver'
  | 'three-minimal'
  | 'canvas-context';

export interface DeviceMotionBehavior {
  desktop: string;
  mobileTouch: string;
  lowPower: string;
}

export interface MotionPerformanceSpec {
  maxFrameBudgetMs: number;
  requiresCompositorOnly: boolean;
  willChangeHint: boolean;
  gpuImpact: 'negligible' | 'low' | 'moderate' | 'high';
  autoPauseOffscreen: boolean;
}

export interface MotionTechniqueSpec {
  id: string;
  name: string;
  tier: MotionTier;
  purpose: string;
  trigger: 'page-load' | 'scroll-progress' | 'hover' | 'click' | 'viewport-enter' | 'continuous-ambient';
  duration: string;
  easing: string;
  technicalImplementation: TechnicalImplementationType;
  propertiesAnimated: string[];
  deviceBehavior: DeviceMotionBehavior;
  performanceBudget: MotionPerformanceSpec;
  reducedMotionAlternative: string;
  cleanupLifecycle: string;
}

export interface MotionConflictReport {
  hasConflicts: boolean;
  warnings: string[];
  safeRemediations: string[];
  detectedIssues: {
    competingScrollControllers: boolean;
    layoutThrashing: boolean;
    excessiveRafLoops: boolean;
    heavyMobileGpuLoad: boolean;
    missingReducedMotionGuard: boolean;
  };
}

export interface MotionPlan {
  isMotionJustified: boolean;
  overallPersonality: 'calm' | 'fluid' | 'cinematic' | 'kinetic' | 'none';
  selectedLibrary: LibraryRecommendation;
  libraryRationale: string;
  techniques: MotionTechniqueSpec[];
  conflictReport: MotionConflictReport;
  reducedMotionPolicy: string;
  performanceGuardrails: {
    maxActiveRafLoops: number;
    enforceTransformOpacityOnly: boolean;
    autoPauseOffscreen: boolean;
    maxCompositorLayers: number;
  };
}

export class MotionIntelligenceEngine {
  /**
   * Plans purposeful, device-aware motion for a website based on intent, concept, and profile.
   */
  public plan(
    intent: StructuredIntent,
    concept: CreativeConcept,
    options: { executionMode?: 'FAST' | 'DEEP_CREATIVE' | 'ARCHITECT_MAX' } = {}
  ): MotionPlan {
    const isMotionRequested = intent.motionSuitability.level !== 'none';
    const isReducedMotionTarget = intent.accessibilityRequirements.prefersReducedMotion;
    const mode = options.executionMode || 'DEEP_CREATIVE';

    const techniques: MotionTechniqueSpec[] = [];

    // If explicit instruction requests zero motion, enforce strict static baseline
    if (!isMotionRequested) {
      return {
        isMotionJustified: false,
        overallPersonality: 'none',
        selectedLibrary: 'pure-css-waapi',
        libraryRationale: 'Zero-motion constraint active. Pure static CSS applied.',
        techniques: [],
        conflictReport: {
          hasConflicts: false,
          warnings: [],
          safeRemediations: [],
          detectedIssues: {
            competingScrollControllers: false,
            layoutThrashing: false,
            excessiveRafLoops: false,
            heavyMobileGpuLoad: false,
            missingReducedMotionGuard: false
          }
        },
        reducedMotionPolicy: 'All transitions replaced with instantaneous state changes (0.01ms duration).',
        performanceGuardrails: {
          maxActiveRafLoops: 0,
          enforceTransformOpacityOnly: true,
          autoPauseOffscreen: true,
          maxCompositorLayers: 0
        }
      };
    }

    // 1. Structural Motion (Hero & Section Entry) - Always included for natural layout choreography
    techniques.push({
      id: 'structural-stagger-reveal',
      name: 'Staggered Clip-Mask & Opacity Unfold',
      tier: 'structural',
      purpose: 'Introduce primary typography and visual containers in hierarchical cadence without layout jump.',
      trigger: 'viewport-enter',
      duration: '400ms',
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      technicalImplementation: 'css-transitions',
      propertiesAnimated: ['transform', 'opacity'],
      deviceBehavior: {
        desktop: 'Full vertical translation (translateY(24px) to 0) with 80ms stagger delay.',
        mobileTouch: 'Soft opacity fade (200ms) with zero translateY translation to prevent touch scroll hitch.',
        lowPower: 'Instantaneous paint with zero animation duration.'
      },
      performanceBudget: {
        maxFrameBudgetMs: 16.6,
        requiresCompositorOnly: true,
        willChangeHint: false,
        gpuImpact: 'negligible',
        autoPauseOffscreen: true
      },
      reducedMotionAlternative: 'Instant display with opacity: 1 and transform: none.',
      cleanupLifecycle: 'Remove transition classes upon transitionend to release browser compositor layers.'
    });

    // 2. Interactive Motion (Tactile Buttons & Haptics) - Always included
    techniques.push({
      id: 'interactive-tactile-squish',
      name: 'Tactile Button Spring Squish & Meniscus Fill',
      tier: 'interactive',
      purpose: 'Deliver tactile confirmation of user intent upon hover and active click.',
      trigger: 'hover',
      duration: '240ms',
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      technicalImplementation: 'spring-physics',
      propertiesAnimated: ['transform'],
      deviceBehavior: {
        desktop: 'Fluid spring hover (scale(1.02)) and depression (translateY(1.5px) scale(0.985)) on mousedown.',
        mobileTouch: 'Instant CSS :active state background darken with zero scale bounce.',
        lowPower: 'Static color contrast shift without spatial scaling.'
      },
      performanceBudget: {
        maxFrameBudgetMs: 8.0,
        requiresCompositorOnly: true,
        willChangeHint: false,
        gpuImpact: 'negligible',
        autoPauseOffscreen: false
      },
      reducedMotionAlternative: 'Instant background color change without spatial scaling.',
      cleanupLifecycle: 'Self-resetting on pointerup or pointerleave.'
    });

    // 3. Narrative Motion (Scroll-Coupled Typography or Cards) - DEEP_CREATIVE and ARCHITECT_MAX
    if (mode !== 'FAST' && (intent.motionSuitability.level === 'choreographed' || intent.motionSuitability.level === 'cinematic')) {
      techniques.push({
        id: 'narrative-scroll-character-wave',
        name: 'Scroll-Synchronized Character Opacity Wave',
        tier: 'narrative',
        purpose: 'Draw reader attention down editorial narrative blocks via scroll progress.',
        trigger: 'scroll-progress',
        duration: 'Continuous scroll-coupled',
        easing: 'linear',
        technicalImplementation: 'web-animations-api',
        propertiesAnimated: ['opacity'],
        deviceBehavior: {
          desktop: 'Opacity wave mapped to normalized scroll percentage via requestAnimationFrame.',
          mobileTouch: 'Fallback to section-level viewport-enter opacity transition to conserve mobile battery.',
          lowPower: 'Standard static high-contrast text.'
        },
        performanceBudget: {
          maxFrameBudgetMs: 12.0,
          requiresCompositorOnly: true,
          willChangeHint: true,
          gpuImpact: 'low',
          autoPauseOffscreen: true
        },
        reducedMotionAlternative: 'Static 100% opacity text with high-contrast typography.',
        cleanupLifecycle: 'Disconnect IntersectionObserver and scroll listeners on component unmount.'
      });
    }

    // 4. Micro-Interactions (Magnetic Follow & Status Pulse) - DEEP_CREATIVE and ARCHITECT_MAX
    if (mode !== 'FAST' && intent.interactionExpectations.cursorRelationship !== 'none') {
      techniques.push({
        id: 'micro-magnetic-cursor-follow',
        name: 'Damped Magnetic Cursor Proximity Ring',
        tier: 'micro',
        purpose: 'Provide tactile proximity feedback when pointer approaches interactive targets.',
        trigger: 'hover',
        duration: '300ms (0.08 LERP)',
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        technicalImplementation: 'spring-physics',
        propertiesAnimated: ['transform'],
        deviceBehavior: {
          desktop: 'Smooth LERP ring following mouse cursor and magnetically latching to buttons.',
          mobileTouch: 'Hidden completely via media query: @media (pointer: coarse) { display: none; }',
          lowPower: 'Disabled completely.'
        },
        performanceBudget: {
          maxFrameBudgetMs: 10.0,
          requiresCompositorOnly: true,
          willChangeHint: true,
          gpuImpact: 'low',
          autoPauseOffscreen: true
        },
        reducedMotionAlternative: 'Disabled completely via @media (prefers-reduced-motion: reduce).',
        cleanupLifecycle: 'rAF loop cancelled when pointer leaves window.'
      });
    }

    // 5. Ambient Motion (Canvas dynamics when justified) - ARCHITECT_MAX or 3D / Automotive
    if (
      mode === 'ARCHITECT_MAX' ||
      concept.directionType === 'immersive' ||
      intent.category === 'product-3d' ||
      intent.category === 'automotive'
    ) {
      techniques.push({
        id: 'ambient-canvas-drift',
        name: 'Single-Pass Canvas Mesh Gradient Drift',
        tier: 'ambient',
        purpose: 'Evoke spatial depth and atmospheric mood in hero backdrop.',
        trigger: 'continuous-ambient',
        duration: 'Continuous (rAF)',
        easing: 'linear',
        technicalImplementation: 'canvas-2d',
        propertiesAnimated: ['canvas-pixels'],
        deviceBehavior: {
          desktop: 'Smooth 60fps single-pass canvas gradient drift throttled to 30fps when unfocused.',
          mobileTouch: 'Static radial gradient background: radial-gradient(circle at 50% 50%, ...).',
          lowPower: 'Static CSS gradient backdrop.'
        },
        performanceBudget: {
          maxFrameBudgetMs: 8.0,
          requiresCompositorOnly: false,
          willChangeHint: false,
          gpuImpact: 'moderate',
          autoPauseOffscreen: true
        },
        reducedMotionAlternative: 'Static CSS gradient backdrop.',
        cleanupLifecycle: 'Cancel rAF when hero scrolls out of viewport via IntersectionObserver.'
      });
    }

    const conflictReport = this.checkConflicts(techniques);

    // Library selection based on technical requirements
    let selectedLibrary: LibraryRecommendation = 'pure-css-waapi';
    let libraryRationale = 'Standard CSS transitions and Web Animations API provide native 60fps without runtime overhead.';

    if (intent.category === 'product-3d' && mode === 'ARCHITECT_MAX') {
      selectedLibrary = 'three-minimal';
      libraryRationale = 'Project requires genuine 3D perspective geometry and spatial camera orbit.';
    } else if (techniques.some(t => t.technicalImplementation === 'spring-physics')) {
      selectedLibrary = 'spring-solver';
      libraryRationale = 'Lightweight CSS spring easing tokens deliver physical tactile feedback without external library bundles.';
    } else if (techniques.some(t => t.technicalImplementation === 'canvas-2d')) {
      selectedLibrary = 'canvas-context';
      libraryRationale = 'Native HTML5 Canvas 2D context provides zero-dependency atmospheric backdrop.';
    }

    return {
      isMotionJustified: isMotionRequested,
      overallPersonality:
        intent.motionSuitability.level === 'cinematic' ? 'cinematic' :
        intent.motionSuitability.level === 'choreographed' ? 'fluid' :
        intent.motionSuitability.level === 'subtle' ? 'calm' : 'none',
      selectedLibrary,
      libraryRationale,
      techniques,
      conflictReport,
      reducedMotionPolicy: 'Always wrap non-essential spatial transitions in @media (prefers-reduced-motion: no-preference). Provide instantaneous state swaps when reduced motion is preferred.',
      performanceGuardrails: {
        maxActiveRafLoops: mode === 'ARCHITECT_MAX' ? 1 : 1,
        enforceTransformOpacityOnly: true,
        autoPauseOffscreen: true,
        maxCompositorLayers: mode === 'ARCHITECT_MAX' ? 6 : 4
      }
    };
  }

  /**
   * Comprehensive conflict checking across motion techniques.
   */
  public checkConflicts(
    techniques: MotionTechniqueSpec[],
    context: { hasExternalScrollHijack?: boolean; ambientLoopCount?: number } = {}
  ): MotionConflictReport {
    const warnings: string[] = [];
    const safeRemediations: string[] = [];

    // 1. Competing Scroll Controllers
    const scrollDrivenTechniques = techniques.filter(t => t.trigger === 'scroll-progress');
    const hasScrollConflicts = scrollDrivenTechniques.length > 2 || Boolean(context.hasExternalScrollHijack);

    if (hasScrollConflicts) {
      warnings.push('Multiple competing scroll listeners or external scroll hijackers detected.');
      safeRemediations.push('Consolidate all scroll calculations into a single throttled rAF scroll progress observer.');
    }

    // 2. Unthrottled / Multiple Ambient Loops
    const ambientCount = (context.ambientLoopCount ?? 0) + techniques.filter(t => t.tier === 'ambient').length;
    const hasExcessiveRaf = ambientCount > 1;
    if (hasExcessiveRaf) {
      warnings.push('Multiple continuous ambient animation loops detected. May cause battery drain and GPU thermal throttling.');
      safeRemediations.push('Consolidate ambient effects into a single shared requestAnimationFrame render loop.');
    }

    // 3. Layout-Thrashing CSS Properties
    const animatesLayoutProps = techniques.some(t =>
      t.propertiesAnimated.some(p => ['width', 'height', 'top', 'left', 'margin', 'padding'].includes(p))
    );
    if (animatesLayoutProps) {
      warnings.push('Layout-thrashing CSS properties detected (width, height, top, left). Triggers CPU reflow on every frame.');
      safeRemediations.push('Refactor all transitions to strictly use CSS transform (translate3d/scale) and opacity.');
    }

    // 4. Heavy Mobile GPU Load
    const hasHeavyGpu = techniques.some(t => t.performanceBudget.gpuImpact === 'high');
    if (hasHeavyGpu) {
      warnings.push('High GPU impact motion detected. May cause dropped frames on mobile devices.');
      safeRemediations.push('Disable or downgrade continuous effects on touch devices via @media (pointer: coarse).');
    }

    // 5. Missing Reduced Motion Guard
    const hasMissingReducedMotion = techniques.some(t => !t.reducedMotionAlternative);
    if (hasMissingReducedMotion) {
      warnings.push('One or more techniques lack explicit reduced-motion alternatives.');
      safeRemediations.push('Enforce @media (prefers-reduced-motion: reduce) overrides for all spatial transitions.');
    }

    const hasAnyConflicts = warnings.length > 0;

    return {
      hasConflicts: hasAnyConflicts,
      warnings,
      safeRemediations,
      detectedIssues: {
        competingScrollControllers: hasScrollConflicts,
        layoutThrashing: animatesLayoutProps,
        excessiveRafLoops: hasExcessiveRaf,
        heavyMobileGpuLoad: hasHeavyGpu,
        missingReducedMotionGuard: hasMissingReducedMotion
      }
    };
  }
}
