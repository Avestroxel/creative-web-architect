# Procedural Multi-Layer Alpha-Threshold Wing Flutter & Ghosted Motion Blur

## Architectural Philosophy
High-fidelity biological entities (insects, birds, botanical membranes) frequently lack articulated wing geometry or translucent motion blur in standard GLTF assets. This technique synthesizes high-frequency flapping kinematics, procedural black-background luminance thresholding into alpha masks, and 3-tier phase ghosting for authentic biological motion blur at zero GPU compute cost.

## 1. Pixel Luminance Thresholding Pipeline
When textures are supplied photographed on pure black backgrounds:
```javascript
const canvas = document.createElement('canvas');
canvas.width = 1024;
canvas.height = 576;
const ctx = canvas.getContext('2d');
ctx.drawImage(rawImage, 0, 0, 1024, 576);

const imgData = ctx.getImageData(0, 0, 1024, 576);
const d = imgData.data;

for (let i = 0; i < d.length; i += 4) {
  const r = d[i], g = d[i + 1], b = d[i + 2];
  // Calculate perceptual luminance
  const l = (r * 0.3 + g * 0.59 + b * 0.11) / 255;
  // Steep threshold curve eliminating black background
  const alpha = Math.min(1, Math.max(0, (l - 0.035) * 4.2)) * 255;
  
  d[i]     = Math.min(255, r * 1.5 + 30);
  d[i + 1] = Math.min(255, g * 1.5 + 30);
  d[i + 2] = Math.min(255, b * 1.5 + 40);
  d[i + 3] = alpha;
}

ctx.putImageData(imgData, 0, 0);
const texture = new THREE.CanvasTexture(canvas);
texture.colorSpace = THREE.SRGBColorSpace;
```

## 2. Root Joint Hinge Geometry
To flap realistically around the biological wing socket, the mesh origin must be translated to the proximal wing root:
```javascript
const geom = new THREE.PlaneGeometry(span, span * (9 / 16));
// Translate hinge point to the root edge
geom.translate(span / 2 - span * 0.03, 0, 0);
geom.rotateX(-Math.PI / 2);
geom.rotateY(-Math.PI / 2);
```

## 3. Triple-Phase Motion Blur Ghosting
Rather than expensive GPU post-processing motion blur, generate three layered meshes per wing slot with staggered phase offsets:
- Primary Wing: `phase offset = 0.0`, `opacity = 0.95`
- Leading Ghost: `phase offset = +0.55`, `opacity = 0.28`
- Trailing Ghost: `phase offset = -0.55`, `opacity = 0.28`

```javascript
const WING_CONFIGS = [
  { span: 0.72, sweep: -0.42, phase: 0.0,  lift: 0.02 },  // Forewing
  { span: 0.52, sweep: -0.95, phase: -0.5, lift: -0.01 }  // Hindwing
];
```

## 4. Velocity-Coupled Flap Frequency
Flapping frequency increases dynamically with flight speed:
$$\text{freq} = 2\pi \cdot (17 + \text{moving} \cdot 5)\text{ Hz}$$
$$\alpha_{\text{flap}} = \sin(t \cdot \text{freq} + \text{phase})$$
$$\text{rotation.x} = -0.25 + \alpha_{\text{flap}} \cdot 0.95$$
$$\text{rotation.y} = \alpha_{\text{flap}} \cdot 0.18$$

## Verification Criteria
- Frustum culling disabled on wings (`frustumCulled = false`) to prevent clipping during wide flap strokes.
- `depthWrite: false` and `transparent: true` with `DoubleSide` to ensure clean sorting against other semi-transparent wings.
