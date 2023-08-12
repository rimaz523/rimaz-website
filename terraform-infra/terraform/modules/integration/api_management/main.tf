# api_management
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management

resource "azurerm_api_management" "apim" {
  name                = lower("${var.project}-${var.environment}-${var.name}-apim")
  location            = var.location
  resource_group_name = var.resource_group_name
  publisher_name      = var.company_name
  publisher_email     = var.company_email
  sku_name            = var.sku
}
