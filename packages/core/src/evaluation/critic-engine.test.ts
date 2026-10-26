import { describe, it, expect } from 'vitest';
import { VisualCritic } from './visual-critic.js';
import { ExperienceCritic } from './experience-critic.js';

describe('Autonomous Critics (VisualCritic & ExperienceCritic)', () => {
  const visualCritic = new VisualCritic();
  const experienceCritic = new ExperienceCritic();

  it('detects horizontal overflow risks (100vw without overflow guard)', () => {
    const badCode = `
      <style>
        .hero { width: 100vw; height: 100vh; }
      </style>
      <div class="hero">Content</div>
    `;
    const report = visualCritic.critique(badCode);
    const overflowIssue = report.issues.find(i => i.id === 'vis-overflow-100vw');

    expect(overflowIssue).toBeDefined();
    expect(overflowIssue?.severity).toBe('high');
    expect(report.totalScore).toBeLessThan(100);
  });

  it('flags excessive neon bloom under No-Glow policy', () => {
    const badGlowCode = `
      <style>
        .card { box-shadow: 0 0 50px #ff00ff; }
      </style>
    `;
    const report = visualCritic.critique(badGlowCode);
    const glowIssue = report.issues.find(i => i.id === 'vis-excessive-neon-glow');

    expect(glowIssue).toBeDefined();
    expect(glowIssue?.severity).toBe('high');
  });

  it('flags unauthorized Web Audio synthesizers as CRITICAL under Silent by Default', () => {
    const badAudioCode = `
      <script>
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
      </script>
    `;
    const report = experienceCritic.critique(badAudioCode, false);
    const audioIssue = report.issues.find(i => i.id === 'exp-silent-by-default-violation');

    expect(audioIssue).toBeDefined();
    expect(audioIssue?.severity).toBe('critical');
    expect(report.totalScore).toBeLessThanOrEqual(60);
  });

  it('allows audio when explicitly requested by user', () => {
    const authorizedAudioCode = `
      <script>
        const ctx = new AudioContext();
      </script>
    `;
    const report = experienceCritic.critique(authorizedAudioCode, true);
    const audioIssue = report.issues.find(i => i.id === 'exp-silent-by-default-violation');

    expect(audioIssue).toBeUndefined();
  });

  it('flags focus ring suppression without :focus-visible replacement', () => {
    const badFocusCode = `
      <style>
        button { outline: none; }
      </style>
    `;
    const report = experienceCritic.critique(badFocusCode);
    const focusIssue = report.issues.find(i => i.id === 'exp-focus-ring-suppression');

    expect(focusIssue).toBeDefined();
    expect(focusIssue?.severity).toBe('high');
  });

  it('flags missing @media (prefers-reduced-motion) when animation is present', () => {
    const animCode = `
      <style>
        @keyframes float { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }
        .hero { animation: float 3s infinite; }
      </style>
    `;
    const report = experienceCritic.critique(animCode);
    const motionIssue = report.issues.find(i => i.id === 'exp-missing-reduced-motion');

    expect(motionIssue).toBeDefined();
    expect(motionIssue?.severity).toBe('high');
  });
});
