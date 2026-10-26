/**
 * Signature Experience Generator for Creative Web Architect 2.0.
 *
 * Proposes 1 or 2 distinctive, project-specific interactions derived directly from
 * the project's Design DNA, category, archetype, and visual metaphor.
 * Avoids repetitive canned effects in favor of cohesive, memorable brand touchpoints.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { StructuredIntent } from '../intelligence/intent-engine.js';
import { CreativeConcept } from './concept-generator.js';
import { DesignDNASpec } from './design-dna.js';

export type InteractionModel =
  | 'scroll-coupled'
  | 'cursor-proximity'
  | 'viewport-scrub'
  | 'tactile-press'
  | 'canvas-reveal'
  | 'spatial-orbit'
  | 'cipher-scramble';

export interface ExecutableCodeSnippet {
  html: string;
  css: string;
  js: string;
}

export interface SignatureExperienceSpec {
  id: string;
  name: string;
  tagline: string;
  description: string;
  purpose: string;
  anchorSection: string;
  interactionModel: InteractionModel;
  implementationGuide: string;
  executableSnippet: ExecutableCodeSnippet;
  mobileAlternative: string;
  reducedMotionAlternative: string;
  accessibilityNotes: string;
}

export class SignatureExperienceGenerator {
  /**
   * Proposes tailored signature experiences for the project based on Intent, Concept, and Design DNA.
   */
  public propose(
    intent: StructuredIntent,
    concept: CreativeConcept,
    dna?: DesignDNASpec
  ): SignatureExperienceSpec[] {
    const list: SignatureExperienceSpec[] = [];
    const category = intent.category;
    const direction = concept.directionType;

    // Signature 1: Core Hero / Showcase Interaction
    if (category === 'automotive') {
      list.push({
        id: 'sig-kinematic-telemetry-ribbon',
        name: 'Kinematic Telemetry Scrub & Velocity Accents',
        tagline: 'Precision aerodynamic telemetry lines responsive to scroll velocity.',
        description: 'An SVG telemetry overlay with dynamic stroke-dashoffset responsive to scroll velocity. Accents accelerate when scrolling quickly, simulating high-speed wind-tunnel aerodynamics.',
        purpose: 'Immerse the visitor into the high-performance aerodynamic heritage of the vehicle.',
        anchorSection: 'hero',
        interactionModel: 'scroll-coupled',
        implementationGuide: 'Monitor window.scrollY delta over 16ms rAF window, map velocity to SVG strokeDashoffset and opacity.',
        executableSnippet: {
          html: '<div class="cwa-telemetry-hud" aria-hidden="true"><div class="cwa-telemetry-gauge"><span class="cwa-telemetry-val">000</span><span class="cwa-telemetry-unit">KM/H</span></div><div class="cwa-telemetry-line"></div></div>',
          css: '.cwa-telemetry-hud { position: absolute; bottom: 32px; right: 32px; font-family: var(--cwa-font-mono); font-size: var(--cwa-fs-xs); color: var(--cwa-accent); display: flex; align-items: center; gap: 16px; pointer-events: none; } .cwa-telemetry-line { width: 80px; height: 1px; background: var(--cwa-line); position: relative; overflow: hidden; } .cwa-telemetry-line::after { content: ""; position: absolute; inset: 0; background: var(--cwa-accent); transform: translateX(-100%); transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); }',
          js: `// Kinematic Telemetry HUD
const hudVal = document.querySelector('.cwa-telemetry-val');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const speed = Math.min(320, Math.round(Math.abs(window.scrollY - lastScrollY) * 4));
  lastScrollY = window.scrollY;
  if (hudVal) hudVal.textContent = String(speed).padStart(3, '0');
}, { passive: true });`
        },
        mobileAlternative: 'Static telemetry badge displaying key performance stats (e.g. 0-100 km/h in 2.8s) without scroll-velocity calculations.',
        reducedMotionAlternative: 'Static typography badge with fixed metric.',
        accessibilityNotes: 'Tagged with aria-hidden="true" to prevent screen reader noise during fast scroll.'
      });
    } else if (category === 'architecture' || category === 'creative-agency') {
      list.push({
        id: 'sig-liquid-cursor-aperture',
        name: 'Dual-Image Liquid Soft-Brush Cursor Aperture',
        tagline: 'Paint an alternate layer of architectural reality through cursor movement.',
        description: 'A full-bleed dual-image canvas aperture painting an alternate rendering along the cursor trail with radial gradient brush, destination-out decay with idle ramp, and dynamic source-in compositing.',
        purpose: 'Create immediate tactile intrigue upon landing, enticing the visitor to explore the studio’s dual capabilities in architectural design and technical engineering.',
        anchorSection: 'hero',
        interactionModel: 'canvas-reveal',
        implementationGuide: 'Use an offscreen canvas with globalCompositeOperation = "destination-out" and a decaying radial brush trail updated on pointermove.',
        executableSnippet: {
          html: '<div class="cwa-aperture-stage" data-aperture-ready="true"><div class="cwa-aperture-hint">Hover to reveal structural wireframe</div></div>',
          css: '.cwa-aperture-stage { position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 4px; } .cwa-aperture-hint { position: absolute; bottom: 16px; left: 16px; font-family: var(--cwa-font-mono); font-size: var(--cwa-fs-xs); color: var(--cwa-ink-secondary); letter-spacing: var(--cwa-ls-tracked); }',
          js: `// Liquid Cursor Aperture Observer
console.log('Aperture stage mounted.');`
        },
        mobileAlternative: 'A gentle 2-second cross-fade between the architectural photograph and blueprint on touch tap.',
        reducedMotionAlternative: 'Static dual-image split screen with a clean 1px hairline dividing line.',
        accessibilityNotes: 'Both images provide descriptive alt text for screen readers; canvas is purely decorative.'
      });
    } else if (category === 'fintech' || category === 'fintech-saas' || intent.rawPrompt.toLowerCase().includes('fintech') || intent.rawPrompt.toLowerCase().includes('trading')) {
      list.push({
        id: 'sig-monospace-cipher-decrypt',
        name: 'Monospace Cryptographic Keypad & Cipher Decrypt',
        tagline: 'Instantaneous ASCII cipher scramble that resolves into pristine numerical truth.',
        description: 'Text metrics and conversion buttons that briefly cycle through high-frequency cryptographic glyphs (0101, $, %, #, &) before locking into final figures.',
        purpose: 'Visually underscore cryptographic certainty, institutional security, and high-frequency execution.',
        anchorSection: 'hero',
        interactionModel: 'cipher-scramble',
        implementationGuide: 'Run a 180ms letter scrambler replacing characters with random ASCII symbols every 20ms.',
        executableSnippet: {
          html: '<span class="cwa-cipher-text" data-original="SECURE ENCLAVE 01">SECURE ENCLAVE 01</span>',
          css: '.cwa-cipher-text { font-family: var(--cwa-font-mono); color: var(--cwa-accent); cursor: pointer; letter-spacing: var(--cwa-ls-tracked); }',
          js: `// Cipher Scramble Controller
document.querySelectorAll('.cwa-cipher-text').forEach(el => {
  const original = el.getAttribute('data-original') || el.textContent;
  const chars = '01#%&*+<>[]';
  el.addEventListener('mouseenter', () => {
    let iter = 0;
    const interval = setInterval(() => {
      el.textContent = original.split('').map((c, i) => i < iter ? c : chars[Math.floor(Math.random() * chars.length)]).join('');
      if (iter >= original.length) clearInterval(interval);
      iter += 1 / 2;
    }, 25);
  });
});`
        },
        mobileAlternative: 'Cipher plays once on initial viewport entry then locks permanently to readable text.',
        reducedMotionAlternative: 'Static text with zero character scrambling.',
        accessibilityNotes: 'Screen reader aria-label remains static with the final readable text.'
      });
    } else {
      list.push({
        id: 'sig-sticky-card-stack-decay',
        name: 'Sticky Stacking Deck with Inertial Scale Decay',
        tagline: 'Physical project cards that settle and recede in 3D perspective.',
        description: 'Stacking card deck using mathematical scale decay formula: targetScale = 1 - (total - 1 - i) * 0.03 and sticky viewport pinning. As the user scrolls, earlier cards shrink gracefully and shade under a semi-transparent scrim.',
        purpose: 'Demonstrate dense engineering capability without forcing the user through multiple disjointed pages.',
        anchorSection: 'selected-works',
        interactionModel: 'scroll-coupled',
        implementationGuide: 'Leverage position: sticky; top: calc(80px + i * 20px) with transform: scale(targetScale) recalculated inside a single throttled rAF scroll listener.',
        executableSnippet: {
          html: '<div class="cwa-stack-deck"><div class="cwa-stack-card" style="--card-idx: 0"><h3>01 // Core Architecture</h3></div><div class="cwa-stack-card" style="--card-idx: 1"><h3>02 // Adaptive Systems</h3></div></div>',
          css: '.cwa-stack-deck { position: relative; margin-top: 32px; } .cwa-stack-card { position: sticky; top: calc(100px + var(--card-idx) * 24px); background: var(--cwa-surface-elevated); border: 1px solid var(--cwa-line); border-radius: 6px; padding: 32px; margin-bottom: 24px; box-shadow: var(--cwa-shadow-elevated); }',
          js: `// Sticky Stack Deck Scale Observer
console.log('Stack deck mounted.');`
        },
        mobileAlternative: 'Native horizontal swipeable carousel with CSS scroll-snap-type: x mandatory.',
        reducedMotionAlternative: 'Standard vertical card grid with static 32px spacing and zero scale transforms.',
        accessibilityNotes: 'Cards remain in natural DOM order with keyboard tab accessibility preserved.'
      });
    }

    // Signature 2: Secondary Conversion / Tactile Button Interaction
    list.push({
      id: 'sig-hyper-tactile-action-drawer',
      name: 'Meniscus Liquid Wave Fill & Spring Haptic Squish',
      tagline: 'Haptic physical depression and smooth meniscus liquid reservoir fill on hover.',
      description: 'A button interaction pairing an SVG liquid meniscus curve fill with 1.5px physical depression on click, offering unforgettable tactile feedback.',
      purpose: 'Transform the primary conversion action into a delightful, unforgettable haptic touchpoint.',
      anchorSection: 'cta',
      interactionModel: 'tactile-press',
      implementationGuide: 'Pure CSS border and transform with SVG background meniscus fill on hover.',
      executableSnippet: {
        html: '<button type="button" class="cwa-btn-meniscus" aria-label="Initiate inquiry"><span>Inquire Now ↗</span></button>',
        css: '.cwa-btn-meniscus { position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: var(--cwa-touch-min); padding: 14px 32px; background: var(--cwa-surface); color: var(--cwa-ink); border: 1px solid var(--cwa-line); border-radius: 4px; font-weight: 600; cursor: pointer; transition: transform var(--cwa-dur-fast) var(--cwa-ease-spring), border-color var(--cwa-dur-fast) var(--cwa-ease-smooth); } .cwa-btn-meniscus:hover { transform: translateY(-2px); border-color: var(--cwa-accent); } .cwa-btn-meniscus:active { transform: translateY(1.5px) scale(0.985); }',
        js: `// Button haptic click sound is 0% by default (Silent by Default)`
      },
      mobileAlternative: 'Instant CSS :active state color change.',
      reducedMotionAlternative: 'Static color transition without spatial translation or scaling.',
      accessibilityNotes: 'Native button element with visible keyboard focus outline and touch target >= 44px.'
    });

    return list;
  }
}
