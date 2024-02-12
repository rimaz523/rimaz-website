Write-Host "Checking dotnet verion..." -ForegroundColor Green
dotnet --version
Write-Host "Checking nuget version..." -ForegroundColor Green
nuget help | select-object -first 1
