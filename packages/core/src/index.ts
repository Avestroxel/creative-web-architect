/**
 * @cwa/core — Creative Web Architect Core Engine
 *
 * Provides skill discovery, configuration management, and shared types
 * for the Creative Web Architect toolkit.
 */

export { discoverSkills, loadSkill, getSkillPath, validateSkill } from './skill-discovery.js';
export { createConfig, loadConfig, getDefaultConfig, mergeConfigs } from './config.js';
export {
  createDesignSystemForStyle,
  generateFluidClamp,
  getDefaultTypographyScale,
  exportToCSSVariables,
} from './design-system.js';
export {
  REFINED_VISUAL_POLICY,
  CONTEXTUAL_AESTHETIC_POLICIES,
  PREMIUM_DARK_PALETTE,
  PREMIUM_LIGHT_PALETTE,
  auditCSSVisualQuality,
  type VisualPolicyConfig,
  type AntiPatternIssue,
  type AestheticStyleId,
  type AuditCSSOptions
} from './visual-policy.js';
export {
  MOTION_DURATIONS,
  REFINED_EASINGS,
  MOTION_PROFILES,
  calculateStaggerDelay,
  buildAccessibleTransition,
  type MotionDurationTokens,
  type MotionProfileConfig,
} from './motion-tokens.js';
export type {
  Skill,
  SkillMetadata,
  CWAConfig,
  DesignMode,
  DesignStyle,
  DesignStyleCategory,
  DesignToken,
  DesignSystem,
  ColorPalette,
  TypographyScale,
  MotionConfig,
  LiquidGlassConfig,
  PerformanceTargets,
  AccessibilityConfig,
  ProjectBrief,
  CreativeDirection,
  AgentEnvironment,
} from './types.js';
export {
  KnowledgeManager
} from './knowledge-manager.js';
export {
  analyzePrompt,
  sanitizePromptContent,
  chunkPromptIntoSections,
  inferCategoryFromText,
  extractTechniqueFromSection
} from './prompt-analyzer.js';
export type {
  KnowledgeCategory,
  ValidationStatus,
  SourceReference,
  LearnedTechnique,
  TechniqueSummary,
  KnowledgeIndex,
  PromptSection,
  DuplicateCheckResult,
  ConflictCheckResult,
  IngestionOptions,
  PromptIngestionResult,
  KnowledgeQueryOptions
} from './knowledge-types.js';
export { DESIGN_MODES, DESIGN_STYLES, STYLE_CATEGORIES } from './constants.js';
export { resolvePath, isSubPath, createBackup } from './utils.js';
export {
  classifyPromptArchetype,
  validateTechniqueSynergy,
  reasonAdaptiveArchetypes,
  ARCHETYPE_DEFINITIONS,
  type DesignArchetypeId,
  type ArchetypeDefinition,
  type ArchetypeRecommendation,
  type ArchetypeDirectionInspiration,
  type AdaptiveArchetypeReasoningResult
} from './archetype-matrix.js';

// Creative Web Architect 2.0 Autonomous Intelligence Architecture
export {
  IntentEngine,
  type StructuredIntent,
  type TargetAudienceProfile,
  type UserGoalsSpec,
  type BrandPersonalitySpec,
  type EmotionalDirectionSpec,
  type VisualIdentityOpportunities,
  type SectionArchitecture,
  type ContentArchitectureSpec,
  type InteractionExpectationsSpec,
  type MotionSuitabilitySpec,
  type AccessibilityRequirementsSpec,
  type ResponsivePrioritiesSpec,
  type TechnicalConstraintsSpec,
  type MissingAssetDescriptor,
  type ExplicitVsInferred,
  type ConfidenceAndUncertainty
} from './intelligence/intent-engine.js';

export {
  AdaptiveEffortProfiler,
  type ReasoningProfile,
  type ReasoningEffortConfig
} from './intelligence/adaptive-effort.js';

export {
  KnowledgeRetriever,
  type TechniqueRetrievalResult
} from './intelligence/knowledge-retriever.js';

export {
  SkillOrchestrator,
  type ActivatedSkill,
  type SkillOrchestrationPlan
} from './intelligence/skill-orchestrator.js';

export {
  ConceptGenerator,
  type CreativeConcept,
  type CandidateConcepts,
  type ConceptDirectionType,
  type ConceptPalette,
  type ConceptTypography,
  type ConceptTradeOffs
} from './creativity/concept-generator.js';

export {
  ConceptEvaluator,
  type ConceptScoreBreakdown,
  type CandidateEvaluation,
  type ConceptEvaluationReport
} from './creativity/concept-evaluator.js';

export {
  DesignDNASystem,
  type DesignDNASpec
} from './creativity/design-dna.js';

export {
  MotionIntelligenceEngine,
  type MotionTier,
  type MotionTechniqueSpec,
  type MotionConflictReport,
  type MotionPlan
} from './creativity/motion-intelligence.js';

export {
  SignatureExperienceGenerator,
  type InteractionModel,
  type SignatureExperienceSpec
} from './creativity/signature-experience.js';

export {
  VisualCritic
} from './evaluation/visual-critic.js';

export {
  ExperienceCritic
} from './evaluation/experience-critic.js';

export {
  BrowserEvaluator,
  EVALUATION_VIEWPORTS,
  type ViewportConfig,
  type TouchTargetViolation,
  type ElementOverlapViolation,
  type BrowserInspectionMetrics,
  type ScreenshotArtifacts,
  type BrowserEvaluationResult,
  type BrowserEvaluationOptions
} from './evaluation/browser-evaluator.js';

export {
  RefinementEngine,
  type RefinementIterationRecord,
  type RefinementResult,
  type RefinementOptions
} from './evaluation/refinement-engine.js';

export type {
  CriticSeverity,
  CriticCategory,
  CriticIssue,
  CriticReport,
  UnifiedCriticReport
} from './evaluation/evaluation-types.js';

export {
  ExperienceMemory,
  type ExperienceStatus,
  type ExperienceProvenance,
  type MemoryValidationStatus,
  type PromptCharacteristics,
  type DesignDNASummary,
  type MotionStrategiesSummary,
  type VerifiedResultsSummary,
  type PerformanceObservations,
  type ExperienceRecord,
  type ExperienceInsights
} from './memory/experience-memory.js';

export {
  CreativePipeline,
  type PipelineExecutionOptions,
  type PipelineExecutionResult
} from './orchestration/creative-pipeline.js';

export {
  CognitiveBrain,
  type VisualMetaphor,
  type NeurologicalHook,
  type AntiFatigueLayout,
  type PsychologicalResonance,
  type CognitiveProfile
} from './intelligence/cognitive-brain.js';

export {
  ArtDirectorDialogue,
  type DirectorialVerdict
} from './creativity/art-director-dialogue.js';

export {
  BenchmarkSuiteRunner,
  BENCHMARK_SCENARIOS,
  type BenchmarkPromptScenario,
  type BenchmarkScenarioResult,
  type BenchmarkSuiteReport,
  type ComparativeScenarioResult,
  type ComparativeBenchmarkReport
} from './benchmark/benchmark-suite.js';

// Phase 2: Creative Pipeline, Motion Intelligence & Scaffolding Adapters
export {
  PipelineStateMachine,
  type PipelineStageId,
  type StageStatus,
  type PipelineStage,
  type StageLogEntry,
  type StageValidation,
  type ExecutionTrace
} from './orchestration/pipeline-state-machine.js';

export {
  type ModelInferenceAdapter,
  type InferenceOptions,
  type InferenceResult,
  LocalHeuristicInferenceAdapter,
  EnvironmentApiInferenceAdapter,
  HostAgentWorkflowAdapter,
  type FileOperationsAdapter,
  type WriteFileOptions,
  NodeFileSystemAdapter,
  VirtualFileSystemAdapter,
  type CommandExecutionAdapter,
  type CommandOptions,
  type CommandResult,
  NodeProcessCommandAdapter,
  MockCommandAdapter,
  type ProjectScaffoldingAdapter,
  type ProjectStack,
  type ProjectScaffoldSpec,
  type ProjectModifySpec,
  type ScaffoldResult,
  DefaultProjectScaffoldingAdapter,
  type BuildVerificationAdapter,
  type VerificationCheck,
  type BuildVerificationResult,
  DefaultBuildVerificationAdapter
} from './adapters/index.js';

export {
  WebsiteImplementationEngine,
  type WebsiteImplementationOptions,
  type WebsiteImplementationResult
} from './scaffolding/website-implementation.js';

