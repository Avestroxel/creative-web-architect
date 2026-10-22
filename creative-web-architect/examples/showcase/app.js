/**
 * Creative Web Architect — Showcase Gallery Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initClipboard();
  initGlassPlayground();
  initSkillsCatalog();
});

function initClipboard() {
  const btn = document.getElementById('copy-cmd');
  const cmd = document.getElementById('cli-cmd');
  if (!btn || !cmd) return;

  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(cmd.innerText.trim()).then(() => {
      btn.textContent = 'Copied!';
      btn.style.background = '#10B981';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
    });
  });
}

function initGlassPlayground() {
  const card = document.getElementById('sample-card');
  const blurRange = document.getElementById('blur-range');
  const blurVal = document.getElementById('blur-val');
  const opacityRange = document.getElementById('opacity-range');
  const opacityVal = document.getElementById('opacity-val');
  const satRange = document.getElementById('sat-range');
  const satVal = document.getElementById('sat-val');

  if (!card || !blurRange) return;

  function update() {
    const blur = blurRange.value;
    const opacity = opacityRange.value;
    const sat = satRange.value;

    blurVal.textContent = blur;
    opacityVal.textContent = opacity;
    satVal.textContent = sat;

    card.style.backdropFilter = `blur(${blur}px) saturate(${sat}%)`;
    card.style.webkitBackdropFilter = `blur(${blur}px) saturate(${sat}%)`;
    card.style.background = `rgba(18, 22, 36, ${opacity})`;
    card.style.border = '1px solid rgba(255, 255, 255, 0.15)';
    card.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
  }

  blurRange.addEventListener('input', update);
  opacityRange.addEventListener('input', update);
  satRange.addEventListener('input', update);
  update();
}

function initSkillsCatalog() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const skills = [
    { name: 'brief-interpreter', category: 'Intelligence', desc: 'Analyzes vague prompts into structured briefs, brand archetypes, and feature sets.' },
    { name: 'creative-direction', category: 'Intelligence', desc: 'Sets visual hierarchy, mood, art direction, and high-impact design language.' },
    { name: 'design-style-selection', category: 'Design', desc: 'Selects and applies 50+ aesthetic styles (minimal, brutalist, luxury, cyber, bento).' },
    { name: 'typography', category: 'Design', desc: 'Curates harmonious font pairings, modular scale, optical sizing, and fluid clamp().' },
    { name: 'layout-composition', category: 'Design', desc: 'Architects fluid grids, asymmetric bento layouts, container queries, and rhythm.' },
    { name: 'design-system', category: 'Design', desc: 'Builds comprehensive design token pipelines (colors, spacing, elevation, radius).' },
    { name: 'liquid-glass', category: 'Engineering', desc: 'Translucent frosted glass UI, multi-layer blur, and pointer-responsive specular highlights.' },
    { name: 'motion-design', category: 'Engineering', desc: 'Physics-based spring curves, micro-interactions, gesture feedback, and transitions.' },
    { name: 'scroll-storytelling', category: 'Engineering', desc: 'Cinematic pinned sections, horizontal galleries, scrubbing, and synchronized reveals.' },
    { name: 'three-dimensional-web', category: '3D/WebGL', desc: 'Three.js / React Three Fiber scenes, GLTF optimization, camera choreography, and lighting.' },
    { name: 'shaders-and-effects', category: '3D/WebGL', desc: 'GLSL shaders, procedural noise, displacement mapping, bloom, and chromatic aberration.' },
    { name: 'accessibility', category: 'Quality', desc: 'WCAG AAA contrast, keyboard traps, ARIA roles, screen reader UX, and reduced motion.' },
    { name: 'performance-optimization', category: 'Quality', desc: 'Core Web Vitals targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, asset pruning.' },
    { name: 'visual-qa', category: 'Quality', desc: 'Automated and systematic visual scorecard, responsive audit, and regression testing.' },
    { name: 'responsive-design', category: 'Quality', desc: 'Mobile-first fluid layouts, touch target optimization, and adaptive navigation.' },
    { name: 'content-writing', category: 'Creative', desc: 'Editorial headlines, micro-copy, value propositions, and brand-tailored prose.' },
    { name: 'image-art-direction', category: 'Creative', desc: 'Visual asset guidance, color grading, photography styles, and procedural SVGs.' },
    { name: 'website-redesign', category: 'Strategy', desc: 'Systematic visual and technical audits for refactoring legacy web applications.' },
    { name: 'ecommerce-design', category: 'Domain', desc: 'High-conversion product showcases, quick-views, carts, and micro-checkout UX.' },
    { name: 'dashboard-design', category: 'Domain', desc: 'Information density, real-time telemetry, live charts, and dark-mode data displays.' },
    { name: 'portfolio-design', category: 'Domain', desc: 'Creative case studies, interactive archives, client testimonials, and magnetics.' },
    { name: 'cinematic-product-pages', category: 'Domain', desc: 'Hero product reveals, exploded mechanics, specification grids, and sticky narratives.' },
    { name: 'project-delivery', category: 'Production', desc: 'Production build verification, bundle analysis, security check, and release packaging.' },
  ];

  grid.innerHTML = skills.map(s => `
    <div class="skill-item glass-panel">
      <div class="skill-header">
        <span class="skill-name">${s.name}</span>
        <span class="skill-tag">${s.category}</span>
      </div>
      <p class="skill-desc">${s.desc}</p>
    </div>
  `).join('');
}
