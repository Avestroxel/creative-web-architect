import type { CWAConfig } from './types.js';
/**
 * Default configuration values.
 */
export declare function getDefaultConfig(): CWAConfig;
/**
 * Create a new configuration with optional overrides.
 */
export declare function createConfig(overrides?: Partial<CWAConfig>): CWAConfig;
/**
 * Deep merge two configurations.
 */
export declare function mergeConfigs(base: CWAConfig, overrides: Partial<CWAConfig>): CWAConfig;
/**
 * Load configuration from a file in the given directory.
 */
export declare function loadConfig(projectDir: string): Promise<CWAConfig | null>;
/**
 * Save configuration to a file.
 */
export declare function saveConfig(projectDir: string, config: CWAConfig): Promise<void>;
//# sourceMappingURL=config.d.ts.map