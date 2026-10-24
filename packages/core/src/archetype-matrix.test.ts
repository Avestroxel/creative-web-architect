import { describe, it, expect } from 'vitest';
import {
  classifyPromptArchetype,
  validateTechniqueSynergy,
  ARCHETYPE_DEFINITIONS
} from './archetype-matrix.js';

describe('Archetype Matrix & Technique Decision Engine', () => {
  it('correctly classifies a creative design studio prompt', () => {
    const prompt = 'Recreate this site: Lumora — Independent Design & Engineering Studio crafting digital products and brand systems.';
    const result = classifyPromptArchetype(prompt);

    expect(result.archetype.id).toBe('studio-engineering');
    expect(result.confidence).toBe('high');
    expect(result.selectedTechniqueIds).toContain('dual-image-liquid-cursor-brush-reveal');
    expect(result.recommendedSkills).toContain('creative-direction');
    expect(result.designDirectives.palette.ink).toBe('#0a0a0a');
  });

  it('correctly classifies an F1 racing and motorsport prompt', () => {
    const prompt = 'Build a high-performance F1 driver platform with racing telemetry, circuit trace, and aerodynamic speed visuals.';
    const result = classifyPromptArchetype(prompt);

    expect(result.archetype.id).toBe('high-speed-sport');
    expect(result.selectedTechniqueIds).toContain('curvature-time-dilated-circuit-trace');
    expect(result.selectedTechniqueIds).toContain('packed-delta-lattice-halftone-matrix');
  });

  it('correctly classifies a 3D beverage / consumer product prompt', () => {
    const prompt = 'Create a 3D beverage experience with a floating soda can, flavor switching, and liquid bubbles.';
    const result = classifyPromptArchetype(prompt);

    expect(result.archetype.id).toBe('physical-product-3d');
    expect(result.selectedTechniqueIds).toContain('model-viewer-cursor-tilt-and-forcefield-repulsion');
  });

  it('correctly classifies an auteur cinema and film editorial prompt', () => {
    const prompt = 'Auteur cinematography showcase inspired by 35mm archival film and Swiss editorial typography.';
    const result = classifyPromptArchetype(prompt);

    expect(result.archetype.id).toBe('auteur-cinematic');
    expect(result.selectedTechniqueIds).toContain('mission-architectural-philosophy');
  });

  it('flags technique synergy conflicts between competing horizontal hijackers', () => {
    const conflicting = ['inertia-horizontal-film-pan', 'dual-row-scroll-coupled-marquee-kinematics'];
    const check = validateTechniqueSynergy(conflicting);

    expect(check.isCompatible).toBe(false);
    expect(check.conflicts.length).toBeGreaterThan(0);
  });

  it('validates harmonious synergistic technique combinations', () => {
    const harmonious = [
      'dual-image-liquid-cursor-brush-reveal',
      'damped-magnetic-cursor-follow-physics',
      'tactile-button-physics-and-micro-kinematics'
    ];
    const check = validateTechniqueSynergy(harmonious);

    expect(check.isCompatible).toBe(true);
    expect(check.conflicts).toHaveLength(0);
  });
});
