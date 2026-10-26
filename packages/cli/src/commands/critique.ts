/**
 * `cwa critique <file>` — Runs autonomous Visual Critic, Experience Critic,
 * and Playwright Headless Browser Evaluation on an HTML deliverable.
 *
 * Inspects:
 * - Multi-viewport responsiveness (Desktop 1440px, Tablet 768px, Mobile 375px)
 * - Captures real PNG screenshots to project-local `.cwa/screenshots/`
 * - Layout containment & horizontal scrollbar leaks (scrollWidth > innerWidth)
 * - Mobile touch target ergonomics (WCAG minimum 44x44px boundary)
 * - Keyboard navigation focus indicators (:focus-visible)
 * - OS-level reduced motion preference compliance
 * - Strict Non-Negotiable Silent-by-Default audio policy
 * - Automated closed-loop remediation via Self-Refinement Engine when `--fix` is passed
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { readFileSync, existsSync } from 'node:fs';
import { RefinementEngine, BrowserEvaluator, UnifiedCriticReport } from '@cwa/core';
import { log, logHeader, logPair, logBlank, LogLevel } from '../utils/logger.js';

export interface CritiqueOptions {
  allowAudio?: boolean;
  verbose?: boolean;
  force?: boolean;
  dryRun?: boolean;
  fix?: boolean;
  browser?: boolean;
  iterations?: number;
}

export async function handleCritique(filePathArg?: string, options: CritiqueOptions = {}): Promise<void> {
  const targetFile = resolve(cwd(), filePathArg || 'index.html');

  if (!existsSync(targetFile)) {
    log(LogLevel.ERROR, `File not found: ${targetFile}`);
    return;
  }

  logHeader('Creative Web Architect 2.0 — Autonomous Quality Critic & Visual Evaluation');
  log(LogLevel.INFO, `Target File: ${targetFile}`);
  logBlank();

  const useBrowser = options.browser ?? true;
  const evaluator = new BrowserEvaluator();
  let browserReport: any;

  if (useBrowser) {
    log(LogLevel.INFO, 'Launching real headless Chromium to inspect responsive viewports...');
    browserReport = await evaluator.evaluateFile(targetFile);

    if (browserReport.browserAvailable) {
      log(LogLevel.SUCCESS, `✓ Browser automation active: ${browserReport.browserName} (${browserReport.durationMs}ms)`);

      logBlank();
      log(LogLevel.INFO, 'Captured Viewport Screenshots:');
      if (browserReport.screenshots.desktop) logPair('Desktop (1440x900)', browserReport.screenshots.desktop);
      if (browserReport.screenshots.tablet) logPair('Tablet (768x1024)', browserReport.screenshots.tablet);
      if (browserReport.screenshots.mobile) logPair('Mobile (375x667)', browserReport.screenshots.mobile);

      logBlank();
      log(LogLevel.INFO, 'Browser Runtime & DOM Ergonomics:');
      logPair('Horizontal Overflow Desktop', browserReport.metrics.horizontalOverflowDesktop ? 'LEAK DETECTED (scrollWidth > innerWidth)' : 'Clean (contained)');
      logPair('Horizontal Overflow Tablet', browserReport.metrics.horizontalOverflowTablet ? 'LEAK DETECTED' : 'Clean (contained)');
      logPair('Horizontal Overflow Mobile', browserReport.metrics.horizontalOverflowMobile ? 'LEAK DETECTED' : 'Clean (contained)');
      logPair('Focus Ring (:focus-visible)', browserReport.metrics.focusRingVerified ? 'Active & visible on keyboard Tab' : 'Suppressed / missing');
      logPair('Touch Target Violations (<44px)', `${browserReport.metrics.touchTargetViolations.length} element(s)`);
      logPair('Runtime Console Errors', `${browserReport.metrics.consoleErrors.length} error(s)`);

      if (browserReport.metrics.touchTargetViolations.length > 0) {
        for (const v of browserReport.metrics.touchTargetViolations.slice(0, 3)) {
          log(LogLevel.WARN, `  [Touch Target] ${v.selector || v.tagName} (${v.width}x${v.height}px) is below minimum 44x44px boundary`);
        }
      }
    } else {
      log(LogLevel.WARN, `Browser evaluation fell back to deterministic inspection: ${browserReport.error}`);
    }
  }

  logBlank();
  const engine = new RefinementEngine();

  if (options.fix) {
    log(LogLevel.INFO, 'Executing autonomous closed-loop Self-Refinement Engine (--fix enabled)...');
    const refinementResult = await engine.refineFile(targetFile, {
      maxIterations: options.iterations ?? 3,
      isAudioExplicitlyRequested: options.allowAudio ?? false
    });

    logPair('Initial Quality Score', `${refinementResult.initialReport.overallScore}/100`);
    logPair('Final Refined Score', `${refinementResult.finalReport.overallScore}/100`);
    logPair('Score Delta', `+${refinementResult.scoreImprovement} points`);
    logPair('Passing Grade', refinementResult.isPassingGrade ? 'PASSED (>= 85)' : 'REQUIRES_FURTHER_WORK');
    logPair('Correction Cycles', `${refinementResult.totalIterations} iteration(s)`);
    logPair('Refinement Verdict', refinementResult.stopReason);

    logBlank();
    log(LogLevel.INFO, 'Patches Applied to Source Code:');
    for (const iter of refinementResult.iterations) {
      log(LogLevel.INFO, `Iteration ${iter.iteration}:`);
      for (const fix of iter.fixesApplied) {
        log(LogLevel.SUCCESS, `  ✓ ${fix}`);
      }
    }

    if (refinementResult.finalScreenshots?.desktop) {
      logBlank();
      log(LogLevel.INFO, 'Updated Post-Refinement Screenshots:');
      if (refinementResult.finalScreenshots.desktop) logPair('Desktop', refinementResult.finalScreenshots.desktop);
      if (refinementResult.finalScreenshots.tablet) logPair('Tablet', refinementResult.finalScreenshots.tablet);
      if (refinementResult.finalScreenshots.mobile) logPair('Mobile', refinementResult.finalScreenshots.mobile);
    }
  } else {
    const content = readFileSync(targetFile, 'utf-8');
    const report: UnifiedCriticReport = engine.runUnifiedCritique(
      content,
      options.allowAudio ?? false,
      browserReport?.metrics
    );

    logPair('Overall Quality Score', `${report.overallScore}/100`);
    logPair('Visual Quality Score', `${report.visualScore}/100`);
    logPair('Experience Quality Score', `${report.experienceScore}/100`);
    logPair('Passing Grade', report.isPassingGrade ? 'PASSED (>= 85)' : 'FAILED (< 85)');

    logBlank();
    if (report.allIssues.length === 0) {
      log(LogLevel.SUCCESS, '✨ Zero defects identified! Site meets all Awwwards-grade visual & accessibility standards.');
    } else {
      log(LogLevel.WARN, `Identified ${report.allIssues.length} actionable finding(s):`);
      for (const issue of report.allIssues) {
        const defectType = issue.isObjectiveDefect ? 'OBJECTIVE DEFECT' : 'SUBJECTIVE CRITIQUE';
        log(LogLevel.WARN, `[${issue.severity.toUpperCase()} // ${defectType}] ${issue.title}`);
        log(LogLevel.INFO, `  Affected: ${issue.affectedElementOrSelector}`);
        log(LogLevel.INFO, `  Evidence: ${issue.evidence}`);
        log(LogLevel.INFO, `  Reason: ${issue.reason}`);
        log(LogLevel.INFO, `  Actionable Fix: ${issue.suggestedFix}`);
        log(LogLevel.INFO, `  Verification: ${issue.verificationMethod}`);
      }
      logBlank();
      log(LogLevel.INFO, 'Tip: Run `cwa critique --fix` to autonomously apply verified code patches and re-evaluate.');
    }

    logBlank();
    log(LogLevel.INFO, 'Verified Passing Checks:');
    for (const check of report.passedChecks) {
      log(LogLevel.SUCCESS, `  ✓ ${check}`);
    }
  }
}
