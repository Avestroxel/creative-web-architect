---
name: visual-qa
description: Measurable visual quality assurance workflow covering design review, interaction testing, animation validation, performance profiling, accessibility checking, and cross-viewport testing.
version: 0.1.0
tags: [qa, testing, quality, review, validation]
activationKeywords: [review, check, validate, test, qa, quality, inspect]
dependencies: [accessibility, performance-optimization]
---

# Visual Quality Assurance

## Purpose

Implement a measurable quality assurance workflow. Inspect actual rendered output — never claim testing occurred unless the page was actually rendered.

## QA Workflow

### Phase 1 — Build Verification
1. ✅ TypeScript compiles without errors
2. ✅ No ESLint errors
3. ✅ Production build succeeds
4. ✅ No console errors at runtime

### Phase 2 — Visual Inspection
5. ✅ Capture screenshots at: 375px, 768px, 1024px, 1440px, 1920px
6. ✅ Check composition and visual hierarchy
7. ✅ Verify typography rendering
8. ✅ Confirm color consistency with design system
9. ✅ Check image quality and loading

### Phase 3 — Interaction Testing
10. ✅ Test all buttons and links
11. ✅ Verify form interactions
12. ✅ Check hover/focus states
13. ✅ Test navigation flow
14. ✅ Verify modal/popup behavior

### Phase 4 — Animation Validation
15. ✅ Scroll animations play correctly
16. ✅ Reverse scrolling works
17. ✅ No animation glitches or jumps
18. ✅ Reduced motion mode works
19. ✅ Animations don't block interaction

### Phase 5 — Performance
20. ✅ Run Lighthouse audit
21. ✅ Check Core Web Vitals
22. ✅ Profile animation frame rate
23. ✅ Verify no memory leaks

### Phase 6 — Accessibility
24. ✅ Keyboard-only navigation test
25. ✅ Screen reader test
26. ✅ Color contrast verification
27. ✅ Focus indicator visibility

## Quality Scorecard

Rate each dimension 1-10:

| Dimension | Score | Notes |
|---|---|---|
| Originality | /10 | How distinctive vs. generic? |
| Typography | /10 | Pairing, scale, readability? |
| Composition | /10 | Layout balance, hierarchy, rhythm? |
| Color Harmony | /10 | Palette consistency, contrast? |
| Brand Consistency | /10 | Does every element fit the concept? |
| Interaction Quality | /10 | Responsive, intuitive, satisfying? |
| Animation Smoothness | /10 | Fluid, purposeful, no jank? |
| Mobile Quality | /10 | Fully functional, not just shrunk? |
| Accessibility | /10 | Keyboard, contrast, screen reader? |
| Performance | /10 | Fast loading, smooth runtime? |

**Target**: Average score ≥ 7/10 with no dimension below 5/10.

## Reporting

Provide a concise quality report:

```
QUALITY REPORT
━━━━━━━━━━━━━━━━━━━
Overall Score: 8.2/10
Build: ✅ Clean
Performance: LCP 1.8s | CLS 0.02 | INP 120ms
Accessibility: AA contrast ✅ | Keyboard ✅ | Reduced motion ✅

Strengths:
- Distinctive typography with excellent hierarchy
- Smooth scroll animations at 60fps

Issues Found:
- Mobile nav needs larger touch targets (40px → 44px)
- Hero image LCP could improve with preload

Actions Taken:
- Increased touch targets to 48px
- Added preload for hero image
```

## Validation

✅ All build checks pass
✅ Screenshots captured at required viewports
✅ Quality scorecard completed
✅ Issues identified and resolved
✅ No fabricated test results
