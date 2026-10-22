/**
 * Configuration management for Creative Web Architect.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import type { CWAConfig } from './types.js';

const CONFIG_FILENAME = 'cwa.config.json';

/**
 * Default configuration values.
 */
export function getDefaultConfig(): CWAConfig {
  return {
    version: '0.1.0',
    mode: 'auto',
    skillsDir: './skills',
    performance: {
      lcpTarget: 2500,
      inpTarget: 200,
      clsTarget: 0.1,
      targetFPS: 60,
    },
    accessibility: {
      contrastRatio: 4.5,
      reducedMotionFallback: true,
      keyboardNavigation: true,
      screenReaderSupport: true,
      minTouchTarget: 44,
    },
  };
}

/**
 * Create a new configuration with optional overrides.
 */
export function createConfig(overrides: Partial<CWAConfig> = {}): CWAConfig {
  return mergeConfigs(getDefaultConfig(), overrides);
}

/**
 * Deep merge two configurations.
 */
export function mergeConfigs(base: CWAConfig, overrides: Partial<CWAConfig>): CWAConfig {
  const merged = { ...base };

  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) continue;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const baseValue = (merged as Record<string, unknown>)[key];
      if (typeof baseValue === 'object' && baseValue !== null && !Array.isArray(baseValue)) {
        (merged as Record<string, unknown>)[key] = { ...baseValue, ...value };
      } else {
        (merged as Record<string, unknown>)[key] = value;
      }
    } else {
      (merged as Record<string, unknown>)[key] = value;
    }
  }

  return merged;
}

/**
 * Load configuration from a file in the given directory.
 */
export async function loadConfig(projectDir: string): Promise<CWAConfig | null> {
  const configPath = join(resolve(projectDir), CONFIG_FILENAME);
  try {
    const raw = await readFile(configPath, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<CWAConfig>;
    return mergeConfigs(getDefaultConfig(), parsed);
  } catch {
    return null;
  }
}

/**
 * Save configuration to a file.
 */
export async function saveConfig(projectDir: string, config: CWAConfig): Promise<void> {
  const configPath = join(resolve(projectDir), CONFIG_FILENAME);
  await mkdir(dirname(configPath), { recursive: true });
  await writeFile(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
}
