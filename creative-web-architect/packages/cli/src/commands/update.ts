/**
 * `cwa update` — Update installed skills to the latest versions.
 */
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { loadConfig, createConfig } from '@cwa/core';
import { log, logHeader, LogLevel } from '../utils/logger.js';
import { handleInstall } from './install.js';

interface UpdateOptions {
  force?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

export async function handleUpdate(options: UpdateOptions): Promise<void> {
  logHeader('Creative Web Architect — Update');

  const projectDir = resolve(cwd());
  const config = await loadConfig(projectDir);

  if (!config) {
    log(LogLevel.ERROR, 'No CWA configuration found. Run `cwa init` first.');
    return;
  }

  log(LogLevel.INFO, 'Updating all installed skills...');

  // Force-reinstall all skills
  await handleInstall([], { ...options, force: true });
}
