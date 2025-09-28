# ChimeraChat

A surgical development pipeline that ensures code quality, consistency, and traceability through orchestrated AI assistance.

## Overview

ChimeraChat implements the Chimera Pipeline v3 - a systematic approach to AI-assisted development that prevents drift, maintains quality, and enables precise code changes through a structured workflow.

## Core Principles

- **No Free Edits**: Every code change must flow through the pipeline
- **Immutable Anchors**: Marked code locations cannot be modified without explicit approval
- **Glossary Lock**: Terminology is locked to prevent drift
- **Quality Gates**: Automated checks ensure consistency and correctness
- **AI Role Separation**: Each AI tool has a specific, limited role

## Quick Start

### Installation

The Chimera CLI is self-contained and requires Python 3.7+:

```bash
# Clone the repository
git clone https://github.com/joefyn/ChimeraChat.git
cd ChimeraChat

# Make CLI executable
chmod +x chimera

# Check installation
./chimera --help
```

### Basic Workflow (Track A)

1. **Define Intent**
   ```bash
   ./chimera intent --goal "Add user authentication system"
   ```

2. **Curate Context**
   ```bash
   ./chimera context --sources src/auth.py docs/auth-spec.md
   ```

3. **Generate Plan**
   ```bash
   ./chimera plan
   ```

4. **Execute Changes**
   ```bash
   ./chimera bridge
   ./chimera execute
   ```

5. **Quality Gate**
   ```bash
   ./chimera gate
   ```

### Spike Workflow (Track B)

For rapid prototyping with GitHub Copilot:

```bash
# Create spike branch
git checkout -b feature/spike-auth

# Develop with Copilot (following policy/copilot.rules.md)
# ... make changes ...

# Generate patch
git diff main > auth-spike.patch

# Return to main and adopt
git checkout main
./chimera adopt auth-spike.patch
```

## AI Tools & Roles

- **Human Owner**: Makes decisions, defines goals
- **CGPT-5**: Plans development, audits quality
- **Gemini (Archivist)**: Curates context, translates requirements
- **Codex**: Executes precise code changes
- **Copilot (Scribe)**: Drafts code in spike branches only

## Key Features

### Anti-Drift Controls
- SHA-based preconditions prevent unexpected changes
- Glossary lock prevents terminology drift
- Anchor protection prevents architectural damage
- Scope tripwires catch feature creep

### Quality Assurance
- Automated lint and test execution
- Coverage requirements
- Complexity limits
- Security scanning

### Observability
- Complete audit trail in JSON artifacts
- Timing and token usage metrics
- Cache hit ratios
- Model fingerprints

## Directory Structure

```
.
├── chimera              # Main CLI tool
├── policy/              # Development policies
│   ├── copilot.rules.md # Copilot usage guidelines
│   ├── context.rules.json # Context curation rules
│   └── gate.rules.json  # Quality gate configuration
├── schema/              # JSON schemas for artifacts
├── docs/                # Documentation
├── .vscode/             # Editor configuration
└── .chimera/            # Generated artifacts (ignored)
```

## Documentation

- [Copilot Usage Rules](policy/copilot.rules.md)
- [Chimera Adopt Contract](docs/chimera-adopt-contract.md)
- [Artifact Schemas](schema/)

## Configuration

### VS Code Integration

The provided `.vscode/settings.json` configures the editor to work optimally with the Chimera Pipeline:

- Disables automatic suggestion acceptance
- Enforces clean diffs
- Preserves whitespace consistency
- Enables explicit change review

### CI/CD Integration

Use `--strict` mode in CI environments:

```yaml
# .github/workflows/chimera.yml
- name: Run Chimera Pipeline
  run: ./chimera gate --strict
```

## License

MIT License - see LICENSE file for details.