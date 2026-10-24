/**
 * `cwa doctor` — Diagnose installation and environment issues.
 */
import { resolve } from 'node:path';
import { cwd, version as nodeVersion } from 'node:process';
import { loadConfig, discoverSkills } from '@cwa/core';
import { detectEnvironments } from '../utils/detect-environment.js';
import { fileExists } from '../utils/file-ops.js';
import { log, logHeader, logPair, logBlank, LogLevel } from '../utils/logger.js';

interface DoctorOptions {
  force?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

export async function handleDoctor(options: DoctorOptions): Promise<void> {
  const projectDir = resolve(cwd());
  logHeader('Creative Web Architect — Doctor');

  let issues = 0;

  // Check Node.js version
  const nodeMajor = parseInt(nodeVersion.slice(1), 10);
  if (nodeMajor >= 18) {
    log(LogLevel.SUCCESS, `Node.js ${nodeVersion}`);
  } else {
    log(LogLevel.ERROR, `Node.js ${nodeVersion} — requires >= 18.0.0`);
    issues++;
  }

  // Check configuration
  const config = await loadConfig(projectDir);
  if (config) {
    log(LogLevel.SUCCESS, 'Configuration: cwa.config.json found');
    if (options.verbose) {
      logPair('Mode', config.mode);
      logPair('Skills Dir', config.skillsDir);
    }
  } else {
    log(LogLevel.WARN, 'Configuration: cwa.config.json not found — run `cwa init`');
    issues++;
  }

  // Check skills directory
  const skillsDir = config?.skillsDir || './skills';
  const absoluteSkillsDir = resolve(projectDir, skillsDir);
  const skillsDirExists = await fileExists(absoluteSkillsDir);

  if (skillsDirExists) {
    const skills = await discoverSkills(absoluteSkillsDir);
    log(LogLevel.SUCCESS, `Skills: ${skills.length} skill(s) installed in ${skillsDir}`);

    if (options.verbose && skills.length > 0) {
      for (const skill of skills) {
        logPair(`  ${skill.id}`, skill.metadata.description || '(no description)');
      }
    }

    // Validate skills
    let validCount = 0;
    for (const skill of skills) {
      if (skill.metadata.name && skill.metadata.description) {
        validCount++;
      } else {
        log(LogLevel.WARN, `  Skill "${skill.id}" has incomplete metadata`);
        issues++;
      }
    }

    if (validCount === skills.length && skills.length > 0) {
      log(LogLevel.SUCCESS, 'All skills have valid metadata');
    }
  } else {
    log(LogLevel.WARN, `Skills directory not found: ${skillsDir}`);
    issues++;
  }

  // Check AI environments
  logBlank();
  log(LogLevel.INFO, 'Checking AI coding environments...');
  const environments = await detectEnvironments(projectDir);
  const detected = environments.filter(e => e.detected);

  if (detected.length > 0) {
    for (const env of detected) {
      log(LogLevel.SUCCESS, `${env.name} detected`);
    }
  } else {
    log(LogLevel.INFO, 'No AI coding environments detected (skills still usable manually)');
  }

  // Check AGENTS.md
  logBlank();
  const agentsMdExists = await fileExists(resolve(projectDir, 'AGENTS.md'));
  if (agentsMdExists) {
    log(LogLevel.SUCCESS, 'AGENTS.md present');
  } else {
    log(LogLevel.INFO, 'AGENTS.md not found — recommended for agent discoverability');
  }

  // Summary
  logBlank();
  if (issues === 0) {
    log(LogLevel.SUCCESS, 'All checks passed!');
  } else {
    log(LogLevel.WARN, `${issues} issue(s) found. See above for details.`);
  }
}
