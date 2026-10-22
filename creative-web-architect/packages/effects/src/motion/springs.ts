/**
 * Spring physics configurations and mathematical solvers.
 */
import type { SpringConfig, SpringPresetName } from './types.js';

export const SPRING_PRESETS: Record<SpringPresetName, SpringConfig> = {
  gentle: { stiffness: 120, damping: 14, mass: 1 },
  snappy: { stiffness: 300, damping: 25, mass: 0.8 },
  bouncy: { stiffness: 220, damping: 11, mass: 0.9 },
  cinematic: { stiffness: 80, damping: 18, mass: 1.2 },
  stiff: { stiffness: 450, damping: 32, mass: 0.5 },
};

/**
 * Calculates damped harmonic oscillation position at time t (seconds).
 */
export function calculateSpringPosition(
  t: number,
  initialPosition: number,
  targetPosition: number,
  config: SpringConfig = SPRING_PRESETS.snappy
): number {
  const { stiffness: k, damping: c, mass: m } = config;
  const delta = targetPosition - initialPosition;
  if (Math.abs(delta) < (config.precision || 0.001)) return targetPosition;

  // Damping ratio zeta
  const zeta = c / (2 * Math.sqrt(k * m));
  const omega0 = Math.sqrt(k / m);

  if (zeta < 1) {
    // Under-damped (oscillates)
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    const decay = Math.exp(-zeta * omega0 * t);
    const cosTerm = Math.cos(omegaD * t);
    const sinTerm = (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(omegaD * t);
    return targetPosition - delta * decay * (cosTerm + sinTerm);
  } else if (Math.abs(zeta - 1) < 0.001) {
    // Critically damped
    const decay = Math.exp(-omega0 * t);
    return targetPosition - delta * decay * (1 + omega0 * t);
  } else {
    // Over-damped
    const s1 = -omega0 * (zeta - Math.sqrt(zeta * zeta - 1));
    const s2 = -omega0 * (zeta + Math.sqrt(zeta * zeta - 1));
    const c1 = -s2 / (s1 - s2);
    const c2 = 1 - c1;
    return targetPosition - delta * (c1 * Math.exp(s1 * t) + c2 * Math.exp(s2 * t));
  }
}

/**
 * Converts spring config to an approximate CSS transition timing function string.
 */
export function springToCubicBezier(preset: SpringPresetName): string {
  switch (preset) {
    case 'bouncy':
      return 'cubic-bezier(0.34, 1.56, 0.64, 1)';
    case 'snappy':
      return 'cubic-bezier(0.2, 0.9, 0.3, 1)';
    case 'gentle':
      return 'cubic-bezier(0.25, 0.1, 0.25, 1)';
    case 'cinematic':
      return 'cubic-bezier(0.16, 1, 0.3, 1)';
    case 'stiff':
      return 'cubic-bezier(0.1, 0.9, 0.2, 1)';
  }
}
