/**
 * Bounded Self-Refinement Engine for Creative Web Architect 2.0 (Phase 3).
 *
 * Implements the autonomous closed-loop refinement cycle:
 * Build → Render → Inspect → Critique → Prioritize → Fix → Rebuild → Verify.
 *
 * Enforces strict iteration budgets (FAST: 1, DEEP_CREATIVE: 3, ARCHITECT_MAX: 5),
 * prevents infinite loops, checkpoints verified states, and restores backups
 * if a patch introduces a score regression.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { promises as fs } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { CriticIssue, UnifiedCriticReport } from './evaluation-types.js';
import { VisualCritic } from './visual-critic.js';
import { ExperienceCritic } from './experience-critic.js';
import { BrowserEvaluator, BrowserEvaluationResult } from './browser-evaluator.js';

export interface RefinementIterationRecord {
  iteration: number;
  initialScore: number;
  postFixScore: number;
  issuesIdentified: number;
  issuesResolved: number;
  fixesApplied: string[];
  screenshotCaptured?: string;
  durationMs: number;
}

export interface RefinementResult {
  originalCode: string;
  refinedCode: string;
  initialReport: UnifiedCriticReport;
  finalReport: UnifiedCriticReport;
  initialScreenshots?: Record<string, string>;
  finalScreenshots?: Record<string, string>;
  iterations: RefinementIterationRecord[];
  totalIterations: number;
  scoreImprovement: number;
  isPassingGrade: boolean;
  stopReason: string;
  restoredFromCheckpoint?: boolean;
}

export interface RefinementOptions {
  maxIterations?: number;
  targetPassingScore?: number;
  isAudioExplicitlyRequested?: boolean;
  browserEvaluation?: boolean;
  screenshotDir?: string;
}

export class RefinementEngine {
  private visualCritic = new VisualCritic();
  private experienceCritic = new ExperienceCritic();
  private browserEvaluator = new BrowserEvaluator();

  /**
   * Evaluates code and runs bounded iterative refinement until quality standards
   * are verified or iteration limits are reached.
   */
  public refine(code: string, options: RefinementOptions = {}): RefinementResult {
    const maxIterations = options.maxIterations ?? 3;
    const targetScore = options.targetPassingScore ?? 85;
    const isAudioRequested = options.isAudioExplicitlyRequested ?? false;

    let currentCode = code;
    let bestCode = code;
    const iterations: RefinementIterationRecord[] = [];

    const initialReport = this.runUnifiedCritique(currentCode, isAudioRequested);
    let latestReport = initialReport;
    let bestScore = initialReport.overallScore;

    let stopReason = 'Target passing score achieved';

    for (let iter = 1; iter <= maxIterations; iter++) {
      if (latestReport.isPassingGrade && latestReport.overallScore >= targetScore) {
        stopReason = `Passing grade (${latestReport.overallScore}/100) achieved with zero critical or high issues.`;
        break;
      }

      if (latestReport.allIssues.length === 0) {
        stopReason = 'All automated critic checks passed cleanly.';
        break;
      }

      const startTime = Date.now();
      const preScore = latestReport.overallScore;

      // Apply targeted automated fixes
      const { updatedCode, appliedFixes } = this.applyTargetedFixes(currentCode, latestReport.allIssues);

      // Re-critique
      const postReport = this.runUnifiedCritique(updatedCode, isAudioRequested);
      const postScore = postReport.overallScore;
      const issuesResolved = Math.max(0, latestReport.allIssues.length - postReport.allIssues.length);

      // Regression Guard: If score drops or new critical issues appear, restore checkpoint!
      if (postScore < preScore || postReport.criticalIssues.length > latestReport.criticalIssues.length) {
        currentCode = bestCode;
        stopReason = 'Regression detected during patch application; restored previous verified checkpoint.';
        iterations.push({
          iteration: iter,
          initialScore: preScore,
          postFixScore: bestScore,
          issuesIdentified: latestReport.allIssues.length,
          issuesResolved: 0,
          fixesApplied: ['[REVERTED] Fixes discarded due to regression'],
          durationMs: Date.now() - startTime
        });
        break;
      }

      iterations.push({
        iteration: iter,
        initialScore: preScore,
        postFixScore: postScore,
        issuesIdentified: latestReport.allIssues.length,
        issuesResolved,
        fixesApplied: appliedFixes,
        durationMs: Date.now() - startTime
      });

      currentCode = updatedCode;
      latestReport = postReport;

      if (postScore > bestScore) {
        bestScore = postScore;
        bestCode = updatedCode;
      }

      // Diminishing returns check
      if (appliedFixes.length === 0 || postScore <= preScore) {
        stopReason = 'No further automated programmatic fixes can be safely applied without manual creative direction.';
        break;
      }

      if (iter === maxIterations) {
        stopReason = `Bounded iteration limit (${maxIterations}) reached.`;
      }
    }

    return {
      originalCode: code,
      refinedCode: currentCode,
      initialReport,
      finalReport: latestReport,
      iterations,
      totalIterations: iterations.length,
      scoreImprovement: latestReport.overallScore - initialReport.overallScore,
      isPassingGrade: latestReport.isPassingGrade,
      stopReason
    };
  }

  /**
   * Refines a physical HTML file on disk with real browser rendering and screenshot captures.
   */
  public async refineFile(filePath: string, options: RefinementOptions = {}): Promise<RefinementResult> {
    const fullPath = resolve(filePath);
    const initialContent = await fs.readFile(fullPath, 'utf-8');
    const isAudioRequested = options.isAudioExplicitlyRequested ?? false;
    const maxIterations = options.maxIterations ?? 3;
    const targetScore = options.targetPassingScore ?? 85;

    // Create automatic timestamped backup before refinement
    const backupPath = `${fullPath}.${Date.now()}.bak`;
    await fs.writeFile(backupPath, initialContent, 'utf-8');

    // Initial real browser evaluation
    let initialBrowserRes: BrowserEvaluationResult | undefined;
    let initialScreenshots: Record<string, string> = {};

    try {
      initialBrowserRes = await this.browserEvaluator.evaluateFile(fullPath, {
        screenshotDir: options.screenshotDir,
        captureScreenshots: true
      });
      if (initialBrowserRes.browserAvailable) {
        initialScreenshots = {
          desktop: initialBrowserRes.screenshots.desktop || '',
          tablet: initialBrowserRes.screenshots.tablet || '',
          mobile: initialBrowserRes.screenshots.mobile || ''
        };
      }
    } catch {
      // Browser evaluation fallback
    }

    const initialReport = this.runUnifiedCritique(initialContent, isAudioRequested, initialBrowserRes?.metrics);
    let latestReport = initialReport;
    let currentCode = initialContent;
    let bestCode = initialContent;
    let bestScore = initialReport.overallScore;
    const iterations: RefinementIterationRecord[] = [];
    let stopReason = 'Target passing score achieved';

    for (let iter = 1; iter <= maxIterations; iter++) {
      if (latestReport.isPassingGrade && latestReport.overallScore >= targetScore) {
        stopReason = `Passing grade (${latestReport.overallScore}/100) achieved with zero critical or high issues.`;
        break;
      }

      if (latestReport.allIssues.length === 0) {
        stopReason = 'All automated critic checks passed cleanly.';
        break;
      }

      const startTime = Date.now();
      const preScore = latestReport.overallScore;

      const { updatedCode, appliedFixes } = this.applyTargetedFixes(currentCode, latestReport.allIssues);

      // Write updated code back to disk
      await fs.writeFile(fullPath, updatedCode, 'utf-8');

      // Re-evaluate in browser
      let postBrowserRes: BrowserEvaluationResult | undefined;
      try {
        postBrowserRes = await this.browserEvaluator.evaluateFile(fullPath, {
          screenshotDir: options.screenshotDir,
          captureScreenshots: true
        });
      } catch {
        // Fallback
      }

      const postReport = this.runUnifiedCritique(updatedCode, isAudioRequested, postBrowserRes?.metrics);
      const postScore = postReport.overallScore;
      const issuesResolved = Math.max(0, latestReport.allIssues.length - postReport.allIssues.length);

      // Regression Check
      if (postScore < preScore || postReport.criticalIssues.length > latestReport.criticalIssues.length) {
        await fs.writeFile(fullPath, bestCode, 'utf-8');
        currentCode = bestCode;
        stopReason = 'Regression detected during patch application; restored previous verified checkpoint.';
        iterations.push({
          iteration: iter,
          initialScore: preScore,
          postFixScore: bestScore,
          issuesIdentified: latestReport.allIssues.length,
          issuesResolved: 0,
          fixesApplied: ['[REVERTED] Fixes discarded due to regression'],
          durationMs: Date.now() - startTime
        });
        break;
      }

      iterations.push({
        iteration: iter,
        initialScore: preScore,
        postFixScore: postScore,
        issuesIdentified: latestReport.allIssues.length,
        issuesResolved,
        fixesApplied: appliedFixes,
        screenshotCaptured: postBrowserRes?.screenshots.desktop,
        durationMs: Date.now() - startTime
      });

      currentCode = updatedCode;
      latestReport = postReport;

      if (postScore > bestScore) {
        bestScore = postScore;
        bestCode = updatedCode;
      }

      if (appliedFixes.length === 0 || postScore <= preScore) {
        stopReason = 'No further automated programmatic fixes can be safely applied without manual creative direction.';
        break;
      }

      if (iter === maxIterations) {
        stopReason = `Bounded iteration limit (${maxIterations}) reached.`;
      }
    }

    // Capture final screenshots
    let finalScreenshots: Record<string, string> = {};
    try {
      const finalBrowserRes = await this.browserEvaluator.evaluateFile(fullPath, {
        screenshotDir: options.screenshotDir,
        captureScreenshots: true
      });
      if (finalBrowserRes.browserAvailable) {
        finalScreenshots = {
          desktop: finalBrowserRes.screenshots.desktop || '',
          tablet: finalBrowserRes.screenshots.tablet || '',
          mobile: finalBrowserRes.screenshots.mobile || ''
        };
      }
    } catch {
      // Fallback
    }

    return {
      originalCode: initialContent,
      refinedCode: currentCode,
      initialReport,
      finalReport: latestReport,
      initialScreenshots,
      finalScreenshots,
      iterations,
      totalIterations: iterations.length,
      scoreImprovement: latestReport.overallScore - initialReport.overallScore,
      isPassingGrade: latestReport.isPassingGrade,
      stopReason
    };
  }

  /**
   * Runs both VisualCritic and ExperienceCritic and synthesizes a unified report.
   */
  public runUnifiedCritique(
    code: string,
    isAudioRequested = false,
    browserMetrics?: any
  ): UnifiedCriticReport {
    const visReport = this.visualCritic.critique(code, { browserMetrics });
    const expReport = this.experienceCritic.critique(code, {
      isAudioExplicitlyRequested: isAudioRequested,
      browserMetrics
    });

    const allIssues: CriticIssue[] = [...visReport.issues, ...expReport.issues];
    const passedChecks: string[] = [...visReport.passedChecks, ...expReport.passedChecks];

    const criticalIssues = allIssues.filter(i => i.severity === 'critical');
    const highIssues = allIssues.filter(i => i.severity === 'high');
    const mediumIssues = allIssues.filter(i => i.severity === 'medium');
    const lowIssues = allIssues.filter(i => i.severity === 'low');

    const overallScore = Math.round((visReport.totalScore * 0.45) + (expReport.totalScore * 0.55));
    const isPassingGrade = overallScore >= 85 && criticalIssues.length === 0 && highIssues.length === 0;

    let summaryRationale = `Overall Quality Score: ${overallScore}/100. `;
    if (criticalIssues.length > 0) {
      summaryRationale += `Blocked by ${criticalIssues.length} critical issue(s) (${criticalIssues[0]?.title}).`;
    } else if (highIssues.length > 0) {
      summaryRationale += `${highIssues.length} high priority issue(s) requiring remediation.`;
    } else {
      summaryRationale += 'All baseline visual, accessibility, and interaction constraints satisfied.';
    }

    return {
      overallScore,
      visualScore: visReport.totalScore,
      experienceScore: expReport.totalScore,
      criticalIssues,
      highIssues,
      mediumIssues,
      lowIssues,
      allIssues,
      passedChecks,
      isPassingGrade,
      summaryRationale
    };
  }

  /**
   * Applies non-destructive, targeted fixes for verified issues.
   */
  public applyTargetedFixes(code: string, issues: CriticIssue[]): { updatedCode: string; appliedFixes: string[] } {
    let modified = code;
    const appliedFixes: string[] = [];

    // 1. Remediate Silent-by-Default violation (strip unrequested audio)
    const hasAudioViolation = issues.some(i => i.id === 'exp-silent-by-default-violation');
    if (hasAudioViolation) {
      let audioCleaned = modified
        .replace(/<script\b[^>]*>[\s\S]*?(?:AudioContext|webkitAudioContext|createOscillator|createGain)[\s\S]*?<\/script>/gi, '<!-- Audio script removed under CWA Silent-by-Default policy -->')
        .replace(/const\s+\w+\s*=\s*new\s*\(?(?:window\.)?(?:AudioContext|webkitAudioContext)[\s\S]*?;/gi, '/* Audio synthesizer removed under CWA Silent-by-Default policy */')
        .replace(/<audio\b[^>]*autoplay[^>]*>[\s\S]*?<\/audio>/gi, '<!-- Autoplay audio removed under CWA Silent-by-Default policy -->');

      if (audioCleaned !== modified) {
        modified = audioCleaned;
        appliedFixes.push('Removed unauthorized Web Audio API synthesizer instances (Enforced Silent by Default)');
      }
    }

    // 2. Remediate missing prefers-reduced-motion
    const hasReducedMotionIssue = issues.some(i => i.id === 'exp-missing-reduced-motion');
    if (hasReducedMotionIssue && !modified.includes('prefers-reduced-motion: reduce')) {
      const reducedMotionBlock = `
/* CWA Accessibility Gate: Enforce OS Reduced Motion Preference */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;
      if (modified.includes('</style>')) {
        modified = modified.replace('</style>', `${reducedMotionBlock}\n</style>`);
        appliedFixes.push('Injected WCAG-compliant @media (prefers-reduced-motion: reduce) fallback');
      }
    }

    // 3. Remediate Focus Ring suppression
    const hasFocusIssue = issues.some(i => i.id === 'exp-focus-ring-suppression');
    if (hasFocusIssue && !modified.includes(':focus-visible')) {
      const focusVisibleBlock = `
/* CWA Accessibility Gate: Visible Keyboard Focus Indicators */
:focus-visible {
  outline: 2px solid var(--cwa-accent, #ffffff) !important;
  outline-offset: 3px !important;
}
`;
      if (modified.includes('</style>')) {
        modified = modified.replace('</style>', `${focusVisibleBlock}\n</style>`);
        appliedFixes.push('Injected accessible :focus-visible indicator styles');
      }
    }

    // 4. Remediate Horizontal Viewport Overflow (100vw or fixed width)
    const hasOverflowIssue = issues.some(i => i.id === 'vis-overflow-viewport' || i.id === 'vis-overflow-100vw' || i.id === 'vis-fixed-width-overflow');
    if (hasOverflowIssue && !modified.includes('overflow-x: hidden')) {
      const overflowGuard = `
/* CWA Responsive Guard: Prevent Horizontal Scrollbar Leaks */
html, body {
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}
`;
      if (modified.includes('</style>')) {
        modified = modified.replace('</style>', `${overflowGuard}\n</style>`);
        appliedFixes.push('Injected global horizontal overflow containment guards');
      }
    }

    // 5. Remediate Non-Semantic Div Buttons
    const hasNonSemanticDiv = issues.some(i => i.id === 'exp-non-semantic-div-button');
    if (hasNonSemanticDiv) {
      let updatedButtons = modified.replace(
        /<div\b([^>]*class=["'][^"']*\b(?:btn|button)\b[^"']*["'][^>]*)onclick=/gi,
        '<button type="button" $1 onclick='
      );
      updatedButtons = updatedButtons.replace(
        /<div\b([^>]*\bonclick=[^>]*class=["'][^"']*\b(?:btn|button)\b[^>]*)>/gi,
        '<button type="button" $1>'
      );
      if (updatedButtons !== modified) {
        modified = updatedButtons;
        appliedFixes.push('Refactored non-semantic <div> buttons to native <button type="button"> elements');
      }
    }

    // 6. Remediate Missing Skip Link
    const hasMissingSkipLink = issues.some(i => i.id === 'exp-missing-skip-link');
    if (hasMissingSkipLink && !modified.includes('skip-link')) {
      const skipLink = `\n  <a href="#main-content" class="skip-link">Skip to main content</a>`;
      modified = modified.replace(/<body[^>]*>/i, `$&${skipLink}`);
      appliedFixes.push('Injected accessible keyboard skip-to-content link');
    }

    // 7. Remediate Mobile Touch Target Sizing (<44px)
    const hasTouchTargetIssue = issues.some(i => i.id.startsWith('exp-undersized-touch-target'));
    if (hasTouchTargetIssue && !modified.includes('--cwa-touch-min')) {
      const touchTargetStyle = `
/* CWA Mobile Touch Ergonomics Gate */
button, a.cwa-btn-primary, .cwa-nav-link {
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
`;
      if (modified.includes('</style>')) {
        modified = modified.replace('</style>', `${touchTargetStyle}\n</style>`);
        appliedFixes.push('Enforced minimum 44x44px touch target ergonomics across interactive controls');
      }
    }

    // 8. Remediate Excessive Neon Glow Violation
    const hasNeonGlowIssue = issues.some(i => i.id === 'vis-excessive-neon-glow');
    if (hasNeonGlowIssue) {
      const glowCleaned = modified.replace(
        /box-shadow:[^;]*(0\s+0\s+(?:3[5-9]|[4-9]\d|\d{3,})px\s*[^;]+);?/gi,
        'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08);'
      );
      if (glowCleaned !== modified) {
        modified = glowCleaned;
        appliedFixes.push('Replaced excessive radio-active neon glow with refined hairline bevels (No-Glow Policy)');
      }
    }

    return { updatedCode: modified, appliedFixes };
  }
}
