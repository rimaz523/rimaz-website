# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/data-sources/key_vault_secret

data "azurerm_key_vault" "secret_kv" {
  name                = var.kv_name
  resource_group_name = var.kv_resource_group
}

data "azurerm_key_vault_secret" "secret" {
  name         = var.secret_name
  key_vault_id = data.azurerm_key_vault.secret_kv.id
}
