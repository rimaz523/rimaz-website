# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the monorepo for the developer blog at https://rimaz.dev. It contains five independent sub-projects, each with its own build tooling, Azure DevOps pipeline (`devops/azure-pipelines.yml`), and README. There is no top-level build — each sub-project is built and deployed separately.

| Directory | Stack | Deployed to |
| --- | --- | --- |
| `website-react-spa` | React 18 + MUI + Redux Toolkit (CRA) | https://react.rimaz.dev |
| `website-angular-spa` | Angular 20 (standalone + signals) | https://angular.rimaz.dev — also serves `rimaz.dev` / `www.rimaz.dev` |
| `website-vue-spa` | Vue 3 + Pinia + Vite | https://vue.rimaz.dev |
| `integrations-dotnet-api` | .NET 10 Web API (Clean Architecture) | https://api.rimaz.dev, fronted by APIM |
| `terraform-infra` | Terraform (Azure) | all cloud infrastructure |

CI/CD is **Azure DevOps Pipelines**, not GitHub Actions (`.github/workflows` is empty). Each sub-project's pipeline definition lives in its `devops/` folder (`steps/` for build/deploy, `variables/` for per-environment values).

Frontends don't call the API directly. They go through Azure API Management and send an `Ocp-Apim-Subscription-Key` header (React: `REACT_APP_INTEGRATIONS_APIM_URL` / `REACT_APP_APIM_KEY`). The APIM policy whitelists `localhost:4200` (Angular) and `localhost:3000` (React) for local dev.

The `.claude/` folder has per-sub-project reviewer agents and skills. `review-changes` sends each touched sub-project to its reviewer.

## Commands

All frontend commands run from inside the respective sub-project directory.

### website-react-spa (Yarn — uses `yarn@1.22.19`)
- `yarn install` — install deps
- `yarn start` — dev server
- `yarn build` — production build
- `yarn test` — run tests (react-scripts/Jest). For a single test: `yarn test src/path/to/file.test.js`
- `yarn lint` / `yarn lint:fix` — ESLint
- `yarn format` — Prettier
- `yarn storybook` — Storybook on port 6006
- Requires a `.env.development` file in the project root (values are stored in Azure blob storage — see the project README).

### website-angular-spa (npm)
- `npm install`
- `npm start` / `ng serve` — dev server at http://localhost:4200
- `ng build`
- `ng test` — Karma + Jasmine. Single spec: `ng test --include='**/my.component.spec.ts'`
- `npm run lint` / `ng lint`
- `src/environments/environment.ts` is **not** the deployed config: the pipeline replaces it with a secure file from the Azure DevOps library.
- `scripts/ng_run_local_setup.ps1` starts the full local stack in separate `pwsh` windows: the .NET API, `npm start`, Azurite (blob emulator, installed globally via npm), and the `InitTool` blob seeder.

### website-vue-spa (Yarn + Vite — has a `yarn.lock`)
- `yarn install`, `yarn dev` — Vite dev server
- `yarn build` — runs `vue-tsc` type-check and `vite build` in parallel
- `yarn test:unit` — Vitest. Single file: `yarn test:unit src/path/to/file.spec.ts`
- `yarn test:e2e` — Playwright (run `npx playwright install` first; `yarn test:e2e --project=chromium` for a single browser)
- `yarn type-check` / `yarn format`
- `yarn lint` runs ESLint **with `--fix`**, so it rewrites files.

### integrations-dotnet-api (.NET 10)
- `dotnet build integrations-dotnet-api.sln` (from the project root)
- `dotnet run --project src/WebApi` — runs the API; Swagger at https://localhost:7026/swagger/index.html
- EF Core migrations are wrapped in PowerShell scripts under `src/scripts/efcore/` (run from that directory):
  - `./add-database-migration.ps1 <MigrationName>` — adds a migration against `ApplicationDbContext`
  - `./run-database-update.ps1` — applies migrations to the database
  - These scripts install/uninstall the `dotnet-ef` design tools around the operation; don't call `dotnet ef` directly unless you replicate the `--project src/Infrastructure --startup-project src/WebApi --context ApplicationDbContext` arguments.
- There is no test project in the solution.
- `tools/InitTool` is a standalone console app that uploads `BlobSeedData/` (images for articles, blog previews and the app) to local Azurite (`UseDevelopmentStorage=true`). Start Azurite first, then run `dotnet run --project tools/InitTool`.
- When upgrading Swashbuckle, keep the CLI version in `src/.config/dotnet-tools.json` in sync with the version the WebApi uses.

### terraform-infra (run from the `terraform/` subdirectory)
- `../scripts/set_access_key.ps1` — Azure CLI login + sets the tfstate backend access key (run first)
- `terraform init -backend-config="key=dev.terraform.tfstate"`
- `terraform plan -out terraform.tfplan --var-file="dev.tfvars"`
- `terraform apply terraform.tfplan`
- `scripts/run_terraform_plan.ps1` runs the auth, init and plan steps above in one go.
- Pinned to Terraform v1.9.8.

## Architecture

### integrations-dotnet-api — Clean Architecture + CQRS
Four projects in `src/`, with dependencies pointing inward (`WebApi` → `Infrastructure` → `Application` → `Domain`):
- **Domain** — entities (`Entities/`) and enums; no dependencies.
- **Application** — use cases organized by feature (e.g. `Articles/Queries/GetArticle/`), each containing the MediatR request, its handler, a `*Validator` (FluentValidation), and a `*Dto`. Cross-cutting concerns live in `Common/`: MediatR pipeline `Behaviours/` (`LoggingBehaviour`, `ValidationBehaviour`), `Exceptions/`, AutoMapper `Mappings/` (DTOs implement `IMapFrom<T>`), and persistence/API-service interfaces under `Common/Interfaces/`.
- **Infrastructure** — implements the Application interfaces: EF Core `Persistence/` (`ApplicationDbContext` for SQL Server, `ApplicationCosmosDbContext` for Cosmos), outbound HTTP integrations in `ApiServices/` (WordPress, Logic App), and EF `Migrations/`. Options are bound via `IntegrationOptionsSetup`.
- **WebApi** — thin controllers inheriting `ApiControllerBase` (which exposes the MediatR `Sender`); they dispatch commands/queries rather than holding logic. `GlobalExceptionHandler` maps Application exceptions to ProblemDetails responses.
- Wiring is done through `AddApplication()` and `AddInfrastructure(configuration)` extension methods called in `Program.cs`. NuGet versions are centrally managed in `Directory.Packages.props` (central package management — add `<PackageVersion>` there, reference without a version in the csproj).
- The database is auto-initialised and seeded **only in the Development environment** (see `Program.cs`); CORS `AllowAllOrigins` is also dev-only.

### website-react-spa — Redux Toolkit + RTK Query
- State lives in `src/app/store.js` (configured with redux-persist).
- Feature slices are under `src/features/` — e.g. `integrations/integrations-api-slice.js` is the RTK Query API slice that talks to the .NET backend; `theme/themeSlice.js` holds UI state.
- `src/pages/`, `src/components/`, and `src/themes/` hold routed pages, shared components, and MUI theming. Storybook stories are in `src/stories/`.
- A Husky pre-commit hook runs `lint-staged` (Prettier + ESLint).

### website-angular-spa
- Standard Angular 20 layout: `src/app/{core,features,shared}`. Uses standalone components and signals.
- **Follow the conventions in `docs/angular-best-practices.md`** (Angular v20+ idioms: signals, `input()`/`output()`, new control flow). Uses MSAL for auth.

### terraform-infra
- The root config in `terraform/` has one `.tf` file per Azure resource (`api_management.tf`, `cosmosdb.tf`, `linux_web_app.tf`, `key_vault.tf`, etc.). Each file calls a module with `for_each` over a `map(object)` variable. `main.tf` is effectively empty. To add an instance of a resource, add an entry to that variable's map; you rarely need a new resource block.
- **Two sources of variable values:** defaults in `variables.tf` contain `#{token}#` placeholders, which the pipeline fills in using the `replacetokens` task. `dev.tfvars` holds the real values for local runs. When adding a variable, update both.
- Reusable modules live in `terraform/modules/` grouped by concern (`compute`, `core`, `integration`, `management`, `monitor`, `networking`, `security`, `storage`).
- Provisions the full stack: App Services, API Management (frontends sit behind APIM/Cloudflare), Cosmos DB, SQL Server, Key Vault, CDN, and App Insights availability tests/alerts. State is stored in an Azure storage backend (`dev.terraform.tfstate`).
- terraform-docs (`terraform/tfdocs-config.yml`) generates the section of `terraform-infra/README.md` between the `BEGIN_TF_DOCS`/`END_TF_DOCS` markers. Don't hand-edit that section.
