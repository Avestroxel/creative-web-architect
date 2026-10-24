---
name: hover-interaction-design
description: Sophisticated hover design covering direction-aware overlays, controlled 3D tilt, typography swaps, image masking, and graceful touch device handling.
version: 0.2.0
tags: [hover, interactions, tilt, 3d, cursor, magnetic, transitions]
---

# Premium Hover Interaction Design

## Core Rules

1. **Never Force Hover on Touch**: Wrap desktop-only hover listeners inside `@media (hover: hover) and (pointer: fine)`. Touch devices must receive intuitive tap feedback instead.
2. **Controlled 3D Tilt**: Limit tilt angles to max 8°–12°. Never tilt cards so aggressively that content becomes illegible.
3. **Restrained Lighting**: Replace bright neon glare overlays with soft specular sheen (`opacity: 0.08`).

---

## Key Interaction Archetypes

### 1. Controlled 3D Perspective Tilt
Calculates cursor distance from element center and applies subtle 3D rotation:
```css
transform: perspective(1000px) rotateX(calc(var(--tilt-y) * -8deg)) rotateY(calc(var(--tilt-x) * 8deg)) scale(1.015);
transition: transform 80ms ease-out;
```
On mouse leave, reset with smooth deceleration (`300ms cubic-bezier(0.16, 1, 0.3, 1)`).

### 2. Direction-Aware Reveal
Compute entry point angle using `Math.atan2(deltaY, deltaX)` to enter the overlay from top, bottom, left, or right.

### 3. Editorial Typography Swap
Headline cross-fades or slides smoothly to reveal translation, metadata, or sub-brand name.

### 4. Image Masking & Expansion
Images gently expand (`scale(1.03)`) inside an `overflow: hidden` container with a 400ms luxury deceleration curve.
