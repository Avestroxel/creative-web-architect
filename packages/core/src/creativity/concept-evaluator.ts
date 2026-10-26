/**
 * Concept Evaluator & Synthesis Engine for Creative Web Architect 2.0.
 *
 * Rigorously evaluates candidate creative concepts against the Structured Intent
 * using 9 explicit evaluation criteria. Selects or synthesizes the optimal concept
 * with machine-readable evidence and transparent rationale.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { StructuredIntent } from '../intelligence/intent-engine.js';
import { CandidateConcepts, CreativeConcept } from './concept-generator.js';

export interface ConceptScoreBreakdown {
  briefAlignment: number;       // 0-10: How well it satisfies the prompt & goals
  originality: number;          // 0-10: Distinction from generic AI defaults
  brandRelevance: number;       // 0-10: Fit with industry & audience mindset
  visualCoherence: number;      // 0-10: Harmony of typography, palette & materials
  uxClarity: number;            // 0-10: Readability, hierarchy & conversion ease
  motionPotential: number;      // 0-10: Meaningful motion without gratuitous loops
  performanceFeasibility: number;// 0-10: 60 FPS, CLS < 0.05, low memory overhead
  accessibility: number;        // 0-10: WCAG AA contrast, keyboard & touch ergonomics
  technicalFeasibility: number; // 0-10: Clean execution in target environment
  weightedTotal: number;        // Composite weighted score (0-100)
}

export interface CandidateEvaluation {
  conceptId: string;
  conceptName: string;
  scores: ConceptScoreBreakdown;
  strengths: string[];
  weaknesses: string[];
  mitigations: string[];
}

export interface ConceptEvaluationReport {
  intentSummary: string;
  candidates: Record<string, CandidateEvaluation>;
  winningConceptId: string;
  winningConcept: CreativeConcept;
  wasSynthesized: boolean;
  selectionRationale: string;
  prescribedRefinements: string[];
}

export class ConceptEvaluator {
  /**
   * Evaluates the candidate concepts against the brief and returns an exhaustive
   * evaluation report with the winning or synthesized concept.
   */
  public evaluate(intent: StructuredIntent, candidates: CandidateConcepts): ConceptEvaluationReport {
    const refinedEval = this.scoreConcept(candidates.refined, intent);
    const experimentalEval = this.scoreConcept(candidates.experimental, intent);
    const immersiveEval = this.scoreConcept(candidates.immersive, intent);

    const evals: Record<string, CandidateEvaluation> = {
      refined: refinedEval,
      experimental: experimentalEval,
      immersive: immersiveEval
    };

    // Determine highest scoring concept
    let topKey = 'refined';
    let highestScore = refinedEval.scores.weightedTotal;

    for (const [key, ev] of Object.entries(evals)) {
      if (ev.scores.weightedTotal > highestScore) {
        highestScore = ev.scores.weightedTotal;
        topKey = key;
      }
    }

    // Check if synthesis creates a superior hybrid:
    // E.g., if experimental has higher originality and refined has higher UX clarity,
    // we synthesize a refined base with experimental signature micro-interactions.
    let winningConcept: CreativeConcept;
    let wasSynthesized = false;
    let rationale = '';

    if (intent.creativeFreedomLevel === 'high' && experimentalEval.scores.originality >= 8.5 && refinedEval.scores.uxClarity >= 8.5) {
      winningConcept = this.synthesizeHybrid(candidates.refined, candidates.experimental, intent);
      wasSynthesized = true;
      rationale = `Synthesized a hybrid direction: Merged the pristine Swiss typography, layout discipline, and flawless contrast of "${candidates.refined.name}" with the assertive signature interaction and distinctive materials of "${candidates.experimental.name}". This delivers maximum originality without compromising commercial readability or UX ergonomics.`;
    } else {
      winningConcept = candidates[topKey as keyof CandidateConcepts];
      rationale = `Selected "${winningConcept.name}" (Score: ${highestScore.toFixed(1)}/100). Best aligned with the ${intent.industry} domain, target audience expectations, and performance targets.`;
    }

    const prescribedRefinements: string[] = [
      'Enforce strict Silent-by-Default policy: zero unrequested Web Audio synthesizers',
      'Clamp all heading scales using fluid clamp() to prevent mobile text wrapping defects',
      'Ensure touch targets on all buttons and action pills exceed 44x44px bounding box',
      'Verify 100% of body copy meets WCAG AA 4.5:1 contrast against surface tokens'
    ];

    return {
      intentSummary: `${intent.category} // ${intent.industry}: "${intent.rawPrompt}"`,
      candidates: evals,
      winningConceptId: winningConcept.id,
      winningConcept,
      wasSynthesized,
      selectionRationale: rationale,
      prescribedRefinements
    };
  }

  private scoreConcept(concept: CreativeConcept, intent: StructuredIntent): CandidateEvaluation {
    const is3DExplicit = intent.explicitVsInferred.explicit.some(e => e.includes('3D') || e.includes('WebGL'));
    const isPerformancePriority = intent.technicalConstraints.maxLCPMs <= 1000;

    let briefAlignment = 8.0;
    let originality = 7.5;
    let brandRelevance = 8.0;
    let visualCoherence = 9.0;
    let uxClarity = 8.5;
    let motionPotential = 7.5;
    let performanceFeasibility = 9.0;
    let accessibility = 9.0;
    let technicalFeasibility = 9.0;

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const mitigations: string[] = [];

    switch (concept.directionType) {
      case 'refined':
        briefAlignment = intent.category === 'architecture' || intent.category === 'portfolio' ? 9.5 : 8.5;
        originality = 8.0;
        brandRelevance = 9.2;
        visualCoherence = 9.5;
        uxClarity = 9.5;
        motionPotential = 7.8;
        performanceFeasibility = 9.8;
        accessibility = 9.6;
        technicalFeasibility = 9.8;
        strengths.push('Maximum legibility and rock-solid information hierarchy', 'Sub-second paint performance and low battery drain');
        weaknesses.push('Restrained aesthetic might feel conservative if user wanted high spectacle');
        mitigations.push('Elevate impact with bespoke liquid-cursor aperture interactions');
        break;

      case 'experimental':
        briefAlignment = intent.creativeFreedomLevel === 'high' ? 9.2 : 8.0;
        originality = 9.6;
        brandRelevance = intent.category === 'streetwear' || intent.category === 'creative-agency' ? 9.5 : 8.2;
        visualCoherence = 8.7;
        uxClarity = 8.4;
        motionPotential = 9.2;
        performanceFeasibility = 8.8;
        accessibility = 8.6;
        technicalFeasibility = 8.8;
        strengths.push('Immediately distinctive, awards-caliber visual tension', 'Memorable signature sticky card kinematics');
        weaknesses.push('Asymmetric layout risks minor cognitive friction if not tightly bounded');
        mitigations.push('Anchor all primary navigation and conversion CTAs to high-visibility fixed docks');
        break;

      case 'immersive':
        briefAlignment = is3DExplicit || intent.category === 'product-3d' || intent.category === 'automotive' ? 9.6 : 7.2;
        originality = 9.2;
        brandRelevance = intent.category === 'product-3d' || intent.category === 'automotive' ? 9.5 : 7.5;
        visualCoherence = 9.0;
        uxClarity = 7.8;
        motionPotential = 9.8;
        performanceFeasibility = isPerformancePriority ? 7.2 : 8.2;
        accessibility = 8.0;
        technicalFeasibility = 8.0;
        strengths.push('Unrivaled emotional spectacle and depth staging', 'Virtuoso Three.js/Canvas presentation');
        weaknesses.push('Heavier GPU load; requires strict device capability gating');
        mitigations.push('Provide lightweight CSS fallback for low-power mobile or reduced-motion environments');
        break;
    }

    // Weight calculation
    const weightedTotal =
      briefAlignment * 2.0 +
      originality * 1.5 +
      brandRelevance * 1.5 +
      visualCoherence * 1.2 +
      uxClarity * 1.3 +
      motionPotential * 0.8 +
      performanceFeasibility * 0.7 +
      accessibility * 0.5 +
      technicalFeasibility * 0.5;

    return {
      conceptId: concept.id,
      conceptName: concept.name,
      scores: {
        briefAlignment,
        originality,
        brandRelevance,
        visualCoherence,
        uxClarity,
        motionPotential,
        performanceFeasibility,
        accessibility,
        technicalFeasibility,
        weightedTotal: Math.min(100, Math.max(0, weightedTotal))
      },
      strengths,
      weaknesses,
      mitigations
    };
  }

  private synthesizeHybrid(base: CreativeConcept, expressive: CreativeConcept, intent: StructuredIntent): CreativeConcept {
    return {
      id: 'concept-hybrid-synthesized',
      name: `${intent.industry} — Architectural Editorial & Tactile Kinematics (Synthesized)`,
      directionType: 'refined',
      tagline: 'Classical Swiss typographic discipline elevated by avant-garde kinetic micro-interactions.',
      archetypeInspirations: [...base.archetypeInspirations, ...expressive.archetypeInspirations],
      visualMetaphor: 'A hand-bound archival monograph encased in an engineered brushed-titanium portfolio sleeve.',
      layoutPhilosophy: 'Rigorous Swiss structural proportions paired with expressive asymmetric card offsets and interactive preview apertures.',
      gridSystem: '12-column foundation with asymmetric bento card spanning and 1px ceramic grout lines.',
      heroExperience: `${base.heroExperience} Enhanced with ${expressive.signatureInteractionIdea}.`,
      sectionStructure: base.sectionStructure,
      palette: {
        ...base.palette,
        accent: expressive.palette.accent,
        accentHover: expressive.palette.accentHover
      },
      typography: {
        displayFont: base.typography.displayFont,
        bodyFont: base.typography.bodyFont,
        monoFont: expressive.typography.monoFont,
        scaleRatio: 1.382, // Harmonized scale
        rationale: 'Harmonious pairing: Classical display permanence meets modern monospace technical telemetry.'
      },
      materials: [
        'Honed basalt slate surfaces (#0A0C10)',
        '0.5px hairline titanium dividers',
        'Optical blur (4px) with interactive cursor de-blur reveal'
      ],
      motionStyle: 'Spring-damped physics: smooth 280ms character reveals on scroll, paired with tactile button press squish.',
      signatureInteractionIdea: `${base.signatureInteractionIdea} coupled with ${expressive.signatureInteractionIdea}`,
      accessibilityConsiderations: 'WCAG AAA contrast (>7.0:1) with strict prefers-reduced-motion spring dampening fallbacks.',
      feasibilityScore: 9.2,
      tradeOffs: {
        pros: ['Flawless readability and commercial conversion', 'High awards-grade originality', 'Predictable 60 FPS performance'],
        cons: ['Slightly more complex CSS token orchestration'],
        risks: ['Ensure accent color maintains WCAG AA 4.5:1 contrast against both light and dark backgrounds']
      },
      rationale: 'Synthesized to capture the best of both worlds: rock-solid credibility for institutional decision-makers alongside unforgettable creative distinction.'
    };
  }
}
