import { describe, it, expect } from 'vitest';
import { BenchmarkSuiteRunner, BENCHMARK_SCENARIOS } from './benchmark-suite.js';

describe('BenchmarkSuite (CWA 2.0 Evaluation Benchmark)', () => {
  it('contains 25 real-world scenarios across 10 categories', () => {
    expect(BENCHMARK_SCENARIOS.length).toBe(25);
    const categories = new Set(BENCHMARK_SCENARIOS.map(s => s.category));
    expect(categories.size).toBe(10);
    expect(categories).toContain('Creative Agency');
    expect(categories).toContain('Architecture');
    expect(categories).toContain('SaaS');
    expect(categories).toContain('Dashboard');
    expect(categories).toContain('Portfolio');
    expect(categories).toContain('Automotive');
    expect(categories).toContain('Luxury Product');
    expect(categories).toContain('E-commerce');
    expect(categories).toContain('Editorial');
    expect(categories).toContain('Experimental Interactive');
  });

  it('executes a sample benchmark run and generates reproducible metrics report', () => {
    const runner = new BenchmarkSuiteRunner();
    // Run on 3 distinct scenarios for fast deterministic test execution
    const sampleScenarios = [
      BENCHMARK_SCENARIOS[0]!, // Creative Agency
      BENCHMARK_SCENARIOS[3]!, // Architecture
      BENCHMARK_SCENARIOS[6]!  // SaaS
    ];

    const report = runner.run(sampleScenarios);

    expect(report.totalScenariosRun).toBe(3);
    expect(report.averageInitialScore).toBeGreaterThanOrEqual(70);
    expect(report.averageFinalScore).toBeGreaterThanOrEqual(85);
    expect(report.complianceRateSilentAudio).toBe(100);
    expect(report.passingGradeRate).toBe(100);
    expect(report.scenarioResults.length).toBe(3);
    expect(report.scenarioResults[0]?.silentByDefaultCompliant).toBe(true);
  });
});
