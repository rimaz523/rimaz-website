module "get_ssl_certificate" {
  source   = "./modules/security/key_vault_certificate"
  for_each = var.ssl_certificates

  kv_name           = each.value.kv_name
  kv_resource_group = each.value.kv_resource_group
  ssl_cert_name     = each.value.ssl_cert_name
}
