/**
 * Shared types for Liquid Glass components.
 */

export type LiquidGlassVariant = 'light' | 'dark' | 'adaptive';
export type LiquidGlassLevel = 1 | 2 | 3;

export interface LiquidGlassBaseProps {
  /** Glass variant */
  variant?: LiquidGlassVariant;
  /** Rendering level: 1=CSS, 2=Enhanced, 3=Advanced */
  level?: LiquidGlassLevel;
  /** Custom tint color (CSS color value) */
  tint?: string;
  /** Surface opacity (0-1) */
  opacity?: number;
  /** Blur intensity in pixels */
  blur?: number;
  /** Border radius in pixels or CSS value */
  radius?: number | string;
  /** Border visibility */
  border?: boolean;
  /** Highlight intensity (0-1) */
  highlightIntensity?: number;
  /** Motion/animation intensity (0-1, 0 = no motion) */
  motionIntensity?: number;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}
