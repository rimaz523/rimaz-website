output "id" {
  value = azurerm_linux_web_app.webapp_linux.id
}

output "name" {
  value = azurerm_linux_web_app.webapp_linux.name
}

output "certificate_id" {
  value = azurerm_app_service_certificate.app_ssl_cert.id
}
