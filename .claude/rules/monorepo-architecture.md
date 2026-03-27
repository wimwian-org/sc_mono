# Monorepo and Component Architecture

## Monorepo Strategy

The project is structured as a **Vite + Svelte 5 component monorepo**. While it may appear as a single codebase, we treat each component folder as an independent repository (Component-as-a-Repo).

### Independent Components

- **Self-Containment**: Every component in `src/components/{ComponentName}/` MUST be fully self-contained. It should have everything it needs to function, test, and document itself within its own directory tree.
- **Internal Structure**:
  - `index.ts` - Public API surface (named exports of component and types).
  - `{ComponentName}.svelte` - Primary component entry point.
  - `{ComponentName}Types.ts` - Public TypeScript interface definitions.
  - `parts/` - Private sub-components or logic used ONLY by the parent component.
  - `stories/` - Storybook documentation and examples.
  - `tests/` - High-fidelity Vitest tests and fixtures.
- **Minimal Cross-Imports**: Avoid direct imports of internal parts from other components. Only import from the public exports defined in `src/components/{ComponentName}/index.ts`.

## Git Branching Strategy

The monorepo and its internal components share a unified branching logic:

- **Primary Branches**: Both the monorepo and components must have `master` and `dev` branches.
- **State Synchronization**:
  - `master` (Monorepo) == Latest `master` (Components)
  - `dev` (Monorepo) == Latest `dev` (Components)
- **Feature Isolation**:
  - Components carry their own `feature/*` branches.
  - The monorepo MUST NOT have feature branches. It is purely an integration and collection host.

## Commit and Versioning Standards

To maintain a professional mono-repo state:

1.  **Conventional Commits**: All commits must use the `<type>(<scope>): <description>` format.
    -   Encourage clear scoping: `feat(Button): ...`, `docs(Tree): ...`, `fix(core): ...`.
2.  **Changesets**: Use `pnpm changeset` for every pull request/feature that includes a user-facing change.
    -   Release management and changelog generation are driven by Changesets.

## Dependency Management

- **Shared Logic**: If multiple components require the same non-component logic (e.g., unit conversion, data formatting), it should be moved to `src/lib/utils.ts` or a dedicated shared internal component.
- **External Dependencies**: Since this is a library, avoid excessive and redundant dependencies. Prefer devDependencies for tools and peerDependencies for runtime requirements (like Svelte itself).

## Verification Workflow

Even when working on a single component, the agent must ensure that changes do NOT break the monorepo's integrity. Always run `pnpm check` and `pnpm build` across the entire project before finalizing a component's work.
