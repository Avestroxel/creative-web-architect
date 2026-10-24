/**
 * Nebula.OS — Live Telemetry Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initThroughputChart();
  initNodesList();
  initEventStream();
  initCommandPalette();
  initDockNavigation();
});

/* Live Canvas Throughput Chart */
function initThroughputChart() {
  const canvas = document.getElementById('live-throughput-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 260;
  }
  resize();
  window.addEventListener('resize', resize);

  const maxPoints = 50;
  const seriesA = Array.from({ length: maxPoints }, (_, i) => 120 + Math.sin(i * 0.3) * 20 + Math.random() * 15);
  const seriesB = Array.from({ length: maxPoints }, (_, i) => 80 + Math.cos(i * 0.25) * 15 + Math.random() * 10);
  const seriesC = Array.from({ length: maxPoints }, (_, i) => 40 + Math.sin(i * 0.4) * 8 + Math.random() * 6);

  let currentRange = 'live';

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentRange = tab.getAttribute('data-range');
    });
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const padding = 20;
    const chartW = w - padding * 2;
    const chartH = h - padding * 2;

    // Draw horizontal grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(w - padding, y);
      ctx.stroke();
    }

    function drawLine(data, color, fillGrad) {
      ctx.beginPath();
      const step = chartW / (data.length - 1);

      data.forEach((val, idx) => {
        const x = padding + idx * step;
        const normalized = Math.max(0, Math.min(1, val / 180));
        const y = padding + chartH - normalized * chartH;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Area fill
      if (fillGrad) {
        const lastX = padding + (data.length - 1) * step;
        ctx.lineTo(lastX, padding + chartH);
        ctx.lineTo(padding, padding + chartH);
        ctx.closePath();
        ctx.fillStyle = fillGrad;
        ctx.fill();
      }
    }

    // Cyan gradient
    const gradCyan = ctx.createLinearGradient(0, 0, 0, h);
    gradCyan.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
    gradCyan.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    drawLine(seriesA, '#06B6D4', gradCyan);
    drawLine(seriesB, '#A855F7');
    drawLine(seriesC, '#F59E0B');

    // Update live data if on live tab
    if (currentRange === 'live') {
      const lastA = seriesA[seriesA.length - 1];
      const newA = Math.max(70, Math.min(170, lastA + (Math.random() - 0.5) * 12));
      seriesA.shift();
      seriesA.push(newA);

      const lastB = seriesB[seriesB.length - 1];
      const newB = Math.max(45, Math.min(120, lastB + (Math.random() - 0.5) * 8));
      seriesB.shift();
      seriesB.push(newB);

      const lastC = seriesC[seriesC.length - 1];
      const newC = Math.max(20, Math.min(65, lastC + (Math.random() - 0.5) * 5));
      seriesC.shift();
      seriesC.push(newC);
    }
  }

  setInterval(draw, 400);
}

/* Populate Cluster Nodes List */
function initNodesList() {
  const container = document.getElementById('nodes-container');
  if (!container) return;

  const nodes = [
    { name: 'nebula-node-01', type: '8x H100 SXM5', load: 94.2, temp: 54 },
    { name: 'nebula-node-02', type: '8x H100 SXM5', load: 88.7, temp: 51 },
    { name: 'nebula-node-03', type: '8x H100 SXM5', load: 96.0, temp: 56 },
    { name: 'nebula-node-04', type: '8x H100 SXM5', load: 79.4, temp: 48 },
    { name: 'nebula-node-05', type: '8x H100 SXM5', load: 92.1, temp: 53 },
    { name: 'nebula-node-06', type: '8x H100 SXM5', load: 85.3, temp: 49 },
  ];

  container.innerHTML = nodes.map(n => `
    <div class="node-item">
      <div class="node-info">
        <strong>${n.name}</strong>
        <span>${n.type}</span>
      </div>
      <div class="node-stat">
        <div class="stat-val">${n.load}%</div>
        <div class="stat-load">${n.temp}°C Thermal</div>
      </div>
    </div>
  `).join('');
}

/* Dynamic Event Stream */
function initEventStream() {
  const stream = document.getElementById('event-stream');
  const clearBtn = document.getElementById('clear-log-btn');
  if (!stream) return;

  const mockEvents = [
    { level: 'INFO', msg: 'Quantum speculative token prediction achieved 91.8% verification rate.' },
    { level: 'INFO', msg: 'Zero-redundancy optimizer distributed batch shard across nodes 01-04.' },
    { level: 'WARN', msg: 'Node-03 thermal threshold approached 56°C; liquid pump RPM adjusted +12%.' },
    { level: 'INFO', msg: 'Automated TLS 1.3 mTLS certificate rotation succeeded for all pod proxies.' },
    { level: 'ALERT', msg: 'Transient network spike on InfiniBand interface ib0 recovered in 1.4ms.' },
  ];

  function getTimestamp() {
    const d = new Date();
    return d.toTimeString().split(' ')[0] + '.' + String(d.getMilliseconds()).padStart(3, '0');
  }

  mockEvents.forEach(evt => {
    appendLog(evt.level, evt.msg, getTimestamp());
  });

  function appendLog(level, msg, time) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
      <span class="log-time">${time}</span>
      <span class="log-level ${level}">${level}</span>
      <span class="log-msg">${msg}</span>
    `;
    stream.prepend(entry);
    if (stream.children.length > 30) {
      stream.removeChild(stream.lastChild);
    }
  }

  // Add random incoming telemetry event
  setInterval(() => {
    const randomEvt = mockEvents[Math.floor(Math.random() * mockEvents.length)];
    appendLog(randomEvt.level, randomEvt.msg, getTimestamp());
  }, 4500);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      stream.innerHTML = '';
    });
  }
}

/* Command Palette (Cmd + K) */
function initCommandPalette() {
  const modal = document.getElementById('cmd-modal');
  const openBtn = document.getElementById('open-cmd-btn');
  const closeBtn = document.getElementById('cmd-close-btn');
  const input = document.getElementById('cmd-input');

  if (!modal) return;

  function open() {
    modal.removeAttribute('hidden');
    if (input) {
      input.value = '';
      input.focus();
    }
  }

  function close() {
    modal.setAttribute('hidden', '');
  }

  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.hasAttribute('hidden')) open();
      else close();
    } else if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      close();
    }
  });

  document.querySelectorAll('.cmd-result-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      alert(`Executing command: ${action}`);
      close();
    });
  });
}

/* Dock Navigation */
function initDockNavigation() {
  const dockItems = document.querySelectorAll('.dock-item');
  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      dockItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}
