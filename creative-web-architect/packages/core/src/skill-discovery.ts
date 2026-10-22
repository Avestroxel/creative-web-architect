/**
 * Skill Discovery Engine
 *
 * Discovers, validates, and loads Agent Skills from the filesystem.
 * Skills are directories containing a SKILL.md file with YAML frontmatter.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve, basename } from 'node:path';
import type { Skill, SkillMetadata } from './types.js';

/**
 * Parse YAML-like frontmatter from a markdown string.
 * Lightweight parser to avoid heavy dependencies.
 */
function parseFrontmatter(content: string): { data: Record<string, unknown>; content: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content };
  }

  const yamlBlock = match[1];
  const markdownContent = match[2];
  const data: Record<string, unknown> = {};

  for (const line of yamlBlock.split(/\r?\n/)) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    // Handle arrays (simple YAML list on same line: [a, b, c])
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    }
    // Handle quoted strings
    else if (typeof value === 'string' && ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, content: markdownContent };
}

/**
 * Resolve the absolute path for skills directory.
 */
export function getSkillPath(baseDir: string, skillId: string): string {
  return resolve(baseDir, skillId);
}

/**
 * Discover all skills in a directory.
 * Each subdirectory containing a SKILL.md file is treated as a skill.
 */
export async function discoverSkills(skillsDir: string): Promise<Skill[]> {
  const absoluteDir = resolve(skillsDir);
  const skills: Skill[] = [];

  let entries: string[];
  try {
    entries = await readdir(absoluteDir);
  } catch {
    return skills;
  }

  for (const entry of entries) {
    const entryPath = join(absoluteDir, entry);
    const entryStat = await stat(entryPath).catch(() => null);

    if (!entryStat?.isDirectory()) continue;

    const skillFilePath = join(entryPath, 'SKILL.md');
    const skillStat = await stat(skillFilePath).catch(() => null);

    if (!skillStat?.isFile()) continue;

    try {
      const rawContent = await readFile(skillFilePath, 'utf-8');
      const { data } = parseFrontmatter(rawContent);

      const metadata: SkillMetadata = {
        name: (data.name as string) || entry,
        description: (data.description as string) || '',
        version: data.version as string | undefined,
        author: data.author as string | undefined,
        tags: data.tags as string[] | undefined,
        activationKeywords: data.activationKeywords as string[] | undefined,
        dependencies: data.dependencies as string[] | undefined,
      };

      skills.push({
        id: entry,
        metadata,
        path: entryPath,
        skillFilePath,
      });
    } catch {
      // Skip malformed skills
      continue;
    }
  }

  return skills.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Load a specific skill's full content.
 */
export async function loadSkill(skillsDir: string, skillId: string): Promise<Skill | null> {
  const skillPath = getSkillPath(skillsDir, skillId);
  const skillFilePath = join(skillPath, 'SKILL.md');

  try {
    const rawContent = await readFile(skillFilePath, 'utf-8');
    const { data, content } = parseFrontmatter(rawContent);

    const metadata: SkillMetadata = {
      name: (data.name as string) || skillId,
      description: (data.description as string) || '',
      version: data.version as string | undefined,
      author: data.author as string | undefined,
      tags: data.tags as string[] | undefined,
      activationKeywords: data.activationKeywords as string[] | undefined,
      dependencies: data.dependencies as string[] | undefined,
    };

    return {
      id: skillId,
      metadata,
      path: skillPath,
      skillFilePath,
      content,
    };
  } catch {
    return null;
  }
}

/**
 * Validate a skill's metadata for completeness.
 */
export function validateSkill(skill: Skill): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!skill.metadata.name || skill.metadata.name.trim() === '') {
    errors.push('Skill must have a non-empty "name" in frontmatter');
  }

  if (!skill.metadata.description || skill.metadata.description.trim() === '') {
    errors.push('Skill must have a non-empty "description" in frontmatter');
  }

  if (skill.id !== basename(skill.path)) {
    errors.push(`Skill ID "${skill.id}" must match directory name "${basename(skill.path)}"`);
  }

  return { valid: errors.length === 0, errors };
}
