# azurerm_api_management_api
# https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_management_api

data "http" "swagger" {
  url = "${var.azure_storage_container_url_for_swagger}${var.swagger_file_name}"
  request_headers = {
    Accept = "application/json"
  }
}

resource "azurerm_api_management_api" "api" {
  name                = lower("${var.project}-${var.name}-${var.environment}-api")
  resource_group_name = var.resource_group_name
  api_management_name = var.api_management_name
  revision            = var.api_revision
  display_name        = "${var.project} ${var.name} API ${var.environment}"
  path                = var.path
  protocols           = ["https"]
  service_url         = var.service_url

  subscription_required = true

  import {
    content_format = var.swagger_format
    content_value  = "${var.azure_storage_container_url_for_swagger}${var.swagger_file_name}"
  }

  subscription_key_parameter_names {
    header = "Ocp-Apim-Subscription-Key"
    query  = "subscription-key"
  }
}

resource "azurerm_api_management_api_policy" "api_policies" {
  api_name            = azurerm_api_management_api.api.name
  api_management_name = var.api_management_name
  resource_group_name = var.resource_group_name

  xml_content = templatefile("${path.root}/modules/integration/api_management_api/policies/inbound_cors_policy_xml.tftpl",
    {
      localhost                   = var.whitelist_localhost_domain
      hostedFrontendWebapp        = var.whitelist_frontend_webapp_domain
      hostedFrontendWebappWWW     = var.whitelist_frontend_webapp_domain_www
      localhostAngular            = var.whitelist_localhost_domain_angular
      hostedFrontendWebappAngular = var.whitelist_frontend_webapp_domain_angular
    }
  )
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
