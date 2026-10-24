# Motion Design & Refined Visual Laboratory

This laboratory showcases the upgraded Motion Design, Interaction Engineering, and Refined Visual Design capabilities of Creative Web Architect (`@cwa`).

## Demonstrated Modules

1. **Demo A: Scroll Storytelling** — Bidirectional chapter synchronization, line-by-line choreography, and pinned narrative transitions with zero layout thrashing.
2. **Demo B: Button Interaction Laboratory** — Magnetic cursor attraction (0.28 damping factor), direction-aware hover surface reveal (-180° to 180° angle tracking), sliding split-label typography, and state morphing (`idle` → `processing` → `success`).
3. **Demo C: Micro-Interaction Playground** — Tactile spring toggles (`role="switch"`), fluid segmented tabs with shared pill indicator, zero-thrash accordion, and continuous range slider.
4. **Demo D: Refined Liquid Glass** — Physically believable frosted glass with 20px blur, 140% saturation, 0.5px hairline highlights, subtle specular sheen, and restrained 3D perspective tilt (max 6°).
5. **Demo E: Premium Dark Website (Vesper & Co.)** — Proving luxury dark mode without neon: deep obsidian (`#0C0D12`), charcoal cards (`#14161F`), warm off-white typography (`#F1F5F9`), and champagne accents.
6. **Demo F: 60 FPS Performance Suite & Accessibility** — Real-time frame telemetry, reduced-motion simulation override, and hardware-accelerated transforms (`translate3d`, `will-change`).

## Running Locally

To launch the laboratory locally:

```bash
# From within examples/motion-laboratory
pnpm dev

# Or directly with serve / any static server
npx -y serve . -p 3004
```

Then open `http://localhost:3004` in your browser.
