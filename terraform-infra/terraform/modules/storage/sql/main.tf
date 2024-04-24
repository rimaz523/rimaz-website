# sql server
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/mssql_server

resource "azurerm_mssql_server" "sql_server" {
  name                         = lower("${var.project}-${var.environment}-${var.name}-db-server")
  resource_group_name          = var.resource_group_name
  location                     = var.location
  version                      = "12.0"
  administrator_login          = var.admin_login_name
  administrator_login_password = var.admin_login_password
  minimum_tls_version          = "1.2"

  azuread_administrator {
    login_username              = var.ms_entra_login_username
    object_id                   = var.ms_entra_login_object_id
    azuread_authentication_only = true
  }
}

resource "azurerm_mssql_database" "sql_db" {
  name                 = lower("${var.name}-db")
  server_id            = azurerm_mssql_server.sql_server.id
  collation            = "SQL_Latin1_General_CP1_CI_AS"
  max_size_gb          = 2
  min_capacity         = 0
  sku_name             = var.sku
  storage_account_type = "Local"
}

resource "azurerm_mssql_firewall_rule" "example" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.sql_server.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}
