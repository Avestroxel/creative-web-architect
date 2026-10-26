/**
 * Intent Intelligence Engine for Creative Web Architect 2.0.
 *
 * Transforms minimal 1–3 line user prompts into a deeply structured,
 * actionable creative brief without hallucinating factual business data
 * or asking unnecessary questions.
 *
 * Principle: Minimum User Prompt, Maximum Internal Creative Intelligence.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

export interface TargetAudienceProfile {
  demographics: string;
  mindset: string;
  primaryNeeds: string[];
}

export interface UserGoalsSpec {
  primary: string;
  secondary: string[];
}

export interface BrandPersonalitySpec {
  traits: string[];
  voiceTone: string;
}

export interface EmotionalDirectionSpec {
  desiredImpression: string;
  energyLevel: 'calm' | 'fluid' | 'assertive' | 'kinetic' | 'monumental';
  metaphor: string;
}

export interface VisualIdentityOpportunities {
  materials: string[];
  chromaticMood: string;
  geometryPreference: 'strict-grid' | 'fluid-asymmetric' | 'modular-bento' | 'monolithic-editorial';
}

export interface SectionArchitecture {
  id: string;
  name: string;
  purpose: string;
  suggestedComponentType: string;
}

export interface ContentArchitectureSpec {
  suggestedSections: SectionArchitecture[];
  heroArchetype: string;
  ctaStrategy: string;
}

export interface InteractionExpectationsSpec {
  tactileIntensity: 'subtle' | 'balanced' | 'rich';
  cursorRelationship: 'standard' | 'magnetic-ring' | 'lagging-pill' | 'canvas-brush' | 'none';
}

export interface MotionSuitabilitySpec {
  level: 'none' | 'subtle' | 'choreographed' | 'cinematic';
  reasons: string[];
}

export interface AccessibilityRequirementsSpec {
  targetStandard: 'WCAG_AA' | 'WCAG_AAA';
  contrastRatio: number;
  minTouchTargetPx: number;
  prefersReducedMotion: boolean;
  silentByDefault: boolean;
}

export interface ResponsivePrioritiesSpec {
  strategy: 'mobile-first-ergonomic' | 'desktop-editorial-adaptive';
  keyBreakpoints: string[];
}

export interface TechnicalConstraintsSpec {
  runtimePreference: 'vanilla-single-file' | 'react-vite' | 'modern-meta';
  targetFPS: number;
  maxLCPMs: number;
  maxCLS: number;
}

export interface MissingAssetDescriptor {
  key: string;
  description: string;
  placeholderStrategy: string;
}

export interface ExplicitVsInferred {
  explicit: string[];
  inferred: string[];
}

export interface ConfidenceAndUncertainty {
  overallConfidence: number; // 0.0 - 1.0
  uncertainties: string[];
  assumptions: string[];
}

export interface StructuredIntent {
  rawPrompt: string;
  category: string;
  industry: string;
  businessPurpose: string;
  targetAudience: TargetAudienceProfile;
  userGoals: UserGoalsSpec;
  brandPersonality: BrandPersonalitySpec;
  emotionalDirection: EmotionalDirectionSpec;
  visualIdentityOpportunities: VisualIdentityOpportunities;
  contentArchitecture: ContentArchitectureSpec;
  interactionExpectations: InteractionExpectationsSpec;
  motionSuitability: MotionSuitabilitySpec;
  accessibilityRequirements: AccessibilityRequirementsSpec;
  responsivePriorities: ResponsivePrioritiesSpec;
  technicalConstraints: TechnicalConstraintsSpec;
  creativeFreedomLevel: 'constrained' | 'balanced' | 'high';
  missingAssets: MissingAssetDescriptor[];
  explicitVsInferred: ExplicitVsInferred;
  confidenceAndUncertainty: ConfidenceAndUncertainty;
}

/** Keyword dictionary for category and domain recognition */
interface DomainRule {
  keywords: string[];
  category: string;
  industry: string;
  purpose: string;
  audience: TargetAudienceProfile;
  personality: BrandPersonalitySpec;
  emotional: EmotionalDirectionSpec;
  visual: VisualIdentityOpportunities;
  sections: SectionArchitecture[];
  motionLevel: MotionSuitabilitySpec['level'];
  cursor: InteractionExpectationsSpec['cursorRelationship'];
}

const DOMAIN_RULES: DomainRule[] = [
  {
    keywords: ['architecture', 'architectural', 'building', 'spatial', 'monograph', 'interior'],
    category: 'architecture',
    industry: 'Architecture & Spatial Design',
    purpose: 'Showcase spatial projects with monumental scale and archival discipline to attract discerning institutional and private clients.',
    audience: {
      demographics: 'Property developers, cultural institutions, luxury residential clients, design curators.',
      mindset: 'Values permanence, spatial proportion, materiality, and restraint over transient trends.',
      primaryNeeds: ['Full bleed architectural photography', 'Clear spatial specs', 'Firm monograph philosophy']
    },
    personality: {
      traits: ['monumental', 'disciplined', 'timeless', 'structural'],
      voiceTone: 'Quiet, authoritative, architectural.'
    },
    emotional: {
      desiredImpression: 'A sense of physical presence, permanence, and refined materiality.',
      energyLevel: 'calm',
      metaphor: 'Monolithic concrete and limestone gallery lit by natural rake light.'
    },
    visual: {
      materials: ['honed limestone', 'brushed cast bronze', 'matte graphite', 'raw linen'],
      chromaticMood: 'Deep warm charcoal (#121316) contrasted against raw chalk stone (#F5F4F0) with zero neon.',
      geometryPreference: 'monolithic-editorial'
    },
    sections: [
      { id: 'hero', name: 'Hero Viewport', purpose: 'Full-bleed spatial viewport with architectural typography', suggestedComponentType: 'monolithic-hero' },
      { id: 'monograph', name: 'Philosophy / Monograph', purpose: 'Statement on space, light, and materiality', suggestedComponentType: 'editorial-spread' },
      { id: 'selected-works', name: 'Selected Works Index', purpose: 'Curated projects with location, year, and typology', suggestedComponentType: 'stacking-card-deck' },
      { id: 'inquiry', name: 'Studio Dialog & Inquiry', purpose: 'Direct contact with principal architects', suggestedComponentType: 'hairline-contact-modal' }
    ],
    motionLevel: 'subtle',
    cursor: 'magnetic-ring'
  },
  {
    keywords: ['studio', 'agency', 'creative studio', 'design agency', 'engineering studio', 'digital products'],
    category: 'creative-agency',
    industry: 'Creative & Digital Product Engineering',
    purpose: 'Demonstrate design and engineering mastery to convert high-tier venture founders and global brands.',
    audience: {
      demographics: 'Startup founders, VP of Product, Chief Marketing Officers, Design Directors.',
      mindset: 'High visual standards, seeks technological innovation paired with commercial conversion.',
      primaryNeeds: ['Proof of craftsmanship', 'Interactive case studies', 'Frictionless collaboration request']
    },
    personality: {
      traits: ['visionary', 'meticulous', 'inventive', 'unapologetic'],
      voiceTone: 'Confident, articulate, technically sharp.'
    },
    emotional: {
      desiredImpression: 'A world-class studio operating at the intersection of avant-garde design and solid engineering.',
      energyLevel: 'fluid',
      metaphor: 'A high-end physical prototyping atelier with tactile switches and precision glass.'
    },
    visual: {
      materials: ['specular liquid glass', 'matte obsidian', '0.5px hairline titanium borders'],
      chromaticMood: 'Deep neutral obsidian (#08090C) paired with crisp off-white (#FAFAFA) and a single surgical amber accent (#D97706).',
      geometryPreference: 'fluid-asymmetric'
    },
    sections: [
      { id: 'hero', name: 'Hero Aperture', purpose: 'Immediate visual arrest with interactive cursor reveal', suggestedComponentType: 'dual-canvas-aperture' },
      { id: 'capabilities', name: 'Discipline Bento', purpose: 'Overview of design, engineering, and spatial capabilities', suggestedComponentType: 'bento-slate-grid' },
      { id: 'case-studies', name: 'Selected Work Archive', purpose: 'Deep-dive showcase of signature commissions', suggestedComponentType: 'sticky-scale-cards' },
      { id: 'cta', name: 'Commission Briefing', purpose: 'Conversion point for new client inquiries', suggestedComponentType: 'conversational-action-tray' }
    ],
    motionLevel: 'choreographed',
    cursor: 'canvas-brush'
  },
  {
    keywords: ['portfolio', 'personal portfolio', 'designer', 'developer', 'art director', 'creative director'],
    category: 'portfolio',
    industry: 'Independent Creative Portfolio',
    purpose: 'Position the creative as an exceptional, in-demand practitioner with an unmistakable signature voice.',
    audience: {
      demographics: 'Creative leaders, headhunters, boutique studio founders, agency collaborators.',
      mindset: 'Looking for distinctive taste, proof of execution, and memorable point of view.',
      primaryNeeds: ['Fast project scanning', 'Insight into thinking & craft', 'Direct line of communication']
    },
    personality: {
      traits: ['distinctive', 'curated', 'thoughtful', 'refined'],
      voiceTone: 'Personal, thoughtful, succinct.'
    },
    emotional: {
      desiredImpression: 'Uncompromising taste and attention to the micro-details of interaction.',
      energyLevel: 'calm',
      metaphor: 'An art collector’s private folio, bound in leather with bespoke foil stamping.'
    },
    visual: {
      materials: ['matte paper stock', 'deep ink', 'delicate hair-rules'],
      chromaticMood: 'Warm paper cream (#FAF8F5) with rich sumi ink (#111111) and muted vermilion (#C0392B).',
      geometryPreference: 'monolithic-editorial'
    },
    sections: [
      { id: 'hero', name: 'Introduction & Stance', purpose: 'Immediate perspective statement and signature ethos', suggestedComponentType: 'kinetic-typography-hero' },
      { id: 'projects', name: 'Annotated Works', purpose: 'Curated gallery of works with roles and results', suggestedComponentType: 'slide-reveal-index' },
      { id: 'experience', name: 'Pedigree & Practice', purpose: 'Background, awards, and historical context', suggestedComponentType: 'minimal-data-sheet' },
      { id: 'contact', name: 'Direct Contact', purpose: 'One-click copy and secure message portal', suggestedComponentType: 'tactile-action-bar' }
    ],
    motionLevel: 'subtle',
    cursor: 'magnetic-ring'
  },
  {
    keywords: ['saas', 'software', 'fintech', 'ai', 'developer tool', 'b2b', 'dashboard', 'analytics', 'platform'],
    category: 'fintech-saas',
    industry: 'High-Tech SaaS & Financial Intelligence',
    purpose: 'Communicate complex computational power and security with immediate clarity and zero cognitive clutter.',
    audience: {
      demographics: 'Engineers, CFOs, quantitative analysts, technical executives.',
      mindset: 'Skeptical of fluff; demands speed, data integrity, and high information density.',
      primaryNeeds: ['Live interactive dashboard proof', 'Clear architecture explanation', 'Transparent pricing']
    },
    personality: {
      traits: ['analytical', 'reliable', 'razor-sharp', 'ergonomic'],
      voiceTone: 'Precise, objective, transparent.'
    },
    emotional: {
      desiredImpression: 'Military-grade precision and effortless analytical command.',
      energyLevel: 'assertive',
      metaphor: 'A telemetry console inside a supersonic aircraft cockpit.'
    },
    visual: {
      materials: ['slate tile', 'micro-beveled grout lines', 'anti-reflective glass'],
      chromaticMood: 'Deep basalt charcoal (#0A0C10) with tabular mint green (#10B981) and cobalt (#3B82F6).',
      geometryPreference: 'modular-bento'
    },
    sections: [
      { id: 'hero', name: 'Value Proposition & Live Telemetry', purpose: 'Demonstrate real-time throughput and core benefit', suggestedComponentType: 'hud-telemetry-hero' },
      { id: 'metrics', name: 'Benchmark Proof Grid', purpose: 'Quantitative proof against legacy tools', suggestedComponentType: 'bento-metrics-matrix' },
      { id: 'features', name: 'Engine Deep Dive', purpose: 'Modular breakdown of security and performance pipelines', suggestedComponentType: 'tessellated-card-deck' },
      { id: 'pricing', name: 'Transparent Tiers', purpose: 'Clear subscription and enterprise pathways', suggestedComponentType: 'tabular-tier-table' }
    ],
    motionLevel: 'subtle',
    cursor: 'lagging-pill'
  },
  {
    keywords: ['racing', 'f1', 'motorsport', 'supercar', 'automotive', 'velocity', 'circuit', 'telemetry', 'vehicle', 'car', 'coachbuilder', 'grand tourer', 'hypercar'],
    category: 'automotive',
    industry: 'High-Performance Motorsport & Automotive',
    purpose: 'Evoke raw speed, aerodynamic tension, and mechanical engineering excellence.',
    audience: {
      demographics: 'Motorsport enthusiasts, luxury automotive collectors, engineering aficionados.',
      mindset: 'Obsessed with lap times, downforce, composite materials, and adrenaline.',
      primaryNeeds: ['Sensory thrill', 'Circuit telemetry visualization', 'Aerodynamic specifications']
    },
    personality: {
      traits: ['aggressive', 'precision-engineered', 'visceral', 'relentless'],
      voiceTone: 'Urgent, technical, focused.'
    },
    emotional: {
      desiredImpression: 'The sensation of pulling 4G through a high-speed chicane at 300 km/h.',
      energyLevel: 'kinetic',
      metaphor: 'A wind-tunnel tested carbon fiber monocoque chassis.'
    },
    visual: {
      materials: ['dry carbon weave', 'anodized titanium', 'high-temp ceramic'],
      chromaticMood: 'Matte carbon black (#07080A) with circuit red (#E10600) and electric cyan (#00F0FF).',
      geometryPreference: 'fluid-asymmetric'
    },
    sections: [
      { id: 'hero', name: 'Curvature Velocity Trace', purpose: 'Interactive polyline trace simulating real-time braking into corners', suggestedComponentType: 'circuit-trace-hero' },
      { id: 'telemetry', name: '8000-Point Halftone Matrix', purpose: 'Interactive data lattice with dynamic reticle squaring', suggestedComponentType: 'halftone-lattice-view' },
      { id: 'vehicle-spec', name: 'Monocoque Breakdown', purpose: 'Exploded view of powertrain and aero surfaces', suggestedComponentType: 'sticky-scale-cards' },
      { id: 'cta', name: 'Paddock Pass Booking', purpose: 'VIP experiential reservation', suggestedComponentType: 'tactile-action-bar' }
    ],
    motionLevel: 'cinematic',
    cursor: 'magnetic-ring'
  },
  {
    keywords: ['luxury', 'fashion', 'jewelry', 'fragrance', 'couture', 'bespoke', 'monochrome'],
    category: 'luxury-fashion',
    industry: 'Haute Horlogerie & Luxury Fashion',
    purpose: 'Create aura, exclusivity, and tactile desire through photographic majesty and editorial whitespace.',
    audience: {
      demographics: 'High-net-worth connoisseurs, luxury collectors, global tastemakers.',
      mindset: 'Purchases identity, heritage, and uncompromising exclusivity.',
      primaryNeeds: ['Pristine imagery', 'Origin storytelling', 'Private concierge access']
    },
    personality: {
      traits: ['regal', 'unhurried', 'enigmatic', 'exquisite'],
      voiceTone: 'Poetic, understated, aristocratic.'
    },
    emotional: {
      desiredImpression: 'An intimate, privileged glimpse inside a centuries-old atelier.',
      energyLevel: 'calm',
      metaphor: 'A velvet-lined jewel casket viewed under soft museum lighting.'
    },
    visual: {
      materials: ['hammered gold leaf', 'blackened lacquer', 'raw silk', 'smoked quartz'],
      chromaticMood: 'Obsidian noir (#050505) paired with antique champagne gold (#D4AF37) and warm alabaster (#F9F8F6).',
      geometryPreference: 'monolithic-editorial'
    },
    sections: [
      { id: 'hero', name: 'Curtain-Reveal Hero', purpose: 'Sliding silk physics reveal with monumental display serif', suggestedComponentType: 'curtain-physics-hero' },
      { id: 'collection', name: 'The Monograph Collection', purpose: 'Large-scale editorial carousel with ghost typography', suggestedComponentType: 'editorial-spread' },
      { id: 'craft', name: 'Atelier Metallurgy', purpose: 'Macro photographic examination of artisanal joinery', suggestedComponentType: 'dual-canvas-aperture' },
      { id: 'concierge', name: 'Private Salon Invitation', purpose: 'Direct discreet consultation request', suggestedComponentType: 'hairline-contact-modal' }
    ],
    motionLevel: 'subtle',
    cursor: 'magnetic-ring'
  },
  {
    keywords: ['3d', 'threejs', 'webgl', 'sculpture', 'bronze', 'spatial', 'shader', 'statue'],
    category: 'product-3d',
    industry: 'Immersive Spatial & 3D Artistry',
    purpose: 'Transport the visitor into a virtual gallery where physical materiality comes alive in real-time WebGL.',
    audience: {
      demographics: 'Art collectors, 3D artists, cultural institutions, creative technologists.',
      mindset: 'Appreciates technical rendering wizardry and tactile physical realism.',
      primaryNeeds: ['Full 360° orbital freedom', 'Realistic shader lighting', 'Fast smooth loading']
    },
    personality: {
      traits: ['sculptural', 'atmospheric', 'technically virtuoso', 'dramatic'],
      voiceTone: 'Philosophical, cinematic, immersive.'
    },
    emotional: {
      desiredImpression: 'Awe and reverent contemplation of a sacred physical relic.',
      energyLevel: 'fluid',
      metaphor: 'A private archaeological vault illuminated by molten forge embers.'
    },
    visual: {
      materials: ['semi-polished bronze', 'cast iron', 'chilled sapphire crystal'],
      chromaticMood: 'Void black (#030305) with molten bronze embers (#C28242) shifting to chilled sapphire (#1E3A8A).',
      geometryPreference: 'fluid-asymmetric'
    },
    sections: [
      { id: 'hero', name: '360° Chiaroscuro Orbit', purpose: 'Full scroll-driven camera orbit around an auto-centered sculpture with GLSL wave shader', suggestedComponentType: 'webgl-stage-hero' },
      { id: 'forge-sparks', name: 'Thermodynamics & Embers', purpose: 'Velocity-turbulent particle field rising from the forge', suggestedComponentType: 'particle-canvas-stream' },
      { id: 'chronicle', name: 'Timeline of Bronze and Time', purpose: 'Per-character blur-up scroll text reveals', suggestedComponentType: 'blur-up-narrative' },
      { id: 'acquisition', name: 'Vault Catalog & Acquisition', purpose: 'Private collector provenance dossier', suggestedComponentType: 'hairline-contact-modal' }
    ],
    motionLevel: 'cinematic',
    cursor: 'magnetic-ring'
  }
];

export class IntentEngine {
  /**
   * Analyzes 1–3 lines of natural language prompt and derives an exhaustive,
   * structured creative brief without hallucinating real business facts.
   */
  public analyze(prompt: string, context?: Record<string, unknown>): StructuredIntent {
    const trimmed = prompt.trim();
    const lower = trimmed.toLowerCase();

    // 1. Identify matching domain rule or synthesize fallback
    const matchedRule = this.findBestDomainRule(lower);

    // 2. Identify explicit requirements from prompt
    const explicit = this.extractExplicitConstraints(lower, trimmed);

    // 3. Determine creative freedom
    const freedom: StructuredIntent['creativeFreedomLevel'] =
      explicit.length > 3 ? 'constrained' : explicit.length > 0 ? 'balanced' : 'high';

    // 4. Synthesize inferred traits
    const inferred = this.deriveInferredTraits(lower, matchedRule);

    // 5. Build structured audience
    const audience: TargetAudienceProfile = {
      demographics: matchedRule?.audience.demographics ?? 'Digital-native professionals and decision-makers seeking modern web experiences.',
      mindset: matchedRule?.audience.mindset ?? 'Values intuitive navigation, visual sophistication, and high performance.',
      primaryNeeds: matchedRule?.audience.primaryNeeds ?? ['Fast loading times', 'Clear hierarchy', 'Tactile interactive feedback']
    };

    // 6. Build content architecture
    const sections: SectionArchitecture[] = matchedRule?.sections ?? [
      { id: 'hero', name: 'Hero Viewport', purpose: 'Immediate brand stance and core proposition', suggestedComponentType: 'monolithic-hero' },
      { id: 'overview', name: 'Overview & Value', purpose: 'Explain the distinct value proposition with clarity', suggestedComponentType: 'bento-slate-grid' },
      { id: 'works', name: 'Selected Highlights', purpose: 'Visual proof of execution and craftsmanship', suggestedComponentType: 'stacking-card-deck' },
      { id: 'contact', name: 'Engagement & Contact', purpose: 'Frictionless call to action', suggestedComponentType: 'tactile-action-bar' }
    ];

    // 7. Calculate confidence
    const matchCount = matchedRule ? matchedRule.keywords.filter(k => lower.includes(k)).length : 0;
    const confidenceScore = Math.min(0.95, Math.max(0.65, 0.65 + matchCount * 0.08));

    const uncertainties: string[] = [];
    if (!lower.includes('light') && !lower.includes('dark')) {
      uncertainties.push('User did not specify light or dark mode theme; inferring dark obsidian/slate for premium depth.');
    }
    if (!lower.includes('tech') && !lower.includes('stack')) {
      uncertainties.push('No framework specified; inferring self-contained single-file HTML/CSS/JS for zero-dependency portability.');
    }

    const isLuxuryOrBespoke = lower.includes('luxury') || lower.includes('bespoke') || lower.includes('coachbuilder') || lower.includes('atelier');

    const brandPersonality = isLuxuryOrBespoke && matchedRule?.category === 'automotive'
      ? {
          traits: ['sculptural', 'bespoke', 'aristocratic', 'timeless'],
          voiceTone: 'Poetic, understated, authoritative coachbuilder.'
        }
      : (matchedRule?.personality ?? {
          traits: ['disciplined', 'refined', 'authoritative', 'tactile'],
          voiceTone: 'Measured, confident, uncompromising.'
        });

    const emotionalDirection = isLuxuryOrBespoke && matchedRule?.category === 'automotive'
      ? {
          desiredImpression: 'A sculptural bespoke grand tourer crafted with archival precision and quiet power.',
          energyLevel: 'calm' as const,
          metaphor: 'A hand-hammered aluminum coachbuilding studio lit by diffused northern light.'
        }
      : (matchedRule?.emotional ?? {
          desiredImpression: 'A high-end, bespoke creation crafted by senior human artisans.',
          energyLevel: 'fluid' as const,
          metaphor: 'A master watchmaker’s workbench.'
        });

    return {
      rawPrompt: trimmed,
      category: matchedRule?.category ?? 'general',
      industry: matchedRule?.industry ?? 'Modern Digital Products',
      businessPurpose: matchedRule?.purpose ?? 'Establish an authoritative, high-craft online presence with zero generic AI tropes.',
      targetAudience: audience,
      userGoals: {
        primary: `Quickly understand the unique value and quality of this ${matchedRule?.category ?? 'project'}.`,
        secondary: ['Explore interactive portfolio/products', 'Verify credibility and craft', 'Take immediate action']
      },
      brandPersonality,
      emotionalDirection,
      visualIdentityOpportunities: matchedRule?.visual ?? {
        materials: ['matte obsidian', '0.5px hairline titanium rules', 'specular liquid glass'],
        chromaticMood: 'Deep neutral obsidian (#08090C) with warm off-white (#FAFAFA) and subtle amber/cyan highlights.',
        geometryPreference: 'fluid-asymmetric'
      },
      contentArchitecture: {
        suggestedSections: sections,
        heroArchetype: sections[0]?.suggestedComponentType ?? 'monolithic-hero',
        ctaStrategy: 'Single clear, tactile call to action with zero friction.'
      },
      interactionExpectations: {
        tactileIntensity: lower.includes('tactile') || lower.includes('button') ? 'rich' : 'balanced',
        cursorRelationship: matchedRule?.cursor ?? 'magnetic-ring'
      },
      motionSuitability: {
        level: explicit.includes('Zero-motion preference')
          ? 'none'
          : (explicit.includes('Cinematic animation expectations')
              ? 'cinematic'
              : (matchedRule?.motionLevel ?? 'subtle')),
        reasons: [
          'Enhances narrative pacing and visual weight',
          'Prevents sterile static appearance without overloading GPU',
          'Strictly obeys prefers-reduced-motion'
        ]
      },
      accessibilityRequirements: {
        targetStandard: explicit.includes('Elevated contrast target (WCAG AAA)') ? 'WCAG_AAA' : 'WCAG_AA',
        contrastRatio: explicit.includes('Elevated contrast target (WCAG AAA)') ? 7.0 : 4.5,
        minTouchTargetPx: 44,
        prefersReducedMotion: true,
        silentByDefault: true
      },
      responsivePriorities: {
        strategy: 'desktop-editorial-adaptive',
        keyBreakpoints: ['640px (mobile)', '1024px (tablet)', '1440px (editorial desktop)']
      },
      technicalConstraints: {
        runtimePreference: 'vanilla-single-file',
        targetFPS: 60,
        maxLCPMs: 1200,
        maxCLS: 0.05
      },
      creativeFreedomLevel: freedom,
      missingAssets: [
        { key: 'imagery', description: 'Real client hero imagery', placeholderStrategy: 'Curated SVG architectural apertures or CSS gradient canvas' },
        { key: 'copy', description: 'Actual business copy & credentials', placeholderStrategy: 'Authentic sample editorial text with zero fake lorem ipsum' }
      ],
      explicitVsInferred: {
        explicit,
        inferred
      },
      confidenceAndUncertainty: {
        overallConfidence: confidenceScore,
        uncertainties,
        assumptions: [
          'Assumed silent-by-default audio policy as no sound was requested',
          'Assumed no-excessive-glow policy to ensure Awwwards-grade maturity'
        ]
      }
    };
  }

  private findBestDomainRule(lower: string): DomainRule | undefined {
    let bestMatch: DomainRule | undefined;
    let maxScore = 0;

    for (const rule of DOMAIN_RULES) {
      let score = 0;
      for (const kw of rule.keywords) {
        if (lower.includes(kw)) {
          score += 1;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = rule;
      }
    }

    return bestMatch;
  }

  private extractExplicitConstraints(lower: string, original: string): string[] {
    const explicit: string[] = [];
    if (lower.includes('single file') || lower.includes('single-file') || lower.includes('one file') || lower.includes('index.html')) {
      explicit.push('Single self-contained HTML deliverable');
    }
    if (lower.includes('dark') || lower.includes('black') || lower.includes('obsidian')) {
      explicit.push('Dark aesthetic palette constraint');
    }
    if (lower.includes('light') || lower.includes('white') || lower.includes('cream')) {
      explicit.push('Strict light chromatic theme');
    }
    if (lower.includes('extraordinary animation') || lower.includes('animations') || lower.includes('animation') || lower.includes('motion')) {
      if (lower.includes('no animation') || lower.includes('no motion') || lower.includes('zero-motion') || lower.includes('static')) {
        explicit.push('Zero-motion preference');
      } else {
        explicit.push('Cinematic animation expectations');
      }
    }
    if (lower.includes('wcag') || lower.includes('aaa') || lower.includes('high contrast')) {
      explicit.push('Elevated contrast target (WCAG AAA)');
    }
    if (lower.includes('3d') || lower.includes('three.js') || lower.includes('webgl')) {
      explicit.push('3D/WebGL rendering requirement');
    }
    if (lower.includes('lenis') || lower.includes('smooth scroll')) {
      explicit.push('Smooth scroll integration requested');
    }
    if (lower.includes('sound') || lower.includes('audio') || lower.includes('music')) {
      explicit.push('Audio/sound synthesis explicitly requested');
    }
    return explicit;
  }

  private deriveInferredTraits(lower: string, rule?: DomainRule): string[] {
    const traits: string[] = [];
    if (rule) {
      traits.push(`Matched domain archetype: ${rule.industry}`);
      traits.push(`Prescribed visual stance: ${rule.visual.chromaticMood}`);
    } else {
      traits.push('Generalized high-craft creative editorial layout');
    }
    traits.push('Strictly Silent by Default (Zero unrequested Web Audio synthesizers)');
    traits.push('No-Glow restraint policy enforced');
    return traits;
  }
}
