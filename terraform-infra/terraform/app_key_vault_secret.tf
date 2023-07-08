module "app_key_vault_secret" {
  source   = "./modules/security/key_vault_secret"
  for_each = var.app_key_vault_secrets

  key_vault_id = module.key_vault["app"].id
  secret_name  = each.key
  secret_value = each.value.secret == "instrumentation_key" ? module.app_insights["app"].instrumentation_key : module.app_insights["app"].connection_string

  depends_on = [
    module.key_vault["app"].id,
    module.app_insights["app"].id
  ]
}
