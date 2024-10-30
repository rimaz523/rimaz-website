& .\version-check.ps1
& .\install-efcore-design-tools.ps1

Write-Host "Update Database" -ForegroundColor Green
dotnet ef database update --project ..\..\WebApi\WebApi.csproj --context ApplicationDbContext

& .\uninstall-efcore-design-tools.ps1
