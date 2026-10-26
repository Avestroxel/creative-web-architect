import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { ExperienceMemory } from './memory/experience-memory.js';
import { KnowledgeRetriever } from './intelligence/knowledge-retriever.js';
import { KnowledgeManager } from './knowledge-manager.js';
import { IntentEngine } from './intelligence/intent-engine.js';
import { CreativePipeline } from './orchestration/creative-pipeline.js';
import { BenchmarkSuiteRunner, BENCHMARK_SCENARIOS } from './benchmark/benchmark-suite.js';
import { auditCSSVisualQuality } from './visual-policy.js';

describe('Phase 4 — Experience Memory, Retrieval & Benchmark Hardening', () => {
  const testMemoryDir = resolve(process.cwd(), '.cwa', 'test-memory');
  const testMemoryFile = resolve(testMemoryDir, 'test-experience-memory.json');

  beforeEach(async () => {
    await fs.mkdir(testMemoryDir, { recursive: true });
  });

  afterEach(async () => {
    try {
      await fs.rm(testMemoryDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup error
    }
  });

  describe('1. Persistent Experience Memory & Secret Sanitization', () => {
    it('initializes with vetted seed records and tracks provenance and validation status', () => {
      const memory = new ExperienceMemory(undefined, testMemoryFile);
      const records = memory.getAllRecords();

      expect(records.length).toBeGreaterThanOrEqual(5);

      const automotivelesson = records.find(r => r.category === 'automotive');
      expect(automotivelesson).toBeDefined();
      expect(automotivelesson?.provenance).toBe('seed-archive');
      expect(automotivelesson?.validationStatus).toBe('verified-browser');
      expect(automotivelesson?.criticScore).toBeGreaterThanOrEqual(95);

      const stats = memory.getStats();
      expect(stats.total).toBe(records.length);
      expect(stats.byProvenance['seed-archive']).toBeGreaterThanOrEqual(5);
      expect(stats.byValidationStatus['verified-browser']).toBeGreaterThanOrEqual(5);
    });

    it('persists records to disk and reloads them without data loss', async () => {
      const memory = new ExperienceMemory([], testMemoryFile);

      memory.recordExperience({
        id: 'exp-arch-tokyo',
        category: 'architecture',
        industry: 'Brutalist Architecture Practice',
        briefSummary: 'Tokyo brutalist architecture monograph with monolithic stone columns',
        selectedConceptId: 'concept-architectural-monolith',
        techniquesUsed: ['brutalist-grid', 'monochrome-stone'],
        criticScore: 98,
        criticFindings: [],
        correctionsApplied: ['Enforced AA contrast', 'Removed unrequested audio'],
        status: 'validated-success',
        keyTakeaway: 'Monolithic column grids deliver commanding presence when typographic hierarchy is strictly enforced.',
        provenance: 'automated-pipeline',
        validationStatus: 'verified-browser',
        promptCharacteristics: {
          rawPromptLength: 45,
          explicitKeywords: ['brutalist', 'architecture', 'tokyo'],
          inferredArchetype: 'brutalist-monument',
          hasMotionRequest: false,
          has3DRequest: false
        },
        verifiedResults: {
          overallScore: 98,
          visualScore: 97,
          experienceScore: 99,
          isPassingGrade: true,
          zeroCriticalIssues: true
        }
      });

      const savedPath = await memory.saveToFile();
      expect(savedPath).toBe(testMemoryFile);

      // Create new instance and load from file
      const loadedMemory = new ExperienceMemory([], testMemoryFile);
      const loaded = await loadedMemory.loadFromFile();
      expect(loaded).toBe(true);

      const loadedRecords = loadedMemory.getAllRecords();
      expect(loadedRecords.length).toBeGreaterThanOrEqual(6);
      const tokyoRecord = loadedRecords.find(r => r.id === 'exp-arch-tokyo');
      expect(tokyoRecord).toBeDefined();
      expect(tokyoRecord?.provenance).toBe('automated-pipeline');
      expect(tokyoRecord?.verifiedResults?.isPassingGrade).toBe(true);
    });

    it('rigorously sanitizes API keys, tokens, passwords, and private emails before recording', () => {
      const memory = new ExperienceMemory([], testMemoryFile);

      memory.recordExperience({
        id: 'exp-leak-test',
        category: 'saas',
        industry: 'Fintech Platform',
        briefSummary: 'Deployment for user user@example.com with api_key="sk-live1234567890abcdef"',
        selectedConceptId: 'concept-fintech',
        techniquesUsed: ['data-matrix'],
        criticScore: 92,
        criticFindings: ['Secret bearer token=abcdef1234567890 leaked in comments'],
        correctionsApplied: [],
        status: 'validated-success',
        keyTakeaway: 'Client admin email contact@company.org with Google API AIzaSyB12345678901234567890123456789012',
        provenance: 'automated-pipeline',
        validationStatus: 'verified-browser'
      });

      const recorded = memory.getAllRecords().find(r => r.id === 'exp-leak-test')!;
      expect(recorded.briefSummary).not.toContain('sk-live1234567890abcdef');
      expect(recorded.briefSummary).not.toContain('user@example.com');
      expect(recorded.briefSummary).toContain('[REDACTED_SECRET]');
      expect(recorded.briefSummary).toContain('[REDACTED_EMAIL]');

      expect(recorded.criticFindings[0]).not.toContain('abcdef1234567890');
      expect(recorded.criticFindings[0]).toContain('[REDACTED_SECRET]');

      expect(recorded.keyTakeaway).not.toContain('contact@company.org');
      expect(recorded.keyTakeaway).not.toContain('AIzaSyB12345678901234567890123456789012');
      expect(recorded.keyTakeaway).toContain('[REDACTED_EMAIL]');
      expect(recorded.keyTakeaway).toContain('[REDACTED_API_KEY]');
    });

    it('returns structured insights and cautionary failure patterns', () => {
      const memory = new ExperienceMemory(undefined, testMemoryFile);
      const insights = memory.getInsightsForIntent('creative-agency', 'liquid cursor editorial portfolio');

      expect(insights.recommendedTechniques.length).toBeGreaterThan(0);
      expect(insights.pastWinningConcepts.length).toBeGreaterThan(0);
      expect(insights.cautionaryFailurePatterns.length).toBeGreaterThanOrEqual(4);
      expect(insights.cautionaryFailurePatterns.some(p => p.includes('Web Audio'))).toBe(true);
      expect(insights.categoryMilestoneSummary).toContain('Found');
    });
  });

  describe('2. Experience-Based Knowledge Retrieval', async () => {
    it('boosts techniques validated in past projects and avoids known failure patterns', async () => {
      const memory = new ExperienceMemory(undefined, testMemoryFile);
      const km = new KnowledgeManager();
      await km.init();
      const intentEngine = new IntentEngine();
      const retriever = new KnowledgeRetriever();

      const intent = intentEngine.analyze('Design an avant-garde digital design agency website with liquid cursor interactions.');

      // Search for cursor techniques in creative-agency
      const result = retriever.retrieve(intent, km, 4, memory);

      expect(result.primaryTechniques.length).toBeGreaterThan(0);
      expect(result.retrievedExperiences).toBeDefined();
      expect(result.retrievedExperiences!.length).toBeGreaterThan(0);
      expect(result.avoidedFailures).toBeDefined();
      expect(result.avoidedFailures!.length).toBeGreaterThan(0);
      expect(result.experienceInsights).toBeDefined();
    });
  });

  describe('3. Contextual Visual Policy Improvements', () => {
    it('permits justified high-contrast editorial minimalism without false positive contrast warnings', () => {
      const minimalistCSS = `
        :root {
          --bg-void: #0a0a0a;
          --text-primary: #ffffff;
          --font-display: 'Instrument Serif', Georgia, serif;
        }
        body {
          background-color: var(--bg-void);
          color: var(--text-primary);
          font-family: var(--font-display);
        }
        .hero-title {
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 400;
          letter-spacing: -0.04em;
          line-height: 0.95;
        }
      `;

      const audit = auditCSSVisualQuality(minimalistCSS, {
        aestheticStyle: 'minimalism',
        allowJustifiedVibrancy: false
      });

      expect(audit.passed).toBe(true);
      expect(audit.score).toBeGreaterThanOrEqual(95);
    });

    it('permits justified cyber neon accents for futuristic automotive when calibrated', () => {
      const cyberAutomotiveCSS = `
        .telemetry-gauge {
          color: #00ffaa;
          box-shadow: 0 0 16px rgba(0, 255, 170, 0.25);
          border: 1px solid rgba(0, 255, 170, 0.4);
        }
      `;

      const audit = auditCSSVisualQuality(cyberAutomotiveCSS, {
        aestheticStyle: 'justified-neon',
        allowJustifiedVibrancy: true
      });

      expect(audit.passed).toBe(true);
      expect(audit.score).toBeGreaterThanOrEqual(90);
    });

    it('still rejects crude uncalibrated massive neon glows even in justified-neon mode', () => {
      const crudeNeonCSS = `
        .neon-card {
          box-shadow: 0 0 80px #00ff00;
        }
      `;

      const audit = auditCSSVisualQuality(crudeNeonCSS, {
        aestheticStyle: 'justified-neon',
        allowJustifiedVibrancy: true
      });

      expect(audit.passed).toBe(false);
      expect(audit.issues.some((issue) => issue.type === 'excessive-glow')).toBe(true);
    });
  });

  describe('4. Comparative Benchmark Suite', () => {
    it('evaluates at least 20 diverse scenarios across 10 required subcategories', () => {
      expect(BENCHMARK_SCENARIOS.length).toBeGreaterThanOrEqual(20);

      const requiredSubcategories = [
        'portfolio',
        'creative-agency',
        'saas',
        'ecommerce',
        'automotive',
        'architecture',
        'editorial',
        'dashboard',
        'luxury-product',
        'experimental'
      ];

      for (const subcat of requiredSubcategories) {
        const found = BENCHMARK_SCENARIOS.some(s => s.subcategory === subcat);
        expect(found, `Missing subcategory: ${subcat}`).toBe(true);
      }
    });

    it('runs 3-way comparative evaluation demonstrating significant refinement lift and naive advantage', () => {
      const runner = new BenchmarkSuiteRunner();
      // Test across 5 representative scenarios for rapid deterministic validation
      const sampleScenarios = [
        BENCHMARK_SCENARIOS.find(s => s.subcategory === 'automotive')!,
        BENCHMARK_SCENARIOS.find(s => s.subcategory === 'creative-agency')!,
        BENCHMARK_SCENARIOS.find(s => s.subcategory === 'architecture')!,
        BENCHMARK_SCENARIOS.find(s => s.subcategory === 'luxury-product')!,
        BENCHMARK_SCENARIOS.find(s => s.subcategory === 'experimental')!
      ];

      const report = runner.runComparative(sampleScenarios);

      expect(report.totalScenariosEvaluated).toBe(5);
      expect(report.averageScores.modeC_enhancedCwa).toBeGreaterThan(report.averageScores.modeB_baselineCwa);
      expect(report.averageScores.modeB_baselineCwa).toBeGreaterThanOrEqual(report.averageScores.modeA_withoutCwa);

      // Refinement Lift (Mode C - Mode B) must be positive
      expect(report.averageRefinementLift).toBeGreaterThanOrEqual(5);

      // Total Advantage Over Naive (Mode C - Mode A) must be positive
      expect(report.averageTotalAdvantage).toBeGreaterThanOrEqual(10);

      // Mode C must maintain 100% Silent-by-Default compliance
      expect(report.silentAudioCompliance.modeC).toBe(100);

      for (const res of report.results) {
        expect(res.modeC_enhancedCwa.silentCompliant).toBe(true);
        expect(res.modeC_enhancedCwa.hasDesignDNA).toBe(true);
        expect(res.modeC_enhancedCwa.overallScore).toBeGreaterThan(res.modeB_baselineCwa.overallScore);
      }
    });
  });

  describe('5. Full End-to-End Pipeline & Memory Persistence Integration', () => {
    it('executes full pipeline, generates website, runs critics, and writes validated lesson into experience memory', async () => {
      const memory = new ExperienceMemory([], testMemoryFile);
      const pipeline = new CreativePipeline();

      const prompt = 'Design a high-performance electric hypercar showcase with aerodynamic telemetry and carbon weave aesthetics.';

      const result = await pipeline.executeAsync(prompt, {
        experienceMemory: memory,
        enableBrowserEvaluation: false // Deterministic critic verification for unit suite
      });

      const allStages = Object.values(result.executionTrace.stages);
      expect(allStages.length).toBe(8);

      // Verify all stages succeeded
      const failedStages = allStages.filter(s => s.status === 'failed');
      expect(failedStages.length).toBe(0);

      // Verify Critic Report and Refinement
      expect(result.refinementResult).toBeDefined();
      expect(result.refinementResult!.finalReport.overallScore).toBeGreaterThanOrEqual(90);

      // Verify Experience Memory Record was created and saved
      const storedLessons = memory.getAllRecords();
      expect(storedLessons.length).toBeGreaterThanOrEqual(6);

      const lesson = storedLessons.find(r => r.provenance === 'automated-pipeline')!;
      expect(lesson).toBeDefined();
      expect(lesson.category).toBe('automotive');
      expect(lesson.provenance).toBe('automated-pipeline');
      expect(lesson.validationStatus).toBe('verified-deterministic');
      expect(lesson.criticScore).toBe(result.refinementResult!.finalReport.overallScore);
      expect(lesson.promptCharacteristics).toBeDefined();
      expect(lesson.designDnaSummary).toBeDefined();
      expect(lesson.verifiedResults).toBeDefined();
      expect(lesson.verifiedResults?.zeroCriticalIssues).toBe(true);

      // Verify file persistence on disk
      const diskExists = await fs.stat(testMemoryFile).then(() => true).catch(() => false);
      expect(diskExists).toBe(true);

      const diskRaw = await fs.readFile(testMemoryFile, 'utf-8');
      const diskJson = JSON.parse(diskRaw);
      expect(Array.isArray(diskJson)).toBe(true);
      expect(diskJson.some((item: any) => item.id === lesson.id)).toBe(true);
    }, 25000);
  });
});
