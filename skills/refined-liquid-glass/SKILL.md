---
name: refined-liquid-glass
description: Disciplined Liquid Glass engineering focusing on physical believability, subtle refraction, hairline specular edges, and zero oversaturated neon bloom.
version: 0.2.0
tags: [liquid-glass, optics, glassmorphism, physical-realism, materials]
---

# Refined Liquid Glass Engineering

## The Refinement Mandate

Liquid Glass must look like **precision-milled sapphire glass or frosted architectural crystal**, NEVER cheap glowing plastic.

### What to Avoid:
- ❌ High-saturation colored glass (neon cyan/magenta glass).
- ❌ Glowing outer box-shadows on glass cards.
- ❌ Applying glass to every single surface (leads to visual chaos and GPU lag).
- ❌ Excessive blur (>40px) that turns backgrounds into muddy paste.

---

## Physical Realism Principles

1. **Restrained Backdrop Blur**:
   - Subtle: `blur(12px)`
   - Base: `blur(20px)`
   - Maximum: `blur(28px)`
   - Always pair with subtle saturation compensation (`saturate(140%)`).

2. **Hairline Specular Borders**:
   - Use `1px solid rgba(255, 255, 255, 0.08)` to `0.12`.
   - Add top-edge specular highlight: `inset 0 1px 0 rgba(255, 255, 255, 0.12)`.

3. **Neutral Matte Tints**:
   - Dark: `rgba(18, 20, 28, 0.72)`
   - Charcoal: `rgba(12, 13, 18, 0.82)`
   - Light: `rgba(255, 255, 255, 0.75)`

4. **Targeted Application**:
   - Reserve glass for: Sticky navigation headers, floating control docks, modal dialog backdrops, and selected telemetry HUD overlays.
