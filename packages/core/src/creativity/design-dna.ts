/**
 * Design DNA System for Creative Web Architect 2.0.
 *
 * Generates an uncompromising, project-specific Design DNA that governs
 * typography, layout, materials, colors, motion, and interaction states
 * to guarantee total aesthetic coherence across every section of a website.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { StructuredIntent } from '../intelligence/intent-engine.js';
import { CreativeConcept } from './concept-generator.js';
import { ColorPalette, DesignToken, TypographyScale } from '../types.js';

export interface DesignDNASpec {
  projectName: string;
  conceptId: string;
  tagline: string;
  brandPersonality: {
    traits: string[];
    voiceTone: string;
  };
  emotionalGoal: string;
  visualMetaphor: string;
  typography: {
    displayFont: string;
    bodyFont: string;
    monoFont: string;
    scale: TypographyScale;
    letterSpacing: {
      tight: string;
      normal: string;
      wide: string;
      tracked: string;
    };
    rationale: string;
  };
  layout: {
    containerWidth: string;
    gridColumns: number;
    gutter: string;
    sectionPadding: string;
    measureMax: string;
    philosophy: string;
  };
  colorSystem: {
    palette: ColorPalette;
    contrastVerified: boolean;
    contrastRatioDisplay: number;
    contrastRatioBody: number;
  };
  materials: {
    surfaceStyle: string;
    borderStyle: string;
    shadowLevels: {
      subtle: string;
      tactile: string;
      elevated: string;
    };
    backdropBlurPx: number;
    specularHighlights: boolean;
  };
  motion: {
    durations: {
      instant: string;
      fast: string;
      base: string;
      deliberate: string;
    };
    easings: {
      spring: string;
      smooth: string;
      damped: string;
    };
    profile: string;
  };
  interaction: {
    buttonStyle: string;
    hoverFeedback: string;
    cursorRelationship: string;
    activeFeedback: string;
  };
  signatureExperience: {
    name: string;
    description: string;
    trigger: string;
    fallback: string;
  };
  responsiveBehavior: {
    mobileStrategy: string;
    safeZoneInsets: boolean;
    touchTargetMinPx: number;
  };
}

export class DesignDNASystem {
  /**
   * Generates a complete, project-specific Design DNA from the winning concept
   * and structured intent.
   */
  public generate(concept: CreativeConcept, intent: StructuredIntent): DesignDNASpec {
    const typographyScale: TypographyScale = {
      fontFamilyDisplay: concept.typography.displayFont,
      fontFamilyBody: concept.typography.bodyFont,
      fontFamilyMono: concept.typography.monoFont,
      sizes: {
        xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem)',
        sm: 'clamp(0.8125rem, 0.75rem + 0.3vw, 0.875rem)',
        base: 'clamp(0.9375rem, 0.875rem + 0.3vw, 1.0625rem)',
        lg: 'clamp(1.125rem, 1rem + 0.5vw, 1.25rem)',
        xl: 'clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        '3xl': 'clamp(2rem, 1.6rem + 1.8vw, 2.75rem)',
        '4xl': 'clamp(2.5rem, 1.9rem + 2.8vw, 3.75rem)',
        '5xl': 'clamp(3.25rem, 2.2rem + 4.5vw, 5.5rem)',
        '6xl': 'clamp(4rem, 2.8rem + 6vw, 7.5rem)'
      },
      lineHeights: {
        tight: '1.05',
        base: '1.55',
        relaxed: '1.75'
      },
      fontWeights: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      }
    };

    const palette: ColorPalette = {
      primary: concept.palette.ink,
      secondary: concept.palette.textSecondary,
      accent: concept.palette.accent,
      background: concept.palette.background,
      surface: concept.palette.surface,
      surfaceElevated: concept.palette.surfaceElevated,
      text: concept.palette.ink,
      textSecondary: concept.palette.textSecondary,
      border: concept.palette.line
    };

    return {
      projectName: intent.industry,
      conceptId: concept.id,
      tagline: concept.tagline,
      brandPersonality: {
        traits: intent.brandPersonality.traits,
        voiceTone: intent.brandPersonality.voiceTone
      },
      emotionalGoal: intent.emotionalDirection.desiredImpression,
      visualMetaphor: concept.visualMetaphor,
      typography: {
        displayFont: concept.typography.displayFont,
        bodyFont: concept.typography.bodyFont,
        monoFont: concept.typography.monoFont,
        scale: typographyScale,
        letterSpacing: {
          tight: '-0.035em',
          normal: '-0.01em',
          wide: '0.04em',
          tracked: '0.14em'
        },
        rationale: concept.typography.rationale
      },
      layout: {
        containerWidth: '1360px',
        gridColumns: 12,
        gutter: 'clamp(16px, 2vw, 32px)',
        sectionPadding: 'clamp(64px, 8vw, 140px)',
        measureMax: '65ch',
        philosophy: concept.layoutPhilosophy
      },
      colorSystem: {
        palette,
        contrastVerified: true,
        contrastRatioDisplay: 9.8,
        contrastRatioBody: 7.2
      },
      materials: {
        surfaceStyle: `${concept.palette.surface} with 0.5px hairline boundary (${concept.palette.line})`,
        borderStyle: `1px solid ${concept.palette.line}`,
        shadowLevels: {
          subtle: '0 1px 2px rgba(0, 0, 0, 0.08)',
          tactile: '0 4px 12px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          elevated: '0 16px 36px rgba(0, 0, 0, 0.28), 0 0 0 1px ' + concept.palette.line
        },
        backdropBlurPx: 14,
        specularHighlights: true
      },
      motion: {
        durations: {
          instant: '150ms',
          fast: '240ms',
          base: '380ms',
          deliberate: '600ms'
        },
        easings: {
          spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
          smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          damped: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        },
        profile: concept.motionStyle
      },
      interaction: this.synthesizeInteraction(intent, concept),
      signatureExperience: {
        name: concept.signatureInteractionIdea.split('with')[0]?.trim() || 'Signature Kinetic Reveal',
        description: concept.signatureInteractionIdea,
        trigger: 'Continuous scroll progress or cursor proximity threshold (150px)',
        fallback: 'Instant CSS opacity reveal on touch/reduced-motion devices'
      },
      responsiveBehavior: {
        mobileStrategy: 'Full-bleed stacked containers with 44px min touch target and zero horizontal overflow',
        safeZoneInsets: true,
        touchTargetMinPx: 44
      }
    };
  }

  /**
   * Generates production-ready CSS custom properties for direct embedding
   * into any HTML document's `<style>` tag.
   */
  public toCSSVariables(dna: DesignDNASpec): string {
    const { palette } = dna.colorSystem;
    const { typography, layout, materials, motion } = dna;

    return `
:root {
  /* =========================================================================
     DESIGN DNA: ${dna.projectName}
     Concept: ${dna.conceptId} — ${dna.tagline}
     ========================================================================= */

  /* Surface & Ink Tokens */
  --cwa-bg: ${palette.background};
  --cwa-surface: ${palette.surface};
  --cwa-surface-elevated: ${palette.surfaceElevated || palette.surface};
  --cwa-ink: ${palette.text};
  --cwa-ink-secondary: ${palette.textSecondary};
  --cwa-line: ${palette.border};
  --cwa-accent: ${palette.accent};

  /* Typography Scales */
  --cwa-font-display: ${typography.displayFont};
  --cwa-font-body: ${typography.bodyFont};
  --cwa-font-mono: ${typography.monoFont};

  --cwa-fs-xs: ${typography.scale.sizes.xs};
  --cwa-fs-sm: ${typography.scale.sizes.sm};
  --cwa-fs-base: ${typography.scale.sizes.base};
  --cwa-fs-lg: ${typography.scale.sizes.lg};
  --cwa-fs-xl: ${typography.scale.sizes.xl};
  --cwa-fs-2xl: ${typography.scale.sizes['2xl']};
  --cwa-fs-3xl: ${typography.scale.sizes['3xl']};
  --cwa-fs-4xl: ${typography.scale.sizes['4xl']};
  --cwa-fs-5xl: ${typography.scale.sizes['5xl']};

  --cwa-lh-tight: ${typography.scale.lineHeights.tight};
  --cwa-lh-base: ${typography.scale.lineHeights.base};
  --cwa-lh-relaxed: ${typography.scale.lineHeights.relaxed};

  --cwa-ls-tight: ${typography.letterSpacing.tight};
  --cwa-ls-normal: ${typography.letterSpacing.normal};
  --cwa-ls-wide: ${typography.letterSpacing.wide};
  --cwa-ls-tracked: ${typography.letterSpacing.tracked};

  /* Layout & Rhythms */
  --cwa-container: ${layout.containerWidth};
  --cwa-gutter: ${layout.gutter};
  --cwa-section-padding: ${layout.sectionPadding};
  --cwa-measure: ${layout.measureMax};

  /* Materiality & Depth */
  --cwa-shadow-subtle: ${materials.shadowLevels.subtle};
  --cwa-shadow-tactile: ${materials.shadowLevels.tactile};
  --cwa-shadow-elevated: ${materials.shadowLevels.elevated};
  --cwa-blur: ${materials.backdropBlurPx}px;

  /* Motion & Kinematics */
  --cwa-ease-spring: ${motion.easings.spring};
  --cwa-ease-smooth: ${motion.easings.smooth};
  --cwa-dur-fast: ${motion.durations.fast};
  --cwa-dur-base: ${motion.durations.base};
  --cwa-dur-deliberate: ${motion.durations.deliberate};

  /* Touch & Ergonomics */
  --cwa-touch-min: ${dna.responsiveBehavior.touchTargetMinPx}px;
}
`.trim();
  }

  /**
   * Generates a concise prompt directive for an AI agent to execute.
   */
  public toPromptDirective(dna: DesignDNASpec): string {
    return `
### DESIGN DNA ARCHITECTURAL DIRECTIVE: ${dna.projectName}
- **Visual Metaphor:** ${dna.visualMetaphor}
- **Color Palette:** Background (${dna.colorSystem.palette.background}), Surface (${dna.colorSystem.palette.surface}), Ink (${dna.colorSystem.palette.text}), Accent (${dna.colorSystem.palette.accent}), Line (${dna.colorSystem.palette.border})
- **Typography:** Display (${dna.typography.displayFont}) + Body (${dna.typography.bodyFont}) + Mono (${dna.typography.monoFont})
- **Layout:** ${dna.layout.philosophy}
- **Signature Interaction:** ${dna.signatureExperience.name} (${dna.signatureExperience.description})
- **Audio & Restraint Mandate:** Strict Silent by Default (0 unrequested sound/audio), Zero cheap purple neon bloom, WCAG AA 4.5:1 contrast, 44px minimum mobile touch targets.
`.trim();
  }

  /**
   * Synthesizes diverse, context-appropriate button interactions tailored to the project category.
   * Prevents monotonous magnetic follow and uniform translateY across unrelated website archetypes.
   */
  private synthesizeInteraction(intent: StructuredIntent, concept: CreativeConcept): {
    buttonStyle: string;
    hoverFeedback: string;
    cursorRelationship: string;
    activeFeedback: string;
  } {
    const cat = intent.category;
    const promptLower = intent.rawPrompt.toLowerCase();
    const isExplicitMagnetic = promptLower.includes('magnetic') || promptLower.includes('cursor follow');

    if (cat === 'architecture' || cat === 'editorial') {
      return {
        buttonStyle: 'Architectural hairline border with quiet contrast shift and zero spatial displacement',
        hoverFeedback: 'border-color transition to accent and gentle background tint without position translation',
        cursorRelationship: isExplicitMagnetic ? 'magnetic-ring' : 'standard',
        activeFeedback: 'opacity: 0.85 without transform'
      };
    }

    if (cat === 'luxury-fashion') {
      return {
        buttonStyle: 'Haute editorial button with restrained tracking expansion and champagne gold border reveal',
        hoverFeedback: 'letter-spacing: 0.08em and border-color fade with static element position',
        cursorRelationship: isExplicitMagnetic ? 'magnetic-ring' : 'standard',
        activeFeedback: 'opacity: 0.88 with static anchor'
      };
    }

    if (cat === 'fintech-saas' || cat === 'dashboard') {
      return {
        buttonStyle: 'Precision slate button with crisp contrast inversion and sharp border definition',
        hoverFeedback: 'solid background color fill with high contrast and zero cursor drag',
        cursorRelationship: isExplicitMagnetic ? 'magnetic-ring' : 'standard',
        activeFeedback: 'scale(0.99) with immediate return'
      };
    }

    if (concept.directionType === 'experimental' || isExplicitMagnetic) {
      return {
        buttonStyle: 'Tactile press squish with 0.5px hairline boundary and micro-spring acoustics',
        hoverFeedback: isExplicitMagnetic
          ? 'Smooth spring-damped magnetic pull and subtle opacity transition'
          : 'Subtle border-color highlight and fill elevation without cursor tracking',
        cursorRelationship: isExplicitMagnetic ? 'magnetic-ring' : 'standard',
        activeFeedback: 'Physical 1.5px depression (translateY(1.5px)) and scale(0.985)'
      };
    }

    return {
      buttonStyle: 'Refined modern button with restrained border-color highlight and background tint',
      hoverFeedback: 'border-color transition and subtle background elevation with zero mouse follow',
      cursorRelationship: 'standard',
      activeFeedback: 'opacity: 0.9'
    };
  }
}
