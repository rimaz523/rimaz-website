module "api_management_api_logic_app" {
  source   = "./modules/integration/api_management_api_logic_app"
  for_each = var.logic_app_apis

  name                = each.key
  resource_group_name = module.resource_group["common"].name
  project             = var.project
  environment         = var.environment
  api_management_name = module.api_management["backend"].name
  api_revision        = each.value.api_revision
  path                = each.value.path
  backend_base_url    = each.value.backend_base_url
  logic_app_url_path  = module.get_kv_secret[each.value.kv_secret_name].kv_secret_value

  depends_on = [
    module.resource_group["common"].id,
    module.api_management["backend"].id,
    module.get_kv_secret
  ]
}
