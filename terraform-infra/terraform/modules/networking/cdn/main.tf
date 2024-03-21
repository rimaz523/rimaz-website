#https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cdn_endpoint

resource "azurerm_cdn_profile" "azure_cdn_profile" {
  name                = lower("${var.project}-${var.environment}-${var.type}-cdn")
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = var.sku
}

resource "azurerm_cdn_endpoint" "cdn_endpoint" {
  name                          = lower("${var.project}-${var.environment}-${var.endpoint}-cdn-endpoint")
  profile_name                  = azurerm_cdn_profile.azure_cdn_profile.name
  location                      = var.location
  resource_group_name           = var.resource_group_name
  querystring_caching_behaviour = "UseQueryString"
  optimization_type             = "GeneralWebDelivery"
  origin_host_header            = var.hostname
  is_compression_enabled        = true
  content_types_to_compress = [
    "application/eot",
    "application/font",
    "application/font-sfnt",
    "application/javascript",
    "application/json",
    "application/opentype",
    "application/otf",
    "application/pkcs7-mime",
    "application/truetype",
    "application/ttf",
    "application/vnd.ms-fontobject",
    "application/xhtml+xml",
    "application/xml",
    "application/xml+rss",
    "application/x-font-opentype",
    "application/x-font-truetype",
    "application/x-font-ttf",
    "application/x-httpd-cgi",
    "application/x-javascript",
    "application/x-mpegurl",
    "application/x-opentype",
    "application/x-otf",
    "application/x-perl",
    "application/x-ttf",
    "font/eot",
    "font/ttf",
    "font/otf",
    "font/opentype",
    "image/svg+xml",
    "text/css",
    "text/csv",
    "text/html",
    "text/javascript",
    "text/js",
    "text/plain",
    "text/richtext",
    "text/tab-separated-values",
    "text/xml",
    "text/x-script",
    "text/x-component",
    "text/x-java-source"
  ]

  origin {
    name      = lower("${var.project}-${var.environment}-${var.endpoint}")
    host_name = var.hostname
  }
}

resource "azurerm_cdn_endpoint_custom_domain" "cdn_endpoint_custom_domain" {
  name            = lower("${var.project}-${var.environment}-${var.endpoint}-cdn-endpoint-custom-domain")
  cdn_endpoint_id = azurerm_cdn_endpoint.cdn_endpoint.id
  host_name       = var.custom_hostname

  user_managed_https {
    tls_version         = "TLS12"
    key_vault_secret_id = var.ssl_cert_kv_secret_id
  }
}
