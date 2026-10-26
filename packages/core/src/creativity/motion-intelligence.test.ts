/**
 * Motion Intelligence Engine Test Suite for Creative Web Architect 2.0 (Phase 2).
 *
 * Verifies 5 motion tiers, device behavior adaptations, frame budgeting,
 * runtime conflict detection, and library selection.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { describe, it, expect } from 'vitest';
import { MotionIntelligenceEngine, MotionTechniqueSpec } from './motion-intelligence.js';
import { IntentEngine } from '../intelligence/intent-engine.js';
import { ConceptGenerator } from './concept-generator.js';

describe('MotionIntelligenceEngine (Phase 2)', () => {
  const motionEngine = new MotionIntelligenceEngine();
  const intentEngine = new IntentEngine();
  const conceptGenerator = new ConceptGenerator();

  it('plans across all 5 motion tiers for an immersive/architectural project', () => {
    const prompt = 'Create an extraordinary cinematic automotive showcase with high-speed telemetry';
    const intent = intentEngine.analyze(prompt);
    const concepts = conceptGenerator.generate(intent);

    const plan = motionEngine.plan(intent, concepts.immersive, { executionMode: 'ARCHITECT_MAX' });

    expect(plan.isMotionJustified).toBe(true);
    expect(plan.overallPersonality).toBe('cinematic');

    const tiers = plan.techniques.map(t => t.tier);
    expect(tiers).toContain('structural');
    expect(tiers).toContain('interactive');
    expect(tiers).toContain('narrative');
    expect(tiers).toContain('micro');
    expect(tiers).toContain('ambient');

    // Check device behaviors
    const structural = plan.techniques.find(t => t.tier === 'structural')!;
    expect(structural.deviceBehavior.desktop).toBeDefined();
    expect(structural.deviceBehavior.mobileTouch).toBeDefined();
    expect(structural.deviceBehavior.lowPower).toBeDefined();
    expect(structural.reducedMotionAlternative).toBeDefined();

    // Check performance guardrails
    expect(plan.performanceGuardrails.enforceTransformOpacityOnly).toBe(true);
    expect(plan.performanceGuardrails.maxActiveRafLoops).toBeLessThanOrEqual(1);
  });

  it('selects appropriate library based on technical requirements', () => {
    // 1. Standard agency portfolio -> spring solver or pure css
    const promptAgency = 'Modern creative studio portfolio';
    const intentAgency = intentEngine.analyze(promptAgency);
    const conceptsAgency = conceptGenerator.generate(intentAgency);
    const planAgency = motionEngine.plan(intentAgency, conceptsAgency.refined);

    expect(['pure-css-waapi', 'spring-solver']).toContain(planAgency.selectedLibrary);
    expect(planAgency.libraryRationale).toBeDefined();

    // 2. Physical 3D product in ARCHITECT_MAX -> three-minimal
    const prompt3D = 'Physical watch luxury 3d spatial showcase with WebGL orbit';
    const intent3D = intentEngine.analyze(prompt3D);
    const concepts3D = conceptGenerator.generate(intent3D);
    const plan3D = motionEngine.plan(intent3D, concepts3D.immersive, { executionMode: 'ARCHITECT_MAX' });

    expect(plan3D.selectedLibrary).toBe('three-minimal');
    expect(plan3D.libraryRationale).toContain('3D perspective geometry');
  });

  it('detects and reports runtime motion conflicts', () => {
    const conflictingTechniques: MotionTechniqueSpec[] = [
      {
        id: 'bad-tech-1',
        name: 'Reflow Layout Resizer',
        tier: 'structural',
        purpose: 'Bad layout animation',
        trigger: 'scroll-progress',
        duration: '300ms',
        easing: 'linear',
        technicalImplementation: 'css-transitions',
        propertiesAnimated: ['width', 'height', 'top'], // Layout thrashing!
        deviceBehavior: { desktop: '', mobileTouch: '', lowPower: '' },
        performanceBudget: {
          maxFrameBudgetMs: 16.6,
          requiresCompositorOnly: false,
          willChangeHint: false,
          gpuImpact: 'high',
          autoPauseOffscreen: false
        },
        reducedMotionAlternative: '', // Missing reduced motion!
        cleanupLifecycle: ''
      },
      {
        id: 'bad-tech-2',
        name: 'Compete Scroll Handler 1',
        tier: 'narrative',
        purpose: 'Scroll scrub',
        trigger: 'scroll-progress',
        duration: '100ms',
        easing: 'linear',
        technicalImplementation: 'web-animations-api',
        propertiesAnimated: ['transform'],
        deviceBehavior: { desktop: '', mobileTouch: '', lowPower: '' },
        performanceBudget: {
          maxFrameBudgetMs: 16.6,
          requiresCompositorOnly: true,
          willChangeHint: true,
          gpuImpact: 'low',
          autoPauseOffscreen: true
        },
        reducedMotionAlternative: 'Static',
        cleanupLifecycle: ''
      },
      {
        id: 'bad-tech-3',
        name: 'Compete Scroll Handler 2',
        tier: 'narrative',
        purpose: 'Scroll scrub 2',
        trigger: 'scroll-progress',
        duration: '100ms',
        easing: 'linear',
        technicalImplementation: 'web-animations-api',
        propertiesAnimated: ['opacity'],
        deviceBehavior: { desktop: '', mobileTouch: '', lowPower: '' },
        performanceBudget: {
          maxFrameBudgetMs: 16.6,
          requiresCompositorOnly: true,
          willChangeHint: true,
          gpuImpact: 'low',
          autoPauseOffscreen: true
        },
        reducedMotionAlternative: 'Static',
        cleanupLifecycle: ''
      }
    ];

    const report = motionEngine.checkConflicts(conflictingTechniques, {
      hasExternalScrollHijack: true,
      ambientLoopCount: 2
    });

    expect(report.hasConflicts).toBe(true);
    expect(report.detectedIssues.competingScrollControllers).toBe(true);
    expect(report.detectedIssues.layoutThrashing).toBe(true);
    expect(report.detectedIssues.excessiveRafLoops).toBe(true);
    expect(report.detectedIssues.heavyMobileGpuLoad).toBe(true);
    expect(report.detectedIssues.missingReducedMotionGuard).toBe(true);
    expect(report.safeRemediations.length).toBeGreaterThanOrEqual(3);
  });

  it('enforces strict static baseline with zero techniques when motion is explicitly rejected', () => {
    const prompt = 'Technical documentation with no animation and zero motion';
    const intent = intentEngine.analyze(prompt);
    const concepts = conceptGenerator.generate(intent);

    const plan = motionEngine.plan(intent, concepts.refined);

    expect(plan.isMotionJustified).toBe(false);
    expect(plan.overallPersonality).toBe('none');
    expect(plan.techniques.length).toBe(0);
    expect(plan.performanceGuardrails.maxActiveRafLoops).toBe(0);
  });
});
