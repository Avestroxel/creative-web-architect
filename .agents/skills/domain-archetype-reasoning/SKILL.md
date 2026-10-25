---
name: domain-archetype-reasoning
description: "Determines domain-specific UX structures, conversion patterns, section hierarchies, and trust components across 192 product and industry archetypes (SaaS, FinTech, E-Commerce, Healthcare, Developer Tools, AI, Luxury, Creative Portfolios)."
version: 1.0.0
tags: [domain-reasoning, product-archetypes, conversion-patterns, section-hierarchy, trust-architecture, landing-patterns]
activationKeywords: [product type, industry archetype, conversion pattern, section order, landing structure, domain reasoning, trust components]
dependencies: [brief-interpreter, layout-composition, creative-direction]
---

# Domain Archetype Reasoning Engine

The **Domain Archetype Reasoning Engine** provides deterministic, data-backed architecture decisions for web interfaces based on the exact product and business domain. Rather than guessing generic layout structures, this skill matches your project against 192 vetted industry profiles.

## Core Capabilities

1. **Section Sequence Planning:** Establishes the optimal narrative order (e.g., Hero -> Problem Agitation -> Solution Architecture -> Interactive Demo -> Social Proof -> Pricing -> Conversion CTA).
2. **CTA Mechanics:** Recommends primary vs secondary action strategies (above-the-fold value prompt, sticky bottom trigger, deferred commitment, or micro-interaction triage).
3. **Trust & Proof Architectures:** Specifies industry-appropriate validation (SOC2 badges for FinTech, peer-reviewed clinical data for Health, verified telemetry for Developer Tools, lookbooks for Luxury).
4. **Content Density Calibration:** Balances technical data density against emotional brand storytelling.

## 10 Major Archetype Clusters

| Archetype Cluster | Primary Conversion Intent | Core Section Pattern | Critical Component |
| :--- | :--- | :--- | :--- |
| **SaaS & B2B Software** | Free trial / Demo request | Hero -> Feature Breakdown -> Interactive Sandbox -> Social Proof -> Pricing | Feature comparison matrix with sticky header |
| **FinTech & Banking** | Trust & Account Creation | Hero -> Security Architecture -> Regulatory Compliance -> Live Yield/Rates -> Onboarding | Real-time rate calculator & security audit badges |
| **E-Commerce & Luxury** | Product Purchase / Exploration | Hero Visual -> Curated Lookbook -> Detail Carousel -> Social Proof -> Checkout | High-fidelity zoomable gallery & stock indicator |
| **Developer Tools & Infra** | CLI Install / Documentation | Hero with Copyable Terminal Command -> Architecture Trace -> Benchmark Matrix -> Open Source Telemetry | One-click copy snippet & API latency benchmark |
| **Healthcare & Biotech** | Credibility & Consultation | Hero -> Clinical Validation -> Care Provider Workflow -> Patient Outcomes -> Appointment CTA | Regulatory certifications & verified clinical results |
| **Creative & Design Studio** | Inbound Inquiry / Retainer | Cinematic Hero -> Curated Project Index -> Interactive Case Studies -> Studio Philosophy -> Direct Contact | Full-bleed interactive project portal |
| **AI & Next-Gen Compute** | Model Playground / API Key | Value Proposition -> Live Playground / Prompt Input -> Benchmark Comparison -> Documentation -> Tiered Access | Interactive prompt sandbox & token estimator |
| **Education & Learning** | Enrollment / Course Preview | Hero Preview -> Curriculum Roadmap -> Instructor Credentials -> Student Outcomes -> Cohort Enrollment | Expandable curriculum drawer & progress indicator |
| **Hospitality & Travel** | Booking & Experience Reservation | Immersive Full-Bleed Imagery -> Date/Guest Picker -> Suite/Experience Grid -> Amenities List -> Booking Flow | Sticky reservation bar & interactive floorplan/map |
| **Automotive & Hardware** | Configuration / Test Drive | Hero 3D Reveal -> Engineering Specs -> Interactive Configurator -> Performance Telemetry -> Order/Reserve | Multi-angle view & real-time telemetry HUD |

## Reasoning Execution Protocol

When designing a new page or application:
1. **Identify the Primary Domain:** Match prompt keywords against the 192 product profiles in `knowledge/design-intelligence/data/products.csv` and `ui-reasoning.csv`.
2. **Extract Conversion Triggers:** Review required compliance, proof points, and action mechanics in `knowledge/design-intelligence/data/landing.csv`.
3. **Generate Custom Architecture Plan:** Assemble the page layout using semantic HTML5 elements without generic placeholder cards.
4. **Enforce System Restraint:** Maintain zero unrequested audio (100% silent by default) and clean obsidian/hairline contrast.
