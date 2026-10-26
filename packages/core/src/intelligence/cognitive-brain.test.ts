import { describe, it, expect } from 'vitest';
import { IntentEngine } from './intent-engine.js';
import { CognitiveBrain } from './cognitive-brain.js';

describe('CognitiveBrain', () => {
  it('synthesizes a concrete physical metaphor for architecture briefs', () => {
    const brief = new IntentEngine().analyze('Minimalist concrete architecture studio portfolio in Tokyo');
    const profile = CognitiveBrain.synthesize(brief);

    expect(profile.metaphor.name).toContain('Basalt');
    expect(profile.metaphor.physicalAnalogy).toContain('volcanic stone');
    expect(profile.hook.focalAnchor).toBeDefined();
    expect(profile.hook.negativeSpaceRatio).toContain('45%');
    expect(profile.layout.asymmetryRatio).toContain('65% / 35%');
    expect(profile.psychology.primaryEmotion).toBe('quiet-exclusivity');
  });

  it('synthesizes high-velocity print-atelier metaphor for streetwear fashion briefs', () => {
    const brief = new IntentEngine().analyze('Underground street-luxe fashion lookbook');
    const profile = CognitiveBrain.synthesize(brief);

    expect(profile.metaphor.name).toContain('Print-Atelier');
    expect(profile.psychology.primaryEmotion).toBe('raw-street-velocity');
    expect(profile.psychology.perceivedCraftLevel).toBe('avant-garde-kinetic');
  });

  it('generates machine-readable CSS directives and prompt directives', () => {
    const brief = new IntentEngine().analyze('Haute horlogerie luxury mechanical watchmaker');
    const profile = CognitiveBrain.synthesize(brief);

    const directive = profile.toPromptDirective();
    expect(directive).toContain('COGNITIVE CREATIVE DIRECTIVE');
    expect(directive).toContain('Geneva Haute Horlogerie');

    const cssVars = profile.toCSSDirectives();
    expect(cssVars['--cwa-metaphor-name']).toBeDefined();
    expect(cssVars['--cwa-void-ratio']).toBeDefined();
  });
});
