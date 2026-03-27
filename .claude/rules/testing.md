# Testing

## Framework

- **Unit/Component tests:** Vitest + `vitest-browser-svelte` (runs in real Chromium via Playwright)
- **E2E tests:** Playwright (`pnpm test:e2e`)
- **Coverage:** V8 provider, 80% threshold on lines, branches, functions, and statements

## File Conventions

```
src/components/{Component}/tests/
  {Component}.svelte.test.ts       # Main test file
  {Component}*Fixture.svelte       # Fixture component for complex interaction tests
```

## Writing Tests

Use `vitest-browser-svelte` `render()` for all component tests. Props are passed **directly as the second argument** (not nested under `props:`):

```typescript
import { render } from 'vitest-browser-svelte';
import { expect, it, describe } from 'vitest';
import Component from '../Component.svelte';

describe('Component', () => {
  it('renders with default props', async () => {
    const screen = render(Component, { label: 'Test' });
    await expect.element(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

- Use `screen.getByRole`, `screen.getByText`, `screen.getByTestId` for queries
- Prefer `await expect.element(...)` (async assertions for browser DOM)
- Use fixture `.svelte` files to test snippet/slot content or complex interaction scenarios
- Cover: default render, all variants/sizes, keyboard interaction, ARIA attributes, dark mode classes

## Coverage

Run `pnpm test:coverage` to verify thresholds. CI enforces ≥ 80% on all four metrics.
New components must include tests before being merged.

## Suppressing Coverage Noise

The coverage provider is **V8** (`provider: 'v8'`). Use `/* v8 ignore next */` directives — **not** `/* istanbul ignore next */`, which has no effect with this provider.

**Script section** — place the comment on the line immediately before the declaration:

```svelte
<script lang="ts">
  /* v8 ignore next */
  const _trackCls = $derived(checked ? activeClass[color] : 'bg-gray-300');
</script>
```

**Template** — wrap unreachable branches in `{/* v8 ignore start */ ''}` / `{/* v8 ignore stop */ ''}`:

```svelte
{/* v8 ignore start */ ''}
<svg class="...">...</svg>
{/* v8 ignore stop */ ''}
```
