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
import { handleCreate } from './commands/create.js';
import { handleCritique } from './commands/critique.js';
import { handleBenchmark } from './commands/benchmark.js';
import { log, LogLevel } from './utils/logger.js';

const VERSION = '0.2.0';

const HELP = `
  Creative Web Architect 2.0 — Autonomous AI Creative Engineering Engine

  Usage:
    cwa <command> [options]

  Commands:
    create "<prompt>"    Autonomously generate an Awwwards-grade website from 1-3 lines
    critique [file]      Run autonomous Visual Critic & Experience Critic on an HTML file
    benchmark            Run repeatable evaluation benchmark suite (add --compare for 3-way analysis)
    init                 Initialize CWA skills, techniques, and directives in current project
    install [skills...]  Install specific skills (or all if none specified)
    update               Update installed skills to latest versions
    doctor               Diagnose installation and environment issues
    list                 List available and installed skills
    ingest [paths...]    Ingest reference prompts into persistent knowledge base
    knowledge [subcmd]   Query knowledge base (status | list | search <query> | memory)
    uninstall            Remove CWA skills and configuration

  Options:
    --help, -h           Show this help message
    --version, -v        Show version number
    --output, -o         Custom output path for generated website
    --quick              Run fast benchmark subset
    --compare, -c        Run 3-way comparative benchmark (Mode A vs Mode B vs Mode C)
    --force              Skip confirmation prompts
    --verbose            Show detailed output
    --dry-run            Preview changes without applying them

  Examples:
    cwa create "Monograph portfolio for a Tokyo brutalist architecture practice"
    cwa critique index.html
    cwa benchmark --compare
    cwa knowledge memory
    cwa init
    cwa list

  Documentation: https://github.com/Avestroxel/creative-web-architect
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
    quick: flags.has('--quick'),
    compare: flags.has('--compare') || flags.has('-c'),
    fix: flags.has('--fix'),
    browser: !flags.has('--no-browser'),
    allowAudio: flags.has('--allow-audio'),
  };

  if (options.verbose) {
    log(LogLevel.DEBUG, `CWA CLI v${VERSION}`);
    log(LogLevel.DEBUG, `Command: ${command}`);
    log(LogLevel.DEBUG, `Args: ${positional.join(', ') || '(none)'}`);
  }

  try {
    switch (command) {
      case 'create':
      case 'generate':
      case 'build':
        await handleCreate(positional, options);
        break;
      case 'critique':
      case 'audit':
      case 'review':
        await handleCritique(positional[0], options);
        break;
      case 'benchmark':
        await handleBenchmark(options);
        break;
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
