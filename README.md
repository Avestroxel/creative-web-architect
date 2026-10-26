# Creative Web Architect 2.0

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-129%2F129%20passing-brightgreen.svg)](packages/core)
[![Node Version](https://img.shields.io/badge/Node->=18.0.0-brightgreen.svg)](https://nodejs.org/)

> **Autonomous Creative Web Intelligence Engine.**  
> Evolving beyond static templates and prompt recipes: turns **1–3 lines of natural-language input** into a distinctive, professional, technically sound, highly creative, responsive website with intelligent design decisions, purposeful advanced animations, and iterative self-criticism.
>
> **Core Principle:** *"Minimum User Prompt, Maximum Internal Creative Intelligence."*

---

## What's New in CWA 2.0

Creative Web Architect 2.0 transforms CWA from a passive skill repository into an **autonomous decision-making intelligence engine**:

```
[1-3 Line Prompt]
       │
       ▼
[Phase 1: Intent Intelligence Engine] ───────────► Category, Audience, Personality, Content Architecture
       │
       ▼
[Phase 2: Adaptive Effort Profiler]  ───────────► FAST | DEEP_CREATIVE | ARCHITECT_MAX
       │
       ▼
[Phase 3: 3-Concept Exploration & 9-Criteria] ──► Refined vs Experimental vs Immersive -> Winning Concept
       │
       ▼
[Phase 4: Design DNA Architecture]   ───────────► Fluid Typography, Grid Proportions, Colors, CSS Custom Properties
       │
       ▼
[Phase 5: Motion Intelligence & Signature]  ────► 5-Tier Motion Plan + 1-2 Signature Experiences
       │
       ▼
[Phase 6: Multi-Factor Knowledge & Skills] ─────► Top 2-4 Synergistic Techniques + Experience Retrieval Boosting
       │
       ▼
[Phase 7: Autonomous Critics & Bounded Refine] ─► Visual Critic + Experience Critic -> Fix -> Re-evaluate
       │
       ▼
[Phase 8: Persistent Experience Memory] ────────► Provenance, Validation, Secret Sanitization & Avoided Failures
```

### 1. Intent Intelligence Engine (`@cwa/core/intent-engine`)
Understands minimal 1–3 line inputs (e.g. *"Create a premium portfolio for a futuristic architecture studio"*) and independently derives an exhaustive, structured creative brief covering website category, audience psychology, brand personality, emotional goals, content architecture, motion suitability, and accessibility requirements without asking trivial questions.

### 2. Adaptive Effort Profiler (`@cwa/core/adaptive-effort`)
Intelligently scales internal reasoning to the task:
- **`FAST`**: Micro-components, single buttons, bug fixes (1 validation pass).
- **`DEEP_CREATIVE`** (Default for complete websites): 3-concept exploration, Design DNA synthesis, implementation, visual inspection, and up to 3 refinement iterations.
- **`ARCHITECT_MAX`**: High-end creative, spatial, 3D, or awards mandates requiring expanded concept exploration, deeper interaction design, and up to 5 refinement iterations.

### 3. Creative Concept Exploration & 9-Criteria Evaluation (`@cwa/core/concept-generator`)
Eliminates rigid archetype templates. Explores 3 materially divergent directions before coding:
- **Concept A (Refined Direction):** Quiet craft, Swiss discipline, strict typographic hierarchy.
- **Concept B (Experimental Direction):** Unconventional layouts, expressive typography, asymmetric rhythm.
- **Concept C (Immersive Direction):** Spatial depth, cinematic staging, 3D/shaders (only when justified).
Evaluates candidate directions across **9 explicit criteria**: Brief Alignment, Originality, Brand Relevance, Visual Coherence, UX Clarity, Motion Potential, Performance Feasibility, Accessibility, and Technical Feasibility, synthesizing the winning concept with strategic rationale.

### 4. Project-Specific Design DNA System (`@cwa/core/design-dna`)
Formulates an unshakeable visual system keeping every section coherent: fluid typography clamp scales, container grids, color systems, material language, and spring micro-interaction tokens (`toCSSVariables()`).

### 5. 5-Tier Motion Intelligence & Signature Experience (`@cwa/core/motion-intelligence`)
Classifies motion into narrative, structural, interactive, micro-interaction, and ambient motion. Enforces strict frame budgets, reduced-motion fallbacks, and proposes 1–2 distinctive signature experiences tailored to the brand.

### 6. Autonomous Visual & Experience Critics with Bounded Self-Refinement (`@cwa/core/evaluation`)
- **Visual Critic**: Scans for horizontal overflow (`100vw` without overflow handling), fixed pixel widths (`width: 900px`), missing fluid typography clamps, image CLS risks, and No-Glow compliance violations.
- **Experience Critic**: Evaluates keyboard focus rings (`:focus-visible`), touch targets (>= 44px), `prefers-reduced-motion` compliance, semantic buttons, and non-negotiable **Silent-by-Default** enforcement.
- **Real Playwright Browser Automation**: Multi-viewport screenshots (Desktop 1440, Tablet 768, Mobile 375), runtime console error interception, and layout collision checks.
- **Bounded Self-Refinement Engine**: Automated closed-loop cycle (Generate → Inspect → Critique → Prioritize → Fix → Re-evaluate) with configurable safety stopping limits.

### 7. Persistent Experience Memory (`@cwa/core/experience-memory`)
Records validated project lessons, successful technique pairings, critic findings, and known failure patterns across sessions in `.cwa/memory/experience-memory.json`:
- **Provenance Tracking**: `automated-pipeline`, `manual-critique`, `benchmark-suite`, `seed-archive`.
- **Validation Status**: `verified-browser`, `verified-deterministic`, `pending`, `unverified`.
- **Secret Sanitization**: Zero API keys, bearer tokens, passwords, or emails persisted.
- **Experience-Based Retrieval**: Connects to `KnowledgeRetriever` to boost validated techniques (+4.5) and proactively avoid known failure patterns.

### 8. Repeatable 25-Scenario Benchmark & 3-Way Comparative Analysis (`@cwa/core/benchmark-suite`)
Quantitative evaluation suite testing CWA across 25 diverse scenarios spanning 10 industries (Portfolio, Creative agency, SaaS, E-commerce, Automotive, Architecture, Editorial, Dashboard, Luxury product, Experimental interactive):
- **3-Way Comparative Evaluation (`cwa benchmark --compare`)**: Compares Mode A (Without CWA - Naive baseline), Mode B (Baseline CWA), and Mode C (Enhanced CWA with Critics & Memory), quantifying the autonomous refinement lift and advantage over raw generation.

---

## Quick Start: CLI Commands

```bash
# 1. Install & build
git clone https://github.com/Avestroxel/creative-web-architect.git
cd creative-web-architect
pnpm install
pnpm build
npm link packages/cli

# 2. Autonomously create a complete website from a 1-3 line prompt
cwa create "Monograph portfolio for a Tokyo brutalist architecture practice"

# 3. Critique any HTML file with the autonomous visual and experience critics
cwa critique index.html

# 4. Run the 25-scenario evaluation benchmark suite
cwa benchmark
cwa benchmark --quick

# 5. Initialize CWA skills, techniques, and directives in any folder
cwa init .
cwa init "C:\Users\YourName\Desktop\my-project"
```

---

## Core Design Non-Negotiables

| Policy | Rule | Rationale |
| :--- | :--- | :--- |
| **Strict No-Glow** | Matte obsidian/charcoal surfaces, 0.5px hairlines, quiet luxury. **Zero** cheap purple neon halos or blurry card glow. | Eliminates amateurish AI aesthetics in favor of Awwwards-caliber craft. |
| **Silent by Default** | **Zero** unrequested Web Audio synthesizers, audio oscillators, or background music. | All websites and components must be 100% silent unless sound is explicitly requested by the user. |
| **Fluid Responsiveness** | All typography must use CSS `clamp()`. No fixed pixel widths (`width: 900px`). | Flawless rendering from 320px mobile viewports to 4K ultra-wide monitors. |
| **Zero Context Bloat** | Selectively loads top 2–4 synergistic techniques and 3–6 skills per project. | Keeps AI prompt contexts fast, sharp, and focused on relevant patterns. |

---

## System Metrics & Verification

- **Automated Tests:** 75 tests across 20 test files in Vitest (100% passing).
- **Specialized Skills:** 40 modular Agent Skills in `skills/`.
- **Learned Architectural Techniques:** 43 mathematically indexed patterns in `knowledge/`.
- **Master Templates:** 9 standalone single-file verified deliverables in `templates/`.
- **Runtime:** 100% local, TypeScript-native, zero external API keys required.

---

## 40 Specialized Agent Skills (Summary)

All 40 skills are installed in `.agents/skills/<skill-name>/SKILL.md`:

| Category | Skills Included |
| :--- | :--- |
| **Art Direction & Intelligence** | `domain-archetype-reasoning`, `visual-style-taxonomy`, `brief-interpreter`, `creative-direction`, `premium-visual-direction`, `design-style-selection`, `content-writing`, `image-art-direction` |
| **Design Systems & Materials** | `design-system`, `typography`, `layout-composition`, `liquid-glass`, `refined-liquid-glass`, `no-excessive-glow-policy` |
| **Motion, Kinematics & Scroll** | `motion-design`, `cinematic-motion`, `advanced-scroll-animation`, `scroll-storytelling`, `hover-interaction-design`, `premium-button-interactions`, `toggle-and-switch-motion`, `page-transitions` |
| **3D, WebGL & Shaders** | `three-dimensional-web`, `shaders-and-effects` |
| **Quality, Performance & QA** | `ux-heuristics-engine`, `performance-optimization`, `animation-performance`, `accessibility`, `motion-accessibility`, `responsive-design`, `visual-qa`, `visual-motion-qa` |
| **Domains & Production** | `cross-platform-ui-matrix`, `dashboard-design`, `portfolio-design`, `ecommerce-design`, `cinematic-product-pages`, `website-redesign`, `project-delivery`, `knowledge-ingestion` |

---

## 43 Learned Architectural Techniques (Summary)

All 43 techniques are indexed in `knowledge/index.json` and detailed in `knowledge/learned-techniques/`:

| Index | Slug | Core Focus |
| :---: | :--- | :--- |
| **01** | `izanami-shadow-and-ink` | Urushi lacquer black, Kinpaku gold, 45% Ma void space, SVG turbulence ink reveals. |
| **02** | `cylindrical-curved-carousel-quad-projection` | Cylindrical quad carousel projection with non-linear width scaling and dynamic clip-path. |
| **03** | `video-atlas-single-stream-grid-sync` | Single 5x2 composite video texture slashing network overhead by 90% and preventing decoder crashes. |
| **04** | `queue-gated-mouse-scrub-video-kinematics` | Queue-gated horizontal mouse video scrubbing with anti-flood pipeline latching. |
| **05** | `conversational-action-triage-and-optical-blur` | Intentional optical blur on secondary copy paired with conversational action pills. |
| **06** | `sticky-stacking-card-deck-scale-decay` | Sticky card deck with scale decay formula and sticky viewport pinning. |
| **07** | `scroll-driven-character-opacity-wave` | Character-by-character text illumination tied directly to scroll progress. |
| **08** | `damped-magnetic-cursor-follow-physics` | 150px proximity magnetic cursor attraction with asymmetric spring timing. |
| **09** | `dual-row-scroll-coupled-marquee-kinematics` | Counter-directional dual-row horizontal marquees coupled to vertical scroll. |
| **10** | `ricardo-isometric-mechanical-console` | Pure CSS 3D isometric console diorama with knurled rotary potentiometer knobs. |
| **11** | `typolove-kinetic-variable-typography-and-specimen-craft` | Multi-axis variable typography (wght, wdth, slnt) with cursor weight waves. |
| **12** | `meech-street-luxe-neo-brutalism` | Asphalt noir palette, draggable physics holographic stickers, and industrial gaffer tape. |
| **13** | `farminerals-geochemical-soil-chromatics` | Scientific Munsell geochemical soil palette and mineral textures. |
| **14** | `tile-tactile-tessellation-system` | 1px structural container gap lines, micro-beveled inner shadows, and tactile depression. |
| **15** | `romanelli-kinetic-viewport-and-inertial-distortion` | Cursor preview portal with velocity skew transforms and full-screen FLIP transitions. |
| **16** | `twofour-seven-artists-sonic-telemetry` | Real-time analog decibel VU meters, zero-latency audio scrubbers, and studio tickers. |
| **17** | `dragonfly-biomimetic-optics` | Thin-film angle-dependent iridescence and skeletal 0.5px hairline grids. |
| **18** | `alethia-geospatial-telemetry` | Orthographic 3D wireframe Earth projection with spherical coordinates HUD. |
| **19** | `oscs-spatial-control-surface` | Aerospace telemetry HUD with magnetic docking and matrix3d orientation gizmo. |
| **20** | `mission-architectural-philosophy` | Archival 35mm film discipline and Swiss editorial typography. |
| **21** | `masked-video-clip-path-reveals` | Scroll-synchronized polygonal reveals expanding portrait stills into viewports. |
| **22** | `inertia-horizontal-film-pan` | Frictionless horizontal film pan without scroll hijacking. |
| **23** | `kinetic-roman-numeral-chapter-navigation` | Staggered kinetic reveals for chapter markers and navigation rails. |
| **24** | `dual-stack-runtime-detection-serving-protocol` | Zero-dependency static runtime detection vs framework intelligence. |
| **25** | `targeted-incremental-baseline-refactoring` | Non-destructive delta edits preserving baseline tokens and animations. |
| **26** | `alethia-stratigraphic-materiality` | Geological mineral palette and stratigraphic cross-sections. |
| **27** | `magnetic-project-index-pill` | Floating index pill with spring-damped proximity physics. |
| **28** | `scroll-driven-3d-gltf-flight-path-kinematics` | Viewport keyframe flight paths, hold-and-dive transitions, and Euler banking. |
| **29** | `procedural-multi-layer-alpha-threshold-wing-flutter` | Luminance alpha thresholding with 3-tier phase ghosting for biological motion blur. |
| **30** | `scroll-synchronized-multidirectional-flora-parallax` | Decoupled velocity/rotational botanical parallax with dynamic theme triage probes. |
| **31** | `model-viewer-cursor-tilt-and-forcefield-repulsion` | Google model-viewer cursor orbit tilt coupled with 400px item repulsion forcefields. |
| **32** | `shader-warmed-texture-swap-and-entity-implosion` | Pre-warmed GPU shader compilation, dual-phase spin, and entity spring implosions. |
| **33** | `three-tier-depth-layered-parallax-staging` | Volumetric stage depth planes with self-cleaning rising bubble particle physics. |
| **34** | `curvature-time-dilated-circuit-trace` | Curvature-coupled velocity modulation with dual-gradient heat filament. |
| **35** | `packed-delta-lattice-halftone-matrix` | 8,000+ point coordinate field delta-compressed to 16KB with O(1) queries. |
| **36** | `depth-parallax-normal-relighting-burn` | Single-quad UV depth map displacement with normal map relighting and dissolution burn. |
| **37** | `tactile-button-physics-and-micro-kinematics` | 7 signature micro-interaction architectures (Meniscus Wave, Cipher Jitter, 3D Mechanical Plate). |
| **38** | `dual-image-liquid-cursor-brush-reveal` | Full-bleed dual-image canvas aperture painting alternate image along cursor trail with radial gradient brush. |
| **39** | `chiaroscuro-bronze-wave-shader-and-spark-turbulence` | Cinematic 3D WebGL stage: 360° scroll camera orbit, molten GLSL wave shader, 450 forge sparks. |
| **40** | `adaptive-rem-grid-with-physics-gated-reveals-and-ghost-typography` | Dual-directional adaptive rem grid, curtain-sliding physics loader, Lenis scroll lock, multi-axis ghost typography. |
| **41** | `single-viewport-video-bleed-and-dual-cursor-kinematics` | Single-screen full-viewport lock, looping video bleeding into black, dual-entity LERP cursor, un-blur masked reveals. |
| **42** | `hyper-tactile-button-foundry-and-micro-physics` | Comprehensive 24-architecture suite: biometric scan morphing, organic gooey SVG filters, 8-tier neumorphic stamp. |
| **43** | `domain-reasoning-matrix-and-style-taxonomy` | 192 domain reasoning profiles, 79 aesthetic styles, 119 UX heuristics across a 10-tier priority ladder. |

---

## Standalone Master Templates

1. **Tactile Button Laboratory** (`templates/tactile-button-laboratory/index.html`): 24 interactive button architectures (Biometrics, 3D Skeuomorphic Extrusions, Gooey SVG Filters, Conic Shimmers, Kinetic Wipes).
2. **Loopstack — Footer Hero Landing** (`templates/loopstack-footer-hero/index.html`): Pure CSS/JS single-viewport moment, looping video bleeding into black, dual-entity LERP cursor, word-by-word un-blur.
3. **Baseline — Tennis Club & Academy** (`templates/baseline-tennis-club/index.html`): Lenis smooth-scroll, curtain physics loader, adaptive rem grid, 4-word ghost typography, spring micro-interactions.
4. **Laocoön — Bronze and Time** (`templates/laocoon-bronze-and-time/index.html`): Three.js 0.160, 360° camera orbit, liquid-bronze to sapphire GLSL wave shader, 450 forge sparks, 900vh scroll.
5. **Lumora — Design & Engineering Studio** (`templates/lumora-design-studio/index.html`): Lenis smooth-scroll, liquid dual-image canvas reveal, rem adaptive grid, 3-digit intro loader.
6. **KIMI — GRIDO1 Racing Systems** (`templates/kimi-racing-systems/index.html`): Three.js 0.185 + Lenis, Curvature-dilated circuit trace, 8,004-dot halftone matrix, sticky stack recede.
7. **Diet Soda — Flavor Chromatics** (`templates/soda-flavor-chromatics/index.html`): Google model-viewer 3D, cursor tilt, 400px forcefield repulsion, shader-warmed texture swaps.
8. **Melli — Master 3D Artistry** (`templates/melli-master-3d-artistry/index.html`): Three.js 0.160 bumblebee, flight path kinematics, alpha threshold wing flutter, diorama parallax.
9. **Aether Apex Hyper-GT** (`templates/luxury-automotive/index.html`): Interactive 3D vehicle wireframe canvas, live telemetry, electric propulsion.

---

## License & Attribution

Created by **Anas Hashim**.  
Copyright &copy; 2026 Anas Hashim. All rights reserved.  
Distributed under the **MIT License**.
