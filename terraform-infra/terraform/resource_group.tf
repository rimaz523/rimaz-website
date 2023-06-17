module "resource_group" {
  source   = "./modules/core/resource_group"
  for_each = var.resource_groups

  name        = each.key
  location    = each.value.location
  environment = var.environment
  project     = var.project
}
