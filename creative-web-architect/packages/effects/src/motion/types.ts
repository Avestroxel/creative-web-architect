/**
 * @cwa/effects — Motion & Animation Types
 */

export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
  precision?: number;
}

export type SpringPresetName = 'gentle' | 'snappy' | 'bouncy' | 'cinematic' | 'stiff';

export interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  easing?: string;
  glare?: boolean;
  maxGlare?: number;
  reverse?: boolean;
}

export interface MagneticOptions {
  radius?: number;
  strength?: number;
  ease?: number;
}

export interface ScrollProgressOptions {
  targetRef?: React.RefObject<HTMLElement>;
  offset?: [number, number]; // [start, end] in percentage or px
  clamp?: boolean;
}

export interface InViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}
