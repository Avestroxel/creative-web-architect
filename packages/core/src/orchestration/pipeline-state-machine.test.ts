/**
 * Pipeline State Machine Test Suite for Creative Web Architect 2.0 (Phase 2).
 *
 * Verifies stage transitions, validation gates, dependency boundaries,
 * error handling, and trace generation.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { describe, it, expect } from 'vitest';
import { PipelineStateMachine } from './pipeline-state-machine.js';

describe('PipelineStateMachine (Phase 2)', () => {
  it('initializes all stages in idle state with explicit prerequisites', () => {
    const sm = new PipelineStateMachine();
    const intentStage = sm.getStage('intent_analysis');
    const websiteStage = sm.getStage('website_implementation');
    const browserStage = sm.getStage('browser_evaluation');

    expect(intentStage.status).toBe('idle');
    expect(intentStage.prerequisites).toEqual([]);

    expect(websiteStage.status).toBe('idle');
    expect(websiteStage.prerequisites).toEqual(['design_dna', 'motion_planning']);

    expect(browserStage.status).toBe('idle');
    expect(browserStage.prerequisites).toEqual(['website_implementation']);
  });

  it('prevents starting a stage when prerequisites are not completed', () => {
    const sm = new PipelineStateMachine();

    // Trying to start concept_exploration without intent_analysis or knowledge_retrieval
    expect(() => {
      sm.startStage('concept_exploration', { dummy: true });
    }).toThrow(/prerequisite "intent_analysis" has status "idle"/);

    const stage = sm.getStage('concept_exploration');
    expect(stage.status).toBe('failed');
  });

  it('transitions sequentially through stages with post-condition validation', () => {
    const sm = new PipelineStateMachine();

    // 1. Intent Analysis
    sm.startStage('intent_analysis', 'Sample prompt');
    sm.completeStage('intent_analysis', { category: 'automotive' }, (out) => ({
      valid: Boolean(out.category),
      errors: out.category ? [] : ['Missing category']
    }));
    expect(sm.getStage('intent_analysis').status).toBe('completed');
    expect(sm.getStage('intent_analysis').validation.passed).toBe(true);

    // 2. Knowledge Retrieval
    sm.startStage('knowledge_retrieval', { category: 'automotive' });
    sm.completeStage('knowledge_retrieval', { techniques: ['telemetry'] });
    expect(sm.getStage('knowledge_retrieval').status).toBe('completed');

    // 3. Concept Exploration
    sm.startStage('concept_exploration', { category: 'automotive' });
    sm.completeStage('concept_exploration', { concepts: ['refined', 'experimental'] });
    expect(sm.getStage('concept_exploration').status).toBe('completed');
  });

  it('fails stage when post-condition validation fails', () => {
    const sm = new PipelineStateMachine();

    sm.startStage('intent_analysis', 'Sample prompt');
    expect(() => {
      sm.completeStage('intent_analysis', { category: '' }, (out) => ({
        valid: Boolean(out.category),
        errors: ['Invalid empty category']
      }));
    }).toThrow(/post-validation failed: Invalid empty category/);

    const stage = sm.getStage('intent_analysis');
    expect(stage.status).toBe('failed');
    expect(stage.validation.passed).toBe(false);
  });

  it('prevents skipped or failed stages from being reported as successful in execution trace', () => {
    const sm = new PipelineStateMachine();

    sm.startStage('intent_analysis', 'Sample prompt');
    sm.completeStage('intent_analysis', { category: 'fashion' });

    sm.startStage('knowledge_retrieval', { category: 'fashion' });
    sm.failStage('knowledge_retrieval', 'Network failure during retrieval');

    expect(sm.isSuccessful()).toBe(false);

    const trace = sm.getExecutionTrace('Sample prompt', 'DEEP_CREATIVE');
    expect(trace.isSuccessful).toBe(false);
    expect(trace.errors.length).toBeGreaterThanOrEqual(1);
    expect(trace.errors[0]).toContain('Network failure during retrieval');
  });
});
