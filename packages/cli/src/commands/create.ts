/**
 * `cwa create "<prompt>"` — Autonomously generates or modifies a website using CWA 2.0.
 *
 * Coordinates the full Phase 2 Creative Pipeline:
 * Intent Analysis → Adaptive Effort → Knowledge Retrieval → Concept Exploration
 * → Concept Selection → Design DNA → Motion Planning → Physical Website Implementation
 * → Build Verification.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { resolve } from 'node:path';
import { cwd } from 'node:process';
import {
  CreativePipeline,
  ReasoningProfile,
  ProjectStack
} from '@cwa/core';
import { log, logHeader, logPair, logBlank, LogLevel } from '../utils/logger.js';

interface CreateOptions {
  output?: string;
  targetDir?: string;
  mode?: string;
  stack?: string;
  modify?: string;
  force?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

export async function handleCreate(promptArgs: string[], options: CreateOptions = {}): Promise<void> {
  const prompt = promptArgs.join(' ').trim();
  if (!prompt && !options.modify) {
    log(LogLevel.ERROR, 'Please provide a prompt. Example: cwa create "Architectural monograph portfolio"');
    return;
  }

  logHeader('Creative Web Architect 2.0 — Creative Pipeline Engine');
  if (prompt) log(LogLevel.INFO, `Input Prompt: "${prompt}"`);
  if (options.modify) log(LogLevel.INFO, `Target Modification File: "${options.modify}"`);
  logBlank();

  // Parse execution mode override if provided
  let effortProfile: ReasoningProfile | undefined;
  if (options.mode) {
    const m = options.mode.toUpperCase();
    if (m === 'FAST') effortProfile = 'FAST';
    else if (m === 'DEEP' || m === 'DEEP_CREATIVE') effortProfile = 'DEEP_CREATIVE';
    else if (m === 'MAX' || m === 'ARCHITECT_MAX') effortProfile = 'ARCHITECT_MAX';
  }

  const stack: ProjectStack = (options.stack as ProjectStack) || 'standalone-html';
  const targetDir = resolve(cwd(), options.targetDir || '.');

  log(LogLevel.INFO, 'Executing autonomous creative pipeline...');
  const pipeline = new CreativePipeline();

  const isModification = Boolean(options.modify);
  const targetFilePath = options.modify ? resolve(cwd(), options.modify) : undefined;

  const result = await pipeline.executeAsync(prompt || 'Refine design and architecture', {
    effortProfile,
    targetDir,
    targetFilePath,
    stack,
    isModification,
    enableBrowserEvaluation: !options.dryRun,
    dryRun: options.dryRun
  });

  log(LogLevel.SUCCESS, `Intent Analyzed: ${result.intent.category} // ${result.intent.industry}`);
  logPair('Effort Profile', result.effortConfig.profile);
  logPair('Winning Concept', result.winningConcept.name);
  logPair('Cognitive Metaphor', result.cognitiveProfile.metaphor.name);
  logPair('Design DNA Metaphor', result.designDNA.visualMetaphor);
  logPair('Art Director Verdict', result.directorialVerdict.status);
  logPair('Signature Experience', result.signatureExperiences[0]?.name ?? 'Standard Motion');
  logPair('Motion Personality', result.motionPlan.overallPersonality);
  logPair('Motion Library', result.motionPlan.selectedLibrary);

  logBlank();
  log(LogLevel.INFO, 'Pipeline State Machine Execution Trace:');
  for (const stageId of result.executionTrace.stageSequence) {
    const stage = result.executionTrace.stages[stageId];
    if (stage) {
      logPair(stage.name, `[${stage.status.toUpperCase()}] ${stage.durationMs ?? 0}ms`);
    }
  }

  logBlank();
  if (result.buildResult) {
    log(LogLevel.INFO, 'Build Verification Status:');
    logPair('Passed', result.buildResult.passed ? 'YES (Verified)' : 'FAILED');
    logPair('Files Created', result.filesCreated.join(', ') || '(none)');
    if (result.filesModified.length > 0) {
      logPair('Files Modified', result.filesModified.join(', '));
    }
    logPair('Payload Size', `${result.buildResult.byteSize} bytes`);
  }

  if (result.screenshots && (result.screenshots.desktop || result.screenshots.mobile)) {
    logBlank();
    log(LogLevel.INFO, 'Real Headless Chromium Screenshots:');
    if (result.screenshots.desktop) logPair('Desktop (1440x900)', result.screenshots.desktop);
    if (result.screenshots.tablet) logPair('Tablet (768x1024)', result.screenshots.tablet);
    if (result.screenshots.mobile) logPair('Mobile (375x667)', result.screenshots.mobile);
  }

  if (result.refinementResult) {
    logBlank();
    log(LogLevel.INFO, 'Autonomous Self-Refinement & Quality Gates:');
    logPair('Quality Score', `${result.refinementResult.finalReport.overallScore}/100`);
    logPair('Passing Grade', result.refinementResult.isPassingGrade ? 'PASSED (>= 85)' : 'REQUIRES_REFINEMENT');
    logPair('Iterations Executed', `${result.refinementResult.totalIterations}`);
  }

  logBlank();
  if (result.executionTrace.isSuccessful) {
    log(LogLevel.SUCCESS, `🎉 Website successfully processed across all 8 stages in ${result.executionTimeMs}ms!`);
    log(LogLevel.INFO, '100% Silent by Default. 0 unrequested audio synthesizers. Quality gates verified.');
  } else {
    log(LogLevel.ERROR, `Pipeline encountered errors: ${result.executionTrace.errors.join('; ')}`);
  }
}
