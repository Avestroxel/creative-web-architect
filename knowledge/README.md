# Creative Web Architect // Knowledge Base

This directory forms the persistent, reusable repository-based knowledge foundation of **Creative Web Architect**.

Instead of bloating LLM context windows or attempting brittle fine-tuning, Creative Web Architect uses structured, validated, and indexed engineering techniques extracted from real-world prompts, design systems, and motion specifications.

## Directory Structure

- **`incoming/`**: Drop zone for raw reference prompts, markdown files, design briefs, or design specifications.
- **`prompt-library/`**: Archived, sanitized reference prompts with metadata attribution.
- **`design-references/`**: Curated typography stacks, visual philosophies, and layout proportions.
- **`animation-recipes/`**: Kinematic spring math, easing curves, stagger sequences, and scroll triggers.
- **`visual-patterns/`**: Layout compositions, architectural surfaces, and material definitions.
- **`learned-techniques/`**: Atomic, structured engineering techniques categorized by discipline.
- **`evaluation-cases/`**: Test cases and benchmarks validating that techniques perform smoothly at 60 FPS.
- **`index.json`**: Master index used by the agent and CLI for rapid selective retrieval.

## Ingestion Workflow

To ingest a new prompt:

```bash
# Using the CWA CLI
cwa ingest ./knowledge/incoming/my-reference-prompt.md

# Or search existing techniques
cwa knowledge search "scroll mask"
```

## Contributing Guidelines

1. Do not commit private API keys, proprietary commercial code, or copyrighted client assets.
2. Techniques must conform to the **No-Glow Architectural Policy** by default (restrained contrast, matte surfaces, zero cheap neon bloom), unless tagged explicitly as a deliberate stylized exception (e.g. `cyberpunk`).
3. Every technique must specify its performance budget and WCAG accessibility considerations.
