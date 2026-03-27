# Svelte Component Library

This is a **Vite + Svelte 5 component monorepo**.

## Architecture: Component-as-a-Repo

The project follows a "Component-as-a-Repo" architecture. Every component in `src/components/` is treated as an independent, standalone repository within the mono-repo.

- **Self-contained folders**: Implementation, types, sub-components, stories, documentation, and tests all reside together.
- **Independent but integrated**: While each component is a separate unit, they are part of a unified library and can depend on each other through defined public export paths.
- **Centralized Export**: All public components are exported through `src/components/index.ts` and eventually `src/lib/index.ts`.

Read more about creating a library [in the docs](https://svelte.dev/docs/kit/packaging).

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
