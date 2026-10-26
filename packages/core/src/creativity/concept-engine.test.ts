import { describe, it, expect } from 'vitest';
import { IntentEngine } from '../intelligence/intent-engine.js';
import { ConceptGenerator } from './concept-generator.js';
import { ConceptEvaluator } from './concept-evaluator.js';

describe('ConceptGenerator & ConceptEvaluator (CWA 2.0)', () => {
  const intentEngine = new IntentEngine();
  const generator = new ConceptGenerator();
  const evaluator = new ConceptEvaluator();

  it('generates 3 distinct concepts (refined, experimental, immersive)', () => {
    const intent = intentEngine.analyze('Avant-garde digital studio portfolio with tactile interactions');
    const concepts = generator.generate(intent);

    expect(concepts.refined).toBeDefined();
    expect(concepts.experimental).toBeDefined();
    expect(concepts.immersive).toBeDefined();

    expect(concepts.refined.directionType).toBe('refined');
    expect(concepts.experimental.directionType).toBe('experimental');
    expect(concepts.immersive.directionType).toBe('immersive');

    // Distinct palettes
    expect(concepts.refined.palette.accent).not.toBe(concepts.experimental.palette.accent);
    // Distinct visual metaphors
    expect(concepts.refined.visualMetaphor).not.toBe(concepts.experimental.visualMetaphor);
  });

  it('evaluates candidate concepts across 9 criteria and produces winning concept', () => {
    const intent = intentEngine.analyze('Architectural monograph portfolio for an independent studio');
    const concepts = generator.generate(intent);
    const report = evaluator.evaluate(intent, concepts);

    expect(report.candidates.refined.scores.weightedTotal).toBeGreaterThan(0);
    expect(report.candidates.experimental.scores.weightedTotal).toBeGreaterThan(0);
    expect(report.candidates.immersive.scores.weightedTotal).toBeGreaterThan(0);
    expect(report.winningConcept).toBeDefined();
    expect(report.selectionRationale.length).toBeGreaterThan(20);
    expect(report.prescribedRefinements.length).toBeGreaterThanOrEqual(3);
  });

  it('supports hybrid synthesis when creative freedom is high', () => {
    const intent = intentEngine.analyze('Futuristic streetwear label with experimental interactive stickers');
    const concepts = generator.generate(intent);
    const report = evaluator.evaluate(intent, concepts);

    expect(report.winningConcept).toBeDefined();
    expect(report.winningConcept.signatureInteractionIdea).toBeDefined();
  });
});
