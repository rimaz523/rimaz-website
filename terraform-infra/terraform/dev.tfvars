project         = "Rimaz"
environment     = "dev"
subscription_id = "51a010a5-fba7-4264-975c-8bf5c0451428"

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
  "rimaz-ssl" = {
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

app_key_vault_rbac = {
  "app_kv_rmz_principal" = {
    "principal_id"                   = "edc7ac20-a3a1-4255-9846-cd486dcefc1c"
    "roles"                          = ["Owner", "Key Vault Secrets Officer"]
    skip_service_principal_aad_check = false
    is_managed_identity              = false
    mi_key                           = ""
  }
  "app_kv_usr_rimaz" = {
    "principal_id"                   = "3207c7da-5eed-46eb-abd3-1deb49b95e1e"
    "roles"                          = ["Owner", "Key Vault Secrets Officer"]
    skip_service_principal_aad_check = false
    is_managed_identity              = false
    mi_key                           = ""
  }
  "app_kv_web_app_sami_react" = {
    "principal_id"                   = ""
    "roles"                          = ["Reader", "Key Vault Secrets Officer"]
    skip_service_principal_aad_check = false
    is_managed_identity              = true
    mi_key                           = "react"
  }
  "app_kv_web_app_sami_api" = {
    "principal_id"                   = ""
    "roles"                          = ["Reader", "Key Vault Secrets Officer"]
    skip_service_principal_aad_check = false
    is_managed_identity              = true
    mi_key                           = "api"
  }
}

apims = {
  "backend" = {
    company = "Rimaz"
    email   = "rimazmohommed523@gmail.com"
    sku     = "Consumption_0"
  }
}

apis = {
  "Backend" = {
    api_revision                            = "v1"
    path                                    = "v1"
    service_url                             = "https://api.rimaz.dev"
    azure_storage_container_url_for_swagger = "https://rmzadminstore.blob.core.windows.net/swagger-v1-dev/"
    swagger_file_name                       = "swagger.json"
    swagger_format                          = "openapi+json-link"
    whitelist_localhost_domain              = "http://localhost:3000/"
    whitelist_frontend_webapp_domain        = "https://rimaz.dev/"
    whitelist_frontend_webapp_domain_www    = "https://www.rimaz.dev/"
  }
}
