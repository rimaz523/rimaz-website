module "availability_tests" {
  source   = "./modules/monitor/standard_web_test"
  for_each = var.web_tests

  application_insights_id = module.app_insights["app"].id
  resource_group_name     = module.resource_group["common"].name
  location                = module.resource_group["common"].location
  name                    = each.key
  url                     = each.value.url
  geo_locations           = each.value.geo_locations
  frequency               = each.value.frequency
  timeout                 = each.value.timeout

  depends_on = [
    module.app_insights["app"].id
  ]
}
