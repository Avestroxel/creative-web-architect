/**
 * Skill Discovery Engine
 *
 * Discovers, validates, and loads Agent Skills from the filesystem.
 * Skills are directories containing a SKILL.md file with YAML frontmatter.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve, basename } from 'node:path';
/**
 * Parse YAML-like frontmatter from a markdown string.
 * Lightweight parser to avoid heavy dependencies.
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
        return { data: {}, content };
    }
    const yamlBlock = match[1];
    const markdownContent = match[2];
    const data = {};
    for (const line of yamlBlock.split(/\r?\n/)) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1)
            continue;
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
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
export function getSkillPath(baseDir, skillId) {
    return resolve(baseDir, skillId);
}
/**
 * Discover all skills in a directory.
 * Each subdirectory containing a SKILL.md file is treated as a skill.
 */
export async function discoverSkills(skillsDir) {
    const absoluteDir = resolve(skillsDir);
    const skills = [];
    let entries;
    try {
        entries = await readdir(absoluteDir);
    }
    catch {
        return skills;
    }
    for (const entry of entries) {
        const entryPath = join(absoluteDir, entry);
        const entryStat = await stat(entryPath).catch(() => null);
        if (!entryStat?.isDirectory())
            continue;
        const skillFilePath = join(entryPath, 'SKILL.md');
        const skillStat = await stat(skillFilePath).catch(() => null);
        if (!skillStat?.isFile())
            continue;
        try {
            const rawContent = await readFile(skillFilePath, 'utf-8');
            const { data } = parseFrontmatter(rawContent);
            const metadata = {
                name: data.name || entry,
                description: data.description || '',
                version: data.version,
                author: data.author,
                tags: data.tags,
                activationKeywords: data.activationKeywords,
                dependencies: data.dependencies,
            };
            skills.push({
                id: entry,
                metadata,
                path: entryPath,
                skillFilePath,
            });
        }
        catch {
            // Skip malformed skills
            continue;
        }
    }
    return skills.sort((a, b) => a.id.localeCompare(b.id));
}
/**
 * Load a specific skill's full content.
 */
export async function loadSkill(skillsDir, skillId) {
    const skillPath = getSkillPath(skillsDir, skillId);
    const skillFilePath = join(skillPath, 'SKILL.md');
    try {
        const rawContent = await readFile(skillFilePath, 'utf-8');
        const { data, content } = parseFrontmatter(rawContent);
        const metadata = {
            name: data.name || skillId,
            description: data.description || '',
            version: data.version,
            author: data.author,
            tags: data.tags,
            activationKeywords: data.activationKeywords,
            dependencies: data.dependencies,
        };
        return {
            id: skillId,
            metadata,
            path: skillPath,
            skillFilePath,
            content,
        };
    }
    catch {
        return null;
    }
}
/**
 * Validate a skill's metadata for completeness.
 */
export function validateSkill(skill) {
    const errors = [];
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
//# sourceMappingURL=skill-discovery.js.map