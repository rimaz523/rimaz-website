Write-Host "Starting Dotnet core API" -ForegroundColor Green
Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'cd ..\..\integrations-dotnet-api\src\WebApi; dotnet run --project "WebApi.csproj"'

Write-Host "Starting Angular frontend" -ForegroundColor Green
Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'cd ..\..\website-angular-spa; npm start'

Write-Host "Running Azurite" -ForegroundColor Green
Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'azurite -s -l c:\azurite -d c:\azurite\debug.log'

# Give the azurite 30 seconds to boot up
Start-Sleep -Seconds 30

Write-Host "Seeding local storage" -ForegroundColor Green
Start-Process pwsh -ArgumentList '-NoExit', '-Command', 'cd ..\..\integrations-dotnet-api\tools\InitTool; dotnet run --project "InitTool.csproj"'

# Give the apps 10 seconds to boot up
Start-Sleep -Seconds 10

Write-Host "Opening Angular frontend in chrome" -ForegroundColor Green
Start-Process "chrome.exe" "http://localhost:4200/"

Write-Host "Open project in VSCode" -ForegroundColor Green
cd .. && code .

Write-Host "Success!" -ForegroundColor Green
