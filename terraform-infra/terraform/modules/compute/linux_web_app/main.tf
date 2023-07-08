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

  identity {
    type = "SystemAssigned"
  }

  lifecycle {
    ignore_changes = [
      app_settings
    ]
  }
}

resource "azurerm_app_service_certificate" "app_ssl_cert" {
  name                = var.app_ssl_cert_name
  resource_group_name = var.resource_group_name
  location            = var.location
  key_vault_secret_id = var.ssl_cert_kv_secret_id
}
