# service plan
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/app_service_plan

resource "azurerm_service_plan" "asp" {
  name                = lower("${var.project}-${var.environment}-${var.app_service_os}-asp")
  resource_group_name = var.resource_group_name
  location            = var.location
  sku_name            = var.app_service_sku
  os_type             = var.app_service_os
}
