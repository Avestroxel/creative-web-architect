/**
 * `cwa list` — List available and installed skills.
 */
import { resolve, dirname } from 'node:path';
import { cwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import { discoverSkills, loadConfig, createConfig } from '@cwa/core';
import { fileExists } from '../utils/file-ops.js';
import { log, logHeader, logBlank, LogLevel } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ListOptions {
  force?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

export async function handleList(options: ListOptions): Promise<void> {
  const projectDir = resolve(cwd());
  logHeader('Creative Web Architect — Skills');

  // Discover bundled skills
  const bundledDir = resolve(__dirname, '..', '..', '..', '..', 'skills');
  const bundled = await discoverSkills(bundledDir);

  // Discover installed skills
  const config = await loadConfig(projectDir) ?? createConfig();
  const installedDir = resolve(projectDir, config.skillsDir);
  const installed = await discoverSkills(installedDir);

  const installedIds = new Set(installed.map(s => s.id));

  if (bundled.length > 0) {
    log(LogLevel.INFO, `Available Skills (${bundled.length}):`);
    logBlank();

    for (const skill of bundled) {
      const status = installedIds.has(skill.id) ? '\x1b[32m●\x1b[0m' : '\x1b[90m○\x1b[0m';
      const desc = skill.metadata.description ? ` — ${skill.metadata.description}` : '';
      process.stdout.write(`  ${status} ${skill.id}${desc}\n`);
    }

    logBlank();
    log(LogLevel.INFO, `● = installed, ○ = available`);
    log(LogLevel.INFO, `${installedIds.size} of ${bundled.length} skills installed`);
  } else {
    log(LogLevel.WARN, 'No bundled skills found.');
  }
}
