module "log_analytics" {
  source   = "./modules/monitor/log_analytics_workspace"
  for_each = var.laws

  resource_group_name = module.resource_group["common"].name
  location            = module.resource_group["common"].location
  environment         = var.environment
  name                = each.key
  sku                 = each.value.sku
  retention_days      = each.value.retention_days
  project             = var.project

  depends_on = [
    module.resource_group["common"].id
  ]
}
