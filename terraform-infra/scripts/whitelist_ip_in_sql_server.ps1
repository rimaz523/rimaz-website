az login
$ipAddress = (Invoke-WebRequest -uri "https://ifconfig.me/ip").Content
az sql server firewall-rule create -g rimaz-data-dev-rg -s rimaz-dev-app-db-server -n whitelist-local-machine --start-ip-address $ipAddress --end-ip-address $ipAddress
