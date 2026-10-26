/**
 * Cognitive Creative Brain — Lateral Thinking, Metaphor Synthesis & Neurological Hooks
 *
 * Elevates CWA from template selection to genuine creative cognition:
 * 1. Lateral Metaphor Synthesis (maps brand identity to physical/architectural analogies)
 * 2. Neurological 3-Second Retention Hook (engineers the first 0.0s–3.0s user attention arc)
 * 3. Anti-Fatigue Layout Synthesizer (destroys cookie-cutter Bento fatigue via asymmetric tension)
 * 4. Psychological Brand Resonance (tunes cognitive load, emotional imprint & perceived craft)
 */

import type { StructuredIntent } from './intent-engine.js';

export interface VisualMetaphor {
  name: string;
  physicalAnalogy: string;
  materialManifestation: string;
  opticalAtmosphere: string;
  tactileHaptics: string;
}

export interface NeurologicalHook {
  focalAnchor: string;
  threeSecondArc: {
    arrest: string;    // 0.0s - 0.8s: Instant visual arrest
    unfold: string;    // 0.8s - 2.0s: Curated narrative reveal
    invite: string;    // 2.0s - 3.0s: Kinesthetic invitation to explore
  };
  negativeSpaceRatio: string;
  kinestheticCue: string;
}

export interface AntiFatigueLayout {
  structureType: 'monolithic-editorial' | 'asymmetric-split' | 'stratified-monograph' | 'kinetic-viewport-rail' | 'spatial-stage-proscenium';
  cadenceRhythm: string[];
  asymmetryRatio: string;
  tensionMechanism: string;
  sectionTransitionPhilosophy: string;
}

export interface PsychologicalResonance {
  primaryEmotion: 'awe' | 'inevitable-precision' | 'curatorial-intimacy' | 'quiet-exclusivity' | 'raw-street-velocity' | 'deep-reassurance';
  cognitiveLoad: 'spacious-meditative' | 'calibrated-editorial' | 'dense-telemetric';
  perceivedCraftLevel: 'haute-atelier' | 'monumental-monograph' | 'scientific-instrument' | 'avant-garde-kinetic';
  emotionalPillars: string[];
}

export interface CognitiveProfile {
  metaphor: VisualMetaphor;
  hook: NeurologicalHook;
  layout: AntiFatigueLayout;
  psychology: PsychologicalResonance;
  toPromptDirective(): string;
  toCSSDirectives(): Record<string, string>;
}

export class CognitiveBrain {
  /**
   * Synthesize a deep cognitive creative profile from any structured intent
   */
  public static synthesize(intent: StructuredIntent): CognitiveProfile {
    const category = intent.category.toLowerCase();
    const personality = (intent.brandPersonality?.voiceTone ?? '').toLowerCase();
    const rawPrompt = intent.rawPrompt.toLowerCase();

    // 1. Synthesize Metaphor
    const metaphor = this.deriveMetaphor(category, personality, rawPrompt);

    // 2. Synthesize Neurological Hook
    const hook = this.deriveNeurologicalHook(category, personality, metaphor);

    // 3. Synthesize Anti-Fatigue Layout
    const layout = this.deriveAntiFatigueLayout(category, personality);

    // 4. Synthesize Psychological Resonance
    const psychology = this.derivePsychology(category, personality, rawPrompt);

    return {
      metaphor,
      hook,
      layout,
      psychology,
      toPromptDirective(): string {
        return [
          `=== COGNITIVE CREATIVE DIRECTIVE (BRAIN 2.0) ===`,
          `Physical Metaphor: ${metaphor.name} (${metaphor.physicalAnalogy})`,
          `Material Language: ${metaphor.materialManifestation}`,
          `Optical Atmosphere: ${metaphor.opticalAtmosphere}`,
          `3-Second Attention Hook: ${hook.focalAnchor} | Arc: ${hook.threeSecondArc.arrest} -> ${hook.threeSecondArc.unfold}`,
          `Negative Space Rule: ${hook.negativeSpaceRatio} (Anti-Claustrophobic Void)`,
          `Layout Cadence: ${layout.structureType} with ${layout.asymmetryRatio} asymmetric tension`,
          `Anti-Fatigue Strategy: ${layout.tensionMechanism}`,
          `Psychological Resonance: ${psychology.primaryEmotion.toUpperCase()} (${psychology.perceivedCraftLevel})`,
          `Emotional Imprint: ${psychology.emotionalPillars.join(', ')}`,
        ].join('\n');
      },
      toCSSDirectives(): Record<string, string> {
        return {
          '--cwa-metaphor-name': `"${metaphor.name}"`,
          '--cwa-void-ratio': hook.negativeSpaceRatio,
          '--cwa-asymmetry-ratio': layout.asymmetryRatio,
          '--cwa-craft-level': `"${psychology.perceivedCraftLevel}"`,
        };
      },
    };
  }

  private static deriveMetaphor(category: string, personality: string, raw: string): VisualMetaphor {
    // 1. Haute Horlogerie & Precision Craft (prioritized before generic fashion/luxury)
    if (category.includes('watch') || raw.includes('watch') || raw.includes('horolog') || raw.includes('jewel') || (category.includes('luxury') && !raw.includes('street'))) {
      return {
        name: 'Geneva Haute Horlogerie Escapement',
        physicalAnalogy: 'Hand-chamfered bridges, brushed rhodium gears, satin Geneva stripes under anti-reflective sapphire crystal',
        materialManifestation: 'Brushed platinum (#18191c), champagne aurum (#d4af37), hand-lapped midnight mirror black (#070709)',
        opticalAtmosphere: 'Precision directional glancing beam creating hairline specular caustics on bevels',
        tactileHaptics: 'Micro-knurled ratcheted detent haptics; buttery Swiss inertia on smooth wheel interactions',
      };
    }

    // 2. Monolithic Architecture & Concrete
    if (category.includes('architecture') || raw.includes('concrete') || raw.includes('brutalist') || raw.includes('monolith')) {
      return {
        name: 'Monolithic Honed Basalt Quarry',
        physicalAnalogy: 'Massive hand-cut volcanic stone blocks weathered by rainfall with razor-sharp 0.5px joints',
        materialManifestation: 'Matte pumice charcoal (#121316), bone linen hairlines (rgba(255,255,255,0.08)), zero glossy reflections',
        opticalAtmosphere: 'Diffused chiaroscuro daylight filtering through a monolithic skylight; deep neutral shadows',
        tactileHaptics: 'Dense hydraulic micro-weight when scrolling; cards sink 1px on depression with zero spring bounce',
      };
    }

    // 3. Street-Luxe & Avant-Garde Apparel
    if (raw.includes('street') || raw.includes('underground') || category.includes('street') || category.includes('fashion')) {
      return {
        name: 'Industrial Print-Atelier & Screen-Print Proof',
        physicalAnalogy: 'Wet ink on unbleached heavyweight cardstock, industrial gaffer tape, archival specimen typography',
        materialManifestation: 'High-contrast bitumen black (#080808), raw optical white (#f5f5f7), caution orange micro-rules',
        opticalAtmosphere: 'Raw direct studio flash illumination; graphic cast shadows and tactile paper tooth',
        tactileHaptics: 'Instant snappy mechanical response; spring-damped shear skews on cursor velocity',
      };
    }

    // 4. SaaS & Cloud Telemetry
    if (category.includes('saas') || category.includes('product') || category.includes('tech') || raw.includes('cloud')) {
      return {
        name: 'Aerospace Telemetry Instrumentation Surface',
        physicalAnalogy: 'Machined anodized avionics control faceplate with etched illuminated indices and micro-grout partitions',
        materialManifestation: 'Matte slate avionics graphite (#0d0e12), precision ceramic divider hairlines, sub-pixel grid dots',
        opticalAtmosphere: 'Ambient cockpit twilight with zero-bleed high-CRI white status indices (never blurry colored glow)',
        tactileHaptics: 'Milled aircraft aluminum switch travel; crisp 40ms snap-to-grid alignment',
      };
    }

    // 5. Editorial & Cinema
    if (category.includes('editorial') || category.includes('cinema') || category.includes('film') || raw.includes('monograph')) {
      return {
        name: 'Archival 35mm Celluloid & Hand-Bound Monograph',
        physicalAnalogy: 'Smoked glass viewing lightbox holding silver gelatin film contact sheets and Deckle-edge archival cotton paper',
        materialManifestation: 'Deep silver-halide nitrate (#050608), archival warm bone (#f2ede4), 0.5px brass rule dividers',
        opticalAtmosphere: 'Warm rear-lit light table diffusion; rich organic dynamic range without digital clipping',
        tactileHaptics: 'Frictionless horizontal pan with natural physical momentum and cushioned edge stops',
      };
    }

    // Default Universal Creative Metaphor: Curated Bespoke Atelier
    return {
      name: 'Curated Architectural Atelier',
      physicalAnalogy: 'Honed slate drafting tables with precision brass instruments and natural linen specimen trays',
      materialManifestation: 'Matte obsidian (#0a0b0e), frosted mineral glass (backdrop-filter: blur(16px)), crisp 0.5px hairline boundaries',
      opticalAtmosphere: 'Neutral museum-grade ambient wash with controlled directional key light',
      tactileHaptics: 'Spring-damped magnetic attraction (stiffness: 180, damping: 22) with organic micro-settling',
    };
  }

  private static deriveNeurologicalHook(category: string, personality: string, metaphor: VisualMetaphor): NeurologicalHook {
    return {
      focalAnchor: `Monumental asymmetrical headline paired with a high-contrast physical artifact representing ${metaphor.name}`,
      threeSecondArc: {
        arrest: `0.0s–0.8s: Sudden optical clarity — pure void background with 1 commanding typographic mass and zero layout shift.`,
        unfold: `0.8s–2.0s: Staggered reveal of secondary coordinates, micro-rules, and tactile status indicators sliding from mask clips.`,
        invite: `2.0s–3.0s: Interactive element (magnetic pill or interactive canvas aperture) registers ambient cursor hover with subtle spring awakening.`,
      },
      negativeSpaceRatio: '45% to 55% purposeful void (prohibits cramped multi-card clumping)',
      kinestheticCue: 'Spring-damped cursor aura + subtle micro-arrow hover translation (+4px on X axis)',
    };
  }

  private static deriveAntiFatigueLayout(category: string, personality: string): AntiFatigueLayout {
    return {
      structureType: 'monolithic-editorial',
      cadenceRhythm: [
        'Monumental Hero (100vh full-bleed proscenium with 45% negative space void)',
        'Compressed Telemetry Band (ultra-dense single-line horizontal metadata ticker with hairlines)',
        'Asymmetric Split Showcase (65% dominant visual story / 35% clinical typographic column)',
        'Full-Width Fluid Horizon (expansive break relieving card repetition)',
        'Curated Specimen Drawer (2-column staggered index with hairline divider notches)',
      ],
      asymmetryRatio: '65% / 35% golden ratio offset',
      tensionMechanism: 'Deliberately breaking uniform card heights; pairing heavy monumental serif/grotesque titles with ultra-fine 11px monospace data tags',
      sectionTransitionPhilosophy: 'Zero harsh horizontal divider blocks; sections flow via interlocking structural hairlines and continuous fluid background depth',
    };
  }

  private static derivePsychology(category: string, personality: string, raw: string): PsychologicalResonance {
    if (raw.includes('street') || raw.includes('underground') || (category.includes('fashion') && !raw.includes('watch') && !raw.includes('horolog'))) {
      return {
        primaryEmotion: 'raw-street-velocity',
        cognitiveLoad: 'calibrated-editorial',
        perceivedCraftLevel: 'avant-garde-kinetic',
        emotionalPillars: ['Disruptive Energy', 'Archival Underground', 'Graphic Precision', 'Tactile Unorthodoxy'],
      };
    }

    if (category.includes('architecture') || category.includes('luxury') || category.includes('watch') || raw.includes('watch') || raw.includes('horolog')) {
      return {
        primaryEmotion: 'quiet-exclusivity',
        cognitiveLoad: 'spacious-meditative',
        perceivedCraftLevel: 'haute-atelier',
        emotionalPillars: ['Uncompromising Rigor', 'Enduring Permanence', 'Quiet Confidence', 'Tactile Perfection'],
      };
    }

    if (category.includes('fashion') || category.includes('street')) {
      return {
        primaryEmotion: 'raw-street-velocity',
        cognitiveLoad: 'calibrated-editorial',
        perceivedCraftLevel: 'avant-garde-kinetic',
        emotionalPillars: ['Disruptive Energy', 'Archival Underground', 'Graphic Precision', 'Tactile Unorthodoxy'],
      };
    }

    if (category.includes('saas') || category.includes('tech')) {
      return {
        primaryEmotion: 'inevitable-precision',
        cognitiveLoad: 'dense-telemetric',
        perceivedCraftLevel: 'scientific-instrument',
        emotionalPillars: ['Sovereign Reliability', 'Architectural Clarity', 'Zero Cognitive Friction', 'Mathematical Beauty'],
      };
    }

    return {
      primaryEmotion: 'awe',
      cognitiveLoad: 'calibrated-editorial',
      perceivedCraftLevel: 'monumental-monograph',
      emotionalPillars: ['Curatorial Authority', 'Deep Visual Coherence', 'Subtle Dynamic Motion', 'Tactile Polish'],
    };
  }
}
