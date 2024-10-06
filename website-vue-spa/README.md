## My Developer Website Frontend Vue SPA

[![Build Status](https://dev.azure.com/rimazmohommed523/Rimaz%20-%20Website/_apis/build/status%2Frimaz523.rimaz-website-vue?branchName=master)](https://dev.azure.com/rimazmohommed523/Rimaz%20-%20Website/_build/latest?definitionId=25&branchName=master)

## Description

This is the frontend of my dev website created using Vue 3.
Site URL : <https://vue.rimaz.dev>

### Technologies & Tools used in the front-end single page web application include

- Vue ^3.4.29
- Yarn v1.22.19
- Node v20.11.1 LTS
- NPM v10.2.4
- CI/CD using Azure DevOps

### Installation Instructions

- Clone the project locally
- Install dependencies
  - `yarn install`
- Start the application
  - `yarn dev`

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
yarn build

# Runs the end-to-end tests
yarn test:e2e
# Runs the tests only on Chromium
yarn test:e2e --project=chromium
# Runs the tests of a specific file
yarn test:e2e tests/example.spec.ts
# Runs the tests in debug mode
yarn test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
