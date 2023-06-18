# linux_web_app
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app

resource "azurerm_linux_web_app" "webapp_linux" {
  name                = lower("${var.project}-${var.environment}-${var.stack}-${var.name}")
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = var.service_plan_id
  https_only          = true

  site_config {
    always_on        = true
    app_command_line = var.stack == "node" ? "pm2 serve /home/site/wwwroot --spa --no-daemon" : null

    application_stack {
      dotnet_version = var.stack == "dotnet" ? var.stack_version : null
      node_version   = var.stack == "node" ? var.stack_version : null
    }
  }
}

resource "azurerm_app_service_custom_hostname_binding" "custom_domain_main" {
  hostname            = "rimaz.dev"
  app_service_name    = azurerm_linux_web_app.webapp_linux.name
  resource_group_name = var.resource_group_name

  # Ignore ssl_state and thumbprint as they are managed using azurerm_app_service_certificate_binding
  lifecycle {
    ignore_changes = [ssl_state, thumbprint]
  }
}

resource "azurerm_app_service_custom_hostname_binding" "custom_domain_www" {
  hostname            = "www.rimaz.dev"
  app_service_name    = azurerm_linux_web_app.webapp_linux.name
  resource_group_name = var.resource_group_name

  # Ignore ssl_state and thumbprint as they are managed using azurerm_app_service_certificate_binding
  lifecycle {
    ignore_changes = [ssl_state, thumbprint]
  }
}

data "azurerm_key_vault" "rimaz_kv" {
  name                = "rimaz-kv"
  resource_group_name = "rimaz-admin-rg"
}

data "azurerm_key_vault_certificate" "pfx_cert" {
  name         = "rimaz-dev-pfx-cert"
  key_vault_id = data.azurerm_key_vault.rimaz_kv.id
}

resource "azurerm_app_service_certificate" "app_ssl_cert" {
  name                = "rimaz_ssl_cert"
  resource_group_name = var.resource_group_name
  location            = var.location
  key_vault_secret_id = data.azurerm_key_vault_certificate.pfx_cert.secret_id
}

resource "azurerm_app_service_certificate_binding" "domain_binding" {
  hostname_binding_id = azurerm_app_service_custom_hostname_binding.custom_domain_main.id
  certificate_id      = azurerm_app_service_certificate.app_ssl_cert.id
  ssl_state           = "IpBasedEnabled"
}

resource "azurerm_app_service_certificate_binding" "www_binding" {
  hostname_binding_id = azurerm_app_service_custom_hostname_binding.custom_domain_www.id
  certificate_id      = azurerm_app_service_certificate.app_ssl_cert.id
  ssl_state           = "SniEnabled"
}
