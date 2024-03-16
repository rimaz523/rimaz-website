#standard_web_test
#https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/application_insights_standard_web_test

resource "azurerm_application_insights_standard_web_test" "standard_web_test" {
  name                    = var.name
  resource_group_name     = var.resource_group_name
  location                = var.location
  application_insights_id = var.application_insights_id
  geo_locations           = var.geo_locations
  frequency               = var.frequency
  timeout                 = var.timeout
  retry_enabled           = true
  enabled                 = true

  validation_rules {
    expected_status_code        = 200
    ssl_check_enabled           = true
    ssl_cert_remaining_lifetime = 7
  }

  request {
    url                              = var.url
    parse_dependent_requests_enabled = true
  }
}
