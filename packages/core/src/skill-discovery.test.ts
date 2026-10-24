import { describe, it, expect } from 'vitest';
import { resolve, join } from 'node:path';
import { discoverSkills, loadSkill, validateSkill, getSkillPath } from './skill-discovery.js';

describe('Skill Discovery Engine', () => {
  const rootSkillsDir = resolve(__dirname, '../../../skills');

  it('resolves skill paths correctly', () => {
    const path = getSkillPath('/test/skills', 'liquid-glass');
    expect(path).toBe(resolve('/test/skills', 'liquid-glass'));
  });

  it('discovers all skills in the skills directory', async () => {
    const skills = await discoverSkills(rootSkillsDir);
    expect(skills.length).toBeGreaterThanOrEqual(20);

    const ids = skills.map((s) => s.id);
    expect(ids).toContain('liquid-glass');
    expect(ids).toContain('motion-design');
    expect(ids).toContain('three-dimensional-web');
    expect(ids).toContain('brief-interpreter');
    expect(ids).toContain('accessibility');
    expect(ids).toContain('performance-optimization');
  });

  it('loads a specific skill with frontmatter and body content', async () => {
    const skill = await loadSkill(rootSkillsDir, 'liquid-glass');
    expect(skill).not.toBeNull();
    expect(skill?.id).toBe('liquid-glass');
    expect(skill?.metadata.name).toBe('liquid-glass');
    expect(skill?.metadata.description).toBeTruthy();
    expect(skill?.content).toBeTruthy();
  });

  it('returns null when loading a non-existent skill', async () => {
    const skill = await loadSkill(rootSkillsDir, 'non-existent-skill-xyz');
    expect(skill).toBeNull();
  });

  it('validates a valid skill correctly', async () => {
    const skill = await loadSkill(rootSkillsDir, 'motion-design');
    expect(skill).not.toBeNull();
    if (skill) {
      const validation = validateSkill(skill);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    }
  });

  it('fails validation when skill name or description is empty', () => {
    const invalidSkill = {
      id: 'bad-skill',
      path: '/skills/bad-skill',
      skillFilePath: '/skills/bad-skill/SKILL.md',
      metadata: {
        name: '',
        description: '',
      },
    };
    const result = validateSkill(invalidSkill);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(2);
  });
});
