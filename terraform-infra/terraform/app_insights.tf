module "app_insights" {
  source   = "./modules/monitor/application_insights"
  for_each = var.app_insights

  resource_group_name = module.resource_group["common"].name
  location            = module.resource_group["common"].location
  environment         = var.environment
  name                = each.key
  application_type    = each.value.application_type
  retention_days      = each.value.retention_days
  workspace_id        = module.log_analytics["app"].id
  project             = var.project

  depends_on = [
    module.resource_group["common"].id,
    module.log_analytics["app"].id
  ]
}
