---
name: responsive-design
description: Responsive design strategies covering mobile-first layouts, fluid grids, container queries, adaptive navigation, touch optimization, and cross-device testing.
version: 0.1.0
tags: [responsive, mobile, tablet, breakpoints, adaptive]
activationKeywords: [responsive, mobile, tablet, breakpoint, adaptive, touch]
---

# Responsive Design

## Purpose

Ensure all designs work beautifully across desktop, tablet, and mobile devices with appropriate interactions for touch, mouse, and keyboard.

## Breakpoint Strategy

```css
/* Mobile-first: base styles are mobile */
/* Tablet */
@media (min-width: 768px) { }
/* Desktop */
@media (min-width: 1024px) { }
/* Wide */
@media (min-width: 1440px) { }
```

## Adaptive Navigation

- **Mobile (< 768px)**: Hamburger menu with full-screen overlay
- **Tablet (768-1024px)**: Condensed horizontal nav or bottom tabs
- **Desktop (> 1024px)**: Full horizontal navigation bar

## Touch Optimization

- Minimum 44×44px touch targets
- Swipe gestures for carousels and galleries
- Avoid hover-dependent interactions on mobile
- Use `@media (hover: hover)` to detect hover capability

## Container Queries

```css
.card-container { container-type: inline-size; }

@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 1fr 2fr; }
}
```

## Validation

✅ Tested at 320px, 375px, 768px, 1024px, 1440px, 1920px
✅ No horizontal overflow
✅ Navigation accessible at all sizes
✅ Touch targets meet minimum size
✅ Images resize appropriately
