# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/management_lock

resource "azurerm_management_lock" "management_lock" {
  name       = var.lock_name
  scope      = var.resource_id
  lock_level = var.lock_level
  notes      = var.lock_reason
}
