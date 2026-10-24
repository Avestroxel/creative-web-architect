/**
 * Archetype Matrix & Intelligent Technique Decision Engine.
 *
 * Automatically analyzes user prompts and project briefs to:
 * 1. Classify the design domain into one of 10 signature creative archetypes.
 * 2. Select the optimal, synergistic combination of 2 to 4 learned techniques.
 * 3. Prescribe typography, color palettes, motion profiles, and execution phases.
 * 4. Guarantee zero visual conflict, zero generic AI defaults, and zero cheap neon glow.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

export type DesignArchetypeId =
  | 'studio-engineering'
  | 'auteur-cinematic'
  | 'high-speed-sport'
  | 'physical-product-3d'
  | 'biological-organic-3d'
  | 'aerospace-geospatial'
  | 'tactile-hardware-audio'
  | 'modular-bento-slate'
  | 'japanese-meditative-void'
  | 'street-luxe-brutalism';

export interface ArchetypeDefinition {
  id: DesignArchetypeId;
  name: string;
  tagline: string;
  description: string;
  keywords: string[];
  primaryTechniqueIds: string[];
  supportingTechniqueIds: string[];
  recommendedSkills: string[];
  palette: {
    background: string;
    surface: string;
    surfaceAlt: string;
    ink: string;
    line: string;
    accent: string;
    accentHover: string;
    textMuted: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    monoFont: string;
    styleRationale: string;
  };
  executionPhases: string[];
}

export interface ArchetypeRecommendation {
  archetype: ArchetypeDefinition;
  score: number;
  confidence: 'high' | 'medium' | 'default';
  selectedTechniqueIds: string[];
  recommendedSkills: string[];
  designDirectives: {
    palette: ArchetypeDefinition['palette'];
    typography: ArchetypeDefinition['typography'];
    executionPhases: string[];
    antiPatternsToAvoid: string[];
  };
}

export const ARCHETYPE_DEFINITIONS: Record<DesignArchetypeId, ArchetypeDefinition> = {
  'studio-engineering': {
    id: 'studio-engineering',
    name: 'Creative Design & Engineering Studio',
    tagline: 'Refined surfaces, liquid dual-image cursor reveals, and quiet craft.',
    description: 'High-end design & engineering studios crafting digital products, brand systems, and web architectures with quiet confidence and tactile cursor feedback.',
    keywords: [
      'studio', 'agency', 'creative studio', 'engineering studio', 'design studio',
      'digital products', 'brand systems', 'lumora', 'conversion', 'craft',
      'portfolio', 'web design', 'independent studio', 'let\'s talk', 'selected work'
    ],
    primaryTechniqueIds: [
      'dual-image-liquid-cursor-brush-reveal',
      'damped-magnetic-cursor-follow-physics',
      'tactile-button-physics-and-micro-kinematics'
    ],
    supportingTechniqueIds: [
      'scroll-driven-character-opacity-wave',
      'conversational-action-triage-and-optical-blur'
    ],
    recommendedSkills: [
      'creative-direction',
      'hover-interaction-design',
      'premium-button-interactions',
      'advanced-scroll-animation',
      'layout-composition'
    ],
    palette: {
      background: '#ffffff',
      surface: '#f1f0ee',
      surfaceAlt: '#e3e2df',
      ink: '#0a0a0a',
      line: '#e6e5e2',
      accent: '#b15f2c',
      accentHover: '#cf8047',
      textMuted: '#8d8d8d'
    },
    typography: {
      headingFont: "'Onest', -apple-system, sans-serif",
      bodyFont: "'Onest', -apple-system, sans-serif",
      monoFont: "'JetBrains Mono', monospace",
      styleRationale: 'Proportional geometric sans with warm humanist curves, paired with rem-based adaptive scaling.'
    },
    executionPhases: [
      '1. Implement rem-based adaptive grid (vw base media queries + scale-up formula above 1920px).',
      '2. Mount full-screen dark 3-digit intro loader (000→100 easeInOutCubic) gating scroll and entrance animations.',
      '3. Assemble full-bleed dual-image canvas LiquidReveal with offscreen radial brush and destination-out decay.',
      '4. Build line-by-line heading reveals and word-by-word statement reveals via IntersectionObserver.',
      '5. Add tactile button interactions (curved wave / opposing arrow) and scroll count-up telemetry.'
    ]
  },

  'auteur-cinematic': {
    id: 'auteur-cinematic',
    name: 'Auteur Cinema & Archival Editorial',
    tagline: '35mm film discipline, Swiss typographic restraint, and quiet luxury.',
    description: 'Inspired by independent cinema monographs, archival art exhibitions, and museum catalogues. Prioritizes extreme typography scale contrasts, grain textures, and zero-flicker polygonal clip-paths.',
    keywords: [
      'cinema', 'film', 'auteur', 'editorial', '35mm', 'archival', 'monograph',
      'cinematography', 'director', 'screenplay', 'scene', 'exhibition', 'museum', 'monochrome'
    ],
    primaryTechniqueIds: [
      'mission-architectural-philosophy',
      'masked-video-clip-path-reveals',
      'inertia-horizontal-film-pan',
      'kinetic-roman-numeral-chapter-navigation'
    ],
    supportingTechniqueIds: [
      'scroll-driven-character-opacity-wave',
      'damped-magnetic-cursor-follow-physics'
    ],
    recommendedSkills: [
      'creative-direction',
      'typography',
      'advanced-scroll-animation',
      'cinematic-motion',
      'premium-visual-direction'
    ],
    palette: {
      background: '#060709',
      surface: '#0d0f14',
      surfaceAlt: '#141820',
      ink: '#F4EFEA',
      line: 'rgba(244, 239, 234, 0.12)',
      accent: '#D4AF37',
      accentHover: '#E5C158',
      textMuted: '#8A8D93'
    },
    typography: {
      headingFont: "'Playfair Display', 'Cinzel', Georgia, serif",
      bodyFont: "'Inter', system-ui, sans-serif",
      monoFont: "'Courier Prime', monospace",
      styleRationale: 'High-contrast editorial serif paired with a technical neutral grotesque for cinematic titles.'
    },
    executionPhases: [
      '1. Establish deep obsidian #060709 base and 35mm grain overlay with pointer-events: none.',
      '2. Build kinetic Roman numeral chapter navigation markers with letter-by-letter stagger.',
      '3. Engineer polygonal clip-path portrait-to-landscape video reveals driven by scroll timelines.',
      '4. Implement friction-free horizontal timeline strip using CSS subgrid and translate3d transforms.',
      '5. Apply magnetic floating index pill with spring damping.'
    ]
  },

  'high-speed-sport': {
    id: 'high-speed-sport',
    name: 'High-Performance Motorsport & Racing',
    tagline: 'Curvature-dilated racing lines, packed-delta halftones, and raw aerodynamic velocity.',
    description: 'Aesthetic architecture designed for Formula racing, endurance motorsport, and aerodynamic telemetry. Features physical speed modulation, 8,000-dot halftone matrices, and chequered flag dissolves.',
    keywords: [
      'racing', 'f1', 'formula', 'motorsport', 'speed', 'circuit', 'lap',
      'telemetry', 'antonelli', 'kimi', 'grid', 'driver', 'aerodynamic', 'velocity'
    ],
    primaryTechniqueIds: [
      'curvature-time-dilated-circuit-trace',
      'packed-delta-lattice-halftone-matrix',
      'sticky-stacking-card-deck-scale-decay',
      'depth-parallax-normal-relighting-burn'
    ],
    supportingTechniqueIds: [
      'tactile-button-physics-and-micro-kinematics',
      'twofour-seven-artists-sonic-telemetry'
    ],
    recommendedSkills: [
      'advanced-scroll-animation',
      'performance-profiling',
      'three-dimensional-web',
      'motion-design',
      'animation-performance'
    ],
    palette: {
      background: '#07080a',
      surface: '#0f1115',
      surfaceAlt: '#161920',
      ink: '#ffffff',
      line: 'rgba(255, 255, 255, 0.1)',
      accent: '#e10600',
      accentHover: '#ff2a24',
      textMuted: '#6b7280'
    },
    typography: {
      headingFont: "'Formula1', 'Space Grotesk', -apple-system, sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'JetBrains Mono', monospace",
      styleRationale: 'Wide, technical grotesque font with bold numerical metrics and racing-grade telemetry.'
    },
    executionPhases: [
      '1. Bake 8,000+ dot halftone matrix offscreen with delta compression and cursor reticle squaring.',
      '2. Render 2D/3D polyline racing circuit with curvature-based braking into corners and straightaway acceleration.',
      '3. Assemble sticky stacking project cards that recede in scale (0.9) and darken (0.55 black shade) on scroll.',
      '4. Attach normal-relit driver helmet or vehicle quads reacting to cursor coordinates.',
      '5. Add telemetry clock and lap timer chips with tabular figures.'
    ]
  },

  'physical-product-3d': {
    id: 'physical-product-3d',
    name: '3D Physical Product & Spatial E-Commerce',
    tagline: 'Interactive 3D model orbit, pointer forcefield repulsion, and shader-warmed texture swaps.',
    description: 'Full-viewport 3D showcases for beverages, high-end consumer hardware, and packaging. Direct cursor orbit tilting coupled with surrounding dynamic item repulsion.',
    keywords: [
      'beverage', 'drink', 'soda', 'can', 'bottle', 'product 3d', 'packaging',
      'flavor', 'model-viewer', '3d model', 'liquid', 'refreshment', 'consumer product'
    ],
    primaryTechniqueIds: [
      'model-viewer-cursor-tilt-and-forcefield-repulsion',
      'shader-warmed-texture-swap-and-entity-implosion',
      'three-tier-depth-layered-parallax-staging'
    ],
    supportingTechniqueIds: [
      'tactile-button-physics-and-micro-kinematics',
      'damped-magnetic-cursor-follow-physics'
    ],
    recommendedSkills: [
      'three-dimensional-web',
      'hover-interaction-design',
      'layout-composition',
      'cinematic-product-pages',
      'shaders-and-effects'
    ],
    palette: {
      background: '#041618',
      surface: '#082528',
      surfaceAlt: '#0c363b',
      ink: '#ffffff',
      line: 'rgba(255, 255, 255, 0.15)',
      accent: '#00e5ff',
      accentHover: '#5df2ff',
      textMuted: '#799c9f'
    },
    typography: {
      headingFont: "'Syne', 'Plus Jakarta Sans', sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'Space Mono', monospace",
      styleRationale: 'Sculptural, energetic display type paired with crisp body typography for consumer delight.'
    },
    executionPhases: [
      '1. Embed Google <model-viewer> or Three.js central product canvas with exponential smoothing cursor orbit.',
      '2. Implement 400px pointer repulsion forcefield that pushes floating background/foreground items away.',
      '3. Pre-warm GPU shaders on load to ensure zero-stutter flavor/color texture swapping.',
      '4. Add three-tier depth sandwich (background berries, central model, foreground floating assets).',
      '5. Implement procedural rising bubble or dust particle stream with self-cleaning lifecycle.'
    ]
  },

  'biological-organic-3d': {
    id: 'biological-organic-3d',
    name: '3D Biological Diorama & Organic Artistry',
    tagline: 'Scroll-driven flight paths, luminance-alpha wing fluttering, and botanical parallax.',
    description: 'Immersive nature and biological showcases featuring photorealistic 3D insects or creatures traversing 3D flight paths with Euler banking and multidirectional floral diorama layers.',
    keywords: [
      'nature', 'botanical', 'bee', 'honeybee', 'flora', 'flower', 'organic',
      'wings', 'flight', 'flutter', 'artistry', 'entomology', 'diorama', 'melli'
    ],
    primaryTechniqueIds: [
      'scroll-driven-3d-gltf-flight-path-kinematics',
      'procedural-multi-layer-alpha-threshold-wing-flutter',
      'scroll-synchronized-multidirectional-flora-parallax'
    ],
    supportingTechniqueIds: [
      'scroll-driven-character-opacity-wave',
      'damped-magnetic-cursor-follow-physics'
    ],
    recommendedSkills: [
      'three-dimensional-web',
      'advanced-scroll-animation',
      'motion-design',
      'cinematic-motion'
    ],
    palette: {
      background: '#FAF7F2',
      surface: '#F2ECE1',
      surfaceAlt: '#E8DEC9',
      ink: '#1D1B18',
      line: 'rgba(29, 27, 24, 0.12)',
      accent: '#D97706',
      accentHover: '#B45309',
      textMuted: '#78716C'
    },
    typography: {
      headingFont: "'Poppins', 'Outfit', sans-serif",
      bodyFont: "'Poppins', sans-serif",
      monoFont: "'DM Mono', monospace",
      styleRationale: 'Friendly geometric curves with organic warmth and high legibility across botanical imagery.'
    },
    executionPhases: [
      '1. Load GLTF biological model into Three.js with hold-and-dive scroll keyframes and velocity banking.',
      '2. Synthesize procedural luminance-alpha wings with triple-phase offset ghosting for motion blur.',
      '3. Build multidirectional botanical diorama layers with independent vertical speed and stem rotation.',
      '4. Sample active viewport probes to seamlessly toggle dark/light theme on fixed UI chrome.',
      '5. Add smooth Lenis scrolling with zero page jumping.'
    ]
  },

  'aerospace-geospatial': {
    id: 'aerospace-geospatial',
    name: 'Aerospace, Geospatial Telemetry & HUD',
    tagline: 'Orthographic 3D Earth projections, Great-Circle math, and aerospace control surfaces.',
    description: 'Rigorous visual architecture for geospatial platforms, aerospace missions, and scientific telemetry. Features Great-Circle wireframe spheres, matrix3d panel docking, and mineral textures.',
    keywords: [
      'geospatial', 'satellite', 'earth', 'coordinates', 'hud', 'aerospace',
      'telemetry', 'alethia', 'oscs', 'mission control', 'globe', 'orthographic'
    ],
    primaryTechniqueIds: [
      'alethia-geospatial-telemetry',
      'alethia-stratigraphic-materiality',
      'oscs-spatial-control-surface'
    ],
    supportingTechniqueIds: [
      'twofour-seven-artists-sonic-telemetry',
      'packed-delta-lattice-halftone-matrix'
    ],
    recommendedSkills: [
      'dashboard-design',
      'three-dimensional-web',
      'premium-visual-direction',
      'performance-profiling'
    ],
    palette: {
      background: '#090A0F',
      surface: '#11131C',
      surfaceAlt: '#1A1E2C',
      ink: '#F0F3F9',
      line: 'rgba(240, 243, 249, 0.14)',
      accent: '#38BDF8',
      accentHover: '#7DD3FC',
      textMuted: '#64748B'
    },
    typography: {
      headingFont: "'Space Grotesk', -apple-system, sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'JetBrains Mono', monospace",
      styleRationale: 'Strict monospaced tabular telemetry numbers and engineered geometric grotesques.'
    },
    executionPhases: [
      '1. Render orthographic 3D wireframe Earth with Great-Circle trigonometric arcs and solar terminator.',
      '2. Build magnetic floating telemetry panels with matrix3d spatial camera transformations.',
      '3. Incorporate stratigraphic mineral materiality (basalt, raw terracotta) rather than plastic glossy cards.',
      '4. Display live GPS latitude/longitude and elevation counters with zero layout shift.',
      '5. Enforce strict No-Glow policy: precise 0.5px hairline grid reticles instead of blurry neon blooms.'
    ]
  },

  'tactile-hardware-audio': {
    id: 'tactile-hardware-audio',
    name: 'Industrial Hardware & Analog Audio Consoles',
    tagline: 'Rotary potentiometers, analog VU meters, and brushed aluminum materiality.',
    description: 'Derived from analog recording consoles and industrial audio equipment. Features authentic rotary dials with knurled metal texture, zero-latency audio scrubbers, and world-clock status badges.',
    keywords: [
      'audio', 'sound', 'synthesizer', 'music', 'studio', 'rotary', 'knob',
      'potentiometer', 'vu meter', 'console', 'hardware', 'vinyl', 'recording', '247'
    ],
    primaryTechniqueIds: [
      'twofour-seven-artists-sonic-telemetry',
      'ricardo-isometric-mechanical-console',
      'tactile-button-physics-and-micro-kinematics'
    ],
    supportingTechniqueIds: [
      'queue-gated-mouse-scrub-video-kinematics',
      'tile-tactile-tessellation-system'
    ],
    recommendedSkills: [
      'motion-design',
      'three-dimensional-web',
      'premium-button-interactions',
      'dashboard-design'
    ],
    palette: {
      background: '#121214',
      surface: '#1a1a1e',
      surfaceAlt: '#24242a',
      ink: '#ffffff',
      line: 'rgba(255, 255, 255, 0.12)',
      accent: '#f59e0b',
      accentHover: '#fbbf24',
      textMuted: '#71717a'
    },
    typography: {
      headingFont: "'Cabinet Grotesk', 'Space Grotesk', sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'Share Tech Mono', monospace",
      styleRationale: 'Industrial hardware typeface with technical mechanical stamp.'
    },
    executionPhases: [
      '1. Implement pure CSS 3D isometric console diorama (rotateX 60deg, rotateZ -45deg).',
      '2. Assemble rotary potentiometer knobs with knurled metal borders, detents, and cursor drag tracking.',
      '3. Build analog needle decibel VU meter driven by Web Audio API or procedural sinusoids.',
      '4. Add inline zero-latency audio waveform scrubbers with canvas rendering.',
      '5. Implement tactile mechanical button plates with active physical depression (translateY 3px).'
    ]
  },

  'modular-bento-slate': {
    id: 'modular-bento-slate',
    name: 'Architectural Bento & Honed Slate Tessellation',
    tagline: 'Precision 1px grout hairlines, micro-beveled inner shadows, and modular proportion.',
    description: 'Architectural grid frameworks derived from ceramic tile tessellation, honed slate materiality, and precision grout hairlines. Prioritizes interlocking proportional modules (1:1, 1:2, 2:1, 2:2).',
    keywords: [
      'bento', 'modular', 'tessellation', 'slate', 'grout', 'saas', 'dashboard',
      'productivity', 'tile', 'linear', 'raycast', 'honed'
    ],
    primaryTechniqueIds: [
      'tile-tactile-tessellation-system',
      'conversational-action-triage-and-optical-blur',
      'tactile-button-physics-and-micro-kinematics'
    ],
    supportingTechniqueIds: [
      'sticky-stacking-card-deck-scale-decay',
      'scroll-driven-character-opacity-wave'
    ],
    recommendedSkills: [
      'layout-composition',
      'dashboard-design',
      'premium-button-interactions',
      'design-system'
    ],
    palette: {
      background: '#0e0f12',
      surface: '#15161c',
      surfaceAlt: '#1c1e26',
      ink: '#f3f4f6',
      line: 'rgba(255, 255, 255, 0.08)',
      accent: '#6366f1',
      accentHover: '#818cf8',
      textMuted: '#9ca3af'
    },
    typography: {
      headingFont: "'Inter Display', 'Plus Jakarta Sans', sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'JetBrains Mono', monospace",
      styleRationale: 'Strict Swiss corporate hierarchy with ultra-clean legibility and dense information hierarchy.'
    },
    executionPhases: [
      '1. Build structural CSS grid container with 1px gap hairlines simulating ceramic tile grout.',
      '2. Apply micro-beveled slate inner shadows (box-shadow: inset 0 1px 0 rgba(255,255,255,0.08)).',
      '3. Assemble conversational action pill clusters with 1-click clipboard feedback.',
      '4. Add optical depth-of-field blur (filter: blur(4px)) on secondary ambient background copy.',
      '5. Implement physical tactile click depression on all bento tiles and interactive cards.'
    ]
  },

  'japanese-meditative-void': {
    id: 'japanese-meditative-void',
    name: 'Japanese Sumi Ink, Urushi & Ma Spacing',
    tagline: 'Deep Urushi lacquer black, Kinpaku gold leaf, and meditative Ma negative space.',
    description: 'Inspired by Tanizaki\'s "In Praise of Shadows" (In-ei Raisan). Celebrates dark surfaces, gold reflections, spacious negative space (at least 45% void), and organic fluid Sumi-e ink dispersion.',
    keywords: [
      'japanese', 'sumi', 'ink', 'lacquer', 'urushi', 'kinpaku', 'gold',
      'zen', 'minimal', 'ma', 'craft', 'meditative', 'ceremony', 'tea', 'izanami'
    ],
    primaryTechniqueIds: [
      'izanami-shadow-and-ink',
      'mission-architectural-philosophy',
      'scroll-driven-character-opacity-wave'
    ],
    supportingTechniqueIds: [
      'damped-magnetic-cursor-follow-physics',
      'tactile-button-physics-and-micro-kinematics'
    ],
    recommendedSkills: [
      'layout-composition',
      'creative-storytelling',
      'typography',
      'premium-visual-direction'
    ],
    palette: {
      background: '#060709',
      surface: '#0b0c10',
      surfaceAlt: '#12141a',
      ink: '#E8E6E1',
      line: 'rgba(197, 160, 89, 0.2)',
      accent: '#C5A059',
      accentHover: '#D4B36D',
      textMuted: '#787570'
    },
    typography: {
      headingFont: "'Shippori Mincho', 'Noto Serif JP', serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'DM Mono', monospace",
      styleRationale: 'Calligraphic Japanese serif letterforms with wide letter-spacing and meditative breath.'
    },
    executionPhases: [
      '1. Guarantee at least 45% Ma negative void across all screen sections.',
      '2. Apply deep Urushi lacquer black (#060709) and restrained Kinpaku gold (#C5A059) accents.',
      '3. Implement organic Sumi fluid ink displacement using SVG feTurbulence and feDisplacementMap.',
      '4. Add progressive character opacity wave reveals on scroll.',
      '5. Never use loud animations; enforce slow, dignified cubic-bezier(0.16, 1, 0.3, 1) transitions.'
    ]
  },

  'street-luxe-brutalism': {
    id: 'street-luxe-brutalism',
    name: 'Street-Luxe & Neo-Brutalism',
    tagline: 'Asphalt noir, draggable holographic stickers, and industrial gaffer tape stencils.',
    description: 'Raw street-luxe visual architecture fusing underground culture with high-fashion editorial discipline. Features physics-based draggable holographic stickers, asphalt textures, and gaffer tape clip-paths.',
    keywords: [
      'street', 'streetwear', 'brutalist', 'neo-brutalism', 'fashion', 'underground',
      'stickers', 'holographic', 'meech', 'gaffer tape', 'stencil', 'graffiti', 'raw'
    ],
    primaryTechniqueIds: [
      'meech-street-luxe-neo-brutalism',
      'typolove-kinetic-variable-typography-and-specimen-craft',
      'romanelli-kinetic-viewport-and-inertial-distortion'
    ],
    supportingTechniqueIds: [
      'tactile-button-physics-and-micro-kinematics',
      'dual-row-scroll-coupled-marquee-kinematics'
    ],
    recommendedSkills: [
      'premium-visual-direction',
      'typography',
      'page-transitions',
      'hover-interaction-design'
    ],
    palette: {
      background: '#0d0d0d',
      surface: '#171717',
      surfaceAlt: '#212121',
      ink: '#ffffff',
      line: 'rgba(255, 255, 255, 0.2)',
      accent: '#E6FB04',
      accentHover: '#F4FF52',
      textMuted: '#888888'
    },
    typography: {
      headingFont: "'Druk Wide', 'Syne', -apple-system, sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'Space Mono', monospace",
      styleRationale: 'Super-extended brutalist type with heavy weight, stark kerning, and raw stencil accents.'
    },
    executionPhases: [
      '1. Implement asphalt noir background with raw flash-photography contrast.',
      '2. Build physics-based draggable holographic sticker artifacts with inertial coasting and rotation.',
      '3. Assemble industrial gaffer tape stencil clip-path masks on imagery.',
      '4. Add variable font cursor-proximity weight waves across headings.',
      '5. Implement counter-directional scroll-coupled marquee strips.'
    ]
  }
};

/**
 * Classifies any user prompt into the most appropriate creative archetype
 * and recommends the exact complementary set of techniques, skills, and tokens.
 */
export function classifyPromptArchetype(prompt: string): ArchetypeRecommendation {
  const lower = prompt.toLowerCase();
  let bestArchetype: ArchetypeDefinition = ARCHETYPE_DEFINITIONS['studio-engineering'];
  let highestScore = 0;

  for (const archetype of Object.values(ARCHETYPE_DEFINITIONS)) {
    let score = 0;
    for (const kw of archetype.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        // Multi-word matches score higher
        score += kw.includes(' ') ? 3 : 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestArchetype = archetype;
    }
  }

  const confidence: ArchetypeRecommendation['confidence'] =
    highestScore >= 5 ? 'high' : highestScore >= 2 ? 'medium' : 'default';

  // Combine 2-3 primary techniques with 1 supporting technique for a balanced 3-4 technique suite
  const selectedTechniqueIds = [
    ...bestArchetype.primaryTechniqueIds.slice(0, 3),
    ...bestArchetype.supportingTechniqueIds.slice(0, 1)
  ];

  return {
    archetype: bestArchetype,
    score: highestScore,
    confidence,
    selectedTechniqueIds,
    recommendedSkills: bestArchetype.recommendedSkills,
    designDirectives: {
      palette: bestArchetype.palette,
      typography: bestArchetype.typography,
      executionPhases: bestArchetype.executionPhases,
      antiPatternsToAvoid: [
        'Do NOT use radioactive purple neon glows, blurry card blooms, or rainbow cyber gradients.',
        'Do NOT clutter the viewport with competing animations simultaneously; use entrance gating.',
        'Do NOT hijack native scroll without momentum easing (prefer Lenis or native timelines).',
        'Do NOT omit prefers-reduced-motion: reduce accessibility fallbacks.'
      ]
    }
  };
}

/**
 * Validates that a proposed set of techniques are complementary and do not conflict.
 */
export function validateTechniqueSynergy(techniqueIds: string[]): {
  isCompatible: boolean;
  conflicts: string[];
} {
  const conflicts: string[] = [];

  // Check for competing horizontal scroll hijackers
  if (
    techniqueIds.includes('inertia-horizontal-film-pan') &&
    techniqueIds.includes('dual-row-scroll-coupled-marquee-kinematics')
  ) {
    conflicts.push('Conflicting horizontal scroll mechanisms detected. Pick either Film Pan or Dual Marquee.');
  }

  // Check for competing heavy 3D scene loops
  if (
    techniqueIds.includes('scroll-driven-3d-gltf-flight-path-kinematics') &&
    techniqueIds.includes('model-viewer-cursor-tilt-and-forcefield-repulsion')
  ) {
    conflicts.push('Multiple central 3D canvas entities detected. Choose either Three.js flight path or Model-Viewer.');
  }

  return {
    isCompatible: conflicts.length === 0,
    conflicts
  };
}
