import { describe, it, expect } from 'vitest';
import {
  REFINED_VISUAL_POLICY,
  PREMIUM_DARK_PALETTE,
  PREMIUM_LIGHT_PALETTE,
  auditCSSVisualQuality,
} from './visual-policy.js';

describe('Refined Visual Policy & Anti-Pattern Detection', () => {
  it('disallows neon glow by default in policy', () => {
    expect(REFINED_VISUAL_POLICY.allowNeonGlow).toBe(false);
    expect(REFINED_VISUAL_POLICY.maxDropShadowBlur).toBeLessThanOrEqual(32);
    expect(REFINED_VISUAL_POLICY.maxBackdropBlur).toBeLessThanOrEqual(28);
  });

  it('defines refined matte charcoal palettes for premium dark mode', () => {
    expect(PREMIUM_DARK_PALETTE.bgBase).toBe('#0C0D12');
    expect(PREMIUM_DARK_PALETTE.bgSurface).toBe('#14161F');
    expect(PREMIUM_DARK_PALETTE.textPrimary).toBe('#F3F4F6');
    expect(PREMIUM_DARK_PALETTE.borderSubtle).toContain('0.07');
  });

  it('detects and flags excessive neon box-shadows', () => {
    const cheapCSS = `
      .card {
        box-shadow: 0 0 60px #00F0FF;
        background: #000;
      }
    `;
    const audit = auditCSSVisualQuality(cheapCSS);
    expect(audit.passed).toBe(false);
    expect(audit.score).toBeLessThan(100);
    expect(audit.issues.some((i) => i.type === 'excessive-glow')).toBe(true);
  });

  it('detects and flags excessive backdrop-filter blur (>48px)', () => {
    const blurryCSS = `
      .glass {
        backdrop-filter: blur(64px);
      }
    `;
    const audit = auditCSSVisualQuality(blurryCSS);
    expect(audit.passed).toBe(false);
    expect(audit.issues.some((i) => i.type === 'blurry-glass')).toBe(true);
  });

  it('passes clean, refined architectural styling with 100/100 score', () => {
    const refinedCSS = `
      .card {
        background: #14161F;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        color: #F3F4F6;
      }
    `;
    const audit = auditCSSVisualQuality(refinedCSS);
    expect(audit.passed).toBe(true);
    expect(audit.score).toBe(100);
    expect(audit.issues).toHaveLength(0);
  });

  it('supports justified vibrant neon and brutalist policies contextually', () => {
    const cyberpunkCSS = `
      .hud-card {
        border: 1px solid #00FFFF;
        color: #00F0FF;
      }
    `;
    // Under default policy, uncalibrated pure cyan is flagged
    const defaultAudit = auditCSSVisualQuality(cyberpunkCSS);
    expect(defaultAudit.passed).toBe(false);

    // Under justified-neon context, it is allowed
    const justifiedAudit = auditCSSVisualQuality(cyberpunkCSS, { allowJustifiedVibrancy: true });
    expect(justifiedAudit.passed).toBe(true);
    expect(justifiedAudit.activePolicy.styleId).toBe('justified-neon');
  });
});
