---
name: image-art-direction
description: Image and visual asset direction covering photography style, image treatment, illustrations, procedural graphics, and placeholder strategies.
version: 0.1.0
tags: [images, assets, photography, illustration]
activationKeywords: [image, photo, illustration, asset, picture, visual]
---

# Image Art Direction

## Purpose

Direct the visual asset strategy including photography style, image treatment, illustration approach, and fallback strategies when real assets are unavailable.

## Photography Styles

| Style | Use Case | Characteristics |
|---|---|---|
| **Editorial** | Fashion, luxury, lifestyle | Dramatic lighting, artistic composition |
| **Product** | Ecommerce, tech | Clean background, precise detail |
| **Lifestyle** | Consumer brands, services | People using products, natural settings |
| **Documentary** | NGOs, education, journalism | Authentic, unposed, storytelling |
| **Architectural** | Real estate, interiors | Wide angles, clean lines, dramatic perspective |

## When Assets Are Unavailable

1. **Generate procedural alternatives** — CSS gradients, SVG patterns, generated shapes
2. **Use clearly labeled placeholders** — grey boxes with dimensions and content description
3. **Never invent URLs** — don't reference images that don't exist
4. **Never use copyrighted images** without appropriate rights

### Procedural Background Example
```css
.hero-bg {
  background:
    radial-gradient(ellipse at 20% 50%, hsl(220 60% 20% / 0.8), transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsl(260 40% 30% / 0.6), transparent 50%),
    linear-gradient(180deg, hsl(220 30% 8%), hsl(240 20% 12%));
}
```

## Validation

✅ Image strategy matches brand personality
✅ No copyrighted images used without rights
✅ Placeholders are clearly labeled
✅ Images have alt text
✅ Images are optimized (WebP/AVIF, correct sizes)
