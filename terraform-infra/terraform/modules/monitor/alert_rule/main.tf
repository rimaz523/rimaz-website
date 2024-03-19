resource "azurerm_monitor_action_group" "action_group" {
  name                = var.action_group_name
  resource_group_name = var.resource_group_name
  short_name          = var.action_group_short_name

  dynamic "email_receiver" {
    for_each = var.email_receivers
    content {
      name                    = email_receiver.key
      email_address           = email_receiver.value.email
      use_common_alert_schema = email_receiver.value.use_common_alert_schema
    }
  }

  dynamic "azure_app_push_receiver" {
    for_each = var.push_notification_receivers
    content {
      name          = azure_app_push_receiver.key
      email_address = azure_app_push_receiver.value.email
    }
  }
}

resource "azurerm_monitor_metric_alert" "alert_rule" {
  for_each = var.alert_rules

  name                = each.key
  resource_group_name = var.resource_group_name
  scopes              = [var.application_insights_id]
  description         = each.value.description
  frequency           = each.value.frequency
  window_size         = each.value.window_size
  severity            = each.value.severity


  criteria {
    metric_namespace       = each.value.metric_namespace
    metric_name            = each.value.metric_name
    aggregation            = each.value.aggregation
    operator               = each.value.operator
    threshold              = each.value.threshold
    skip_metric_validation = each.value.skip_metric_validation
  }

  action {
    action_group_id = azurerm_monitor_action_group.action_group.id
  }
}
