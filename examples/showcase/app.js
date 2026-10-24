/**
 * Creative Web Architect — Official Website Logic
 * Features:
 *  1. Lenis Butter-Smooth Scrolling Engine
 *  2. Page Entrance Fade-In Controller
 *  3. Scroll-Driven Soft Entrance Reveals (IntersectionObserver)
 *  4. Interactive 3D Dotted Matrix Background (Canvas 3D perspective tilt & wave)
 *  5. Multi-Platform CLI Installation Tabs (Global, Windows, macOS/Linux, in-place)
 *  6. 1-Click Clipboard Utilities with Visual Feedback
 *  7. Accessible FAQ Accordions & Mobile Navigation
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. All rights reserved.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initPageEntrance();
    initSmoothScroll();
    initScrollReveals();
    init3DDottedBackground();
    initClipboardButtons();
    initInstallationTabs();
    initFaqAccordion();
    initMobileNav();
  });

  // =========================================================================
  // 1. PAGE ENTRANCE FADE-IN
  // =========================================================================
  function initPageEntrance() {
    // Reveal page gracefully
    requestAnimationFrame(() => {
      document.body.classList.add('page-loaded');
    });
  }

  // =========================================================================
  // 2. LENIS BUTTER-SMOOTH SCROLLING ENGINE
  // =========================================================================
  function initSmoothScroll() {
    // Respect user motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (typeof window.Lenis !== 'undefined') {
      try {
        const lenis = new window.Lenis({
          duration: 1.25,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Connect anchor links to Lenis smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
              const targetEl = document.querySelector(targetId);
              if (targetEl) {
                e.preventDefault();
                lenis.scrollTo(targetEl, { offset: -60 });
              }
            }
          });
        });
      } catch (err) {
        console.warn('Lenis smooth scroll fallback:', err);
      }
    }
  }

  // =========================================================================
  // 3. SCROLL-DRIVEN SOFT ENTRANCE REVEALS (INTERSECTION OBSERVER)
  // =========================================================================
  function initScrollReveals() {
    const revealItems = document.querySelectorAll('.reveal-item');
    if (!revealItems.length) return;

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve after reveal to save cycles
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealItems.forEach((el) => observer.observe(el));
  }

  // =========================================================================
  // 4. INTERACTIVE 3D DOTTED MATRIX BACKGROUND (CANVAS PERSPECTIVE TILT)
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

    // Generate 3D grid of matrix points (48 cols x 32 rows)
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

      // Smooth lerp toward mouse targets
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;
      currentPanX += (targetPanX - currentPanX) * 0.05;
      currentPanY += (targetPanY - currentPanY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const fov = 420;
      const cameraZ = -380;
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      // Render each point in 3D projection
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Wave elevation formula
        const wave =
          Math.sin(p.gx * 0.22 + time * 1.4) * 16 +
          Math.cos(p.gz * 0.24 + time * 1.1) * 16;
        const py = p.baseY + wave;

        // 3D Rotation Y (yaw)
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // 3D Rotation X (pitch)
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        // Depth offset from camera
        const depth = z2 - cameraZ;
        if (depth <= 20) continue; // Behind or clipping camera

        // Perspective division
        const scale = fov / depth;
        const projX = width / 2 + currentPanX + x1 * scale;
        const projY = height / 2 + currentPanY + y2 * scale;

        // Skip offscreen points
        if (projX < -20 || projX > width + 20 || projY < -20 || projY > height + 20) {
          continue;
        }

        // Distance fog / depth alpha
        const alpha = Math.max(0.04, Math.min(0.65, 1 - depth / 1350));
        const radius = Math.max(0.75, Math.min(2.8, scale * 1.7));

        ctx.beginPath();
        ctx.arc(projX, projY, radius, 0, Math.PI * 2);

        // Highlight center rows with subtle accent cyan
        if (p.gx % 12 === 0 && p.gz % 8 === 0) {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.95})`;
        } else {
          ctx.fillStyle = `rgba(200, 215, 235, ${alpha * 0.45})`;
        }
        ctx.fill();
      }

      requestAnimationFrame(render);
    }

    render();
  }

  // =========================================================================
  // 5. 1-CLICK CLIPBOARD UTILITIES
  // =========================================================================
  function initClipboardButtons() {
    // Target ID based button
    const heroBtn = document.getElementById('copy-btn-hero');
    if (heroBtn) {
      heroBtn.addEventListener('click', () => {
        const cmdEl = document.getElementById('cli-cmd-hero');
        if (cmdEl) {
          copyTextToClipboard(cmdEl.innerText.trim(), heroBtn);
        }
      });
    }

    // Direct clipboard attribute based buttons
    document.querySelectorAll('.copy-code-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const text = this.getAttribute('data-clipboard');
        if (text) {
          copyTextToClipboard(text, this);
        }
      });
    });
  }

  function copyTextToClipboard(text, buttonEl) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback(buttonEl);
      });
    } else {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showCopyFeedback(buttonEl);
    }
  }

  function showCopyFeedback(buttonEl) {
    const originalText = buttonEl.innerText;
    buttonEl.innerText = 'Copied!';
    buttonEl.style.borderColor = 'var(--accent-emerald)';
    buttonEl.style.color = 'var(--accent-emerald)';

    setTimeout(() => {
      buttonEl.innerText = originalText;
      buttonEl.style.borderColor = '';
      buttonEl.style.color = '';
    }, 1800);
  }

  // =========================================================================
  // 6. MULTI-PLATFORM INSTALLATION TABS
  // =========================================================================
  function initInstallationTabs() {
    const tabs = document.querySelectorAll('.install-tab');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');

        // Update active tab buttons
        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Update active content panels
        document.querySelectorAll('.install-tab-content').forEach((panel) => {
          panel.classList.remove('active');
        });
        const activePanel = document.getElementById(`tab-${targetTab}`);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  }

  // =========================================================================
  // 7. ACCESSIBLE FAQ ACCORDION
  // =========================================================================
  function initFaqAccordion() {
    const triggers = document.querySelectorAll('.faq-trigger');

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Close other items
        triggers.forEach((other) => {
          if (other !== trigger) {
            other.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        trigger.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      });
    });
  }

  // =========================================================================
  // 8. MOBILE NAVIGATION DRAWER
  // =========================================================================
  function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!toggleBtn || !mobileMenu) return;

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('.mob-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
