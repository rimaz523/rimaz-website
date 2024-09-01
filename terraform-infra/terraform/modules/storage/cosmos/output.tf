output "id" {
  value = azurerm_cosmosdb_account.cosmosdb_account.id
}

output "cosmos_app_endpoint" {
  value     = azurerm_cosmosdb_account.cosmosdb_account.endpoint
  sensitive = true
}

output "cosmos_app_read_only_key" {
  value     = azurerm_cosmosdb_account.cosmosdb_account.primary_readonly_key
  sensitive = true
}

output "cosmos_app_sql_database" {
  value = azurerm_cosmosdb_sql_database.cosmosdb_sql_database.name
}
