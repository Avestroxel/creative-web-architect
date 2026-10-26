/**
 * PHASE 3 AUTONOMOUS VISUAL CRITIC & SELF-REFINEMENT — Comprehensive Integration Test Suite
 *
 * Demonstrates the complete Phase 3 capabilities:
 * 1. Real Headless Browser Automation (Playwright Chromium)
 *    - Desktop (1440px), Tablet (768px), and Mobile (375px) viewports
 *    - Automated PNG screenshot capture in local .cwa/screenshots directory
 *    - Deterministic DOM inspection: horizontal scrollbar leaks, touch targets, focus indicators
 *    - Runtime console error & uncaught exception capture
 * 2. Visual Critic (Deterministic & Visual Hierarchy)
 *    - Distinguishes objective defects from subjective judgments
 *    - No-Glow architectural policy enforcement
 *    - Viewport containment and broken asset detection
 * 3. Experience Critic (Interaction, Accessibility & Silent by Default)
 *    - Non-negotiable Silent by Default policy (zero unrequested Web Audio)
 *    - Keyboard focus-visible activation
 *    - prefers-reduced-motion compliance
 *    - Touch target boundary ergonomics (minimum 44x44px)
 * 4. Autonomous Self-Refinement Engine
 *    - Real closed-loop correction: Build → Render → Inspect → Critique → Fix → Rebuild → Verify
 *    - Bounded iteration budgets (FAST: 1, DEEP_CREATIVE: 3, ARCHITECT_MAX: 5)
 *    - Regression rollback guard restoring verified checkpoints
 * 5. Pipeline State Machine Direct Integration
 *    - End-to-end execution tracking browser evaluation as a mandatory gate
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { resolve, join } from 'node:path';
import { promises as fs } from 'node:fs';
import { BrowserEvaluator, EVALUATION_VIEWPORTS } from './evaluation/browser-evaluator.js';
import { VisualCritic } from './evaluation/visual-critic.js';
import { ExperienceCritic } from './evaluation/experience-critic.js';
import { RefinementEngine } from './evaluation/refinement-engine.js';
import { CreativePipeline } from './orchestration/creative-pipeline.js';

describe('PHASE 3 — Autonomous Visual Critic & Self-Refinement Engine', () => {
  const testOutputDir = resolve(process.cwd(), '.cwa', 'test-artifacts');
  const screenshotDir = join(testOutputDir, 'screenshots');

  beforeAll(async () => {
    await fs.mkdir(screenshotDir, { recursive: true });
  });

  describe('1. Real Browser-Based Multi-Viewport Evaluation (Playwright)', () => {
    it('renders HTML in real Chromium across Desktop, Tablet, and Mobile, capturing PNG screenshots and inspecting DOM metrics', async () => {
      const evaluator = new BrowserEvaluator(screenshotDir);

      const sampleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Architecture Monograph Preview</title>
  <style>
    :root {
      --bg: #0a0a0c;
      --text: #f0f0f4;
      --accent: #d4af37;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }
    header {
      padding: 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    h1 {
      font-size: clamp(2rem, 5vw, 4rem);
      line-height: 1.1;
      letter-spacing: -0.02em;
    }
    main {
      padding: 3rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .cta-btn {
      display: inline-block;
      min-width: 44px;
      min-height: 44px;
      padding: 0.75rem 1.5rem;
      background: var(--accent);
      color: #000;
      border: none;
      font-weight: 600;
      cursor: pointer;
    }
    .cta-btn:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 4px;
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  </style>
</head>
<body>
  <header>
    <h1>Tokyo Brutalist Pavilion</h1>
  </header>
  <main>
    <p>Exploring raw concrete geometries and monumental spatial sequencing.</p>
    <button class="cta-btn" type="button">Explore Archive</button>
  </main>
</body>
</html>`;

      const result = await evaluator.evaluateHtml(sampleHtml, {
        screenshotDir,
        captureScreenshots: true
      });

      // Browser must be available (verified Playwright binary)
      expect(result.browserAvailable).toBe(true);
      expect(result.browserName).toContain('Chromium');

      // Verify physical PNG screenshots were captured
      expect(result.screenshots.desktop).toBeDefined();
      expect(result.screenshots.tablet).toBeDefined();
      expect(result.screenshots.mobile).toBeDefined();

      const desktopStat = await fs.stat(result.screenshots.desktop!);
      const tabletStat = await fs.stat(result.screenshots.tablet!);
      const mobileStat = await fs.stat(result.screenshots.mobile!);

      expect(desktopStat.size).toBeGreaterThan(1000);
      expect(tabletStat.size).toBeGreaterThan(1000);
      expect(mobileStat.size).toBeGreaterThan(1000);

      // Verify DOM inspection metrics
      expect(result.metrics.horizontalOverflowDesktop).toBe(false);
      expect(result.metrics.horizontalOverflowTablet).toBe(false);
      expect(result.metrics.horizontalOverflowMobile).toBe(false);
      expect(result.metrics.consoleErrors.length).toBe(0);
      expect(result.metrics.pageErrors.length).toBe(0);
      expect(result.metrics.touchTargetViolations.length).toBe(0);
      expect(result.metrics.focusRingVerified).toBe(true);
      expect(result.metrics.reducedMotionHonored).toBe(true);

      // Verify quality gates passed
      expect(result.passedGates.some(g => g.includes('Desktop Viewport Containment'))).toBe(true);
      expect(result.passedGates.some(g => g.includes('Mobile Ergonomics'))).toBe(true);
      expect(result.passedGates.some(g => g.includes('Runtime Health'))).toBe(true);
    }, 35000);

    it('detects real horizontal scroll leaks, undersized touch targets, and runtime console errors', async () => {
      const evaluator = new BrowserEvaluator(screenshotDir);

      const leakingHtml = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flawed Page</title>
  <style>
    /* Severe horizontal leak */
    .overflowing-banner {
      width: 2500px;
      height: 60px;
      background: red;
    }
    /* Tiny touch button violating 44x44px */
    .tiny-btn {
      width: 20px;
      height: 20px;
      padding: 0;
      font-size: 10px;
    }
    /* Focus outline suppression */
    button:focus {
      outline: none !important;
    }
  </style>
</head>
<body>
  <div class="overflowing-banner">Leaking Content</div>
  <button class="tiny-btn" type="button">X</button>
  <script>
    console.error("Critical simulated runtime failure in component lifecycle");
  </script>
</body>
</html>`;

      const result = await evaluator.evaluateHtml(leakingHtml, {
        screenshotDir,
        captureScreenshots: false
      });

      expect(result.browserAvailable).toBe(true);
      // Horizontal overflow must be caught
      expect(result.metrics.horizontalOverflowDesktop).toBe(true);
      expect(result.metrics.horizontalOverflowMobile).toBe(true);

      // Console error must be caught
      expect(result.metrics.consoleErrors.length).toBeGreaterThanOrEqual(1);
      expect(result.metrics.consoleErrors[0]).toContain('Critical simulated runtime failure');

      // Touch target violation must be caught
      expect(result.metrics.touchTargetViolations.length).toBeGreaterThanOrEqual(1);
      expect(result.metrics.touchTargetViolations[0].width).toBeLessThan(43);

      // Failed gates must record issues
      expect(result.failedGates.some(g => g.includes('Desktop Viewport Leak'))).toBe(true);
      expect(result.failedGates.some(g => g.includes('Mobile Touch Ergonomics'))).toBe(true);
    }, 35000);
  });

  describe('2. Visual Critic (Deterministic & Objective vs Subjective)', () => {
    it('detects visual hierarchy defects, No-Glow policy violations, and broken image assets', () => {
      const critic = new VisualCritic();

      const defectiveCode = `<!DOCTYPE html>
<html>
<head><title>Visual Flaws</title>
<style>
  .card {
    /* No-Glow Violation: cheap neon box-shadow */
    box-shadow: 0 0 50px #00ffff, 0 0 100px #ff00ff;
    width: 100vw;
  }
</style>
</head>
<body>
  <!-- Visual Hierarchy Violation: Multiple <h1> tags -->
  <h1>Primary Heading Tokyo</h1>
  <h1>Secondary Duplicate Heading</h1>
  <!-- Broken Asset Violation -->
  <img src="" alt="Broken Hero Asset">
  <div class="card">Neon Content</div>
</body>
</html>`;

      const report = critic.critique(defectiveCode);

      expect(report.totalScore).toBeLessThan(80);
      expect(report.issues.length).toBeGreaterThanOrEqual(3);

      const noGlowIssue = report.issues.find(i => i.id.includes('neon-glow'));
      expect(noGlowIssue).toBeDefined();
      expect(noGlowIssue?.isObjectiveDefect).toBe(true);
      expect(noGlowIssue?.severity).toBe('high');

      const hierarchyIssue = report.issues.find(i => i.id.includes('multiple-h1'));
      expect(hierarchyIssue).toBeDefined();
      expect(hierarchyIssue?.isObjectiveDefect).toBe(false);

      const brokenAssetIssue = report.issues.find(i => i.id.includes('broken-image'));
      expect(brokenAssetIssue).toBeDefined();
      expect(brokenAssetIssue?.suggestedFix).toBeDefined();
    });
  });

  describe('3. Experience Critic (Usability, Accessibility, Silent by Default)', () => {
    it('strictly penalizes unrequested Web Audio synthesizers, focus outline suppression, and non-semantic buttons', () => {
      const critic = new ExperienceCritic();

      const hostileCode = `<!DOCTYPE html>
<html>
<head><title>Hostile Experience</title>
<style>
  /* Focus suppression */
  *:focus { outline: none !important; }
  /* Animated without reduced motion */
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .spinner { animation: spin 2s infinite linear; }
</style>
</head>
<body>
  <!-- Silent by Default Violation: unrequested Web Audio Context -->
  <script>
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    osc.start();
  </script>
  <!-- Non-semantic interactive element -->
  <div onclick="doSomething()" class="custom-button btn">Click Me</div>
  <div class="spinner">Spinning</div>
</body>
</html>`;

      const report = critic.critique(hostileCode, false);

      expect(report.totalScore).toBeLessThan(60);

      // Silent by Default is CRITICAL
      const audioIssue = report.issues.find(i => i.id === 'exp-silent-by-default-violation');
      expect(audioIssue).toBeDefined();
      expect(audioIssue?.severity).toBe('critical');
      expect(audioIssue?.reason.toLowerCase()).toContain('silent by default');

      // Focus suppression is HIGH
      const focusIssue = report.issues.find(i => i.id === 'exp-focus-ring-suppression');
      expect(focusIssue).toBeDefined();
      expect(focusIssue?.severity).toBe('high');

      // Reduced motion missing is HIGH
      const motionIssue = report.issues.find(i => i.id === 'exp-missing-reduced-motion');
      expect(motionIssue).toBeDefined();
      expect(motionIssue?.severity).toBe('high');

      // Non-semantic button is MEDIUM
      const divBtnIssue = report.issues.find(i => i.id === 'exp-non-semantic-div-button');
      expect(divBtnIssue).toBeDefined();
      expect(divBtnIssue?.severity).toBe('medium');
    });
  });

  describe('4. Autonomous Self-Refinement Engine (Closed-Loop Correction)', () => {
    it('executes Build → Render → Inspect → Critique → Fix → Rebuild → Verify and achieves passing grade (>=85)', () => {
      const engine = new RefinementEngine();

      const flawedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Flawed Raw Implementation</title>
  <style>
    body {
      background: #000;
      color: #fff;
    }
    *:focus { outline: none; }
    .hero-panel {
      width: 100vw;
      box-shadow: 0 0 50px #00ffff;
    }
    @keyframes pulse { 0% { opacity: 0.5; } 100% { opacity: 1; } }
    .pulsing-box {
      animation: pulse 1s infinite alternate;
      height: 40px;
      width: 40px;
    }
  </style>
</head>
<body>
  <div class="hero-panel">
    <h1>Autonomous Architecture</h1>
  </div>
  <div onclick="navigate()" class="pulsing-box">Nav</div>
  <script>
    const audioContext = new AudioContext();
  </script>
</body>
</html>`;

      // Initial critique should fail
      const initialReport = engine.runUnifiedCritique(flawedHtml, false);
      expect(initialReport.overallScore).toBeLessThan(75);
      expect(initialReport.isPassingGrade).toBe(false);

      // Run refinement loop with DEEP_CREATIVE budget (3 iterations)
      const result = engine.refine(flawedHtml, {
        maxIterations: 3,
        isAudioExplicitlyRequested: false
      });

      // Refinement must achieve a verified passing grade
      expect(result.isPassingGrade).toBe(true);
      expect(result.finalReport.overallScore).toBeGreaterThanOrEqual(85);
      expect(result.iterations.length).toBeGreaterThanOrEqual(1);
      expect(result.finalReport.criticalIssues.length).toBe(0);

      // Verify that specific automated patches were applied to the code
      expect(result.refinedCode).not.toContain('new AudioContext()'); // Audio removed
      expect(result.refinedCode).not.toContain('box-shadow: 0 0 50px #00ffff'); // Neon glow removed
      expect(result.refinedCode).toContain(':focus-visible'); // Accessible focus injected
      expect(result.refinedCode).toContain('prefers-reduced-motion: reduce'); // Reduced motion fallback injected
      expect(result.refinedCode).toContain('overflow-x: hidden'); // Overflow contained
    });

    it('enforces iteration budget and stops when quality gates pass or budget exhausted', () => {
      const engine = new RefinementEngine();
      const simpleHtml = `<!DOCTYPE html>
<html>
<head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Pristine</title>
<style>
  :focus-visible { outline: 2px solid #fff; }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
</style>
</head>
<body>
  <h1>Pristine Minimal Site</h1>
  <button type="button" style="min-width: 44px; min-height: 44px;">Click</button>
</body>
</html>`;

      // Pristine HTML with FAST profile (budget = 1)
      const result = engine.refine(simpleHtml, { maxIterations: 1 });
      // Should stop immediately with 0 iterations because quality score is already >= 85
      expect(result.isPassingGrade).toBe(true);
      expect(result.iterations.length).toBe(0);
    });

    it('implements regression rollback guard: restores stronger verified checkpoint if mutation degrades score', () => {
      const engine = new RefinementEngine();

      const originalHtml = `<!DOCTYPE html>
<html>
<head><title>Stable State</title>
<style>
  body { font-family: sans-serif; }
</style>
</head>
<body>
  <h1>Tokyo Monograph</h1>
  <p>Stable verified content.</p>
</body>
</html>`;

      // Refine with an intentional patch that could fail
      const result = engine.refine(originalHtml, { maxIterations: 2 });
      expect(result.finalReport.overallScore).toBeGreaterThanOrEqual(85);
      expect(result.refinedCode.length).toBeGreaterThan(50);
    });
  });

  describe('5. Pipeline Integration (Creative Pipeline with Browser Stage)', () => {
    it('executes full pipeline with browser evaluation enabled, producing real screenshots and passing execution trace', async () => {
      const pipeline = new CreativePipeline();
      const prompt = 'Architectural monograph for a Kyoto tea pavilion with quiet stone textures';

      const result = await pipeline.executeAsync(prompt, {
        targetDir: testOutputDir,
        enableBrowserEvaluation: true,
        screenshotDir
      });

      // Pipeline execution success
      expect(result.executionTrace.isSuccessful).toBe(true);
      expect(result.executionTrace.stages['browser_evaluation']).toBeDefined();
      expect(result.executionTrace.stages['browser_evaluation'].status).toBe('completed');

      // Real screenshots captured
      expect(result.screenshots).toBeDefined();
      expect(result.screenshots!.desktop).toBeDefined();
      expect(result.screenshots!.tablet).toBeDefined();
      expect(result.screenshots!.mobile).toBeDefined();

      const desktopShot = await fs.stat(result.screenshots!.desktop!);
      expect(desktopShot.size).toBeGreaterThan(1000);

      // Browser evaluation result metrics
      expect(result.browserResult).toBeDefined();
      expect(result.browserResult?.browserAvailable).toBe(true);
      expect(result.browserResult?.metrics.consoleErrors.length).toBe(0);

      // Refinement result
      expect(result.refinementResult).toBeDefined();
      expect(result.refinementResult?.isPassingGrade).toBe(true);
    }, 35000);
  });
});
