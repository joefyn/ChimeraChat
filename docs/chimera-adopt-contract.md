# Chimera Adopt Contract

## Overview

The `chimera adopt` command implements Track B of the Chimera Pipeline - the formal adoption of spike branch changes into the main development workflow.

## Input Contract

### Accepted Input Formats

1. **Git Patch Files** (`.patch`)
   ```bash
   chimera adopt spike.patch
   ```

2. **Git Diff Output**
   ```bash  
   git diff > changes.diff
   chimera adopt changes.diff
   ```

3. **Unified Diff Format**
   - Standard unified diff format as produced by `git diff`
   - Must include file paths relative to repository root
   - Line numbers and context must be preserved

### Input Validation

- Patch must apply cleanly to current HEAD
- Changes must not conflict with existing modifications
- File paths must exist in the repository
- Binary files are rejected (text changes only)

## Processing Pipeline

### Phase 1: Patch Analysis
1. Parse patch file format
2. Extract changed files and line ranges
3. Identify potential anchors and API changes
4. Calculate complexity metrics

### Phase 2: Intent Synthesis
Creates `prompt.audit.json` with synthesized intent:
```json
{
  "goal": "<inferred from changes>",
  "constraints": "<derived from change patterns>", 
  "definition_of_done": ["<test requirements>", "<quality gates>"],
  "risks": ["<identified risks from change analysis>"],
  "glossary": "<extracted terminology>",
  "auto_synthesized": true,
  "spike_source": "<patch file path>"
}
```

### Phase 3: Plan Generation
Creates `code.plan.json` with atomic operations:
```json
{
  "operations": [
    {
      "type": "modify_file",
      "target": "<file_path>",
      "anchor": "<identified anchor>", 
      "changes": "<change description>",
      "expect_sha": "<current file hash>",
      "rationale": "<why this change>"
    }
  ],
  "dependencies": [],
  "risks": [],
  "spike_adopted": true
}
```

### Phase 4: Pipeline Routing
Automatically routes through:
1. **Bridge** - Generate `codex.instructions.json`
2. **Execute** - Apply changes with validation
3. **Gate** - Quality assessment and approval

## Rejection Conditions

### Automatic Rejections
- **Anchor Violations**: Changes to marked anchor points
- **Public API Changes**: Modifications to public interfaces
- **Glossary Conflicts**: New terminology that conflicts with locked terms
- **Security Issues**: Changes that introduce security vulnerabilities
- **Scope Explosion**: Changes that exceed reasonable complexity thresholds

### Rejection Response Format
```json
{
  "status": "rejected",
  "reason": "<primary rejection reason>",
  "causes": [
    {
      "type": "anchor_violation",
      "file": "<file_path>",
      "line": 42,
      "description": "Anchor 'auth_handler' was modified"
    }
  ],
  "fix_plan": {
    "recommended_actions": ["<action 1>", "<action 2>"],
    "alternative_approach": "<suggested alternative>"
  }
}
```

## Success Output

### Generated Artifacts
- `prompt.audit.json` - Synthesized intent
- `context.bundle.json` - Relevant context
- `code.plan.json` - Execution plan
- `codex.instructions.json` - Low-level operations
- `changeset.diff` - Final changes
- `adoption.report.json` - Adoption summary

### Adoption Report Format
```json
{
  "status": "adopted",
  "spike_source": "<patch_file>",
  "changes_summary": {
    "files_modified": 3,
    "lines_added": 45,
    "lines_removed": 12,
    "complexity_score": 7.2
  },
  "synthesis_quality": {
    "intent_confidence": 0.85,
    "plan_completeness": 0.92,
    "risk_coverage": 0.78
  },
  "pipeline_results": {
    "bridge_status": "success",
    "execute_status": "success", 
    "gate_status": "approved"
  }
}
```

## Error Codes

- `0` - Successful adoption
- `1` - Invalid patch format
- `2` - Patch does not apply cleanly
- `3` - Automatic rejection (anchor/API/glossary violation)
- `4` - Quality gate failure
- `5` - Synthesis failed (could not infer intent)
- `6` - Pipeline execution error

## Usage Examples

### Basic Adoption
```bash
# Create spike branch
git checkout -b feature/spike-auth-system

# Make changes with Copilot
# ... development work ...

# Generate patch
git diff main > auth-spike.patch

# Return to main branch  
git checkout main

# Adopt changes through pipeline
chimera adopt auth-spike.patch
```

### Adoption with Review
```bash
# Adopt with manual review checkpoints
chimera adopt --review auth-spike.patch

# Check adoption status
chimera status --last-adoption
```

## Integration Points

- **CI/CD**: Adoption can be triggered automatically from spike branch PRs
- **IDE Integration**: VS Code extension can offer "Adopt Spike" commands
- **Git Hooks**: Pre-commit hooks can validate spike patches before adoption
- **Quality Gates**: Integration with existing testing and linting infrastructure