/**
 * Signature Experience Generator Test Suite for Creative Web Architect 2.0 (Phase 2).
 *
 * Verifies dynamic proposal of project-specific signature interactions,
 * executable code snippets, and accessibility considerations.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { describe, it, expect } from 'vitest';
import { SignatureExperienceGenerator } from './signature-experience.js';
import { IntentEngine } from '../intelligence/intent-engine.js';
import { ConceptGenerator } from './concept-generator.js';
import { DesignDNASystem } from './design-dna.js';

describe('SignatureExperienceGenerator (Phase 2)', () => {
  const sigGenerator = new SignatureExperienceGenerator();
  const intentEngine = new IntentEngine();
  const conceptGenerator = new ConceptGenerator();
  const dnaSystem = new DesignDNASystem();

  it('generates domain-specific signature experiences with executable snippets', () => {
    // 1. Automotive -> Kinematic Telemetry Ribbon
    const autoIntent = intentEngine.analyze('Supercar automotive brand showcase');
    const autoConcept = conceptGenerator.generate(autoIntent).immersive;
    const autoDNA = dnaSystem.generate(autoConcept, autoIntent);

    const autoSigs = sigGenerator.propose(autoIntent, autoConcept, autoDNA);
    expect(autoSigs.length).toBeGreaterThanOrEqual(1);

    const autoPrimary = autoSigs[0];
    expect(autoPrimary.id).toBe('sig-kinematic-telemetry-ribbon');
    expect(autoPrimary.interactionModel).toBe('scroll-coupled');
    expect(autoPrimary.executableSnippet.html).toContain('cwa-telemetry');
    expect(autoPrimary.executableSnippet.css).toContain('.cwa-telemetry-hud');
    expect(autoPrimary.executableSnippet.js).toContain('addEventListener');
    expect(autoPrimary.mobileAlternative).toBeDefined();
    expect(autoPrimary.reducedMotionAlternative).toBeDefined();

    // 2. Architecture -> Liquid Cursor Aperture
    const archIntent = intentEngine.analyze('Minimalist brutalist architecture studio');
    const archConcept = conceptGenerator.generate(archIntent).refined;
    const archDNA = dnaSystem.generate(archConcept, archIntent);

    const archSigs = sigGenerator.propose(archIntent, archConcept, archDNA);
    const archPrimary = archSigs[0];
    expect(archPrimary.id).toBe('sig-liquid-cursor-aperture');
    expect(archPrimary.interactionModel).toBe('canvas-reveal');

    // 3. Fintech -> Monospace Cipher Scramble
    const finIntent = intentEngine.analyze('High-frequency algorithmic quantitative trading platform');
    const finConcept = conceptGenerator.generate(finIntent).experimental;
    const finDNA = dnaSystem.generate(finConcept, finIntent);

    const finSigs = sigGenerator.propose(finIntent, finConcept, finDNA);
    const finPrimary = finSigs[0];
    expect(finPrimary.id).toBe('sig-monospace-cipher-decrypt');
    expect(finPrimary.interactionModel).toBe('cipher-scramble');
  });

  it('proposes tactile button interaction as secondary signature conversion point', () => {
    const intent = intentEngine.analyze('Fashion house monograph portfolio');
    const concept = conceptGenerator.generate(intent).refined;
    const dna = dnaSystem.generate(concept, intent);

    const sigs = sigGenerator.propose(intent, concept, dna);
    expect(sigs.length).toBeGreaterThanOrEqual(2);

    const buttonSig = sigs[1];
    expect(buttonSig.id).toBe('sig-hyper-tactile-action-drawer');
    expect(buttonSig.anchorSection).toBe('cta');
    expect(buttonSig.interactionModel).toBe('tactile-press');
    expect(buttonSig.executableSnippet.html).toContain('cwa-btn-meniscus');
  });
});
