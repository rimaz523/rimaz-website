module "linux_web_app" {
  source   = "./modules/compute/linux_web_app"
  for_each = var.linux_webapps

  resource_group_name   = module.resource_group["app"].name
  location              = module.resource_group["app"].location
  environment           = var.environment
  project               = var.project
  service_plan_id       = module.service_plan["asp"].id
  name                  = each.key
  stack                 = each.value.stack
  stack_version         = each.value.stack_version
  app_ssl_cert_name     = module.get_ssl_certificate["rimaz-ssl"].name
  ssl_cert_kv_secret_id = module.get_ssl_certificate["rimaz-ssl"].secret_id

  depends_on = [
    module.resource_group["app"].id,
    module.service_plan["asp"].id,
    module.get_ssl_certificate["rimaz-ssl"].secret_id
  ]
}
