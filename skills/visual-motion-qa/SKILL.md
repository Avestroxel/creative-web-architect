---
name: visual-motion-qa
description: 15-step motion and visual quality assurance verification checklist covering frame stability, rapid repeated interaction, flickering, and layout shift audits.
version: 0.2.0
tags: [qa, testing, verification, scorecard, stability, layout-shift]
---

# Visual & Motion Quality Assurance (QA)

## The 15-Step Motion Verification Protocol

Execute this protocol for every primary interaction and animated sequence:

1. **Initial State Verification**: Confirm initial opacity and transform are cleanly established without initial flash.
2. **Animation Trigger**: Confirm interaction begins smoothly within 16ms of trigger without delay.
3. **Pacing & Progress**: Inspect curve progression; ensure acceleration and deceleration are physically natural.
4. **Completion State**: Check that the final resting state is pixel-perfect and clean.
5. **Reverse Movement**: Test leaving hover or scrolling backwards; ensure reverse transitions gracefully.
6. **Rapid Repeated Interaction**: Rapidly click or hover 5–10 times continuously; verify no animation state locks or stacking memory leaks.
7. **Cross-Viewport Testing**: Verify behavior across mobile (375px), tablet (768px), and desktop (1440px).
8. **Touch Device Fallback**: Test with coarse pointer; ensure hover-only listeners do not stall tap interaction.
9. **Keyboard Navigation**: Tab through with keyboard; confirm `:focus-visible` ring is crisp and visible.
10. **Reduced-Motion Verification**: Simulate `prefers-reduced-motion: reduce`; ensure layout remains fully functional without animation.
11. **Flicker Audit**: Inspect edges during transform; ensure no 1px sub-pixel jitter or anti-aliasing flickering.
12. **CLS (Layout Shift) Check**: Verify Cumulative Layout Shift remains ≤ 0.05 during all states.
13. **Animation Conflicts**: Ensure multiple animations on the same node do not override or clobber each other.
14. **Frame Rate Stability**: Check with Chrome DevTools Performance panel for sustained 60 FPS.
15. **Visual Restraint Pass**: Run against the No-Glow policy; eliminate any unnecessary decorative neon lighting.
