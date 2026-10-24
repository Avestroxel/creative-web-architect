---
name: page-transitions
description: Seamless route transitions, shared-element mechanics, editorial page wipes, floating headers, and fast non-blocking navigation choreography.
version: 0.2.0
tags: [navigation, transitions, routes, wipes, header, choreography]
---

# Page Transitions & Navigation Choreography

## Essential Rules

1. **Never Block Navigation**: Transitions must not hijack or freeze the browser. Keep standard page transitions under 300–400ms.
2. **Prevent Layout Flash**: Pre-calculate geometry and ensure outgoing and incoming pages do not jump awkwardly.
3. **Adaptive Sticky Navigation**: Headers should float quietly, blur background softly on scroll, and compress height slightly (`64px -> 52px`).

---

## Transition Patterns

### 1. Editorial Curtain / Page Wipe
A sleek monochromatic curtain (`#0C0D12`) slides up across the screen, the DOM route switches in the background, and the curtain continues sliding upwards to reveal the new page.

### 2. Shared-Element Hero Expansion
A project card thumbnail coordinates coordinates with the new page's hero image via CSS View Transitions API or bounding rect interpolation.

### 3. Staggered Menu Reveal
Fullscreen navigation menus reveal navigation links with staggered vertical translation:
`delay: calc(var(--item-index) * 45ms); transform: translateY(0); opacity: 1;`
