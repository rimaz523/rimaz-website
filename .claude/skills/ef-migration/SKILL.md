---
name: ef-migration
description: Add or apply Entity Framework Core migrations for integrations-dotnet-api using the project's PowerShell wrapper scripts. Use when changing entities/DbContext or updating the database schema.
---

# EF Core migrations for integrations-dotnet-api

Migrations are managed through PowerShell wrapper scripts in `integrations-dotnet-api/src/scripts/efcore/`, **not** raw `dotnet ef` commands. The scripts install the `dotnet-ef` design tools, run the operation against `ApplicationDbContext` (SQL Server) with the correct project/startup-project paths, then uninstall the tools again.

All commands must be run **from inside** `integrations-dotnet-api/src/scripts/efcore/`.

## Add a migration

```powershell
./add-database-migration.ps1 <MigrationName>
```

- Pass a PascalCase name describing the change (e.g. `AddSlug`, `SocialHandlesAddDisplayOrder`) — see existing names in `src/Infrastructure/Migrations/`.
- The script errors out if no name is supplied.
- Generated files land in `src/Infrastructure/Migrations/`. Review the `Up`/`Down` methods before committing.

## Apply migrations to the database

```powershell
./run-database-update.ps1
```

## Notes

- These operate on `ApplicationDbContext` only. The Cosmos context (`ApplicationCosmosDbContext`) is not migration-managed.
- In the **Development** environment the database is auto-initialised and seeded on app startup (`Program.cs` → `ApplicationDbContextInitialiser`), so a fresh dev DB does not require a manual update.
- If you must run `dotnet ef` directly, replicate the script arguments: `--project ..\..\Infrastructure\Infrastructure.csproj --startup-project ..\..\WebApi\WebApi.csproj --context ApplicationDbContext`.
- NuGet versions are centrally managed in `Directory.Packages.props`; if you bump `Microsoft.EntityFrameworkCore.*`, keep all EF packages and the design tool version aligned.
