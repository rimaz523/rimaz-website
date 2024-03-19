variable "resource_group_name" {
  description = "Name of the resource group where the alerts reside in."
  type        = string
}

variable "application_insights_id" {
  description = "The application insights resource id."
  type        = string
}

variable "action_group_short_name" {
  description = "Short name of the action group."
  type        = string
}

variable "action_group_name" {
  description = "Name of the action group."
  type        = string
}

variable "email_receivers" {
  description = "List of email receivers for the action group."
  type = map(object({
    email                   = string
    use_common_alert_schema = bool
  }))
}

variable "push_notification_receivers" {
  description = "List of app push notification receivers for the action group"
  type = map(object({
    email = string
  }))
}

variable "alert_rules" {
  description = "List of alert rules for the action group"
  type = map(object({
    description            = string
    frequency              = string
    window_size            = string
    severity               = number
    metric_namespace       = string
    metric_name            = string
    aggregation            = string
    operator               = string
    threshold              = number
    skip_metric_validation = bool
  }))
}
