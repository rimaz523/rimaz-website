Write-Host "Starting Dotnet core API" -ForegroundColor Green

Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'dotnet run --project "..\..\integrations-dotnet-api\src\WebApi\WebApi.csproj"'

Write-Host "Starting Angular frontend" -ForegroundColor Green
Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'npm start --prefix "..\..\website-angular-spa"'

Write-Host "Running Azurite" -ForegroundColor Green

Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'azurite -s -l c:\azurite -d c:\azurite\debug.log'

# Give the azurite 30 seconds to boot up
Start-Sleep -Seconds 30

Write-Host "Seeding local storage" -ForegroundColor Green

Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'dotnet run --project "..\..\integrations-dotnet-api\tools\InitTool\InitTool.csproj"'

# Give the apps 10 seconds to boot up
Start-Sleep -Seconds 10

Write-Host "Opening Angular frontend in chrome" -ForegroundColor Green
Start-Process "chrome.exe" "http://localhost:4200/"

Write-Host "Open project in VSCode" -ForegroundColor Green
cd .. && code .

Write-Host "Success!" -ForegroundColor Green
