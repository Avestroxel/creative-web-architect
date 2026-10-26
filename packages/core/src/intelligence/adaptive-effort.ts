/**
 * Adaptive Reasoning Effort Profiler for Creative Web Architect 2.0.
 *
 * Intelligently balances computational and reasoning effort based on task complexity.
 * Maps prompts to FAST, DEEP_CREATIVE, or ARCHITECT_MAX execution profiles.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { StructuredIntent } from './intent-engine.js';

export type ReasoningProfile = 'FAST' | 'DEEP_CREATIVE' | 'ARCHITECT_MAX';

export interface ReasoningEffortConfig {
  profile: ReasoningProfile;
  conceptExplorationCount: number;
  maxRefinementIterations: number;
  enableHybridSynthesis: boolean;
  enableDeepMotionPlanning: boolean;
  enableSignatureInteractions: boolean;
  rationale: string;
}

export class AdaptiveEffortProfiler {
  /**
   * Infers the optimal reasoning effort profile for a task.
   */
  public inferProfile(intent: StructuredIntent, manualOverride?: ReasoningProfile): ReasoningEffortConfig {
    if (manualOverride) {
      return this.getConfigForProfile(manualOverride, 'Manually specified by caller.');
    }

    const lower = intent.rawPrompt.toLowerCase();

    // 1. FAST Profile: Single component, minor tweak, simple edit
    if (
      lower.includes('button only') ||
      lower.includes('fix ') ||
      lower.includes('change color') ||
      lower.includes('micro-component') ||
      (lower.split(/\s+/).length < 5 && !lower.includes('website') && !lower.includes('portfolio') && !lower.includes('studio'))
    ) {
      return this.getConfigForProfile(
        'FAST',
        'Task detected as single component or targeted modification; applying FAST execution profile.'
      );
    }

    // 2. ARCHITECT_MAX Profile: Highly demanding, immersive, 3D, complex physics, awards showcase
    if (
      intent.category === 'product-3d' ||
      intent.category === 'automotive' ||
      lower.includes('awwwards') ||
      lower.includes('fwa') ||
      lower.includes('three.js') ||
      lower.includes('webgl') ||
      lower.includes('spatial') ||
      lower.includes('shader') ||
      lower.includes('experimental') ||
      intent.creativeFreedomLevel === 'high'
    ) {
      return this.getConfigForProfile(
        'ARCHITECT_MAX',
        'Complex, spatial, or high-novelty creative mandate detected; deploying ARCHITECT_MAX depth.'
      );
    }

    // 3. DEEP_CREATIVE Profile: Default for complete professional websites
    return this.getConfigForProfile(
      'DEEP_CREATIVE',
      'Standard complete website generation; deploying DEEP_CREATIVE profile with 3-concept evaluation and bounded refinement.'
    );
  }

  private getConfigForProfile(profile: ReasoningProfile, rationale: string): ReasoningEffortConfig {
    switch (profile) {
      case 'FAST':
        return {
          profile: 'FAST',
          conceptExplorationCount: 1,
          maxRefinementIterations: 1,
          enableHybridSynthesis: false,
          enableDeepMotionPlanning: false,
          enableSignatureInteractions: false,
          rationale
        };

      case 'DEEP_CREATIVE':
        return {
          profile: 'DEEP_CREATIVE',
          conceptExplorationCount: 3,
          maxRefinementIterations: 3,
          enableHybridSynthesis: true,
          enableDeepMotionPlanning: true,
          enableSignatureInteractions: true,
          rationale
        };

      case 'ARCHITECT_MAX':
        return {
          profile: 'ARCHITECT_MAX',
          conceptExplorationCount: 3,
          maxRefinementIterations: 5,
          enableHybridSynthesis: true,
          enableDeepMotionPlanning: true,
          enableSignatureInteractions: true,
          rationale
        };
    }
  }
}
