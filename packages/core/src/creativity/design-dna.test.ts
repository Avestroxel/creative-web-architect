import { describe, it, expect } from 'vitest';
import { IntentEngine } from '../intelligence/intent-engine.js';
import { ConceptGenerator } from './concept-generator.js';
import { DesignDNASystem } from './design-dna.js';

describe('DesignDNASystem (CWA 2.0)', () => {
  const intentEngine = new IntentEngine();
  const conceptGenerator = new ConceptGenerator();
  const dnaSystem = new DesignDNASystem();

  it('synthesizes exhaustive Design DNA from winning concept and intent', () => {
    const intent = intentEngine.analyze('Luxury horology boutique showcase with champagne gold accents');
    const concepts = conceptGenerator.generate(intent);
    const dna = dnaSystem.generate(concepts.refined, intent);

    expect(dna.projectName).toBe(intent.industry);
    expect(dna.colorSystem.contrastVerified).toBe(true);
    expect(dna.typography.scale.sizes['5xl']).toContain('clamp(');
    expect(dna.layout.measureMax).toBe('65ch');
    expect(dna.materials.backdropBlurPx).toBe(14);
    expect(dna.responsiveBehavior.touchTargetMinPx).toBe(44);
  });

  it('generates valid CSS custom properties string', () => {
    const intent = intentEngine.analyze('B2B financial intelligence dashboard with bento grid');
    const concepts = conceptGenerator.generate(intent);
    const dna = dnaSystem.generate(concepts.refined, intent);
    const cssVars = dnaSystem.toCSSVariables(dna);

    expect(cssVars).toContain('--cwa-bg:');
    expect(cssVars).toContain('--cwa-surface:');
    expect(cssVars).toContain('--cwa-ink:');
    expect(cssVars).toContain('--cwa-accent:');
    expect(cssVars).toContain('--cwa-font-display:');
    expect(cssVars).toContain('--cwa-fs-base:');
    expect(cssVars).toContain('--cwa-touch-min: 44px');
  });

  it('generates concise prompt directive for AI coding agents', () => {
    const intent = intentEngine.analyze('Tokyo streetwear label drop');
    const concepts = conceptGenerator.generate(intent);
    const dna = dnaSystem.generate(concepts.experimental, intent);
    const directive = dnaSystem.toPromptDirective(dna);

    expect(directive).toContain('DESIGN DNA ARCHITECTURAL DIRECTIVE');
    expect(directive).toContain('Strict Silent by Default');
    expect(directive).toContain('Zero cheap purple neon bloom');
  });
});
