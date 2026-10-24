---
name: no-excessive-glow-policy
description: Permanent refined lighting and material policy. Prohibits cheap neon glows, oversaturated gradients, and childish AI aesthetic defaults in favor of mature architectural restraint.
version: 0.2.0
tags: [visual-design, lighting, restraint, premium, dark-mode, aesthetics]
---

# Refined Lighting & Material Policy (No-Glow Default)

## The Core Rule

**STOP GENERATING CHEAP-LOOKING, OVERLY GLOWING, NEON-HEAVY, CHILDISH INTERFACES BY DEFAULT.**

Excessive glow, saturated neon gradients, oversized colored shadows, and random decorative particles make websites look like amateur gaming templates.

True luxury and high-end engineering come from:
- **Flawless typography hierarchy**
- **Controlled architectural contrast**
- **Matte and tactile materials**
- **Hairline borders (0.5px / 1px with low opacity)**
- **Directional, subtle shadows**
- **Disciplined whitespace**

---

## The Prohibited Anti-Patterns

1. **NO Neon Box-Shadow Blobs**:
   - ❌ FORBIDDEN: `box-shadow: 0 0 50px #00F0FF, 0 0 100px #A855F7;`
   - ✅ REFINED: `box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08);`

2. **NO Oversaturated Primary Gradients**:
   - ❌ FORBIDDEN: `linear-gradient(135deg, #FF00FF, #00FFFF)` across backgrounds or massive headers.
   - ✅ REFINED: Monochromatic subtle gradations, or `linear-gradient(180deg, #FFFFFF 40%, rgba(255, 255, 255, 0.6) 100%)`.

3. **NO Glowing Borders on Every Element**:
   - ❌ FORBIDDEN: `border: 2px solid cyan; filter: drop-shadow(0 0 10px cyan);`
   - ✅ REFINED: `border: 1px solid rgba(255, 255, 255, 0.08);`

4. **NO Background Blobs without Purpose**:
   - ❌ FORBIDDEN: Random floating colored orbs blurred at 120px behind standard text cards.
   - ✅ REFINED: Neutral dark surfaces (`#0C0D12`, `#14161F`) with deliberate typography.

---

## Premium Color Palettes

### Premium Dark Mode
- **Base Background**: `#0C0D12` (Obsidian Charcoal)
- **Surface Elevation 1**: `#14161F` (Graphite Matte)
- **Surface Elevation 2**: `#1D202C` (Deep Slate Card)
- **Hairline Border**: `rgba(255, 255, 255, 0.08)`
- **Primary Text**: `#F3F4F6` (Warm Off-White, 95% contrast)
- **Secondary Text**: `#9CA3AF` (Muted Slate)
- **Restrained Accents**: Champagne Gold (`#D4AF37`) or Slate Blue (`#64748B`)

### Premium Light Mode
- **Base Background**: `#FBFBFB` (Alabaster White)
- **Surface Elevation 1**: `#FFFFFF` (Pure Card)
- **Hairline Border**: `rgba(0, 0, 0, 0.07)`
- **Primary Text**: `#0F172A` (Deep Slate Black)
- **Secondary Text**: `#4B5563` (Charcoal Neutral)

---

## Permitted Exceptions

Neon, cyberpunk, and vibrant particle glows are permitted **ONLY** when explicitly requested by the user (e.g., *"Design an 80s synthwave music visualizer"*).
In all standard, luxury, SaaS, fintech, portfolio, and automotive requests, **the default must be restrained, mature, and visually quiet.**
