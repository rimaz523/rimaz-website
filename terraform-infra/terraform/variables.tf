variable "project" {
  default     = "#{project}#"
  description = "Name of the project."
}

variable "environment" {
  default     = "#{environment}#"
  description = "The deployed environment."
}

variable "subscription_id" {
  default     = "#{subscription_id}#"
  description = "The azure subscription id."
}

variable "resource_groups" {
  description = "create resource groups in the project's environment"
  type = map(object({
    location = string
  }))
  default = {
    "app" = {
      location = "#{resource_group_location}#"
    }
    "data" = {
      location = "#{resource_group_location}#"
    }
    "common" = {
      location = "#{resource_group_location}#"
    }
  }
}

variable "service_plans" {
  description = "create app service plans"
  type = map(object({
    sku = string
    os  = string
  }))
  default = {
    "asp" = {
      sku = "#{app_service_sku}#"
      os  = "#{app_service_os}#"
    }
  }
}

variable "linux_webapps" {
  description = "create linux web apps for deploying the marketplace api and frontends"
  type = map(object({
    stack         = string
    stack_version = string
    always_on     = bool
  }))
  default = {
    "react" = {
      stack         = "node"
      stack_version = "22-lts"
      always_on     = true
    },
    "api" = {
      stack         = "dotnet"
      stack_version = "9.0"
      always_on     = true
    },
    "angular" = {
      stack         = "node"
      stack_version = "22-lts"
      always_on     = false
    },
    "vue" = {
      stack         = "node"
      stack_version = "22-lts"
      always_on     = false
    }
  }
}

variable "ssl_certificates" {
  description = "get ssl certificates for the hosted web apps"
  type = map(object({
    kv_name           = string
    kv_resource_group = string
    ssl_cert_name     = string
  }))
  default = {
    "rimaz-ssl" = {
      kv_name           = "#{admin_key_vault}#"
      kv_resource_group = "#{admin_resource_group}#"
      ssl_cert_name     = "#{kv_ssl_cert_name}#"
    }
  }
}

variable "key_vault_secrets" {
  description = "get secrets from the key vault"
  type = map(object({
    kv_name           = string
    kv_resource_group = string
  }))
  default = {
    "sql-app-db-server-admin-login-name" = {
      kv_name           = "#{app_key_vault}#"
      kv_resource_group = "#{data_resource_group}#"
    },
    "sql-app-db-server-admin-login-password" = {
      kv_name           = "#{app_key_vault}#"
      kv_resource_group = "#{data_resource_group}#"
    }
  }
}

variable "app_service_certificates" {
  description = "create app service certificates for the hosted web apps"
  type        = map(object({}))
  default = {
    "rimaz-ssl" = {}
  }
}

variable "web_app_ssl_domains" {
  description = "Custom domain and ssl bindings for the hosted web apps"
  type = map(object({
    web_app_key = string
    ssl_state   = string
  }))
  default = {
    "rimaz.dev" = {
      web_app_key = "react"
      ssl_state   = "IpBasedEnabled"
    }
    "www.rimaz.dev" = {
      web_app_key = "react"
      ssl_state   = "SniEnabled"
    }
    "api.rimaz.dev" = {
      web_app_key = "api"
      ssl_state   = "SniEnabled"
    }
    "angular.rimaz.dev" = {
      web_app_key = "angular"
      ssl_state   = "SniEnabled"
    }
    "vue.rimaz.dev" = {
      web_app_key = "vue"
      ssl_state   = "SniEnabled"
    }
  }
}

variable "laws" {
  description = "create log analytics workspaces"
  type = map(object({
    retention_days = string
    sku            = string
  }))
  default = {
    "app" = {
      retention_days = "90"
      sku            = "PerGB2018"
    }
  }
}

variable "app_insights" {
  description = "create application insights resources"
  type = map(object({
    retention_days   = string
    application_type = string
  }))
  default = {
    "app" = {
      retention_days   = "90"
      application_type = "web"
    }
  }
}

variable "web_tests" {
  description = "create application insights availability tests"
  type = map(object({
    url           = string
    geo_locations = list(string)
    frequency     = number
    timeout       = number
  }))
  default = {
    "blog_home_page" = {
      url           = "#{standard_web_test_blog_url}#"
      geo_locations = ["emea-au-syd-edge"] //australia east. For the list of geo locations see : https://learn.microsoft.com/en-us/previous-versions/azure/azure-monitor/app/monitor-web-app-availability#location-population-tags
      frequency     = 900
      timeout       = 120
    },
    "api_health" = {
      url           = "#{standard_web_test_api_health_url}#"
      geo_locations = ["emea-au-syd-edge"]
      frequency     = 900
      timeout       = 120
    },
    "site_cdn" = {
      url           = "#{standard_web_test_cdn_hero_url}#"
      geo_locations = ["emea-au-syd-edge"]
      frequency     = 900
      timeout       = 120
    }
  }
}

variable "key_vaults" {
  description = "create key vault resources"
  type = map(object({
    tenant_id = string
    sku       = string
  }))
  default = {
    "app" = {
      tenant_id = "#{tenant_id}#"
      sku       = "standard"
    }
  }
}

variable "app_key_vault_rbac" {
  description = "RBAC role assignments for app key vault"
  type = map(object({
    roles                            = list(string)
    principal_id                     = string
    skip_service_principal_aad_check = bool
    is_managed_identity              = bool
    mi_key                           = string
  }))
  default = {
    "app_kv_rmz_principal" = {
      "principal_id"                   = "#{devops_service_principal_id}#"
      "roles"                          = ["Owner", "Key Vault Secrets Officer"]
      skip_service_principal_aad_check = false
      is_managed_identity              = false
      mi_key                           = ""
    }
    "app_kv_usr_rimaz" = {
      "principal_id"                   = "#{local_user_id}#"
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
}

variable "app_key_vault_secrets" {
  description = "create key vault resources"
  type = map(object({
    secret = string
  }))
  default = {
    "application-insights-key" = {
      secret = "instrumentation_key"
    }
    "application-insights-conn-string" = {
      secret = "connection_string"
    }
    "cosmos-app-endpoint" = {
      secret = "cosmos_app_endpoint"
    }
    "cosmos-app-read-only-key" = {
      secret = "cosmos_app_read_only_key"
    }
    "cosmos-app-sql-database" = {
      secret = "cosmos_app_sql_database"
    }
  }
}

variable "storage_accounts" {
  description = "create storage account resources"
  type = map(object({
    replication_type = string
    sku              = string
  }))
  default = {
    "app" = {
      replication_type = "LRS"
      sku              = "Standard"
    }
  }
}

variable "apims" {
  description = "create APIMs"
  type = map(object({
    company = string
    email   = string
    sku     = string
  }))
  default = {
    "backend" = {
      company = "#{company_name}#"
      email   = "#{company_email}#"
      sku     = "#{apim_sku}#"
    }
  }
}

variable "apis" {
  description = "create APIs"
  type = map(object({
    api_revision                            = string
    path                                    = string
    service_url                             = string
    azure_storage_container_url_for_swagger = string
    swagger_file_name                       = string
    swagger_format                          = string
    whitelist_localhost_domain              = string
    whitelist_frontend_webapp_domain        = string
    whitelist_frontend_webapp_domain_www    = string
  }))
  default = {
    "Backend" = {
      api_revision                            = "v1"
      path                                    = "v1"
      service_url                             = "#{api_domain_url}#"
      azure_storage_container_url_for_swagger = "#{az_storage_container_url_for_swagger}#"
      swagger_file_name                       = "swagger.json"
      swagger_format                          = "openapi+json-link"
      whitelist_localhost_domain              = "http://localhost:3000/"
      whitelist_frontend_webapp_domain        = "#{apim_policy_whitelist_frontend_webapp_domain}#"
      whitelist_frontend_webapp_domain_www    = "#{apim_policy_whitelist_frontend_webapp_domain_www}#"
    }
  }
}

variable "logic_apps" {
  description = "create logic apps"
  type = map(object({
    deployment_mode = string
    connection_name = string
  }))
  default = {
    "send-email" = {
      deployment_mode = "Incremental"
      connection_name = "gmail"
    }
  }
}

variable "sql_servers" {
  description = "create SQL servers"
  type = map(object({
    sku                      = string
    ms_entra_login_username  = string
    ms_entra_login_object_id = string
  }))
  default = {
    # To list all sql skus for region in your cli : az sql db list-editions -l australiaeast -o table
    "app" = {
      sku                      = "Basic"
      ms_entra_login_username  = "rimazmohommed523_gmail.com#EXT#@rimazmohommed523gmail.onmicrosoft.com"
      ms_entra_login_object_id = "3207c7da-5eed-46eb-abd3-1deb49b95e1e"
    }
  }
}

variable "app_insights_alerts" {
  description = "applicatoin insights alerts"
  type = map(object({
    action_group_name = string
    email_receivers = map(object({
      email                   = string
      use_common_alert_schema = bool
    }))
    push_notification_receivers = map(object({
      email = string
    }))
    alerts = map(object({
      description            = string
      frequency              = string
      window_size            = string
      severity               = number
      metric_namespace       = string
      metric_name            = string
      aggregation            = string
      operator               = string
      threshold              = number
      skip_metric_validation = bool
    }))
  }))
  default = {
    "rmz-site-grp" = {
      action_group_name = "Rimaz Website Monitor Action Group"
      email_receivers = {
        "alert-developer" = {
          email                   = "#{company_email}#"
          use_common_alert_schema = true
        }
      }
      push_notification_receivers = {
        "push-to-developer-app" = {
          email = "#{company_email}#"
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
}

variable "cdns" {
  description = "creates an azure cdn"
  type = map(object({
    sku           = string
    location      = string
    endpoint      = string
    hostname      = string
    custom_domain = string
  }))
  default = {
    "app" = {
      sku           = "Standard_Microsoft"
      location      = "global"
      endpoint      = "blob"
      hostname      = "rimazdevappstore.blob.core.windows.net"
      custom_domain = "cdn.rimaz.dev"
    }
  }
}

variable "add_rg_locks" {
  description = "creates resource locks to prevent accidental modification or deletion of resource groups"
  type = map(object({
    lock_level = string
    reason     = string
  }))
  default = {
    "data" = {
      lock_level = "CanNotDelete"
      reason     = "Prevent accidental deletion of data"
    }
  }
}

variable "cosmosdbs" {
  description = "create cosmos databases"
  type = map(object({
    kind = string
    containers = map(object({
      partition_key  = string
      max_throughput = number
    }))
  }))
  default = {
    "app" = {
      kind = "GlobalDocumentDB",
      containers = {
        "articles" = {
          partition_key  = "/slug"
          max_throughput = 1000
        }
      }
    }
  }
}
