import { describe, it, expect } from 'vitest';
import { RefinementEngine } from './refinement-engine.js';

describe('RefinementEngine (CWA 2.0 Bounded Refinement)', () => {
  const engine = new RefinementEngine();

  it('autonomously remediates Silent-by-Default violation and missing reduced-motion', () => {
    const unrefinedCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    button { outline: none; }
    .hero { width: 100vw; animation: pulse 2s infinite; }
  </style>
</head>
<body>
  <script>
    const audioCtx = new AudioContext();
  </script>
</body>
</html>`;

    const result = engine.refine(unrefinedCode, {
      maxIterations: 3,
      isAudioExplicitlyRequested: false
    });

    expect(result.totalIterations).toBeGreaterThanOrEqual(1);
    expect(result.scoreImprovement).toBeGreaterThan(0);
    // Verified that unrequested AudioContext was stripped
    expect(result.refinedCode).not.toContain('new AudioContext()');
    // Verified that reduced motion fallback was injected
    expect(result.refinedCode).toContain('prefers-reduced-motion: reduce');
    // Verified that focus-visible fallback was injected
    expect(result.refinedCode).toContain(':focus-visible');
    // Verified that horizontal overflow guard was injected
    expect(result.refinedCode).toContain('overflow-x: hidden');
  });

  it('stops safely on clean code without unnecessary edits', () => {
    const cleanCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { max-width: 100%; overflow-x: hidden; }
    :focus-visible { outline: 2px solid #fff; }
    @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
  </style>
</head>
<body><h1>Clean Title</h1></body>
</html>`;

    const result = engine.refine(cleanCode, { maxIterations: 3 });
    expect(result.totalIterations).toBe(0);
    expect(result.stopReason).toContain('Passing grade');
  });
});
