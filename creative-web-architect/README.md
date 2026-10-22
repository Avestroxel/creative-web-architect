# Creative Web Architect

[![CI](https://github.com/creative-web-architect/creative-web-architect/actions/workflows/ci.yml/badge.svg)](https://github.com/creative-web-architect/creative-web-architect/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node Version](https://img.shields.io/badge/Node->=18.0.0-brightgreen.svg)](https://nodejs.org/)

> **Autonomous AI Design & Creative Development Agent Toolkit.**  
> Transform one-sentence prompts like *"Create a luxury automotive website"* into distinctive, production-grade, accessible, and high-performance websites.

---

## Overview

**Creative Web Architect (CWA)** is a model-agnostic, open-source creative engineering system designed for developers and non-developers. Rather than pretending to be a standalone language model, CWA equips your existing AI coding environments (Cursor, Claude Code, Antigravity, Gemini CLI, Windsurf, GitHub Copilot) with autonomous design intelligence.

CWA bridges the gap between basic boilerplate code and award-winning digital experiences by unifying 15 creative disciplines:

1. **Creative Director** — Visual storytelling, emotional resonance, brand archetype
2. **Digital Art Director** — Cinematic aesthetic direction and layout harmony
3. **Brand Identity Designer** — Bespoke colorways, micro-pigments, and styling tokens
4. **UI/UX Designer** — Ergonomic information hierarchy and user flows
5. **Typography Specialist** — Optical sizing, modular fluid scales, and kinetic type
6. **Design System Architect** — Semantic tokens for light/dark and glassmorphism
7. **Frontend Engineer** — Robust, modern TypeScript, CSS, and component architectures
8. **Motion Designer** — Spring physics, gestures, cursor magnetism, and stagger delays
9. **3D / WebGL Engineer** — Three.js choreography, GLTF compression, and canvas shaders
10. **Interactive Experience Designer** — Tactile haptics and multi-sensory feedback
11. **Web Performance Engineer** — Core Web Vitals (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1)
12. **Accessibility Engineer** — WCAG AAA contrast, keyboard traps, and reduced-motion
13. **Visual QA Specialist** — Systematic design review and regression scoring
14. **Open-Source Tooling Engineer** — Frictionless CLI (`cwa`) and multi-environment detection
15. **Technical Documentation Writer** — Standardized specifications and actionable guides

---

## Architecture

```mermaid
graph TD
    UserPrompt["User Prompt: 'Create a luxury automotive website'"]
    
    subgraph CWA Agent Intelligence
        Brief["brief-interpreter"]
        Direction["creative-direction"]
        Style["design-style-selection (42+ styles)"]
        Tokens["design-system + typography"]
    end
    
    subgraph Engineering Engine
        Glass["@cwa/effects (Liquid Glass L1-L3)"]
        Motion["@cwa/effects (Spring Physics & Motion)"]
        Three["three-dimensional-web & shaders"]
    end
    
    subgraph Quality Assurance
        A11y["accessibility (WCAG AAA)"]
        Perf["performance-optimization (CWV targets)"]
        QA["visual-qa scorecard"]
    end

    UserPrompt --> Brief
    Brief --> Direction
    Direction --> Style
    Style --> Tokens
    Tokens --> Glass
    Tokens --> Motion
    Tokens --> Three
    Glass --> A11y
    Motion --> Perf
    Three --> QA
    QA --> Output["Production Experience"]
```

---

## Quick Start

### 1. Initialize in Your Workspace

Run the `cwa` CLI to automatically detect your AI coding environment and configure skills:

```bash
npx @creative-web-architect/cli init
```

### 2. Install Skills

Install all 23 creative skills or select specific ones:

```bash
# Install all skills into your detected agent workspace
npx @creative-web-architect/cli install

# Or install specific capabilities
npx @creative-web-architect/cli install liquid-glass motion-design typography
```

### 3. Verify Environment Health

Run the diagnostic suite:

```bash
npx @creative-web-architect/cli doctor
```

---

## Supported AI Coding Environments

| Environment | Supported Format | Auto-Detected Config Location |
| :--- | :--- | :--- |
| **Cursor** | `.cursorrules` & `.cursor/skills` | `.cursor/` or `.cursorrules` |
| **Antigravity** | Agent Skills (`SKILL.md`) | `.agents/skills` or `AGENTS.md` |
| **Claude Code** | Agent Skills (`SKILL.md`) | `.claude/skills` or `CLAUDE.md` |
| **Gemini CLI** | Agent Skills (`SKILL.md`) | `.gemini/skills` or `GEMINI.md` |
| **GitHub Copilot** | Custom Instructions | `.github/copilot-instructions.md` |
| **Windsurf / VS Code** | System Markdown Prompting | `.windsurf/` or `.vscode/` |

---

## Workspace Packages

This monorepo is organized using **pnpm workspaces**:

- **[`packages/core`](./packages/core)**: Core skill discovery engine, configuration management (`cwa.config.json`), design tokens, and types.
- **[`packages/cli`](./packages/cli)**: Command-line interface (`cwa init`, `install`, `update`, `doctor`, `list`, `uninstall`).
- **[`packages/effects`](./packages/effects)**: React component library providing **Liquid Glass** surfaces (Button, Card, Navbar, Dock, Modal, Tabs, Switch, Tooltip) and spring motion physics (`useReducedMotion`, `useScrollProgress`, `useTilt`, `useMagnetic`).
- **[`templates/luxury-automotive`](./templates/luxury-automotive)**: *Aether Apex* — Showcase luxury electric Grand Tourer with rotatable 3D canvas wireframe, live telemetry, colorway switcher, and Web Audio API electric propulsion acoustic simulator.
- **[`templates/modern-dashboard`](./templates/modern-dashboard)**: *Nebula.OS* — Real-time distributed GPU cluster telemetry dashboard with live Canvas throughput graphs, floating Liquid Glass dock, and `Cmd+K` command palette.
- **[`templates/creative-portfolio`](./templates/creative-portfolio)**: *Kaelen Voss Studio* — Creative technologist portfolio with spring-smoothed custom cursor, filterable archive grid, and performance-driven case study modals.
- **[`examples/showcase`](./examples/showcase)**: Interactive showcase gallery and live Liquid Glass playground.

---

## The 23 Agent Skills Catalog

Every skill is structured as a self-contained directory containing a standardized `SKILL.md` file with YAML frontmatter:

| Skill | Category | Primary Focus |
| :--- | :--- | :--- |
| `brief-interpreter` | Intelligence | Deconstructs vague user prompts into structured design requirements |
| `creative-direction` | Intelligence | Formulates art direction, color moodboards, and narrative tension |
| `design-style-selection`| Design | 42+ curated aesthetics (Minimal, Brutalist, Cyber, Luxury, Bento, etc.) |
| `typography` | Design | Modular type scales, optical sizing, fluid `clamp()` formulas, RTL |
| `layout-composition` | Design | Asymmetric grids, bento layouts, container queries, visual rhythm |
| `design-system` | Design | Complete semantic token hierarchies (colors, spacing, elevation) |
| `liquid-glass` | Engineering | Multi-layer frosted glass surfaces, blur levels, specular highlights |
| `motion-design` | Engineering | Spring physics curves, micro-interactions, cursor magnetism, staggers |
| `scroll-storytelling` | Engineering | Pinned cinematic scroll sequences, scrubbed reveals, horizontal feeds |
| `three-dimensional-web`| 3D / WebGL | Three.js scenes, GLTF optimization, lighting, and camera orbits |
| `shaders-and-effects` | 3D / WebGL | GLSL fragment shaders, procedural noise, bloom, displacement |
| `accessibility` | Quality | WCAG AAA contrast, keyboard traps, ARIA roles, reduced motion |
| `performance-optimization`| Quality | Core Web Vitals targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 |
| `visual-qa` | Quality | Systematic design audits, scorecard reviews, regression tests |
| `responsive-design` | Quality | Mobile-first breakpoints, touch targets (≥44px), viewport scaling |
| `content-writing` | Creative | Editorial copy, high-impact headlines, UI microcopy |
| `image-art-direction` | Creative | Visual styling direction, photography filters, procedural SVGs |
| `website-redesign` | Strategy | Incremental refactoring and aesthetic elevation of legacy sites |
| `ecommerce-design` | Domain | High-conversion product showcases, quick-views, micro-checkouts |
| `dashboard-design` | Domain | Telemetry layouts, live data streaming, dark-mode ergonomics |
| `portfolio-design` | Domain | Creative showcases, interactive case studies, contact drawers |
| `cinematic-product-pages`| Domain | Sticky feature reveals, exploded views, technical specifications |
| `project-delivery` | Production | Production build audits, bundle optimization, security checks |

---

## Liquid Glass Specification

Liquid Glass in CWA is designed as an architectural material system spanning three tiers:

- **Level 1 (Standard CSS)**: Hardware-accelerated `backdrop-filter: blur(12px-40px) saturate(180%)`, translucent borders with specular contrast, and high-depth box shadows.
- **Level 2 (Interactive Specular Highlights)**: Dynamic radial gradient highlights that follow mouse/touch coordinates, simulating directional light refraction across glass surfaces.
- **Level 3 (Advanced Fluid Dynamics)**: WebGL displacement maps, optical chromatic aberration, and canvas refractions with fallback to Level 1.

All Liquid Glass components automatically respect user motion preferences and fall back gracefully on devices without `backdrop-filter` support.

---

## Core Web Vitals & Performance Targets

Every design generated by Creative Web Architect is held to strict performance standards:

| Metric | Target | Method |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `≤ 2.5s` | Critical CSS inlining, font-display: swap, responsive images |
| **INP (Interaction to Next Paint)** | `≤ 200ms` | CSS transforms for animations, debounced event listeners |
| **CLS (Cumulative Layout Shift)** | `≤ 0.1` | Explicit aspect ratios on media, reserve layout space |
| **Frame Rate** | `60 FPS` | GPU composited properties (`transform`, `opacity`), RAF loops |

---

## Development & Testing

```bash
# Clone the repository
git clone https://github.com/creative-web-architect/creative-web-architect.git
cd creative-web-architect

# Install dependencies across all workspaces
pnpm install

# Build all packages (core, cli, effects)
pnpm build

# Run Vitest test suite
pnpm test

# Run CLI diagnostic
pnpm doctor
```

---

## License & Community

Creative Web Architect is open-source software licensed under the **[MIT License](./LICENSE)**.  
Contributions, feedback, and skill extensions are welcomed via issues and pull requests. Please review our **[Contributing Guidelines](./CONTRIBUTING.md)** and **[Code of Conduct](./CODE_OF_CONDUCT.md)**.
