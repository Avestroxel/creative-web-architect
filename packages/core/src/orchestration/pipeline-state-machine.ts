/**
 * Pipeline State Machine for Creative Web Architect 2.0.
 *
 * Manages the sequential, typed transitions between all pipeline stages:
 * Intent Analysis → Knowledge Retrieval → Concept Exploration → Concept Selection → Design DNA → Motion Planning → Website Implementation.
 *
 * Guarantees:
 * - Typed inputs and outputs per stage
 * - Explicit execution status (idle, pending, running, completed, failed, skipped)
 * - Strict prerequisite dependency boundaries
 * - Pre- and post-condition validations
 * - Structured timestamped logs
 * - Prevents failed or skipped stages from being reported as successful
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

export type PipelineStageId =
  | 'intent_analysis'
  | 'knowledge_retrieval'
  | 'concept_exploration'
  | 'concept_selection'
  | 'design_dna'
  | 'motion_planning'
  | 'website_implementation'
  | 'browser_evaluation';

export type StageStatus = 'idle' | 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export interface StageLogEntry {
  timestamp: number;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  data?: any;
}

export interface StageValidation {
  passed: boolean;
  errors: string[];
}

export interface PipelineStage<TInput = any, TOutput = any> {
  id: PipelineStageId;
  name: string;
  prerequisites: PipelineStageId[];
  status: StageStatus;
  startTime?: number;
  endTime?: number;
  durationMs?: number;
  input?: TInput;
  output?: TOutput;
  error?: string;
  logs: StageLogEntry[];
  validation: StageValidation;
}

export interface ExecutionTrace {
  prompt: string;
  mode: 'FAST' | 'DEEP_CREATIVE' | 'ARCHITECT_MAX';
  stages: Record<PipelineStageId, PipelineStage>;
  stageSequence: PipelineStageId[];
  isSuccessful: boolean;
  totalDurationMs: number;
  errors: string[];
  summary: string;
}

export class PipelineStateMachine {
  private stages: Map<PipelineStageId, PipelineStage> = new Map();
  private readonly stageOrder: PipelineStageId[] = [
    'intent_analysis',
    'knowledge_retrieval',
    'concept_exploration',
    'concept_selection',
    'design_dna',
    'motion_planning',
    'website_implementation',
    'browser_evaluation'
  ];

  constructor() {
    this.initStages();
  }

  private initStages(): void {
    const stageDefs: Array<{ id: PipelineStageId; name: string; prerequisites: PipelineStageId[] }> = [
      { id: 'intent_analysis', name: 'Intent Intelligence Analysis', prerequisites: [] },
      { id: 'knowledge_retrieval', name: 'Knowledge & Skill Retrieval', prerequisites: ['intent_analysis'] },
      { id: 'concept_exploration', name: 'Creative Concept Exploration', prerequisites: ['intent_analysis', 'knowledge_retrieval'] },
      { id: 'concept_selection', name: 'Concept Evaluation & Selection', prerequisites: ['concept_exploration'] },
      { id: 'design_dna', name: 'Design DNA Synthesis', prerequisites: ['concept_selection'] },
      { id: 'motion_planning', name: 'Motion Intelligence & Signature Planning', prerequisites: ['design_dna'] },
      { id: 'website_implementation', name: 'Physical Website Implementation', prerequisites: ['design_dna', 'motion_planning'] },
      { id: 'browser_evaluation', name: 'Browser Visual & Interaction QA', prerequisites: ['website_implementation'] }
    ];

    for (const def of stageDefs) {
      this.stages.set(def.id, {
        id: def.id,
        name: def.name,
        prerequisites: def.prerequisites,
        status: 'idle',
        logs: [],
        validation: { passed: false, errors: [] }
      });
    }
  }

  /**
   * Retrieves a stage by ID.
   */
  public getStage<TIn = any, TOut = any>(id: PipelineStageId): PipelineStage<TIn, TOut> {
    const stage = this.stages.get(id);
    if (!stage) {
      throw new Error(`Unknown pipeline stage: "${id}"`);
    }
    return stage as PipelineStage<TIn, TOut>;
  }

  /**
   * Transitions a stage from idle/pending to running.
   * Enforces that all prerequisite stages are strictly 'completed'.
   */
  public startStage<TIn>(id: PipelineStageId, input: TIn): PipelineStage<TIn> {
    const stage = this.getStage(id);

    // Verify prerequisites
    for (const prereqId of stage.prerequisites) {
      const prereq = this.getStage(prereqId);
      if (prereq.status !== 'completed') {
        const errorMsg = `Cannot start stage "${id}": prerequisite "${prereqId}" has status "${prereq.status}" (must be "completed").`;
        stage.status = 'failed';
        stage.error = errorMsg;
        this.addLog(id, 'error', errorMsg);
        throw new Error(errorMsg);
      }
    }

    stage.status = 'running';
    stage.startTime = Date.now();
    stage.input = input;
    this.addLog(id, 'info', `Stage "${stage.name}" started.`);

    return stage;
  }

  /**
   * Completes a stage successfully after validating output.
   */
  public completeStage<TOut>(
    id: PipelineStageId,
    output: TOut,
    validator?: (out: TOut) => { valid: boolean; errors: string[] }
  ): PipelineStage<any, TOut> {
    const stage = this.getStage(id);

    if (stage.status !== 'running') {
      const errorMsg = `Cannot complete stage "${id}": stage is in status "${stage.status}", expected "running".`;
      this.addLog(id, 'error', errorMsg);
      throw new Error(errorMsg);
    }

    // Run post-condition validation if provided
    if (validator) {
      const validationResult = validator(output);
      stage.validation = {
        passed: validationResult.valid,
        errors: validationResult.errors
      };

      if (!validationResult.valid) {
        const validationError = `Stage "${id}" post-validation failed: ${validationResult.errors.join(', ')}`;
        stage.status = 'failed';
        stage.error = validationError;
        stage.endTime = Date.now();
        stage.durationMs = stage.endTime - (stage.startTime || stage.endTime);
        this.addLog(id, 'error', validationError);
        throw new Error(validationError);
      }
    } else {
      stage.validation = { passed: true, errors: [] };
    }

    stage.status = 'completed';
    stage.output = output;
    stage.endTime = Date.now();
    stage.durationMs = stage.endTime - (stage.startTime || stage.endTime);
    this.addLog(id, 'info', `Stage "${stage.name}" successfully completed in ${stage.durationMs}ms.`);

    return stage;
  }

  /**
   * Marks a stage as failed with an error message.
   */
  public failStage(id: PipelineStageId, error: Error | string): PipelineStage {
    const stage = this.getStage(id);
    const errorMsg = typeof error === 'string' ? error : error.message;

    stage.status = 'failed';
    stage.error = errorMsg;
    stage.endTime = Date.now();
    stage.durationMs = stage.endTime - (stage.startTime || stage.endTime);
    this.addLog(id, 'error', `Stage "${stage.name}" failed: ${errorMsg}`);

    return stage;
  }

  /**
   * Explicitly skips a stage with a recorded reason.
   */
  public skipStage(id: PipelineStageId, reason: string): PipelineStage {
    const stage = this.getStage(id);
    stage.status = 'skipped';
    stage.output = undefined;
    stage.endTime = Date.now();
    this.addLog(id, 'warn', `Stage "${stage.name}" skipped: ${reason}`);

    return stage;
  }

  /**
   * Appends a structured log entry to a stage.
   */
  public addLog(id: PipelineStageId, level: 'debug' | 'info' | 'warn' | 'error', message: string, data?: any): void {
    const stage = this.getStage(id);
    stage.logs.push({
      timestamp: Date.now(),
      level,
      message,
      data
    });
  }

  /**
   * Verifies whether the full pipeline succeeded (all required stages are 'completed').
   */
  public isSuccessful(): boolean {
    for (const stage of this.stages.values()) {
      if (stage.status !== 'completed' && stage.status !== 'skipped') {
        return false;
      }
    }
    // Also guarantee at least website_implementation completed
    const implStage = this.getStage('website_implementation');
    return implStage.status === 'completed';
  }

  /**
   * Exports a structured, serializable execution trace.
   */
  public getExecutionTrace(prompt: string, mode: 'FAST' | 'DEEP_CREATIVE' | 'ARCHITECT_MAX'): ExecutionTrace {
    const stagesObj: Record<PipelineStageId, PipelineStage> = {} as any;
    const errors: string[] = [];
    let totalDurationMs = 0;

    for (const [id, stage] of this.stages.entries()) {
      stagesObj[id] = { ...stage };
      if (stage.error) errors.push(`[${id}] ${stage.error}`);
      if (stage.durationMs) totalDurationMs += stage.durationMs;
    }

    const successful = this.isSuccessful();
    const summary = successful
      ? `Pipeline executed successfully in ${mode} mode across all 7 stages (${totalDurationMs}ms).`
      : `Pipeline execution encountered errors: ${errors.join('; ')}`;

    return {
      prompt,
      mode,
      stages: stagesObj,
      stageSequence: [...this.stageOrder],
      isSuccessful: successful,
      totalDurationMs,
      errors,
      summary
    };
  }
}
