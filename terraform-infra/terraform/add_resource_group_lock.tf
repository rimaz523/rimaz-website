module "add_resource_group_lock" {
  source   = "./modules/management/locks"
  for_each = var.add_rg_locks

  lock_name   = lower("${each.key}-lock-${each.value.lock_level}")
  resource_id = module.resource_group[each.key].id
  lock_level  = each.value.lock_level
  lock_reason = each.value.reason

  depends_on = [
    module.resource_group["data"].id,
  ]
}
