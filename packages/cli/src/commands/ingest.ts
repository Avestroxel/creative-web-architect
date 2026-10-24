/**
 * `cwa ingest [file-or-dir]` — Ingest reference prompts into the CWA knowledge base.
 */

import { promises as fs } from 'fs';
import { resolve, basename, extname } from 'path';
import { KnowledgeManager, PromptIngestionResult } from '@cwa/core';
import { log, LogLevel, logHeader, color, style } from '../utils/logger.js';

interface IngestOptions {
  force?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
  overrideNoGlow?: boolean;
  targetSkill?: string;
}

/**
 * Handle the `cwa ingest` CLI command.
 */
export async function handleIngest(
  targetPaths: string[],
  options: IngestOptions = {}
): Promise<void> {
  const projectDir = process.cwd();
  const km = new KnowledgeManager(projectDir);
  await km.init();

  logHeader('Creative Web Architect — Knowledge Ingestion');

  // If no path specified, default to incoming directory
  let pathsToProcess = targetPaths;
  if (!pathsToProcess || pathsToProcess.length === 0) {
    const incomingDir = resolve(projectDir, 'knowledge', 'incoming');
    try {
      const files = await fs.readdir(incomingDir);
      pathsToProcess = files
        .filter((f) => ['.md', '.txt', '.prompt'].includes(extname(f).toLowerCase()))
        .map((f) => resolve(incomingDir, f));
    } catch {
      pathsToProcess = [];
    }

    if (pathsToProcess.length === 0) {
      log(
        LogLevel.INFO,
        'No input path specified and no files found in knowledge/incoming/.\n' +
        'Usage: cwa ingest <path-to-prompt.md>\n' +
        'Or place prompt markdown files into ./knowledge/incoming/'
      );
      return;
    }
  }

  log(
    LogLevel.INFO,
    `Processing ${pathsToProcess.length} reference prompt source(s)...`
  );

  let totalDiscovered = 0;
  let totalDuplicates = 0;
  let totalConflicts = 0;

  for (const rawPath of pathsToProcess) {
    const fullPath = resolve(projectDir, rawPath);
    try {
      const stats = await fs.stat(fullPath);
      let files: string[] = [];

      if (stats.isDirectory()) {
        const dirEntries = await fs.readdir(fullPath);
        files = dirEntries
          .filter((f) => ['.md', '.txt', '.prompt'].includes(extname(f).toLowerCase()))
          .map((f) => resolve(fullPath, f));
      } else {
        files = [fullPath];
      }

      for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');
        const title = basename(file, extname(file))
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

        log(LogLevel.INFO, `\nAnalyzing prompt: ${style.bold(title)} (${basename(file)})`);

        const result: PromptIngestionResult = await km.ingestPrompt(content, title, {
          dryRun: options.dryRun,
          overrideNoGlow: options.overrideNoGlow,
          targetSkill: options.targetSkill,
          projectDir
        });

        // Report Security Warnings
        if (result.securityWarnings.length > 0) {
          for (const warn of result.securityWarnings) {
            log(LogLevel.WARN, `  [SECURITY] ${warn}`);
          }
        }

        // Report Techniques Discovered
        if (result.techniquesDiscovered.length > 0) {
          log(
            LogLevel.SUCCESS,
            `  Extracted ${result.techniquesDiscovered.length} structured technique(s):`
          );
          for (const t of result.techniquesDiscovered) {
            const skillTag = t.targetSkill ? color.cyan(`[→ ${t.targetSkill}]`) : '';
            log(LogLevel.INFO, `    ✔ ${color.green(t.name)} ${skillTag}`);
            if (options.verbose) {
              log(LogLevel.DEBUG, `      Philosophy: ${t.designPhilosophy}`);
              log(LogLevel.DEBUG, `      Category: ${t.category} | Tags: ${t.tags.join(', ')}`);
            }
          }
        } else {
          log(LogLevel.WARN, `  No new techniques extracted.`);
        }

        // Report Duplicates Skipped
        if (result.duplicatesFound.length > 0) {
          log(
            LogLevel.WARN,
            `  Skipped ${result.duplicatesFound.length} duplicate technique(s):`
          );
          for (const d of result.duplicatesFound) {
            log(LogLevel.INFO, `    ○ ${color.yellow(d.proposedName)} (${d.reason})`);
          }
        }

        // Report Conflicts Flagged
        if (result.conflictsDetected.length > 0) {
          log(
            LogLevel.WARN,
            `  Flagged ${result.conflictsDetected.length} policy conflict(s):`
          );
          for (const c of result.conflictsDetected) {
            log(LogLevel.WARN, `    ⚠ ${c.conflictWith}: ${c.message}`);
          }
        }

        totalDiscovered += result.techniquesDiscovered.length;
        totalDuplicates += result.duplicatesFound.length;
        totalConflicts += result.conflictsDetected.length;
      }
    } catch (err) {
      log(LogLevel.ERROR, `Failed to process ${rawPath}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  logHeader('Ingestion Summary');
  log(LogLevel.SUCCESS, `Techniques Stored: ${totalDiscovered}`);
  log(LogLevel.INFO, `Duplicates Preserved/Skipped: ${totalDuplicates}`);
  log(LogLevel.INFO, `Policy Conflicts Flagged: ${totalConflicts}`);
  if (options.dryRun) {
    log(LogLevel.WARN, '[DRY RUN] No files written to disk.');
  } else {
    log(LogLevel.SUCCESS, 'Master knowledge index updated: ./knowledge/index.json');
  }
}
