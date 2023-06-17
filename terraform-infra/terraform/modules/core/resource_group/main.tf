# resource group
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/data-sources/resource_group

resource "azurerm_resource_group" "rg" {
  location = var.location
  name     = lower("${var.project}-${var.name}-${var.environment}-rg")
}
