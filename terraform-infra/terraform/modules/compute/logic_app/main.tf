# logic_app
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group_template_deployment

resource "azurerm_resource_group_template_deployment" "logic_app_deployment" {
  name                = lower("${var.project}-${var.environment}-${var.name}-logic-app-deployment")
  resource_group_name = var.resource_group_name
  deployment_mode     = var.deployment_mode
  parameters_content = jsonencode({
    "email_connection_name" = {
      value = "${var.connection_name}"
    },
    "workflow_name" = {
      value = lower("${var.project}-${var.environment}-${var.name}-logic-app")
    },
    "subscription_id" = {
      value = "${var.subscription_id}"
    }
  })
  template_content = templatefile("${path.root}/modules/compute/logic_app/deployments/${var.template_file}.tftpl", {})
}
