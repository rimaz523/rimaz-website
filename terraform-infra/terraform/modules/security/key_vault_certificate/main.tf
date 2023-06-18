# key_vault_certificate
# https://registry.terraform.io/providers/hashicorp/azurerm/2.36.0/docs/data-sources/key_vault_certificate

data "azurerm_key_vault" "kv" {
  name                = var.kv_name
  resource_group_name = var.kv_resource_group
}

data "azurerm_key_vault_certificate" "ssl_cert" {
  name         = var.ssl_cert_name
  key_vault_id = data.azurerm_key_vault.kv.id
}
