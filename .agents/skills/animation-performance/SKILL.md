---
name: animation-performance
description: Web animation performance engineering targeting rock-solid 60 FPS, zero layout thrashing, efficient requestAnimationFrame loops, and complete lifecycle cleanup.
version: 0.2.0
tags: [performance, 60fps, optimization, gpu, raf, cleanups]
---

# Animation Performance Engineering

## The 60 FPS Mandate (16.6ms Frame Budget)

### Golden Rules of Smooth Animation:
1. **Composite Only**: Animate exclusively `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
2. **Prevent Layout Thrashing**: Never read a layout property (`offsetHeight`, `getBoundingClientRect`) immediately after writing a DOM style in the same event loop.
3. **IntersectionObserver for Offscreen Pausing**: Pause continuous Canvas/WebGL rendering loops or animations whenever the element leaves the viewport.
4. **Lifecycle Cleanup**: Always remove event listeners and cancel active `requestAnimationFrame` IDs when a component unmounts.
5. **Backdrop-Filter Budget**: Restrict `backdrop-filter` to essential overlay elements. Applying backdrop-filter to multiple nested or sprawling elements causes GPU fill-rate exhaustion on mobile.
