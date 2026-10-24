---
name: toggle-and-switch-motion
description: Refined micro-interactions for switches, segmented controls, tabs, accordions, and form controls with spring physics and tactile state feedback.
version: 0.2.0
tags: [switch, toggle, tabs, accordion, micro-interactions, controls]
---

# Advanced Switch & Control Micro-Interactions

## Core Principles

1. **Clear Semantic State**: Every switch, tab, or accordion must immediately convey its state (`checked`, `active`, `expanded`) visually and via ARIA attributes.
2. **Spring-Grounded Physics**: Thumb movements should feel physical and snappy (`cubic-bezier(0.34, 1.56, 0.64, 1)`), avoiding sluggish linear transitions.
3. **No Exaggerated Jelly Effects**: Avoid cartoonish track bulging or jelly wobble. Track deformation must be limited to 1–2px micro-stretching.
4. **Keyboard First**: Full navigation via Space, Enter, ArrowLeft, ArrowRight, and Tab.

---

## Control Patterns

### 1. Spring Toggle Switch
- Track width: 42–44px, height: 24px, padding: 2px.
- Thumb: 18px circle with clean directional shadow (`0 1px 3px rgba(0,0,0,0.2)`).
- On toggle: Thumb translates 18–20px horizontally using snappy spring easing.
- Track color transitions smoothly from muted dark (`rgba(255,255,255,0.1)`) to active accent (`#3B82F6`).

### 2. Segmented Tabs with Sliding Indicator Pill
- Uses a shared background pill that glides smoothly between options.
- The indicator reads `offsetWidth` and `offsetLeft` of the active button.
- Transition timing: 200–240ms with `cubic-bezier(0.2, 0.9, 0.3, 1)`.
- ARIA: `role="tablist"`, `role="tab"`, `aria-selected="true"`.

### 3. Refined Accordion
- Smooth height expansion from 0 to full content height using CSS `max-height` or JavaScript requestAnimationFrame.
- Chevron rotates 180° smoothly without jerking.
- Zero layout thrashing: avoids querying layout properties on every scroll frame.

### 4. Tactile Sliders & Input Fields
- Slider thumb expands by 1.1x on active grab.
- Floating tooltip reveals precise value without obscuring user touch/mouse point.
