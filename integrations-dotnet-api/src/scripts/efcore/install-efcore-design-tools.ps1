Write-Host "Installing Efcore Design & Tools nuget packages" -ForegroundColor Green
dotnet add  ..\..\Infrastructure\Infrastructure.csproj package Microsoft.EntityFrameworkCore.Tools
dotnet add  ..\..\WebApi\WebApi.csproj package Microsoft.EntityFrameworkCore.Design

Write-Host "Installing dotnet-ef globally" -ForegroundColor Green
dotnet tool install --global dotnet-ef
