# svelte-components
## Documentation Links

| Source                             | URL                                                           | Why                                  |
|------------------------------------|---------------------------------------------------------------|--------------------------------------|
| Svelte 5 Runes                     | https://svelte.dev/docs/svelte/what-are-runes                 | $props, $bindable, $derived, $effect |
| Svelte 5 Snippets                  | https://svelte.dev/docs/svelte/snippet                        | @render, snippet type                |
| Tailwind v4 docs                   | https://tailwindcss.com/docs/v4-beta                          | CSS-first config, @theme, @layer     |
| @sveltejs/package                  | https://svelte.dev/docs/kit/packaging                         |                                      |
| smui                               | https://github.com/hperrin/svelte-material-ui                 | MUI components built on Svelte       |
| WCAG 2.1 Form Labels               | https://www.w3.org/WAI/tutorials/forms/labels/                | Accessibility requirements           |
| ARIA Authoring Practices — Textbox | https://www.w3.org/WAI/ARIA/apg/patterns/textbox/             | ARIA pattern reference               |
| Vite 8                             | https://vite.dev/                                             | Build and runtime tool               |
| TypeScript                         | https://www.typescriptlang.org/docs                           | TS specifications from MS            |
| publint                            | https://publint.dev                                           | Linting tool                         |
| Vitest                             | https://vitest.dev                                            | Testing tool                         |
| Playwright                         | https://playwright.dev/docs/intro                             | UI rendering e2e test                |
| bun                               | https://bun.io                                               | Dependency management                |
| storybook                          | https://www.storybook.js.org                                  | Component documentation              |
| MUI Design Specification           | @LLMs.md                                                      | Links to component design spec       |
|------------------------------------|---------------------------------------------------------------|--------------------------------------|

---
---

## Repository Initialization & Setup

### Git Flow
- **Initialize**: `git flow init -d`
- **Branches**: `master` (production), `dev` (development)
- **Feature**: `git flow feature start <name>`
- **Release**: `git flow release start <version>`

### Adding a Component ("Plugging In")
1.  **Initialize submodule**: `git submodule add <component-repo-url> src/components/{Name}/`
2.  **Define Exports**: Add `src/components/{Name}/index.ts`.
3.  **Aggregate**: Add the export to `src/lib/index.ts`.
4.  **Register**: Create a changeset: `pnpm changeset`.

---

## Scope

- This repository is a **Vite + Svelte 5 component monorepo**.
- **Component-as-a-Repo Architecture**:
  - Each directory under `src/components/` is treated as an independent, standalone repository.
  - Components should be self-contained, including their own implementation, types, sub-components, stories, documentation, and tests.
  - While they are physically in one repository, architecturally they are separate units.
  - Component inter-dependencies are allowed and encouraged, but should be explicit.
- **Library Rules** apply strictly to `src/components/**`.
- **Strict Policy**: All new or modified library component code MUST go in its dedicated folder within `src/components/**`.
- Generic utilities or global library exports live in `src/lib/**`.

## Branching Strategy

- **Core Branches**: Both the monorepo and individual components maintain `master` and `dev` branches.
- **Synchronization**:
  - The **`master`** branch of the monorepo always corresponds to the latest commits on the `master` branches of its components.
  - The **`dev`** branch of the monorepo always corresponds to the latest commits on the `dev` branches of its components.
- **Feature Development**:
  - **Components**: Feature development MUST occur on component-specific feature branches (e.g., `feature/button-styles` in the component repo).
  - **Monorepo**: The monorepo does NOT have feature branches. It only serves to aggregate the `dev` and `master` states of its components.

## Commit and Versioning

- **Conventional Commits**: Every commit MUST follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
  - Format: `<type>(<scope>): <description>` (e.g., `feat(Button): add loading state`, `fix(DatePicker): resolve focus trapping issue`).
  - Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Versioning (Changesets)**: Use [Changesets](https://github.com/changesets/changesets) for managing versions and changelogs.
  - Every user-facing change should include a changeset created with `pnpm changeset`.
  - Changesets are aggregated at the monorepo level for releases.

## Canonical Paths

- Publishable library code: `src/components/**`
- Public export entry: `src/lib/index.ts`
- Global Tailwind import source: `src/lib/global.css`

---

## Code Rules

### Svelte (library components)

- Use **Svelte 5 runes** exclusively. Do not use Svelte 4 patterns (`$:`, `export let`, stores, slots, `svelte:component`, `$$props`, `$$restProps`).
  - Props: `const { foo } = $props()`
  - State: `let x = $state(0)`
  - Derived: `const y = $derived(x * 2)`
  - Effects: `$effect(() => { ... })`
  - Use snippets + `{@render}` instead of slots
- All new or modified library `.svelte` files in `src/components/**` should use `<script lang="ts">`.
- Keep components focused and single-purpose. Avoid business logic in library components.
- Do not import from `$app/*` in `src/components/**`.

### TypeScript

- Strict mode is enabled: no `any`, no implicit `any`, and avoid type assertions unless unavoidable.
- Type component props explicitly when inference is unclear.
- Use `interface` for object shapes and `type` for unions/aliases.
- Do not use `// @ts-ignore` or `// @ts-expect-error` without a brief justification comment.

### TailwindCSS

- Prefer Tailwind utility classes for styling.
- Do not use inline `style=""` attributes. **Exception:** dynamic numeric values that cannot be expressed as Tailwind utilities (e.g. auto-resize textarea height computed from `scrollHeight`) may use inline styles.
- Use `@tailwindcss/forms` styles for form controls and `prose` for rich text where appropriate.
- Tailwind is imported globally from `src/lib/layout.css`; do not re-import Tailwind in component files.

### Exports

- Export every public component/utility from `src/lib/index.ts`.
- Export only intended public API. Keep internal helpers unexported.
- Do not export internal/upstream code from `src/lib/**` directly; route all public exports through `src/lib/index.ts`.
- If `src/lib/index.ts` changes, run:
  - `bun check`
  - `bun build`

### Testing

- Use **Vitest** for unit/component tests.
- Use **Playwright** for E2E tests against the demo app when E2E coverage is needed.
- Use V8 coverage via `@vitest/coverage-v8`.
- If required test tooling is not yet configured in the repo, add the necessary dev dependencies and scripts as part of the same change.

Coverage target for library files:

```ts
coverage: {
  provider: 'v8',
  include: ['src/components/**'],
  thresholds: { statements: 95, branches: 95, functions: 95, lines: 95 }
}
```

- Every new library component/utility should include a corresponding test file.
- Prefer colocated tests under each component folder (for example `src/components/Button/tests/Button.test.ts`).
- Tests should cover props, snippets/events, and conditional branches.

---

## Dos

- Write components that work with sensible defaults when possible.
- Accept a `class` prop (`string | undefined`) when style extension is useful.
- Add or update a usage example in `src/routes/live/<Name>/+page.svelte` when introducing a new public component.
- Run `bun check` before considering work complete.
- Use named exports (not default exports) for utilities and types in `.ts` files.

## Don'ts

- Do not skip or comment out tests to pass quickly.
- Do not hardcode values that should be configurable (colors, spacing, sizing).
- Do not make components depend on a specific parent layout/context.
- Do not commit build artifacts from `dist/` or `.svelte-kit/`.
- Do not change `vite.config.ts` or packaging config casually; validate downstream effects first.

## Dependency Guidance

- Treat this as a library-first repo: keep runtime dependencies minimal and intentional.
- Prefer `devDependencies` for build, test, lint, packaging, demo, and local development tooling.
- Use `peerDependencies` for packages that consumers are expected to provide at runtime.
- Use `dependencies` only for true published-library runtime requirements that must ship with the package.
- When in doubt, prefer `devDependencies` unless the package is clearly consumer-provided or must be shipped at runtime.

## Build And Check

- Install dependencies: `bun install`
- Run dev server: `bun dev`
- Run type/Svelte checks: `bun check`
- Run package validation/build: `bun build`
- Preview production demo build: `bun preview`

## Component-as-a-Repo Development Guide

1.  **Isolated Identity**: Every component is its own miniature repository within the monorepo. It MUST be fully self-contained.
2.  **Folder Structure**: Create a new directory under `src/components/` (e.g., `src/components/MyComponent/`).
3.  **Core Implementation**: Place the main Svelte 5 component (`MyComponent.svelte`) and its public TypeScript types (`MyComponentTypes.ts`) directly inside this directory.
4.  **Composition**: Use a `parts/` subdirectory for internal micro-components that aren't intended for public use outside this component.
5.  **Documentation**: Use a `stories/` subdirectory for Storybook files (`*.stories.ts` and `*.md`).
6.  **Testing**: Use a `tests/` subdirectory for colocated Vitest tests (`*.svelte.test.ts`).
7.  **Public Interface**: Each component MUST have an `index.ts` file in its root directory (e.g., `src/components/MyComponent/index.ts`) defining its named exports.
8.  **Monorepo Aggregation**: All components MUST be re-exported directly in `src/lib/index.ts` (e.g., `export * from '../components/MyComponent/index.js'`). **Do not** use a central `src/components/index.ts` file. All library code must be accessible through the `src/lib/index.ts` entry point.
9.  **Demo/Live Preview**: For every new component, add or update a usage page in `src/routes/live/<Name>/+page.svelte`.
10. **Standard Compliance**:
    - Use Svelte 5 runes and Tailwind CSS for styling.
    - Ensure 100% test coverage for the component before completion.
    - Run `bun check` and `bun lint` to maintain code health.
    - Guarantee accessibility (ARIA patterns) as part of the core implementation.
11. **Hermeticity**: Avoid importing internal parts of other components. If a component needs shared logic, that logic should reside in `src/lib/utils.ts` or a shared component.

## Project Structure

```
src/
  components/                           # Each component in its own folder
    {ComponentName}/
      index.ts                          # Component public entry point
      {ComponentName}.svelte            # Component implementation
      {ComponentName}Types.ts           # Types and interfaces
      parts/
        {ComponentName}*.svelte         # Microcomponent
      stories/
        {ComponentName}*.stories.ts     # Storybook stories
        {ComponentName}.md              # Storybook documentation
      tests/
        {ComponentName}.svelte.test.ts  # Browser-based vitest tests
        {ComponentName}*Fixture.svelte  # Test fixtures (if needed)
  lib/
    index.ts                            # Package level public entry points export
    global.css                          # Tailwind global styles
  routes/
    live/
      {ComponentName}/  
        +page.svelte                   # Playground for the component
```

## Commands

| Command              | Description                      |
|----------------------|----------------------------------|
| `bun dev`           | Start dev server                 |
| `bun build`         | Build library (`dist/`)          |
| `bun test`          | Run all tests (single run)       |
| `bun test:unit`     | Run tests in watch mode          |
| `bun test:coverage` | Run tests with coverage report   |
| `bun test:e2e`      | Run Playwright e2e tests         |
| `bun lint`          | Prettier check                   |
| `bun format`        | Prettier format                  |
| `bun check`         | Svelte + TypeScript check        |
| `bun storybook`     | Storybook dev server (port 6006) |

## Rules

@.claude/rules/code-style.md
@.claude/rules/testing.md
@.claude/rules/api-conventions.md
@.claude/rules/monorepo-architecture.md
@.claude/commands/commit-message.md
