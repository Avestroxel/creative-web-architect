---
name: premium-button-interactions
description: Engineering 18 subtle, accessible, and tactile button interaction patterns avoiding oversized bouncing, bright neon glows, or distracting burst effects.
version: 0.2.0
tags: [buttons, interactions, micro-animations, hover, magnetic, tactile]
---

# Premium Button Interaction System

## Button Philosophy: Subtle, Intentional, Tactile

Buttons must feel expensive, responsive, and physically grounded.
Avoid:
- ❌ Oversized bouncy scaling (`scale(1.2)`)
- ❌ Pulsing neon borders
- ❌ Random particle explosions
- ❌ Flashing rainbow backgrounds

---

## The 18 Premium Interaction Patterns

1. **Subtle Magnetic Attraction**: Pulls button towards cursor by 2–6px when cursor is within 80–120px radius. Returns smoothly on leave.
2. **Direction-Aware Hover Fill**: Detects cursor entry angle (-180° to 180°) and slides a soft neutral overlay (`rgba(255, 255, 255, 0.08)`) from the exact entry point.
3. **Sliding Split-Label**: The default label slides up 100% on hover, revealing a secondary action text or arrow from below without layout jump.
4. **Icon Movement & Rotation**: Subtly shifts an arrow 3px to the right (`translateX(3px)`) with ease-out timing.
5. **Arrow Morphing**: An SVG arrow morphs from a diagonal angle (`↗`) to a forward angle (`→`) on hover.
6. **Soft Scale Transformation**: Micro-scale down to `scale(0.985)` on `:active` (click press) providing real mechanical feedback.
7. **Refined Press Feedback**: Quick 60ms spring response upon click.
8. **Animated Hairline Borders**: 1px border opacity shifts from `0.08` to `0.18` on focus/hover.
9. **Underline Reveal**: Subtle 1px underline animates width from center out (`0%` to `100%`).
10. **Button-to-Loading Morph**: Smoothly interpolates width while replacing label with a delicate spinner.
11. **Loading-to-Success State**: Morphs background to emerald (`#10B981`) with checkmark `✓` icon and announces via `aria-live`.
12. **Shape Interpolation**: Gently transitions border-radius from `10px` to circular pill on state change.
13. **Controlled Liquid Glass Response**: Pointer-responsive specular highlight shifts gently across glass surface.
14. **Split-Label Metric Display**: Displays price or count alongside action label in balanced optical alignment.
15. **Minimal Ripple Feedback**: Subtle radial wave with low opacity (0.1) fading in 250ms.
16. **Gradient-Free Luxury Treatments**: Monochromatic matte finish using deep charcoal (`#181B24`) and off-white typography.
17. **Smooth Focus States**: Crisp, accessible 2px focus ring with 2px offset (`outline: 2px solid hsl(220 10% 60%)`).
18. **Disabled Elegance**: Reduces opacity to `0.45`, sets `cursor: not-allowed`, and cancels all motion listeners.

---

## Accessibility Mandates
- Every button must maintain minimum 44×44px touch target area on mobile.
- Support Enter and Space keys.
- Respect `prefers-reduced-motion: reduce` by disabling magnetic translation and split-slides.
