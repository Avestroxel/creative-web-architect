---
name: typography
description: Typography intelligence covering font selection, pairing, fluid type scales, variable fonts, kinetic text, multilingual support including RTL, and accessible reading sizes.
version: 0.1.0
tags: [design, typography, fonts, text]
activationKeywords: [font, typography, typeface, text, heading, type scale]
---

# Typography Intelligence

## Purpose

Select, pair, and implement typography that enhances the brand personality, ensures readability, and supports all required languages.

## Font Pairing Recipes

### Premium & Editorial
- **Display**: Playfair Display, Cormorant Garamond, EB Garamond
- **Body**: Inter, Source Sans 3, Lato
- *Personality*: Sophisticated, literary, trustworthy

### Modern & Clean
- **Display**: Inter, Outfit, Plus Jakarta Sans
- **Body**: Inter, DM Sans, Geist
- *Personality*: Professional, contemporary, clear

### Bold & Creative
- **Display**: Space Grotesk, Syne, Clash Display
- **Body**: DM Sans, Inter, Work Sans
- *Personality*: Innovative, confident, distinctive

### Luxury & Refined
- **Display**: Cormorant, Tenor Sans, Marcellus
- **Body**: Jost, Raleway, Libre Franklin
- *Personality*: Exclusive, elegant, restrained

### Warm & Human
- **Display**: Fraunces, Lora, Merriweather
- **Body**: Source Serif 4, Crimson Pro, Libre Baskerville
- *Personality*: Approachable, storytelling, personal

### Technical & Futuristic
- **Display**: JetBrains Mono, Space Mono, IBM Plex Mono
- **Body**: IBM Plex Sans, Fira Sans, Roboto
- *Personality*: Precise, technical, forward-looking

## Fluid Type Scale

Use `clamp()` for responsive sizing without breakpoints:

```css
:root {
  --text-xs:  clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm:  clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.45vw, 1.125rem);
  --text-lg:  clamp(1.125rem, 1rem + 0.6vw, 1.375rem);
  --text-xl:  clamp(1.25rem, 1rem + 1.1vw, 1.75rem);
  --text-2xl: clamp(1.5rem, 1.1rem + 1.8vw, 2.25rem);
  --text-3xl: clamp(1.875rem, 1.2rem + 3vw, 3rem);
  --text-4xl: clamp(2.25rem, 1.3rem + 4.2vw, 4rem);
  --text-5xl: clamp(3rem, 1.5rem + 6.5vw, 6rem);
  --text-6xl: clamp(3.75rem, 1.5rem + 9vw, 8rem);
  --text-7xl: clamp(4.5rem, 1.5rem + 12vw, 10rem);
}
```

## Variable Fonts

Prefer variable fonts for performance and flexibility:

```css
/* Single file covers all weights */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

### Recommended Variable Fonts
- **Inter** — The default workhorse (weight 100-900)
- **Plus Jakarta Sans** — Friendly geometric (weight 200-800)
- **Outfit** — Modern geometric (weight 100-900)
- **Fraunces** — Expressive old-style (weight, optical size)
- **Recursive** — Versatile casual/mono (weight, slant, casual, mono)

## RTL & Multilingual Support

### Arabic & Kurdish (Sorani)
- Use `Noto Sans Arabic` or `Vazirmatn` for Arabic script
- Set `dir="rtl"` on the `<html>` element
- Use logical CSS properties: `margin-inline-start` not `margin-left`
- Test text expansion (Arabic text is often 20-30% wider)
- Ensure bidirectional text handles mixed LTR/RTL correctly

```css
/* Logical properties for RTL support */
.card {
  margin-inline-start: 1rem;
  padding-inline-end: 1.5rem;
  text-align: start;
  border-inline-start: 3px solid var(--color-accent);
}
```

## Kinetic Typography

### Staggered Reveal
```css
.text-reveal span {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  animation: reveal 0.6s ease forwards;
}
.text-reveal span:nth-child(2) { animation-delay: 0.05s; }
.text-reveal span:nth-child(3) { animation-delay: 0.1s; }
/* ... */

@keyframes reveal {
  to { opacity: 1; transform: translateY(0); }
}
```

### Character-by-Character Split
Split headings into individual `<span>` elements for character-level animation.
Use GSAP SplitText or a simple JS split for production use.

## Accessibility

- **Minimum body size**: 16px (1rem) — never go below
- **Line height**: 1.5 for body text, 1.1-1.2 for large headings
- **Max line length**: 65-75 characters for readability
- **Contrast**: Ensure WCAG AA (4.5:1 for body text, 3:1 for large text)
- **`font-display: swap`**: Always use to prevent invisible text during loading

## Validation

✅ Font pairing is harmonious and appropriate for the brand
✅ Fluid scale provides readable text at all viewport sizes
✅ RTL layout works if required
✅ Loading performance is optimized (swap, variable fonts, subsetting)
✅ Contrast ratios meet WCAG AA minimum
✅ Body text is at least 16px
