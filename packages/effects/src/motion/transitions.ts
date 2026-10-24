/**
 * Transition timing functions, curves, and stagger utilities.
 */

export const EASING = {
  // Apple style springs
  snappy: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
  gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  bouncy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
  smoothOut: 'cubic-bezier(0, 0, 0.2, 1)',
  smoothIn: 'cubic-bezier(0.4, 0, 1, 1)',
} as const;

/**
 * Generates an inline style or delay for staggered children.
 */
export function getStaggerDelay(index: number, baseDelayMs: number = 60): number {
  return index * baseDelayMs;
}

/**
 * Generates standard CSS transition string with configurable properties.
 */
export function createTransition(
  properties: string[] = ['all'],
  durationMs: number = 300,
  easing: string = EASING.snappy
): string {
  return properties.map((prop) => `${prop} ${durationMs}ms ${easing}`).join(', ');
}
