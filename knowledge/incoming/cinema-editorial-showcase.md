# Cinema Editorial Showcase & Auteur Portfolio

## Mission & Architectural Philosophy
Create a high-end auteur cinematography showcase inspired by 35mm archival film and Swiss editorial typography.
Enforce architectural restraint: avoid cheap neon glows, oversaturated gradients, and childish AI aesthetic defaults.
Instead, emphasize deep obsidian backgrounds (#090A0F), subtle matte graphite card elevations (#12141C), warm off-white editorial serif typography (#F3F4F6), and 0.5px hairline metallic dividers.

## Masked Video Clip-Path Reveals
Implement scroll-synchronized polygonal clip-path reveals that expand film stills from a 4:5 vertical editorial portrait into an expansive 16:9 cinematic landscape as the user scrolls into view.
Use hardware-accelerated CSS clip-path polygon transitions driven by requestAnimationFrame without causing layout recalculations or layout shifts.

## Kinetic Roman Numeral Chapter Navigation
Choreograph roman numeral scene markers (e.g., I, II, III, IV) with letter-by-letter kinetic stagger reveals.
As each project scrolls into the viewport, animate line-height and opacity using cubic-bezier(0.16, 1, 0.3, 1) easing.
Include automatic prefers-reduced-motion fallback that delivers instant static typography for users requiring vestibular accessibility.

## Magnetic Project Index Pill
Engineer an ergonomic floating index pill that subtly shifts position when the cursor enters within a 120px threshold radius.
Apply dampened spring physics with a spring constant of 0.28 and mass damping of 0.85, gently returning to origin on mouse exit.
Provide full keyboard Tab focus with visible high-contrast hairline focus rings for WCAG 2.1 AA compliance.

## Inertia Horizontal Film Pan
Build a horizontal timeline strip showcasing film project frames using CSS subgrid and translate3d transforms.
Synchronize progress with native scroll timelines without using wheel event preventDefault or fake smooth-scrolling hijackers, ensuring trackpads, mouse wheels, and mobile touch gestures remain completely natural.
Target rock-solid 60 FPS performance and less than 5MB initial asset delivery.
