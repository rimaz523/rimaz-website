module "service_plan" {
  source   = "./modules/compute/service_plan"
  for_each = var.service_plans

  resource_group_name = module.resource_group["app"].name
  location            = module.resource_group["app"].location
  environment         = var.environment
  project             = var.project
  app_service_sku     = each.value.sku
  app_service_os      = each.value.os

  depends_on = [
    module.resource_group["app"].id
  ]
}
