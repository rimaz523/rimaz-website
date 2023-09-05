module "logic_app" {
  source   = "./modules/compute/logic_app"
  for_each = var.logic_apps

  environment         = var.environment
  project             = var.project
  resource_group_name = module.resource_group["common"].name
  name                = each.key
  deployment_mode     = each.value.deployment_mode
  template_file       = join("_", [replace(each.key, "-", "_"), "logic_app"])
  subscription_id     = var.subscription_id
  connection_name     = each.value.connection_name

  depends_on = [
    module.resource_group["common"].id
  ]
}
