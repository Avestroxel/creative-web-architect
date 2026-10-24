/**
 * AI Agent Environment Detection
 *
 * Detects which AI coding environments are present on the system
 * to determine where to install skills and configurations.
 */
import { stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import type { AgentEnvironment } from '@cwa/core';

/**
 * Check if a directory or file exists.
 */
async function pathExists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * Detect all supported AI coding environments in the current project and globally.
 */
export async function detectEnvironments(projectDir: string): Promise<AgentEnvironment[]> {
  const home = homedir();
  const environments: AgentEnvironment[] = [];

  // Claude Code — looks for .claude/ or CLAUDE.md
  const claudeDir = join(projectDir, '.claude');
  const claudeMd = join(projectDir, 'CLAUDE.md');
  const claudeDetected = await pathExists(claudeDir) || await pathExists(claudeMd);
  environments.push({
    name: 'Claude Code',
    slug: 'claude-code',
    configPath: claudeDir,
    skillFormat: 'agent-skills',
    detected: claudeDetected,
  });

  // Cursor — looks for .cursor/ or .cursorrules
  const cursorDir = join(projectDir, '.cursor');
  const cursorRules = join(projectDir, '.cursorrules');
  const cursorDetected = await pathExists(cursorDir) || await pathExists(cursorRules);
  environments.push({
    name: 'Cursor',
    slug: 'cursor',
    configPath: cursorDir,
    skillFormat: 'rules',
    detected: cursorDetected,
  });

  // Gemini CLI — looks for .gemini/ or GEMINI.md
  const geminiDir = join(projectDir, '.gemini');
  const geminiMd = join(projectDir, 'GEMINI.md');
  const geminiDetected = await pathExists(geminiDir) || await pathExists(geminiMd);
  environments.push({
    name: 'Gemini CLI',
    slug: 'gemini-cli',
    configPath: geminiDir,
    skillFormat: 'agent-skills',
    detected: geminiDetected,
  });

  // GitHub Copilot — looks for .github/copilot-instructions.md
  const copilotFile = join(projectDir, '.github', 'copilot-instructions.md');
  const copilotDetected = await pathExists(copilotFile);
  environments.push({
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    configPath: join(projectDir, '.github'),
    skillFormat: 'custom',
    detected: copilotDetected,
  });

  // Antigravity — looks for .agents/ or AGENTS.md
  const agentsDir = join(projectDir, '.agents');
  const agentsMd = join(projectDir, 'AGENTS.md');
  const antigravityGlobal = join(home, '.gemini', 'config');
  const antigravityDetected = await pathExists(agentsDir) || await pathExists(agentsMd) || await pathExists(antigravityGlobal);
  environments.push({
    name: 'Antigravity',
    slug: 'antigravity',
    configPath: agentsDir,
    skillFormat: 'agent-skills',
    detected: antigravityDetected,
  });

  return environments;
}

/**
 * Get the recommended skills directory for an environment.
 */
export function getSkillsInstallPath(env: AgentEnvironment, projectDir: string): string {
  switch (env.slug) {
    case 'claude-code':
      return join(projectDir, '.claude', 'skills');
    case 'cursor':
      return join(projectDir, '.cursor', 'skills');
    case 'gemini-cli':
      return join(projectDir, '.gemini', 'skills');
    case 'antigravity':
      return join(projectDir, '.agents', 'skills');
    case 'github-copilot':
      return join(projectDir, '.github', 'skills');
    default:
      return join(projectDir, 'skills');
  }
}
