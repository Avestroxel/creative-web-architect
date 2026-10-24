# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 0.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public issue
2. Email: security@creative-web-architect.dev (placeholder — update before public release)
3. Include a description of the vulnerability, reproduction steps, and impact assessment
4. Allow reasonable time for a fix before public disclosure

## Security Principles

This project follows these security practices:

- **No bundled API keys** — The toolkit never stores or transmits API credentials
- **No telemetry** — No usage data is collected without explicit opt-in
- **Safe file operations** — CLI tools validate paths and create backups before modifications
- **No arbitrary execution** — Skills are documentation files, not executable scripts that run automatically
- **Dependency auditing** — Dependencies are reviewed for known vulnerabilities
- **Minimal permissions** — The CLI requests only necessary filesystem access

## Dependency Security

We recommend running `pnpm audit` regularly. Report dependency vulnerabilities through the standard issue process.
