output "id" {
  value = azurerm_api_management_api.api.id
}

output "subscription_primary_key" {
  value     = azurerm_api_management_subscription.apim_product_subscription.primary_key
  sensitive = true
}
