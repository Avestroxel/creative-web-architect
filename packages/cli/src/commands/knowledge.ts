/**
 * `cwa knowledge [search|list|status]` — Query and inspect the CWA knowledge base.
 */

import { KnowledgeManager, KnowledgeCategory } from '@cwa/core';
import { log, LogLevel, logHeader, color, style } from '../utils/logger.js';

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

    default:
      log(LogLevel.ERROR, `Unknown knowledge subcommand: ${subcommand}`);
      log(LogLevel.INFO, 'Valid subcommands: cwa knowledge [status | list | search <query>]');
  }
}
