---
name: liquid-glass
description: Independent, reusable Liquid Glass-inspired interface engine with translucent surfaces, optical depth, fluid interactions, and three rendering levels (CSS, Enhanced, Advanced).
version: 0.1.0
tags: [design, glass, effects, components, material]
activationKeywords: [glass, translucent, blur, frosted, liquid, glassmorphism, transparent]
---

# Liquid Glass Interface Engine

## Purpose

Create an original, reusable, web-native Liquid Glass-inspired design language. This is NOT Apple's official implementation — it is an original, open-source interpretation inspired by the physical properties of translucent, fluid glass materials.

## Visual Characteristics

### Core Properties
- **Translucent surfaces**: Background shows through with controlled opacity
- **Background blur**: `backdrop-filter: blur()` for frosted glass effect
- **Optical depth**: Multiple layers create sense of physical depth
- **Edge highlights**: Subtle light borders suggest glass edge refraction
- **Soft specular reflections**: Gradient overlays simulate light reflection
- **Adaptive translucency**: Glass adjusts to underlying content
- **Glass surface borders**: Thin, semi-transparent borders
- **Rounded geometry**: Generous border-radius for organic glass feel

### Light vs Dark Variants
```css
/* Light Glass */
.glass-light {
  background: hsl(0 0% 100% / 0.55);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid hsl(0 0% 100% / 0.35);
  box-shadow:
    0 0 0 0.5px hsl(0 0% 100% / 0.2),
    0 8px 32px hsl(0 0% 0% / 0.08),
    inset 0 1px 0 hsl(0 0% 100% / 0.5);
}

/* Dark Glass */
.glass-dark {
  background: hsl(220 20% 10% / 0.6);
  backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid hsl(0 0% 100% / 0.08);
  box-shadow:
    0 0 0 0.5px hsl(0 0% 100% / 0.05),
    0 8px 32px hsl(0 0% 0% / 0.3),
    inset 0 1px 0 hsl(0 0% 100% / 0.1);
}
```

## Rendering Levels

### LEVEL 1 — CSS Glass
Pure CSS implementation using `backdrop-filter`, gradients, and shadows.
- ✅ Best performance
- ✅ Widest browser support
- ✅ Suitable for most projects
- ⚠️ No real optical effects

### LEVEL 2 — Enhanced Glass
CSS + JavaScript for animated highlights, subtle deformation, and pointer tracking.
- ✅ Richer visual experience
- ✅ Interactive lighting
- ⚠️ Requires JavaScript
- ⚠️ Higher GPU usage

### LEVEL 3 — Advanced Optical Glass
SVG filters, WebGL shaders, or Canvas for displacement, refraction simulation.
- ✅ Most realistic effects
- ⚠️ Significant performance cost
- ⚠️ Limited browser support
- ⚠️ Not suitable for mobile

## Component Recipes

### LiquidGlassButton
```css
.lg-button {
  padding: 0.75rem 1.5rem;
  background: hsl(0 0% 100% / 0.45);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid hsl(0 0% 100% / 0.3);
  border-radius: 12px;
  color: var(--color-text);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-default);
  box-shadow:
    0 2px 8px hsl(0 0% 0% / 0.06),
    inset 0 1px 0 hsl(0 0% 100% / 0.4);
}
.lg-button:hover {
  background: hsl(0 0% 100% / 0.6);
  box-shadow:
    0 4px 16px hsl(0 0% 0% / 0.1),
    inset 0 1px 0 hsl(0 0% 100% / 0.5);
  transform: translateY(-1px);
}
.lg-button:active {
  transform: translateY(0);
  background: hsl(0 0% 100% / 0.5);
}
```

### LiquidGlassCard
```css
.lg-card {
  padding: var(--space-6);
  background: hsl(0 0% 100% / 0.5);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid hsl(0 0% 100% / 0.25);
  border-radius: 20px;
  box-shadow:
    0 0 0 0.5px hsl(0 0% 100% / 0.15),
    0 12px 40px hsl(0 0% 0% / 0.08);
  transition: transform var(--duration-base) var(--ease-default),
              box-shadow var(--duration-base) var(--ease-default);
}
.lg-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 0 0 0.5px hsl(0 0% 100% / 0.2),
    0 20px 60px hsl(0 0% 0% / 0.12);
}
```

### LiquidGlassNavbar
```css
.lg-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--space-3) var(--space-6);
  background: hsl(0 0% 100% / 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid hsl(0 0% 100% / 0.2);
  box-shadow: 0 1px 3px hsl(0 0% 0% / 0.04);
}
```

### LiquidGlassDock (macOS-style)
```css
.lg-dock {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: hsl(0 0% 100% / 0.4);
  backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid hsl(0 0% 100% / 0.3);
  border-radius: 18px;
  box-shadow:
    0 8px 32px hsl(0 0% 0% / 0.1),
    inset 0 1px 0 hsl(0 0% 100% / 0.4);
}
```

## Pointer-Responsive Lighting (Level 2)

```javascript
function addGlassHighlight(element) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty('--highlight-x', `${x}%`);
    element.style.setProperty('--highlight-y', `${y}%`);
  });
}
```
```css
.lg-card-enhanced {
  /* ... base glass styles ... */
  background-image: radial-gradient(
    300px circle at var(--highlight-x, 50%) var(--highlight-y, 50%),
    hsl(0 0% 100% / 0.15),
    transparent
  );
}
```

## Accessibility

- **Reduced transparency**: Respect `prefers-reduced-transparency` — provide opaque fallback
- **Contrast**: Ensure text meets WCAG AA over any background
- **Reduced motion**: Disable animated highlights when `prefers-reduced-motion: reduce`
- **Keyboard focus**: Visible focus rings that work over glass
- **Touch targets**: Minimum 44×44px

```css
@media (prefers-reduced-transparency: reduce) {
  .lg-card, .lg-button, .lg-navbar {
    backdrop-filter: none;
    background: var(--color-surface);
    border-color: var(--color-border);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lg-card, .lg-button {
    transition: none;
  }
}
```

## Performance Guidelines

- Limit `backdrop-filter` to 3-4 simultaneous layers maximum
- Use `will-change: transform` only on elements that will animate
- Avoid glass effects on large full-screen elements on mobile
- Test on low-end devices — glass effects are GPU-intensive
- Provide CSS-only Level 1 fallback for mobile

## Validation

✅ Glass surfaces are visually convincing
✅ Text remains readable over all backgrounds
✅ Reduced-transparency fallback exists
✅ Reduced-motion fallback exists
✅ Performance is acceptable (no janky scrolling)
✅ Keyboard navigation works through glass elements
✅ Glass is used purposefully, not on every element
