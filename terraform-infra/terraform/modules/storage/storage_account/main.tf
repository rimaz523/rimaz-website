# storage_account
# https://registry.terraform.io/providers/hashicorp/azurerm/1.44.0/docs/resources/storage_account

resource "azurerm_storage_account" "app_store" {
  name                      = lower("${var.project}${var.environment}${var.name}store")
  resource_group_name       = var.resource_group_name
  location                  = var.location
  account_tier              = var.sku
  account_replication_type  = var.replication_type
  enable_https_traffic_only = true
}
