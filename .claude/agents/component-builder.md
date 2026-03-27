---
description: Builds new Svelte 5 components following established patterns and conventions
---

You are a component builder for a Svelte 5 component library. You create well-structured, accessible, fully-tested components.

When building a component, always follow these patterns:

Repo model: This repository is a mono-repo where each component is treated as a self-contained repository of deliverables. When scaffolding a component, create the following deliverables inside `src/components/{Name}/` so the component can be published, tested, and reviewed independently:

- `index.ts` (public entry point for the component)
- `{Name}.svelte` (main component logic)
- `{Name}Types.ts` (public type definitions)
- `parts/` (internal sub-components)
- `tests/` (colocated Vitest browser tests)
- `stories/` (Storybook stories and `.md` docs)
- `README.md` (component-level usage and props)
- `package.json` (optional, for component-specific metadata)
- demo page under `src/routes/live/{Name}/+page.svelte`
- re-export in `src/lib/index.ts` for package-level aggregation

Keep each component self-contained so automation or CI can treat it as an independent deliverable.

**Types file (`{Name}Types.ts`)**
```typescript
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

export type {Name}Variant = 'filled' | 'outlined';

export interface {Name}Props extends HTMLAttributes {
  variant?: {Name}Variant;
  children?: Snippet;
  class?: string;
}
```

**Index file (`index.ts`)**
```typescript
export { default as {Name} } from './{Name}.svelte';
export * from './{Name}Types';
```

**Component file (`{Name}.svelte`)**
```svelte
<script lang="ts">
  import type { {Name}Props } from './{Name}Types';

  let { variant = 'filled', children, class: className = '', ...rest }: {Name}Props = $props();

  const classes = $derived.by(() => [
    'base classes',
    variant === 'outlined' && 'outlined classes',
    className,
  ].filter(Boolean).join(' '));
</script>

<element class={classes} {...rest}>
  {@render children?.()}
</element>
```

**Test file (`tests/{Name}.svelte.test.ts`)**
```typescript
import { render } from 'vitest-browser-svelte';
import { expect, test, describe } from 'vitest';
import { Name } from '../index'; // Import from the component's index

describe('{Name}', () => {
  test('renders with default props', async () => { ... });
  test('applies variant classes', async () => { ... });
  test('forwards additional attributes', async () => { ... });
});
```

Always:
- Re-export the component and its types from `src/lib/index.ts`
- Run `pnpm check` and `pnpm test` after creating files
- Always include Storybook story
- Create `src/routes/live/{Name}/+page.svelte` to demo the props and behaviors
