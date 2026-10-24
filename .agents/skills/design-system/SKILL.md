---
name: design-system
description: Generates project-specific design systems with semantic colors, typography tokens, spacing scales, motion tokens, light/dark themes, and component patterns.
version: 0.1.0
tags: [design, tokens, system, theme]
activationKeywords: [design system, tokens, theme, variables, custom properties]
dependencies: [creative-direction, typography]
---

# Design System Generator

## Purpose

Create a complete, project-specific design system with editable tokens, theme support, and reusable patterns. Each project gets its own identity — never force a universal style.

## Token Architecture

### CSS Custom Properties Structure

```css
:root {
  /* === Colors === */
  --color-primary: hsl(222, 47%, 31%);
  --color-primary-light: hsl(222, 47%, 45%);
  --color-primary-dark: hsl(222, 47%, 20%);
  --color-secondary: hsl(162, 63%, 41%);
  --color-accent: hsl(28, 100%, 60%);

  --color-bg: hsl(0, 0%, 100%);
  --color-surface: hsl(0, 0%, 97%);
  --color-surface-elevated: hsl(0, 0%, 100%);
  --color-text: hsl(222, 20%, 13%);
  --color-text-secondary: hsl(222, 10%, 45%);
  --color-border: hsl(222, 10%, 88%);

  --color-success: hsl(142, 71%, 35%);
  --color-warning: hsl(38, 92%, 50%);
  --color-error: hsl(0, 72%, 51%);

  /* === Typography === */
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Fluid type scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.45vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.375rem);
  --text-xl: clamp(1.25rem, 1rem + 1.1vw, 1.75rem);
  --text-2xl: clamp(1.5rem, 1.1rem + 1.8vw, 2.25rem);
  --text-3xl: clamp(1.875rem, 1.2rem + 3vw, 3rem);
  --text-4xl: clamp(2.25rem, 1.3rem + 4.2vw, 4rem);
  --text-5xl: clamp(3rem, 1.5rem + 6.5vw, 6rem);

  --leading-tight: 1.15;
  --leading-base: 1.5;
  --leading-relaxed: 1.75;

  /* === Spacing === */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* === Radius === */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* === Shadows === */
  --shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.05);
  --shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.08), 0 2px 4px -2px hsl(0 0% 0% / 0.06);
  --shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.08), 0 4px 6px -4px hsl(0 0% 0% / 0.04);
  --shadow-xl: 0 20px 25px -5px hsl(0 0% 0% / 0.1), 0 8px 10px -6px hsl(0 0% 0% / 0.06);

  /* === Motion === */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* === Breakpoints (for reference) === */
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1536px;

  /* === Surfaces === */
  --surface-glass-bg: hsl(0 0% 100% / 0.6);
  --surface-glass-border: hsl(0 0% 100% / 0.3);
  --surface-glass-blur: 20px;
}

/* === Dark Theme === */
[data-theme="dark"] {
  --color-bg: hsl(222, 20%, 8%);
  --color-surface: hsl(222, 18%, 12%);
  --color-surface-elevated: hsl(222, 16%, 16%);
  --color-text: hsl(0, 0%, 95%);
  --color-text-secondary: hsl(222, 10%, 62%);
  --color-border: hsl(222, 12%, 22%);

  --shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.2);
  --shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.3);
  --shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.3);

  --surface-glass-bg: hsl(222 20% 12% / 0.6);
  --surface-glass-border: hsl(0 0% 100% / 0.1);
}
```

## Workflow

1. Receive creative direction from the `creative-direction` skill
2. Generate color palette matching the brand personality
3. Select and configure typography from the `typography` skill
4. Calculate spacing and radius scales
5. Define shadow system
6. Set motion tokens
7. Create light and dark theme variants
8. Output as CSS custom properties

## Guidelines

- Use HSL for all colors (easier to adjust)
- Use `clamp()` for fluid sizing
- Provide both light and dark themes
- Keep token names semantic (not `--blue-500`)
- Document the purpose of each token group

## Validation

✅ All tokens are defined as CSS custom properties
✅ Dark theme provides adequate contrast
✅ Typography scale is fluid and readable
✅ Spacing scale is consistent and useful
✅ Motion tokens respect `prefers-reduced-motion`
