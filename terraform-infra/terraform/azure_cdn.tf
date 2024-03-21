module "azure_cdns" {
  source   = "./modules/networking/cdn"
  for_each = var.cdns

  environment           = var.environment
  project               = var.project
  resource_group_name   = module.resource_group["common"].name
  type                  = each.key
  location              = each.value.location
  sku                   = each.value.sku
  endpoint              = each.value.endpoint
  hostname              = each.value.hostname
  custom_hostname       = each.value.custom_domain
  ssl_cert_kv_secret_id = module.get_ssl_certificate["rimaz-ssl"].secret_id

  depends_on = [
    module.resource_group["common"].id,
    module.get_ssl_certificate["rimaz-ssl"].secret_id
  ]
}
