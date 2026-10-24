# Template Delivery & Baseline Refactoring Workflow

## Dual-Stack Runtime Detection & Serving Protocol
When inspecting scaffolded or delivered project packages, analyze whether the archive is a framework project (containing package.json) or a clean static web package (HTML, CSS, JS assets).
Never invent or force an unnecessary React/Next.js framework scaffolding if the delivered project is already a complete, fast static site; conversely, never flatten an existing React/Next.js component structure into static HTML.
Always serve static web packages through a local HTTP server rather than raw file:// protocol to ensure ES module imports, SVG clip-path filters, Web Audio, and asset paths resolve cleanly.

## Targeted Incremental Baseline Refactoring
When applying follow-up creative changes (copywriting, typography scales, colorways, sections, or interactive features), preserve the delivered architectural structure, styling system, and motion tokens as the baseline.
Prefer small, targeted, non-destructive delta edits over regenerating the entire site.
Preserve working component boundaries, avoid layout thrashing, and maintain local dev server review synchronization after each meaningful iteration.
