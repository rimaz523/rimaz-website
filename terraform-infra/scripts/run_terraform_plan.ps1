Write-Host "Login to Az cli and set access key to tfstate store" -ForegroundColor Green
& .\set_access_key.ps1

Write-Host "Move to terraform dir & list" -ForegroundColor Green
cd ..\terraform\
ls

Write-Host "Initialize terraform and plan" -ForegroundColor Green
terraform init -backend-config="key=dev.terraform.tfstate"
terraform plan -out terraform.tfplan --var-file="dev.tfvars"
