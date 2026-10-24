---
name: motion-design
description: Comprehensive motion system covering scroll-linked animations, parallax, page transitions, kinetic typography, magnetic interactions, GSAP integration, and reduced-motion fallbacks.
version: 0.1.0
tags: [animation, motion, scroll, gsap, transitions]
activationKeywords: [animation, motion, animate, scroll, parallax, transition, gsap, reveal]
---

# Motion Design System

## Purpose

Create a comprehensive, performance-conscious motion system. Motion should enhance storytelling and user experience — never distract from content.

## Motion Personalities

| Personality | Timing | Easing | Use Case |
|---|---|---|---|
| **Calm** | Slow (600-1000ms) | Gentle ease-out | Luxury, editorial, professional |
| **Energetic** | Quick (200-400ms) | Spring/bounce | Startups, gaming, youth brands |
| **Cinematic** | Variable (800-1500ms) | Custom bezier | Products, automotive, fashion |
| **Minimal** | Fast (150-250ms) | Linear/ease | Dashboards, tools, information |

## Scroll-Linked Animations

### CSS-Only Scroll Animations (Modern browsers)
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.reveal {
  animation: fadeInUp linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

### Intersection Observer Fallback
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### GSAP + ScrollTrigger
```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Section reveal
gsap.from('.section', {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play none none reverse',
  }
});

// Parallax
gsap.to('.parallax-bg', {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
});

// Pinned section
gsap.to('.horizontal-content', {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.horizontal-wrapper',
    pin: true,
    scrub: 1,
    end: () => '+=' + document.querySelector('.horizontal-content').offsetWidth,
  }
});
```

## Staggered Animations

```javascript
gsap.from('.grid-item', {
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: 'power3.out',
  stagger: {
    amount: 0.6,
    from: 'start',
  },
  scrollTrigger: {
    trigger: '.grid',
    start: 'top 80%',
  }
});
```

## Magnetic Interactions

```javascript
function magneticButton(element, strength = 0.3) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0, 0)';
    element.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
  });
  element.addEventListener('mouseenter', () => {
    element.style.transition = 'none';
  });
}
```

## Performance Rules

1. **Animate only `transform` and `opacity`** — avoid `width`, `height`, `top`, `left`
2. **Use `will-change` sparingly** — only on elements about to animate
3. **Clean up** — remove event listeners and kill GSAP timelines on unmount
4. **Limit concurrent animations** — maximum 10-15 animating elements visible at once
5. **Test FPS** — target 60fps on mid-range devices

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  initAnimations();
}
```

## Validation

✅ Animations enhance rather than distract
✅ All animations have reduced-motion fallback
✅ No layout-triggering properties are animated
✅ Cleanup functions prevent memory leaks
✅ 60fps on target devices
✅ Scroll direction reversal works smoothly
