---
name: cross-platform-ui-matrix
description: "Translates architectural design tokens and UX specifications across 22 technology stacks, including React, Next.js, Svelte, Vue, Tailwind, SwiftUI, Flutter, React Native, and native desktop frameworks."
version: 1.0.0
tags: [cross-platform, multi-stack, react, nextjs, svelte, vue, tailwind, swiftui, flutter, react-native, tokens]
activationKeywords: [cross platform, multi stack, tech stack, react, nextjs, svelte, vue, tailwind, swiftui, flutter, react native]
dependencies: [design-system, production-pipeline]
---

# Cross-Platform UI Matrix & Stack Translation

The **Cross-Platform UI Matrix** establishes unified token translation, layout architecture, and component standards across 22 frontend and native application frameworks.

## Supported 22 Framework Stacks

Detailed guidelines, component idioms, and styling paradigms for each stack are cataloged in `knowledge/design-intelligence/data/stacks/`:

### 1. Modern Web & Meta-Frameworks
* **React / Next.js (`react.csv`, `nextjs.csv`):** Server Components (RSC), client boundary optimization, dynamic font loading (`next/font`), zero-runtime CSS-in-JS or Tailwind CSS integration.
* **Svelte / SvelteKit (`svelte.csv`):** Reactive declarations, compile-time scoped styles, lightweight spring transitions (`svelte/motion`).
* **Vue / Nuxt (`vue.csv`, `nuxtjs.csv`, `nuxt-ui.csv`):** Composition API, scoped `<style>`, Pinia state management, headless component architecture.
* **Astro (`astro.csv`):** Island architecture, zero client-side JavaScript by default, selective hydration (`client:visible`, `client:idle`).
* **Angular (`angular.csv`):** Standalone components, signals-based reactivity, OnPush change detection, strict typings.
* **Tailwind & Modern CSS (`html-tailwind.csv`, `shadcn.csv`):** CSS variables-based theming (`oklch` / `hsl`), headless primitives (`radix-ui`), atomic utility boundaries.
* **Full-Stack & Classical (`laravel.csv`):** Blade templating, Alpine.js micro-reactivity, Inertia.js bridges.
* **3D & WebGL Canvas (`threejs.csv`):** Three.js r0.160+ scene graph, shader material pipeline, camera controls, rAF loop optimization.

### 2. Native Mobile & Cross-Platform
* **Apple SwiftUI (`swiftui.csv`):** Declarative views, `@StateObject`, `ViewModifier` token cascades, SF Symbols alignment, dynamic type support.
* **Google Flutter (`flutter.csv`):** Widget composition, `ThemeData` token hierarchy, CustomPainter for micro-graphics, Impeller rendering engine.
* **React Native (`react-native.csv`):** New Architecture (TurboModules & Fabric), StyleSheet optimization, Reanimated 3 spring physics.
* **Android Jetpack Compose (`jetpack-compose.csv`):** Declarative composables, Material 3 theming tokens, remember/derivedStateOf reactivity.

### 3. Native Desktop Frameworks
* **Avalonia UI (`avalonia.csv`):** Cross-platform XAML (Windows, macOS, Linux), compiled bindings, FluentTheme tokens.
* **Windows Modern (`winui.csv`, `wpf.csv`, `uwp.csv`, `uno.csv`):** WinUI 3, Windows App SDK, Mica/Acrylic material backdrops, Uno multi-platform target.
* **JavaFX (`javafx.csv`):** SceneBuilder FXML, CSS-based JavaFX theming, observable collections.

## Design Token Translation Matrix

Design variables defined in CSS tokens map deterministically to other framework paradigms:

| CSS Token | Tailwind Class | React Native / JS | SwiftUI | Flutter |
| :--- | :--- | :--- | :--- | :--- |
| `var(--bg-primary)` | `bg-background` | `colors.bgPrimary` | `Color("BgPrimary")` | `Theme.of(context).scaffoldBackgroundColor` |
| `var(--text-primary)` | `text-foreground` | `colors.textPrimary` | `Color("TextPrimary")` | `Theme.of(context).textTheme.bodyLarge?.color` |
| `var(--radius-lg)` | `rounded-xl` | `borderRadius: 16` | `.cornerRadius(16)` | `BorderRadius.circular(16)` |
| `var(--ease-spring)` | `ease-[cubic-bezier(...)]`| `Easing.bezier(...)` | `.animation(.spring(...))` | `Curves.fastOutSlowIn` |

## Production Protocol

1. **Detect Target Stack:** Check user project configuration (`package.json`, `pubspec.yaml`, `Package.swift`, `*.csproj`).
2. **Apply Stack-Specific Best Practices:** Load corresponding stack rules from `knowledge/design-intelligence/data/stacks/`.
3. **Preserve Semantic Equivalence:** Maintain identical spacing ratios, color contrast, and interaction timing regardless of rendering engine.
4. **Enforce Silence:** Maintain strict Silent-by-Default audio policies across all target platforms.
