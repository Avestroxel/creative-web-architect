/**
 * `cwa knowledge [search|list|status]` — Query and inspect the CWA knowledge base.
 */

import { KnowledgeManager, KnowledgeCategory, ExperienceMemory } from '@cwa/core';
import { log, LogLevel, logHeader, logBlank, color, style } from '../utils/logger.js';

interface KnowledgeCliOptions {
  category?: string;
  tag?: string;
  verbose?: boolean;
}

/**
 * Handle `cwa knowledge` subcommands.
 */
export async function handleKnowledge(
  subcommand: string = 'status',
  args: string[] = [],
  options: KnowledgeCliOptions = {}
): Promise<void> {
  const projectDir = process.cwd();
  const km = new KnowledgeManager(projectDir);
  await km.init();

  const index = await km.getIndex();

  switch (subcommand) {
    case 'status': {
      logHeader('Creative Web Architect — Knowledge Base Status');
      log(LogLevel.INFO, `Total Learned Techniques: ${style.bold(String(index.totalTechniques))}`);
      log(LogLevel.INFO, `Last Updated: ${index.updatedAt}`);
      log(LogLevel.INFO, '\nCategories Breakdown:');

      for (const [cat, count] of Object.entries(index.categories)) {
        log(LogLevel.INFO, `  • ${color.cyan(cat.padEnd(26))} ${color.green(String(count))} technique(s)`);
      }
      break;
    }

    case 'list': {
      logHeader('Creative Web Architect — Stored Techniques');
      const categoryFilter = options.category as KnowledgeCategory | undefined;
      const techniques = await km.queryKnowledge({
        category: categoryFilter,
        tags: options.tag ? [options.tag] : undefined
      });

      if (techniques.length === 0) {
        log(LogLevel.WARN, 'No techniques found matching filter criteria.');
        return;
      }

      for (const t of techniques) {
        const catBadge = color.cyan(`[${t.category}]`);
        const skillBadge = t.targetSkill ? color.yellow(`(Skill: ${t.targetSkill})`) : '';
        log(LogLevel.INFO, `${color.green('●')} ${style.bold(t.name)} ${catBadge} ${skillBadge}`);
        log(LogLevel.INFO, `  ${color.dim(t.description)}`);
        if (options.verbose) {
          log(LogLevel.DEBUG, `  Tags: ${t.tags.join(', ')} | Status: ${t.validationStatus}`);
        }
      }
      break;
    }

    case 'search': {
      const query = args.join(' ');
      if (!query) {
        log(LogLevel.WARN, 'Please provide a search term. Usage: cwa knowledge search <query>');
        return;
      }

      logHeader(`Knowledge Search: "${query}"`);
      const results = await km.queryKnowledge({ query, limit: 10 });

      if (results.length === 0) {
        log(LogLevel.WARN, `No techniques found matching "${query}".`);
        return;
      }

      log(LogLevel.SUCCESS, `Found ${results.length} relevant technique(s):\n`);
      for (const r of results) {
        log(LogLevel.INFO, `${color.green('✔')} ${style.bold(r.name)} ${color.cyan(`[${r.category}]`)}`);
        log(LogLevel.INFO, `  ${r.description}`);
        log(LogLevel.INFO, `  ${color.dim(`Tags: ${r.tags.join(', ')}`)}`);
      }
      break;
    }

    case 'memory': {
      logHeader('Creative Web Architect — Persistent Experience Memory');
      const memory = new ExperienceMemory();
      await memory.loadFromFile();
      const stats = memory.getStats();

      log(LogLevel.INFO, `Total Stored Lessons: ${style.bold(String(stats.total))}`);
      log(LogLevel.INFO, `Validated Successes: ${color.green(String(stats.byStatus['validated-success'] || 0))}`);
      log(LogLevel.INFO, `Tested Techniques: ${color.cyan(String(stats.byStatus['tested-technique'] || 0))}`);
      log(LogLevel.INFO, `Known Failure Patterns: ${color.red(String(stats.byStatus['known-failure'] || 0))}`);
      logBlank();

      log(LogLevel.INFO, 'Provenance Breakdown:');
      for (const [prov, count] of Object.entries(stats.byProvenance)) {
        log(LogLevel.INFO, `  • ${color.cyan(prov.padEnd(24))} ${color.green(String(count))} record(s)`);
      }
      logBlank();

      log(LogLevel.INFO, 'Validation Status Breakdown:');
      for (const [vStatus, count] of Object.entries(stats.byValidationStatus)) {
        log(LogLevel.INFO, `  • ${color.cyan(vStatus.padEnd(24))} ${color.green(String(count))} record(s)`);
      }
      logBlank();

      const cautionary = memory.getKnownFailurePatterns();
      if (cautionary.length > 0) {
        log(LogLevel.WARN, 'Cautionary Failure Patterns Active:');
        for (const pattern of cautionary.slice(0, 5)) {
          log(LogLevel.WARN, `  ⚠ ${pattern}`);
        }
        logBlank();
      }

      const recent = memory.getRecentExperiences(5);
      log(LogLevel.INFO, 'Recent Validated Experiences:');
      for (const rec of recent) {
        const badge = rec.status === 'validated-success' ? color.green('[VALIDATED]') : color.yellow(`[${rec.status}]`);
        log(LogLevel.INFO, `  ${color.green('●')} ${style.bold(rec.category)} ${badge} (${rec.provenance})`);
        log(LogLevel.INFO, `    Brief: ${rec.briefSummary}`);
        log(LogLevel.INFO, `    Key Takeaway: ${rec.keyTakeaway}`);
        log(LogLevel.INFO, `    Critic Score: ${rec.criticScore}/100 | Techniques: ${rec.techniquesUsed.slice(0, 3).join(', ')}`);
      }
      break;
    }

    default:
      log(LogLevel.ERROR, `Unknown knowledge subcommand: ${subcommand}`);
      log(LogLevel.INFO, 'Valid subcommands: cwa knowledge [status | list | search <query> | memory]');
  }
}
