---
name: scroll-storytelling
description: Cinematic scroll-driven storytelling with pinned sections, product sequences, horizontal scrolling, and synchronized content transitions.
version: 0.1.0
tags: [animation, scroll, storytelling, cinematic, gsap]
activationKeywords: [scroll storytelling, scroll sequence, cinematic, pinned, scrub]
dependencies: [motion-design]
---

# Scroll Storytelling

## Purpose

Create cinematic sequences where visual elements change in response to scroll progress, enabling product reveals, feature storytelling, and immersive narratives.

## Scroll Sequence Pattern

Example: Product reveal sequence

1. Product appears centered on screen (scroll 0%)
2. Product moves toward camera (scroll 10-30%)
3. Product rotates smoothly to show angles (scroll 30-50%)
4. Screen/features become prominent (scroll 50-60%)
5. Individual features appear with labels (scroll 60-75%)
6. Components separate — exploded view (scroll 75-85%)
7. Product reassembles (scroll 85-95%)
8. Scene transitions to next section (scroll 95-100%)

**Key requirement**: Scrolling backward must reverse the sequence naturally.

## Implementation with GSAP ScrollTrigger

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.product-sequence',
    start: 'top top',
    end: '+=4000',
    pin: true,
    scrub: 1,
    anticipatePin: 1,
  }
});

tl.to('.product', { scale: 1.5, duration: 1, ease: 'none' })
  .to('.product', { rotateY: 180, duration: 1, ease: 'none' })
  .from('.feature-1', { opacity: 0, x: -50, duration: 0.5 })
  .from('.feature-2', { opacity: 0, x: 50, duration: 0.5 })
  .to('.product', { scale: 1, rotateY: 360, duration: 1, ease: 'none' });
```

## Horizontal Scroll Section

```javascript
const panels = gsap.utils.toArray('.panel');
gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.horizontal-wrapper',
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => '+=' + document.querySelector('.horizontal-wrapper').scrollWidth,
  }
});
```

## Performance

- Use `scrub: 1` (not `true`) for smoother interpolation
- Keep pinned sections under 5000px scroll distance
- Minimize the number of simultaneous tweens
- Use `fastScrollEnd: true` for responsive feel
- Add `anticipatePin: 1` to prevent jump on pin

## Validation

✅ Sequence plays forward and backward smoothly
✅ No jumps or discontinuities
✅ Mobile alternative exists (vertical stack or simplified sequence)
✅ Performance is smooth (60fps during scrub)
✅ Content is accessible without scroll interaction
