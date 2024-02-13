Write-Host "Uninstall dotnet-ef globally" -ForegroundColor Green
dotnet tool uninstall --global dotnet-ef

Write-Host "Uninstall Existing Efcore Design & Tools nuget packages" -ForegroundColor Green
dotnet remove  ..\..\Infrastructure\Infrastructure.csproj package Microsoft.EntityFrameworkCore.Tools
dotnet remove  ..\..\WebApi\WebApi.csproj package Microsoft.EntityFrameworkCore.Design
