---
description: "Review component command — run component review checklist"
---

# Review Component

Review the component specified by the user (or the most recently modified component) for:

1. **Architecture** — does it follow the component-as-a-repo structure (including `index.ts`, `Types.ts`, `parts/`, `stories/`, `tests/`)?
2. **Conventions** — does it follow `.claude/rules/api-conventions.md`? (Props interface, Snippet usage, spread `...rest`, re-exports in `src/lib/index.ts`)
3. **Code style** — does it use Svelte 5 runes correctly? (`$props`, `$derived`, `$state`). Is it Prettier-compliant?
4. **TailwindCSS** — are styles using utility classes only? Are dark mode classes present where needed?
5. **Accessibility** — semantic elements, ARIA attributes, keyboard support
6. **Tests** — does a test file exist in the colocated `tests/` directory? Do tests cover variants, interactions, and ARIA attributes? Is the 95% coverage threshold met?
7. **Storybook** — does a `.stories.ts` or `.md` file exist in the colocated `stories/` directory?

Report findings as a checklist. Flag any blockers (missing tests, broken exports, non-rune patterns) separately from suggestions.

$ARGUMENTS
