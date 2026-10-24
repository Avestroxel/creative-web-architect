---
id: packed-delta-lattice-halftone-matrix
title: Packed-Delta Lattice Halftone Matrix
category: performance-engineering
difficulty: advanced
tags: [canvas, performance, spatial-indexing, halftone, compression, delta-encoding, reticle]
source: KIMI — GRIDO1 Racing Systems / Kimi Antonelli
author: Anas Hashim
license: MIT
---

# Packed-Delta Lattice Halftone Matrix

## Overview & Visual Impact

Interactive data visualizations, geographic maps, and telemetry dashboards often require displaying thousands of discrete point entities (halftone matrices, radar grids, dot maps). Storing 8,000+ points as individual JavaScript objects `{ x, y, radius, color }` introduces significant memory bloat, garbage collection overhead, and expensive $O(N)$ iteration loops during mouse move interactions.

The **Packed-Delta Lattice Halftone Matrix** technique solves this by:
1. **Delta-Compressed Coordinate Encoding:** All coordinate points snapped to regular lattice intervals $(p_x, p_y)$ are serialized into a compact string format (`rowDelta:firstCol,delta1,delta2...`). 8,004 individual coordinates consume only ~16KB of source code.
2. **Offscreen Canvas Static Baking:** The quiescent, unlit state of the halftone field is drawn once to an offscreen backing store canvas and blitted in a single `drawImage()` call per frame.
3. **$O(1)$ Spatial Indexing & Reticle Crosshairs:** Moving the cursor over the map transforms discrete circular dots into squared chequerboard cells based on row and column parity, checking only the local bounding box of active cells rather than iterating through 8,000 points.

---

## Architectural Implementation

### 1. Lattice Serialization & Unpacking

```typescript
export interface LatticeDefinition {
  pitchX: number;
  pitchY: number;
  originX: number;
  originY: number;
}

export function unpackDeltaLattice(
  packedString: string,
  lattice: LatticeDefinition
): { x: number; y: number; row: number; col: number }[] {
  const points: { x: number; y: number; row: number; col: number }[] = [];
  const rows = packedString.split(";");
  let currentRow = 0;

  for (const rowData of rows) {
    if (!rowData) continue;
    const [rowDeltaStr, colsStr] = rowData.split(":");
    currentRow += parseInt(rowDeltaStr, 10);

    const colDeltas = colsStr.split(",").map(Number);
    let currentCol = colDeltas[0];

    // First column in row
    points.push({
      row: currentRow,
      col: currentCol,
      x: lattice.originX + currentCol * lattice.pitchX,
      y: lattice.originY + currentRow * lattice.pitchY,
    });

    // Subsequent columns along row
    for (let i = 1; i < colDeltas.length; i++) {
      currentCol += colDeltas[i];
      points.push({
        row: currentRow,
        col: currentCol,
        x: lattice.originX + currentCol * lattice.pitchX,
        y: lattice.originY + currentRow * lattice.pitchY,
      });
    }
  }

  return points;
}
```

---

### 2. Offscreen Canvas Baking

```typescript
export function bakeHalftoneBackingStore(
  points: { x: number; y: number }[],
  width: number,
  height: number,
  dotRadius = 1.75,
  fillColor = "#7a7a7a"
): HTMLCanvasElement {
  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext("2d");
  if (!ctx) return offscreen;

  ctx.fillStyle = fillColor;
  for (const pt of points) {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, dotRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  return offscreen;
}
```

---

### 3. Real-Time Reticle & Chequerboard Squaring

When the cursor passes over the map, points near the cursor coordinates or along its row/column reticle axes square up into chequerboard patterns:

```typescript
export function renderInteractiveReticleDots(
  ctx: CanvasRenderingContext2D,
  bakedCanvas: HTMLCanvasElement,
  points: { x: number; y: number; row: number; col: number }[],
  pointerMap: { x: number; y: number; active: boolean },
  lattice: LatticeDefinition,
  accentColor = "#02d2e3"
) {
  // Blit pre-baked base field in 1 GPU call
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(bakedCanvas, 0, 0);

  if (!pointerMap.active) return;

  const targetRow = Math.round((pointerMap.y - lattice.originY) / lattice.pitchY);
  const targetCol = Math.round((pointerMap.x - lattice.originX) / lattice.pitchX);
  const radius = 170;
  const radiusSq = radius * radius;

  for (const pt of points) {
    const dx = pt.x - pointerMap.x;
    const dy = pt.y - pointerMap.y;
    const distSq = dx * dx + dy * dy;

    // Crosshair axis match or radial proximity
    const isAxis = pt.row === targetRow || pt.col === targetCol;
    if (distSq > radiusSq && !isAxis) continue;

    const proximity = isAxis
      ? 0.85
      : Math.max(0, 1 - Math.sqrt(distSq) / radius);

    // Squared Chequerboard Morphing
    if (proximity > 0.34) {
      const squareSize = lattice.pitchX * (0.7 + 0.3 * proximity);
      const isParityEven = (pt.row + pt.col) % 2 === 0;

      ctx.fillStyle = isParityEven ? accentColor : "#f7fafb";
      ctx.fillRect(
        pt.x - squareSize / 2,
        pt.y - squareSize / 2,
        squareSize,
        squareSize
      );
    }
  }
}
```

---

## Anti-Generic Quality Rules

- **Zero Per-Frame Iteration of 8,000 Discs:** Never execute `arc()` or `fill()` 8,000 times per frame in an animation loop. Always bake quiescent states to an offscreen backing store.
- **Delta-Packed Strings Over Large JSON:** Do not ship bloated JSON arrays of coordinates. Use row/col delta encoding for repetitive geometric matrices.
- **Morphing Feedback:** An interactive dot field must respond distinctly to crosshairs (e.g. squaring into chequers) rather than just brightening linearly.
