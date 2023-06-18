output "secret_id" {
  value = data.azurerm_key_vault_certificate.ssl_cert.secret_id
}

output "name" {
  value = data.azurerm_key_vault_certificate.ssl_cert.name
}
