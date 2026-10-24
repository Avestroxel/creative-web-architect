---
name: cinematic-motion
description: Cinematic motion pacing, narrative rhythm, camera choreography, and multi-plane depth without disorienting velocity or gratuitous camera shake.
version: 0.2.0
tags: [cinematic, motion, 3d, camera, pacing, narrative, rhythm]
---

# Cinematic Motion & Pacing

## Narrative Pacing Rules

1. **Restraint over Speed**: Luxury and prestige come from deliberate, controlled pacing. Fast jittery motions feel cheap.
2. **Camera Choreography**: In 3D scenes (Three.js/R3F), camera orbits must follow smooth Bezier paths tied to scroll progress. Avoid sudden angle flips.
3. **Multi-Plane Parallax**: Foregrounds move slightly faster than midgrounds; backgrounds drift slowly to establish believable physical depth.

---

## Cinematic Patterns

### 1. Chapter Storytelling Sequence
Divide product experiences into 3–4 distinct narrative chapters (e.g. Genesis, Engineering, Materiality, Allocation).
Scrub between chapters based on viewport position.

### 2. Exploded Product Views
Displace 3D mesh components outward along their natural disassembly axes as the user scrolls, highlighting internal engineering and material precision.
