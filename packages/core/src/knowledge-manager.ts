/**
 * Knowledge Manager for Creative Web Architect.
 * Handles storage, index generation, duplicate detection, conflict analysis,
 * and selective retrieval of learned techniques.
 */

import { promises as fs, readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import {
  ConflictCheckResult,
  DuplicateCheckResult,
  IngestionOptions,
  KnowledgeCategory,
  KnowledgeIndex,
  KnowledgeQueryOptions,
  LearnedTechnique,
  PromptIngestionResult,
  TechniqueSummary
} from './knowledge-types.js';
import { analyzePrompt } from './prompt-analyzer.js';

const DEFAULT_KNOWLEDGE_DIR = 'knowledge';

/**
 * Checks if a directory or file exists.
 */
async function pathExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * Knowledge Manager class handling lifecycle of ingested techniques.
 */
export class KnowledgeManager {
  private knowledgeDir: string;
  private indexPath: string;
  private indexCache: KnowledgeIndex | null = null;

  constructor(projectDir: string = process.cwd(), knowledgeSubdir: string = DEFAULT_KNOWLEDGE_DIR) {
    this.knowledgeDir = resolve(projectDir, knowledgeSubdir);
    this.indexPath = join(this.knowledgeDir, 'index.json');
  }

  /**
   * Initialize directory structure if not already present.
   */
  async init(): Promise<void> {
    const subdirs = [
      'incoming',
      'prompt-library',
      'design-references',
      'animation-recipes',
      'visual-patterns',
      'learned-techniques',
      'evaluation-cases'
    ];

    for (const sub of subdirs) {
      const fullPath = join(this.knowledgeDir, sub);
      if (!(await pathExists(fullPath))) {
        await fs.mkdir(fullPath, { recursive: true });
      }
    }

    if (!(await pathExists(this.indexPath))) {
      const initialIndex: KnowledgeIndex = {
        version: '1.0.0',
        updatedAt: new Date().toISOString(),
        totalTechniques: 0,
        categories: {},
        techniques: []
      };
      await fs.writeFile(this.indexPath, JSON.stringify(initialIndex, null, 2), 'utf-8');
      this.indexCache = initialIndex;
    }
  }

  /**
   * Load the master knowledge index.
   */
  async getIndex(): Promise<KnowledgeIndex> {
    if (this.indexCache) return this.indexCache;
    await this.init();
    try {
      const raw = await fs.readFile(this.indexPath, 'utf-8');
      this.indexCache = JSON.parse(raw) as KnowledgeIndex;
      return this.indexCache;
    } catch {
      const fallback: KnowledgeIndex = {
        version: '1.0.0',
        updatedAt: new Date().toISOString(),
        totalTechniques: 0,
        categories: {},
        techniques: []
      };
      this.indexCache = fallback;
      return fallback;
    }
  }

  /**
   * Synchronously load the master knowledge index from disk (cached if available).
   */
  getIndexSync(): KnowledgeIndex {
    if (this.indexCache) return this.indexCache;
    try {
      if (existsSync(this.indexPath)) {
        const raw = readFileSync(this.indexPath, 'utf-8');
        this.indexCache = JSON.parse(raw) as KnowledgeIndex;
        return this.indexCache;
      }
    } catch {
      // Fallback below
    }
    const fallback: KnowledgeIndex = {
      version: '1.0.0',
      updatedAt: new Date().toISOString(),
      totalTechniques: 0,
      categories: {},
      techniques: []
    };
    this.indexCache = fallback;
    return fallback;
  }

  /**
   * Synchronously list all technique summaries.
   */
  listTechniquesSync(): TechniqueSummary[] {
    return this.getIndexSync().techniques;
  }

  /**
   * Synchronously load full technique details.
   */
  getTechniqueDetailsSync(category: KnowledgeCategory, id: string): LearnedTechnique | null {
    const filePath = join(this.knowledgeDir, 'learned-techniques', category, `${id}.json`);
    try {
      if (existsSync(filePath)) {
        const raw = readFileSync(filePath, 'utf-8');
        return JSON.parse(raw) as LearnedTechnique;
      }
    } catch {
      // Return null on failure
    }
    return null;
  }

  /**
   * Save the updated knowledge index to disk.
   */
  private async saveIndex(index: KnowledgeIndex): Promise<void> {
    index.updatedAt = new Date().toISOString();
    index.totalTechniques = index.techniques.length;

    // Recalculate categories count
    const categories: Partial<Record<KnowledgeCategory, number>> = {};
    for (const t of index.techniques) {
      categories[t.category] = (categories[t.category] || 0) + 1;
    }
    index.categories = categories;

    await fs.writeFile(this.indexPath, JSON.stringify(index, null, 2), 'utf-8');
    this.indexCache = index;
  }

  /**
   * Check whether a proposed technique duplicates an existing one.
   */
  async checkDuplicate(technique: LearnedTechnique): Promise<DuplicateCheckResult> {
    const index = await this.getIndex();

    for (const existing of index.techniques) {
      // 1. Exact ID match
      if (existing.id === technique.id) {
        return {
          isDuplicate: true,
          existingId: existing.id,
          confidence: 1.0,
          reason: `Exact identifier match with existing technique '${existing.name}'`
        };
      }

      // 2. High name similarity in same category
      if (
        existing.category === technique.category &&
        existing.name.toLowerCase() === technique.name.toLowerCase()
      ) {
        return {
          isDuplicate: true,
          existingId: existing.id,
          confidence: 0.9,
          reason: `Identical technique name '${existing.name}' in category '${existing.category}'`
        };
      }

      // 3. Significant tag overlap in same category
      if (existing.category === technique.category) {
        const sharedTags = technique.tags.filter((t) => existing.tags.includes(t));
        const overlap = sharedTags.length / Math.max(existing.tags.length, technique.tags.length, 1);
        if (overlap >= 0.8 && sharedTags.length >= 3) {
          return {
            isDuplicate: true,
            existingId: existing.id,
            confidence: 0.75,
            reason: `High tag overlap (${sharedTags.join(', ')}) with existing technique '${existing.name}'`
          };
        }
      }
    }

    return { isDuplicate: false, confidence: 0 };
  }

  /**
   * Check whether a proposed technique conflicts with architectural policies or existing patterns.
   */
  checkConflict(technique: LearnedTechnique, overrideNoGlow = false): ConflictCheckResult {
    const textToCheck = `${technique.name} ${technique.description} ${technique.implementationApproach}`.toLowerCase();

    // 1. No-Glow Architectural Policy Check
    const hasExcessiveGlow =
      /neon|glowing|oversaturated|bloom|bright\s+colored\s+shadow/i.test(textToCheck);
    if (hasExcessiveGlow && !technique.isExemptFromNoGlow && !overrideNoGlow) {
      return {
        hasConflict: true,
        conflictWith: 'no-excessive-glow-policy',
        severity: 'warning',
        message: 'Technique advocates heavy neon glow / bloom without explicit cyberpunk or brand exemption.'
      };
    }

    // 2. Scroll Hijacking Check
    if (/e\.preventdefault\(\)|preventdefault.*wheel|fake\s+smooth\s+scroll/i.test(textToCheck)) {
      return {
        hasConflict: true,
        conflictWith: 'advanced-scroll-animation',
        severity: 'warning',
        message: 'Technique intercepts native scroll wheel events without graceful accessibility fallback.'
      };
    }

    return { hasConflict: false, severity: 'none' };
  }

  /**
   * Store a learned technique in disk and register in master index.
   */
  async storeTechnique(technique: LearnedTechnique): Promise<void> {
    await this.init();
    const categoryDir = join(this.knowledgeDir, 'learned-techniques', technique.category);
    if (!(await pathExists(categoryDir))) {
      await fs.mkdir(categoryDir, { recursive: true });
    }

    const filePath = join(categoryDir, `${technique.id}.json`);
    await fs.writeFile(filePath, JSON.stringify(technique, null, 2), 'utf-8');

    // Update index
    const index = await this.getIndex();
    const summary: TechniqueSummary = {
      id: technique.id,
      name: technique.name,
      description: technique.description,
      category: technique.category,
      tags: technique.tags,
      validationStatus: technique.validationStatus,
      targetSkill: technique.targetSkill,
      sourceReference: technique.sourceReference
    };

    const existingIndex = index.techniques.findIndex((t) => t.id === technique.id);
    if (existingIndex >= 0) {
      index.techniques[existingIndex] = summary;
    } else {
      index.techniques.push(summary);
    }

    await this.saveIndex(index);
  }

  /**
   * Ingest a prompt file or raw prompt text.
   */
  async ingestPrompt(
    rawContent: string,
    sourceTitle: string,
    options: IngestionOptions = {}
  ): Promise<PromptIngestionResult> {
    await this.init();

    const promptId = `prompt-${Date.now()}`;
    const source = {
      type: 'prompt' as const,
      title: sourceTitle,
      date: new Date().toISOString()
    };

    const analysis = analyzePrompt(rawContent, source);
    const result: PromptIngestionResult = {
      promptId,
      promptTitle: sourceTitle,
      totalSections: analysis.sections.length,
      techniquesDiscovered: [],
      duplicatesFound: [],
      conflictsDetected: [],
      securityWarnings: analysis.securityWarnings,
      skillsUpdated: [],
      newSkillsCreated: [],
      summary: ''
    };

    // If dryRun, do not persist
    for (const tech of analysis.techniques) {
      // Check duplicate
      const dupCheck = await this.checkDuplicate(tech);
      if (dupCheck.isDuplicate && dupCheck.existingId) {
        result.duplicatesFound.push({
          existingId: dupCheck.existingId,
          proposedName: tech.name,
          reason: dupCheck.reason || 'Duplicate detected'
        });
        continue;
      }

      // Check conflict
      const confCheck = this.checkConflict(tech, options.overrideNoGlow);
      if (confCheck.hasConflict && confCheck.conflictWith) {
        result.conflictsDetected.push({
          techniqueId: tech.id,
          conflictWith: confCheck.conflictWith,
          severity: confCheck.severity as 'warning' | 'error',
          message: confCheck.message || 'Policy conflict detected'
        });
      }

      // Store technique if not dry run
      if (!options.dryRun) {
        await this.storeTechnique(tech);
        if (tech.targetSkill && !result.skillsUpdated.includes(tech.targetSkill)) {
          result.skillsUpdated.push(tech.targetSkill);
        }
      }

      result.techniquesDiscovered.push(tech);
    }

    // Save prompt to prompt-library if not dry run
    if (!options.dryRun) {
      const archiveDir = join(this.knowledgeDir, 'prompt-library');
      const archiveFile = join(archiveDir, `${promptId}.md`);
      const archiveContent = `---
promptId: "${promptId}"
title: "${sourceTitle}"
ingestedAt: "${new Date().toISOString()}"
techniquesExtracted: ${result.techniquesDiscovered.length}
duplicatesSkipped: ${result.duplicatesFound.length}
---

# ${sourceTitle}

${rawContent}
`;
      await fs.writeFile(archiveFile, archiveContent, 'utf-8');
    }

    result.summary = `Ingested '${sourceTitle}': Discovered ${result.techniquesDiscovered.length} techniques, skipped ${result.duplicatesFound.length} duplicates, flagged ${result.conflictsDetected.length} conflicts.`;
    return result;
  }

  /**
   * Selectively query the knowledge base without loading full file trees into context.
   */
  async queryKnowledge(options: KnowledgeQueryOptions = {}): Promise<TechniqueSummary[]> {
    const index = await this.getIndex();
    let matches = index.techniques;

    // Filter by category
    if (options.category) {
      matches = matches.filter((t) => t.category === options.category);
    }

    // Filter by validation status
    if (options.status) {
      matches = matches.filter((t) => t.validationStatus === options.status);
    }

    // Filter by tags
    if (options.tags && options.tags.length > 0) {
      matches = matches.filter((t) =>
        options.tags!.some((reqTag) => t.tags.includes(reqTag.toLowerCase()))
      );
    }

    // Keyword query
    if (options.query) {
      const q = options.query.toLowerCase();
      matches = matches.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Limit results
    if (options.limit && options.limit > 0) {
      matches = matches.slice(0, options.limit);
    }

    return matches;
  }

  /**
   * Load the full implementation details of a specific technique.
   */
  async getTechniqueDetails(category: KnowledgeCategory, id: string): Promise<LearnedTechnique | null> {
    const filePath = join(this.knowledgeDir, 'learned-techniques', category, `${id}.json`);
    try {
      const raw = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(raw) as LearnedTechnique;
    } catch {
      return null;
    }
  }
}
