Write-Host "Login to Az cli and set access key to tfstate store" -ForegroundColor Green
& .\set_access_key.ps1

Write-Host "Destroy the Apim api so that terraform can recreate it using the updated swagger file"
az apim api delete -g rimaz-common-dev-rg -n rimaz-dev-backend-apim --api-id rimaz-backend-dev-api -y
