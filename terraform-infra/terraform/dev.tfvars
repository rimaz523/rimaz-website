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

key_vault_secrets = {
  "sql-app-db-server-admin-login-name" = {
    kv_name           = "rimaz-dev-app-kv"
    kv_resource_group = "rimaz-data-dev-rg"
  },
  "sql-app-db-server-admin-login-password" = {
    kv_name           = "rimaz-dev-app-kv"
    kv_resource_group = "rimaz-data-dev-rg"
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

web_tests = {
  "blog_home_page" = {
    url           = "https://rimaz.dev"
    geo_locations = ["emea-au-syd-edge"] //australia east. For the list of geo locations see : https://learn.microsoft.com/en-us/previous-versions/azure/azure-monitor/app/monitor-web-app-availability#location-population-tags
    frequency     = 900
    timeout       = 120
  },
  "api_health" = {
    url           = "https://rimaz-dev-backend-apim.azure-api.net/v1/api/blogPreviews?limit=4&subscription-key=f7c3ca94b5b94e6ab7bec64a983c3fb9"
    geo_locations = ["emea-au-syd-edge"]
    frequency     = 900
    timeout       = 120
  },
  "site_cdn" = {
    url           = "https://cdn.rimaz.dev/app/hero-dark.jpg"
    geo_locations = ["emea-au-syd-edge"]
    frequency     = 900
    timeout       = 120
  }
}

app_insights_alerts = {
  "rmz-site-grp" = {
    action_group_name = "Rimaz Website Monitor Action Group"
    email_receivers = {
      "alert-developer" = {
        email                   = "rimazmohommed523@gmail.com"
        use_common_alert_schema = true
      }
    }
    push_notification_receivers = {
      "push-to-developer-app" = {
        email = "rimazmohommed523@gmail.com"
      }
    }
    alerts = {
      "Rimaz Blog Website Availability" = {
        description            = "Alert will be triggered when Availability is less than 100%."
        frequency              = "PT15M"
        window_size            = "PT15M"
        severity               = 0
        metric_namespace       = "microsoft.insights/components"
        metric_name            = "availabilityResults/availabilityPercentage"
        aggregation            = "Average"
        operator               = "LessThan"
        threshold              = 100
        skip_metric_validation = false
      }

    }
  }
}
