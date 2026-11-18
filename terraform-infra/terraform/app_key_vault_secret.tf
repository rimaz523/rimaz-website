locals {
  secrets = {
    Application--InstrumentationKey                = module.app_insights["app"].instrumentation_key
    Application--ConnectionString                  = module.app_insights["app"].connection_string
    Persistence--CosmosAppEndpoint                 = module.cosmosdb["app"].cosmos_app_endpoint
    Persistence--CosmosAppReadOnlyKey              = module.cosmosdb["app"].cosmos_app_read_only_key
    Persistence--CosmosAppDatabase                 = module.cosmosdb["app"].cosmos_app_sql_database
    IntegrationOptions--LogicAppApiSubscriptionKey = module.api_management_api_logic_app["SendEmail"].subscription_primary_key
  }
}

module "app_key_vault_secret" {
  source   = "./modules/security/key_vault_secret"
  for_each = var.app_key_vault_secrets

  key_vault_id = module.key_vault["app"].id
  secret_name  = each.key
  secret_value = each.value.use_local_value ? local.secrets[each.value.secret] : each.value.secret

  depends_on = [
    module.key_vault["app"].id,
    module.app_insights["app"].id,
    module.cosmosdb["app"].id,
    module.api_management_api_logic_app
  ]
}
