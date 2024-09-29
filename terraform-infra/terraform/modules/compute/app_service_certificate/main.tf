resource "azurerm_app_service_certificate" "app_ssl_cert" {
  name                = var.app_ssl_cert_name
  resource_group_name = var.resource_group_name
  location            = var.location
  key_vault_secret_id = var.ssl_cert_kv_secret_id
}
