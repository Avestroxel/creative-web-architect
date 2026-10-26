/**
 * Project Scaffolding & Modification Adapter for Creative Web Architect 2.0.
 *
 * Handles physical project creation and targeted modification of existing projects.
 * Preserves user content, creates automated backups, and ensures genuine file generation.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { resolve, join } from 'node:path';
import { FileOperationsAdapter, NodeFileSystemAdapter } from './file-operations-adapter.js';
import { DesignDNASpec } from '../creativity/design-dna.js';
import { MotionPlan } from '../creativity/motion-intelligence.js';
import { SignatureExperienceSpec } from '../creativity/signature-experience.js';

export type ProjectStack = 'standalone-html' | 'modular-vite' | 'component-snippet';

export interface ProjectScaffoldSpec {
  targetDir: string;
  projectName: string;
  stack: ProjectStack;
  htmlContent: string;
  designDNA?: DesignDNASpec;
  motionPlan?: MotionPlan;
  signatureExperiences?: SignatureExperienceSpec[];
  cssVariables?: string;
  forceOverwrite?: boolean;
}

export interface ProjectModifySpec {
  targetFilePath: string;
  modificationType: 'update-design-dna' | 'replace-section' | 'inject-signature' | 'full-update';
  newContent?: string;
  newDesignDNA?: DesignDNASpec;
  newCssVariables?: string;
  signatureExperience?: SignatureExperienceSpec;
  targetSectionId?: string;
}

export interface ScaffoldResult {
  success: boolean;
  targetDir: string;
  stack: ProjectStack;
  entryPoint: string;
  filesCreated: string[];
  filesModified: string[];
  backupsCreated: string[];
  totalBytesWritten: number;
}

export interface ProjectScaffoldingAdapter {
  readonly id: string;
  scaffoldNewProject(spec: ProjectScaffoldSpec): Promise<ScaffoldResult>;
  modifyExistingProject(spec: ProjectModifySpec): Promise<ScaffoldResult>;
}

export class DefaultProjectScaffoldingAdapter implements ProjectScaffoldingAdapter {
  public readonly id = 'default-project-scaffolder';
  private fs: FileOperationsAdapter;

  constructor(fsAdapter?: FileOperationsAdapter) {
    this.fs = fsAdapter ?? new NodeFileSystemAdapter();
  }

  /**
   * Scaffolds a complete project based on chosen stack.
   */
  public async scaffoldNewProject(spec: ProjectScaffoldSpec): Promise<ScaffoldResult> {
    const targetDir = resolve(spec.targetDir);
    await this.fs.mkdir(targetDir);

    const filesCreated: string[] = [];
    const backupsCreated: string[] = [];
    let totalBytesWritten = 0;

    if (spec.stack === 'standalone-html') {
      const entryPoint = join(targetDir, 'index.html');
      if (await this.fs.fileExists(entryPoint)) {
        const backup = await this.fs.backupFile(entryPoint);
        if (backup) backupsCreated.push(backup);
      }

      await this.fs.writeFile(entryPoint, spec.htmlContent, { backup: false });
      filesCreated.push(entryPoint);
      totalBytesWritten += Buffer.byteLength(spec.htmlContent, 'utf-8');

      return {
        success: true,
        targetDir,
        stack: 'standalone-html',
        entryPoint,
        filesCreated,
        filesModified: [],
        backupsCreated,
        totalBytesWritten
      };
    }

    if (spec.stack === 'modular-vite') {
      // 1. package.json
      const pkgJson = JSON.stringify(
        {
          name: spec.projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          version: '1.0.0',
          private: true,
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'vite build',
            preview: 'vite preview'
          },
          devDependencies: {
            vite: '^5.0.0'
          }
        },
        null,
        2
      );
      const pkgPath = join(targetDir, 'package.json');
      await this.fs.writeFile(pkgPath, pkgJson);
      filesCreated.push(pkgPath);
      totalBytesWritten += Buffer.byteLength(pkgJson, 'utf-8');

      // 2. styles/dna.css
      const dnaCss = spec.cssVariables || (spec.designDNA ? `:root {\n  --cwa-bg: ${spec.designDNA.colorSystem.palette.background};\n}` : '');
      const dnaCssPath = join(targetDir, 'styles', 'dna.css');
      await this.fs.writeFile(dnaCssPath, dnaCss);
      filesCreated.push(dnaCssPath);
      totalBytesWritten += Buffer.byteLength(dnaCss, 'utf-8');

      // 3. scripts/motion.js
      const motionJs = `// CWA 2.0 Motion Controller\nconsole.log('CWA 2.0 Motion Initialized (100% Silent by Default)');\n`;
      const motionJsPath = join(targetDir, 'scripts', 'motion.js');
      await this.fs.writeFile(motionJsPath, motionJs);
      filesCreated.push(motionJsPath);
      totalBytesWritten += Buffer.byteLength(motionJs, 'utf-8');

      // 4. index.html
      const entryPoint = join(targetDir, 'index.html');
      await this.fs.writeFile(entryPoint, spec.htmlContent);
      filesCreated.push(entryPoint);
      totalBytesWritten += Buffer.byteLength(spec.htmlContent, 'utf-8');

      return {
        success: true,
        targetDir,
        stack: 'modular-vite',
        entryPoint,
        filesCreated,
        filesModified: [],
        backupsCreated,
        totalBytesWritten
      };
    }

    // component-snippet
    const entryPoint = join(targetDir, `${spec.projectName || 'component'}.html`);
    await this.fs.writeFile(entryPoint, spec.htmlContent);
    filesCreated.push(entryPoint);
    totalBytesWritten += Buffer.byteLength(spec.htmlContent, 'utf-8');

    return {
      success: true,
      targetDir,
      stack: 'component-snippet',
      entryPoint,
      filesCreated,
      filesModified: [],
      backupsCreated,
      totalBytesWritten
    };
  }

  /**
   * Modifies an existing website or project while preserving user assets and structure.
   */
  public async modifyExistingProject(spec: ProjectModifySpec): Promise<ScaffoldResult> {
    const filePath = resolve(spec.targetFilePath);
    if (!(await this.fs.fileExists(filePath))) {
      throw new Error(`Cannot modify project: file does not exist at ${filePath}`);
    }

    const originalContent = await this.fs.readFile(filePath);
    const backupPath = await this.fs.backupFile(filePath);
    const backupsCreated = backupPath ? [backupPath] : [];

    let updatedContent = originalContent;

    switch (spec.modificationType) {
      case 'update-design-dna': {
        if (spec.newCssVariables) {
          // Replace or insert :root CSS variables
          const rootMatch = updatedContent.match(/:root\s*\{[\s\S]*?\}/);
          if (rootMatch) {
            updatedContent = updatedContent.replace(rootMatch[0], spec.newCssVariables);
          } else {
            // Insert inside head style
            updatedContent = updatedContent.replace(
              '</head>',
              `  <style>\n${spec.newCssVariables}\n  </style>\n</head>`
            );
          }
        }
        break;
      }

      case 'inject-signature': {
        if (spec.signatureExperience) {
          const sig = spec.signatureExperience;
          const snippet = `\n  <!-- CWA Signature Experience: ${sig.name} -->\n  <div id="${sig.id}" data-cwa-signature="${sig.interactionModel}" class="cwa-signature-container">\n    <!-- ${sig.description} -->\n  </div>\n`;
          // Inject before </main> or </body>
          if (updatedContent.includes('</main>')) {
            updatedContent = updatedContent.replace('</main>', `${snippet}</main>`);
          } else {
            updatedContent = updatedContent.replace('</body>', `${snippet}</body>`);
          }
        }
        break;
      }

      case 'replace-section': {
        if (spec.targetSectionId && spec.newContent) {
          const sectionRegex = new RegExp(
            `<section[^>]*id=["']${spec.targetSectionId}["'][\\s\\S]*?<\\/section>`,
            'i'
          );
          if (sectionRegex.test(updatedContent)) {
            updatedContent = updatedContent.replace(sectionRegex, spec.newContent);
          } else {
            // Append before footer or closing body
            updatedContent = updatedContent.replace('</body>', `${spec.newContent}\n</body>`);
          }
        }
        break;
      }

      case 'full-update':
      default: {
        if (spec.newContent) {
          updatedContent = spec.newContent;
        }
        break;
      }
    }

    await this.fs.writeFile(filePath, updatedContent, { backup: false });

    return {
      success: true,
      targetDir: resolve(filePath, '..'),
      stack: 'standalone-html',
      entryPoint: filePath,
      filesCreated: [],
      filesModified: [filePath],
      backupsCreated,
      totalBytesWritten: Buffer.byteLength(updatedContent, 'utf-8')
    };
  }
}
