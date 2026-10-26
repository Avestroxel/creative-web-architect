import { describe, it, expect } from 'vitest';
import { IntentEngine } from './intent-engine.js';

describe('IntentEngine (CWA 2.0)', () => {
  const engine = new IntentEngine();

  it('transforms short 1-line prompt into an exhaustive structured brief', () => {
    const prompt = 'Create a premium portfolio website for a futuristic architecture studio.';
    const intent = engine.analyze(prompt);

    expect(intent.rawPrompt).toBe(prompt);
    expect(intent.category).toBe('architecture');
    expect(intent.industry).toBe('Architecture & Spatial Design');
    expect(intent.businessPurpose).toContain('monumental');
    expect(intent.targetAudience.primaryNeeds.length).toBeGreaterThan(0);
    expect(intent.brandPersonality.traits).toContain('monumental');
    expect(intent.contentArchitecture.suggestedSections.length).toBeGreaterThanOrEqual(4);
    expect(intent.accessibilityRequirements.silentByDefault).toBe(true);
    expect(intent.accessibilityRequirements.contrastRatio).toBe(4.5);
    expect(intent.accessibilityRequirements.minTouchTargetPx).toBe(44);
    expect(intent.confidenceAndUncertainty.overallConfidence).toBeGreaterThanOrEqual(0.7);
  });

  it('detects explicit constraints such as single-file HTML deliverable', () => {
    const prompt = 'Single file landing page for a Formula 1 racing team with circuit trace';
    const intent = engine.analyze(prompt);

    expect(intent.category).toBe('automotive');
    expect(intent.explicitVsInferred.explicit).toContain('Single self-contained HTML deliverable');
    expect(intent.motionSuitability.level).toBe('cinematic');
  });

  it('enforces silent-by-default policy when audio is unrequested', () => {
    const prompt = 'High-end watchmaker boutique showcase with curtain loader';
    const intent = engine.analyze(prompt);

    expect(intent.accessibilityRequirements.silentByDefault).toBe(true);
    expect(intent.confidenceAndUncertainty.assumptions).toContain(
      'Assumed silent-by-default audio policy as no sound was requested'
    );
  });
});
