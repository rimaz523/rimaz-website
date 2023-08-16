variable "project" {
  default     = "#{project}#"
  description = "Name of the project."
}

variable "environment" {
  default     = "#{environment}#"
  description = "The deployed environment."
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
  }))
  default = {
    "react" = {
      stack         = "node"
      stack_version = "18-lts"
    },
    "api" = {
      stack         = "dotnet"
      stack_version = "6.0"
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
    }
  }
}
