/**
 * Knowledge Ingestion and Skill Expansion System types.
 */

export type KnowledgeCategory =
  | 'art-direction'
  | 'visual-composition'
  | 'typography'
  | 'color-systems'
  | 'ui-components'
  | 'liquid-glass'
  | 'scroll-animations'
  | 'button-interactions'
  | 'hover-effects'
  | 'micro-interactions'
  | 'page-transitions'
  | 'three-dimensional-web'
  | 'performance-engineering'
  | 'accessibility'
  | 'creative-storytelling';

export type ValidationStatus =
  | 'imported'
  | 'reviewed'
  | 'implemented'
  | 'tested'
  | 'recommended'
  | 'deprecated';

export interface SourceReference {
  type: 'prompt' | 'markdown' | 'url' | 'manual';
  title: string;
  author?: string;
  date?: string;
  path?: string;
}

export interface LearnedTechnique {
  id: string;
  name: string;
  description: string;
  category: KnowledgeCategory;
  tags: string[];
  designPhilosophy: string;
  appropriateUseCases: string[];
  implementationApproach: string;
  relevantTechnologies: string[];
  performanceConsiderations: string;
  accessibilityRequirements: string;
  sourceReference: SourceReference;
  validationStatus: ValidationStatus;
  targetSkill?: string;
  codeSnippet?: string;
  conflictsWith?: string[];
  isExemptFromNoGlow?: boolean;
}

export interface TechniqueSummary {
  id: string;
  name: string;
  description: string;
  category: KnowledgeCategory;
  tags: string[];
  validationStatus: ValidationStatus;
  targetSkill?: string;
  sourceReference: SourceReference;
}

export interface KnowledgeIndex {
  version: string;
  updatedAt: string;
  totalTechniques: number;
  categories: Partial<Record<KnowledgeCategory, number>>;
  techniques: TechniqueSummary[];
}

export interface PromptSection {
  title: string;
  content: string;
  inferredCategory?: KnowledgeCategory;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  existingId?: string;
  confidence: number;
  reason?: string;
}

export interface ConflictCheckResult {
  hasConflict: boolean;
  conflictWith?: string;
  severity: 'none' | 'warning' | 'error';
  message?: string;
}

export interface IngestionOptions {
  dryRun?: boolean;
  targetSkill?: string;
  overrideNoGlow?: boolean;
  projectDir?: string;
}

export interface PromptIngestionResult {
  promptId: string;
  promptTitle: string;
  totalSections: number;
  techniquesDiscovered: LearnedTechnique[];
  duplicatesFound: Array<{
    existingId: string;
    proposedName: string;
    reason: string;
  }>;
  conflictsDetected: Array<{
    techniqueId: string;
    conflictWith: string;
    severity: 'warning' | 'error';
    message: string;
  }>;
  securityWarnings: string[];
  skillsUpdated: string[];
  newSkillsCreated: string[];
  summary: string;
}

export interface KnowledgeQueryOptions {
  category?: KnowledgeCategory;
  tags?: string[];
  query?: string;
  status?: ValidationStatus;
  limit?: number;
}
