---
name: layout-composition
description: Advanced layout composition covering asymmetric grids, bento layouts, split-screens, cinematic sequences, editorial grids, spatial layouts, and experimental navigation patterns.
version: 0.1.0
tags: [design, layout, grid, composition]
activationKeywords: [layout, grid, composition, structure, sections, bento, split-screen]
---

# Layout Composition

## Purpose

Design page layouts that communicate visual hierarchy, guide the user's eye, and create distinctive compositions while maintaining navigation clarity.

## Layout Systems

### Modular Grid
Classic multi-column grid with consistent gutters.
```css
.grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--space-6); }
```

### Bento Grid
Varied card sizes in an organic-feeling grid.
```css
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: var(--space-4);
}
.bento-lg { grid-column: span 2; grid-row: span 2; }
.bento-wide { grid-column: span 2; }
.bento-tall { grid-row: span 2; }
```

### Asymmetric Composition
Intentionally unbalanced layouts that create visual tension.
```css
.asymmetric {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-8);
}
```

### Split-Screen
Two equal halves with contrasting content.
```css
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}
```

### Full-Bleed Sections
Content that breaks out of the container to fill the viewport.
```css
.full-bleed {
  width: 100vw;
  margin-inline: calc(-50vw + 50%);
}
```

### Cinematic Sequence
Full-viewport sections that scroll like film frames.
```css
.cinematic section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
}
```

## Section Types

| Section | Purpose | Typical Height |
|---|---|---|
| **Hero** | First impression, brand statement | 100vh |
| **Feature Grid** | Showcase capabilities | Auto |
| **Product Showcase** | Highlight key products | 100vh per product |
| **Testimonials** | Social proof | Auto |
| **Stats/Numbers** | Credibility metrics | Auto |
| **CTA** | Drive action | 50-70vh |
| **Footer** | Navigation, legal, contact | Auto |

## Responsive Strategy

```css
/* Mobile-first approach */
.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

/* Tablet */
@media (min-width: 768px) {
  .layout { grid-template-columns: repeat(2, 1fr); gap: var(--space-6); }
}

/* Desktop */
@media (min-width: 1024px) {
  .layout { grid-template-columns: repeat(3, 1fr); gap: var(--space-8); }
}

/* Wide */
@media (min-width: 1440px) {
  .layout { max-width: 1400px; margin: 0 auto; }
}
```

## Guidelines

- Visual originality must never compromise navigation clarity
- Every section must have a clear purpose
- Negative space is a design element, not wasted space
- Test all layouts at 320px, 768px, 1024px, and 1440px minimum

## Validation

✅ Layout adapts gracefully across all breakpoints
✅ Content hierarchy is clear
✅ Navigation is always accessible
✅ No horizontal overflow on mobile
✅ Interactive elements have adequate touch targets
