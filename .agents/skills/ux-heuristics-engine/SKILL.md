---
name: ux-heuristics-engine
description: "Applies 119 UX heuristics across a 10-tier priority ladder, enforcing ergonomic touch targets (44px+), zero-thrash performance budgets, WCAG AA accessibility, and strict Silent-by-Default audio policies."
version: 1.0.0
tags: [ux-heuristics, priority-ladder, ergonomics, accessibility, wcag, core-web-vitals, silent-by-default, touch-targets]
activationKeywords: [ux heuristics, priority ladder, ergonomics, accessibility, touch target, core web vitals, performance budget, silent by default]
dependencies: [accessibility, testing, performance]
---

# UX Heuristics Engine & Decision Priority Ladder

The **UX Heuristics Engine** enforces 119 vetted usability heuristics, ergonomics constraints, and accessibility standards across every interface component.

## The 10-Tier UX Priority Ladder

When trade-offs arise between visual styling, speed, and usability, resolve them strictly using this 10-tier hierarchy:

1. **Tier 1: Data Integrity & Security:** Transactions, inputs, and state must never be corrupted, lost, or silently submitted.
2. **Tier 2: System Feasibility & Error Recovery:** Graceful degradation, informative error messages, non-destructive undo mechanisms.
3. **Tier 3: Primary User Flow Completion:** The core conversion or task path (e.g., checkout, signup, search) must remain uninterrupted by decorative friction.
4. **Tier 4: Accessibility & WCAG Standards:** WCAG 2.1 AA compliance (4.5:1 text contrast, 3:1 non-text, keyboard navigability, clear focus rings).
5. **Tier 5: Core Usability & Clarity:** Obvious affordances, legible typography measures (45-75 chars/line), self-evident hierarchy.
6. **Tier 6: Ergonomics & Touch Geometry:** Mobile touch targets $\ge 44 \times 44\text{px}$ (accessible $48\times 48\text{px}$), thumb-zone reachability, safe area insets (`env(safe-area-inset-*)`).
7. **Tier 7: Perceived Performance & Latency:** First Contentful Paint (FCP) $< 0.8\text{s}$, Largest Contentful Paint (LCP) $< 1.2\text{s}$, Cumulative Layout Shift (CLS) $< 0.05$, Interaction to Next Paint (INP) $< 150\text{ms}$.
8. **Tier 8: Visual Hierarchy & Harmony:** Consistent spacing tokens (4px/8px scale), clear optical balance, grid alignment.
9. **Tier 9: Motion & Micro-interactions:** Spring-damped transitions, contextual feedback, layout transitions, zero layout thrashing (transform/opacity only).
10. **Tier 10: Aesthetic Novelty & Delight:** Shaders, canvas dynamics, custom cursor magnetic physics, bespoke visual flair.

## Core Usability Constraints

### Ergonomics & Sizing
* **Interactive Targets:** Minimum $44 \times 44\text{px}$ bounding box on mobile/tablet viewports; $32\times 32\text{px}$ on desktop pointer viewports.
* **Hit Area Buffer:** When visual icon size is small ($16\text{px}-20\text{px}$), expand touch target with padding or `::before` pseudo-element to meet $44\text{px}$.
* **Form Inputs:** Input height minimum $44\text{px}$, font size minimum $16\text{px}$ on mobile to prevent iOS Safari auto-zoom.

### Accessibility Standards
* **Focus States:** Every interactive element must display a visible focus indicator (`outline: 2px solid var(--accent); outline-offset: 2px;`). Never set `outline: none` without providing an equivalent focus-visible ring.
* **Contrast Ratios:** Minimum 4.5:1 contrast for standard text; minimum 3:1 for large display headlines ($\ge 24\text{px}$ or $\ge 18.5\text{px}$ bold) and UI components/borders.
* **Semantic HTML:** Buttons must use `<button>`, links must use `<a>`, headers must follow chronological hierarchy (`h1` $\rightarrow$ `h2` $\rightarrow$ `h3`).

### Performance & Motion
* **Compositor Only:** Animate strictly `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
* **Reduced Motion:** Always include `@media (prefers-reduced-motion: reduce)` fallbacks that disable heavy spatial transitions or continuous oscillations.

### Strict Silent-by-Default Policy
* **Zero Autonomous Audio:** Websites and components must NEVER trigger synthetic tones, sound effects (SFX), or audio playback automatically or on hover.
* **Audio Rule:** Audio is strictly prohibited unless explicitly requested by the user with deliberate, opt-in play controls.
