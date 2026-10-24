---
name: performance-optimization
description: Web performance engineering targeting Core Web Vitals (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1), bundle optimization, image delivery, font loading, and 3D performance.
version: 0.1.0
tags: [performance, optimization, speed, core-web-vitals, lighthouse]
activationKeywords: [performance, speed, fast, optimize, lighthouse, web vitals, LCP, CLS]
---

# Performance Optimization

## Purpose

Balance extraordinary visual quality with excellent website performance. Use actual measurements, not assumptions.

## Core Web Vitals Targets

| Metric | Target | What It Measures |
|---|---|---|
| **LCP** | ≤ 2.5s | Largest Contentful Paint — loading speed |
| **INP** | ≤ 200ms | Interaction to Next Paint — responsiveness |
| **CLS** | ≤ 0.1 | Cumulative Layout Shift — visual stability |

## Optimization Checklist

### Loading
- [ ] Critical CSS inlined
- [ ] JavaScript code-split by route
- [ ] Images use modern formats (WebP/AVIF) with `<picture>` fallback
- [ ] Images have explicit `width` and `height` attributes
- [ ] Fonts use `font-display: swap` and are preloaded
- [ ] Third-party scripts loaded with `async` or `defer`
- [ ] Resource hints: `<link rel="preload">` for critical assets

### Rendering
- [ ] Animate only `transform` and `opacity`
- [ ] Avoid layout thrashing (batch DOM reads/writes)
- [ ] Use `content-visibility: auto` for off-screen content
- [ ] Limit `backdrop-filter` layers (max 3-4 simultaneous)
- [ ] Set `will-change` only when needed, remove after animation

### Bundle Size
- [ ] Tree-shaking enabled
- [ ] No unused dependencies
- [ ] Dynamic imports for heavy features (3D, maps, etc.)
- [ ] GZIP/Brotli compression enabled
- [ ] Target: < 200KB initial JS (compressed)

### Images
```html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="..." width="1200" height="800" loading="lazy" decoding="async">
</picture>
```

### Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

### 3D Performance
- Lazy-load 3D scenes (IntersectionObserver)
- Use `frameloop="demand"` when static
- Adaptive DPR: `dpr={[1, 1.5]}`
- Dispose resources on unmount
- Provide image fallback for mobile

## Measurement

```bash
# Lighthouse CLI
npx lighthouse https://localhost:3000 --view

# Web Vitals in code
import { onLCP, onINP, onCLS } from 'web-vitals';
onLCP(console.log);
onINP(console.log);
onCLS(console.log);
```

## Validation

✅ LCP ≤ 2.5s in Lighthouse
✅ INP ≤ 200ms
✅ CLS ≤ 0.1
✅ Initial JS bundle < 200KB compressed
✅ No render-blocking resources
✅ Images optimized and lazy-loaded
✅ Fonts preloaded with swap
