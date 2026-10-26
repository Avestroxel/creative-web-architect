import { describe, it, expect } from 'vitest';
import { CreativePipeline } from './creative-pipeline.js';

describe('CreativePipeline End-to-End (CWA 2.0)', () => {
  const pipeline = new CreativePipeline();

  it('transforms 1-line prompt into verified, refined HTML website with full architectural blueprint', () => {
    const prompt = 'Create an avant-garde digital design and engineering studio portfolio with tactile interactions';
    const result = pipeline.execute(prompt);

    expect(result.rawPrompt).toBe(prompt);
    expect(result.intent.category).toBe('creative-agency');
    expect(['DEEP_CREATIVE', 'ARCHITECT_MAX']).toContain(result.effortConfig.profile);
    expect(result.techniqueRetrieval.primaryTechniques.length).toBeGreaterThanOrEqual(1);
    expect(result.concepts.refined).toBeDefined();
    expect(result.winningConcept).toBeDefined();
    expect(result.designDNA).toBeDefined();
    expect(result.motionPlan.techniques.length).toBeGreaterThanOrEqual(2);
    expect(result.signatureExperiences.length).toBeGreaterThanOrEqual(1);

    // HTML assertions
    expect(result.generatedHtml).toContain('<!DOCTYPE html>');
    expect(result.generatedHtml).toContain('Creative Web Architect 2.0 Engine');
    expect(result.generatedHtml).toContain('100% Silent by Default');
    expect(result.generatedHtml).toContain('--cwa-bg:');
    expect(result.generatedHtml).toContain('--cwa-font-display:');
    expect(result.generatedHtml).toContain('cwa-hero');
    expect(result.generatedHtml).toContain('cwa-card');

    // Refinement assertions
    expect(result.refinementResult).toBeDefined();
    expect(result.refinementResult?.isPassingGrade).toBe(true);

    // Persistent memory assertion
    expect(result.recordedExperience).toBeDefined();
    expect(result.recordedExperience?.status).toBe('validated-success');
    expect(result.executionTimeMs).toBeGreaterThan(0);
  });

  it('executes FAST profile for simple component requests', () => {
    const prompt = 'button only';
    const result = pipeline.execute(prompt, { effortProfile: 'FAST' });

    expect(result.effortConfig.profile).toBe('FAST');
    expect(result.effortConfig.maxRefinementIterations).toBe(1);
  });
});
