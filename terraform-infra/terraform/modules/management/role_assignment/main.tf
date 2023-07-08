# role_assignment
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/role_assignment.html

resource "azurerm_role_assignment" "rbac_assignment" {
  for_each = toset(var.roles)

  scope                            = var.scope_id
  role_definition_name             = each.value
  principal_id                     = var.principal_id
  skip_service_principal_aad_check = var.skip_service_principal_aad_check
}
