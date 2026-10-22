# Contributing to Creative Web Architect

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies: `pnpm install`
4. **Build** all packages: `pnpm build`
5. **Run** tests: `pnpm test`

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Monorepo Structure

```
packages/
  core/      — Skill discovery, configuration, types
  cli/       — Command-line installer
  effects/   — Liquid Glass, motion, 3D utilities
skills/      — Reusable Agent Skills (SKILL.md files)
templates/   — Starter project templates
examples/    — Working demonstration projects
tests/       — Integration and E2E tests
docs/        — Documentation
```

### Building

```bash
pnpm install
pnpm build
```

### Running Tests

```bash
pnpm test          # Unit tests
pnpm test:e2e      # End-to-end tests
pnpm typecheck     # Type checking
pnpm lint          # Linting
```

## How to Contribute

### Reporting Issues

- Use the issue templates provided
- Include reproduction steps
- Specify your environment (OS, Node version, AI tool)

### Submitting Changes

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

### Writing Agent Skills

Skills live in `skills/<skill-name>/SKILL.md`. Each must include:

- YAML frontmatter with `name` and `description`
- Clear purpose and activation conditions
- Step-by-step workflow
- Implementation guidelines
- Common pitfalls
- Validation criteria

### Code Style

- TypeScript for all packages
- Strict mode enabled
- Meaningful variable and function names
- JSDoc comments for public APIs
- No `any` types without justification

## Code of Conduct

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before participating.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
