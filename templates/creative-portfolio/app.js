/**
 * Kaelen Voss Portfolio Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initCategoryFilters();
  initCaseStudyModal();
  initContactDrawer();
});

/* Interactive Custom Cursor */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const glow = document.getElementById('cursor-glow');
  if (!cursor || !glow) return;

  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    glow.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function renderGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(renderGlow);
  }
  requestAnimationFrame(renderGlow);

  // Expand cursor on interactive hover
  const interactives = document.querySelectorAll('button, a, .project-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.2)';
      cursor.style.background = 'rgba(226, 183, 116, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = '#FFFFFF';
    });
  });
}

/* Category Filter Tabs */
function initCategoryFilters() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Case Study Data & Modal */
function initCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  const modalBody = document.getElementById('case-study-body');
  const closeBtn = document.getElementById('close-modal');

  const caseStudies = {
    lumina: {
      title: 'Lumina Hyper-Spatial',
      client: 'Lumina Dynamics AG',
      year: '2025',
      awards: 'Awwwards Site of the Year Nominee',
      summary: 'Crafted an immersive WebGL car narrative with custom GLSL depth-of-field shaders, real-time particle air currents, and physics-driven scroll choreography.',
      metrics: ['+340% User Time On Site', '60 FPS across mobile WebGL', '1.2M Session Launches'],
      stack: ['Three.js', 'Custom GLSL Shaders', 'Web Audio API', 'TypeScript'],
    },
    zenith: {
      title: 'Zenith Wealth Horizon',
      client: 'Zenith Asset Management',
      year: '2025',
      awards: 'FWA of the Day',
      summary: 'Pioneered an institutional-grade multi-layer frosted glass interface for portfolio monitoring, featuring fluid spring motion and tactile telemetry.',
      metrics: ['Sub-16ms Frame Latency', 'WCAG AAA Contrast Modes', '4.9/5 User Score'],
      stack: ['Liquid Glass System', 'React 18', 'Framer Motion', 'Tailwind/CSS'],
    },
    neural: {
      title: 'Neural Resonance Synthesizer',
      client: 'Bespoke Research Commission',
      year: '2024',
      awards: 'Awwwards Developer Award',
      summary: 'Engineered an audio-reactive generative art piece turning microphone sound waves into real-time undulating 3D surface meshes.',
      metrics: ['128-band FFT Analysis', 'Zero Garbage Collection Spikes', 'Open Source Artifact'],
      stack: ['Web Audio API', 'WebGL Compute', 'Three.js', 'GLSL'],
    },
    solis: {
      title: 'Solis Chronograph Atelier',
      client: 'Solis Horology Geneva',
      year: '2024',
      awards: 'CSSDA Best UI / UX / Innovation',
      summary: 'High-precision micro-mechanical 3D timepiece exploded view enabling customers to inspect tourbillon escapements down to 50-micron gear teeth.',
      metrics: ['PBR Material Accuracy', 'Compressed Dracos Mesh < 2MB', '99.4% Client Conversion'],
      stack: ['Three.js', 'DRACO Compression', 'HDR Lighting', 'Vanilla JS'],
    },
  };

  function openCaseStudy(id) {
    const data = caseStudies[id];
    if (!data || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <span class="section-tag">${data.client} // ${data.year}</span>
      <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin: 0.5rem 0 0.5rem;">${data.title}</h2>
      <div style="display: inline-block; background: rgba(226, 183, 116, 0.15); color: var(--accent-gold); padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; margin-bottom: 1.5rem;">${data.awards}</div>
      <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 2rem;">${data.summary}</p>
      
      <h4 style="font-size: 0.85rem; letter-spacing: 0.1em; color: var(--accent-gold); margin-bottom: 0.75rem;">KEY PERFORMANCE IMPACT</h4>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
        ${data.metrics.map(m => `<div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); padding: 1rem; border-radius: 10px; font-size: 0.85rem; text-align: center;">${m}</div>`).join('')}
      </div>

      <h4 style="font-size: 0.85rem; letter-spacing: 0.1em; color: var(--accent-gold); margin-bottom: 0.75rem;">TECHNOLOGICAL STACK</h4>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${data.stack.map(s => `<span class="skill-pill">${s}</span>`).join('')}
      </div>
    `;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      openCaseStudy(target);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });
}

/* Contact Drawer */
function initContactDrawer() {
  const modal = document.getElementById('contact-modal');
  const openBtn = document.getElementById('open-contact-btn');
  const closeBtn = document.getElementById('close-contact');
  const copyBtn = document.getElementById('copy-btn');

  if (!modal || !openBtn) return;

  function open() {
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      close();
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('kaelen@voss-studio.design').then(() => {
        copyBtn.textContent = 'Copied to Clipboard!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy Address';
        }, 2000);
      });
    });
  }
}
