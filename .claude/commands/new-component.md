---
description: "New component command — scaffold component files and tests"
---

# New Component

Scaffold a new Svelte 5 component following established project conventions.

Given a component name and optional description, create:

1. `src/components/{Name}/{Name}Types.ts` — Public TypeScript interface definitions extending the appropriate `HTML*Attributes`.
2. `src/components/{Name}/{Name}.svelte` — Component using `$props()`, `$derived.by()` for class strings, `{@render children?.()}` for snippet content, and `{...rest}` spread on the root element.
3. `src/components/{Name}/index.ts` — Named exports for both the component and its types.
4. `src/components/{Name}/stories/{Name}.stories.ts` — Storybook CSF configuration.
5. `src/components/{Name}/tests/{Name}.svelte.test.ts` — Vitest browser tests covering: default render, all variants/sizes, and accessibility attributes.
6. Re-export the component from `src/lib/index.ts`.

Follow `.claude/rules/code-style.md`, `.claude/rules/api-conventions.md`, `.claude/rules/testing.md`, and `.claude/rules/monorepo-architecture.md`.

After scaffolding, run `pnpm check` and `pnpm test` to verify correctness.

$ARGUMENTS
