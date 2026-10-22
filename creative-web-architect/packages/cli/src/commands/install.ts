/**
 * `cwa install [skills...]` — Install CWA skills into the project.
 *
 * If no skills are specified, installs all available skills.
 * Copies skill files from the CWA package to the project's skills directory.
 */
import { resolve, join, dirname } from 'node:path';
import { cwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import { discoverSkills, loadConfig, createConfig } from '@cwa/core';
import { copyDir, fileExists, ensureDir } from '../utils/file-ops.js';
import { log, logHeader, logBlank, LogLevel } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface InstallOptions {
  force?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

/**
 * Resolve the path to the bundled skills in the CWA package.
 */
function getBundledSkillsDir(): string {
  // Navigate from packages/cli/dist/commands/ to the repo root skills/
  return resolve(__dirname, '..', '..', '..', '..', 'skills');
}

export async function handleInstall(skillNames: string[], options: InstallOptions): Promise<void> {
  const projectDir = resolve(cwd());
  logHeader('Creative Web Architect — Install Skills');

  // Load project config
  const config = await loadConfig(projectDir) ?? createConfig();
  const targetDir = resolve(projectDir, config.skillsDir);
  const sourceDir = getBundledSkillsDir();

  // Discover available skills
  const available = await discoverSkills(sourceDir);

  if (available.length === 0) {
    log(LogLevel.ERROR, `No skills found in ${sourceDir}`);
    log(LogLevel.INFO, 'Make sure CWA is installed correctly.');
    return;
  }

  log(LogLevel.INFO, `Found ${available.length} available skill(s)`);

  // Filter to requested skills
  const toInstall = skillNames.length > 0
    ? available.filter(s => skillNames.includes(s.id))
    : available;

  if (skillNames.length > 0) {
    const notFound = skillNames.filter(name => !available.some(s => s.id === name));
    for (const name of notFound) {
      log(LogLevel.WARN, `Skill not found: ${name}`);
    }
  }

  if (toInstall.length === 0) {
    log(LogLevel.WARN, 'No skills to install.');
    return;
  }

  log(LogLevel.INFO, `Installing ${toInstall.length} skill(s) to ${targetDir}`);
  logBlank();

  let installed = 0;
  let skipped = 0;

  for (const skill of toInstall) {
    const destPath = join(targetDir, skill.id);
    const exists = await fileExists(destPath);

    if (exists && !options.force) {
      log(LogLevel.INFO, `  ⊘ ${skill.id} — already installed (use --force to overwrite)`);
      skipped++;
      continue;
    }

    if (options.dryRun) {
      log(LogLevel.INFO, `  [dry-run] Would install: ${skill.id}`);
      installed++;
      continue;
    }

    await ensureDir(destPath);
    const fileCount = await copyDir(skill.path, destPath);
    log(LogLevel.SUCCESS, `  ✔ ${skill.id} — ${fileCount} file(s)`);
    installed++;
  }

  logBlank();
  log(LogLevel.SUCCESS, `Installed: ${installed}, Skipped: ${skipped}`);

  if (installed > 0 && !options.dryRun) {
    log(LogLevel.INFO, 'Skills are ready for use by your AI coding environment.');
  }
}
