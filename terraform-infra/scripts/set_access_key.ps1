az login
az account set --subscription "Rimaz"
$env:ARM_ACCESS_KEY = $(az storage account keys list -g rimaz-admin-rg -n rmzadminstore --query [0].value -o tsv)
