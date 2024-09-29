module "get_ssl_certificate" {
  source   = "./modules/security/key_vault_certificate"
  for_each = var.ssl_certificates

  kv_name           = each.value.kv_name
  kv_resource_group = each.value.kv_resource_group
  ssl_cert_name     = each.value.ssl_cert_name
}

module "app_service_certificate" {
  source = "./modules/compute/app_service_certificate"

  resource_group_name   = module.resource_group["app"].name
  location              = module.resource_group["app"].location
  app_ssl_cert_name     = module.get_ssl_certificate["rimaz-ssl"].name
  ssl_cert_kv_secret_id = module.get_ssl_certificate["rimaz-ssl"].secret_id

  depends_on = [
    module.get_ssl_certificate["rimaz-ssl"].secret_id,
    module.resource_group["app"].id
  ]
}
