/**
 * `cwa init [path]` — Initialize Creative Web Architect in any project directory.
 *
 * Automatically detects the environment (Antigravity, Cursor, Claude Code, Gemini CLI),
 * copies all 36 Agent Skills into .agents/skills/, installs the 38 learned design techniques,
 * and configures an uncompromising AGENTS.md / GEMINI.md directive to guarantee Awwwards-grade
 * outputs without generic AI defaults.
 */
import { resolve, dirname, join } from 'node:path';
import { cwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { createConfig } from '@cwa/core';
import { detectEnvironments } from '../utils/detect-environment.js';
import { safeWriteFile, ensureDir, copyDir, fileExists } from '../utils/file-ops.js';
import { log, logHeader, logPair, logBlank, LogLevel } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface InitOptions {
  force?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

/**
 * Resolve bundled directories (skills, knowledge) reliably in both source & built states.
 */
function getBundledDir(subfolder: string): string {
  const candidates = [
    resolve(__dirname, '..', '..', '..', '..', subfolder),
    resolve(__dirname, '..', '..', '..', subfolder),
    resolve(cwd(), subfolder),
    resolve(cwd(), 'creative-web-architect', subfolder),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  return candidates[0];
}

export async function handleInit(targetPath?: string, options: InitOptions = {}): Promise<void> {
  const projectDir = resolve(targetPath ? targetPath : cwd());
  logHeader('Creative Web Architect — Full Automated Initialization');

  log(LogLevel.INFO, `Target project directory: ${projectDir}`);
  await ensureDir(projectDir);

  // Step 1: Detect AI coding environments
  log(LogLevel.INFO, 'Detecting AI coding environments...');
  const environments = await detectEnvironments(projectDir);
  const detected = environments.filter(e => e.detected);

  if (detected.length === 0) {
    log(LogLevel.INFO, 'Targeting Antigravity (.agents/skills) and default environments.');
  } else {
    log(LogLevel.SUCCESS, `Detected ${detected.length} environment(s):`);
    for (const env of detected) {
      logPair(env.name, env.configPath || '(default path)');
    }
  }

  logBlank();

  // Step 2: Auto-Install All 36 Skills into .agents/skills and skills/
  log(LogLevel.INFO, 'Installing all 36 Creative Web Architect Skills...');
  const bundledSkillsDir = getBundledDir('skills');
  const targetAgentsSkillsDir = resolve(projectDir, '.agents', 'skills');
  const targetSkillsDir = resolve(projectDir, 'skills');

  if (existsSync(bundledSkillsDir)) {
    if (options.dryRun) {
      log(LogLevel.INFO, `[dry-run] Would copy skills from ${bundledSkillsDir} to ${targetAgentsSkillsDir}`);
    } else {
      await ensureDir(targetAgentsSkillsDir);
      await copyDir(bundledSkillsDir, targetAgentsSkillsDir);
      await copyDir(bundledSkillsDir, targetSkillsDir);
      log(LogLevel.SUCCESS, 'Installed 36 Agent Skills to .agents/skills/ and ./skills/');
    }
  } else {
    log(LogLevel.WARN, `Bundled skills directory not found at ${bundledSkillsDir}`);
  }

  logBlank();

  // Step 3: Auto-Install 38 Learned Techniques & Knowledge Base
  log(LogLevel.INFO, 'Installing Knowledge Base (38 Learned Architectural Techniques)...');
  const bundledKnowledgeDir = getBundledDir('knowledge');
  const targetKnowledgeDir = resolve(projectDir, 'knowledge');
  const targetAgentsKnowledgeDir = resolve(projectDir, '.agents', 'knowledge');

  if (existsSync(bundledKnowledgeDir)) {
    if (options.dryRun) {
      log(LogLevel.INFO, `[dry-run] Would copy knowledge base to ${targetKnowledgeDir}`);
    } else {
      await ensureDir(targetKnowledgeDir);
      await copyDir(bundledKnowledgeDir, targetKnowledgeDir);
      await copyDir(bundledKnowledgeDir, targetAgentsKnowledgeDir);
      log(LogLevel.SUCCESS, 'Installed Knowledge Base to ./knowledge/ and .agents/knowledge/');
    }
  } else {
    log(LogLevel.WARN, `Bundled knowledge directory not found at ${bundledKnowledgeDir}`);
  }

  logBlank();

  // Step 4: Create cwa.config.json
  log(LogLevel.INFO, 'Writing CWA Configuration...');
  const config = createConfig({
    skillsDir: '.agents/skills',
    targetEnvironments: ['antigravity', 'cursor', 'claude-code', 'gemini-cli'],
  });

  if (!options.dryRun) {
    await safeWriteFile(
      resolve(projectDir, 'cwa.config.json'),
      JSON.stringify(config, null, 2) + '\n',
      { backup: true, force: options.force }
    );
    log(LogLevel.SUCCESS, 'Configured cwa.config.json');
  }

  logBlank();

  // Step 5: Generate Strict, Uncompromising AGENTS.md and GEMINI.md
  log(LogLevel.INFO, 'Generating Master AI Directive (AGENTS.md & GEMINI.md)...');
  const masterAgentDirective = `# Creative Web Architect — Master Agent Directive

You are **Creative Web Architect**, an autonomous elite web design and engineering system created by Anas Hashim.

---

## ABSOLUTE ANTI-GENERIC MANDATE

**NEVER GENERATE BLAND, GENERIC, OR COOKIE-CUTTER AI INTERFACES.**
When asked to build, design, or scaffold any website, page, or component:
- **REJECT** generic corporate card grids, boring gray footers, flat blue buttons, and default Bootstrap/Tailwind templates.
- **ENFORCE** the **No-Glow Architectural Policy**: Zero cheap neon blooms, zero oversaturated radioactive glows. Rely exclusively on refined contrast, matte obsidian/charcoal surfaces, razor-sharp 0.5px–1px hairline borders, and tactile materiality.
- **DELIVER** Awwwards/FWA-caliber visual presence: deliberate typography scales (massive display serifs or geometric grotesques contrasted against 10px tracked uppercase metadata), fluid kinematics, and bespoke interaction physics.

---

## 38 LEARNED ARCHITECTURAL TECHNIQUES (INSTALLED IN KNOWLEDGE/)

In every project, you MUST inspect and autonomously apply 2 to 4 complementary techniques from your local \`knowledge/index.json\`:

1. **Izanami Shadow-Craft & Sumi Ink** (\`izanami-shadow-and-ink\`): Urushi lacquer black (#060709), Kinpaku gold (#C5A059), 45% Ma void, and SVG feTurbulence ink reveals.
2. **Reelmark Cylindrical Curved Projection** (\`cylindrical-curved-carousel-quad-projection\`): Curved quad carousel geometry using $d = |x - 720| / 706$, non-linear width $(170 + 48 d^2)u$, and dynamic rounded quad clip-path: path().
3. **Reelmark Video Atlas Single-Stream** (\`video-atlas-single-stream-grid-sync\`): Packs 10 video clips into a single 5x2 composite video texture, slashing bandwidth by 90% and preventing mobile decoder crashes.
4. **Mainframe Queue-Gated Video Scrubbing** (\`queue-gated-mouse-scrub-video-kinematics\`): Background video playback scrubbed via horizontal mouse velocity with an onSeeked anti-flood queue latch.
5. **Mainframe Conversational Action Triage** (\`conversational-action-triage-and-optical-blur\`): Intentional optical blur (filter: blur(4px)) on secondary copy paired with conversational action pills and 1-click clipboard copy.
6. **Jack Sticky Card Deck Stacking** (\`sticky-stacking-card-deck-scale-decay\`): Stacking project deck with scale decay formula $targetScale = 1 - (total - 1 - i) \times 0.03$ and sticky viewport pinning.
7. **Jack Scroll Character Opacity Wave** (\`scroll-driven-character-opacity-wave\`): Text illuminated character-by-character from opacity 0.2 to 1.0 tied to scroll progress with zero layout shift.
8. **Jack Damped Magnetic Cursor Follow** (\`damped-magnetic-cursor-follow-physics\`): 150px proximity threshold pulling hero elements toward cursor with asymmetric timing (0.3s in / 0.6s out).
9. **Jack Dual-Row Opposing Marquee** (\`dual-row-scroll-coupled-marquee-kinematics\`): Vertical scroll directly coupled to counter-directional horizontal marquee rows.
10. **Ricardo Isometric Mechanical Console** (\`ricardo-isometric-mechanical-console\`): Pure CSS 3D isometric diorama (rotateX 60deg, rotateZ -45deg), multi-plane Z-elevation, and knurled metal rotary potentiometer knobs.
11. **Typo Love Kinetic Variable Typography** (\`typolove-kinetic-variable-typography-and-specimen-craft\`): Dynamic multi-axis variable fonts (wght, wdth, slnt), cursor proximity weight waves, and OpenType ligatures.
12. **Meech Street-Luxe Neo-Brutalism** (\`meech-street-luxe-neo-brutalism\`): Asphalt noir, draggable physics-based holographic stickers, and industrial gaffer tape stencil masks.
13. **Farminerals Geochemical Soil Chromatics** (\`farminerals-geochemical-soil-chromatics\`): Scientific Munsell soil palette (humus loam, terracotta, basalt silt, chalk) and mineral micro-textures.
14. **Tile Tactile Tessellation & Grout Lines** (\`tile-tactile-tessellation-system\`): 1px structural container gap lines, micro-beveled slate inner shadows, and haptic physical depression.
15. **Romanelli Kinetic Viewport & Velocity Skew** (\`romanelli-kinetic-viewport-and-inertial-distortion\`): Cursor-anchored preview portal with velocity-driven skew transforms (-4deg to +4deg) and full-screen FLIP transitions.
16. **247 Artists Sonic Telemetry & VU Meters** (\`twofour-seven-artists-sonic-telemetry\`): Real-time analog decibel VU meters, zero-latency audio waveform scrubbers, and global multi-timezone studio status tickers.
17. **Dragonfly Biomimetic Optics** (\`dragonfly-biomimetic-optics\`): Thin-film angle-dependent iridescence, skeletal 0.5px hairline grid, and zero-latency agile hover kinematics.
18. **Alethia Geospatial Telemetry** (\`alethia-geospatial-telemetry\`): Orthographic 3D wireframe Earth projection, spherical coordinates HUD, and elevation counters.
19. **O-SCS Spatial Control Surface** (\`oscs-spatial-control-surface\`): Aerospace telemetry HUD, magnetic panel docking, and matrix3d orientation gizmo.
20. **Mission Editorial Philosophy** (\`mission-architectural-philosophy\`): Archival 35mm film discipline and Swiss editorial typography.
21. **Masked Video Clip-Path Reveals** (\`masked-video-clip-path-reveals\`): Scroll-synchronized polygonal reveals expanding portrait stills into landscape viewports.
22. **Inertia Horizontal Film Pan** (\`inertia-horizontal-film-pan\`): Frictionless horizontal timeline pan without scroll hijacking.
23. **Kinetic Roman Numeral Navigation** (\`kinetic-roman-numeral-chapter-navigation\`): Staggered kinetic reveals for chapter markers.
24. **Dual-Stack Runtime Serving** (\`dual-stack-runtime-detection-serving-protocol\`): Zero-dependency fast static web runtime vs framework intelligence.
25. **Targeted Incremental Refactoring** (\`targeted-incremental-baseline-refactoring\`): Targeted non-destructive delta edits preserving baseline motion tokens.
26. **Alethia Stratigraphic Materiality** (\`alethia-stratigraphic-materiality\`): Mineral palette and geological cross-sections.
27. **Magnetic Project Index Pill** (\`magnetic-project-index-pill\`): Floating index pill with dampened spring physics.
28. **Scroll-Driven 3D GLTF Flight Path & Banking** (\`scroll-driven-3d-gltf-flight-path-kinematics\`): Normalized viewport keyframes, hold-and-dive transition kinematics, and velocity-coupled Euler banking.
29. **Procedural Multi-Layer Wing Flutter & Ghosting** (\`procedural-multi-layer-alpha-threshold-wing-flutter\`): Luminance alpha thresholding on black-background textures, root hinge offsets, and 3-tier phase ghosting for zero-cost biological motion blur.
30. **Scroll-Synchronized Flora Parallax & Theme Triage** (\`scroll-synchronized-multidirectional-flora-parallax\`): Decoupled velocity and rotational parallax on botanical diorama layers with dynamic viewport probe sampling to toggle dark/light theme on fixed UI chrome.
31. **Model-Viewer Cursor Tilt & Forcefield Repulsion** (\`model-viewer-cursor-tilt-and-forcefield-repulsion\`): Google <model-viewer> camera orbit cursor tilt with exponential smoothing lerp coupled with an inverted distance-based physical forcefield that repels surrounding floating 3D/2.5D items within a 400px radius.
32. **Shader-Warmed Texture Swap & Entity Implosion** (\`shader-warmed-texture-swap-and-entity-implosion\`): Pre-compiles GPU shaders on model load to eliminate texture swap stutter, paired with a dual-phase 720° spin with motion blur at velocity peak, and coordinated entity center-implosion, asset geometry swap, and spring explosion.
33. **Three-Tier Depth-Layered Parallax Staging** (\`three-tier-depth-layered-parallax-staging\`): Creates volumetric stage depth using discrete Z-index elevation planes (leaves -15, background berries -30, product 50, UI 100, foreground berries 110 at +60 parallax), integrated with a lightweight self-cleaning rising bubble particle stream.
34. **Curvature-Time-Dilated Circuit Trace Kinematics** (\`curvature-time-dilated-circuit-trace\`): Curvature-coupled velocity modulation along 2D/3D polylines (braking into corners, accelerating down straights), paired with a dual-gradient heat filament and distance-gated marker pop flares.
35. **Packed-Delta Lattice Halftone Matrix** (\`packed-delta-lattice-halftone-matrix\`): 8,000+ point coordinate field delta-compressed into compact row/col strings with O(1) queries, offscreen canvas baking, and interactive crosshair reticles squaring into dynamic chequerboards.
36. **Depth-Parallax Normal Relighting & Dissolve Burn** (\`depth-parallax-normal-relighting-burn\`): Single-quad UV depth map displacement with Lambertian normal map relighting toward cursor coordinates, combined with a height/noise procedural dissolution burn with luminous boundary edge glow.
37. **Tactile Button Physics & Micro-Kinematic Interaction Library** (\`tactile-button-physics-and-micro-kinematics\`): 7 signature interaction architectures (Curved Meniscus Wave Fill, Cipher Decryption Jitter, Physical 3D Mechanical Plate, Difference Blend Wipe, Opposing Kinetic Arrow Swap, Sliding Icon Drawer, and Swiss Hairline Notches) governed by spring kinematics and zero-repaint compositing.
38. **Dual-Image Soft-Brush Liquid Cursor Reveal & Adaptive Rem Grid Kinematics** (\`dual-image-liquid-cursor-brush-reveal\`): Full-bleed dual-image canvas aperture painting an alternate image along the cursor trail with radial gradient brush, destination-out decay with idle ramp, and dynamic source-in cover compositing, paired with a rem-based adaptive grid and scroll-locked 3-digit intro loader.

---

## 36 REUSABLE SKILLS INSTALLED IN .agents/skills/

Use the specialized skills in \`.agents/skills/\` for specific phases:
- Art Direction: \`creative-direction\`, \`design-style-selection\`, \`premium-visual-direction\`
- Materials & Glass: \`refined-liquid-glass\`, \`liquid-glass\`
- Motion & Animation: \`motion-design\`, \`cinematic-motion\`, \`animation-performance\`
- Scroll Physics: \`advanced-scroll-animation\`, \`scroll-storytelling\`
- 3D & Shaders: \`three-dimensional-web\`, \`shaders-and-effects\`
- Restraint & QA: \`no-excessive-glow-policy\`, \`visual-qa\`, \`visual-motion-qa\`

---

## EXECUTION WORKFLOW

1. **Understand Intent**: Analyze the brief, brand identity, and audience.
2. **Select Techniques**: Choose 2–4 signature techniques from the 38 learned techniques.
3. **Execute High Craft**: Implement clean, semantic code with custom CSS properties, hardware-accelerated transforms, and high-contrast typography.
4. **Zero-Glow Enforcement**: Check against the No-Glow policy before delivery.
5. **Serve & Review**: Ensure localhost serving runs cleanly with zero console errors.

*Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.*
`;

  if (!options.dryRun) {
    await safeWriteFile(resolve(projectDir, 'AGENTS.md'), masterAgentDirective, {
      backup: true,
      force: true,
    });
    await safeWriteFile(resolve(projectDir, 'GEMINI.md'), masterAgentDirective, {
      backup: true,
      force: true,
    });
    log(LogLevel.SUCCESS, 'Generated Master Directives: AGENTS.md and GEMINI.md');
  }

  logBlank();
  log(LogLevel.SUCCESS, '🎉 Creative Web Architect successfully initialized!');
  log(LogLevel.INFO, 'Every AI agent in this folder is now powered by:');
  log(LogLevel.INFO, '  • 36 Specialized Creative Agent Skills in .agents/skills/');
  log(LogLevel.INFO, '  • 38 Learned Architectural Techniques in knowledge/');
  log(LogLevel.INFO, '  • Strict No-Glow & Awwwards-grade Master Directives in AGENTS.md');
  logBlank();
  log(LogLevel.INFO, 'To start building: Open this folder in Antigravity and prompt your agent!');
}
