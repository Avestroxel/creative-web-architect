---
id: depth-parallax-normal-relighting-burn
title: Depth-Parallax Normal Relighting & Procedural Dissolve Burn
category: three-dimensional-web
difficulty: expert
tags: [webgl, threejs, glsl, shaders, depth-parallax, normal-mapping, relighting, procedural-burn, liquid-reveal]
source: KIMI — GRIDO1 Racing Systems / Kimi Antonelli
author: Anas Hashim
license: MIT
---

# Depth-Parallax Normal Relighting & Procedural Dissolve Burn

## Overview & Visual Impact

Static photographic portrait cutouts often feel flat and detached when placed beside 3D geometries or reactive UI chrome. Conversely, full photogrammetry 3D head meshes are heavy (50MB+), difficult to animate cleanly, and compromise editorial photographic fidelity.

The **Depth-Parallax Normal Relighting & Procedural Dissolve Burn** technique creates a three-dimensional photographic presence using single-quad GPU shaders:
1. **Depth-Displaced UV Parallax:** The 2D portrait plane samples an 8-bit depth map texture to offset texture coordinates based on camera or cursor orientation ($\text{offset} = \text{parallax} \cdot (\text{depth} - 0.5) \cdot \text{scale}$).
2. **Dynamic Normal Map Relighting:** By sampling a tangent-space normal map, the fragment shader computes directional Lambertian illumination directed toward the cursor $(\vec{L} = \text{normalize}(\Delta x \cdot 1.6, -\Delta y, 1.0))$. Brow, nose, and cheekbones physically catch highlights and cast shadows as the pointer moves across the viewport.
3. **Height-Biased Noise Dissolve Burn:** An overlaid 3D element (such as an F1 helmet) undergoes an entrance burn where a screen-space height gradient (55%) blends with high-frequency noise (45%) to sweep crown-to-chin. The dissolve front produces a luminous boundary emission ($4 \cdot \text{intact} \cdot (1 - \text{intact})$) in the brand accent before transitioning to an interactive cursor trail reveal.

---

## Architectural Implementation

### 1. Depth Parallax & Lambertian Normal Relighting (GLSL)

```glsl
uniform sampler2D uDiffuse;
uniform sampler2D uDepth;
uniform sampler2D uAlpha;
uniform sampler2D uNormal;
uniform vec2 uParallax;      // Cursor offset (-1.0 to 1.0)
uniform float uReveal;        // Master opacity
uniform float uDepthScale;    // Typically 0.005
uniform float uRelight;       // Relight intensity, typically 0.32

varying vec2 vUv;

void main() {
  // 1. Depth parallax offset
  float depth = texture2D(uDepth, vUv).r;
  vec2 offset = uParallax * (depth - 0.5) * uDepthScale;
  vec2 uv = vUv + offset;

  vec4 color = texture2D(uDiffuse, uv);
  float alpha = texture2D(uAlpha, uv).r;

  // 2. Normal map relighting
  vec3 normal = normalize(texture2D(uNormal, uv).rgb * 2.0 - 1.0);
  vec3 lightDir = normalize(vec3(uParallax * 1.6, 1.0));

  // Signed around flat-normal baseline (0.72) to balance highlights and shading
  float lambert = max(dot(normal, lightDir), 0.0) - 0.72;
  vec3 lit = color.rgb * (1.0 + lambert * uRelight);

  gl_FragColor = vec4(clamp(lit, 0.0, 1.0), alpha * uReveal);

  #include <colorspace_fragment>
}
```

---

### 2. Procedural Height/Noise Dissolve Burn Front (GLSL)

Injected into the overlaid 3D model's material shader via `onBeforeCompile`:

```glsl
// Normalized Device Coordinates (Screen Space)
vec2 revealNdc = vRevealClip.xy / vRevealClip.w;

// Height (55%) blended with procedural noise (45%)
float burnFront = smoothstep(uBurnStart, 1.0, uIntro);
float burnNoise = texture2D(uNoiseTex, revealNdc * 0.5 + 0.5).r;
float burnHeight = 1.0 - (revealNdc.y * 0.5 + 0.5);
float burnAt = mix(burnHeight, burnNoise, 0.45);

// 1.0 where shell is intact, 0.0 where burn has passed
float intact = smoothstep(burnFront - uBurnSoft, burnFront + uBurnSoft, burnAt);

// Combine with liquid cursor trail mask
float mask = max(revealTrail(revealNdc), intact);
diffuseColor.a *= mask * uRevealMix;

// Boundary glow: peaks exactly at intact == 0.5
float burnEdge = 4.0 * intact * (1.0 - intact);
diffuseColor.rgb += uBurnColor * burnEdge * uBurnGlow * uRevealMix;
```

---

### 3. Prewarming Pipeline & Zero-Alpha Glitch Prevention

Transparent materials with `depthWrite: false` risk sorting artifacts if displayed at partial alpha during shader compilation. The prewarming pipeline enforces:
1. Initializing all textures via `renderer.initTexture(texture)`.
2. Asynchronous pre-compilation via `await renderer.compileAsync(scene, camera)`.
3. Executing one single offscreen throwaway render frame before lifting the loader veil.
4. Setting master `uRevealMix = 1.0` so that the model starts fully opaque and begins burning from a solid state.

---

## Anti-Generic Quality Rules

- **No Flat Photo Sliders:** 2D portraits must not merely slide left/right on mouse move. Normal map relighting coupled with depth UV displacement is essential for tangible physical volume.
- **Continuous Edge Glow:** Dissolve burn boundaries must calculate luminescence from $4 \cdot \text{intact} \cdot (1 - \text{intact})$ rather than noisy secondary threshold steps, preventing edge scintillation or flickering.
- **Camera Aspect Adaptation:** Frustum world calculations must scale portrait scale and offset according to window aspect ratios to prevent clipping against masthead typography on widescreen displays.
