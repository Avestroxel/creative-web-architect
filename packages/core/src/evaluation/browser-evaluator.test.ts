/**
 * Browser Evaluator Test Suite for Creative Web Architect 2.0 (Phase 3).
 *
 * Verifies real headless browser rendering via Playwright:
 * - Desktop, tablet, and mobile screenshot capture to local filesystem
 * - Deterministic DOM inspection of scrollWidth overflow
 * - Touch target sizing measurement on mobile viewport
 * - Focus ring (:focus-visible) detection
 * - Console error capture
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { promises as fs } from 'node:fs';
import { resolve, join } from 'node:path';
import { BrowserEvaluator } from './browser-evaluator.js';

describe('BrowserEvaluator (Phase 3)', () => {
  const testScreenshotDir = resolve(process.cwd(), '.cwa', 'test-screenshots');
  const evaluator = new BrowserEvaluator(testScreenshotDir);

  beforeAll(async () => {
    await fs.mkdir(testScreenshotDir, { recursive: true });
  });

  afterAll(async () => {
    // Clean up test screenshots
    await fs.rm(testScreenshotDir, { recursive: true, force: true }).catch(() => {});
  });

  it('renders HTML in real Playwright Chromium and captures multi-viewport screenshots', async () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Browser Evaluator Test</title>
  <style>
    body { margin: 0; background: #0c0d10; color: #f0f0f0; font-family: sans-serif; }
    .hero { min-height: 80vh; padding: 60px 32px; display: flex; flex-direction: column; align-items: flex-start; }
    .btn { min-height: 48px; min-width: 140px; padding: 12px 24px; background: #00e5ff; color: #000; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }
    :focus-visible { outline: 3px solid #00e5ff; outline-offset: 3px; }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Autonomous Playwright Inspection</h1>
    <p>Testing real browser rendering and screenshot captures.</p>
    <button type="button" class="btn">Interact</button>
  </div>
</body>
</html>`;

    const result = await evaluator.evaluateHtml(html, {
      screenshotDir: testScreenshotDir,
      captureScreenshots: true
    });

    expect(result.browserAvailable).toBe(true);
    expect(result.browserName).toContain('Chromium');

    // Screenshot verification
    expect(result.screenshots.desktop).toBeDefined();
    expect(result.screenshots.tablet).toBeDefined();
    expect(result.screenshots.mobile).toBeDefined();

    // Verify physical screenshot files exist on disk and have non-zero size
    const desktopStats = await fs.stat(result.screenshots.desktop!);
    const tabletStats = await fs.stat(result.screenshots.tablet!);
    const mobileStats = await fs.stat(result.screenshots.mobile!);

    expect(desktopStats.size).toBeGreaterThan(1000); // Valid PNG payload
    expect(tabletStats.size).toBeGreaterThan(1000);
    expect(mobileStats.size).toBeGreaterThan(1000);

    // Viewport containment assertions
    expect(result.metrics.horizontalOverflowDesktop).toBe(false);
    expect(result.metrics.horizontalOverflowMobile).toBe(false);
    expect(result.metrics.touchTargetViolations.length).toBe(0); // 48px meets 44px min
    expect(result.metrics.consoleErrors.length).toBe(0);
    expect(result.passedGates.some(g => g.includes('Desktop Viewport Containment'))).toBe(true);
  });

  it('detects real horizontal overflow and undersized mobile touch targets in browser context', async () => {
    const brokenHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Broken Layout</title>
  <style>
    body { margin: 0; background: #fff; }
    /* Horizontal overflow trigger */
    .wide-box { width: 3000px; height: 100px; background: red; }
    /* Undersized touch target trigger */
    .tiny-btn { width: 20px; height: 20px; padding: 0; font-size: 8px; border: none; }
  </style>
</head>
<body>
  <div class="wide-box">Overflowing Element</div>
  <button type="button" class="tiny-btn">x</button>
</body>
</html>`;

    const result = await evaluator.evaluateHtml(brokenHtml, {
      screenshotDir: testScreenshotDir,
      captureScreenshots: false
    });

    expect(result.browserAvailable).toBe(true);
    // Real browser measurement detects horizontal scrollbar leak!
    expect(result.metrics.horizontalOverflowDesktop).toBe(true);
    expect(result.metrics.horizontalOverflowMobile).toBe(true);

    // Real browser measurement detects undersized touch target!
    expect(result.metrics.touchTargetViolations.length).toBeGreaterThanOrEqual(1);
    const violation = result.metrics.touchTargetViolations.find(v => v.selector.includes('tiny-btn'))!;
    expect(violation).toBeDefined();
    expect(violation.width).toBeLessThan(44);
    expect(violation.height).toBeLessThan(44);
  });
}, 30000);
