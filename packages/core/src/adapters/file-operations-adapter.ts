/**
 * File Operations Adapter for Creative Web Architect 2.0.
 *
 * Provides typed, audited filesystem operations with automated directory creation,
 * pre-modification backups, and virtual/in-memory implementations for dry-runs and testing.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { promises as fs } from 'node:fs';
import { dirname, resolve } from 'node:path';

export interface WriteFileOptions {
  createDirs?: boolean;
  backup?: boolean;
  encoding?: BufferEncoding;
  overwrite?: boolean;
}

export interface FileOperationsAdapter {
  readonly id: string;
  readonly isVirtual: boolean;

  readFile(filePath: string, encoding?: BufferEncoding): Promise<string>;
  writeFile(filePath: string, content: string, options?: WriteFileOptions): Promise<void>;
  fileExists(filePath: string): Promise<boolean>;
  mkdir(dirPath: string): Promise<void>;
  listFiles(dirPath: string): Promise<string[]>;
  backupFile(filePath: string): Promise<string | null>;
}

/**
 * Node.js Real Filesystem Adapter.
 * Performs real asynchronous I/O on disk.
 */
export class NodeFileSystemAdapter implements FileOperationsAdapter {
  public readonly id = 'node-fs';
  public readonly isVirtual = false;

  public async readFile(filePath: string, encoding: BufferEncoding = 'utf-8'): Promise<string> {
    const fullPath = resolve(filePath);
    return fs.readFile(fullPath, { encoding });
  }

  public async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(resolve(filePath));
      return true;
    } catch {
      return false;
    }
  }

  public async mkdir(dirPath: string): Promise<void> {
    await fs.mkdir(resolve(dirPath), { recursive: true });
  }

  public async backupFile(filePath: string): Promise<string | null> {
    const fullPath = resolve(filePath);
    const exists = await this.fileExists(fullPath);
    if (!exists) return null;

    const timestamp = Date.now();
    const backupPath = `${fullPath}.${timestamp}.bak`;
    const content = await fs.readFile(fullPath);
    await fs.writeFile(backupPath, content);
    return backupPath;
  }

  public async writeFile(
    filePath: string,
    content: string,
    options: WriteFileOptions = {}
  ): Promise<void> {
    const fullPath = resolve(filePath);
    const createDirs = options.createDirs ?? true;
    const shouldBackup = options.backup ?? true;
    const encoding = options.encoding ?? 'utf-8';

    if (createDirs) {
      await this.mkdir(dirname(fullPath));
    }

    if (shouldBackup && (await this.fileExists(fullPath))) {
      await this.backupFile(fullPath);
    }

    await fs.writeFile(fullPath, content, { encoding });
  }

  public async listFiles(dirPath: string): Promise<string[]> {
    const fullPath = resolve(dirPath);
    try {
      return await fs.readdir(fullPath);
    } catch {
      return [];
    }
  }
}

/**
 * In-Memory Virtual Filesystem Adapter.
 * Ideal for unit testing, dry-runs, and virtual pipelines without disk side-effects.
 */
export class VirtualFileSystemAdapter implements FileOperationsAdapter {
  public readonly id = 'virtual-memory-fs';
  public readonly isVirtual = true;
  private files = new Map<string, string>();
  private directories = new Set<string>();

  public async readFile(filePath: string): Promise<string> {
    const normalized = resolve(filePath);
    if (!this.files.has(normalized)) {
      throw new Error(`Virtual file not found: ${filePath}`);
    }
    return this.files.get(normalized)!;
  }

  public async fileExists(filePath: string): Promise<boolean> {
    const normalized = resolve(filePath);
    return this.files.has(normalized);
  }

  public async mkdir(dirPath: string): Promise<void> {
    this.directories.add(resolve(dirPath));
  }

  public async backupFile(filePath: string): Promise<string | null> {
    const normalized = resolve(filePath);
    if (!this.files.has(normalized)) return null;

    const backupPath = `${normalized}.${Date.now()}.bak`;
    this.files.set(backupPath, this.files.get(normalized)!);
    return backupPath;
  }

  public async writeFile(
    filePath: string,
    content: string,
    options: WriteFileOptions = {}
  ): Promise<void> {
    const normalized = resolve(filePath);
    if (options.backup && this.files.has(normalized)) {
      await this.backupFile(filePath);
    }
    this.directories.add(dirname(normalized));
    this.files.set(normalized, content);
  }

  public async listFiles(dirPath: string): Promise<string[]> {
    const normalizedDir = resolve(dirPath);
    const results: string[] = [];
    for (const filePath of this.files.keys()) {
      if (filePath.startsWith(normalizedDir)) {
        const relativeName = filePath.slice(normalizedDir.length).replace(/^[\\/]/, '');
        if (!relativeName.includes('/') && !relativeName.includes('\\')) {
          results.push(relativeName);
        }
      }
    }
    return results;
  }

  public getAllFiles(): Record<string, string> {
    return Object.fromEntries(this.files.entries());
  }

  public clear(): void {
    this.files.clear();
    this.directories.clear();
  }
}
