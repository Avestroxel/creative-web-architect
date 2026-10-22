import { describe, it, expect } from 'vitest';
import { resolve } from 'node:path';
import { detectEnvironments, getSkillsInstallPath } from './detect-environment.js';

describe('AI Environment Detection', () => {
  const rootDir = resolve(__dirname, '../../../../');

  it('detects environments in repository root', async () => {
    const envs = await detectEnvironments(rootDir);
    expect(envs.length).toBeGreaterThanOrEqual(4);

    const names = envs.map((e) => e.name);
    expect(names).toContain('Claude Code');
    expect(names).toContain('Cursor');
    expect(names).toContain('Gemini CLI');
    expect(names).toContain('GitHub Copilot');
    expect(names).toContain('Antigravity');
  });

  it('returns proper installation paths for each environment', () => {
    const mockEnv = (slug: 'claude-code' | 'cursor' | 'gemini-cli' | 'github-copilot' | 'antigravity' | 'unknown') => ({
      name: slug,
      slug,
      configPath: `/project/${slug}`,
      skillFormat: 'agent-skills' as const,
      detected: true,
    });

    expect(getSkillsInstallPath(mockEnv('claude-code'), '/project')).toMatch(/[\\/]\.claude[\\/]skills$/);
    expect(getSkillsInstallPath(mockEnv('cursor'), '/project')).toMatch(/[\\/]\.cursor[\\/]skills$/);
    expect(getSkillsInstallPath(mockEnv('antigravity'), '/project')).toMatch(/[\\/]\.agents[\\/]skills$/);
    expect(getSkillsInstallPath(mockEnv('gemini-cli'), '/project')).toMatch(/[\\/]\.gemini[\\/]skills$/);
    expect(getSkillsInstallPath(mockEnv('unknown'), '/project')).toMatch(/[\\/]skills$/);
  });
});
