# Component API Conventions

src/components/{ComponentName}/
  index.ts                        # Re-exports implementation and types
  {ComponentName}.svelte          # Main component logic
  {ComponentName}Types.ts         # Public type definitions
  parts/                          # Internal sub-components
  stories/                        # Storybook files
  tests/                          # Colocated Vitest tests

## Public Interface

Every component MUST have an `index.ts` that acts as its public API. All code requiring this component should import from this file.

```typescript
// src/components/{ComponentName}/index.ts
export { default as {ComponentName} } from './{ComponentName}.svelte';
export * from './{ComponentName}Types';
```

## Props Interface

Define in `{ComponentName}Types.ts` and aggregate directly in `src/lib/index.ts`:

```typescript
// src/lib/index.ts
export * from '../components/{ComponentName}/index.js';
```

```typescript
// src/components/{ComponentName}/ButtonTypes.ts
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
```

- Always extend the relevant `HTML*Attributes` type for native element passthrough
- Use `Snippet` (not slots) for injectable content: `children`, `startIcon`, `endIcon`, etc.
- Include `class?: string` to allow class customization from the outside
- Spread `...rest` onto the root element for full attribute passthrough

## Component Template

```svelte
<script lang="ts">
  import type { ComponentProps } from './Component.ts';

  let { variant = 'filled', children, class: className = '', ...rest }: ComponentProps = $props();

  const classes = $derived.by(() => [
    'base-classes',
    variant === 'outlined' && 'outline-classes',
    className,
  ].filter(Boolean).join(' '));
</script>

<element class={classes} {...rest}>
  {@render children?.()}
</element>
```

## Exports

All public components and types must be re-exported directly from `src/lib/index.ts`. **Do not** use a central `src/components/index.ts`.

## Accessibility

- Use semantic HTML elements or appropriate ARIA roles
- Include `aria-label` or `aria-labelledby` where content is not self-describing
- Support keyboard interaction (focus, Enter/Space for interactive elements)
- Respect `disabled` and `aria-busy` states where applicable
