$migrationName=$args[0]
write-host $migrationName

if (($migrationName -eq $null) -or ($migrationName -eq ""))
{
    Write-Host "Please enter a name migration name as argument. This Script is now Exiting." -ForegroundColor Red
}
else
{
    & .\version-check.ps1
    & .\install-efcore-design-tools.ps1

    Write-Host "Adding Migration $migrationName" -ForegroundColor Green
    dotnet ef migrations add $migrationName --project ..\..\Infrastructure\Infrastructure.csproj --startup-project ..\..\WebApi\WebApi.csproj

    & .\uninstall-efcore-design-tools.ps1
}
