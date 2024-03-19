module "availability_alerts" {
  source   = "./modules/monitor/alert_rule"
  for_each = var.app_insights_alerts

  action_group_short_name     = each.key
  action_group_name           = each.value.action_group_name
  email_receivers             = each.value.email_receivers
  push_notification_receivers = each.value.push_notification_receivers
  application_insights_id     = module.app_insights["app"].id
  resource_group_name         = module.resource_group["common"].name
  alert_rules                 = each.value.alerts

  depends_on = [
    module.app_insights["app"].id
  ]
}
