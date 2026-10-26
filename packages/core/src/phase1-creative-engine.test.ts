/**
 * PHASE 1 CREATIVE INTELLIGENCE ENGINE — Comprehensive End-to-End Test Suite
 *
 * Validates the complete Phase 1 autonomous flow:
 * Short Prompt → Intent Analysis → Knowledge Retrieval → Three Concepts → Concept Evaluation → Design DNA.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { describe, it, expect } from 'vitest';
import { IntentEngine } from './intelligence/intent-engine.js';
import { reasonAdaptiveArchetypes } from './archetype-matrix.js';
import { KnowledgeRetriever } from './intelligence/knowledge-retriever.js';
import { KnowledgeManager } from './knowledge-manager.js';
import { ConceptGenerator } from './creativity/concept-generator.js';
import { ConceptEvaluator } from './creativity/concept-evaluator.js';
import { DesignDNASystem } from './creativity/design-dna.js';

describe('PHASE 1 — Creative Intelligence Engine', () => {
  const km = new KnowledgeManager();
  const intentEngine = new IntentEngine();
  const conceptGenerator = new ConceptGenerator();
  const conceptEvaluator = new ConceptEvaluator();
  const dnaSystem = new DesignDNASystem();
  const retriever = new KnowledgeRetriever();

  it('transforms short prompt "Create a futuristic luxury automotive website with extraordinary animations." through complete Phase 1 flow', () => {
    const prompt = 'Create a futuristic luxury automotive website with extraordinary animations.';

    // 1. Intent Understanding
    const intent = intentEngine.analyze(prompt);
    expect(intent.category).toBe('automotive');
    expect(intent.industry).toContain('Automotive');
    expect(intent.brandPersonality.traits.length).toBeGreaterThan(0);
    expect(intent.emotionalDirection.desiredImpression).toBeDefined();
    expect(intent.visualIdentityOpportunities.materials.length).toBeGreaterThan(0);
    expect(intent.contentArchitecture.suggestedSections.length).toBeGreaterThanOrEqual(3);
    expect(intent.motionSuitability.level).toBe('cinematic'); // 'extraordinary animations'
    expect(intent.accessibilityRequirements.silentByDefault).toBe(true);
    expect(intent.explicitVsInferred.explicit).toContain('Cinematic animation expectations');

    // 2. Adaptive Archetype Reasoning
    const archetypeResult = reasonAdaptiveArchetypes(prompt, intent.category);
    expect(archetypeResult.primaryArchetype).toBeDefined();
    expect(archetypeResult.secondaryInspirations.length).toBeGreaterThanOrEqual(1);
    expect(archetypeResult.divergentDirections.length).toBe(3);
    // Archetypes are treated as inspirations, not rigid templates
    expect(archetypeResult.adaptiveDirectives.synthesisAdvice).toBeDefined();

    // 3. Intelligent Knowledge Retrieval
    const retrieval = retriever.retrieve(intent, km);
    expect(retrieval.primaryTechniques.length).toBeGreaterThanOrEqual(1);
    expect(retrieval.totalEvaluated).toBeGreaterThan(0);
    expect(retrieval.retrievalRationale.toLowerCase()).toContain('automotive');
    // Silent by Default check: no audio techniques retrieved since prompt didn't request sound
    expect(retrieval.primaryTechniques.some(t => t.tags.includes('audio'))).toBe(false);

    // 4. Creative Concept Exploration (3 divergent directions)
    const concepts = conceptGenerator.generate(intent);
    expect(concepts.refined).toBeDefined();
    expect(concepts.experimental).toBeDefined();
    expect(concepts.immersive).toBeDefined();

    // Verify concepts differ in design philosophy, layout composition & hero experience (not merely colors)
    expect(concepts.refined.layoutPhilosophy).not.toBe(concepts.experimental.layoutPhilosophy);
    expect(concepts.experimental.layoutPhilosophy).not.toBe(concepts.immersive.layoutPhilosophy);
    expect(concepts.refined.heroExperience).toBeDefined();
    expect(concepts.experimental.heroExperience).toBeDefined();
    expect(concepts.immersive.heroExperience).toBeDefined();
    expect(concepts.refined.sectionStructure.length).toBeGreaterThanOrEqual(3);
    expect(concepts.refined.feasibilityScore).toBeGreaterThan(0);

    // 5. Creative Concept Evaluation (9 explicit criteria)
    const evaluation = conceptEvaluator.evaluate(intent, concepts);
    expect(evaluation.winningConcept).toBeDefined();
    expect(evaluation.selectionRationale.length).toBeGreaterThan(20);
    expect(evaluation.candidates.refined.scores.weightedTotal).toBeGreaterThan(70);
    expect(evaluation.candidates.experimental.scores.weightedTotal).toBeGreaterThan(70);
    expect(evaluation.candidates.immersive.scores.weightedTotal).toBeGreaterThan(70);
    expect(evaluation.candidates.refined.scores.briefAlignment).toBeDefined();
    expect(evaluation.candidates.refined.scores.originality).toBeDefined();
    expect(evaluation.candidates.refined.scores.brandRelevance).toBeDefined();
    expect(evaluation.candidates.refined.scores.visualCoherence).toBeDefined();
    expect(evaluation.candidates.refined.scores.uxClarity).toBeDefined();
    expect(evaluation.candidates.refined.scores.performanceFeasibility).toBeDefined();
    expect(evaluation.candidates.refined.scores.accessibility).toBeDefined();
    expect(evaluation.candidates.refined.scores.technicalFeasibility).toBeDefined();

    // 6. Design DNA Generation
    const dna = dnaSystem.generate(evaluation.winningConcept, intent);
    expect(dna.projectName).toBeDefined();
    expect(dna.brandPersonality.traits.length).toBeGreaterThan(0);
    expect(dna.visualMetaphor).toBeDefined();
    expect(dna.typography.scale.sizes.base).toContain('clamp(');
    expect(dna.typography.scale.sizes['5xl']).toContain('clamp(');
    expect(dna.layout.containerWidth).toBeDefined();
    expect(dna.colorSystem.palette.background).toBeDefined();
    expect(dna.colorSystem.contrastVerified).toBe(true);
    expect(dna.materials.surfaceStyle).toBeDefined();
    expect(dna.motion.profile).toBeDefined();
    expect(dna.interaction.buttonStyle).toBeDefined();
    expect(dna.responsiveBehavior.touchTargetMinPx).toBeGreaterThanOrEqual(44);

    // Verify machine-readable CSS custom properties output
    const cssVars = dnaSystem.toCSSVariables(dna);
    expect(cssVars).toContain('--cwa-bg:');
    expect(cssVars).toContain('--cwa-accent:');
    expect(cssVars).toContain('--cwa-fs-base: clamp(');
    expect(cssVars).toContain('--cwa-shadow-tactile:');
  });

  it('allows explicit instructions to override inferred defaults', () => {
    const prompt = 'Architectural monograph portfolio in light mode with no animations and strict WCAG AAA contrast';
    const intent = intentEngine.analyze(prompt);

    // Inferred would be dark mode and subtle motion, but explicit overrides
    expect(intent.explicitVsInferred.explicit).toContain('Strict light chromatic theme');
    expect(intent.explicitVsInferred.explicit).toContain('Zero-motion preference');
    expect(intent.explicitVsInferred.explicit).toContain('Elevated contrast target (WCAG AAA)');
    expect(intent.accessibilityRequirements.targetStandard).toBe('WCAG_AAA');
    expect(intent.motionSuitability.level).toBe('none');

    // Generate concepts with the light constraint
    const concepts = conceptGenerator.generate(intent);
    expect(concepts.refined.palette.background).toBe('#faf9f6'); // Light background
  });

  it('generates different creative directions for different projects in the same industry', () => {
    const promptA = 'High-velocity Formula 1 racing telemetry system with carbon fiber';
    const promptB = 'Handmade bespoke luxury grand tourer coachbuilder atelier';

    const intentA = intentEngine.analyze(promptA);
    const intentB = intentEngine.analyze(promptB);

    expect(intentA.industry).toContain('Automotive');
    expect(intentB.industry).toContain('Automotive');

    // Both are automotive, but intent analysis infers different personalities & goals
    expect(intentA.brandPersonality.voiceTone).not.toBe(intentB.brandPersonality.voiceTone);
    expect(intentA.emotionalDirection.energyLevel).not.toBe(intentB.emotionalDirection.energyLevel);

    const adaptiveA = reasonAdaptiveArchetypes(promptA);
    const adaptiveB = reasonAdaptiveArchetypes(promptB);

    // They receive different archetype inspirations
    expect(adaptiveA.primaryArchetype.id).toBe('high-speed-sport');
    expect(adaptiveB.primaryArchetype.id).not.toBe('high-speed-sport');
  });
});
