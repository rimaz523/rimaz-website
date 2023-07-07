# application_insights
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/application_insights.html

resource "azurerm_application_insights" "app_insights" {
  name                = lower("${var.project}-${var.environment}-${var.name}-insights")
  location            = var.location
  resource_group_name = var.resource_group_name
  application_type    = var.application_type
  retention_in_days   = var.retention_days
  workspace_id        = var.workspace_id
}
