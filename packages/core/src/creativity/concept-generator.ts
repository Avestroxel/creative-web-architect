/**
 * Creative Concept Generator for Creative Web Architect 2.0.
 *
 * Generates 3 materially divergent creative concepts (Refined, Experimental, Immersive)
 * from a structured user intent, ensuring archetypes act as fluid inspirations
 * rather than rigid, cookie-cutter templates.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { StructuredIntent } from '../intelligence/intent-engine.js';
import { DesignArchetypeId } from '../archetype-matrix.js';

export type ConceptDirectionType = 'refined' | 'experimental' | 'immersive';

export interface ConceptPalette {
  background: string;
  surface: string;
  surfaceElevated: string;
  ink: string;
  line: string;
  accent: string;
  accentHover: string;
  textSecondary: string;
}

export interface ConceptTypography {
  displayFont: string;
  bodyFont: string;
  monoFont: string;
  scaleRatio: number;
  rationale: string;
}

export interface ConceptTradeOffs {
  pros: string[];
  cons: string[];
  risks: string[];
}

export interface CreativeConcept {
  id: string;
  name: string;
  directionType: ConceptDirectionType;
  tagline: string;
  archetypeInspirations: DesignArchetypeId[];
  visualMetaphor: string;
  layoutPhilosophy: string;
  gridSystem: string;
  heroExperience: string;
  sectionStructure: string[];
  palette: ConceptPalette;
  typography: ConceptTypography;
  materials: string[];
  motionStyle: string;
  signatureInteractionIdea: string;
  accessibilityConsiderations: string;
  feasibilityScore: number; // 1-10
  tradeOffs: ConceptTradeOffs;
  rationale: string;
}

export interface CandidateConcepts {
  refined: CreativeConcept;
  experimental: CreativeConcept;
  immersive: CreativeConcept;
}

export class ConceptGenerator {
  /**
   * Generates 3 distinct concepts:
   * 1. Refined Direction (Classical, composed, high-craft, quiet authority)
   * 2. Experimental Direction (Unconventional grid, expressive cadence, provocative contrast)
   * 3. Immersive Direction (Spatial, depth-layered, atmospheric narrative, canvas/WebGL when justified)
   */
  public generate(intent: StructuredIntent): CandidateConcepts {
    const isDark = !intent.rawPrompt.toLowerCase().includes('light') &&
      !intent.rawPrompt.toLowerCase().includes('white');

    const refined = this.buildRefinedConcept(intent, isDark);
    const experimental = this.buildExperimentalConcept(intent, isDark);
    const immersive = this.buildImmersiveConcept(intent, isDark);

    return { refined, experimental, immersive };
  }

  private buildRefinedConcept(intent: StructuredIntent, isDark: boolean): CreativeConcept {
    const palette: ConceptPalette = isDark
      ? {
          background: '#0a0b0e',
          surface: '#13151b',
          surfaceElevated: '#1c1f28',
          ink: '#f4f4f6',
          line: '#262936',
          accent: '#c5a059', // Refined Kinpaku Gold
          accentHover: '#d8b46e',
          textSecondary: '#8e93a4'
        }
      : {
          background: '#faf9f6',
          surface: '#f0eee8',
          surfaceElevated: '#e5e2d8',
          ink: '#111215',
          line: '#dedad0',
          accent: '#964b00', // Burnt umber
          accentHover: '#b35900',
          textSecondary: '#6e6d68'
        };

    return {
      id: 'concept-refined',
      name: `${intent.industry} — Architectural Monograph & Quiet Craft`,
      directionType: 'refined',
      tagline: 'Disciplined proportions, archival typography, and surgical hairline grids.',
      archetypeInspirations: ['studio-engineering', 'japanese-meditative-void'],
      visualMetaphor: 'A leather-bound architectural monograph printed on heavy textured cotton stock.',
      layoutPhilosophy: 'Rigorous 12-column Swiss grid with 1px hairline container borders, monumental display typography, and generous whitespace breathing rooms.',
      gridSystem: '12-column structural grid, 72px margins, 24px gutters, max measure 68ch.',
      heroExperience: 'Monumental display title with character-level opacity reveal over matte ground; subtle magnetic cursor attraction on primary CTA.',
      sectionStructure: ['01 // Archival Overview', '02 // Selected Works Monograph', '03 // Materiality & Craft', '04 // Direct Inquiries'],
      palette,
      typography: {
        displayFont: 'Cinzel, "Playfair Display", serif',
        bodyFont: '"Plus Jakarta Sans", -apple-system, sans-serif',
        monoFont: '"JetBrains Mono", monospace',
        scaleRatio: 1.333, // Perfect Fourth
        rationale: 'Monumental display serif imparts institutional permanence, paired with an ergonomic modern sans for high reading comfort.'
      },
      materials: [
        'Honed basalt slate surfaces',
        '0.5px hairline metallic dividers',
        'Delicate 14px backdrop-blur frosted headers'
      ],
      motionStyle: 'Subtle spring-damped micro-interactions (200-300ms), zero continuous loops, character-opacity scroll reveals with zero layout thrashing.',
      signatureInteractionIdea: 'Dual-image liquid cursor aperture reveal that parts the hero photograph like a soft watercolor wash on cursor hover.',
      accessibilityConsiderations: 'WCAG AAA contrast (>7.0:1), full keyboard tab navigation, zero autoplay motion, 48px min touch targets.',
      feasibilityScore: 9.8,
      tradeOffs: {
        pros: ['Maximum executive credibility', 'Flawless readability & contrast', 'Zero cognitive fatigue'],
        cons: ['Less visually provocative', 'Prioritizes restraint over spectacle'],
        risks: ['Can appear overly quiet if typography scale is too timid']
      },
      rationale: 'For high-tier clients and serious commercial inquiries, quiet craft and disciplined execution build higher trust than loud decorative visual effects.'
    };
  }

  private buildExperimentalConcept(intent: StructuredIntent, isDark: boolean): CreativeConcept {
    const palette: ConceptPalette = isDark
      ? {
          background: '#070809',
          surface: '#111317',
          surfaceElevated: '#1a1d24',
          ink: '#ffffff',
          line: '#2d323f',
          accent: '#e63946', // Vibrant crimson / street accent
          accentHover: '#ff4d5d',
          textSecondary: '#9ca3af'
        }
      : {
          background: '#f2f2ef',
          surface: '#e6e6e0',
          surfaceElevated: '#d8d8d0',
          ink: '#050505',
          line: '#1c1c1c',
          accent: '#2563eb', // Electric ultramarine
          accentHover: '#3b82f6',
          textSecondary: '#4b5563'
        };

    return {
      id: 'concept-experimental',
      name: `${intent.industry} — Street-Luxe Kinetic Asymmetry`,
      directionType: 'experimental',
      tagline: 'Asymmetric viewport tensions, heavy industrial stencil typography, and magnetic interactions.',
      archetypeInspirations: ['street-luxe-brutalism', 'modular-bento-slate'],
      visualMetaphor: 'An avant-garde Tokyo design gallery catalog taped with industrial stencil markings.',
      layoutPhilosophy: 'Intentionally off-axis alignments, viewport-breaking display numerals, staggered bento cards, and high tactile depression on interaction.',
      gridSystem: 'Asymmetric 8-column rhythm with sticky viewport pinning and staggered card decks.',
      heroExperience: 'Asymmetric 65/35 viewport split with oversized 7.5rem grotesque title and dynamic draggable specimen card with inertial coasting.',
      sectionStructure: ['01 // Manifesto & Kinetic Hook', '02 // Staggered Card Deck Showcase', '03 // Specimen Drawer Index', '04 // Direct Colophon'],
      palette,
      typography: {
        displayFont: '"Syne", "Cabinet Grotesk", sans-serif',
        bodyFont: '"Inter", -apple-system, sans-serif',
        monoFont: '"Space Mono", monospace',
        scaleRatio: 1.414, // Augmented Fourth
        rationale: 'Punchy geometric grotesque with exaggerated letterforms creates immediate avant-garde presence.'
      },
      materials: [
        'Asphalt-textured matte backgrounds',
        'Heavy 1.5px high-contrast structural borders',
        'Optical blur (4px) on secondary copy with hover un-blur'
      ],
      motionStyle: 'Elastic spring physics with inertial cursor lag (0.08 LERP), velocity-skew card dragging, and instant snap returns.',
      signatureInteractionIdea: 'Sticky card deck stacking with geometric scale decay formula [targetScale = 1 - (total - 1 - i) * 0.03] and dual-cursor magnetic ring.',
      accessibilityConsiderations: 'prefers-reduced-motion: reduce disables all velocity skews and sticker drag; high optical contrast guaranteed.',
      feasibilityScore: 8.9,
      tradeOffs: {
        pros: ['Instantly unforgettable visual stance', 'High emotional engagement', 'Awards-grade distinctiveness'],
        cons: ['Polarizing aesthetic', 'Requires strict discipline to prevent visual clutter'],
        risks: ['Excessive movement could distract if not strictly gated by user intent']
      },
      rationale: 'Breaks through boilerplate AI templates with assertive, unforgettable design choices that express bold creative confidence.'
    };
  }

  private buildImmersiveConcept(intent: StructuredIntent, isDark: boolean): CreativeConcept {
    const palette: ConceptPalette = {
      background: '#040507',
      surface: '#0d1017',
      surfaceElevated: '#151b27',
      ink: '#f0f3f8',
      line: '#1e2638',
      accent: '#00f0ff', // High-tech cyan / molten sapphire
      accentHover: '#38f5ff',
      textSecondary: '#7b87a0'
    };

    return {
      id: 'concept-immersive',
      name: `${intent.industry} — Cinematic Spatial Stage & Depth Orchestration`,
      directionType: 'immersive',
      tagline: 'Volumetric depth planes, smooth scroll camera orbits, and atmospheric canvas dynamics.',
      archetypeInspirations: ['auteur-cinematic', 'physical-product-3d', 'aerospace-geospatial'],
      visualMetaphor: 'A darkened cinematic screening room where focal subjects float in deep volumetric space.',
      layoutPhilosophy: 'Single-screen or tall viewport-locked stages with layered Z-planes, subtle parallax coordinate shifts, and per-character blur-up entrances.',
      gridSystem: 'Full-viewport canvas stage (100vw x 100vh) overlayed with floating HUD telemetry navigation.',
      heroExperience: 'Full-bleed cinematic proscenium viewport with 360° scroll camera orbit around focal artifact and additive spark turbulence.',
      sectionStructure: ['01 // Atmospheric Proscenium', '02 // Volumetric Feature Orbit', '03 // Aerodynamic / Spatial Engineering', '04 // Acquisition Concierge'],
      palette,
      typography: {
        displayFont: '"Cinzel Decorative", "Italiana", serif',
        bodyFont: '"Plus Jakarta Sans", sans-serif',
        monoFont: '"JetBrains Mono", monospace',
        scaleRatio: 1.5, // Golden Ratio
        rationale: 'Monumental cinematic serif creates dramatic gravitas, contrasting against 11px uppercase monospace telemetry.'
      },
      materials: [
        'Camera-parented GLSL liquid wave shader or procedural canvas backdrop',
        'Refined liquid glass with specular highlights',
        'Additive spark/particle turbulence with auto-cleanup'
      ],
      motionStyle: 'Scroll-synchronized 360° camera orbit or 3-tier depth parallax, holding elements in viewport before diving into next chapter.',
      signatureInteractionIdea: 'Interactive 3D model orbit or cursor-repelled forcefield (400px radius) with shader-warmed texture swaps and zero layout shift.',
      accessibilityConsiderations: 'Instant fallback to high-resolution static photographic stage when prefers-reduced-motion is active; zero GPU memory leaks.',
      feasibilityScore: 7.8,
      tradeOffs: {
        pros: ['Mesmerizing cinematic spectacle', 'Showcases technical engineering virtuosity', 'Maximum immersion'],
        cons: ['Higher GPU footprint', 'Requires rigorous fallback on low-power devices'],
        risks: ['Must strictly enforce prefers-reduced-motion to avoid motion sickness']
      },
      rationale: 'When the brief demands a luxury, spatial, or showpiece experience, spatial depth and cinematic lighting create an emotional impact impossible with 2D alone.'
    };
  }
}
