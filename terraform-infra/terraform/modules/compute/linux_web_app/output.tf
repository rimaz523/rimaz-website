output "id" {
  value = azurerm_linux_web_app.webapp_linux.id
}

output "name" {
  value = azurerm_linux_web_app.webapp_linux.name
}

output "system_assigned_managed_identity" {
  value = azurerm_linux_web_app.webapp_linux.identity.0.principal_id
}

output "outbound_ip_addresses" {
  value = azurerm_linux_web_app.webapp_linux.outbound_ip_addresses
}
