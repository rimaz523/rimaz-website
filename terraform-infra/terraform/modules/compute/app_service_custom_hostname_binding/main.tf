# app_service_custom_hostname_binding
# https://registry.terraform.io/providers/hashicorp/azurerm/2.36.0/docs/resources/app_service_custom_hostname_binding

resource "azurerm_app_service_custom_hostname_binding" "custom_domain" {
  hostname            = var.custom_domain
  app_service_name    = var.web_app_name
  resource_group_name = var.app_resource_group

  # Ignore ssl_state and thumbprint as they are managed using azurerm_app_service_certificate_binding
  lifecycle {
    ignore_changes = [ssl_state, thumbprint]
  }
}

resource "azurerm_app_service_certificate_binding" "domain_ssl_binding" {
  hostname_binding_id = azurerm_app_service_custom_hostname_binding.custom_domain.id
  certificate_id      = var.certificate_id
  ssl_state           = var.ssl_state
}
