import { describe, it, expect } from 'vitest';
import { IntentEngine } from '../intelligence/intent-engine.js';
import { CognitiveBrain } from '../intelligence/cognitive-brain.js';
import { ConceptGenerator } from './concept-generator.js';
import { DesignDNASystem } from './design-dna.js';
import { ArtDirectorDialogue } from './art-director-dialogue.js';

describe('ArtDirectorDialogue', () => {
  it('conducts an internal creative review and generates actionable critique', () => {
    const intent = new IntentEngine().analyze('Avant-garde digital studio in Zurich');
    const cognitive = CognitiveBrain.synthesize(intent);
    const concepts = new ConceptGenerator().generate(intent);
    const dna = new DesignDNASystem().generate(concepts.refined, intent);

    const verdict = ArtDirectorDialogue.critique(concepts.refined, dna, cognitive);

    expect(verdict.status).toBe('APPROVED_FOR_SYNTHESIS');
    expect(verdict.craftScore).toBeGreaterThanOrEqual(85);
    expect(verdict.genericRiskScore).toBeLessThanOrEqual(15);
    expect(verdict.critiqueNotes.length).toBeGreaterThan(0);
    expect(verdict.injectedEnhancements.length).toBeGreaterThan(0);

    const directive = verdict.toPromptDirective();
    expect(directive).toContain('ART DIRECTOR INTERNAL MONOLOGUE');
    expect(directive).toContain('ZERO cheap neon glow');
    expect(directive).toContain('ZERO unrequested audio');
  });
});
