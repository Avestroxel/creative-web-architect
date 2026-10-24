# Scroll-Synchronized Multidirectional Flora Parallax & Active Viewport Theme Triage

## Architectural Philosophy
Transforms static background imagery into a multi-layered botanical diorama where foreground and midground botanical cutouts drift at decoupled vertical velocities and rotate slightly around biological stems as the viewport scrolls. Concurrently, persistent interface chrome (navigation bars, accreditation badges) actively samples the intersecting section background to toggle dark/light contrast modes smoothly.

## 1. Decoupled Velocity & Continuous Stem Rotation
Each decorative element declares its relative scroll velocity multiplier `data-speed` and rotation amplitude `data-rot`:
```html
<img class="flower flower--cosmos" data-speed="-0.25" data-rot="8" src="...">
<img class="flower flower--hang" data-speed="0.35" data-rot="-6" src="...">
```

On every scroll event (passive listener, zero layout thrashing):
```javascript
const p = -section.getBoundingClientRect().top / window.innerHeight;
const translateY = p * speed * window.innerHeight;
const rotation = p * rot;
el.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) rotate(${rotation.toFixed(2)}deg)`;
```

## 2. Dynamic Viewport Intersection Theme Triage
Fixed navigation elements must maintain accessibility across alternating light/dark editorial sections without flash-of-unstyled-color:
```javascript
function updateNavTheme() {
  const probeY = window.innerHeight * 0.06;
  const sections = document.querySelectorAll('main > section');
  
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom >= probeY) {
      const isDark = section.getAttribute('data-theme') === 'dark';
      document.body.classList.toggle('on-dark', isDark);
      break;
    }
  }
}
```

```css
.nav, .badge {
  transition: color 0.5s ease;
}
body.on-dark .nav,
body.on-dark .badge {
  color: #FFFFFF;
}
body.on-dark .badge b {
  color: #D9CCFF;
}
```

## 3. Staggered Mask Line Reveals
Editorial typography emerges from clean overflow clipping masks:
```css
.hero h1 .line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.06em;
}
.hero h1 .line span {
  display: inline-block;
  transform: translateY(110%);
}
.loaded .hero h1 .line span {
  animation: rise 1.1s cubic-bezier(0.2, 0.8, 0.15, 1) forwards;
}
.hero h1 .line:nth-child(2) span {
  animation-delay: 0.12s;
}
@keyframes rise {
  to { transform: translateY(0); }
}
```
