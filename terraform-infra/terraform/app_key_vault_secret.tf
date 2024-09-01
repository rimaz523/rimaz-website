locals {
  secrets = {
    instrumentation_key      = module.app_insights["app"].instrumentation_key
    connection_string        = module.app_insights["app"].connection_string
    cosmos_app_endpoint      = module.cosmosdb["app"].cosmos_app_endpoint
    cosmos_app_read_only_key = module.cosmosdb["app"].cosmos_app_read_only_key
    cosmos_app_sql_database  = module.cosmosdb["app"].cosmos_app_sql_database
  }
}

module "app_key_vault_secret" {
  source   = "./modules/security/key_vault_secret"
  for_each = var.app_key_vault_secrets

  key_vault_id = module.key_vault["app"].id
  secret_name  = each.key
  secret_value = local.secrets[each.value.secret]

  depends_on = [
    module.key_vault["app"].id,
    module.app_insights["app"].id,
    module.cosmosdb["app"].id
  ]
}
