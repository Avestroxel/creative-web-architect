/**
 * `cwa benchmark` — Runs the repeatable evaluation benchmark suite across real-world prompts.
 *
 * Supports:
 * - Standard benchmark: Measures brief interpretation, concept divergence, critic scores, and refinement lift.
 * - Comparative benchmark (--compare): 3-way evaluation comparing Mode A (Without CWA), Mode B (Baseline CWA), and Mode C (Enhanced CWA).
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { BenchmarkSuiteRunner, BENCHMARK_SCENARIOS } from '@cwa/core';
import { log, logHeader, logPair, logBlank, LogLevel, color, style } from '../utils/logger.js';

export interface BenchmarkOptions {
  quick?: boolean;
  verbose?: boolean;
  force?: boolean;
  dryRun?: boolean;
  compare?: boolean;
}

export async function handleBenchmark(options: BenchmarkOptions = {}): Promise<void> {
  const runner = new BenchmarkSuiteRunner();

  if (options.compare) {
    logHeader('Creative Web Architect 2.0 — 3-Way Comparative Benchmark Suite');
    const scenarios = options.quick ? BENCHMARK_SCENARIOS.slice(0, 5) : BENCHMARK_SCENARIOS;

    log(LogLevel.INFO, `Running 3-Way Comparative Evaluation across ${scenarios.length} scenarios:`);
    log(LogLevel.INFO, `  Mode A: Without CWA (Naive generic baseline)`);
    log(LogLevel.INFO, `  Mode B: Baseline CWA (Pipeline generated, pre-critic)`);
    log(LogLevel.INFO, `  Mode C: Enhanced CWA (Pipeline + Visual/Experience Critics + Refinement + Memory)`);
    logBlank();

    const report = runner.runComparative(scenarios);

    log(LogLevel.SUCCESS, `Comparative Evaluation Completed across ${report.totalScenariosEvaluated} scenarios:`);
    logPair('Mode A (Without CWA)', `${report.averageScores.modeA_withoutCwa}/100`);
    logPair('Mode B (Baseline CWA)', `${report.averageScores.modeB_baselineCwa}/100`);
    logPair('Mode C (Enhanced CWA)', color.green(style.bold(`${report.averageScores.modeC_enhancedCwa}/100`)));
    logPair('Autonomous Refinement Lift (Mode C vs B)', color.green(`+${report.averageRefinementLift} points`));
    logPair('Total Advantage Over Generic (Mode C vs A)', color.green(`+${report.averageTotalAdvantage} points`));
    logBlank();

    log(LogLevel.INFO, 'Silent-by-Default Compliance Rates:');
    logPair('  Mode A (Without CWA)', `${report.silentAudioCompliance.modeA}%`);
    logPair('  Mode B (Baseline CWA)', `${report.silentAudioCompliance.modeB}%`);
    logPair('  Mode C (Enhanced CWA)', `${report.silentAudioCompliance.modeC}% (100% Guaranteed)`);

    logBlank();
    log(LogLevel.INFO, 'Comparative Matrix Highlights:');
    for (const s of report.results.slice(0, 10)) {
      log(
        LogLevel.INFO,
        `• [${s.category}] "${s.prompt.substring(0, 36)}..." ` +
        `| Naive: ${color.red(String(s.modeA_withoutCwa.overallScore))} ` +
        `| Base: ${color.yellow(String(s.modeB_baselineCwa.overallScore))} ` +
        `| Enhanced: ${color.green(String(s.modeC_enhancedCwa.overallScore))} ` +
        `(+${s.refinementLift} lift)`
      );
    }
    return;
  }

  logHeader('Creative Web Architect 2.0 — Evaluation Benchmark Suite');
  const scenarios = options.quick ? BENCHMARK_SCENARIOS.slice(0, 5) : BENCHMARK_SCENARIOS;

  log(LogLevel.INFO, `Running benchmark across ${scenarios.length} scenarios...`);
  logBlank();

  const report = runner.run(scenarios);

  log(LogLevel.SUCCESS, `Completed ${report.totalScenariosRun} scenarios:`);
  logPair('Average Initial Score', `${report.averageInitialScore}/100`);
  logPair('Average Final Score', `${report.averageFinalScore}/100`);
  logPair('Average Refinement Delta', `+${report.averageScoreDelta} points`);
  logPair('Passing Grade Rate (>= 85)', `${report.passingGradeRate}%`);
  logPair('Silent-by-Default Compliance', `${report.complianceRateSilentAudio}%`);
  logPair('Avg Execution Time', `${report.averageExecutionTimeMs}ms`);

  logBlank();
  log(LogLevel.INFO, 'Scenario Highlights:');
  for (const s of report.scenarioResults.slice(0, 8)) {
    log(LogLevel.INFO, `• [${s.category}] "${s.prompt.substring(0, 45)}..." -> ${s.finalScore}/100 (${s.passedRefinement ? 'PASS' : 'WARN'})`);
  }
}
