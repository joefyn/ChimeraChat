# Copilot Usage Rules for Chimera Pipeline

## Core Principles

GitHub Copilot operates as a **Scribe-only** tool within the Chimera Pipeline. It assists with code drafting but must not make architectural decisions or modify system anchors.

## Five Essential Rules

1. **Scribe Role Only**: Copilot generates code drafts based on explicit instructions. It does not plan, architect, or make design decisions. Those responsibilities belong to CGPT-5 (planning) and human owners (decisions).

2. **Sandbox First**: All Copilot-generated code must be created in spike branches (`feature/spike-*`). No direct commits to main branches or feature branches intended for production.

3. **Adopt-Diff Workflow**: Copilot output requires formal adoption through `chimera adopt spike.patch`. Raw Copilot suggestions cannot be merged without going through the Intent → Plan → Bridge → Execute → Gate pipeline.

4. **Glossary Lock Enforcement**: Copilot must not rename or synonym any terms defined in `glossary.lock.json`. UI strings, API names, and domain terminology are immutable once locked.

5. **Anchor Preservation**: Copilot must never modify, move, or rename anchor points (marked code locations used for precise targeting). Anchor violations result in automatic rejection.

## Additional Safeguards

- **No Free Edits**: Every code change must be traceable to a specific operation in `codex.instructions.json`
- **Test-First Preference**: When generating code, prioritize test creation over implementation
- **Minimal Scope**: Focus on the smallest possible change that satisfies the requirement
- **Public API Protection**: Never modify public interfaces without explicit permission and planning

## Violation Handling

- Anchor modifications → Automatic block with cause analysis
- Glossary violations → Gate failure with terminology drift report
- Scope creep → Rejection with smallest fix-plan alternative
- Free edits → Require re-routing through proper pipeline

## Integration with VS Code

Use the provided `.vscode/settings.json` configuration to enforce these rules at the editor level and minimize accidental violations.