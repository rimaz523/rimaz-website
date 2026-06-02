# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the monorepo for the developer blog at https://rimaz.dev. It contains five independent sub-projects, each with its own build tooling, Azure DevOps pipeline (`devops/azure-pipelines.yml`), and README. There is no top-level build — each sub-project is built and deployed separately.

| Directory | Stack | Deployed to |
| --- | --- | --- |
| `website-react-spa` | React 18 + MUI + Redux Toolkit (CRA) | https://rimaz.dev (primary frontend) |
| `website-angular-spa` | Angular 20 (standalone + signals) | https://angular.rimaz.dev |
| `website-vue-spa` | Vue 3 + Pinia + Vite | https://vue.rimaz.dev |
| `integrations-dotnet-api` | .NET 10 Web API (Clean Architecture) | backend API for all frontends |
| `terraform-infra` | Terraform (Azure) | all cloud infrastructure |

CI/CD is **Azure DevOps Pipelines**, not GitHub Actions (`.github/workflows` is empty). Each sub-project's pipeline definition lives in its `devops/` folder.

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

### website-vue-spa (npm + Vite)
- `npm run dev` — Vite dev server
- `npm run build`
- `npm run test:unit` — Vitest. Single file: `npm run test:unit -- src/path/to/file.spec.ts`
- `npm run test:e2e` — Playwright
- `npm run type-check` / `npm run lint` / `npm run format`

### integrations-dotnet-api (.NET 10)
- `dotnet build integrations-dotnet-api.sln` (from the project root)
- `dotnet run --project src/WebApi` — runs the API; Swagger at https://localhost:7026/swagger/index.html
- EF Core migrations are wrapped in PowerShell scripts under `src/scripts/efcore/` (run from that directory):
  - `./add-database-migration.ps1 <MigrationName>` — adds a migration against `ApplicationDbContext`
  - `./run-database-update.ps1` — applies migrations to the database
  - These scripts install/uninstall the `dotnet-ef` design tools around the operation; don't call `dotnet ef` directly unless you replicate the `--project src/Infrastructure --startup-project src/WebApi --context ApplicationDbContext` arguments.

### terraform-infra (run from the `terraform/` subdirectory)
- `../scripts/set_access_key.ps1` — Azure CLI login + sets the tfstate backend access key (run first)
- `terraform init -backend-config="key=dev.terraform.tfstate"`
- `terraform plan -out terraform.tfplan --var-file="dev.tfvars"`
- `terraform apply terraform.tfplan`
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
- Root config in `terraform/` is split per-resource (one `.tf` file per Azure resource: `api_management.tf`, `cosmosdb.tf`, `linux_web_app.tf`, `key_vault.tf`, etc.) and composed via `main.tf`.
- Reusable modules live in `terraform/modules/` grouped by concern (`compute`, `core`, `integration`, `management`, `monitor`, `networking`, `security`, `storage`).
- Provisions the full stack: App Services, API Management (frontends sit behind APIM/Cloudflare), Cosmos DB, SQL Server, Key Vault, CDN, and App Insights availability tests/alerts. State is stored in an Azure storage backend (`dev.terraform.tfstate`).
