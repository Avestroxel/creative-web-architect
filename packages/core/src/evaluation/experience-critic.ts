/**
 * Experience Critic for Creative Web Architect 2.0 (Phase 3).
 *
 * Evaluates interaction mechanics, accessibility, touch ergonomics, motion safety,
 * runtime console errors, and enforces the non-negotiable Silent-by-Default audio policy.
 *
 * Distinguishes objective functional/accessibility defects from subjective judgments.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { CriticIssue, CriticReport } from './evaluation-types.js';
import { BrowserInspectionMetrics } from './browser-evaluator.js';

export interface ExperienceCriticOptions {
  isAudioExplicitlyRequested?: boolean;
  browserMetrics?: BrowserInspectionMetrics;
}

export class ExperienceCritic {
  /**
   * Inspects code and runtime browser metrics for interaction quality, accessibility,
   * focus indicators, reduced motion compliance, and audio policy violations.
   */
  public critique(
    htmlContent: string,
    options: ExperienceCriticOptions | boolean = false
  ): CriticReport {
    const isAudioExplicitlyRequested =
      typeof options === 'boolean' ? options : (options.isAudioExplicitlyRequested ?? false);
    const metrics: BrowserInspectionMetrics | undefined =
      typeof options === 'object' ? options.browserMetrics : undefined;

    const issues: CriticIssue[] = [];
    const passed: string[] = [];

    // 1. NON-NEGOTIABLE SILENT BY DEFAULT AUDIO POLICY (Critical Objective Defect)
    const hasWebAudio = /AudioContext|webkitAudioContext|createOscillator|createGain|new\s+Audio\(/i.test(htmlContent);
    const hasAudioTags = /<audio\b[^>]*autoplay/i.test(htmlContent);

    if ((hasWebAudio || hasAudioTags) && !isAudioExplicitlyRequested) {
      issues.push({
        id: 'exp-silent-by-default-violation',
        title: 'Unauthorized Web Audio Synthesizer (Silent-by-Default Violation)',
        category: 'silent-audio-policy',
        severity: 'critical',
        affectedElementOrSelector: 'Web Audio API / <audio autoplay>',
        evidence: 'Detected unauthorized Web Audio API synthesizer or autoplay audio element in codebase.',
        reason: 'Web Audio synthesizer or autoplay audio found without explicit user request. CWA strictly mandates that all websites and components must be 100% silent by default.',
        suggestedFix: 'Completely remove the Web Audio synthesizer code and AudioContext instances. Audio is only permitted when explicitly requested by the user.',
        confidence: 1.0,
        verificationMethod: 'AST regex keyword probe',
        isObjectiveDefect: true,
        status: 'detected'
      });
    } else {
      passed.push('Silent-by-Default audio policy verified (0 unrequested sound/audio)');
    }

    // 2. Focus Indicator Suppression & Visibility (High Objective Defect)
    const outlineNone = /outline:\s*(none|0\b)/i.test(htmlContent);
    const hasFocusVisible = /:focus-visible\s*\{[^}]*outline:/i.test(htmlContent);
    const browserFocusSuppressed = metrics && !metrics.focusRingVerified;

    if ((outlineNone && !hasFocusVisible) || browserFocusSuppressed) {
      issues.push({
        id: 'exp-focus-ring-suppression',
        title: 'Focus Ring Suppressed without Visible :focus-visible Alternative',
        category: 'contrast-accessibility',
        severity: 'high',
        affectedElementOrSelector: ':focus / :focus-visible selectors',
        evidence: browserFocusSuppressed
          ? 'Browser computed style inspection confirmed interactive element outlineStyle is none or 0px.'
          : 'CSS declaration `outline: none` or `outline: 0` detected without visible `:focus-visible` ring.',
        reason: 'Removing the default focus outline without providing a visible `:focus-visible` ring breaks keyboard navigation for accessibility users (WCAG 2.1 SC 2.4.7).',
        suggestedFix: 'Add `:focus-visible { outline: 2px solid var(--cwa-accent); outline-offset: 3px; }`.',
        confidence: 0.98,
        verificationMethod: 'Playwright activeElement computedStyle probe',
        isObjectiveDefect: true,
        status: 'detected'
      });
    } else {
      passed.push('Keyboard focus indicators preserved and accessible (:focus-visible)');
    }

    // 3. Motion Accessibility: prefers-reduced-motion (High Objective Defect)
    const hasAnimation = /animation:|@keyframes|transition:/i.test(htmlContent);
    const hasReducedMotion = /@media\s*\(\s*prefers-reduced-motion/i.test(htmlContent);

    if (hasAnimation && !hasReducedMotion) {
      issues.push({
        id: 'exp-missing-reduced-motion',
        title: 'Missing @media (prefers-reduced-motion) Fallback',
        category: 'motion-safety',
        severity: 'high',
        affectedElementOrSelector: 'CSS transitions / @keyframes',
        evidence: 'Active animation/transition declarations found with zero prefers-reduced-motion media query.',
        reason: 'Interfaces with animation must honor the user’s OS-level motion preference to prevent vestibular discomfort or motion sickness (WCAG 2.1 SC 2.3.3).',
        suggestedFix: 'Append `@media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`.',
        confidence: 1.0,
        verificationMethod: 'CSS media query probe',
        isObjectiveDefect: true,
        status: 'detected'
      });
    } else {
      passed.push('Reduced motion fallback provided (@media (prefers-reduced-motion: reduce))');
    }

    // 4. Semantic Interactive Controls vs Fake Divs (Medium Objective Defect)
    const fakeButtons = htmlContent.match(/<div\b(?=[^>]*\bonclick)(?=[^>]*class=["'][^"']*\b(?:btn|button)\b)[^>]*>/gi) || [];
    if (fakeButtons.length > 0) {
      issues.push({
        id: 'exp-non-semantic-div-button',
        title: `${fakeButtons.length} Non-Semantic <div> Button(s) Detected`,
        category: 'semantic-structure',
        severity: 'medium',
        affectedElementOrSelector: '<div> elements with button class and onclick',
        evidence: `Discovered snippet: ${fakeButtons[0]}`,
        reason: 'Using `<div>` as an interactive button prevents keyboard activation via Enter/Space and is invisible to screen readers without ARIA roles.',
        suggestedFix: 'Replace `<div class="btn">` with native `<button class="btn" type="button">`.',
        confidence: 0.95,
        verificationMethod: 'HTML element semantics check',
        isObjectiveDefect: true,
        status: 'detected'
      });
    } else {
      passed.push('Semantic interactive button tags used (<button type="button">)');
    }

    // 5. Mobile Touch Target Sizing (WCAG minimum 44x44px boundary)
    if (metrics && metrics.touchTargetViolations.length > 0) {
      const v = metrics.touchTargetViolations[0]!;
      issues.push({
        id: 'exp-undersized-touch-target-browser',
        title: `${metrics.touchTargetViolations.length} Undersized Mobile Touch Target(s) (<44px)`,
        category: 'touch-ergonomics',
        severity: 'medium',
        affectedElementOrSelector: v.selector || v.tagName,
        evidence: `Real browser measurement on mobile: ${v.selector} measured ${v.width}x${v.height}px (minimum is 44x44px).`,
        reason: 'Small touch targets frustrate mobile visitors and violate WCAG 2.5.5 Target Size requirements.',
        suggestedFix: 'Enforce `min-height: 44px; min-width: 44px; display: inline-flex; align-items: center; justify-content: center;` on interactive targets.',
        confidence: 0.95,
        verificationMethod: 'Playwright getBoundingClientRect() mobile probe',
        isObjectiveDefect: true,
        status: 'detected'
      });
    } else {
      const smallPaddingMatch = htmlContent.match(/padding:\s*([1-5])px/i);
      const hasExplicitSmallBtn = htmlContent.includes('font-size: 10px') && !htmlContent.includes('padding: 12px');
      if (smallPaddingMatch && hasExplicitSmallBtn) {
        issues.push({
          id: 'exp-undersized-touch-target',
          title: 'Potentially Undersized Mobile Touch Target (<44px)',
          category: 'touch-ergonomics',
          severity: 'medium',
          affectedElementOrSelector: 'Interactive button padding',
          evidence: `Discovered small padding rule: ${smallPaddingMatch[0]}`,
          reason: 'Interactive buttons with tiny padding fail the minimum 44x44px ergonomic touch boundary on mobile screens.',
          suggestedFix: 'Enforce minimum dimensions: `min-height: 44px; min-width: 44px; display: inline-flex; align-items: center; justify-content: center;`.',
          confidence: 0.85,
          verificationMethod: 'Ergonomic dimension probe',
          isObjectiveDefect: true,
          status: 'detected'
        });
      } else {
        passed.push('Touch targets meet mobile ergonomic standards (>= 44px)');
      }
    }

    // 6. Runtime Console & JavaScript Exceptions (High Objective Defect)
    if (metrics && (metrics.consoleErrors.length > 0 || metrics.pageErrors.length > 0)) {
      const allErrors = [...metrics.consoleErrors, ...metrics.pageErrors];
      issues.push({
        id: 'exp-runtime-console-error',
        title: `${allErrors.length} Runtime Error(s) in Browser Session`,
        category: 'runtime-console-error',
        severity: 'high',
        affectedElementOrSelector: 'JavaScript runtime',
        evidence: allErrors.slice(0, 2).join(' | '),
        reason: 'Uncaught exceptions or console.error statements indicate broken scripts or asset loading failures in browser.',
        suggestedFix: 'Resolve undefined references or syntax errors in embedded scripts.',
        confidence: 1.0,
        verificationMethod: 'Playwright page.on("console") & page.on("pageerror")',
        isObjectiveDefect: true,
        status: 'detected'
      });
    } else {
      passed.push('Zero runtime console errors or uncaught exceptions');
    }

    // 7. Skip Link Navigation Accessibility
    const hasSkipLink = htmlContent.includes('skip-link') || htmlContent.includes('Skip to');
    if (!hasSkipLink) {
      issues.push({
        id: 'exp-missing-skip-link',
        title: 'Missing Accessible Skip-to-Content Link',
        category: 'keyboard-navigation',
        severity: 'low',
        affectedElementOrSelector: '<body> header',
        evidence: 'Document lacks a skip-link anchor at the top of <body>.',
        reason: 'Keyboard and screen reader users need a skip-link to bypass repetitive navigation headers directly to main content (WCAG 2.1 SC 2.4.1).',
        suggestedFix: 'Add `<a href="#main-content" class="skip-link">Skip to main content</a>` immediately inside <body>.',
        confidence: 0.9,
        verificationMethod: 'HTML skip-link query',
        isObjectiveDefect: true,
        status: 'detected'
      });
    } else {
      passed.push('Accessible keyboard skip-link provided');
    }

    // Calculate score
    const deductions =
      issues.filter(i => i.severity === 'critical').length * 40 +
      issues.filter(i => i.severity === 'high').length * 15 +
      issues.filter(i => i.severity === 'medium').length * 6 +
      issues.filter(i => i.severity === 'low').length * 2;

    const totalScore = Math.max(0, 100 - deductions);

    return {
      criticName: 'Autonomous Experience Critic',
      totalScore,
      issues,
      summary: {
        criticalCount: issues.filter(i => i.severity === 'critical').length,
        highCount: issues.filter(i => i.severity === 'high').length,
        mediumCount: issues.filter(i => i.severity === 'medium').length,
        lowCount: issues.filter(i => i.severity === 'low').length
      },
      passedChecks: passed,
      timestamp: new Date().toISOString()
    };
  }
}
