# Scroll-Driven 3D GLTF Flight Path & Inertial Banking Kinematics

## Architectural Philosophy
Transforms standalone 3D models into narrative protagonists that guide users through long-form editorial viewports. Rather than static 3D canvas viewers or chaotic free-cam orbits, flight paths are strictly coupled to document scroll progress with intentional hold zones, transition dives, and velocity-coupled banking physics.

## Core Kinematic Equations

### 1. Viewport Hold-and-Dive Progress
Given page progress $p = \frac{\text{scrollY}}{\text{innerHeight}}$ where $i = \lfloor p \rfloor$ and fractional progress $f = p - i$:
$$t = \text{ease}\left(\text{clamp}\left(\frac{f - 0.12}{0.76}, 0, 1\right)\right)$$
$$\text{dive} = \sin(t \cdot \pi) \cdot -0.22$$

Where the cubic easing function is defined as:
$$\text{ease}(t) = \begin{cases} 4t^3 & \text{if } t < 0.5 \\ 1 - \frac{(-2t + 2)^3}{2} & \text{otherwise} \end{cases}$$

This ensures the 3D entity remains stationary and anchored beside textual headings, then executes an organic gravitational dive mid-flight before surfacing beside the next waypoint.

### 2. Inertial Banking & Velocity Coupling
Flight angles dynamically respond to the instantaneous velocity vector $(v_x, v_y)$:
$$\text{pitch} = \text{pitch}_{\text{target}} - \text{clamp}(v_y \cdot 22, -28^\circ, 28^\circ) + \sin(t \cdot 2.1 + 1) \cdot 3^\circ + \text{mouse}_y \cdot 6^\circ$$
$$\text{roll} = \text{roll}_{\text{target}} + \text{clamp}(v_x \cdot 18, -30^\circ, 30^\circ) + \sin(t \cdot 1.7) \cdot 4^\circ$$

Euler order `'YZX'` applies roll around the longitudinal axis first, pitching the nose down into dives and banking aggressively into horizontal flight arcs.

### 3. Asymmetric Spring Follower
Smooth lag using frame-rate independent exponential decay:
$$k = 1 - e^{-\Delta t \cdot 3.2}$$
$$k_{\text{yaw}} = 1 - e^{-\Delta t \cdot 2.6}$$
$$\text{yaw} = \text{lerpAngle}(\text{yaw}_{\text{curr}}, \text{yaw}_{\text{target}}, k_{\text{yaw}})$$

```typescript
function lerpAngle(a: number, b: number, t: number): number {
  const d = ((b - a + 540) % 360) - 180;
  return a + d * t;
}
```

## Keyframe Layout Structure
Keyframes specify normalized screen space $(-1 \dots 1)$, size ratio $s$, and angles in degrees:
```javascript
const DESKTOP_FLIGHT_KEYS = [
  { x: -0.03, y: -0.12, s: 1.00, yaw: 150, pitch: 6,  roll: -4 }, // Hero
  { x: -0.30, y: -0.04, s: 1.00, yaw: 125, pitch: 10, roll: 6  }, // Section 01
  { x:  0.22, y: -0.30, s: 1.00, yaw: 40,  pitch: -6, roll: -8 }, // Section 02 (Dark)
  { x: -0.22, y:  0.02, s: 0.96, yaw: 160, pitch: 8,  roll: 4  }, // Section 03
  { x:  0.02, y: -0.08, s: 0.92, yaw: 105, pitch: 4,  roll: 0  }  // Footer CTA
];
```

## Anti-Pattern Warnings
- Never bind 3D camera coordinates directly to unthrottled scroll events; always lerp through a velocity-damped flight node.
- Never use synchronous file loaders; employ progressive fallback timers (`2500ms`) to show HTML typography if large GLTF models are streaming.
