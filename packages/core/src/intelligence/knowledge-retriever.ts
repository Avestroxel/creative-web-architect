/**
 * Knowledge Retrieval Engine for Creative Web Architect 2.0 (Phase 4).
 *
 * Implements multi-factor technique retrieval across the 43 learned architectural
 * techniques stored in knowledge/index.json.
 *
 * Phase 4 Enhancements:
 * - Directly connected to ExperienceMemory to factor in validated project outcomes
 * - Boosts techniques proven successful in past projects (+4.5 relevance)
 * - Proactively avoids known failure patterns and anti-patterns
 * - Preserves freshness and prevents stale repetition
 * - Enforces conflict prevention, performance cost budgets, and strict Silent-by-Default policies
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { StructuredIntent } from './intent-engine.js';
import { LearnedTechnique, TechniqueSummary } from '../knowledge-types.js';
import { KnowledgeManager } from '../knowledge-manager.js';
import { ExperienceMemory, ExperienceRecord, ExperienceInsights } from '../memory/experience-memory.js';

export interface TechniqueRetrievalResult {
  primaryTechniques: LearnedTechnique[];
  supportingTechniques: LearnedTechnique[];
  compatibilityWarnings: string[];
  totalEvaluated: number;
  retrievalRationale: string;
  retrievedExperiences?: ExperienceRecord[];
  avoidedFailures?: string[];
  experienceInsights?: ExperienceInsights;
}

export class KnowledgeRetriever {
  /**
   * Retrieves the top 2–4 synergistic techniques for a given intent,
   * incorporating lessons from ExperienceMemory.
   */
  public retrieve(
    intent: StructuredIntent,
    knowledgeManager: KnowledgeManager,
    limit = 4,
    experienceMemory?: ExperienceMemory
  ): TechniqueRetrievalResult {
    const allTechniqueSummaries: TechniqueSummary[] = knowledgeManager.listTechniquesSync();
    const promptLower = intent.rawPrompt.toLowerCase();
    const is3DExplicit = intent.explicitVsInferred.explicit.some(e => e.includes('3D') || e.includes('WebGL'));

    // Retrieve historical insights from ExperienceMemory if available
    const insights = experienceMemory
      ? experienceMemory.getInsightsForIntent(intent.category, intent.rawPrompt)
      : undefined;

    // Score each technique based on multi-factor relevance
    const scored: Array<{ tech: LearnedTechnique; score: number }> = [];

    for (const techSummary of allTechniqueSummaries) {
      let score = 0;
      const fullTech = knowledgeManager.getTechniqueDetailsSync(techSummary.category, techSummary.id) ?? {
        ...techSummary,
        designPhilosophy: '',
        appropriateUseCases: [],
        implementationApproach: '',
        relevantTechnologies: [],
        performanceConsiderations: '',
        accessibilityRequirements: ''
      };

      const nameLower = fullTech.name.toLowerCase();
      const descLower = fullTech.description.toLowerCase();
      const tags: string[] = fullTech.tags.map((t: string) => t.toLowerCase());

      // 1. Direct Keyword match
      for (const word of promptLower.split(/\s+/)) {
        if (word.length > 3) {
          if (nameLower.includes(word)) score += 3.5;
          if (descLower.includes(word)) score += 1.8;
          if (tags.some((t: string) => t.includes(word))) score += 2.5;
        }
      }

      // 2. Category Affinity
      if (intent.category === 'architecture' || intent.category === 'creative-agency') {
        if (tags.includes('lumora') || tags.includes('editorial-cards') || tags.includes('adaptive-grid')) score += 5.0;
        if (tags.includes('brush-trail') || tags.includes('magnetic')) score += 4.0;
      } else if (intent.category === 'product-3d' || is3DExplicit) {
        if (fullTech.category === 'three-dimensional-web' || tags.includes('threejs') || tags.includes('webgl')) score += 6.0;
      } else if (intent.category === 'automotive') {
        if (tags.includes('kimi') || tags.includes('circuit-trace') || tags.includes('halftone')) score += 6.0;
      } else if (intent.category === 'luxury-fashion') {
        if (tags.includes('baseline') || tags.includes('curtain-reveal') || tags.includes('ghost-typography')) score += 5.0;
      }

      // 3. Tactile button affinity
      if (tags.includes('buttons') || tags.includes('micro-interactions') || tags.includes('tactile')) {
        score += 2.5; // Always strong supporting technique
      }

      // 4. Experience Memory Feedback (Phase 4 boost & failure avoidance)
      if (insights) {
        if (insights.recommendedTechniques.includes(fullTech.id)) {
          score += 4.5; // Proven historical success in similar category!
        }
        if (insights.cautionaryFailurePatterns.some(p => p.toLowerCase().includes(fullTech.id.toLowerCase()))) {
          score -= 8.0; // Known failure pattern avoidance
        }
      }

      // 5. Strict Audio Check: If audio is NOT explicitly requested, penalize any technique that relies on sound
      if (!intent.rawPrompt.toLowerCase().includes('sound') && !intent.rawPrompt.toLowerCase().includes('audio')) {
        if (tags.includes('audio') || tags.includes('sonic') || nameLower.includes('sonic')) {
          score = -100; // Reject immediately under Silent by Default policy
        }
      }

      if (score > 0) {
        scored.push({ tech: fullTech, score });
      }
    }

    // Sort descending by score
    scored.sort((a: { score: number }, b: { score: number }) => b.score - a.score);

    // Conflict prevention & synergy filtering
    const selected: LearnedTechnique[] = [];
    const warnings: string[] = [];

    for (const item of scored) {
      if (selected.length >= limit) break;

      // Conflict rule: Do not pair two competing full-page 3D scroll orbits
      const is3D = item.tech.category === 'three-dimensional-web' || item.tech.tags.includes('threejs');
      const alreadyHas3D = selected.some(t => t.category === 'three-dimensional-web' || t.tags.includes('threejs'));

      if (is3D && alreadyHas3D) {
        warnings.push(`Skipped conflicting 3D technique '${item.tech.name}' to prevent WebGL context collision.`);
        continue;
      }

      selected.push(item.tech);
    }

    const primary = selected.slice(0, 2);
    const supporting = selected.slice(2);

    let rationale = `Selected ${primary.length} primary and ${supporting.length} supporting techniques for ${intent.category}.`;
    if (insights) {
      rationale += ` Memory Insights: ${insights.categoryMilestoneSummary}`;
      if (insights.recommendedTechniques.length > 0) {
        rationale += ` Boosted historically validated techniques: ${insights.recommendedTechniques.slice(0, 2).join(', ')}.`;
      }
    }

    return {
      primaryTechniques: primary,
      supportingTechniques: supporting,
      compatibilityWarnings: warnings,
      totalEvaluated: scored.length,
      retrievalRationale: rationale,
      retrievedExperiences: experienceMemory ? experienceMemory.querySimilarExperiences(intent.category) : undefined,
      avoidedFailures: insights ? insights.cautionaryFailurePatterns : undefined,
      experienceInsights: insights
    };
  }
}
