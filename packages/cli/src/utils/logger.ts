/**
 * Logging utilities with colored output and log levels.
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  SUCCESS = 'success',
  WARN = 'warn',
  ERROR = 'error',
}

const COLORS: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: '\x1b[90m',   // gray
  [LogLevel.INFO]: '\x1b[36m',    // cyan
  [LogLevel.SUCCESS]: '\x1b[32m', // green
  [LogLevel.WARN]: '\x1b[33m',    // yellow
  [LogLevel.ERROR]: '\x1b[31m',   // red
};

const ICONS: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: '·',
  [LogLevel.INFO]: '◆',
  [LogLevel.SUCCESS]: '✔',
  [LogLevel.WARN]: '⚠',
  [LogLevel.ERROR]: '✖',
};

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

export const color = {
  cyan: (s: string) => `\x1b[36m${s}${RESET}`,
  green: (s: string) => `\x1b[32m${s}${RESET}`,
  yellow: (s: string) => `\x1b[33m${s}${RESET}`,
  red: (s: string) => `\x1b[31m${s}${RESET}`,
  dim: (s: string) => `\x1b[90m${s}${RESET}`,
};

export const style = {
  bold: (s: string) => `${BOLD}${s}${RESET}`,
};

/**
 * Log a message with a level-appropriate icon and color.
 */
export function log(level: LogLevel, message: string): void {
  const color = COLORS[level];
  const icon = ICONS[level];
  const stream = level === LogLevel.ERROR ? process.stderr : process.stdout;
  stream.write(`${color}${icon}${RESET} ${message}\n`);
}

/**
 * Log a header/title message.
 */
export function logHeader(message: string): void {
  process.stdout.write(`\n${BOLD}${message}${RESET}\n\n`);
}

/**
 * Log a key-value pair.
 */
export function logPair(key: string, value: string): void {
  process.stdout.write(`  ${COLORS[LogLevel.INFO]}${key}${RESET}: ${value}\n`);
}

/**
 * Log a blank line.
 */
export function logBlank(): void {
  process.stdout.write('\n');
}
