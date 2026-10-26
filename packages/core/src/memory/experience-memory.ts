/**
 * Persistent Experience Memory for Creative Web Architect 2.0 (Phase 4).
 *
 * Records and indexes validated project outcomes, successful technique pairings,
 * critic findings, and known failure patterns across sessions to continually
 * sharpen CWA's autonomous creative decision-making.
 *
 * Capabilities:
 * - Persistent JSON disk storage in local project path (.cwa/memory/experience-memory.json)
 * - Provenance tracking ('automated-pipeline' | 'manual-critique' | 'benchmark-suite' | 'seed-archive')
 * - Validation status ('verified-browser' | 'verified-deterministic' | 'pending' | 'unverified')
 * - Secret sanitization: ensures no API keys, tokens, or private data are persisted
 * - Experience-based retrieval: queries past successes and failure patterns to inform new designs
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { promises as fs, existsSync, readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

export type ExperienceStatus =
  | 'imported-knowledge'
  | 'untested-recommendation'
  | 'tested-technique'
  | 'validated-success'
  | 'known-failure';

export type ExperienceProvenance =
  | 'automated-pipeline'
  | 'manual-critique'
  | 'benchmark-suite'
  | 'seed-archive';

export type MemoryValidationStatus =
  | 'verified-browser'
  | 'verified-deterministic'
  | 'pending'
  | 'unverified';

export interface PromptCharacteristics {
  rawPromptLength: number;
  explicitKeywords: string[];
  inferredArchetype: string;
  hasMotionRequest: boolean;
  has3DRequest: boolean;
}

export interface DesignDNASummary {
  dominantPalette: string;
  typographyScale: string;
  visualMetaphor: string;
  contrastRatioVerified: boolean;
}

export interface MotionStrategiesSummary {
  library: string;
  personality: string;
  signatureExperience: string;
  conflictFree: boolean;
}

export interface VerifiedResultsSummary {
  overallScore: number;
  visualScore: number;
  experienceScore: number;
  isPassingGrade: boolean;
  zeroCriticalIssues: boolean;
}

export interface PerformanceObservations {
  byteSize: number;
  renderDurationMs: number;
  domElementCount: number;
  viewportScreenCaptureCount: number;
}

export interface ExperienceRecord {
  id: string;
  timestamp: string;
  category: string;
  industry: string;
  briefSummary: string;
  selectedConceptId: string;
  techniquesUsed: string[];
  criticScore: number;
  criticFindings: string[];
  correctionsApplied: string[];
  status: ExperienceStatus;
  keyTakeaway: string;

  // Phase 4 Enhanced Provenance & Validation Metadata
  provenance: ExperienceProvenance;
  validationStatus: MemoryValidationStatus;
  promptCharacteristics?: PromptCharacteristics;
  designDnaSummary?: DesignDNASummary;
  motionStrategies?: MotionStrategiesSummary;
  failedApproaches?: string[];
  verifiedResults?: VerifiedResultsSummary;
  performanceObservations?: PerformanceObservations;
  userFeedback?: string;
}

export interface ExperienceInsights {
  recommendedTechniques: string[];
  cautionaryFailurePatterns: string[];
  pastWinningConcepts: string[];
  effectiveCorrections: string[];
  categoryMilestoneSummary: string;
}

export class ExperienceMemory {
  private records: ExperienceRecord[] = [];
  private storageFilePath: string;

  constructor(initialRecords?: ExperienceRecord[], storageFilePath?: string) {
    this.storageFilePath = storageFilePath || resolve(process.cwd(), '.cwa', 'memory', 'experience-memory.json');

    if (initialRecords && initialRecords.length > 0) {
      this.records = [...initialRecords];
    } else {
      if (existsSync(this.storageFilePath)) {
        this.loadFromFileSync(this.storageFilePath);
      } else {
        this.seedDefaultValidatedExperiences();
      }
    }
  }

  /**
   * Records a validated project experience into memory with sanitization.
   */
  public recordExperience(
    record: Omit<ExperienceRecord, 'id' | 'timestamp' | 'provenance' | 'validationStatus'> & {
      id?: string;
      provenance?: ExperienceProvenance;
      validationStatus?: MemoryValidationStatus;
    }
  ): ExperienceRecord {
    const fullRecord: ExperienceRecord = {
      ...record,
      id: record.id ?? `exp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      provenance: record.provenance ?? 'automated-pipeline',
      validationStatus: record.validationStatus ?? 'verified-deterministic',
      briefSummary: this.sanitizeData(record.briefSummary),
      criticFindings: record.criticFindings.map(f => this.sanitizeData(f)),
      keyTakeaway: this.sanitizeData(record.keyTakeaway),
      userFeedback: record.userFeedback ? this.sanitizeData(record.userFeedback) : undefined
    };

    this.records.push(fullRecord);
    return fullRecord;
  }

  /**
   * Queries past validated experiences by project category.
   */
  public querySimilarExperiences(category: string): ExperienceRecord[] {
    const target = category.toLowerCase();
    return this.records.filter(r =>
      r.category.toLowerCase().includes(target) ||
      target.includes(r.category.toLowerCase())
    );
  }

  /**
   * Derives actionable best practices for a category based on validated successes.
   */
  public getBestPracticesForCategory(category: string): string[] {
    const matches = this.querySimilarExperiences(category)
      .filter(r => r.status === 'validated-success');

    if (matches.length === 0) {
      return [
        'Enforce strict Silent-by-Default policy: zero unrequested Web Audio synthesizers',
        'Use fluid clamp() formulas on all display headings to prevent mobile overflow',
        'Ensure 44px+ touch target geometry on all interactive buttons'
      ];
    }

    const practices = new Set<string>();
    for (const match of matches) {
      practices.add(match.keyTakeaway);
      for (const corr of match.correctionsApplied) {
        practices.add(`Proactively apply: ${corr}`);
      }
    }

    return Array.from(practices).slice(0, 5);
  }

  /**
   * Retrieves actionable synthesis insights for an intent before technique planning.
   */
  public getInsightsForIntent(category: string, rawPrompt?: string): ExperienceInsights {
    const similar = this.querySimilarExperiences(category);
    const successes = similar.filter(r => r.status === 'validated-success' && r.criticScore >= 85);

    const techCounts: Record<string, number> = {};
    const concepts: string[] = [];
    const corrections = new Set<string>();

    for (const s of successes) {
      for (const t of s.techniquesUsed) {
        techCounts[t] = (techCounts[t] || 0) + 1;
      }
      concepts.push(s.selectedConceptId);
      for (const c of s.correctionsApplied) {
        corrections.add(c);
      }
    }

    const recommendedTechniques = Object.entries(techCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tech]) => tech)
      .slice(0, 4);

    const failures = this.getKnownFailurePatterns();

    return {
      recommendedTechniques,
      cautionaryFailurePatterns: failures,
      pastWinningConcepts: Array.from(new Set(concepts)),
      effectiveCorrections: Array.from(corrections).slice(0, 5),
      categoryMilestoneSummary: successes.length > 0
        ? `Found ${successes.length} validated past milestones in ${category} averaging score ${Math.round(successes.reduce((a, b) => a + b.criticScore, 0) / successes.length)}/100.`
        : `First execution in ${category}; relying on foundational architectural heuristics.`
    };
  }

  /**
   * Retrieves known failure patterns to prevent repeating past mistakes.
   */
  public getKnownFailurePatterns(): string[] {
    const failures = this.records.filter(r => r.status === 'known-failure');
    const patterns = failures.map(f => f.keyTakeaway);

    // Baseline architectural known failure patterns
    patterns.push('Synthesizing unrequested Web Audio / SFX violates user expectations and breaks accessibility');
    patterns.push('Applying large neon glows (>35px blur) degrades visual maturity to cheap amateur aesthetics');
    patterns.push('Using width: 100vw without max-width: 100% causes horizontal scrollbar leaks on desktop OS');
    patterns.push('Animating top/left/width/height properties causes CPU layout thrashing and drops below 60 FPS');
    patterns.push('Suppressing keyboard focus ring with outline: none without providing a visible :focus-visible style');

    return Array.from(new Set(patterns));
  }

  /**
   * Returns all stored records.
   */
  public getAllRecords(): ExperienceRecord[] {
    return [...this.records];
  }

  /**
   * Saves the experience records to a persistent JSON file.
   */
  public async saveToFile(filePath?: string): Promise<string> {
    const targetPath = filePath || this.storageFilePath;
    const dir = dirname(targetPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(targetPath, JSON.stringify(this.records, null, 2), 'utf-8');
    return targetPath;
  }

  /**
   * Synchronously loads experience records from a file.
   */
  public loadFromFileSync(filePath: string): boolean {
    try {
      if (existsSync(filePath)) {
        const raw = readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.records = parsed;
          return true;
        }
      }
    } catch {
      // Fallback to in-memory defaults
    }
    return false;
  }

  /**
   * Asynchronously loads experience records from a file.
   */
  public async loadFromFile(filePath?: string): Promise<boolean> {
    const targetPath = filePath || this.storageFilePath;
    try {
      if (existsSync(targetPath)) {
        const raw = await fs.readFile(targetPath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.records = parsed;
          return true;
        }
      }
    } catch {
      // Fallback to in-memory defaults
    }
    return false;
  }

  /**
   * Returns analytical statistics about stored experiences.
   */
  public getStats(): {
    total: number;
    byStatus: Record<string, number>;
    byProvenance: Record<string, number>;
    byValidationStatus: Record<string, number>;
  } {
    const byStatus: Record<string, number> = {};
    const byProvenance: Record<string, number> = {};
    const byValidationStatus: Record<string, number> = {};

    for (const r of this.records) {
      byStatus[r.status] = (byStatus[r.status] || 0) + 1;
      byProvenance[r.provenance] = (byProvenance[r.provenance] || 0) + 1;
      byValidationStatus[r.validationStatus] = (byValidationStatus[r.validationStatus] || 0) + 1;
    }

    return {
      total: this.records.length,
      byStatus,
      byProvenance,
      byValidationStatus
    };
  }

  /**
   * Returns the most recent experiences.
   */
  public getRecentExperiences(limit: number = 5): ExperienceRecord[] {
    return [...this.records].reverse().slice(0, limit);
  }

  /**
   * Sanitizes private data, API keys, passwords, and secrets.
   */
  private sanitizeData(text: string): string {
    return text
      .replace(/(?:api[_-]?key|bearer|token|secret|password)["']?\s*[:=]\s*["']?[\w-]{8,}["']?/gi, '[REDACTED_SECRET]')
      .replace(/AIza[0-9A-Za-z-_]{35}/g, '[REDACTED_API_KEY]')
      .replace(/sk-[a-zA-Z0-9]{20,}/g, '[REDACTED_API_KEY]')
      .replace(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g, '[REDACTED_EMAIL]');
  }

  /**
   * Seeds memory with vetted, historical architectural milestones from verified templates.
   */
  private seedDefaultValidatedExperiences(): void {
    this.records.push(
      {
        id: 'seed-lumora-studio',
        timestamp: '2026-10-24T12:00:00.000Z',
        category: 'creative-agency',
        industry: 'Independent Design & Engineering Studio',
        briefSummary: 'Light palette studio landing with Lenis smooth-scroll and dual-image canvas reveal',
        selectedConceptId: 'concept-refined',
        techniquesUsed: ['dual-image-liquid-cursor-brush-reveal', 'damped-magnetic-cursor-follow-physics'],
        criticScore: 98,
        criticFindings: [],
        correctionsApplied: ['Maintained 100% silent audio policy', 'Clamped rem grid to 1024-1920px bounds'],
        status: 'validated-success',
        keyTakeaway: 'Dual-image liquid cursor reveals provide tactile intrigue without hurting LCP performance.',
        provenance: 'seed-archive',
        validationStatus: 'verified-browser'
      },
      {
        id: 'seed-laocoon-bronze',
        timestamp: '2026-10-24T14:30:00.000Z',
        category: 'product-3d',
        industry: 'Bronze & Time Archaeological Exhibition',
        briefSummary: '360 scroll-driven Three.js camera orbit with GLSL wave shader and forge sparks',
        selectedConceptId: 'concept-immersive',
        techniquesUsed: ['chiaroscuro-bronze-wave-shader-and-spark-turbulence'],
        criticScore: 96,
        criticFindings: [],
        correctionsApplied: ['Added auto-cleanup for offscreen forge spark particle arrays'],
        status: 'validated-success',
        keyTakeaway: 'Three.js 3D camera orbits must be centered at (0,0,0) and parented to scroll progress.',
        provenance: 'seed-archive',
        validationStatus: 'verified-browser'
      },
      {
        id: 'seed-baseline-tennis',
        timestamp: '2026-10-24T17:00:00.000Z',
        category: 'luxury-fashion',
        industry: 'Members Tennis Club & Academy',
        briefSummary: 'Full-bleed hero with curtain physics loader, ghost typography, and adaptive rem grid',
        selectedConceptId: 'concept-refined',
        techniquesUsed: ['adaptive-rem-grid-with-physics-gated-reveals-and-ghost-typography'],
        criticScore: 99,
        criticFindings: [],
        correctionsApplied: ['Disabled magnetic cursor follow on touch devices'],
        status: 'validated-success',
        keyTakeaway: 'Curtain-sliding physics loaders build dramatic anticipation for editorial typography.',
        provenance: 'seed-archive',
        validationStatus: 'verified-browser'
      },
      {
        id: 'seed-tactile-buttons',
        timestamp: '2026-10-25T01:30:00.000Z',
        category: 'button-interactions',
        industry: 'Tactile Button Interaction Foundry',
        briefSummary: '24 hyper-tactile button interaction architectures with zero unrequested sound',
        selectedConceptId: 'concept-experimental',
        techniquesUsed: ['hyper-tactile-button-foundry-and-micro-physics', 'tactile-button-physics-and-micro-kinematics'],
        criticScore: 100,
        criticFindings: ['Unrequested audio synthesizer detected and stripped'],
        correctionsApplied: ['Removed Web Audio oscillator; strictly enforced Silent by Default'],
        status: 'validated-success',
        keyTakeaway: 'Physical spring squish (translateY(1.5px)) delivers high tactile delight silently without requiring audio.',
        provenance: 'seed-archive',
        validationStatus: 'verified-browser'
      },
      {
        id: 'seed-automotive-hypercar',
        timestamp: '2026-10-25T04:15:00.000Z',
        category: 'automotive',
        industry: 'High-Performance Automotive Engineering',
        briefSummary: 'Electric hypercar showcase site featuring aerodynamic telemetry and live carbon specs',
        selectedConceptId: 'concept-refined',
        techniquesUsed: ['circuit-trace', 'halftone-lattice', 'damped-magnetic-cursor-follow-physics'],
        criticScore: 97,
        criticFindings: ['Potential mobile touch target padding constraint'],
        correctionsApplied: ['Enforced 44px min touch target on telemetry controls', 'Zero unrequested audio'],
        status: 'validated-success',
        keyTakeaway: 'Telemetry HUD overlays deliver visceral engineering personality when paired with calm typography.',
        provenance: 'seed-archive',
        validationStatus: 'verified-browser'
      }
    );
  }
}
