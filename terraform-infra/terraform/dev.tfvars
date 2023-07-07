project     = "Rimaz"
environment = "dev"

resource_groups = {
  "app" = {
    location = "australiaeast"
  }
  "data" = {
    location = "australiaeast"
  }
  "common" = {
    location = "australiaeast"
  }
}

service_plans = {
  "asp" = {
    sku = "B1"
    os  = "Linux"
  }
}

ssl_certificates = {
  "react-ssl" = {
    kv_name           = "rimaz-kv"
    kv_resource_group = "rimaz-admin-rg"
    ssl_cert_name     = "rimaz-dev-pfx-cert"
  }
}

key_vaults = {
  "app" = {
    tenant_id = "dd8e7948-f3de-4949-8fa8-cec81e0878d8"
    sku       = "standard"
  }
}