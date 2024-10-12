module "app_service_certificate" {
  source = "./modules/compute/app_service_certificate"

  for_each = var.app_service_certificates

  resource_group_name   = module.resource_group["app"].name
  location              = module.resource_group["app"].location
  app_ssl_cert_name     = module.get_ssl_certificate[each.key].name
  ssl_cert_kv_secret_id = module.get_ssl_certificate[each.key].secret_id

  depends_on = [
    module.get_ssl_certificate["rimaz-ssl"].secret_id,
    module.resource_group["app"].id
  ]
}
