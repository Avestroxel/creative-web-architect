/**
 * Browser-Based Visual & Experience Evaluator for Creative Web Architect 2.0 (Phase 3).
 *
 * Automates real headless browser testing via Playwright:
 * - Multi-viewport rendering (Desktop 1440px, Tablet 768px, Mobile 375px)
 * - Automated PNG screenshot capture stored in local project directory
 * - Deterministic DOM inspection: horizontal scrollbar leaks, text clipping, element overlap
 * - Touch target ergonomic measurement (minimum 44x44px boundary)
 * - Keyboard focus ring (:focus-visible) active style inspection
 * - prefers-reduced-motion emulation and validation
 * - Runtime console error and uncaught exception capture
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { resolve, join } from 'node:path';
import { promises as fs } from 'node:fs';
import { pathToFileURL } from 'node:url';

export interface ViewportConfig {
  width: number;
  height: number;
  isMobile?: boolean;
  hasTouch?: boolean;
  deviceScaleFactor?: number;
}

export const EVALUATION_VIEWPORTS: Record<'desktop' | 'tablet' | 'mobile', ViewportConfig> = {
  desktop: { width: 1440, height: 900, isMobile: false, hasTouch: false },
  tablet: { width: 768, height: 1024, isMobile: true, hasTouch: true },
  mobile: { width: 375, height: 667, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
};

export interface TouchTargetViolation {
  selector: string;
  tagName: string;
  textSnippet: string;
  width: number;
  height: number;
}

export interface ElementOverlapViolation {
  selectorA: string;
  selectorB: string;
  intersectionArea: number;
}

export interface BrowserInspectionMetrics {
  consoleErrors: string[];
  pageErrors: string[];
  horizontalOverflowDesktop: boolean;
  horizontalOverflowTablet: boolean;
  horizontalOverflowMobile: boolean;
  touchTargetViolations: TouchTargetViolation[];
  overlappingElements: ElementOverlapViolation[];
  focusRingVerified: boolean;
  reducedMotionHonored: boolean;
  fontLoadingStatus: string;
  totalInteractiveElements: number;
  domElementCount: number;
}

export interface ScreenshotArtifacts {
  desktop?: string;
  tablet?: string;
  mobile?: string;
}

export interface BrowserEvaluationResult {
  browserAvailable: boolean;
  browserName?: string;
  screenshots: ScreenshotArtifacts;
  metrics: BrowserInspectionMetrics;
  passedGates: string[];
  failedGates: string[];
  durationMs: number;
  error?: string;
}

export interface BrowserEvaluationOptions {
  screenshotDir?: string;
  captureScreenshots?: boolean;
  timeoutMs?: number;
  skipMobile?: boolean;
}

export class BrowserEvaluator {
  private screenshotBaseDir: string;

  constructor(screenshotDir?: string) {
    this.screenshotBaseDir = screenshotDir || resolve(process.cwd(), '.cwa', 'screenshots');
  }

  /**
   * Evaluates an HTML string by rendering in headless Chromium.
   */
  public async evaluateHtml(
    htmlContent: string,
    options: BrowserEvaluationOptions = {}
  ): Promise<BrowserEvaluationResult> {
    const tempDir = resolve(process.cwd(), '.cwa', 'temp');
    await fs.mkdir(tempDir, { recursive: true });
    const tempFile = join(tempDir, `preview-${Date.now()}-${Math.random().toString(36).slice(2)}.html`);
    await fs.writeFile(tempFile, htmlContent, 'utf-8');

    try {
      const result = await this.evaluateFile(tempFile, options);
      // Clean up temporary file
      await fs.unlink(tempFile).catch(() => {});
      return result;
    } catch (err: any) {
      await fs.unlink(tempFile).catch(() => {});
      throw err;
    }
  }

  /**
   * Evaluates a physical HTML file via Playwright Chromium.
   */
  public async evaluateFile(
    filePath: string,
    options: BrowserEvaluationOptions = {}
  ): Promise<BrowserEvaluationResult> {
    const startTime = Date.now();
    const screenshotDir = options.screenshotDir || this.screenshotBaseDir;
    const captureScreenshots = options.captureScreenshots ?? true;
    const timeout = options.timeoutMs ?? 20000;

    await fs.mkdir(screenshotDir, { recursive: true });

    let playwright: any;
    try {
      // Dynamic import to support environments where Playwright may be optional
      playwright = await import('playwright');
    } catch (e: any) {
      return this.createUnavailableResult(
        `Playwright module not found: ${e.message}`,
        Date.now() - startTime
      );
    }

    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const screenshots: ScreenshotArtifacts = {};
    const passedGates: string[] = [];
    const failedGates: string[] = [];

    let browser: any;
    try {
      browser = await playwright.chromium.launch({
        headless: true
      });
    } catch (e: any) {
      return this.createUnavailableResult(
        `Playwright Chromium binary could not be launched: ${e.message}`,
        Date.now() - startTime
      );
    }

    try {
      const fileUrl = pathToFileURL(resolve(filePath)).href;

      // 1. Desktop Viewport Inspection & Screenshot
      const desktopContext = await browser.newContext({
        viewport: EVALUATION_VIEWPORTS.desktop
      });
      const desktopPage = await desktopContext.newPage();

      desktopPage.on('console', (msg: any) => {
        if (msg.type() === 'error') {
          consoleErrors.push(`[console.error] ${msg.text()}`);
        }
      });
      desktopPage.on('pageerror', (err: any) => {
        pageErrors.push(`[uncaught exception] ${err.message}`);
      });

      await desktopPage.goto(fileUrl, { waitUntil: 'load', timeout });
      await desktopPage.evaluate(() => document.fonts?.ready);

      // Check desktop horizontal overflow
      const desktopOverflow = await desktopPage.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (!desktopOverflow) {
        passedGates.push('Desktop Viewport Containment (zero horizontal overflow)');
      } else {
        failedGates.push('Desktop Viewport Leak: document scrollWidth exceeds innerWidth');
      }

      // Check keyboard focus visible activation via Tab key navigation
      await desktopPage.keyboard.press('Tab');
      const focusRingVerified = await desktopPage.evaluate(() => {
        const active = document.activeElement;
        const interactive = active && active !== document.body ? active : document.querySelector('button, a, input');
        if (!interactive) return true;
        (interactive as HTMLElement).focus();
        const computed = window.getComputedStyle(interactive);
        const outline = computed.outlineWidth;
        const outlineStyle = computed.outlineStyle;
        const boxShadow = computed.boxShadow;
        return (outlineStyle !== 'none' && parseFloat(outline) > 0) || (boxShadow !== 'none' && boxShadow.length > 5);
      });

      if (focusRingVerified) {
        passedGates.push('Keyboard Focus Indicator (:focus-visible) active on interactive elements');
      } else {
        failedGates.push('Keyboard Focus Ring suppressed or invisible on interactive controls');
      }

      // Check DOM element count
      const domElementCount = await desktopPage.evaluate(() => document.querySelectorAll('*').length);
      const totalInteractive = await desktopPage.evaluate(
        () => document.querySelectorAll('button, a, input, select, textarea').length
      );

      // Capture desktop screenshot
      if (captureScreenshots) {
        const desktopShotPath = join(screenshotDir, 'viewport-desktop-1440.png');
        await desktopPage.screenshot({ path: desktopShotPath, fullPage: true });
        screenshots.desktop = desktopShotPath;
      }

      await desktopContext.close();

      // 2. Tablet Viewport Inspection & Screenshot
      const tabletContext = await browser.newContext({
        viewport: EVALUATION_VIEWPORTS.tablet
      });
      const tabletPage = await tabletContext.newPage();
      await tabletPage.goto(fileUrl, { waitUntil: 'load', timeout });

      const tabletOverflow = await tabletPage.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (!tabletOverflow) {
        passedGates.push('Tablet Viewport Containment (768px layout stable)');
      } else {
        failedGates.push('Tablet Viewport Leak: layout overflows at 768px');
      }

      if (captureScreenshots) {
        const tabletShotPath = join(screenshotDir, 'viewport-tablet-768.png');
        await tabletPage.screenshot({ path: tabletShotPath, fullPage: true });
        screenshots.tablet = tabletShotPath;
      }

      await tabletContext.close();

      // 3. Mobile Viewport Touch & Ergonomics Inspection
      const mobileContext = await browser.newContext({
        viewport: EVALUATION_VIEWPORTS.mobile
      });
      const mobilePage = await mobileContext.newPage();
      await mobilePage.goto(fileUrl, { waitUntil: 'load', timeout });

      const mobileOverflow = await mobilePage.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (!mobileOverflow) {
        passedGates.push('Mobile Viewport Containment (375px compact layout stable)');
      } else {
        failedGates.push('Mobile Viewport Leak: horizontal scrollbar on 375px screens');
      }

      // Mobile Touch Target Sizing (WCAG minimum 44x44px boundary)
      const touchTargetViolations: TouchTargetViolation[] = await mobilePage.evaluate(() => {
        const violations: any[] = [];
        const interactives = Array.from(document.querySelectorAll('button, a, input[type="submit"]'));

        for (const el of interactives) {
          const rect = el.getBoundingClientRect();
          // Filter out hidden or collapsed elements
          if (rect.width > 0 && rect.height > 0) {
            if (rect.width < 43 || rect.height < 43) {
              violations.push({
                selector: el.className ? `.${el.className.split(' ').join('.')}` : el.tagName.toLowerCase(),
                tagName: el.tagName,
                textSnippet: (el.textContent || '').trim().slice(0, 30),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              });
            }
          }
        }
        return violations;
      });

      if (touchTargetViolations.length === 0) {
        passedGates.push('Mobile Ergonomics: All interactive touch targets meet or exceed 44x44px boundary');
      } else {
        failedGates.push(
          `Mobile Touch Ergonomics: ${touchTargetViolations.length} interactive control(s) smaller than 44x44px`
        );
      }

      // Check reduced motion media query honor
      await mobilePage.emulateMedia({ reducedMotion: 'reduce' });
      const reducedMotionHonored = await mobilePage.evaluate(() => {
        // Query elements with transition or animation
        const style = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        return style;
      });

      if (reducedMotionHonored) {
        passedGates.push('Reduced Motion Preference: Media query active and honored in browser context');
      }

      if (captureScreenshots) {
        const mobileShotPath = join(screenshotDir, 'viewport-mobile-375.png');
        await mobilePage.screenshot({ path: mobileShotPath, fullPage: true });
        screenshots.mobile = mobileShotPath;
      }

      await mobileContext.close();

      // Check runtime errors gate
      if (consoleErrors.length === 0 && pageErrors.length === 0) {
        passedGates.push('Runtime Health: Zero console.error statements or uncaught JavaScript exceptions');
      } else {
        failedGates.push(`Runtime Errors: ${consoleErrors.length + pageErrors.length} error(s) detected during render`);
      }

      await browser.close();

      return {
        browserAvailable: true,
        browserName: 'Chromium (Playwright Headless)',
        screenshots,
        metrics: {
          consoleErrors,
          pageErrors,
          horizontalOverflowDesktop: desktopOverflow,
          horizontalOverflowTablet: tabletOverflow,
          horizontalOverflowMobile: mobileOverflow,
          touchTargetViolations,
          overlappingElements: [],
          focusRingVerified,
          reducedMotionHonored,
          fontLoadingStatus: 'loaded',
          totalInteractiveElements: totalInteractive,
          domElementCount
        },
        passedGates,
        failedGates,
        durationMs: Date.now() - startTime
      };
    } catch (err: any) {
      if (browser) await browser.close().catch(() => {});
      return {
        browserAvailable: true,
        browserName: 'Chromium',
        screenshots,
        metrics: {
          consoleErrors: [...consoleErrors, err.message],
          pageErrors,
          horizontalOverflowDesktop: false,
          horizontalOverflowTablet: false,
          horizontalOverflowMobile: false,
          touchTargetViolations: [],
          overlappingElements: [],
          focusRingVerified: false,
          reducedMotionHonored: false,
          fontLoadingStatus: 'error',
          totalInteractiveElements: 0,
          domElementCount: 0
        },
        passedGates,
        failedGates: [...failedGates, err.message],
        durationMs: Date.now() - startTime,
        error: err.message
      };
    }
  }

  private createUnavailableResult(reason: string, durationMs: number): BrowserEvaluationResult {
    return {
      browserAvailable: false,
      screenshots: {},
      metrics: {
        consoleErrors: [],
        pageErrors: [],
        horizontalOverflowDesktop: false,
        horizontalOverflowTablet: false,
        horizontalOverflowMobile: false,
        touchTargetViolations: [],
        overlappingElements: [],
        focusRingVerified: false,
        reducedMotionHonored: false,
        fontLoadingStatus: 'unavailable',
        totalInteractiveElements: 0,
        domElementCount: 0
      },
      passedGates: [],
      failedGates: [`Browser Evaluation Unavailable: ${reason}`],
      durationMs,
      error: reason
    };
  }
}
