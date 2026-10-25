---
name: visual-style-taxonomy
description: "Applies 79 searchable aesthetic UI styles (Soft UI, Swiss Editorial, Dark Glassmorphism, Neo-Brutalism, Kinetic Minimal) with 3 calibrated design dials (variance 1-10, motion 1-10, density 1-10), curated typography pairings, and semantic color palettes."
version: 1.0.0
tags: [visual-styles, aesthetic-taxonomy, design-dials, variance-tuning, typography-pairings, color-palettes, anti-patterns]
activationKeywords: [visual style, aesthetic taxonomy, design dials, variance dial, motion dial, density dial, color palette, font pairing]
dependencies: [design-system, typography, creative-direction]
---

# Visual Style Taxonomy & Parameter Tuning

The **Visual Style Taxonomy** provides an exhaustive catalog of 79 vetted interface aesthetics, backed by mathematical parameter dials and anti-pattern filters to ensure distinctive, high-end visual presence.

## The 3 Design Parameter Dials

When formulating visual direction, calibrate the 3 continuous parameter dials (1 to 10):

### 1. Variance Dial (`--variance: 1-10`)
* **1 - 3 (Balanced / Centered):** Symmetrical grids, classical alignment, high predictability, traditional enterprise stability.
* **4 - 7 (Dynamic / Controlled):** Off-grid offsets, intentional baseline shifts, staggered cards, editorial cadence.
* **8 - 10 (Bold / Asymmetric):** Dramatic viewport cross-sections, oversized typography breaks, unconventional clipping paths, street-luxe neo-brutalism.

### 2. Motion Intensity Dial (`--motion: 1-10`)
* **1 - 3 (Subtle Precision):** 150ms-250ms micro-transitions, opacity fades, crisp hover state changes, strictly functional.
* **4 - 7 (Kinetic Fluidity):** Spring-damped physics, scroll-synchronized character reveals, smooth parallax depth, magnetic cursor proximity.
* **8 - 10 (Cinematic Spectacle):** Full WebGL camera orbits, GLSL wave shaders, particle turbulence, multi-phase coordinate morphs.

### 3. Content Density Dial (`--density: 1-10`)
* **1 - 3 (Expansive Luxury):** Generous 120px+ section paddings, monumental typography, wide breathing room (Ma void), high-end editorial.
* **4 - 7 (Balanced Commercial):** Standard 64px-80px gutters, comfortable reading measures, balanced card padding.
* **8 - 10 (Compact Data-Dense):** Dense 8px-12px container grids, 12px uppercase tabular telemetry, multi-column dashboard layouts.

## Top Curated Aesthetic Styles

| Style Key | Core Materials & Geometry | Best-Fit Domain | Anti-Patterns to Avoid |
| :--- | :--- | :--- | :--- |
| **Swiss Editorial** | Massive display serifs, 1px structural gridlines, high monochrome contrast | Architecture, publishing, luxury fashion, film | Avoid colorful cards, floating badges, or rounded pill shapes |
| **Matte Obsidian** | Deep #08090C surfaces, 0.5px hairline boundaries, warm off-white typography | Developer tools, AI hardware, cybersecurity | Avoid cheap purple neon glows, heavy drop shadows, or blurry gradients |
| **Soft UI Evolution** | Delicate multi-tier inset shadow bevels, tactile depression on click, soft cream/slate | Wellness, lifestyle, premium productivity | Avoid flat un-beveled edges or harsh high-contrast black borders |
| **Kinetic Minimal** | Monospace accents, micro-letter-spacing, crisp spring-damped element reveals | Design studios, modern SaaS, technical consultancies | Avoid gratuitous bouncing or un-damped continuous loops |
| **Neo-Brutalism Luxe** | Heavy high-contrast black strokes, saturated pastel color blocks, bold angular edges | Streetwear, music, youth culture, creative agencies | Avoid washed-out grays, delicate gradients, or subtle drop shadows |
| **Refined Liquid Glass** | Optical refraction, subtle backdrop-filter (14px-28px), hairline specular rims | Fintech, premium SaaS, futuristic products | Avoid over-frosted opacity (>40px blur) or unreadable low-contrast text |

## Typography & Color Coupling Protocol

1. **Query Curated Pairings:** Use the 74 vetted font combinations in `knowledge/design-intelligence/data/typography.csv`.
2. **Apply Semantic Color Tokens:** Select from the 192 product-matched palettes in `knowledge/design-intelligence/data/colors.csv`.
3. **Verify Contrast:** Ensure WCAG 2.1 AA 4.5:1 minimum contrast across all viewport states.
4. **Enforce Silence:** Zero unrequested sound or audio synthesizers.
