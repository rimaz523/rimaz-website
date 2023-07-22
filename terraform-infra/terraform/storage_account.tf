module "storage_account" {
  source   = "./modules/storage/storage_account"
  for_each = var.storage_accounts

  name                = each.key
  resource_group_name = module.resource_group["data"].name
  location            = module.resource_group["data"].location
  environment         = var.environment
  project             = var.project
  sku                 = each.value.sku
  replication_type    = each.value.replication_type

  depends_on = [
    module.resource_group["data"].id
  ]
}
