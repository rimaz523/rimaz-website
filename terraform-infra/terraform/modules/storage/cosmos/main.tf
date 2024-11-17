# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cosmosdb_account

resource "azurerm_cosmosdb_account" "cosmosdb_account" {
  name                       = lower("${var.project}-${var.environment}-${var.name}-cosmosdb-account")
  location                   = var.location
  resource_group_name        = var.resource_group_name
  offer_type                 = "Standard"
  kind                       = var.kind
  automatic_failover_enabled = false

  geo_location {
    location          = var.location
    failover_priority = 0
  }

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 5
    max_staleness_prefix    = 100
  }

  capabilities {
    name = "EnableServerless"
  }

  ip_range_filter = distinct(concat(var.whitelist_ip_addresses, ["104.42.195.92", "40.76.54.131", "52.176.6.30", "52.169.50.45", "52.187.184.26", "13.88.56.148", "40.91.218.243", "13.91.105.215", "4.210.172.107"])) // Appending azure public IP to whitelist in cosmos firewall for access via portal (see : https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-configure-firewall#azure-public)
}

resource "azurerm_cosmosdb_sql_database" "cosmosdb_sql_database" {
  name                = lower("${var.name}-cosmos-sql-db")
  resource_group_name = var.resource_group_name
  account_name        = azurerm_cosmosdb_account.cosmosdb_account.name
}

resource "azurerm_cosmosdb_sql_container" "cosmosdb_sql_container" {
  for_each = var.containers

  name                  = each.key
  resource_group_name   = var.resource_group_name
  account_name          = azurerm_cosmosdb_account.cosmosdb_account.name
  database_name         = azurerm_cosmosdb_sql_database.cosmosdb_sql_database.name
  partition_key_paths   = [each.value.partition_key]
  partition_key_version = 1
}

