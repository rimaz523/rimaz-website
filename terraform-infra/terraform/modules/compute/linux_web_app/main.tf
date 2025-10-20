# linux_web_app
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_web_app

resource "azurerm_linux_web_app" "webapp_linux" {
  name                = lower("${var.project}-${var.environment}-${var.stack}-${var.name}")
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = var.service_plan_id
  https_only          = true

  site_config {
    always_on                     = var.always_on
    app_command_line              = var.stack == "node" ? "pm2 serve /home/site/wwwroot --spa --no-daemon" : null
    ip_restriction_default_action = var.name == "api" ? "Deny" : "Allow"

    application_stack {
      dotnet_version = var.stack == "dotnet" ? var.stack_version : null
      node_version   = var.stack == "node" ? var.stack_version : null
    }

    dynamic "ip_restriction" {
      for_each = var.stack == "dotnet" ? csvdecode(file("${path.root}/modules/compute/linux_web_app/ip_restrictions/apim_australiaeast_whitelist_ips.csv")) : []
      content {
        name       = ip_restriction.value.rule_name
        action     = ip_restriction.value.action
        ip_address = ip_restriction.value.ip_address
        priority   = ip_restriction.value.priority
      }
    }
  }

  identity {
    type = "SystemAssigned"
  }

  lifecycle {
    ignore_changes = [
      app_settings,
      site_config[0].application_stack[0].dotnet_version // Temporarily ignore dotnet version until dotnet 10 support is added in the provider
    ]
  }
}
