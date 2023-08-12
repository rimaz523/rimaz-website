module "api_management" {
  source   = "./modules/integration/api_management"
  for_each = var.apims

  name                = each.key
  resource_group_name = module.resource_group["common"].name
  location            = module.resource_group["common"].location
  environment         = var.environment
  project             = var.project
  sku                 = each.value.sku
  company_name        = each.value.company
  company_email       = each.value.email

  depends_on = [
    module.resource_group["common"].id
  ]
}
