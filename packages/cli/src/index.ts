#!/usr/bin/env node

/**
 * Creative Web Architect CLI
 *
 * Usage:
 *   cwa init              Initialize CWA in the current project
 *   cwa install [skills]  Install specific skills
 *   cwa update            Update installed skills
 *   cwa doctor            Diagnose installation issues
 *   cwa list              List available and installed skills
 *   cwa uninstall         Remove CWA from the current project
 *   cwa --version         Show version
 *   cwa --help            Show help
 */

import { argv, exit, stdout } from 'node:process';
import { handleInit } from './commands/init.js';
import { handleInstall } from './commands/install.js';
import { handleUpdate } from './commands/update.js';
import { handleDoctor } from './commands/doctor.js';
import { handleList } from './commands/list.js';
import { handleUninstall } from './commands/uninstall.js';
import { handleIngest } from './commands/ingest.js';
import { handleKnowledge } from './commands/knowledge.js';
import { log, LogLevel } from './utils/logger.js';

const VERSION = '0.2.0';

const HELP = `
  Creative Web Architect — AI Creative Development Toolkit

  Usage:
    cwa <command> [options]

  Commands:
    init                 Initialize CWA in the current project
    install [skills...]  Install specific skills (or all if none specified)
    update               Update installed skills to latest versions
    doctor               Diagnose installation and environment issues
    list                 List available and installed skills
    ingest [paths...]    Ingest reference prompts into persistent knowledge base
    knowledge [subcmd]   Query knowledge base (status | list | search <query>)
    uninstall            Remove CWA skills and configuration

  Options:
    --help, -h           Show this help message
    --version, -v        Show version number
    --force              Skip confirmation prompts
    --verbose            Show detailed output
    --dry-run            Preview changes without applying them

  Examples:
    cwa init
    cwa install liquid-glass motion-design typography
    cwa list
    cwa doctor
    cwa uninstall --force

  Documentation: https://github.com/creative-web-architect/creative-web-architect
`;

async function main(): Promise<void> {
  const args = argv.slice(2);
  const command = args[0];
  const flags = new Set(args.filter(a => a.startsWith('--') || a.startsWith('-')));
  const positional = args.filter(a => !a.startsWith('-')).slice(1);

  if (flags.has('--version') || flags.has('-v')) {
    stdout.write(`cwa v${VERSION}\n`);
    return;
  }

  if (flags.has('--help') || flags.has('-h') || !command) {
    stdout.write(HELP);
    return;
  }

  const options = {
    force: flags.has('--force'),
    verbose: flags.has('--verbose'),
    dryRun: flags.has('--dry-run'),
  };

  if (options.verbose) {
    log(LogLevel.DEBUG, `CWA CLI v${VERSION}`);
    log(LogLevel.DEBUG, `Command: ${command}`);
    log(LogLevel.DEBUG, `Args: ${positional.join(', ') || '(none)'}`);
  }

  try {
    switch (command) {
      case 'init':
        await handleInit(positional[0], options);
        break;
      case 'install':
        await handleInstall(positional, options);
        break;
      case 'update':
        await handleUpdate(options);
        break;
      case 'doctor':
        await handleDoctor(options);
        break;
      case 'list':
        await handleList(options);
        break;
      case 'ingest':
        await handleIngest(positional, options);
        break;
      case 'knowledge':
        await handleKnowledge(positional[0] || 'status', positional.slice(1), options);
        break;
      case 'uninstall':
        await handleUninstall(options);
        break;
      default:
        log(LogLevel.ERROR, `Unknown command: ${command}`);
        stdout.write(HELP);
        exit(1);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log(LogLevel.ERROR, message);
    if (options.verbose && error instanceof Error && error.stack) {
      log(LogLevel.DEBUG, error.stack);
    }
    exit(1);
  }
}

main();
