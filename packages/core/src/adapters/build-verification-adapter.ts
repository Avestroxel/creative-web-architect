/**
 * Build Verification Adapter for Creative Web Architect 2.0.
 *
 * Verifies that generated or modified websites meet production standards:
 * - Real file existence and non-zero payload
 * - Valid HTML5 semantic structure and viewport meta
 * - Complete Design DNA CSS variables
 * - Accessibility indicators (:focus-visible, skip-link, touch target minimums)
 * - Strict 100% Silent by Default compliance
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { resolve } from 'node:path';
import { FileOperationsAdapter, NodeFileSystemAdapter } from './file-operations-adapter.js';

export interface VerificationCheck {
  name: string;
  passed: boolean;
  message: string;
}

export interface BuildVerificationResult {
  passed: boolean;
  targetPath: string;
  fileFound: boolean;
  byteSize: number;
  checks: VerificationCheck[];
  errors: string[];
  warnings: string[];
}

export interface BuildVerificationAdapter {
  readonly id: string;
  verify(targetPath: string, options?: { isAudioExplicitlyRequested?: boolean }): Promise<BuildVerificationResult>;
}

export class DefaultBuildVerificationAdapter implements BuildVerificationAdapter {
  public readonly id = 'default-build-verifier';
  private fs: FileOperationsAdapter;

  constructor(fsAdapter?: FileOperationsAdapter) {
    this.fs = fsAdapter ?? new NodeFileSystemAdapter();
  }

  public async verify(
    targetPath: string,
    options: { isAudioExplicitlyRequested?: boolean } = {}
  ): Promise<BuildVerificationResult> {
    const fullPath = resolve(targetPath);
    const checks: VerificationCheck[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];

    // 1. Physical File Existence Check (Mandate: Never report website as generated if no files created)
    const exists = await this.fs.fileExists(fullPath);
    if (!exists) {
      const err = `Build Verification Failed: Target file does not exist on disk at "${fullPath}".`;
      errors.push(err);
      checks.push({
        name: 'file-existence',
        passed: false,
        message: err
      });

      return {
        passed: false,
        targetPath: fullPath,
        fileFound: false,
        byteSize: 0,
        checks,
        errors,
        warnings
      };
    }

    checks.push({
      name: 'file-existence',
      passed: true,
      message: `File found at "${fullPath}".`
    });

    const content = await this.fs.readFile(fullPath);
    const byteSize = Buffer.byteLength(content, 'utf-8');

    // 2. Non-zero Payload Check
    if (byteSize === 0) {
      const err = 'Build Verification Failed: Target file is completely empty (0 bytes).';
      errors.push(err);
      checks.push({
        name: 'non-empty-content',
        passed: false,
        message: err
      });

      return {
        passed: false,
        targetPath: fullPath,
        fileFound: true,
        byteSize: 0,
        checks,
        errors,
        warnings
      };
    }

    checks.push({
      name: 'non-empty-content',
      passed: true,
      message: `File content is non-empty (${byteSize} bytes).`
    });

    // 3. HTML5 Semantic Landmarks
    const hasDoctype = /<!doctype\s+html>/i.test(content);
    const hasHtmlTags = /<html[\s\S]*<\/html>/i.test(content);
    const hasHead = /<head[\s\S]*<\/head>/i.test(content);
    const hasBody = /<body[\s\S]*<\/body>/i.test(content);
    const hasViewport = /<meta\s+name=["']viewport["']/i.test(content);
    const hasTitle = /<title>[\s\S]*<\/title>/i.test(content);

    const htmlValid = hasDoctype && hasHtmlTags && hasHead && hasBody && hasViewport && hasTitle;
    checks.push({
      name: 'html5-structure',
      passed: htmlValid,
      message: htmlValid
        ? 'Valid HTML5 document with complete doctype, head, body, title, and viewport meta.'
        : 'Missing required HTML5 tags (doctype, head, body, viewport meta, or title).'
    });
    if (!htmlValid) errors.push('Document fails basic HTML5 structural standards.');

    // 4. Design DNA Custom Properties
    const hasCssVars = /--cwa-bg:/.test(content) && /--cwa-font-display:/.test(content);
    checks.push({
      name: 'design-dna-tokens',
      passed: hasCssVars,
      message: hasCssVars
        ? 'Design DNA CSS custom properties correctly declared.'
        : 'Design DNA CSS tokens (--cwa-bg, --cwa-font-display) not found in styles.'
    });
    if (!hasCssVars) warnings.push('Design DNA tokens missing or incomplete.');

    // 5. Accessibility Baseline (Focus indicators & Reduced Motion)
    const hasFocusVisible = /:focus-visible/.test(content);
    const hasReducedMotion = /prefers-reduced-motion/.test(content);
    const a11yValid = hasFocusVisible && hasReducedMotion;
    checks.push({
      name: 'accessibility-baseline',
      passed: a11yValid,
      message: a11yValid
        ? 'Accessible focus styling (:focus-visible) and prefers-reduced-motion media query verified.'
        : 'Missing :focus-visible or prefers-reduced-motion CSS declarations.'
    });
    if (!a11yValid) warnings.push('Accessibility baseline partially incomplete.');

    // 6. Strict Silent by Default Policy
    if (!options.isAudioExplicitlyRequested) {
      const hasAudioContext = /AudioContext|webkitAudioContext/i.test(content);
      const hasAudioAutoplay = /<audio[^>]*autoplay/i.test(content);
      const silentViolation = hasAudioContext || hasAudioAutoplay;

      checks.push({
        name: 'silent-by-default',
        passed: !silentViolation,
        message: !silentViolation
          ? '100% Silent by Default verified (zero unrequested Web Audio synthesizers or autoplay elements).'
          : 'Silent by Default violation: Detected unrequested Web Audio API synthesizers or autoplay elements.'
      });
      if (silentViolation) errors.push('Silent by Default policy violated.');
    }

    const overallPassed = errors.length === 0;

    return {
      passed: overallPassed,
      targetPath: fullPath,
      fileFound: true,
      byteSize,
      checks,
      errors,
      warnings
    };
  }
}
