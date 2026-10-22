---
name: creative-direction
description: Autonomous art direction engine that develops visual storytelling, composition, emotional direction, typography strategy, color philosophy, and motion personality for each project.
version: 0.1.0
tags: [design, art-direction, creative, visual]
activationKeywords: [art direction, creative, visual, mood, aesthetic, style, look and feel]
dependencies: [brief-interpreter, design-style-selection]
---

# Creative Direction

## Purpose

Act as an autonomous Creative Director that develops a complete visual direction for each project. Internally generate at least three meaningfully different creative directions, evaluate them, and select the strongest one.

## Activation Conditions

- After a project brief has been interpreted
- When the user asks for a design direction or visual concept
- When starting any new website or redesign project

## Workflow

### Step 1 — Develop Three Creative Directions

For each project, internally develop three distinct approaches:

**Direction A — Industry Standard**: The strongest conventional approach for this category. Well-executed, professional, meets audience expectations.

**Direction B — Distinctive**: A differentiated approach that stands out from competitors while remaining appropriate. Often involves an unexpected style combination.

**Direction C — Bold**: A creative risk that pushes boundaries. May use experimental styles, unusual layouts, or unexpected visual metaphors.

### Step 2 — Evaluate Each Direction

Score each direction (1-10) on:

| Criterion | Weight | Description |
|---|---|---|
| Originality | 20% | How distinctive is this from typical sites in the category? |
| Brand Relevance | 25% | Does it communicate the right personality and values? |
| Usability | 20% | Can users navigate and consume content effectively? |
| Visual Quality | 15% | Is the composition, typography, and color work excellent? |
| Technical Feasibility | 10% | Can this be built with reasonable effort and performance? |
| Accessibility | 10% | Does it work for users with diverse abilities? |

### Step 3 — Select and Refine

Choose the highest-scoring direction unless:
- The user explicitly requested a specific style
- The bold option scores highest AND is feasible
- Performance constraints eliminate otherwise excellent options

### Step 4 — Define the Creative Direction

Document the selected direction:

#### Visual Storytelling
- What story does this website tell?
- What emotions should each section evoke?
- How does the visual narrative progress?

#### Composition Planning
- Grid system (asymmetric, modular, bento, editorial?)
- Visual weight distribution
- Negative space strategy
- Hero section approach
- Section transition style

#### Emotional Direction
- Primary emotion (confidence, wonder, warmth, excitement, calm)
- Emotional arc through the page
- Moments of surprise or delight

#### Typography Strategy
- Display typeface and its role
- Body typeface and reading experience
- Size contrast philosophy
- Text animation approach

#### Color Philosophy
- Color story (what do the colors mean?)
- Primary, secondary, accent rationale
- Light vs dark mode strategy
- Color in motion and interaction

#### Image Treatment
- Photography style (editorial, documentary, product, lifestyle)
- Image filters or treatments
- Illustration integration
- Video and motion media

#### Motion Personality
- **Calm**: Subtle, slow, deliberate — for luxury, editorial, professional
- **Energetic**: Quick, bouncy, playful — for startups, gaming, youth
- **Cinematic**: Dramatic, sequential, immersive — for products, automotive, fashion
- **Minimal**: Nearly invisible, functional-only — for dashboards, tools, information

#### Material Selection
- Surface types (flat, glass, textured, layered)
- Shadow philosophy
- Border treatment
- Depth approach

## Guidelines

- **Be decisive**: Select ONE direction, don't present three options to the user
- **Be original**: Don't default to the same dark-luxury look for every project
- **Be practical**: Beautiful ideas that can't be built aren't useful
- **Be consistent**: Every element should feel part of the same vision
- **Document reasoning**: Explain WHY decisions were made, not just WHAT

## Common Pitfalls

- Applying the same visual treatment to every project
- Choosing style over substance (cool effects with poor usability)
- Ignoring the audience in favor of personal preference
- Overcomplicating simple projects
- Underdesigning ambitious projects

## Validation

✅ Creative direction is internally consistent
✅ Typography, color, layout, and motion all tell the same story
✅ Direction is appropriate for the audience and category
✅ Technical requirements are feasible
✅ Accessibility is considered from the start
✅ The design would feel intentional to a professional designer
