# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] — 2026-10-26

### Added — Phase 3: Autonomous Visual Critic & Self-Refinement Engine

- **Real Browser-Based Multi-Viewport Evaluation (`@cwa/core/browser-evaluator`)**:
  - Automated headless Chromium rendering via Playwright across Desktop (1440x900), Tablet (768x1024), and Mobile (375x667).
  - Automated full-page PNG screenshot capture saved to local `.cwa/screenshots/` (`viewport-desktop-1440.png`, `viewport-tablet-768.png`, `viewport-mobile-375.png`).
  - In-browser DOM metrics probe: real horizontal scrollbar leaks (`scrollWidth > innerWidth`), mobile touch target measurement (< 44x44px boundary), keyboard focus indicator styles (`:focus-visible`), and runtime error listener (`console.error` and `pageerror`).
  - Deterministic and non-fabricating: returns `browserAvailable: false` with explicit explanation when browser automation is not available.
- **Visual Critic (`@cwa/core/visual-critic`)**:
  - Deterministic checks for visual hierarchy (single `<h1>`, heading cadence), fluid typography `clamp()` scaling, ergonomic paragraph measure (<= 75ch), and image CLS/broken assets.
  - Strict No-Glow Architectural Policy: flags and rejects cheap, uncalibrated diffuse neon glows (`box-shadow: 0 0 >35px`).
  - Clear separation of objective physical defects from subjective aesthetic judgments (`isObjectiveDefect: boolean`).
- **Experience Critic (`@cwa/core/experience-critic`)**:
  - Non-Negotiable Silent-by-Default Policy: flags unrequested Web Audio synthesizers and autoplay audio elements as critical defects.
  - Keyboard Focus Accessibility: identifies focus ring suppression (`outline: none` without visible `:focus-visible`).
  - Motion Safety: verifies `@media (prefers-reduced-motion: reduce)` fallbacks for animated elements.
  - Ergonomics: audits mobile touch target boundaries (minimum 44x44px) and non-semantic interactive controls (`<div>` with `onclick`).
- **Structured Criticism Schema (`@cwa/core/evaluation-types`)**:
  - Machine-readable structured findings containing `id`, `category`, `severity`, `affectedElementOrSelector`, `evidence`, `reason`, `suggestedFix`, `verificationMethod`, `isObjectiveDefect`, and `status`.
- **Autonomous Self-Refinement Engine (`@cwa/core/refinement-engine`)**:
  - Real closed-loop correction loop: `Build → Render → Inspect → Critique → Prioritize → Fix → Rebuild → Verify`.
  - Targeted programmatic patches for Web Audio removal, `:focus-visible` injection, `prefers-reduced-motion` injection, `max-width: 100% / overflow-x: hidden` horizontal containment, and non-semantic button refactoring.
  - Bounded iteration budgets (`FAST`: 1, `DEEP_CREATIVE`: 3, `ARCHITECT_MAX`: 5) preventing infinite loops.
  - Regression Rollback Guard: automatically detects score regressions or newly introduced critical issues and restores verified checkpoints.
- **Creative Pipeline State Machine Integration (`@cwa/core/creative-pipeline`)**:
  - Added 8th mandatory stage `browser_evaluation` with real Playwright execution and automated screenshot delivery.
  - Direct integration into CLI commands `cwa create` and `cwa critique [file] --fix`.
- **117 automated tests across 30 test files in Vitest (100% passing)**.

## [2.1.0] — 2026-10-26

### Added — Phase 2: Creative Pipeline & Motion Intelligence

- **Pipeline State Machine (`@cwa/core/pipeline-state-machine`)**: Strict 7-stage orchestration state machine (`intent_analysis` → `knowledge_retrieval` → `concept_exploration` → `concept_selection` → `design_dna` → `motion_planning` → `website_implementation`). Enforces prerequisite dependencies, pre/post-condition validations, and prevents skipped/failed stages from being reported as successful.
- **Explicit Execution Adapters (`@cwa/core/adapters`)**:
  - `ModelInferenceAdapter`: Swappable boundaries (`LocalHeuristicInferenceAdapter`, `EnvironmentApiInferenceAdapter`, `HostAgentWorkflowAdapter`).
  - `FileOperationsAdapter`: Real asynchronous disk operations (`NodeFileSystemAdapter`) and in-memory test runner (`VirtualFileSystemAdapter`).
  - `CommandExecutionAdapter`: Boundary-enforced process execution (`NodeProcessCommandAdapter`, `MockCommandAdapter`).
  - `ProjectScaffoldingAdapter`: Physical project generator supporting `standalone-html`, `modular-vite`, and `component-snippet`.
  - `BuildVerificationAdapter`: Guarantees non-empty physical files, HTML5 semantics, Design DNA custom properties, and 100% Silent by Default compliance.
- **Adaptive Execution Profiles (`FAST` | `DEEP_CREATIVE` | `ARCHITECT_MAX`)**: Automatically infers execution depth based on task complexity or explicit caller override.
- **Motion Intelligence Engine & Conflict Detector (`@cwa/core/motion-intelligence`)**: Plans across 5 tiers (narrative, structural, interactive, micro, ambient) with device-tier adaptations (desktop, mobile touch, low power). Detects competing scroll listeners, layout thrashing (`width`, `height`, `top`, `left`), and unthrottled rAF loops. Automatically selects libraries based on technical necessity (`pure-css-waapi`, `spring-solver`, `three-minimal`, `canvas-context`).
- **Signature Experience Generator (`@cwa/core/signature-experience`)**: Derives domain-specific signature interactions (e.g. *Kinematic Telemetry Ribbon*, *Liquid Cursor Aperture*, *Monospace Cryptographic Cipher*) with executable HTML/CSS/JS snippets, touch fallbacks, and reduced-motion alternatives.
- **Targeted Project Modification (`@cwa/core/website-implementation`)**: Selectively updates Design DNA tokens or injects components into existing user websites while preserving user assets, custom copywriting, and creating timestamped `.bak` backups.
- **107 automated tests across 28 test files in Vitest (100% passing)**.

## [2.0.0] — 2026-10-25

### Added — Autonomous Creative Web Intelligence Engine

- **Intent Intelligence Engine (`@cwa/core/intent-engine`)**: Deep semantic inference engine transforming 1–3 lines of natural language into an exhaustive structured brief (industry, audience psychology, brand personality, emotional direction, visual identity, content architecture, motion suitability, and accessibility constraints).
- **Adaptive Effort Profiling (`@cwa/core/adaptive-effort`)**: Automatically infers execution profile (`FAST` for micro-components, `DEEP_CREATIVE` for complete websites, `ARCHITECT_MAX` for spatial/experimental/awards mandates).
- **Creative Concept Exploration (`@cwa/core/concept-generator`)**: Generates 3 materially divergent directions (Refined, Experimental, Immersive) with distinct typography scales, materials, and palettes.
- **9-Criteria Concept Evaluator & Hybrid Synthesis (`@cwa/core/concept-evaluator`)**: Machine-readable scoring across brief alignment, originality, brand relevance, visual coherence, UX clarity, motion potential, performance, accessibility, and feasibility. Synthesizes winning hybrid concepts.
- **Project-Specific Design DNA System (`@cwa/core/design-dna`)**: Generates exhaustive design tokens, fluid clamp typography, container proportions, and CSS custom properties (`toCSSVariables()`).
- **5-Tier Motion Intelligence Engine (`@cwa/core/motion-intelligence`)**: Categorizes motion into narrative, structural, interactive, micro, and ambient. Enforces frame budgets, reduced-motion fallbacks, and conflict prevention.
- **Signature Experience Generator (`@cwa/core/signature-experience`)**: Proposes memorable, brand-tailored interaction moments (e.g. dual-image liquid apertures, inertial sticky card decks, chiaroscuro orbits).
- **Autonomous Visual Critic (`@cwa/core/visual-critic`)**: Automated quality inspection for horizontal overflow (100vw), fixed width breakpoints, typography measure, image CLS, and No-Glow policy compliance.
- **Autonomous Experience Critic (`@cwa/core/experience-critic`)**: Evaluates keyboard focus rings, touch target ergonomics (>= 44px), prefers-reduced-motion, semantic buttons, and non-negotiable Silent-by-Default enforcement.
- **Bounded Self-Refinement Engine (`@cwa/core/refinement-engine`)**: Automated closed-loop cycle (Generate → Inspect → Critique → Prioritize → Fix → Re-evaluate).
- **Persistent Experience Memory (`@cwa/core/experience-memory`)**: Records validated outcomes, successful technique pairings, critic findings, and known failure patterns across sessions.
- **25-Scenario Evaluation Benchmark Suite (`@cwa/core/benchmark-suite`)**: Repeatable benchmark covering 10 major industry categories with quantitative quality and refinement reports.
- **CLI Commands**:
  - `cwa create "<prompt>"`: Generates complete verified websites from short prompts.
  - `cwa critique [file]`: Runs visual and experience critics with line-item diagnostics.
  - `cwa benchmark`: Runs the 25-scenario evaluation suite.
- 75 automated unit and integration tests across 20 test files in Vitest (100% passing).

## [0.1.0] — Unreleased

### Added

- Initial monorepo structure with pnpm workspaces
- `@cwa/core` package — skill discovery, configuration, type system
- `@cwa/cli` package — init, install, update, doctor, list, uninstall commands
- `@cwa/effects` package — Liquid Glass components, motion utilities
- 23 reusable Agent Skills covering creative direction, design, engineering, and quality
- Comprehensive design style knowledge base (40+ documented styles)
- Liquid Glass component library (15 components with CSS/Enhanced/Advanced levels)
- Motion design system with scroll storytelling support
- Typography intelligence with variable fonts and fluid type scales
- Design system generation engine
- Accessibility skill with WCAG guidance
- Performance optimization skill with Core Web Vitals targets
- Visual QA workflow
- 8 demonstration templates (automotive, dashboard, portfolio, editorial, 3D, studio, coffee, corporate)
- CLI installer with environment detection (Claude Code, Cursor, Gemini CLI, GitHub Copilot)
- Cross-platform support (Windows, macOS, Linux)
- MIT License
- Full documentation suite
- GitHub Actions CI workflows
- Vitest unit tests
- Playwright E2E test scaffolding
