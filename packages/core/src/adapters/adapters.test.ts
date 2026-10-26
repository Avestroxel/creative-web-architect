/**
 * Execution Adapters Test Suite for Creative Web Architect 2.0 (Phase 2).
 *
 * Verifies model inference, file operations, command runners,
 * scaffolding adapters, and build verification.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { describe, it, expect } from 'vitest';
import { resolve } from 'node:path';
import {
  VirtualFileSystemAdapter,
  LocalHeuristicInferenceAdapter,
  HostAgentWorkflowAdapter,
  MockCommandAdapter,
  DefaultProjectScaffoldingAdapter,
  DefaultBuildVerificationAdapter
} from './index.js';

describe('Execution Adapters (Phase 2)', () => {
  describe('FileOperationsAdapter (Virtual & Memory)', () => {
    it('handles in-memory reads, writes, backups, and listing', async () => {
      const vfs = new VirtualFileSystemAdapter();

      await vfs.writeFile('/workspace/index.html', '<h1>Hello World</h1>');
      expect(await vfs.fileExists('/workspace/index.html')).toBe(true);
      expect(await vfs.readFile('/workspace/index.html')).toBe('<h1>Hello World</h1>');

      // Backup creation
      const backup = await vfs.backupFile('/workspace/index.html');
      expect(backup).toContain('.bak');
      expect(await vfs.fileExists(backup!)).toBe(true);

      // Overwrite with automated backup
      await vfs.writeFile('/workspace/index.html', '<h1>Updated World</h1>', { backup: true });
      expect(await vfs.readFile('/workspace/index.html')).toBe('<h1>Updated World</h1>');

      // Listing
      const files = await vfs.listFiles('/workspace');
      expect(files.some(f => f.startsWith('index.html'))).toBe(true);
    });
  });

  describe('ProjectScaffoldingAdapter', () => {
    it('scaffolds standalone-html project', async () => {
      const vfs = new VirtualFileSystemAdapter();
      const scaffolder = new DefaultProjectScaffoldingAdapter(vfs);

      const result = await scaffolder.scaffoldNewProject({
        targetDir: '/projects/automotive',
        projectName: 'Apex Hypercar',
        stack: 'standalone-html',
        htmlContent: '<!DOCTYPE html><html><head><title>Apex</title></head><body><h1>Apex</h1></body></html>'
      });

      expect(result.success).toBe(true);
      expect(result.filesCreated.length).toBe(1);
      expect(result.filesCreated[0]).toContain('index.html');
      expect(await vfs.readFile(result.entryPoint)).toContain('<h1>Apex</h1>');
    });

    it('scaffolds modular-vite project with package.json and styles', async () => {
      const vfs = new VirtualFileSystemAdapter();
      const scaffolder = new DefaultProjectScaffoldingAdapter(vfs);

      const result = await scaffolder.scaffoldNewProject({
        targetDir: '/projects/vite-app',
        projectName: 'Studio Mono',
        stack: 'modular-vite',
        htmlContent: '<!DOCTYPE html><html><head></head><body><div id="app"></div></body></html>',
        cssVariables: ':root { --cwa-bg: #0A0A0C; }'
      });

      expect(result.success).toBe(true);
      expect(result.stack).toBe('modular-vite');
      expect(result.filesCreated.length).toBe(4); // package.json, styles/dna.css, scripts/motion.js, index.html

      const pkg = JSON.parse(await vfs.readFile('/projects/vite-app/package.json'));
      expect(pkg.scripts.build).toBe('vite build');
    });

    it('modifies an existing project while creating automated backup and preserving structure', async () => {
      const vfs = new VirtualFileSystemAdapter();
      const scaffolder = new DefaultProjectScaffoldingAdapter(vfs);

      const originalHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Original Portfolio</title>
  <style>
  :root { --cwa-bg: #ffffff; }
  </style>
</head>
<body>
  <header><h1>Studio</h1></header>
  <main id="main-content">
    <section id="hero"><p>Original Hero</p></section>
  </main>
</body>
</html>`;

      const filePath = resolve('/projects/existing/index.html');
      await vfs.writeFile(filePath, originalHtml);

      // Targeted modification: update Design DNA CSS variables
      const modResult = await scaffolder.modifyExistingProject({
        targetFilePath: filePath,
        modificationType: 'update-design-dna',
        newCssVariables: ':root {\n  --cwa-bg: #090a0f;\n  --cwa-accent: #00e5ff;\n}'
      });

      expect(modResult.success).toBe(true);
      expect(modResult.backupsCreated.length).toBe(1);
      expect(modResult.filesModified).toContain(filePath);

      const modifiedHtml = await vfs.readFile(filePath);
      expect(modifiedHtml).toContain('--cwa-bg: #090a0f;');
      expect(modifiedHtml).toContain('Original Hero'); // Preserved user content!
    });
  });

  describe('BuildVerificationAdapter', () => {
    it('fails when target file does not exist on disk', async () => {
      const vfs = new VirtualFileSystemAdapter();
      const verifier = new DefaultBuildVerificationAdapter(vfs);

      const result = await verifier.verify('/nonexistent/file.html');
      expect(result.passed).toBe(false);
      expect(result.fileFound).toBe(false);
      expect(result.errors[0]).toContain('Target file does not exist');
    });

    it('fails when target file is 0 bytes (empty)', async () => {
      const vfs = new VirtualFileSystemAdapter();
      const verifier = new DefaultBuildVerificationAdapter(vfs);

      await vfs.writeFile('/workspace/empty.html', '');
      const result = await verifier.verify('/workspace/empty.html');

      expect(result.passed).toBe(false);
      expect(result.errors[0]).toContain('file is completely empty');
    });

    it('passes for valid HTML5 with Design DNA and Silent by Default', async () => {
      const vfs = new VirtualFileSystemAdapter();
      const verifier = new DefaultBuildVerificationAdapter(vfs);

      const validHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verified Site</title>
  <style>
  :root {
    --cwa-bg: #0e0f12;
    --cwa-font-display: 'Syne', sans-serif;
  }
  :focus-visible { outline: 2px solid #fff; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <main id="main-content"><h1>Welcome</h1></main>
</body>
</html>`;

      await vfs.writeFile('/workspace/valid.html', validHtml);
      const result = await verifier.verify('/workspace/valid.html');

      expect(result.passed).toBe(true);
      expect(result.checks.every(c => c.passed)).toBe(true);
    });

    it('detects and flags unrequested Web Audio synthesizers (Silent by Default violation)', async () => {
      const vfs = new VirtualFileSystemAdapter();
      const verifier = new DefaultBuildVerificationAdapter(vfs);

      const violationHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Violating Site</title>
  <style>
  :root { --cwa-bg: #000; --cwa-font-display: sans-serif; }
  :focus-visible {}
  @media (prefers-reduced-motion: reduce) {}
  </style>
</head>
<body>
  <script>
    const ctx = new AudioContext(); // Unauthorized synthesizer!
  </script>
</body>
</html>`;

      await vfs.writeFile('/workspace/violation.html', violationHtml);
      const result = await verifier.verify('/workspace/violation.html', {
        isAudioExplicitlyRequested: false
      });

      expect(result.passed).toBe(false);
      expect(result.errors).toContain('Silent by Default policy violated.');
    });
  });

  describe('ModelInferenceAdapter & CommandExecutionAdapter', () => {
    it('executes local heuristic inference deterministically', async () => {
      const adapter = new LocalHeuristicInferenceAdapter();
      expect(adapter.isAvailable()).toBe(true);

      const result = await adapter.infer('futuristic automotive showcase');
      expect(result.provider).toBe('local-heuristic-engine');
      expect(result.parsedJson?.detectedKeywords).toContain('futuristic');
      expect(result.parsedJson?.detectedKeywords).toContain('automotive');
    });

    it('executes mock commands with registered outputs', async () => {
      const mockCmd = new MockCommandAdapter();
      mockCmd.registerResponse('npm test', { stdout: 'All 82 tests passing', exitCode: 0 });

      const result = await mockCmd.execute('npm test');
      expect(result.stdout).toBe('All 82 tests passing');
      expect(result.exitCode).toBe(0);
    });
  });
});
