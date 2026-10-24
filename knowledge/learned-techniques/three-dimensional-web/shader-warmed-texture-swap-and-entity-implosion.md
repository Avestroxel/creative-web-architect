# Shader-Warmed Texture Swap & Coordinated Entity Implosion/Explosion

## Architectural Philosophy
Solves two primary bottlenecks in interactive 3D product transitions:
1. **GPU Shader Compilation Jitter**: Swapping WebGL materials or base-color textures often causes 100–300ms jank when the GPU compiles shaders for the new texture on the fly.
2. **Disconnected Theme Transitions**: Changing product variants without choreographing surrounding spatial entities creates an abrupt, cheap feel.

This technique uses a 1-frame pre-render shader warm-up protocol paired with a synchronized dual-phase spin, peak motion blur, and coordinated entity implosion/explosion.

## 1. One-Frame Shader Warm-Up Protocol
When models load, pre-create textures and briefly apply alternate textures during initialization to trigger GPU shader pipeline compilation before any user interaction:
```javascript
modelViewer.addEventListener('load', async () => {
  try {
    blueTexture = await modelViewer.createTexture('blue_base_color.jpg');
    greenTexture = await modelViewer.createTexture('green_base_color.jpg');

    // Shader Warm-up: Briefly apply textures to compile shaders ahead of time
    if (modelViewer.model) {
      const material = modelViewer.model.materials[0];
      if (material?.pbrMetallicRoughness?.baseColorTexture) {
        material.pbrMetallicRoughness.baseColorTexture.setTexture(blueTexture);
        await new Promise(r => requestAnimationFrame(r));
        material.pbrMetallicRoughness.baseColorTexture.setTexture(greenTexture);
      }
    }
  } catch (e) {
    console.error("Texture preload failed", e);
  }
});
```

## 2. Dual-Phase Choreographed Spin with Peak Blur
The 3D model accelerates into a 360° spin with simulated motion blur (`filter: blur(15px)`), swaps textures at the velocity peak where details are hidden, then settles into a 720° spin with bouncy spring easing:
```javascript
const spinObj = { val: 0, blur: 0 };

// Phase 1: Accelerate to peak
gsap.to(spinObj, {
  val: 360,
  blur: 15,
  duration: 0.6,
  ease: "power2.in",
  onUpdate: () => {
    switchSpin = spinObj.val;
    modelViewer.style.filter = `blur(${spinObj.blur}px)`;
  },
  onComplete: () => {
    // Texture swap happens exactly at maximum velocity
    applyVariantTexture(targetFlavor);

    // Phase 2: Decelerate with back settle
    gsap.to(spinObj, {
      val: 720,
      blur: 0,
      duration: 1.5,
      ease: "back.out(0.7)",
      onUpdate: () => {
        switchSpin = spinObj.val;
        modelViewer.style.filter = `blur(${spinObj.blur}px)`;
      },
      onComplete: () => {
        switchSpin = 0;
        modelViewer.style.filter = 'none';
      }
    });
  }
});
```

## 3. Coordinated Entity Implosion & Dynamic Repositioning
Surrounding floating items calculate vector to screen center, implode inwards, swap 3D asset geometries (`cherry.glb` $\leftrightarrow$ `blueberry.glb`), and burst back out to newly randomized positions:
```javascript
const centerX = (window.innerWidth / 2 - el.offsetLeft - el.offsetWidth / 2);
const centerY = (window.innerHeight / 2 - el.offsetTop - el.offsetHeight / 2);
const nextBaseX = (Math.random() - 0.5) * 200;
const nextBaseY = (Math.random() - 0.5) * 200;

gsap.timeline()
  .to(el, {
    x: centerX,
    y: centerY,
    scale: 0.1,
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      el.src = nextAssetUrl;
    }
  })
  .to(el, { duration: 0.3 })
  .to(el, {
    x: nextBaseX,
    y: nextBaseY,
    scale: 1,
    opacity: 1,
    duration: 0.9,
    ease: "back.out(1.5)"
  });
```
