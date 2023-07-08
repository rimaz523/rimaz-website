# key_vault_secret
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/key_vault_secret

resource "azurerm_key_vault_secret" "kv_secret" {
  name         = var.secret_name
  value        = var.secret_value
  key_vault_id = var.key_vault_id
}
