/**
 * `cwa uninstall` — Remove CWA skills and configuration.
 */
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { loadConfig } from '@cwa/core';
import { removeDir, fileExists } from '../utils/file-ops.js';
import { log, logHeader, logBlank, LogLevel } from '../utils/logger.js';

interface UninstallOptions {
  force?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

export async function handleUninstall(options: UninstallOptions): Promise<void> {
  const projectDir = resolve(cwd());
  logHeader('Creative Web Architect — Uninstall');

  const config = await loadConfig(projectDir);

  if (!config && !options.force) {
    log(LogLevel.INFO, 'No CWA installation detected. Nothing to uninstall.');
    return;
  }

  if (!options.force) {
    log(LogLevel.WARN, 'This will remove CWA skills and configuration.');
    log(LogLevel.INFO, 'Use --force to confirm, or --dry-run to preview.');
    return;
  }

  const skillsDir = resolve(projectDir, config?.skillsDir || './skills');
  const configFile = resolve(projectDir, 'cwa.config.json');

  // Remove skills directory
  if (await fileExists(skillsDir)) {
    if (options.dryRun) {
      log(LogLevel.INFO, `[dry-run] Would remove: ${skillsDir}`);
    } else {
      await removeDir(skillsDir);
      log(LogLevel.SUCCESS, `Removed skills directory: ${skillsDir}`);
    }
  }

  // Remove config file
  if (await fileExists(configFile)) {
    if (options.dryRun) {
      log(LogLevel.INFO, '[dry-run] Would remove: cwa.config.json');
    } else {
      const { rm } = await import('node:fs/promises');
      await rm(configFile);
      log(LogLevel.SUCCESS, 'Removed cwa.config.json');
    }
  }

  logBlank();
  log(LogLevel.SUCCESS, 'Uninstall complete.');
  log(LogLevel.INFO, 'AGENTS.md was preserved — remove manually if desired.');
}
