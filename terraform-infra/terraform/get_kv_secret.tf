module "get_kv_secret" {
  source   = "./modules/security/get_key_vault_secret"
  for_each = var.key_vault_secrets

  kv_name           = each.value.kv_name
  kv_resource_group = each.value.kv_resource_group
  secret_name       = each.key
}
