output "kv_secret_value" {
  value     = data.azurerm_key_vault_secret.secret.value
  sensitive = true
}

output "kv_secret_id" {
  value = data.azurerm_key_vault_secret.secret.id
}
