az login
$ipAddress = (Invoke-WebRequest -uri "https://ifconfig.me/ip").Content

Write-Host "Update SQL server firewall" -ForegroundColor Green
az sql server firewall-rule create -g rimaz-data-dev-rg -s rimaz-dev-app-db-server -n whitelist-local-machine --start-ip-address $ipAddress --end-ip-address $ipAddress

Write-Host "Update Cosmos firewall" -ForegroundColor Green
az cosmosdb show -n rimaz-dev-app-cosmosdb-account -g rimaz-data-dev-rg --query "ipRules" --output tsv >> temp.txt
$whitelist_ips = ""
foreach($line in Get-Content .\temp.txt) {
  if ($ipAddress -ne $line) {
    $whitelist_ips += $line + ","
  }
}
$whitelist_ips += $ipAddress
Write-Host $whitelist_ips
az cosmosdb update --name rimaz-dev-app-cosmosdb-account --resource-group rimaz-data-dev-rg --ip-range-filter "$whitelist_ips"
Remove-Item .\temp.txt

Write-Host "Success!" -ForegroundColor Green