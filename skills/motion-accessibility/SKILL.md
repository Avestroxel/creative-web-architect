---
name: motion-accessibility
description: WCAG accessibility standards for animations covering prefers-reduced-motion, vestibular trigger avoidance, keyboard focus visibility, and non-blocking transitions.
version: 0.2.0
tags: [accessibility, a11y, reduced-motion, wcag, vestibular]
---

# Motion Accessibility & Vestibular Safety

## Non-Negotiable Standards

1. **Strict Respect for `prefers-reduced-motion: reduce`**:
   Whenever active, all large-scale translations, parallax scrubbing, rotating meshes, and scaling transitions must be disabled or replaced with instantaneous opacity fades.
2. **Vestibular Trigger Prevention**:
   Avoid spinning full-screen backgrounds, rapid parallax shifts across the entire viewport, or sudden zoom effects that cause nausea or vertigo.
3. **Keyboard Focus Stability**:
   Animated transitions must never cause the focused element (`:focus-visible`) to disappear offscreen or lose keyboard focus trap.
4. **Touch Target Size**:
   All interactive buttons and switches must maintain a minimum bounding box of 44×44px on touch devices regardless of visual micro-sizing.
