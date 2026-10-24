---
name: advanced-scroll-animation
description: Advanced scroll motion engineering covering pinned chapter narratives, masked clip-path reveals, bidirectional timeline scrubbing, and velocity-sensitive effects without scroll hijacking.
version: 0.2.0
tags: [scroll, motion, animation, storytelling, clip-path, parallax]
---

# Advanced Scroll Motion Engineering

## Guiding Principles

1. **NO Scroll Hijacking**: Never break native mousewheel or trackpad physics with artificial sluggish scrolling. The user must maintain natural navigation control at all times.
2. **Selective Pinned Sections**: Pin sections ONLY when there is a progressive narrative (e.g. 3-step product chapter). Never pin the entire website.
3. **Hardware Acceleration**: Animate exclusively `transform`, `opacity`, and `clip-path`. Never animate `top`, `margin`, or layout properties.
4. **Lifecycle Cleanup**: Always disconnect `IntersectionObserver` or scroll event listeners upon component unmount.

---

## Architectural Patterns

### 1. Pinned Chapter Storytelling
Keep a container in a sticky viewport frame (`position: sticky; top: 0; height: 100vh`) while its parent provides natural scroll track height (`height: 300vh`).
Map normalized progress (`0.0` to `1.0`) to chapter state transitions:

```tsx
const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
const activeChapter = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
```

### 2. Masked Image Reveals (`clip-path`)
Create cinematic image entrances without layout shift:

```css
.scroll-mask-reveal {
  clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
  transition: clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms ease;
}
.scroll-mask-reveal.is-in-view {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  transform: scale(1);
}
```

### 3. Scroll-Linked Typography Choreography
- **Word-by-word reveal**: Wrap words in `<span>` with `overflow: hidden; display: inline-block;` and animate vertical translate from `100%` to `0%`.
- **Character stagger**: Apply `animation-delay: calc(var(--char-index) * 20ms)`.

### 4. Accessibility & Performance
Always check for `prefers-reduced-motion: reduce`:
```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Set all elements immediately to completed/visible state
}
```
