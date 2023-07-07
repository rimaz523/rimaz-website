# key_vault
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/key_vault

resource "azurerm_key_vault" "app_kv" {
  name                      = lower("${var.project}-${var.environment}-${var.name}-kv")
  location                  = var.location
  resource_group_name       = var.resource_group_name
  tenant_id                 = var.tenant_id
  sku_name                  = var.sku
  enable_rbac_authorization = true
}
