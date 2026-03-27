# Code Style

## Svelte 5 Runes

Always use Svelte 5 runes — never use legacy `export let`, `$:`, or `createEventDispatcher`.

```svelte
<script lang="ts">
  let { prop = 'default', class: className = '', ...rest }: ComponentProps = $props();
  const derivedClass = $derived.by(() => `base-class ${className}`);
  let internalState = $state(false);
</script>
```

- `$props()` — destructure all props, including `class` aliased to `className`
- `$derived` / `$derived.by` — for computed values, especially class strings
- `$state` — for internal reactive state
- `$effect` — only for DOM side-effects with cleanup

## TypeScript

- Strict mode is enabled — no implicit `any`
- Define a `{ComponentName}Props` interface in `{ComponentName}.ts`, extending `HTMLAttributes` or the relevant element type where appropriate
- Export all public types from `src/lib/index.ts`
- Use union types for constrained props (e.g., `type ButtonVariant = 'filled' | 'outlined' | 'text'`)

## TailwindCSS v4

- All styling via Tailwind utility classes — no inline styles, no CSS modules
- Design tokens are defined in `src/routes/layout.css` under `@theme`
- Dark mode uses the `.dark` class (not `prefers-color-scheme`)
- Use `class:` directive or `$derived` class strings — avoid manual string concatenation where possible

## Formatting

Enforced by Prettier (`.prettierrc`):
- **Tabs** for indentation (not spaces)
- **Single quotes**
- **100 character** print width
- Svelte and Tailwind plugins active — run `pnpm format` before committing
