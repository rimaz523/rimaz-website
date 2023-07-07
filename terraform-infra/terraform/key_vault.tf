module "key_vault" {
  source   = "./modules/security/key_vault"
  for_each = var.key_vaults

  name                = each.key
  resource_group_name = module.resource_group["data"].name
  location            = module.resource_group["data"].location
  environment         = var.environment
  project             = var.project
  sku                 = each.value.sku
  tenant_id           = each.value.tenant_id

  depends_on = [
    module.resource_group["data"].id
  ]
}
