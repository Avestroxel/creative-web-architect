---
name: accessibility
description: WCAG accessibility guidance covering semantic HTML, keyboard navigation, screen readers, reduced motion, high contrast, RTL support, focus management, and ARIA patterns.
version: 0.1.0
tags: [accessibility, a11y, wcag, aria, keyboard]
activationKeywords: [accessibility, a11y, wcag, screen reader, keyboard, contrast, aria]
---

# Accessibility

## Purpose

Ensure all generated websites are usable by people with diverse abilities, following WCAG 2.2 guidance.

## Core Requirements

### Semantic HTML
```html
<header> <!-- Not <div class="header"> -->
<nav aria-label="Main navigation">
<main>
<article>
<section aria-labelledby="features-heading">
  <h2 id="features-heading">Features</h2>
</section>
<footer>
```

### Heading Hierarchy
- One `<h1>` per page
- Sequential heading levels (no skipping h2 to h4)
- Headings must describe their section content

### Keyboard Navigation
- All interactive elements focusable via Tab
- Visible focus indicators (never `outline: none` without replacement)
- Escape closes modals/popups
- Arrow keys for tab groups, menus, sliders
- Skip-to-content link

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 1000;
  padding: 1rem;
  background: var(--color-primary);
  color: white;
}
.skip-link:focus { top: 0; }
```

### Color Contrast
- **Body text**: 4.5:1 minimum (WCAG AA)
- **Large text (18px+ bold or 24px+)**: 3:1 minimum
- **UI components**: 3:1 minimum against adjacent colors
- Never use color alone to convey information

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Touch Targets
- Minimum 44×44px for all interactive elements
- Adequate spacing between targets (at least 8px)

### Screen Reader Support
- Meaningful alt text for images
- `aria-label` for icon-only buttons
- `aria-live` regions for dynamic content
- Hidden decorative elements: `aria-hidden="true"` or `role="presentation"`

## Testing Checklist

1. ✅ Tab through the entire page — is everything reachable?
2. ✅ Use a screen reader — does the page make sense?
3. ✅ Zoom to 200% — is content still usable?
4. ✅ Check contrast ratios with a tool
5. ✅ Test with `prefers-reduced-motion: reduce`
6. ✅ Test with keyboard only (no mouse)
7. ✅ Verify focus order is logical

## Validation

✅ All interactive elements are keyboard accessible
✅ Focus indicators are always visible
✅ Color contrast meets WCAG AA
✅ Reduced motion alternative exists
✅ Images have appropriate alt text
✅ Page structure uses semantic HTML
✅ Touch targets are at least 44×44px
