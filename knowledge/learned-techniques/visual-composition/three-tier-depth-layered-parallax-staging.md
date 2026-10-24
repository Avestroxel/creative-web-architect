# Three-Tier Depth-Layered Parallax Staging & Asynchronous Bubble Kinematics

## Architectural Philosophy
Creates immersive, volumetric product staging without full WebGL scene overhead. By strategically interleaving 3D Web Components, 2D vector typography, glassmorphism chrome, and rising particle generators across discrete Z-index elevation planes, the interface achieves theater-like stage depth.

## 1. Multi-Tier Parallax Multipliers
Different spatial tiers move in counter-directional or accelerated ratios to cursor coordinates:
```javascript
// Foreground berries: High sensitivity (+60px)
berriesFG.style.transform = `translate(${currentMouse.x * 60}px, ${currentMouse.y * 60}px)`;

// Background berries: Inverted mid-depth (-30px)
berriesBG.style.transform = `translate(${currentMouse.x * -30}px, ${currentMouse.y * -30}px)`;

// Far leaves: Inverted deep horizon (-15px)
leavesBG.style.transform = `translate(${currentMouse.x * -15}px, ${currentMouse.y * -15}px)`;
```

## 2. Elevation Layering Blueprint
```text
Z-INDEX 110: Foreground Interactive Berries (overlap text & can)
Z-INDEX 100: Hero Typography, Glass Header, Flavor Cards
Z-INDEX  50: Center Product Can (Google <model-viewer>)
Z-INDEX   1: Hero Center Radial Sheen
Z-INDEX   0: Background Berries & Rising Bubbles
Z-INDEX  -1: Far Background Foliage
```

This strict sandwich ensures the 3D product feels physically immersed *inside* the environment rather than pasted *behind* the text.

## 3. Asynchronous Self-Cleaning Bubble Spawner
A non-blocking lightweight particle system spawning rising translucent bubbles:
```javascript
function createBubble() {
  const bubble = document.createElement('img');
  bubble.src = BUBBLE_PNG;
  bubble.className = 'bubble-img';
  
  const size = Math.random() * 20 + 10;
  bubble.style.width = `${size}px`;
  bubble.style.height = 'auto';
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.bottom = '-50px';
  bubble.style.opacity = Math.random() * 0.4 + 0.2;

  const duration = Math.random() * 6 + 4;
  bubble.style.animation = `floatUpImg ${duration}s linear forwards`;

  bubblesContainer.appendChild(bubble);
  // Self-cleaning timer preventing DOM node bloat
  setTimeout(() => bubble.remove(), duration * 1000);
}

setInterval(createBubble, 400);
```

```css
@keyframes floatUpImg {
  0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
  10%  { opacity: 0.4; }
  90%  { opacity: 0.4; }
  100% { transform: translateY(-110vh) translateX(30px) rotate(360deg); opacity: 0; }
}
```
