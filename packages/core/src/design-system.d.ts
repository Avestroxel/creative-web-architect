import type { DesignSystem, TypographyScale } from './types.js';
export interface FluidTypeOptions {
    minSize: number;
    maxSize: number;
    minViewport?: number;
    maxViewport?: number;
    unit?: string;
}
/**
 * Generates a CSS clamp() formula for fluid typography or spacing.
 */
export declare function generateFluidClamp({ minSize, maxSize, minViewport, maxViewport, unit, }: FluidTypeOptions): string;
/**
 * Default standard modular typography scale conforming to TypographyScale type.
 */
export declare function getDefaultTypographyScale(fontFamilyDisplay?: string, fontFamilyBody?: string): TypographyScale;
/**
 * Builds a complete, compliant DesignSystem object for any style key.
 */
export declare function createDesignSystemForStyle(styleKey?: string): DesignSystem;
/**
 * Serializes a DesignSystem to ready-to-use CSS custom properties (:root {...}).
 */
export declare function exportToCSSVariables(designSystem: DesignSystem, theme?: 'dark' | 'light'): string;
//# sourceMappingURL=design-system.d.ts.map