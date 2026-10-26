import { describe, it, expect } from 'vitest';
import { ExperienceMemory } from './experience-memory.js';

describe('ExperienceMemory (CWA 2.0 Persistent Memory)', () => {
  const memory = new ExperienceMemory();

  it('contains seeded historical validated experiences', () => {
    const records = memory.getAllRecords();
    expect(records.length).toBeGreaterThanOrEqual(4);
    expect(records.some(r => r.briefSummary.includes('Lenis smooth-scroll'))).toBe(true);
  });

  it('records a new validated outcome with generated ID and timestamp', () => {
    const newRecord = memory.recordExperience({
      category: 'architecture',
      industry: 'Contemporary Timber Architecture',
      briefSummary: 'Minimalist timber pavilion portfolio',
      selectedConceptId: 'concept-refined',
      techniquesUsed: ['adaptive-rem-grid-with-physics-gated-reveals-and-ghost-typography'],
      criticScore: 98,
      criticFindings: [],
      correctionsApplied: ['Verified WCAG AA contrast'],
      status: 'validated-success',
      keyTakeaway: 'Timber pavilion presentation succeeds with high whitespace and limestone tones.'
    });

    expect(newRecord.id).toContain('exp-');
    expect(newRecord.timestamp).toBeDefined();

    const queried = memory.querySimilarExperiences('architecture');
    expect(queried.length).toBeGreaterThanOrEqual(1);
  });

  it('returns best practices and known failure patterns to prevent recurring mistakes', () => {
    const practices = memory.getBestPracticesForCategory('creative-agency');
    expect(practices.length).toBeGreaterThan(0);

    const failures = memory.getKnownFailurePatterns();
    expect(failures).toContain(
      'Synthesizing unrequested Web Audio / SFX violates user expectations and breaks accessibility'
    );
    expect(failures).toContain(
      'Applying large neon glows (>35px blur) degrades visual maturity to cheap amateur aesthetics'
    );
  });
});
