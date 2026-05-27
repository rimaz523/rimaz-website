# api_management_api_logic_app
# Fronts a Logic App HTTP trigger with an APIM API. The Logic App's SAS-signed
# URL is stored as a secret APIM named value and applied via a rewrite-uri
# policy so callers only need an APIM subscription key — never the SAS.

resource "azurerm_api_management_named_value" "logic_app_url" {
  name                = lower("${var.project}-${var.name}-${var.environment}-url")
  resource_group_name = var.resource_group_name
  api_management_name = var.api_management_name
  display_name        = lower("${var.project}-${var.name}-${var.environment}-url")
  value               = var.logic_app_url_path
  secret              = true
}

resource "azurerm_api_management_api" "api" {
  name                = lower("${var.project}-${var.name}-${var.environment}-api")
  resource_group_name = var.resource_group_name
  api_management_name = var.api_management_name
  revision            = var.api_revision
  display_name        = "${var.project} ${var.name} API ${var.environment}"
  path                = var.path
  protocols           = ["https"]

  subscription_required = true

  subscription_key_parameter_names {
    header = "Ocp-Apim-Subscription-Key"
    query  = "subscription-key"
  }
}

resource "azurerm_api_management_api_operation" "post" {
  operation_id        = "post"
  api_name            = azurerm_api_management_api.api.name
  api_management_name = var.api_management_name
  resource_group_name = var.resource_group_name
  display_name        = "Send"
  method              = "POST"
  url_template        = "/"
}

resource "azurerm_api_management_api_policy" "api_policies" {
  api_name            = azurerm_api_management_api.api.name
  api_management_name = var.api_management_name
  resource_group_name = var.resource_group_name

  xml_content = templatefile("${path.root}/modules/integration/api_management_api_logic_app/policies/inbound_policy_xml.tftpl",
    {
      backendBaseUrl  = var.backend_base_url
      logicAppUrlName = azurerm_api_management_named_value.logic_app_url.name
    }
  )

  depends_on = [
    azurerm_api_management_named_value.logic_app_url
  ]
}

resource "azurerm_api_management_product" "apim_product" {
  product_id            = lower("${var.project}-${var.name}-${var.environment}-api-product")
  api_management_name   = var.api_management_name
  resource_group_name   = var.resource_group_name
  display_name          = "${var.project} ${var.name} API ${var.environment}"
  subscription_required = true
  approval_required     = false
  published             = true
}

resource "azurerm_api_management_product_api" "apim_product_api" {
  api_name            = azurerm_api_management_api.api.name
  product_id          = azurerm_api_management_product.apim_product.product_id
  api_management_name = var.api_management_name
  resource_group_name = var.resource_group_name
}

resource "azurerm_api_management_subscription" "apim_product_subscription" {
  api_management_name = var.api_management_name
  resource_group_name = var.resource_group_name
  product_id          = azurerm_api_management_product.apim_product.id
  display_name        = "${var.project} ${var.name} ${var.environment} API"
  state               = "active"
  allow_tracing       = false
}
