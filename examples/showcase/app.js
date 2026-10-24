/**
 * Creative Web Architect — Official Website Logic
 * Features:
 *  1. Interactive 3D Dotted Matrix Background (Canvas 3D perspective tilt & wave)
 *  2. Multi-Platform CLI Installation Tabs (Windows, pnpm, macOS/Linux, in-place)
 *  3. 27 Learned Architectural Techniques Filter & Explorer
 *  4. 1-Click Clipboard Utilities
 *  5. Design Styles Interactive Showcase
 *  6. Accessible FAQ Accordions & Mobile Navigation
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. All rights reserved.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    init3DDottedBackground();
    initClipboardButtons();
    initInstallationTabs();
    initTechniquesFilter();
    initStyleShowcase();
    initFaqAccordion();
    initMobileNav();
  });

  // =========================================================================
  // 1. INTERACTIVE 3D DOTTED MATRIX BACKGROUND (CANVAS PERSPECTIVE TILT)
  // =========================================================================
  function init3DDottedBackground() {
    const canvas = document.getElementById('canvas-dots-3d');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // High-DPI sharp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    // Generate 3D grid of matrix points (50 columns x 32 rows)
    const cols = 48;
    const rows = 32;
    const spacingX = 64;
    const spacingZ = 64;
    const startX = -((cols - 1) * spacingX) / 2;
    const startZ = -((rows - 1) * spacingZ) / 2 + 250;

    const points = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push({
          x: startX + c * spacingX,
          baseY: 130, // Elevation relative to camera
          z: startZ + r * spacingZ,
          gx: c,
          gz: r,
        });
      }
    }

    // Mouse tracking with smooth inertial damping
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetRotX = 0.38;
    let targetRotY = 0.0;
    let currentRotX = 0.38;
    let currentRotY = 0.0;
    let targetPanX = 0;
    let targetPanY = 0;
    let currentPanX = 0;
    let currentPanY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const nx = (mouseX / width) * 2 - 1; // -1 to +1
      const ny = (mouseY / height) * 2 - 1; // -1 to +1

      targetRotY = nx * 0.42; // Yaw rotation
      targetRotX = 0.38 + ny * 0.25; // Pitch rotation
      targetPanX = -nx * 50;
      targetPanY = -ny * 30;
    });

    let time = 0;

    function render() {
      time += 0.016;

      // Inertial interpolation (Lerp)
      currentRotX += (targetRotX - currentRotX) * 0.045;
      currentRotY += (targetRotY - currentRotY) * 0.045;
      currentPanX += (targetPanX - currentPanX) * 0.045;
      currentPanY += (targetPanY - currentPanY) * 0.045;

      ctx.clearRect(0, 0, width, height);

      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);

      const fov = 750;
      const cx = width / 2 + currentPanX;
      const cy = height * 0.54 + currentPanY;

      const projected = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        // Organic 3D wave undulation
        const wave = Math.sin(time * 1.3 + p.gx * 0.15 + p.gz * 0.12) * 30
                   + Math.cos(time * 0.8 + p.gx * 0.08 - p.gz * 0.09) * 16;
        const py = p.baseY + wave;

        // 3D Rotation Matrix: Yaw (Y) then Pitch (X)
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX + 850; // Camera Z offset

        if (z2 > 50) {
          const scale = fov / z2;
          const sx = cx + x1 * scale;
          const sy = cy + y2 * scale;

          // Interactive mouse proximity in 2D projected space
          const dx = sx - mouseX;
          const dy = sy - mouseY;
          const dist = Math.hypot(dx, dy);
          let highlight = 0;
          let repelX = 0;
          let repelY = 0;

          if (dist < 135) {
            const prox = 1 - dist / 135;
            highlight = prox;
            repelX = (dx / (dist || 1)) * prox * 15;
            repelY = (dy / (dist || 1)) * prox * 15;
          }

          projected.push({
            sx: sx + repelX,
            sy: sy + repelY,
            scale,
            z: z2,
            highlight,
          });
        }
      }

      // Sort by depth (painters algorithm)
      projected.sort((a, b) => b.z - a.z);

      // Render dots
      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        const baseAlpha = Math.max(0.06, Math.min(0.65, 1.0 - (pt.z - 350) / 1600));
        const radius = Math.max(0.7, (1.8 + pt.highlight * 2.2) * pt.scale);

        if (pt.highlight > 0) {
          // Highlighted dot near mouse (Champagne gold)
          const alpha = Math.min(1.0, baseAlpha + pt.highlight * 0.65);
          ctx.fillStyle = `rgba(212, 175, 55, ${alpha.toFixed(3)})`;
        } else {
          // Ambient dot (Platinum off-white)
          ctx.fillStyle = `rgba(226, 232, 240, ${baseAlpha.toFixed(3)})`;
        }

        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  // =========================================================================
  // 2. CLIPBOARD UTILITIES
  // =========================================================================
  function initClipboardButtons() {
    const copyButtons = document.querySelectorAll('.copy-code-btn, .copy-trigger-btn');
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        let textToCopy = btn.getAttribute('data-clipboard');
        if (!textToCopy) {
          const targetId = btn.getAttribute('data-target');
          if (targetId) {
            const el = document.getElementById(targetId);
            if (el) textToCopy = el.textContent.trim();
          }
        }

        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
          const original = btn.textContent;
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }

  // =========================================================================
  // 3. MULTI-PLATFORM INSTALLATION TABS
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
  // 4. 27 LEARNED ARCHITECTURAL TECHNIQUES FILTER
  // =========================================================================
  function initTechniquesFilter() {
    const filterBtns = document.querySelectorAll('.tech-filter-btn');
    const cards = document.querySelectorAll('.technique-card');

    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || 'all';

        cards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // =========================================================================
  // 5. INTERACTIVE DESIGN STYLE SHOWCASE
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
  // 6. ACCESSIBLE FAQ ACCORDION
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
  // 7. MOBILE NAVIGATION DRAWER TOGGLE
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

    const links = menu.querySelectorAll('.mob-link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  console.log('[Creative Web Architect] Official website online. 3D Dot Matrix background initialized. Created by Anas Hashim.');
})();
