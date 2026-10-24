/**
 * Aether Apex — Interactive Creative Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive 3D Canvas Wireframe
  const canvas = document.getElementById('hero-car-canvas');
  if (canvas) {
    initCarCanvas(canvas);
  }

  // 2. Telemetry Number Counters
  initNumberCounters();

  // 3. Bespoke Colorway Switcher
  initConfigurator();

  // 4. Electric Audio Simulation (Web Audio API)
  initAudioSynthesizer();

  // 5. Reservation Modal
  initModal();
});

/* Canvas 3D Wireframe Simulation */
function initCarCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let angleY = 0.4;
  let angleX = 0.15;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let accentColor = '#00F0FF';

  window.setCanvasAccent = (color) => {
    accentColor = color;
  };

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;
    angleY += deltaX * 0.005;
    angleX = Math.max(-0.2, Math.min(0.6, angleX + deltaY * 0.005));
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastMouseX;
    const deltaY = e.touches[0].clientY - lastMouseY;
    angleY += deltaX * 0.005;
    angleX = Math.max(-0.2, Math.min(0.6, angleX + deltaY * 0.005));
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
  });

  // Define 3D points of sleek aerodynamic car silhouette
  const vertices = [
    // Nose
    [0, -10, 240], [45, 0, 220], [-45, 0, 220], [0, 25, 230],
    // Front wheels area
    [75, -5, 140], [-75, -5, 140], [80, 30, 140], [-80, 30, 140],
    // Windshield
    [55, -45, 60], [-55, -45, 60], [40, -65, -30], [-40, -65, -30],
    // Roofline
    [38, -68, -100], [-38, -68, -100],
    // Rear fastback
    [65, -35, -200], [-65, -35, -200],
    // Rear tail
    [75, 10, -240], [-75, 10, -240], [0, 5, -245], [0, 35, -235],
    // Side skirts
    [85, 30, 0], [-85, 30, 0],
    [82, 30, -120], [-82, 30, -120],
  ];

  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 3],
    [1, 4], [2, 5], [4, 6], [5, 7],
    [0, 8], [0, 9], [8, 10], [9, 11],
    [10, 12], [11, 13], [12, 14], [13, 15],
    [14, 16], [15, 17], [16, 18], [17, 18], [18, 19],
    [4, 20], [5, 21], [20, 22], [21, 23],
    [22, 16], [23, 17],
    [8, 4], [9, 5], [10, 11], [12, 13], [14, 15]
  ];

  function project(p, cx, cy, fov = 450) {
    // Rotation Y
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const x1 = p[0] * cosY + p[2] * sinY;
    const z1 = -p[0] * sinY + p[2] * cosY;

    // Rotation X
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const y2 = p[1] * cosX - z1 * sinX;
    const z2 = p[1] * sinX + z1 * cosX + 600;

    const scale = fov / z2;
    return [cx + x1 * scale, cy + y2 * scale, z2];
  }

  function render() {
    if (!isDragging) {
      angleY += 0.003; // Gentle ambient rotation
    }

    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height * 0.48;

    // Render floor grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let r = -400; r <= 400; r += 80) {
      const p1 = project([r, 45, -350], cx, cy);
      const p2 = project([r, 45, 350], cx, cy);
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.stroke();
    }

    // Project points
    const proj = vertices.map(v => project(v, cx, cy));

    // Draw chassis lines
    ctx.strokeStyle = accentColor;
    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 10;
    ctx.lineWidth = 1.75;

    edges.forEach(([i, j]) => {
      const p1 = proj[i];
      const p2 = proj[j];
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.stroke();
    });

    // Draw vertex nodes
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowBlur = 4;
    proj.forEach(p => {
      ctx.beginPath();
      ctx.arc(p[0], p[1], 2, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* Number ticker animation */
function initNumberCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const duration = 1800;
          const startTime = performance.now();

          function updateNumber(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = target * easeProgress;
            counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current).toString();
            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              counter.textContent = isDecimal ? target.toFixed(2) : target.toString();
            }
          }
          requestAnimationFrame(updateNumber);
        });
      }
    });
  }, { threshold: 0.2 });

  const grid = document.querySelector('.telemetry-grid');
  if (grid) observer.observe(grid);
}

/* Configurator Swatches */
function initConfigurator() {
  const swatchButtons = document.querySelectorAll('.swatch-btn');
  const carBody = document.getElementById('car-body');
  const stageGlow = document.getElementById('stage-glow');
  const finishName = document.getElementById('finish-name');
  const finishSpec = document.getElementById('finish-spec');

  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const color = btn.getAttribute('data-color');
      const accent = btn.getAttribute('data-accent');
      const name = btn.getAttribute('data-name');
      const spec = btn.getAttribute('data-spec');

      if (carBody) carBody.style.background = color;
      if (stageGlow) stageGlow.style.background = `radial-gradient(circle at 50% 50%, ${accent}33, transparent 70%)`;
      if (finishName) finishName.textContent = name;
      if (finishSpec) finishSpec.textContent = spec;

      if (typeof window.setCanvasAccent === 'function') {
        window.setCanvasAccent(accent);
      }
    });
  });

  const wheelButtons = document.querySelectorAll('.wheel-opt');
  wheelButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      wheelButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* Synthesizer for Electric Hyper-Drive Propulsion */
function initAudioSynthesizer() {
  let audioCtx = null;
  const soundBtn = document.getElementById('sound-btn');
  const launchBtn = document.getElementById('play-drive-sound');
  let isSoundEnabled = true;

  function ensureAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playPropulsionSound(duration = 2.4, targetFreq = 480) {
    if (!isSoundEnabled) return;
    const ctx = ensureAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    subOsc.type = 'sine';

    const now = ctx.currentTime;

    // Start low, ramp frequency up
    osc.frequency.setValueAtTime(65, now);
    osc.frequency.exponentialRampToValueAtTime(targetFreq, now + duration * 0.75);
    osc.frequency.exponentialRampToValueAtTime(targetFreq * 0.8, now + duration);

    subOsc.frequency.setValueAtTime(32.5, now);
    subOsc.frequency.exponentialRampToValueAtTime(targetFreq * 0.5, now + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(2400, now + duration * 0.6);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + duration);
    subOsc.stop(now + duration);
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      soundBtn.querySelector('.sound-icon').textContent = isSoundEnabled ? '🔊' : '🔇';
      soundBtn.style.opacity = isSoundEnabled ? '1' : '0.5';
    });
  }

  if (launchBtn) {
    launchBtn.addEventListener('click', () => {
      playPropulsionSound(3.0, 620);
    });
  }
}

/* Modal Behavior */
function initModal() {
  const modal = document.getElementById('reserve-modal');
  const openBtn = document.getElementById('open-reserve-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const form = document.getElementById('reservation-form');
  const successMsg = document.getElementById('form-success');

  if (!modal || !openBtn) return;

  function openModal() {
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    openBtn.focus();
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      if (successMsg) successMsg.removeAttribute('hidden');
      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          form.style.display = '';
          form.reset();
          if (successMsg) successMsg.setAttribute('hidden', '');
        }, 300);
      }, 3500);
    });
  }
}
