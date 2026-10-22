import type { Skill } from './types.js';
/**
 * Resolve the absolute path for skills directory.
 */
export declare function getSkillPath(baseDir: string, skillId: string): string;
/**
 * Discover all skills in a directory.
 * Each subdirectory containing a SKILL.md file is treated as a skill.
 */
export declare function discoverSkills(skillsDir: string): Promise<Skill[]>;
/**
 * Load a specific skill's full content.
 */
export declare function loadSkill(skillsDir: string, skillId: string): Promise<Skill | null>;
/**
 * Validate a skill's metadata for completeness.
 */
export declare function validateSkill(skill: Skill): {
    valid: boolean;
    errors: string[];
};
//# sourceMappingURL=skill-discovery.d.ts.map