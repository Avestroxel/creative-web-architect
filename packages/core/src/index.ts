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
  PREMIUM_DARK_PALETTE,
  PREMIUM_LIGHT_PALETTE,
  auditCSSVisualQuality,
  type VisualPolicyConfig,
  type AntiPatternIssue,
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
