---
description: "Fix issue command — fetch issue and apply minimal fix"
---

# Fix Issue

Given a GitHub issue number or description, fix the problem in the codebase.

Steps:
1. If an issue number is provided, fetch it with `gh issue view {number}` to read the full description
2. Identify the affected component(s) in `src/components/`
3. Read the relevant source files before making any changes
4. Apply the minimal fix — do not refactor surrounding code
5. Update or add tests in `src/components/{Component}/tests/*.svelte.test.ts` to cover the fixed case
6. Run `pnpm test` to verify nothing is broken
7. Run `pnpm check` to verify TypeScript and Svelte validity

$ARGUMENTS
