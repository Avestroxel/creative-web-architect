/**
 * Core type definitions for Creative Web Architect.
 */
/** Agent operating modes */
export type DesignMode = 'auto' | 'guided' | 'experimental' | 'performance' | 'immersive' | 'redesign' | 'liquid-glass' | 'design-system' | 'component' | 'audit';
/** Design style categories */
export type DesignStyleCategory = 'minimal-structured' | 'expressive-experimental' | 'premium-cinematic' | 'futuristic-technological' | 'organic-human';
/** Individual design style identifiers */
export type DesignStyle = 'swiss-international' | 'contemporary-minimalism' | 'japanese-minimalism' | 'scandinavian-design' | 'editorial-minimalism' | 'architectural-minimalism' | 'monochrome-design' | 'geometric-modernism' | 'neo-brutalism' | 'digital-brutalism' | 'maximalism' | 'experimental-editorial' | 'anti-design' | 'postmodernism' | 'memphis-design' | 'expressive-typography' | 'generative-design' | 'interactive-art-direction' | 'luxury-editorial' | 'cinematic-product' | 'dark-luxury' | 'fashion-editorial' | 'art-deco' | 'minimal-luxury' | 'automotive-showcase' | 'premium-product-storytelling' | 'spatial-ui' | 'futuristic-interfaces' | 'cyberpunk' | 'retro-futurism' | 'y2k' | 'immersive-webgl' | 'holographic-interfaces' | 'generative-shader' | 'glassmorphism' | 'liquid-glass' | 'advanced-material' | 'organic-modernism' | 'nature-inspired' | 'warm-editorial' | 'handcrafted-design' | 'playful-illustration' | 'soft-geometric' | 'tactile-interfaces';
/** Skill metadata parsed from SKILL.md frontmatter */
export interface SkillMetadata {
    name: string;
    description: string;
    version?: string;
    author?: string;
    tags?: string[];
    activationKeywords?: string[];
    dependencies?: string[];
}
/** A discovered skill with its metadata and file path */
export interface Skill {
    /** Unique skill identifier (directory name) */
    id: string;
    /** Parsed frontmatter metadata */
    metadata: SkillMetadata;
    /** Absolute path to the skill directory */
    path: string;
    /** Absolute path to SKILL.md */
    skillFilePath: string;
    /** Full markdown content of SKILL.md (loaded on demand) */
    content?: string;
}
/** Project brief parsed from user input */
export interface ProjectBrief {
    /** Raw user input */
    rawInput: string;
    /** Detected website category */
    category?: string;
    /** Detected brand personality keywords */
    personality?: string[];
    /** Detected design style preferences */
    styleHints?: string[];
    /** Detected technology preferences */
    techHints?: string[];
    /** Detected operating mode */
    mode?: DesignMode;
    /** Detected audience */
    audience?: string;
    /** Detected content requirements */
    contentRequirements?: string[];
}
/** Creative direction decision */
export interface CreativeDirection {
    /** Primary design style */
    primaryStyle: DesignStyle;
    /** Secondary/accent style influence */
    secondaryStyle?: DesignStyle;
    /** Color strategy description */
    colorStrategy: string;
    /** Typography approach */
    typographyApproach: string;
    /** Layout philosophy */
    layoutPhilosophy: string;
    /** Motion personality (calm, energetic, cinematic, minimal) */
    motionPersonality: 'calm' | 'energetic' | 'cinematic' | 'minimal';
    /** Whether to use 3D elements */
    use3D: boolean;
    /** Whether to use Liquid Glass effects */
    useLiquidGlass: boolean;
    /** Overall mood description */
    mood: string;
    /** Rationale for decisions */
    rationale: string;
}
/** Color palette definition */
export interface ColorPalette {
    primary: string;
    primaryLight?: string;
    primaryDark?: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceElevated?: string;
    text: string;
    textSecondary: string;
    textInverted?: string;
    border: string;
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
}
/** Typography scale definition */
export interface TypographyScale {
    fontFamilyDisplay: string;
    fontFamilyBody: string;
    fontFamilyMono?: string;
    /** Fluid font size scale using clamp() */
    sizes: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
        '6xl'?: string;
        '7xl'?: string;
    };
    lineHeights: {
        tight: string;
        base: string;
        relaxed: string;
    };
    fontWeights: {
        light?: number;
        regular: number;
        medium: number;
        semibold?: number;
        bold: number;
        black?: number;
    };
}
/** Design token definition */
export interface DesignToken {
    name: string;
    value: string;
    type: 'color' | 'spacing' | 'typography' | 'radius' | 'shadow' | 'motion' | 'surface' | 'breakpoint';
    description?: string;
}
/** Motion configuration */
export interface MotionConfig {
    /** Default animation duration in ms */
    durationFast: number;
    durationBase: number;
    durationSlow: number;
    /** Easing curves */
    easeDefault: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    easeSpring?: string;
    /** Whether to enable scroll-linked animations */
    enableScrollAnimations: boolean;
    /** Whether to enable parallax */
    enableParallax: boolean;
    /** Whether to use GSAP */
    useGSAP: boolean;
}
/** Liquid Glass configuration */
export interface LiquidGlassConfig {
    /** Rendering level: 1=CSS, 2=Enhanced, 3=Advanced */
    level: 1 | 2 | 3;
    /** Default blur intensity in px */
    blurIntensity: number;
    /** Default surface opacity */
    surfaceOpacity: number;
    /** Default tint color */
    tintColor: string;
    /** Whether to enable animated highlights */
    animatedHighlights: boolean;
    /** Whether to enable pointer-responsive effects */
    pointerResponsive: boolean;
    /** Whether to provide reduced-transparency fallback */
    reducedTransparencyFallback: boolean;
}
/** Performance targets */
export interface PerformanceTargets {
    /** Largest Contentful Paint target in ms */
    lcpTarget: number;
    /** Interaction to Next Paint target in ms */
    inpTarget: number;
    /** Cumulative Layout Shift target */
    clsTarget: number;
    /** Target frame rate */
    targetFPS: number;
    /** Max bundle size in KB */
    maxBundleSize?: number;
}
/** Accessibility configuration */
export interface AccessibilityConfig {
    /** Minimum contrast ratio (AA=4.5, AAA=7) */
    contrastRatio: number;
    /** Whether to enforce reduced-motion fallbacks */
    reducedMotionFallback: boolean;
    /** Whether to enforce keyboard navigation */
    keyboardNavigation: boolean;
    /** Whether to enforce screen reader support */
    screenReaderSupport: boolean;
    /** Minimum touch target size in px */
    minTouchTarget: number;
}
/** Complete design system definition */
export interface DesignSystem {
    name: string;
    version: string;
    colors: {
        light: ColorPalette;
        dark: ColorPalette;
    };
    typography: TypographyScale;
    spacing: Record<string, string>;
    radii: Record<string, string>;
    shadows: Record<string, string>;
    breakpoints: Record<string, string>;
    motion: MotionConfig;
    liquidGlass?: LiquidGlassConfig;
    tokens: DesignToken[];
}
/** Detected AI agent environment */
export interface AgentEnvironment {
    name: string;
    slug: 'claude-code' | 'cursor' | 'gemini-cli' | 'github-copilot' | 'antigravity' | 'unknown';
    /** Path to the environment's skill/config directory */
    configPath?: string;
    /** Supported skill format */
    skillFormat: 'agent-skills' | 'rules' | 'custom';
    /** Whether the environment is detected as present */
    detected: boolean;
}
/** Full project configuration */
export interface CWAConfig {
    version: string;
    mode: DesignMode;
    skillsDir: string;
    outputDir?: string;
    designSystem?: Partial<DesignSystem>;
    performance: PerformanceTargets;
    accessibility: AccessibilityConfig;
    liquidGlass?: LiquidGlassConfig;
    motion?: Partial<MotionConfig>;
    /** Environments to target for skill installation */
    targetEnvironments?: AgentEnvironment['slug'][];
}
//# sourceMappingURL=types.d.ts.map