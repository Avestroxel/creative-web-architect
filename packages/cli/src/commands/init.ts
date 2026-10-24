/**
 * `cwa init` — Initialize Creative Web Architect in the current project.
 *
 * Detects the current environment, creates configuration,
 * and installs skills to the appropriate location.
 */
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { createConfig } from '@cwa/core';
import { detectEnvironments, getSkillsInstallPath } from '../utils/detect-environment.js';
import { safeWriteFile, ensureDir } from '../utils/file-ops.js';
import { log, logHeader, logPair, logBlank, LogLevel } from '../utils/logger.js';

interface InitOptions {
  force?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

export async function handleInit(options: InitOptions): Promise<void> {
  const projectDir = resolve(cwd());
  logHeader('Creative Web Architect — Init');

  // Step 1: Detect environments
  log(LogLevel.INFO, 'Detecting AI coding environments...');
  const environments = await detectEnvironments(projectDir);
  const detected = environments.filter(e => e.detected);

  if (detected.length === 0) {
    log(LogLevel.WARN, 'No known AI coding environments detected.');
    log(LogLevel.INFO, 'Skills will be installed to ./skills/ directory.');
    log(LogLevel.INFO, 'You can manually configure your environment to use this path.');
  } else {
    log(LogLevel.SUCCESS, `Detected ${detected.length} environment(s):`);
    for (const env of detected) {
      logPair(env.name, env.configPath || '(default path)');
    }
  }

  logBlank();

  // Step 2: Create configuration
  log(LogLevel.INFO, 'Creating CWA configuration...');
  const config = createConfig({
    skillsDir: detected[0] ? getSkillsInstallPath(detected[0], projectDir) : './skills',
    targetEnvironments: detected.map(e => e.slug),
  });

  if (options.dryRun) {
    log(LogLevel.INFO, '[dry-run] Would create cwa.config.json');
    log(LogLevel.INFO, `[dry-run] Would create skills directory at: ${config.skillsDir}`);
  } else {
    const configResult = await safeWriteFile(
      resolve(projectDir, 'cwa.config.json'),
      JSON.stringify(config, null, 2) + '\n',
      { backup: true, force: options.force }
    );

    if (configResult.written) {
      log(LogLevel.SUCCESS, 'Created cwa.config.json');
      if (configResult.backupPath) {
        log(LogLevel.INFO, `Backup saved: ${configResult.backupPath}`);
      }
    } else {
      log(LogLevel.WARN, 'cwa.config.json already exists (use --force to overwrite)');
    }

    // Step 3: Create skills directory
    await ensureDir(resolve(projectDir, config.skillsDir));
    log(LogLevel.SUCCESS, `Skills directory ready: ${config.skillsDir}`);
  }

  logBlank();

  // Step 4: Create AGENTS.md if not present
  const agentsMdContent = `# Creative Web Architect

This project uses [Creative Web Architect](https://github.com/creative-web-architect/creative-web-architect) skills.

Skills are located in: \`${config.skillsDir}\`

## Quick Start

Describe what you want and the agent will use the appropriate CWA skills:

- "Create a luxury automotive website"
- "Build a minimalist portfolio"
- "Make a Liquid Glass dashboard"
- "Redesign this site for better performance"

## Available Modes

- **auto** — Full autonomous creative decisions (default)
- **guided** — Honor your style preferences
- **experimental** — Prioritize creative risk
- **performance** — Optimize for speed
- **immersive** — Cinematic storytelling and 3D
- **liquid-glass** — Translucent material design
`;

  if (!options.dryRun) {
    const agentsResult = await safeWriteFile(
      resolve(projectDir, 'AGENTS.md'),
      agentsMdContent,
      { backup: true, force: false }
    );

    if (agentsResult.written) {
      log(LogLevel.SUCCESS, 'Created AGENTS.md');
    } else {
      log(LogLevel.INFO, 'AGENTS.md already exists — preserved');
    }
  }

  logBlank();
  log(LogLevel.SUCCESS, 'Initialization complete!');
  log(LogLevel.INFO, 'Next: Run `cwa install` to install creative skills');
}
