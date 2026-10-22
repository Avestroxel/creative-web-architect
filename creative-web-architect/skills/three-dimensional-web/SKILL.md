---
name: three-dimensional-web
description: 3D web experiences using Three.js and React Three Fiber, covering product viewers, scroll-controlled scenes, GLTF loading, camera choreography, and mobile optimization.
version: 0.1.0
tags: [3d, webgl, threejs, r3f, interactive]
activationKeywords: [3d, three.js, webgl, model, scene, 3D, product viewer, rotate]
---

# Three-Dimensional Web

## Purpose

Create performant 3D web experiences using Three.js and React Three Fiber for product showcases, interactive environments, and immersive storytelling.

## When to Use 3D

✅ **Good candidates**: Product showcases, configurators, interactive models, immersive landing pages
❌ **Avoid**: Text-heavy content sites, simple portfolios, performance-critical pages

## React Three Fiber Setup

```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function ProductViewer() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, Math.min(2, window.devicePixelRatio)]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <ProductModel />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Suspense>
    </Canvas>
  );
}

function ProductModel() {
  const { scene } = useGLTF('/models/product.glb');
  return <primitive object={scene} scale={1} />;
}
```

## GLTF Optimization

- **Draco compression**: Reduces geometry by 90%+
- **KTX2 textures**: GPU-compressed textures for fast loading
- **Meshopt**: Alternative compression for animated models
- Always set `gl.outputColorSpace = THREE.SRGBColorSpace`

## Scroll-Controlled 3D

```jsx
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function ScrollScene() {
  const scroll = useScroll();
  const ref = useRef();

  useFrame(() => {
    const offset = scroll.offset;
    ref.current.rotation.y = offset * Math.PI * 2;
    ref.current.position.y = -offset * 3;
  });

  return <mesh ref={ref}><boxGeometry /><meshStandardMaterial /></mesh>;
}
```

## Performance Optimization

1. **Adaptive DPR**: `dpr={[1, 2]}` — Three.js picks the best for performance
2. **Lazy loading**: Only render Canvas when in viewport
3. **frameloop="demand"**: Only render when something changes
4. **Geometry reduction**: Simplify meshes for web (target < 100K triangles)
5. **Texture compression**: Use KTX2 or reduce resolution
6. **Dispose resources**: Clean up geometries, materials, and textures on unmount
7. **Mobile fallback**: Use static images or CSS 3D transforms on low-end mobile

```jsx
<Canvas frameloop="demand" dpr={[1, 1.5]}>
```

## Validation

✅ Scene loads within 3 seconds on broadband
✅ Maintains 30+ FPS on mid-range devices
✅ Resources are disposed on component unmount
✅ Mobile fallback exists
✅ No memory leaks in frame loop
