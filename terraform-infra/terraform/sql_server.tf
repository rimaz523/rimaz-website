module "sql_server" {
  source   = "./modules/storage/sql"
  for_each = var.sql_servers

  name                 = each.key
  resource_group_name  = module.resource_group["data"].name
  location             = module.resource_group["data"].location
  environment          = var.environment
  project              = var.project
  sku                  = each.value.sku
  admin_login_name     = module.get_kv_secret["sql-app-db-server-admin-login-name"].kv_secret_value
  admin_login_password = module.get_kv_secret["sql-app-db-server-admin-login-password"].kv_secret_value

  depends_on = [
    module.resource_group["data"].id,
    module.get_kv_secret["sql-app-db-server-admin-login-name"].kv_secret_id,
    module.get_kv_secret["sql-app-db-server-admin-login-password"].kv_secret_id
  ]
}
