/**
 * Evaluation and Criticism Type Definitions for Creative Web Architect 2.0 (Phase 3).
 *
 * Defines structured schemas for visual quality inspection, experience evaluation,
 * browser-verified defect reporting, and automated remediation loops.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

export type CriticSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export type CriticCategory =
  | 'layout-overflow'
  | 'contrast-accessibility'
  | 'typography-measure'
  | 'silent-audio-policy'
  | 'no-glow-policy'
  | 'touch-ergonomics'
  | 'responsive-clipping'
  | 'motion-safety'
  | 'semantic-structure'
  | 'broken-assets'
  | 'runtime-console-error'
  | 'visual-hierarchy'
  | 'keyboard-navigation';

export interface CriticIssue {
  id: string;
  title: string;
  category: CriticCategory;
  severity: CriticSeverity;
  affectedElementOrSelector: string;
  evidence: string;
  reason: string;
  suggestedFix: string;
  confidence: number; // 0.0 - 1.0
  verificationMethod: string;
  isObjectiveDefect: boolean; // True for measurable physical/DOM bugs, false for subjective design judgments
  status?: 'detected' | 'patched' | 'verified' | 'failed';
}

export interface CriticReport {
  criticName: string;
  totalScore: number; // 0 - 100
  issues: CriticIssue[];
  summary: {
    criticalCount: number;
    highCount: number;
    mediumCount: number;
    lowCount: number;
  };
  passedChecks: string[];
  timestamp: string;
}

export interface UnifiedCriticReport {
  overallScore: number; // 0 - 100
  visualScore: number;
  experienceScore: number;
  criticalIssues: CriticIssue[];
  highIssues: CriticIssue[];
  mediumIssues: CriticIssue[];
  lowIssues: CriticIssue[];
  allIssues: CriticIssue[];
  passedChecks: string[];
  isPassingGrade: boolean; // Score >= 85 and 0 critical issues
  summaryRationale: string;
}
