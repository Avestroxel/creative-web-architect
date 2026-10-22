---
name: brief-interpreter
description: Analyzes minimal user input to extract project requirements, audience, category, personality, and technical constraints for autonomous creative decision-making.
version: 0.1.0
tags: [analysis, planning, requirements]
activationKeywords: [brief, analyze, interpret, understand, create, build, make, design]
---

# Brief Interpreter

## Purpose

Transform minimal user input into a structured project brief that guides all subsequent creative and technical decisions. The agent should understand natural language and extract maximum insight from even single-sentence instructions.

## Activation Conditions

- User provides a new project description
- User requests a website, page, or component
- User describes a redesign or improvement task
- This is typically the **first skill** activated in any workflow

## Workflow

### Step 1 — Parse the Raw Input

Extract explicit information:
- **Website type**: What kind of site? (portfolio, ecommerce, corporate, etc.)
- **Industry/domain**: What field? (automotive, fashion, tech, food, etc.)
- **Specific requests**: Any mentioned colors, styles, features, or technologies
- **Mood words**: Luxury, minimal, bold, playful, futuristic, warm, etc.
- **Content hints**: Products, services, portfolio pieces, articles, etc.

### Step 2 — Infer Missing Context

For information NOT provided, make intelligent inferences:

| Missing Info | Inference Strategy |
|---|---|
| Audience | Infer from industry (luxury car → affluent adults, coffee → 25-45 lifestyle) |
| Visual style | Match to industry conventions + mood words |
| Content structure | Use category-standard page architecture |
| Technology needs | Assess complexity level from description |
| Animation level | Match to brand personality (luxury = subtle, gaming = energetic) |
| 3D suitability | Products benefit from 3D; services rarely do |
| Mobile priority | Always high unless explicitly desktop-focused |

### Step 3 — Determine Operating Mode

If not specified, select the best mode:

| Signal | Recommended Mode |
|---|---|
| Short creative prompt | `auto` |
| User mentions preferences | `guided` |
| "experimental", "creative", "unusual" | `experimental` |
| "fast", "lightweight", "simple" | `performance` |
| "cinematic", "immersive", "storytelling" | `immersive` |
| "redesign", "improve", "fix" | `redesign` |
| "glass", "translucent", "Apple-like" | `liquid-glass` |
| "design system", "tokens", "components" | `design-system` |
| "component", "button", "card" | `component` |
| "audit", "review", "evaluate" | `audit` |

### Step 4 — Produce Structured Brief

Output a structured brief containing:

```
PROJECT BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Category:       [website type]
Industry:       [domain]
Audience:       [target users]
Personality:    [3-5 brand adjectives]
Mode:           [operating mode]

CONTENT STRUCTURE:
- [page/section list]

STYLE DIRECTION:
- Primary:      [design style]
- Influences:   [secondary styles]

TECHNICAL NOTES:
- [stack considerations]
- [animation/3D needs]
- [performance priorities]

ASSUMPTIONS:
- [clearly labeled inferences]
```

## Guidelines

- **Never fabricate real business data** — use clearly labeled sample content
- **Don't ask clarifying questions** unless the input is truly ambiguous (e.g., "make something")
- **Be decisive** — make one strong interpretation rather than listing options
- **Label all assumptions** so the user can correct them
- **Prioritize action** — the brief should enable immediate creative direction work

## Common Pitfalls

- Overthinking simple requests ("coffee website" doesn't need a 20-question interview)
- Under-thinking complex requests (missing that "3D product configurator" implies significant technical scope)
- Defaulting to generic corporate style for everything
- Ignoring mood words that signal specific aesthetic directions

## Validation

✅ Brief covers all fields needed by downstream skills
✅ Assumptions are clearly labeled
✅ Mode selection is justified
✅ Content structure is plausible for the category
✅ No fabricated business facts
