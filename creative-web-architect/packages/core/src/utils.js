/**
 * Shared filesystem utilities with safety checks.
 */
import { access, copyFile, mkdir, stat } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
/**
 * Resolve a path to an absolute path.
 */
export function resolvePath(...segments) {
    return resolve(...segments);
}
/**
 * Check if a path is a subdirectory of (or equal to) a parent path.
 * Used for safe path validation to prevent path traversal.
 */
export function isSubPath(parentPath, childPath) {
    const resolvedParent = resolve(parentPath);
    const resolvedChild = resolve(childPath);
    const relativePath = relative(resolvedParent, resolvedChild);
    // If relative path starts with '..' or is absolute, it's outside the parent
    return !relativePath.startsWith('..') && !relativePath.startsWith(sep);
}
/**
 * Check if a file or directory exists.
 */
export async function exists(filePath) {
    try {
        await access(filePath);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Check if a path is a directory.
 */
export async function isDirectory(filePath) {
    try {
        const s = await stat(filePath);
        return s.isDirectory();
    }
    catch {
        return false;
    }
}
/**
 * Create a backup of a file by copying it with a .bak extension and timestamp.
 */
export async function createBackup(filePath) {
    try {
        const fileExists = await exists(filePath);
        if (!fileExists)
            return null;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = `${filePath}.${timestamp}.bak`;
        await copyFile(filePath, backupPath);
        return backupPath;
    }
    catch {
        return null;
    }
}
/**
 * Ensure a directory exists, creating it if necessary.
 */
export async function ensureDir(dirPath) {
    await mkdir(dirPath, { recursive: true });
}
//# sourceMappingURL=utils.js.map