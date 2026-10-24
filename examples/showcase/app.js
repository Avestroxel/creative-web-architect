/**
 * Creative Web Architect — Official Website Logic
 * Handles interactive 3D hero canvas, style switcher, clipboard utilities,
 * mobile drawer toggle, and accessible FAQ accordions.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initHero3DCanvas();
    initClipboardButtons();
    initStyleShowcase();
    initInstallationTabs();
    initFaqAccordion();
    initMobileNav();
  });

  // =========================================================================
  // 1. INTERACTIVE 3D HERO CANVAS (LIGHTWEIGHT GEOMETRIC CRYSTAL)
  // =========================================================================
  function initHero3DCanvas() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.clientWidth || 720);
    let height = (canvas.height = 480);

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.parentElement.clientWidth || 720;
      height = canvas.height = 480;
    });

    // 3D Icosahedron vertices definition
    const t = (1.0 + Math.sqrt(5.0)) / 2.0;
    const vertices = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ].map(([x, y, z]) => {
      const len = Math.hypot(x, y, z);
      return [x / len * 170, y / len * 170, z / len * 170];
    });

    // Edges connecting vertices
    const edges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [1, 7], [1, 8], [1, 9],
      [2, 11], [2, 4], [2, 6], [2, 10], [2, 3],
      [3, 4], [3, 9], [3, 8], [3, 6],
      [4, 5], [4, 9], [4, 11],
      [5, 9], [5, 11],
      [6, 7], [6, 8], [6, 10],
      [7, 8], [7, 10],
      [8, 9],
      [10, 11]
    ];

    let rotX = 0.4;
    let rotY = 0.5;
    let targetRotX = 0.4;
    let targetRotY = 0.5;

    // Smooth mouse parallax rotation
    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = normX * 0.9;
      targetRotX = -normY * 0.9;
    });

    function render3D() {
      // Inertial rotation
      rotX += (targetRotX - rotX) * 0.05 + 0.002;
      rotY += (targetRotY - rotY) * 0.05 + 0.003;

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const projected = vertices.map(([x, y, z]) => {
        // Rotate around Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // Rotate around X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective projection
        const fov = 500;
        const distance = fov + z2;
        const scale = fov / distance;
        return [
          width / 2 + x1 * scale,
          height / 2 + y2 * scale,
          scale,
          z2
        ];
      });

      // Draw wireframe edges
      ctx.lineWidth = 1;
      for (const [i, j] of edges) {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1[3] + p2[3]) / 2;
        const alpha = Math.max(0.08, Math.min(0.55, (avgZ + 170) / 340));

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
      }

      // Draw subtle vertex nodes
      for (const p of projected) {
        ctx.fillStyle = 'rgba(212, 175, 55, 0.45)'; // Subtle Champagne node
        ctx.beginPath();
        ctx.arc(p[0], p[1], 2.5 * p[2], 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(render3D);
    }

    render3D();
  }

  // =========================================================================
  // 2. CLIPBOARD UTILITIES
  // =========================================================================
  function initClipboardButtons() {
    const heroBtn = document.getElementById('copy-btn-hero');
    const heroCmd = document.getElementById('cli-cmd-hero');

    if (heroBtn && heroCmd) {
      heroBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(heroCmd.textContent.trim()).then(() => {
          heroBtn.textContent = 'Copied!';
          heroBtn.style.background = '#34D399';
          heroBtn.style.color = '#000';
          setTimeout(() => {
            heroBtn.textContent = 'Copy';
            heroBtn.style.background = '';
            heroBtn.style.color = '';
          }, 2000);
        });
      });
    }

    const copyButtons = document.querySelectorAll('.copy-code-btn');
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-clipboard');
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
          const original = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.background = '#34D399';
          btn.style.color = '#000';
          setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        });
      });
    });
  }

  // =========================================================================
  // 3. INTERACTIVE DESIGN STYLE SHOWCASE
  // =========================================================================
  function initStyleShowcase() {
    const styleData = {
      luxury: {
        title: 'Luxury Editorial',
        tagline: '"Prestige Whispers Through Restraint."',
        desc: 'Inspired by Swiss haute horlogerie and editorial monographs. High contrast, generous whitespace, warm off-white serifs, and micro-bead blasted titanium surfaces with 0.5px hairline accents.',
        tokens: ['Font: Cinzel Serif + Plus Jakarta', 'Background: Obsidian #08090D', 'Surface: Matte Slate #12141C', 'Accent: Champagne #D4AF37'],
        renderHtml: `
          <div style="font-family: 'Cinzel', serif; letter-spacing: 0.1em; color: #D4AF37; font-size: 0.8rem; margin-bottom: 0.5rem;">BESPOKE HOROLOGY // 24 PIECES</div>
          <h4 style="font-family: 'Cinzel', serif; font-size: 1.4rem; color: #fff; margin-bottom: 0.75rem;">The Monolith Tourbillon</h4>
          <p style="font-size: 0.88rem; color: #94A3B8; line-height: 1.6; margin-bottom: 1.2rem;">Coaxial escapement vibrating at 21,600 vph encased in micro-bead blasted Grade 5 titanium.</p>
          <div style="display: flex; gap: 1rem; font-family: monospace; font-size: 0.75rem; color: #64748B;">
            <span>Variance: ±1.2s</span> • <span>Power Reserve: 72h</span>
          </div>
        `
      },
      minimal: {
        title: 'Swiss International',
        tagline: '"Rational Clarity & Asymmetric Grids."',
        desc: 'Rooted in the 1950s modernist typographic tradition. Strict mathematical grids, left-aligned sans-serif hierarchy, zero decorative fluff, and deliberate functional hierarchy.',
        tokens: ['Font: Helvetica / Plus Jakarta Sans', 'Grid: 12-Column Asymmetric', 'Palette: Monochromatic #000 / #FFF', 'Rhythm: 8pt Hard Grid'],
        renderHtml: `
          <div style="font-family: monospace; font-size: 0.75rem; color: #38BDF8; margin-bottom: 0.5rem;">GRID INDEX // 08-B</div>
          <h4 style="font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem; letter-spacing: -0.04em;">International Typographic System</h4>
          <p style="font-size: 0.88rem; color: #94A3B8; line-height: 1.6; margin-bottom: 1.2rem;">Clarity of information achieved through disciplined reduction of visual variables.</p>
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.75rem; font-family: monospace; font-size: 0.75rem; color: #94A3B8;">
            Section 04 • Column Alignment: Strict Left
          </div>
        `
      },
      cinematic: {
        title: 'Cinematic Product',
        tagline: '"Dramatic Narrative Staging."',
        desc: 'Wide-screen 16:9 framing, scroll-synchronized product reveals, depth planes, and camera orbit choreography for flagship digital debuts.',
        tokens: ['Aspect: 16:9 Widescreen', 'Motion: Pinned Timeline Scrub', 'Lighting: Directional Edge Key', 'FPS: 60 FPS Smooth RAF'],
        renderHtml: `
          <div style="font-family: monospace; font-size: 0.75rem; color: #34D399; margin-bottom: 0.5rem;">CHAPTER 01 // ORBIT REVEAL</div>
          <h4 style="font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">Aether Apex Electric GT</h4>
          <p style="font-size: 0.88rem; color: #94A3B8; line-height: 1.6; margin-bottom: 1.2rem;">Scroll-driven camera movement revealing aerodynamic contours and spatial carbon monocoque.</p>
          <div style="display: flex; gap: 0.75rem;">
            <span style="background: rgba(255,255,255,0.06); padding: 0.3rem 0.6rem; border-radius: 4px; font-family: monospace; font-size: 0.72rem; color: #fff;">0-100 km/h: 1.84s</span>
            <span style="background: rgba(255,255,255,0.06); padding: 0.3rem 0.6rem; border-radius: 4px; font-family: monospace; font-size: 0.72rem; color: #fff;">Dual Motor AWD</span>
          </div>
        `
      },
      bento: {
        title: 'Experimental Bento',
        tagline: '"Adaptive Information Density."',
        desc: 'Modular cards organized into visual hierarchies using modern CSS Grid and Container Queries. Perfect for dense SaaS features and creative portfolios.',
        tokens: ['Layout: Asymmetric CSS Grid', 'Radius: 16px Damped', 'Elevation: 2-Tier Ambient Shadow', 'Queries: Container Size Driven'],
        renderHtml: `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div style="background: rgba(255,255,255,0.04); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="font-size: 0.75rem; color: #38BDF8; font-family: monospace;">TELEMETRY</div>
              <div style="font-size: 1.2rem; font-weight: 700; color: #fff; margin: 0.2rem 0;">4.8 TB/s</div>
              <div style="font-size: 0.72rem; color: #64748B;">Cluster Throughput</div>
            </div>
            <div style="background: rgba(255,255,255,0.04); padding: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <div style="font-size: 0.75rem; color: #34D399; font-family: monospace;">LATENCY</div>
              <div style="font-size: 1.2rem; font-weight: 700; color: #fff; margin: 0.2rem 0;">1.2 ms</div>
              <div style="font-size: 0.72rem; color: #64748B;">Global Edge Sync</div>
            </div>
          </div>
        `
      },
      telemetry: {
        title: 'Obsidian Telemetry',
        tagline: '"Mission-Critical Data Ergonomics."',
        desc: 'Obsidian black surfaces with high-contrast emerald and ice-cyan indicators. Built for real-time dashboards, financial systems, and infrastructure tools.',
        tokens: ['Theme: Deep Obsidian #050608', 'Status: Live Pulse Indicator', 'Contrast: WCAG AAA 14:1', 'Charts: Canvas Accelerated'],
        renderHtml: `
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
            <span style="font-family: monospace; font-size: 0.75rem; color: #34D399;">● NODE_STATUS: OPERATIONAL</span>
            <span style="font-family: monospace; font-size: 0.72rem; color: #64748B;">REGION: EU-WEST-1</span>
          </div>
          <div style="font-family: monospace; font-size: 0.8rem; color: #E2E8F0; line-height: 1.6;">
            [00:12:44] GPU_ENGINE: 512 Cores Allocated<br>
            [00:12:45] MEM_PRESSURE: 18.4% (Nominal)<br>
            [00:12:46] INGRESS_BURST: Handled via Anycast
          </div>
        `
      },
      glass: {
        title: 'Refined Liquid Glass',
        tagline: '"Physically Believable Optics."',
        desc: 'Restrained frosted glass surfaces without oversaturated neon bloom. 20px blur, 140% saturation compensation, and delicate 0.5px hairline specular highlights.',
        tokens: ['Filter: blur(20px) saturate(140%)', 'Borders: 0.5px Hairline Specular', 'Sheen: Dynamic Pointer Sheen', 'Bloom: Zero Fake Glow'],
        renderHtml: `
          <div style="background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 1.5rem; box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18);">
            <div style="font-family: monospace; font-size: 0.75rem; color: #D4AF37; margin-bottom: 0.4rem;">OPTICAL DEPTH // LEVEL 02</div>
            <div style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Precision-Milled Glass HUD</div>
            <p style="font-size: 0.85rem; color: #94A3B8; margin-bottom: 0;">Maintains 95% text contrast with subtle ambient refraction and zero decorative neon noise.</p>
          </div>
        `
      }
    };

    const container = document.getElementById('style-preview-body');
    const tabs = document.querySelectorAll('.style-tab');

    function renderStyle(key) {
      const data = styleData[key] || styleData.luxury;
      if (!container) return;

      container.innerHTML = `
        <div class="style-meta-pane">
          <h3>${data.title}</h3>
          <div class="style-tagline">${data.tagline}</div>
          <p>${data.desc}</p>
          <div class="style-tokens-list">
            ${data.tokens.map((t) => `<span>• ${t}</span>`).join('')}
          </div>
        </div>
        <div class="style-render-pane">
          ${data.renderHtml}
        </div>
      `;
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const styleKey = tab.getAttribute('data-style');
        renderStyle(styleKey);
      });
    });

    renderStyle('luxury');
  }

  // =========================================================================
  // 4. INSTALLATION TABS
  // =========================================================================
  function initInstallationTabs() {
    const tabs = document.querySelectorAll('.install-tab');
    const contents = document.querySelectorAll('.install-tab-content');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        contents.forEach((c) => c.classList.remove('active'));

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const tabKey = tab.getAttribute('data-tab');
        const targetContent = document.getElementById(`tab-${tabKey}`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // =========================================================================
  // 5. ACCESSIBLE FAQ ACCORDION
  // =========================================================================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');

      if (!trigger || !content) return;

      // Initialize first item open
      if (trigger.getAttribute('aria-expanded') === 'true') {
        item.classList.add('open');
        content.style.maxHeight = `${content.scrollHeight + 30}px`;
      }

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close other items
        faqItems.forEach((other) => {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
            const otherTrig = other.querySelector('.faq-trigger');
            const otherCont = other.querySelector('.faq-content');
            if (otherTrig) otherTrig.setAttribute('aria-expanded', 'false');
            if (otherCont) otherCont.style.maxHeight = '0px';
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = '0px';
        } else {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = `${content.scrollHeight + 30}px`;
        }
      });
    });
  }

  // =========================================================================
  // 6. MOBILE NAVIGATION DRAWER TOGGLE
  // =========================================================================
  function initMobileNav() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.contains('open');
      menu.classList.toggle('open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close on link click
    const links = menu.querySelectorAll('.mob-link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  console.log('[Creative Web Architect] Official product website online. Created by Anas Hashim.');
})();
