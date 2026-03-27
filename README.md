# Svelte Component Library (SC Mono)

Welcome to the **SC Mono**, a professional-grade UI library built with **Svelte 5** and **Tailwind CSS v4**.

This repository is designed as a **high-fidelity component monorepo** where every component is treated as an independent deliverable.

---

## 🏛️ Architecture: Component-as-a-Repo

The core philosophy of this project is high cohesion and self-containment. Each directory under `src/components/` acts as an independent repository within the monorepo:

- **Isolated Folders**: Every component contains its own:
  - `index.ts` (Public API)
  - `MyComponent.svelte` (Implementation)
  - `MyComponentTypes.ts` (Type Definitions)
  - `tests/` (Vitest Browser Tests)
  - `stories/` (Storybook Documentation)
  - `README.md` (Component-specific usage)
- **Central aggregation**: Every component re-exports through their local `index.ts`, eventually collected in `src/lib/index.ts`.

---

## 🚀 Key Technologies

- **[Svelte 5](https://svelte.dev/docs/svelte/what-are-runes)**: Exclusively using **Runes** (`$props`, `$state`, `$derived`) for modern reactivity.
- **[Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)**: Using the CSS-first configuration engine.
- **[Vite 8](https://vite.dev/)**: For lightning-fast builds and dev serving.
- **[Vitest + Playwright](https://vitest.dev)**: For browser-based unit/component testing.
- **[Changesets](https://github.com/changesets/changesets)**: For automated versioning and changelog generation.

---

## 📖 Essential Documentation

To understand our detailed conventions and workflows, please refer to the following documents:

- **[CLAUDE.md](./CLAUDE.md)**: The primary manual for local environment setup, build commands, and architectural scope.
- **[Rules & Conventions](./.claude/rules/)**:
  - **[Monorepo Strategy](./.claude/rules/monorepo-architecture.md)**: Git branching, synchronization, and component integration logic.
  - **[API Conventions](./.claude/rules/api-conventions.md)**: How to structure component interfaces and exports.
  - **[Code Style](./.claude/rules/code-style.md)**: Standard runes and Tailwind patterns.
  - **[Testing Standards](./.claude/rules/testing.md)**: Coverage targets and testing methodologies.
- **[Changelog](./CHANGELOG.md)**: History of notable project additions and fixes.

---

## 🛠️ Getting Started

### 1. Prerequisites
Ensure you have [pnpm](https://pnpm.io) installed.

### 2. Installation
```bash
pnpm install
```

### 3. Development
```bash
pnpm dev
```

### 4. Testing
- Run all tests: `pnpm test`
- Coverage report: `pnpm test:coverage`
- Storybook: `pnpm storybook`

---

## 🌳 Branching & Workflow

This project uses a modified Git Flow strategy:
- **`master`** is production-ready.
- **`dev`** is the integration branch.
- **Feature development** occurs in component-specific repositories/branches.

**Important**: We use **Conventional Commits** (`feat(Button): description`) to automate versioning.

---

Read more about creating a library [in the official documentation](https://svelte.dev/docs/kit/packaging).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
pnpm dlx sv@0.13.0 create --template library --types ts --add prettier vitest="usages:unit,component" playwright tailwindcss="plugins:none" devtools-json mdsvex storybook --install pnpm .
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```sh
npm pack
```

To create a production version of your showcase app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```sh
npm publish
```
