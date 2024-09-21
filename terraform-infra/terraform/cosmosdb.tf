module "cosmosdb" {
  source   = "./modules/storage/cosmos"
  for_each = var.cosmosdbs

  name                   = each.key
  resource_group_name    = module.resource_group["data"].name
  location               = module.resource_group["data"].location
  environment            = var.environment
  project                = var.project
  kind                   = each.value.kind
  containers             = each.value.containers
  whitelist_ip_addresses = module.linux_web_app["api"].outbound_ip_addresses

  depends_on = [
    module.resource_group["data"].id,
    module.linux_web_app["api"].id
  ]
}
