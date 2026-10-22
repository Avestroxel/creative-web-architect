/**
 * Safe file operations with backup support.
 */
import { copyFile, mkdir, readFile, writeFile, rm, readdir, stat } from 'node:fs/promises';
import { join, dirname, resolve, relative } from 'node:path';

/**
 * Check if a file exists.
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Ensure a directory exists.
 */
export async function ensureDir(dirPath: string): Promise<void> {
  await mkdir(dirPath, { recursive: true });
}

/**
 * Safely write a file, creating parent directories and optionally backing up existing files.
 */
export async function safeWriteFile(
  filePath: string,
  content: string,
  options: { backup?: boolean; force?: boolean } = {}
): Promise<{ written: boolean; backupPath?: string }> {
  const exists = await fileExists(filePath);

  if (exists && !options.force) {
    return { written: false };
  }

  let backupPath: string | undefined;
  if (exists && options.backup) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    backupPath = `${filePath}.${timestamp}.bak`;
    await copyFile(filePath, backupPath);
  }

  await ensureDir(dirname(filePath));
  await writeFile(filePath, content, 'utf-8');

  return { written: true, backupPath };
}

/**
 * Copy a directory recursively.
 */
export async function copyDir(src: string, dest: string): Promise<number> {
  await ensureDir(dest);
  let count = 0;

  const entries = await readdir(src);
  for (const entry of entries) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    const entryStat = await stat(srcPath);

    if (entryStat.isDirectory()) {
      count += await copyDir(srcPath, destPath);
    } else {
      await ensureDir(dirname(destPath));
      await copyFile(srcPath, destPath);
      count++;
    }
  }

  return count;
}

/**
 * Remove a directory recursively.
 */
export async function removeDir(dirPath: string): Promise<boolean> {
  try {
    await rm(dirPath, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}

/**
 * Read a JSON file and parse it.
 */
export async function readJSON<T = unknown>(filePath: string): Promise<T | null> {
  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}
