module "web_app_ssl_custom_domain" {
  source   = "./modules/compute/app_service_custom_hostname_binding"
  for_each = var.web_app_ssl_domains

  custom_domain      = each.key
  web_app_name       = module.linux_web_app[each.value.web_app_key].name
  app_resource_group = module.resource_group["app"].name
  ssl_state          = each.value.ssl_state
  certificate_id     = module.linux_web_app[each.value.web_app_key].certificate_id

  depends_on = [
    module.linux_web_app["api"].id,
    module.linux_web_app["react"].id
  ]
}
