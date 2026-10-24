/**
 * Constants for design modes, styles, and style categories.
 */
import type { DesignMode, DesignStyle, DesignStyleCategory } from './types.js';
/** All supported design modes with descriptions */
export declare const DESIGN_MODES: Record<DesignMode, string>;
/** Design style categories with their member styles */
export declare const STYLE_CATEGORIES: Record<DesignStyleCategory, {
    label: string;
    description: string;
    styles: DesignStyle[];
}>;
/** Flat map of all design styles with descriptions */
export declare const DESIGN_STYLES: Record<DesignStyle, {
    label: string;
    description: string;
    category: DesignStyleCategory;
}>;
//# sourceMappingURL=constants.d.ts.map