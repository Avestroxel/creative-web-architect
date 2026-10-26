/**
 * Website Implementation Engine for Creative Web Architect 2.0.
 *
 * Translates Creative Concept, Design DNA, and Motion Intelligence Plans into physical,
 * production-grade web implementations.
 *
 * Enforces:
 * - Strict Design DNA token preservation in CSS custom properties
 * - HTML5 semantic hierarchy and keyboard accessibility (:focus-visible, skip-link, >=44px touch targets)
 * - Cohesive signature experience embedding
 * - Device-aware reduced-motion guards (@media (prefers-reduced-motion: reduce))
 * - Project preservation during targeted modifications
 * - Physical file verification through BuildVerificationAdapter
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { resolve } from 'node:path';
import { StructuredIntent } from '../intelligence/intent-engine.js';
import { CreativeConcept } from '../creativity/concept-generator.js';
import { DesignDNASpec, DesignDNASystem } from '../creativity/design-dna.js';
import { MotionPlan } from '../creativity/motion-intelligence.js';
import { SignatureExperienceSpec } from '../creativity/signature-experience.js';
import {
  FileOperationsAdapter,
  NodeFileSystemAdapter,
  ProjectScaffoldingAdapter,
  DefaultProjectScaffoldingAdapter,
  BuildVerificationAdapter,
  DefaultBuildVerificationAdapter,
  ProjectStack,
  ScaffoldResult,
  BuildVerificationResult
} from '../adapters/index.js';

export interface WebsiteImplementationOptions {
  targetDir?: string;
  targetFilePath?: string;
  projectName?: string;
  stack?: ProjectStack;
  isModification?: boolean;
  modificationType?: 'update-design-dna' | 'replace-section' | 'inject-signature' | 'full-update';
  targetSectionId?: string;
  fsAdapter?: FileOperationsAdapter;
  scaffolder?: ProjectScaffoldingAdapter;
  buildVerifier?: BuildVerificationAdapter;
  cognitiveDirectivesCss?: string;
}

export interface WebsiteImplementationResult {
  success: boolean;
  generatedHtml: string;
  scaffoldResult: ScaffoldResult;
  verificationResult: BuildVerificationResult;
  stack: ProjectStack;
  entryPoint: string;
  filesCreated: string[];
  filesModified: string[];
}

export class WebsiteImplementationEngine {
  private dnaSystem = new DesignDNASystem();

  /**
   * Implements a complete website or executes a targeted modification.
   */
  public async implement(
    intent: StructuredIntent,
    concept: CreativeConcept,
    dna: DesignDNASpec,
    motion: MotionPlan,
    signatures: SignatureExperienceSpec[],
    options: WebsiteImplementationOptions = {}
  ): Promise<WebsiteImplementationResult> {
    const fs = options.fsAdapter ?? new NodeFileSystemAdapter();
    const scaffolder = options.scaffolder ?? new DefaultProjectScaffoldingAdapter(fs);
    const buildVerifier = options.buildVerifier ?? new DefaultBuildVerificationAdapter(fs);

    const stack: ProjectStack = options.stack ?? 'standalone-html';
    const targetDir = resolve(options.targetDir ?? process.cwd());
    const projectName = options.projectName ?? dna.projectName ?? 'cwa-project';

    // 1. Generate Complete Production HTML
    const generatedHtml = this.generateMarkup(intent, concept, dna, motion, signatures, options.cognitiveDirectivesCss);
    const cssVariables = this.dnaSystem.toCSSVariables(dna);

    let scaffoldResult: ScaffoldResult;

    // 2. Physical File Generation / Modification via Adapter
    if (options.isModification && options.targetFilePath) {
      scaffoldResult = await scaffolder.modifyExistingProject({
        targetFilePath: options.targetFilePath,
        modificationType: options.modificationType ?? 'full-update',
        newContent: generatedHtml,
        newDesignDNA: dna,
        newCssVariables: cssVariables,
        signatureExperience: signatures[0],
        targetSectionId: options.targetSectionId
      });
    } else {
      scaffoldResult = await scaffolder.scaffoldNewProject({
        targetDir,
        projectName,
        stack,
        htmlContent: generatedHtml,
        designDNA: dna,
        motionPlan: motion,
        signatureExperiences: signatures,
        cssVariables
      });
    }

    // 3. Physical Build & Structure Verification
    const verificationResult = await buildVerifier.verify(scaffoldResult.entryPoint, {
      isAudioExplicitlyRequested: intent.rawPrompt.toLowerCase().includes('audio') || intent.rawPrompt.toLowerCase().includes('sound')
    });

    if (!verificationResult.passed) {
      throw new Error(
        `Website implementation failed build verification: ${verificationResult.errors.join(', ')}`
      );
    }

    return {
      success: true,
      generatedHtml,
      scaffoldResult,
      verificationResult,
      stack,
      entryPoint: scaffoldResult.entryPoint,
      filesCreated: scaffoldResult.filesCreated,
      filesModified: scaffoldResult.filesModified
    };
  }

  /**
   * Generates production-grade HTML5 markup embedding Design DNA, motion styles, and signature interactions.
   */
  public generateMarkup(
    intent: StructuredIntent,
    concept: CreativeConcept,
    dna: DesignDNASpec,
    motion: MotionPlan,
    signatures: SignatureExperienceSpec[],
    cognitiveCss?: string
  ): string {
    const cssVars = this.dnaSystem.toCSSVariables(dna);
    const heroSig = signatures[0];
    const buttonSig = signatures[1];

    const sigHtml = heroSig?.executableSnippet?.html ?? '';
    const sigCss = heroSig?.executableSnippet?.css ?? '';
    const sigJs = heroSig?.executableSnippet?.js ?? '';

    const buttonSigCss = buttonSig?.executableSnippet?.css ?? '';
    const buttonSigJs = buttonSig?.executableSnippet?.js ?? '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${intent.industry} — ${dna.tagline}</title>
  <meta name="description" content="${intent.businessPurpose}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
${cssVars}

:root {
  --cwa-touch-min: ${dna.responsiveBehavior.touchTargetMinPx}px;
${cognitiveCss || ''}
}

  /* Reset & Baseline */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    background-color: var(--cwa-bg);
    color: var(--cwa-ink);
    font-family: var(--cwa-font-body);
    font-size: 16px;
    line-height: var(--cwa-lh-base);
    letter-spacing: var(--cwa-ls-normal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* Skip Link for Accessibility */
  .skip-link {
    position: absolute;
    top: -100px;
    left: 20px;
    background: var(--cwa-accent);
    color: #ffffff;
    padding: 12px 24px;
    z-index: 9999;
    font-weight: 600;
    text-decoration: none;
    border-radius: 4px;
    transition: top var(--cwa-dur-fast) var(--cwa-ease-smooth);
  }
  .skip-link:focus {
    top: 20px;
  }

  /* Accessible Focus Indicators */
  :focus-visible {
    outline: 2px solid var(--cwa-accent);
    outline-offset: 3px;
  }

  /* Structural Containers */
  .cwa-container {
    width: 100%;
    max-width: var(--cwa-container);
    margin: 0 auto;
    padding: 0 var(--cwa-gutter);
  }

  /* Sticky Navigation Chrome */
  .cwa-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px var(--cwa-gutter);
    background: rgba(10, 11, 14, 0.75);
    backdrop-filter: blur(var(--cwa-blur));
    -webkit-backdrop-filter: blur(var(--cwa-blur));
    border-bottom: 1px solid var(--cwa-line);
  }

  .cwa-brand {
    font-family: var(--cwa-font-display);
    font-size: var(--cwa-fs-lg);
    font-weight: 700;
    letter-spacing: var(--cwa-ls-tight);
    color: var(--cwa-ink);
    text-decoration: none;
  }

  .cwa-nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
  }

  .cwa-nav-link {
    font-size: var(--cwa-fs-sm);
    color: var(--cwa-ink-secondary);
    text-decoration: none;
    transition: color var(--cwa-dur-fast) var(--cwa-ease-smooth);
  }
  .cwa-nav-link:hover {
    color: var(--cwa-ink);
  }

  /* Monolithic Hero Section */
  .cwa-hero {
    position: relative;
    padding: var(--cwa-section-padding) 0;
    min-height: 80vh;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--cwa-line);
  }

  .cwa-kicker {
    display: inline-block;
    font-family: var(--cwa-font-mono);
    font-size: var(--cwa-fs-xs);
    letter-spacing: var(--cwa-ls-tracked);
    text-transform: uppercase;
    color: var(--cwa-accent);
    margin-bottom: 16px;
  }

  .cwa-title {
    font-family: var(--cwa-font-display);
    font-size: var(--cwa-fs-5xl);
    line-height: var(--cwa-lh-tight);
    letter-spacing: var(--cwa-ls-tight);
    margin-bottom: 24px;
    max-width: 14ch;
  }

  .cwa-lead {
    font-size: var(--cwa-fs-lg);
    color: var(--cwa-ink-secondary);
    max-width: var(--cwa-measure);
    margin-bottom: 40px;
  }

  /* Tactile Button Foundry */
  .cwa-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--cwa-touch-min);
    min-width: 140px;
    padding: 14px 32px;
    background: var(--cwa-surface-elevated);
    color: var(--cwa-ink);
    font-family: var(--cwa-font-body);
    font-size: var(--cwa-fs-base);
    font-weight: 600;
    text-decoration: none;
    border: 1px solid var(--cwa-line);
    border-radius: 4px;
    box-shadow: var(--cwa-shadow-tactile);
    cursor: pointer;
    transition: transform var(--cwa-dur-fast) var(--cwa-ease-spring), border-color var(--cwa-dur-fast) var(--cwa-ease-smooth);
  }

  .cwa-btn-primary:hover {
    transform: translateY(-2px);
    border-color: var(--cwa-accent);
  }

  .cwa-btn-primary:active {
    transform: translateY(1.5px) scale(0.985);
  }

  /* Bento Slate Grid */
  .cwa-section {
    padding: var(--cwa-section-padding) 0;
    border-bottom: 1px solid var(--cwa-line);
  }

  .cwa-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--cwa-gutter);
    margin-top: 48px;
  }

  .cwa-card {
    grid-column: span 6;
    background: var(--cwa-surface);
    border: 1px solid var(--cwa-line);
    border-radius: 6px;
    padding: 36px;
    box-shadow: var(--cwa-shadow-subtle);
    transition: transform var(--cwa-dur-fast) var(--cwa-ease-spring), border-color var(--cwa-dur-fast) var(--cwa-ease-smooth);
  }

  .cwa-card:hover {
    transform: translateY(-4px);
    border-color: var(--cwa-accent);
    box-shadow: var(--cwa-shadow-elevated);
  }

  .cwa-card h3 {
    font-family: var(--cwa-font-display);
    font-size: var(--cwa-fs-2xl);
    margin-bottom: 12px;
  }

  .cwa-card p {
    color: var(--cwa-ink-secondary);
    font-size: var(--cwa-fs-base);
    line-height: var(--cwa-lh-relaxed);
  }

  /* Footer */
  .cwa-footer {
    padding: 60px 0;
    background: var(--cwa-surface);
    border-top: 1px solid var(--cwa-line);
    text-align: center;
    font-size: var(--cwa-fs-sm);
    color: var(--cwa-ink-secondary);
  }

  /* Signature Interactions Styling */
${sigCss}
${buttonSigCss}

  /* Responsive Rules */
  @media (max-width: 900px) {
    .cwa-card {
      grid-column: span 12;
    }
    .cwa-title {
      font-size: var(--cwa-fs-4xl);
    }
  }

  /* Accessibility Reduced Motion Gate */
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Header Navigation -->
  <header class="cwa-nav">
    <a href="#" class="cwa-brand">${intent.industry}</a>
    <ul class="cwa-nav-links">
      <li><a href="#overview" class="cwa-nav-link">Overview</a></li>
      <li><a href="#works" class="cwa-nav-link">Works</a></li>
      <li><a href="#contact" class="cwa-nav-link">Contact</a></li>
    </ul>
  </header>

  <main id="main-content">
    <!-- Hero Section -->
    <section class="cwa-hero">
      <div class="cwa-container">
        <span class="cwa-kicker">// ${concept.archetypeInspirations.join(' • ')}</span>
        <h1 class="cwa-title">${dna.tagline}</h1>
        <p class="cwa-lead">${intent.businessPurpose}</p>
        <button class="cwa-btn-primary" type="button" aria-label="Explore collection">
          <span>Explore Works ↗</span>
        </button>
        ${sigHtml}
      </div>
    </section>

    <!-- Architecture Section -->
    <section class="cwa-section" id="overview">
      <div class="cwa-container">
        <span class="cwa-kicker">// DESIGN ARCHITECTURE</span>
        <h2 style="font-family: var(--cwa-font-display); font-size: var(--cwa-fs-3xl); margin-bottom: 16px;">
          Form Follows Purpose
        </h2>
        <p style="color: var(--cwa-ink-secondary); max-width: 60ch;">
          ${dna.layout.philosophy}
        </p>

        <div class="cwa-grid">
          <div class="cwa-card">
            <span class="cwa-kicker">01 // MATERIALITY</span>
            <h3>${dna.materials.surfaceStyle}</h3>
            <p>Every surface is rendered with subtle tactile depth, avoiding cheap oversaturated glowing effects in favor of quiet architectural craft.</p>
          </div>
          <div class="cwa-card">
            <span class="cwa-kicker">02 // SIGNATURE KINEMATICS</span>
            <h3>${heroSig?.name ?? 'Liquid Kinetic Aperture'}</h3>
            <p>${heroSig?.description ?? 'Tactile spring-damped physics applied to cursor and scroll progression with zero layout shift.'}</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="cwa-footer">
    <div class="cwa-container">
      <p>Created by Anas Hashim. Creative Web Architect 2.0 Engine. 100% Silent by Default.</p>
    </div>
  </footer>

  <script>
${sigJs}
${buttonSigJs}
  </script>
</body>
</html>`;
  }
}
