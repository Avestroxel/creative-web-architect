/**
 * PHASE 2 CREATIVE PIPELINE & MOTION INTELLIGENCE — Comprehensive Integration Suite
 *
 * Demonstrates the complete Phase 2 flow:
 * User Prompt → Intent Engine → Knowledge Retrieval → Concept Generator → Concept Selection
 * → Design DNA → Motion Planning → Website Implementation (Physical Scaffolding & Build Verification)
 * → Execution Trace.
 *
 * Tests:
 * 1. Complete end-to-end flow from minimal prompt to verified physical files.
 * 2. Adaptive execution profiles (FAST, DEEP_CREATIVE, ARCHITECT_MAX).
 * 3. Targeted modification of an existing project preserving structure and creating .bak backup.
 * 4. Error handling and state machine integrity (preventing false success if files fail to create).
 * 5. Execution trace logging with exact inputs, outputs, motion plans, and verification.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { describe, it, expect } from 'vitest';
import { resolve } from 'node:path';
import { CreativePipeline } from './orchestration/creative-pipeline.js';
import {
  VirtualFileSystemAdapter,
  DefaultProjectScaffoldingAdapter,
  DefaultBuildVerificationAdapter
} from './adapters/index.js';

describe('PHASE 2 — Creative Pipeline & Motion Intelligence Integration', () => {
  it('demonstrates complete Phase 2 pipeline execution producing verified files and execution trace', async () => {
    const vfs = new VirtualFileSystemAdapter();
    const scaffolder = new DefaultProjectScaffoldingAdapter(vfs);
    const verifier = new DefaultBuildVerificationAdapter(vfs);
    const pipeline = new CreativePipeline();

    const prompt = 'Create a futuristic luxury automotive website with extraordinary animations.';

    const result = await pipeline.executeAsync(prompt, {
      targetDir: '/var/www/hypercar',
      fsAdapter: vfs,
      scaffolder,
      buildVerifier: verifier
    });

    // 1. Prompt & Intent
    expect(result.rawPrompt).toBe(prompt);
    expect(result.intent.category).toBe('automotive');
    expect(result.intent.industry).toContain('Automotive');

    // 2. Adaptive Effort Profile
    expect(['DEEP_CREATIVE', 'ARCHITECT_MAX']).toContain(result.effortConfig.profile);

    // 3. Knowledge Retrieval
    expect(result.techniqueRetrieval.primaryTechniques.length).toBeGreaterThanOrEqual(1);

    // 4. Divergent Concepts
    expect(result.concepts.refined).toBeDefined();
    expect(result.concepts.experimental).toBeDefined();
    expect(result.concepts.immersive).toBeDefined();

    // 5. Concept Selection & Evaluation
    expect(result.winningConcept).toBeDefined();
    expect(result.evaluationReport.selectionRationale.length).toBeGreaterThan(10);

    // 6. Design DNA
    expect(result.designDNA).toBeDefined();
    expect(result.designDNA.colorSystem.contrastVerified).toBe(true);

    // 7. Motion Intelligence & Signature Planning
    expect(result.motionPlan.isMotionJustified).toBe(true);
    expect(result.motionPlan.techniques.length).toBeGreaterThanOrEqual(2);
    expect(result.motionPlan.selectedLibrary).toBeDefined();
    expect(result.motionPlan.conflictReport.hasConflicts).toBe(false);
    expect(result.signatureExperiences.length).toBeGreaterThanOrEqual(1);
    expect(result.signatureExperiences[0].id).toBe('sig-kinematic-telemetry-ribbon');

    // 8. Website Implementation & Scaffolding Adapter
    expect(result.implementationResult).toBeDefined();
    expect(result.implementationResult?.success).toBe(true);
    expect(result.filesCreated.length).toBe(1);
    expect(result.filesCreated[0]).toContain('index.html');

    // Physical file existence in virtual filesystem (Mandate: Never report website as generated if no files created)
    const fileExists = await vfs.fileExists(result.filesCreated[0]);
    expect(fileExists).toBe(true);

    const writtenContent = await vfs.readFile(result.filesCreated[0]);
    expect(writtenContent).toContain('<!DOCTYPE html>');
    expect(writtenContent).toContain('--cwa-bg:');
    expect(writtenContent).toContain('cwa-telemetry-hud'); // Signature experience embedded!
    expect(writtenContent).toContain(':focus-visible'); // Accessible focus
    expect(writtenContent).toContain('@media (prefers-reduced-motion: reduce)'); // A11y gate

    // 9. Build Verification Adapter
    expect(result.buildResult).toBeDefined();
    expect(result.buildResult?.passed).toBe(true);
    expect(result.buildResult?.checks.every(c => c.passed)).toBe(true);

    // 10. Pipeline State Machine & Execution Trace
    expect(result.stateMachine.isSuccessful()).toBe(true);
    expect(result.executionTrace.isSuccessful).toBe(true);
    expect(result.executionTrace.stageSequence.length).toBeGreaterThanOrEqual(7);

    for (const stageId of result.executionTrace.stageSequence) {
      const stage = result.executionTrace.stages[stageId];
      expect(stage.status).toBe('completed');
      expect(stage.durationMs).toBeGreaterThanOrEqual(0);
      expect(stage.logs.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('supports adaptive execution profiles: FAST vs DEEP_CREATIVE vs ARCHITECT_MAX', async () => {
    const vfs = new VirtualFileSystemAdapter();
    const pipeline = new CreativePipeline();

    // 1. FAST Profile
    const fastResult = await pipeline.executeAsync('button only', {
      effortProfile: 'FAST',
      targetDir: '/tmp/fast',
      fsAdapter: vfs
    });
    expect(fastResult.effortConfig.profile).toBe('FAST');
    expect(fastResult.motionPlan.techniques.length).toBeLessThanOrEqual(2);

    // 2. ARCHITECT_MAX Profile
    const maxResult = await pipeline.executeAsync('Bespoke watchmaker atelier with WebGL 3D orbit and shader', {
      effortProfile: 'ARCHITECT_MAX',
      targetDir: '/tmp/max',
      fsAdapter: vfs
    });
    expect(maxResult.effortConfig.profile).toBe('ARCHITECT_MAX');
    expect(maxResult.motionPlan.techniques.some(t => t.tier === 'ambient')).toBe(true);
    expect(maxResult.executionTrace.isSuccessful).toBe(true);
  });

  it('executes targeted modification on an existing website, preserving user content and generating a backup', async () => {
    const vfs = new VirtualFileSystemAdapter();
    const pipeline = new CreativePipeline();

    const originalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Legacy Atelier</title>
  <style>
  :root {
    --cwa-bg: #ffffff;
    --cwa-font-display: serif;
  }
  :focus-visible {}
  @media (prefers-reduced-motion: reduce) {}
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header><h1 id="client-title">Bespoke Atelier Heritage Since 1890</h1></header>
  <main id="main-content">
    <section id="custom-editorial-story">
      <p>Original hand-written client copy that must NEVER be overwritten.</p>
    </section>
  </main>
</body>
</html>`;

    const existingFilePath = resolve('/var/www/atelier/index.html');
    await vfs.writeFile(existingFilePath, originalHtml);

    // Execute modification request
    const modResult = await pipeline.executeAsync('Upgrade to mature basalt dark mode with precision typography', {
      isModification: true,
      targetFilePath: existingFilePath,
      modificationType: 'update-design-dna',
      fsAdapter: vfs
    });

    expect(modResult.filesModified).toContain(existingFilePath);
    expect(modResult.implementationResult?.scaffoldResult.backupsCreated.length).toBeGreaterThanOrEqual(1);

    // Verify backup exists
    const backupFile = modResult.implementationResult?.scaffoldResult.backupsCreated[0]!;
    expect(await vfs.fileExists(backupFile)).toBe(true);
    expect(await vfs.readFile(backupFile)).toBe(originalHtml);

    // Verify modified file updated Design DNA while preserving custom story
    const updatedContent = await vfs.readFile(existingFilePath);
    expect(updatedContent).toContain('--cwa-bg:');
    expect(updatedContent).toContain('Original hand-written client copy that must NEVER be overwritten.');
  });

  it('fails gracefully and reports state machine error if website files fail verification', async () => {
    const vfs = new VirtualFileSystemAdapter();
    const pipeline = new CreativePipeline();

    // Use a custom failing build verifier to test error boundary
    const failingVerifier = {
      id: 'failing-verifier',
      verify: async () => ({
        passed: false,
        targetPath: '/mock/path',
        fileFound: false,
        byteSize: 0,
        checks: [{ name: 'file-check', passed: false, message: 'Simulated file write failure' }],
        errors: ['Disk write permission denied'],
        warnings: []
      })
    };

    await expect(
      pipeline.executeAsync('Test website', {
        targetDir: '/forbidden/path',
        fsAdapter: vfs,
        buildVerifier: failingVerifier
      })
    ).rejects.toThrow(/website implementation failed build verification/i);
  });
});
