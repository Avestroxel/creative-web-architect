---
id: curvature-time-dilated-circuit-trace
title: Curvature-Time-Dilated Circuit Trace Kinematics
category: scroll-animations
difficulty: advanced
tags: [canvas, kinematics, racing-lines, curvature, time-dilation, polyline-interpolation, glow-shaders]
source: KIMI — GRIDO1 Racing Systems / Kimi Antonelli
author: Anas Hashim
license: MIT
---

# Curvature-Time-Dilated Circuit Trace Kinematics

## Overview & Visual Impact

When animating vehicles, racing lines, or kinetic data paths across digital surfaces, naive linear interpolation ($\text{lerp}(t)$) feels robotic and unnatural. Real vehicles obey physical laws: they decelerate sharply when entering high-curvature corners to respect centripetal grip limits, and accelerate aggressively along low-curvature straights.

The **Curvature-Time-Dilated Circuit Trace Kinematics** technique modulates traversal velocity along any discrete 2D/3D polyline based on the mathematical turning angle between successive segments. By calculating discrete curvature, smoothing it across a sliding window, and integrating time dilation, the animation automatically slows through chicanes and hairpins, and sprints down straights in a single uninterrupted 6-second lap.

The physical presence is further elevated through:
1. **Dual-Gradient Heat Filament:** The hot head of the leading trail renders an additive glow, transitioning from brand accent (`#02d2e3`) to luminous cyan (`#8df3fa`) and culminating in a white-hot inner core (`rgba(255, 255, 255, 0.95 * heat)`).
2. **Post-Lap Cool Down:** Once the lap finishes at the chequered flag, a secondary tween cools the thermal filament over 800ms to a resting line before arming interactive cursor inspection.
3. **Distance-Gated Marker Flares:** Track checkpoints and turn markers calculate instantaneous age based on distance elapsed ($(\text{distance} - d_{\text{marker}}) / \text{threshold}$), emitting expanding radial shockwave rings.

---

## Architectural Implementation

### 1. Curvature Calculation & Time Dilation Map

Given a polyline array of $N$ coordinate pairs $P_i = (x_i, y_i)$, calculate the turning angle $\theta_i$ between incoming vector $\vec{u} = P_i - P_{i-1}$ and outgoing vector $\vec{v} = P_{i+1} - P_i$:

$$\cos(\theta_i) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|}, \quad \theta_i = \arccos(\text{clamp}(\cos(\theta_i), -1, 1))$$

Smooth turning angles across a local window ($w = 6$), then compute local velocity scale:

$$v_i = \frac{1}{1 + k_{\text{brake}} \cdot \bar{\theta}_i}$$

Accumulate dilated time intervals to produce a monotonically normalized lookup table $T(i) \in [0, 1]$.

```typescript
export function computeCurvatureTimeDilation(
  path: readonly [number, number][],
  cumulativeDistances: number[],
  cornerBrake = 9,
  windowSize = 6
): number[] {
  const count = path.length;
  const turns = new Array(count).fill(0);

  for (let i = 1; i < count - 1; i++) {
    const [ax, ay] = path[i - 1];
    const [bx, by] = path[i];
    const [cx, cy] = path[i + 1];

    const ux = bx - ax, uy = by - ay;
    const vx = cx - bx, vy = cy - by;
    const lenProduct = (Math.hypot(ux, uy) || 1) * (Math.hypot(vx, vy) || 1);
    const dot = Math.min(1, Math.max(-1, (ux * vx + uy * vy) / lenProduct));
    turns[i] = Math.acos(dot);
  }

  // Sliding window average to prevent jerky velocity spikes
  const smoothedTurns = turns.map((_, i) => {
    let sum = 0, n = 0;
    for (let j = Math.max(0, i - windowSize); j <= Math.min(count - 1, i + windowSize); j++) {
      sum += turns[j];
      n++;
    }
    return sum / n;
  });

  // Time accumulation: time = distance / velocity
  const accumulatedTime = [0];
  for (let i = 1; i < count; i++) {
    const deltaDist = cumulativeDistances[i] - cumulativeDistances[i - 1];
    const speed = 1 / (1 + cornerBrake * smoothedTurns[i]);
    accumulatedTime.push(accumulatedTime[i - 1] + deltaDist / speed);
  }

  const totalDilatedTime = accumulatedTime[count - 1] || 1;
  return accumulatedTime.map((t) => t / totalDilatedTime);
}
```

---

### 2. Binary Search Distance Mapping

At runtime animation progress $p \in [0, 1]$, locate the matching distance along the polyline using binary search over the time map:

```typescript
export function getDistanceAtNormalizedTime(
  progress: number,
  timeMap: number[],
  cumulativeDistances: number[]
): number {
  if (progress <= 0) return 0;
  const total = cumulativeDistances[cumulativeDistances.length - 1];
  if (progress >= 1) return total;

  let low = 0;
  let high = timeMap.length - 1;
  while (low < high - 1) {
    const mid = (low + high) >> 1;
    if (timeMap[mid] <= progress) low = mid;
    else high = mid;
  }

  const span = timeMap[high] - timeMap[low] || 1;
  const ratio = (progress - timeMap[low]) / span;
  return cumulativeDistances[low] + (cumulativeDistances[high] - cumulativeDistances[low]) * ratio;
}
```

---

### 3. Canvas Dual-Gradient Trail Rendering

```typescript
export function drawKinematicLapTrail(
  ctx: CanvasRenderingContext2D,
  points: [number, number][],
  heat: number,
  accentColor: string,
  lineWidth = 5.9
) {
  if (points.length < 2) return;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Layer 1: Ambient additive glow
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "rgba(2, 210, 227, 0.08)";
  ctx.lineWidth = 15;
  strokePolyline(ctx, points);

  ctx.strokeStyle = "rgba(2, 210, 227, 0.15)";
  ctx.lineWidth = 8;
  strokePolyline(ctx, points);
  ctx.restore();

  // Layer 2: Solid core line
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = lineWidth;
  strokePolyline(ctx, points);

  // Layer 3: Hot head gradient
  const headCount = Math.min(points.length, 70);
  const fromIndex = points.length - headCount;
  const [xStart, yStart] = points[fromIndex];
  const [xTip, yTip] = points[points.length - 1];

  const hotGradient = ctx.createLinearGradient(xStart, yStart, xTip, yTip);
  hotGradient.addColorStop(0, "rgba(2, 210, 227, 0)");
  hotGradient.addColorStop(0.5, "rgba(2, 210, 227, 0.9)");
  hotGradient.addColorStop(1, `rgba(141, 243, 250, ${heat})`);

  ctx.strokeStyle = hotGradient;
  ctx.lineWidth = lineWidth;
  strokePolyline(ctx, points, fromIndex);

  // Layer 4: White-hot central filament
  const coreFrom = Math.max(0, points.length - Math.round(headCount * 0.4));
  const coreGradient = ctx.createLinearGradient(
    points[coreFrom][0], points[coreFrom][1],
    xTip, yTip
  );
  coreGradient.addColorStop(0, "rgba(141, 243, 250, 0)");
  coreGradient.addColorStop(1, `rgba(255, 255, 255, ${0.95 * heat})`);

  ctx.strokeStyle = coreGradient;
  ctx.lineWidth = lineWidth * 0.4;
  strokePolyline(ctx, points, coreFrom);
}

function strokePolyline(
  ctx: CanvasRenderingContext2D,
  points: [number, number][],
  fromIndex = 0
) {
  ctx.beginPath();
  ctx.moveTo(points[fromIndex][0], points[fromIndex][1]);
  for (let i = fromIndex + 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.stroke();
}
```

---

## Anti-Generic Quality Rules

- **Zero Constant Velocity:** A constant speed racing path feels like an SVG stroke animation. Curvature time dilation ($\text{brake} = 9$) is mandatory for physical believability.
- **Chequered Flag Seam Cut:** The racing path must cleanly clear the chequered flag gap via a transformed clearRect punch ($36 \times 40\text{px}$ rotated to the track vector), rather than overlapping the start/finish marker.
- **Cool-Down Phase Transition:** The hot tip must cool gracefully over 800ms before enabling cursor hover or reticle controls.
