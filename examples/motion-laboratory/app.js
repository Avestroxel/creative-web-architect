/**
 * Creative Web Architect - Motion Design Laboratory
 * Interactive physics, magnetic attraction, directional hover, fluid segmented tabs,
 * refined liquid glass tilt, and scroll choreography.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. LIVE FPS & FRAME TELEMETRY
  // =========================================================================
  const fpsDisplay = document.getElementById('live-fps');
  let frameCount = 0;
  let lastTime = performance.now();
  let currentFps = 60.0;

  function updateFPS(now) {
    frameCount++;
    const delta = now - lastTime;
    if (delta >= 500) {
      currentFps = (frameCount * 1000) / delta;
      if (fpsDisplay) {
        fpsDisplay.textContent = currentFps.toFixed(1);
        if (currentFps >= 55) {
          fpsDisplay.style.color = '#34d399'; // subtle emerald
        } else if (currentFps >= 30) {
          fpsDisplay.style.color = '#fbbf24'; // amber
        } else {
          fpsDisplay.style.color = '#f87171'; // soft coral
        }
      }
      frameCount = 0;
      lastTime = now;
    }
    requestAnimationFrame(updateFPS);
  }
  requestAnimationFrame(updateFPS);

  // =========================================================================
  // 2. REDUCED MOTION SIMULATION TOGGLE
  // =========================================================================
  const reducedMotionToggle = document.getElementById('simulate-reduced-motion');
  if (reducedMotionToggle) {
    reducedMotionToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('reduced-motion-active');
      } else {
        document.body.classList.remove('reduced-motion-active');
      }
    });
  }

  // =========================================================================
  // 3. DEMO B: SUBTLE MAGNETIC BUTTON
  // =========================================================================
  const magneticBtn = document.getElementById('magnetic-demo-btn');
  if (magneticBtn) {
    const parentStage = magneticBtn.closest('.button-stage') || magneticBtn.parentElement;
    const magneticStrength = 0.28;
    const magneticRadius = 140;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovered = false;
    let animId = null;

    function renderSpring() {
      // Damped spring interpolation: 0.14
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      magneticBtn.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05 || isHovered) {
        animId = requestAnimationFrame(renderSpring);
      } else {
        magneticBtn.style.transform = 'translate3d(0, 0, 0)';
        animId = null;
      }
    }

    parentStage.addEventListener('mousemove', (e) => {
      if (document.body.classList.contains('reduced-motion-active')) return;
      const rect = magneticBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < magneticRadius) {
        isHovered = true;
        targetX = distX * magneticStrength;
        targetY = distY * magneticStrength;
        if (!animId) {
          animId = requestAnimationFrame(renderSpring);
        }
      } else if (isHovered) {
        isHovered = false;
        targetX = 0;
        targetY = 0;
      }
    });

    parentStage.addEventListener('mouseleave', () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
    });
  }

  // =========================================================================
  // 4. DEMO B: DIRECTION-AWARE HOVER REVEAL
  // =========================================================================
  const directionalBtn = document.getElementById('directional-demo-btn');
  const directionReadout = document.getElementById('direction-readout');

  if (directionalBtn) {
    const fill = directionalBtn.querySelector('.direction-fill');

    function getDirection(e, element) {
      const rect = element.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const x = (e.clientX - rect.left - (w / 2)) * (w > h ? (h / w) : 1);
      const y = (e.clientY - rect.top - (h / 2)) * (h > w ? (w / h) : 1);
      // 0: top, 1: right, 2: bottom, 3: left
      return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    }

    const directionNames = ['TOP', 'RIGHT', 'BOTTOM', 'LEFT'];

    directionalBtn.addEventListener('mouseenter', (e) => {
      const dirIndex = getDirection(e, directionalBtn);
      const dirName = directionNames[dirIndex];

      if (directionReadout) {
        directionReadout.textContent = `Entered from: ${dirName}`;
        directionReadout.style.color = '#e2e8f0';
      }

      if (!fill) return;

      // Set initial position off-element based on direction
      fill.style.transition = 'none';
      if (dirIndex === 0) fill.style.transform = 'translate3d(0, -100%, 0)';
      if (dirIndex === 1) fill.style.transform = 'translate3d(100%, 0, 0)';
      if (dirIndex === 2) fill.style.transform = 'translate3d(0, 100%, 0)';
      if (dirIndex === 3) fill.style.transform = 'translate3d(-100%, 0, 0)';

      // Trigger transition to center
      requestAnimationFrame(() => {
        fill.style.transition = 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)';
        fill.style.transform = 'translate3d(0, 0, 0)';
      });
    });

    directionalBtn.addEventListener('mouseleave', (e) => {
      const dirIndex = getDirection(e, directionalBtn);
      const dirName = directionNames[dirIndex];

      if (directionReadout) {
        directionReadout.textContent = `Exited toward: ${dirName}`;
        directionReadout.style.color = '#94a3b8';
      }

      if (!fill) return;

      fill.style.transition = 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1)';
      if (dirIndex === 0) fill.style.transform = 'translate3d(0, -100%, 0)';
      if (dirIndex === 1) fill.style.transform = 'translate3d(100%, 0, 0)';
      if (dirIndex === 2) fill.style.transform = 'translate3d(0, 100%, 0)';
      if (dirIndex === 3) fill.style.transform = 'translate3d(-100%, 0, 0)';
    });
  }

  // =========================================================================
  // 5. DEMO B: STATE MORPHING BUTTON (IDLE -> LOADING -> SUCCESS -> RESET)
  // =========================================================================
  const morphBtn = document.getElementById('morph-demo-btn');
  if (morphBtn) {
    let morphState = 'idle';

    morphBtn.addEventListener('click', () => {
      if (morphState !== 'idle') return;

      morphState = 'loading';
      morphBtn.classList.add('loading');
      morphBtn.setAttribute('aria-busy', 'true');
      morphBtn.innerHTML = `
        <span class="inline-spinner" aria-hidden="true"></span>
        <span class="morph-label">Authorizing Escrow...</span>
      `;

      setTimeout(() => {
        morphState = 'success';
        morphBtn.classList.remove('loading');
        morphBtn.classList.add('success');
        morphBtn.setAttribute('aria-busy', 'false');
        morphBtn.innerHTML = `
          <span class="check-glyph" aria-hidden="true">✓</span>
          <span class="morph-label">Transfer Completed</span>
        `;

        setTimeout(() => {
          morphState = 'idle';
          morphBtn.classList.remove('success');
          morphBtn.innerHTML = `<span class="morph-label">Confirm Wire Transfer</span>`;
        }, 2200);
      }, 1600);
    });
  }

  // =========================================================================
  // 6. DEMO C: TACTILE SPRING SWITCHES
  // =========================================================================
  const switches = document.querySelectorAll('.interactive-switch');
  switches.forEach((sw) => {
    function toggleSwitch() {
      const isChecked = sw.getAttribute('aria-checked') === 'true';
      const newState = !isChecked;
      sw.setAttribute('aria-checked', String(newState));
      sw.classList.toggle('active', newState);
    }

    sw.addEventListener('click', toggleSwitch);
    sw.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleSwitch();
      }
    });
  });

  // =========================================================================
  // 7. DEMO C: FLUID SEGMENTED CONTROL
  // =========================================================================
  const segmentedWrap = document.getElementById('demo-segmented');
  const segmentedPill = document.getElementById('segmented-pill');
  const segmentStatus = document.getElementById('segment-status');

  if (segmentedWrap && segmentedPill) {
    const buttons = segmentedWrap.querySelectorAll('.segment-btn');

    function positionPill(targetBtn) {
      const wrapRect = segmentedWrap.getBoundingClientRect();
      const btnRect = targetBtn.getBoundingClientRect();
      const offsetLeft = btnRect.left - wrapRect.left;

      segmentedPill.style.width = `${btnRect.width}px`;
      segmentedPill.style.transform = `translate3d(${offsetLeft}px, 0, 0)`;
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        positionPill(btn);

        if (segmentStatus) {
          segmentStatus.textContent = `Current Active View: ${btn.textContent.trim()}`;
        }
      });
    });

    // Keyboard Arrow navigation
    segmentedWrap.addEventListener('keydown', (e) => {
      const activeBtn = segmentedWrap.querySelector('.segment-btn.active');
      let currentIndex = Array.from(buttons).indexOf(activeBtn);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % buttons.length;
        buttons[nextIndex].click();
        buttons[nextIndex].focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        buttons[prevIndex].click();
        buttons[prevIndex].focus();
      }
    });

    // Initialize pill position
    const initialActive = segmentedWrap.querySelector('.segment-btn.active') || buttons[0];
    if (initialActive) {
      setTimeout(() => positionPill(initialActive), 40);
      window.addEventListener('resize', () => {
        const currentActive = segmentedWrap.querySelector('.segment-btn.active');
        if (currentActive) positionPill(currentActive);
      });
    }
  }

  // =========================================================================
  // 8. DEMO C: TACTILE RANGE SLIDER
  // =========================================================================
  const slider = document.getElementById('demo-slider');
  const sliderReadout = document.getElementById('slider-readout');

  if (slider && sliderReadout) {
    function updateSlider() {
      const val = slider.value;
      sliderReadout.textContent = `${val}%`;
      const pct = ((val - slider.min) / (slider.max - slider.min)) * 100;
      slider.style.setProperty('--slider-fill', `${pct}%`);
    }

    slider.addEventListener('input', updateSlider);
    updateSlider();
  }

  // =========================================================================
  // 9. DEMO C: ZERO-THRASH ACCORDION
  // =========================================================================
  const accordionItem = document.getElementById('acc-item-1');
  if (accordionItem) {
    const trigger = accordionItem.querySelector('.accordion-trigger');
    const content = accordionItem.querySelector('.accordion-content');

    if (trigger && content) {
      // Set initial open height
      content.style.maxHeight = `${content.scrollHeight}px`;

      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          trigger.setAttribute('aria-expanded', 'false');
          accordionItem.classList.remove('open');
          content.style.maxHeight = '0px';
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          accordionItem.classList.add('open');
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      });
    }
  }

  // =========================================================================
  // 10. DEMO D: REFINED LIQUID GLASS 3D PERSPECTIVE TILT
  // =========================================================================
  const glassSpecimen = document.getElementById('glass-specimen');
  if (glassSpecimen) {
    const maxTilt = 6.0; // Restrained tilt angle in degrees

    glassSpecimen.addEventListener('mousemove', (e) => {
      if (document.body.classList.contains('reduced-motion-active')) return;
      const rect = glassSpecimen.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      const tiltX = -normY * maxTilt;
      const tiltY = normX * maxTilt;

      glassSpecimen.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      glassSpecimen.style.setProperty('--sheen-x', `${(x / rect.width * 100).toFixed(1)}%`);
      glassSpecimen.style.setProperty('--sheen-y', `${(y / rect.height * 100).toFixed(1)}%`);
    });

    glassSpecimen.addEventListener('mouseleave', () => {
      glassSpecimen.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      glassSpecimen.style.transition = 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)';
    });

    glassSpecimen.addEventListener('mouseenter', () => {
      glassSpecimen.style.transition = 'none';
    });
  }

  // =========================================================================
  // 11. DEMO A: SCROLL STORYTELLING CHAPTER CHOREOGRAPHY
  // =========================================================================
  const storyTrack = document.getElementById('story-track');
  const storyHeadline = document.getElementById('story-headline');
  const storyText = document.getElementById('story-text');
  const chapterLabel = document.getElementById('story-chapter-label');
  const progressBar = document.getElementById('story-progress-bar');

  const chapters = [
    {
      label: 'CHAPTER 01 // 03',
      headline: 'Chapter 1: The Geometry of Absence',
      text: 'Great creative engineering begins by stripping away the unnecessary. When we remove decorative neon glow, we make space for pure typographic hierarchy, physical materials, and intentional interaction.'
    },
    {
      label: 'CHAPTER 02 // 03',
      headline: 'Chapter 2: Kinematic Physics & Tactility',
      text: 'Physical interactions must have weight and inertia. A button should compress with intent; a toggle should snap like precision Swiss horology; transitions should glide with damped acceleration curves.'
    },
    {
      label: 'CHAPTER 03 // 03',
      headline: 'Chapter 3: The Architecture of Longevity',
      text: 'Trends of purple glows and blurry rainbow cards quickly fade. Enduring web experiences are built with timeless materials: obsidian surfaces, hairline precision, fluid typography, and 60 FPS frame budgets.'
    }
  ];

  let currentChapterIndex = 0;

  function updateStoryScroll() {
    if (!storyTrack) return;
    const rect = storyTrack.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Track scroll within the 220vh container
    const totalDist = rect.height - windowH;
    const currentScroll = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScroll / totalDist));

    if (progressBar) {
      progressBar.style.width = `${(progress * 100).toFixed(1)}%`;
    }

    // Determine active chapter (0, 1, or 2)
    let newIndex = 0;
    if (progress > 0.66) {
      newIndex = 2;
    } else if (progress > 0.33) {
      newIndex = 1;
    }

    if (newIndex !== currentChapterIndex && chapters[newIndex]) {
      currentChapterIndex = newIndex;
      const chapter = chapters[newIndex];

      if (storyHeadline && storyText && chapterLabel) {
        // Subtle opacity transition
        storyHeadline.style.opacity = '0';
        storyHeadline.style.transform = 'translate3d(0, 8px, 0)';
        storyText.style.opacity = '0';
        storyText.style.transform = 'translate3d(0, 8px, 0)';

        setTimeout(() => {
          chapterLabel.textContent = chapter.label;
          storyHeadline.textContent = chapter.headline;
          storyText.textContent = chapter.text;

          storyHeadline.style.opacity = '1';
          storyHeadline.style.transform = 'translate3d(0, 0, 0)';
          storyText.style.opacity = '1';
          storyText.style.transform = 'translate3d(0, 0, 0)';
        }, 140);
      }
    }
  }

  window.addEventListener('scroll', updateStoryScroll, { passive: true });
  updateStoryScroll();

  console.log('[CWA Motion Laboratory] Refined motion engines and interaction physics online.');
})();
