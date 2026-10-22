/**
 * Resolve a path to an absolute path.
 */
export declare function resolvePath(...segments: string[]): string;
/**
 * Check if a path is a subdirectory of (or equal to) a parent path.
 * Used for safe path validation to prevent path traversal.
 */
export declare function isSubPath(parentPath: string, childPath: string): boolean;
/**
 * Check if a file or directory exists.
 */
export declare function exists(filePath: string): Promise<boolean>;
/**
 * Check if a path is a directory.
 */
export declare function isDirectory(filePath: string): Promise<boolean>;
/**
 * Create a backup of a file by copying it with a .bak extension and timestamp.
 */
export declare function createBackup(filePath: string): Promise<string | null>;
/**
 * Ensure a directory exists, creating it if necessary.
 */
export declare function ensureDir(dirPath: string): Promise<void>;
//# sourceMappingURL=utils.d.ts.map