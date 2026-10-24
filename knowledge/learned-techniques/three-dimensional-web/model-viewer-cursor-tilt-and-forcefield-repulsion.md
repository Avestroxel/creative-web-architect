# Model-Viewer Cursor Tilt & Dynamic Forcefield Pointer Repulsion

## Architectural Philosophy
Bridges high-performance Web Components (`<model-viewer>`) with procedural pointer physics. Rather than requiring heavy Three.js canvas choreography for simple product showcases, this technique binds `<model-viewer>` camera orbits directly to normalized mouse coordinates while orchestrating surrounding 2.5D floating spatial elements that physically flee from the cursor like an organic force field.

## 1. Smooth Exponential Camera Orbit Tracking
Binds the `<model-viewer>` virtual camera orbit to cursor coordinates with inertia:
```javascript
// Normalized mouse coordinates: -0.5 to +0.5
currentMouse.x += (mouse.x - currentMouse.x) * 0.05;
currentMouse.y += (mouse.y - currentMouse.y) * 0.05;

// Camera orbit pitch and yaw coupled to mouse position
modelViewer.cameraOrbit = `${(currentMouse.x * 40) + switchSpin}deg ${90 + (currentMouse.y * 20)}deg 380%`;
```

## 2. Inverted Proximity Repulsion Field
Surrounding floating items (botanicals, berries, micro-particles) continuously calculate Euclidean distance to cursor $(p_x, p_y)$:
$$\text{distance} = \sqrt{(p_x - \text{item}_x)^2 + (p_y - \text{item}_y)^2}$$

When $\text{distance} < \text{radius}$ (e.g. $400\text{px}$):
$$\text{force} = \frac{\text{radius} - \text{distance}}{\text{radius}}$$
$$\text{targetRx} = \frac{\Delta x}{\text{distance}} \cdot \text{force} \cdot -80$$
$$\text{targetRy} = \frac{\Delta y}{\text{distance}} \cdot \text{force} \cdot -80$$
$$\text{speedMult} = 1 + \text{force} \cdot 5$$

```javascript
let rx = parseFloat(el.dataset.rx) || 0;
let ry = parseFloat(el.dataset.ry) || 0;
let angle = parseFloat(el.dataset.angle) || 0;

// Exponential lerp dampening
rx += (targetRx - rx) * 0.1;
ry += (targetRy - ry) * 0.1;
angle += 0.2 * speedMult;
```

## 3. Harmonic Float Superposition
Repulsion offsets are superimposed onto compound sinusoidal hovering waves:
```javascript
const dur = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10][i % 9];
const phase = (time + i * 0.7) * (Math.PI * 2 / dur);
const floatY = Math.sin(phase) * 15;
const floatAngle = Math.cos(phase) * 6;

el.style.transform = `translate(calc(${rx + baseX}px), calc(${ry + baseY}px + ${floatY}px)) rotate(calc(${angle}deg + ${floatAngle}deg))`;
```

## Benefits
- High visual craft with sub-millisecond calculation overhead.
- No heavy physics engine dependency (Cannon.js / Rapier); runs smoothly via native RAF loop.
