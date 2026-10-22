---
name: shaders-and-effects
description: GLSL shaders, procedural textures, particle systems, image displacement, shader transitions, and generative visual backgrounds for advanced visual effects.
version: 0.1.0
tags: [shaders, glsl, effects, generative, particles]
activationKeywords: [shader, glsl, particles, displacement, generative, procedural, noise]
dependencies: [three-dimensional-web]
---

# Shaders & Visual Effects

## Purpose

Create advanced visual effects using GLSL shaders, procedural generation, and GPU-accelerated techniques for distinctive visual experiences.

## Shader Backgrounds

### Gradient Noise Background
```glsl
// Fragment shader
uniform float uTime;
uniform vec2 uResolution;

float noise(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float n = noise(uv * 5.0 + uTime * 0.1);
  vec3 color = mix(vec3(0.1, 0.05, 0.2), vec3(0.05, 0.1, 0.3), uv.y + n * 0.1);
  gl_FragColor = vec4(color, 1.0);
}
```

### Image Displacement on Hover
```glsl
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform float uHover;
varying vec2 vUv;

void main() {
  vec4 disp = texture2D(uDisplacement, vUv);
  vec2 distortedUv = vUv + disp.rg * uHover * 0.1;
  gl_FragColor = texture2D(uTexture, distortedUv);
}
```

## CSS-Based Alternatives

For simpler effects, use CSS instead of WebGL:

### Animated Gradient
```css
.gradient-bg {
  background: linear-gradient(-45deg, #0a0a1a, #1a0a2e, #0a1a3e, #1a2a1e);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

## Performance

- Prefer CSS effects over WebGL for simple visuals
- Use `requestAnimationFrame` not `setInterval`
- Dispose shader materials on unmount
- Reduce resolution on mobile (render at 0.5x DPR)
- Stop rendering when not visible

## Validation

✅ Effects enhance the design, not distract
✅ Fallback exists for browsers without WebGL
✅ GPU memory is managed properly
✅ Reduced-motion alternative provided
